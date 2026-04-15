import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:supabase_flutter/supabase_flutter.dart';
import '../services/supabase_service.dart';
import '../services/notification_service.dart';

const _authApiBase = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'https://sportgod-backend-production.up.railway.app',
);

class AuthProvider extends ChangeNotifier {
  User? _user;
  bool _loading = true;
  bool _isPremium = false;
  StreamSubscription<AuthState>? _sub;

  AuthProvider() {
    _user = SupabaseService.currentUser;
    _loading = false;
    _sub = SupabaseService.authStateChanges.listen((state) {
      _user = state.session?.user;
      if (_user != null) _fetchProfile();
      notifyListeners();
    });
    if (_user != null) _fetchProfile();
  }

  User? get user => _user;
  bool get loading => _loading;
  bool get isLoggedIn => _user != null;
  bool get isPremium => _isPremium;
  String? get accessToken => SupabaseService.accessToken;

  Future<void> _fetchProfile() async {
    try {
      final res = await SupabaseService.client
          .from('users')
          .select('is_premium')
          .eq('id', _user!.id)
          .maybeSingle();
      _isPremium = res?['is_premium'] == true;
      notifyListeners();
    } catch (_) {}
  }

  Future<String?> signIn(String email, String password) async {
    try {
      _loading = true;
      notifyListeners();
      await SupabaseService.signInWithEmail(email, password);
      return null;
    } on AuthException catch (e) {
      return e.message;
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  Future<String?> signUp(String email, String password) async {
    try {
      _loading = true;
      notifyListeners();
      await SupabaseService.signUpWithEmail(email, password);
      return null;
    } on AuthException catch (e) {
      return e.message;
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  Future<void> signOut() async {
    // Unregister FCM token so we stop sending push notifications to this device
    final token = NotificationService.fcmToken;
    final currentToken = accessToken;
    if (token != null && currentToken != null) {
      try {
        await http.delete(
          Uri.parse('$_authApiBase/api/v1/notifications/unregister-device'),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer $currentToken',
          },
          body: json.encode({'fcm_token': token}),
        ).timeout(const Duration(seconds: 5));
      } catch (_) {
        // Non-fatal — proceed with sign out regardless
      }
    }

    await SupabaseService.signOut();
    _isPremium = false;
    notifyListeners();
  }

  @override
  void dispose() {
    _sub?.cancel();
    super.dispose();
  }
}
