import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/cricket_models.dart';

const _baseUrl = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'https://sportgod-backend-production.up.railway.app',
);

class ApiService {
  final http.Client _client;
  ApiService({http.Client? client}) : _client = client ?? http.Client();

  // ── Live matches ─────────────────────────────────────────────────

  Future<List<CricketMatch>> getLiveMatches() async {
    final res = await _client
        .get(Uri.parse('$_baseUrl/api/v1/matches'))
        .timeout(const Duration(seconds: 10));
    _assertOk(res);
    final body = json.decode(res.body) as Map<String, dynamic>;
    final data = (body['data'] ?? []) as List;
    return data.map((m) => CricketMatch.fromJson(m)).toList();
  }

  // ── Single match ─────────────────────────────────────────────────

  Future<CricketMatch> getMatch(String matchId) async {
    final res = await _client
        .get(Uri.parse('$_baseUrl/api/v1/matches/$matchId'))
        .timeout(const Duration(seconds: 10));
    _assertOk(res);
    final body = json.decode(res.body) as Map<String, dynamic>;
    return CricketMatch.fromJson(body['data']);
  }

  // ── Scorecard ─────────────────────────────────────────────────────

  Future<Scorecard> getScorecard(String matchId) async {
    final res = await _client
        .get(Uri.parse('$_baseUrl/api/v1/matches/$matchId/scorecard'))
        .timeout(const Duration(seconds: 10));
    _assertOk(res);
    final body = json.decode(res.body) as Map<String, dynamic>;
    return Scorecard.fromJson(body['data']);
  }

  // ── Commentary ────────────────────────────────────────────────────

  Future<List<BallEvent>> getCommentary(String matchId, {int page = 1}) async {
    final res = await _client
        .get(Uri.parse('$_baseUrl/api/v1/matches/$matchId/commentary?page=$page&per_page=50'))
        .timeout(const Duration(seconds: 10));
    _assertOk(res);
    final body = json.decode(res.body) as Map<String, dynamic>;
    final data = (body['data'] ?? []) as List;
    return data.map((b) => BallEvent.fromJson(b)).toList();
  }

  // ── AI Prediction ─────────────────────────────────────────────────

  Future<Prediction> getPrediction(String matchId) async {
    final res = await _client
        .get(Uri.parse('$_baseUrl/api/v1/matches/$matchId/prediction'))
        .timeout(const Duration(seconds: 15));
    _assertOk(res);
    final body = json.decode(res.body) as Map<String, dynamic>;
    return Prediction.fromJson(body['data']);
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
  String toString() => 'ApiException($statusCode): $body';
}
