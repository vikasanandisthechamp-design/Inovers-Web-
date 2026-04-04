import 'dart:async';
import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../services/supabase_service.dart';

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
