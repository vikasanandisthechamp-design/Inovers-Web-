import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import '../models/cricket_models.dart';

const _baseUrl = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'https://sportgod-backend-production.up.railway.app',
);

class ApiService {
  final http.Client _client;
  ApiService({http.Client? client}) : _client = client ?? http.Client();

  // ── Retry wrapper ────────────────────────────────────────────────
  Future<http.Response> _get(String path, {int retries = 2, int timeoutSec = 12}) async {
    Exception? lastError;
    for (var i = 0; i <= retries; i++) {
      try {
        final res = await _client
            .get(Uri.parse('$_baseUrl$path'))
            .timeout(Duration(seconds: timeoutSec));
        if (res.statusCode >= 200 && res.statusCode < 300) return res;
        if (res.statusCode >= 500 && i < retries) {
          await Future.delayed(Duration(milliseconds: 500 * (i + 1)));
          continue;
        }
        return res; // 4xx — don't retry
      } on SocketException catch (e) {
        lastError = e;
      } on http.ClientException catch (e) {
        lastError = e;
      } catch (e) {
        lastError = e is Exception ? e : Exception(e.toString());
      }
      if (i < retries) {
        await Future.delayed(Duration(milliseconds: 500 * (i + 1)));
      }
    }
    throw ApiException(-1, lastError?.toString() ?? 'Network error. Check your connection.');
  }

  // ── Live matches ─────────────────────────────────────────────────
  Future<List<CricketMatch>> getLiveMatches() async {
    final res = await _get('/api/v1/matches');
    _assertOk(res);
    final body = json.decode(res.body) as Map<String, dynamic>;
    final data = (body['data'] ?? []) as List;
    return data.map((m) => CricketMatch.fromJson(m as Map<String, dynamic>)).toList();
  }

  // ── Single match ─────────────────────────────────────────────────
  Future<CricketMatch> getMatch(String matchId) async {
    final res = await _get('/api/v1/matches/$matchId');
    _assertOk(res);
    final body = json.decode(res.body) as Map<String, dynamic>;
    return CricketMatch.fromJson(body['data'] as Map<String, dynamic>);
  }

  // ── Scorecard ─────────────────────────────────────────────────────
  Future<Scorecard?> getScorecard(String matchId) async {
    try {
      final res = await _get('/api/v1/matches/$matchId/scorecard');
      if (res.statusCode == 404) return null;
      _assertOk(res);
      final body = json.decode(res.body) as Map<String, dynamic>;
      return Scorecard.fromJson(body['data'] as Map<String, dynamic>);
    } catch (_) {
      return null;
    }
  }

  // ── Commentary ────────────────────────────────────────────────────
  Future<List<BallEvent>> getCommentary(String matchId, {int page = 1}) async {
    try {
      final res = await _get('/api/v1/matches/$matchId/commentary?page=$page&per_page=50');
      if (res.statusCode == 404) return [];
      _assertOk(res);
      final body = json.decode(res.body) as Map<String, dynamic>;
      final data = (body['data'] ?? []) as List;
      return data.map((b) => BallEvent.fromJson(b as Map<String, dynamic>)).toList();
    } catch (_) {
      return [];
    }
  }

  // ── AI Prediction ─────────────────────────────────────────────────
  Future<Prediction> getPrediction(String matchId) async {
    try {
      final res = await _get('/api/v1/matches/$matchId/prediction', timeoutSec: 20);
      if (res.statusCode == 404) return Prediction.empty();
      _assertOk(res);
      final body = json.decode(res.body) as Map<String, dynamic>;
      return Prediction.fromJson(body['data'] as Map<String, dynamic>);
    } catch (_) {
      return Prediction.empty();
    }
  }

  // ── Premium / Payments ────────────────────────────────────────────
  Future<Map<String, dynamic>> validateCoupon(String code, String? token) async {
    try {
      final uri = Uri.parse('$_baseUrl/api/v1/influencer/validate-coupon?coupon=${Uri.encodeComponent(code)}');
      final res = await _client.get(uri, headers: {
        if (token != null) 'Authorization': 'Bearer $token',
      }).timeout(const Duration(seconds: 8));
      return json.decode(res.body) as Map<String, dynamic>;
    } catch (_) {
      return {'valid': false, 'message': 'Could not validate coupon'};
    }
  }

  Future<Map<String, dynamic>> createPremiumOrder({
    required int amount,
    required String? accessToken,
  }) async {
    final uri = Uri.parse('$_baseUrl/api/v1/payments/create-order');
    final res = await _client.post(
      uri,
      headers: {
        'Content-Type': 'application/json',
        if (accessToken != null) 'Authorization': 'Bearer $accessToken',
      },
      body: json.encode({'amount': amount, 'currency': 'INR'}),
    ).timeout(const Duration(seconds: 15));
    _assertOk(res);
    return json.decode(res.body) as Map<String, dynamic>;
  }

  Future<void> verifyPremiumPayment({
    required String paymentId,
    required String orderId,
    required String signature,
    required String? accessToken,
  }) async {
    final uri = Uri.parse('$_baseUrl/api/v1/payments/verify');
    final res = await _client.post(
      uri,
      headers: {
        'Content-Type': 'application/json',
        if (accessToken != null) 'Authorization': 'Bearer $accessToken',
      },
      body: json.encode({
        'razorpay_payment_id': paymentId,
        'razorpay_order_id': orderId,
        'razorpay_signature': signature,
      }),
    ).timeout(const Duration(seconds: 15));
    _assertOk(res);
  }

  void _assertOk(http.Response res) {
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw ApiException(res.statusCode, res.body);
    }
  }

  void dispose() => _client.close();
}

class ApiException implements Exception {
  final int    statusCode;
  final String body;
  ApiException(this.statusCode, this.body);
  @override
  String toString() => statusCode == -1
      ? body
      : 'Server error ($statusCode). Please try again.';
}
