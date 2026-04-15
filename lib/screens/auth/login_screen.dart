import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../services/supabase_service.dart';
import '../../theme/app_theme.dart';

/// Test credentials for App Store reviewers:
/// Email: reviewer@sportgod.in
/// Password: ReviewSportGod2026

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailCtrl = TextEditingController();
  final _passCtrl = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  bool _isSignUp = false;
  bool _obscure = true;
  bool _googleLoading = false;
  String? _error;

  @override
  void dispose() {
    _emailCtrl.dispose();
    _passCtrl.dispose();
    super.dispose();
  }

  String? _validateEmail(String? v) {
    if (v == null || v.trim().isEmpty) return 'Email is required';
    final regex = RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$');
    if (!regex.hasMatch(v.trim())) return 'Enter a valid email';
    return null;
  }

  String? _validatePassword(String? v) {
    if (v == null || v.isEmpty) return 'Password is required';
    if (v.length < 6) return 'Password must be at least 6 characters';
    return null;
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _error = null);

    final auth = context.read<AuthProvider>();
    final email = _emailCtrl.text.trim();
    final pass = _passCtrl.text.trim();

    String? err;
    if (_isSignUp) {
      err = await auth.signUp(email, pass);
      if (err == null && mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Account created! Please check your email to verify.'),
            backgroundColor: Color(0xFF00E5A8),
          ),
        );
      }
    } else {
      err = await auth.signIn(email, pass);
    }
    if (err != null && mounted) {
      setState(() => _error = err);
    }
  }

  Future<void> _signInWithGoogle() async {
    setState(() { _googleLoading = true; _error = null; });
    try {
      await SupabaseService.signInWithGoogle();
      // GoRouter redirect fires automatically once Supabase session is set.
    } catch (e) {
      if (mounted) setState(() => _error = 'Google sign-in failed. Try email instead.');
    } finally {
      if (mounted) setState(() => _googleLoading = false);
    }
  }

  Future<void> _forgotPassword() async {
    final email = _emailCtrl.text.trim();
    if (email.isEmpty) {
      setState(() => _error = 'Enter your email address first, then tap Forgot password.');
      return;
    }
    try {
      await SupabaseService.resetPassword(email);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text('Password reset email sent! Check your inbox.'),
          backgroundColor: Color(0xFF00E5A8),
        ));
      }
    } catch (e) {
      if (mounted) setState(() => _error = 'Could not send reset email. Check the address.');
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();

    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 32),
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Logo
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFF00E5A8), Color(0xFF00C9FF)],
                      ),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: const Center(
                      child: Text('SG', style: TextStyle(
                        fontSize: 32, fontWeight: FontWeight.w900,
                        color: Color(0xFF0F0F11),
                      )),
                    ),
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    'SportGod AI',
                    style: TextStyle(
                      fontSize: 28, fontWeight: FontWeight.w900,
                      color: SGColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    _isSignUp ? 'Create your account' : 'Welcome back',
                    style: const TextStyle(fontSize: 14, color: SGColors.textMuted),
                  ),
                  const SizedBox(height: 8),
                  // Anti-gambling tagline
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: const Color(0xFF22C55E).withValues(alpha: 0.06),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      'Skill-based cricket fun. No real money.',
                      style: TextStyle(fontSize: 11, color: const Color(0xFF22C55E).withValues(alpha: 0.8)),
                    ),
                  ),
                  const SizedBox(height: 32),

                  // Email field
                  TextFormField(
                    controller: _emailCtrl,
                    validator: _validateEmail,
                    keyboardType: TextInputType.emailAddress,
                    autocorrect: false,
                    style: const TextStyle(color: Colors.white, fontSize: 15),
                    decoration: _inputDecor('Email', Icons.email_outlined),
                  ),
                  const SizedBox(height: 14),

                  // Password field
                  TextFormField(
                    controller: _passCtrl,
                    validator: _validatePassword,
                    obscureText: _obscure,
                    style: const TextStyle(color: Colors.white, fontSize: 15),
                    decoration: _inputDecor('Password', Icons.lock_outline).copyWith(
                      suffixIcon: IconButton(
                        icon: Icon(
                          _obscure ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                          color: SGColors.textMuted, size: 20,
                        ),
                        onPressed: () => setState(() => _obscure = !_obscure),
                      ),
                    ),
                  ),

                  if (_error != null) ...[
                    const SizedBox(height: 12),
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: Colors.redAccent.withValues(alpha: 0.08),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Row(children: [
                        const Icon(Icons.error_outline, size: 16, color: Colors.redAccent),
                        const SizedBox(width: 8),
                        Expanded(child: Text(_error!, style: const TextStyle(color: Colors.redAccent, fontSize: 12))),
                      ]),
                    ),
                  ],

                  const SizedBox(height: 20),

                  // Submit button
                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: DecoratedBox(
                      decoration: BoxDecoration(
                        gradient: const LinearGradient(
                          colors: [Color(0xFF00E5A8), Color(0xFF00C9FF)],
                        ),
                        borderRadius: BorderRadius.circular(14),
                      ),
                      child: ElevatedButton(
                        onPressed: auth.loading ? null : _submit,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.transparent,
                          shadowColor: Colors.transparent,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        ),
                        child: auth.loading
                            ? const SizedBox(width: 22, height: 22,
                                child: CircularProgressIndicator(strokeWidth: 2, color: Colors.black))
                            : Text(
                                _isSignUp ? 'Create Account' : 'Sign In',
                                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: Color(0xFF0F0F11)),
                              ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 14),

                  // Forgot password (sign-in only)
                  if (!_isSignUp)
                    Align(
                      alignment: Alignment.centerRight,
                      child: GestureDetector(
                        onTap: _forgotPassword,
                        child: const Text(
                          'Forgot password?',
                          style: TextStyle(
                            fontSize: 12,
                            color: SGColors.textMuted,
                            decoration: TextDecoration.underline,
                          ),
                        ),
                      ),
                    ),

                  const SizedBox(height: 20),

                  // Divider with "OR"
                  Row(children: [
                    Expanded(child: Divider(color: Colors.white.withValues(alpha: 0.1))),
                    const Padding(
                      padding: EdgeInsets.symmetric(horizontal: 12),
                      child: Text('OR', style: TextStyle(
                        fontSize: 11, color: SGColors.textMuted, letterSpacing: 1.5,
                      )),
                    ),
                    Expanded(child: Divider(color: Colors.white.withValues(alpha: 0.1))),
                  ]),

                  const SizedBox(height: 16),

                  // Google SSO button
                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: OutlinedButton.icon(
                      onPressed: (auth.loading || _googleLoading) ? null : _signInWithGoogle,
                      icon: _googleLoading
                        ? const SizedBox(
                            width: 18, height: 18,
                            child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                          )
                        : Image.network(
                            'https://developers.google.com/identity/images/g-logo.png',
                            width: 18, height: 18,
                            errorBuilder: (_, __, ___) => const Icon(Icons.login, size: 18, color: Colors.white),
                          ),
                      label: const Text(
                        'Continue with Google',
                        style: TextStyle(
                          fontSize: 14, fontWeight: FontWeight.w600, color: Colors.white,
                        ),
                      ),
                      style: OutlinedButton.styleFrom(
                        side: BorderSide(color: Colors.white.withValues(alpha: 0.15)),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        backgroundColor: Colors.white.withValues(alpha: 0.04),
                      ),
                    ),
                  ),

                  const SizedBox(height: 20),

                  // Toggle sign in / sign up
                  GestureDetector(
                    onTap: () => setState(() {
                      _isSignUp = !_isSignUp;
                      _error = null;
                    }),
                    child: RichText(
                      text: TextSpan(
                        style: const TextStyle(fontSize: 13, color: SGColors.textMuted),
                        children: [
                          TextSpan(text: _isSignUp ? 'Already have an account? ' : "Don't have an account? "),
                          TextSpan(
                            text: _isSignUp ? 'Sign In' : 'Sign Up',
                            style: const TextStyle(color: Color(0xFF00E5A8), fontWeight: FontWeight.w700),
                          ),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 32),

                  // Legal links
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      GestureDetector(
                        onTap: () => context.push('/privacy'),
                        child: const Text('Privacy Policy', style: TextStyle(fontSize: 11, color: SGColors.textMuted, decoration: TextDecoration.underline)),
                      ),
                      const Padding(
                        padding: EdgeInsets.symmetric(horizontal: 12),
                        child: Text('·', style: TextStyle(color: SGColors.textMuted)),
                      ),
                      GestureDetector(
                        onTap: () => context.push('/terms'),
                        child: const Text('Terms of Service', style: TextStyle(fontSize: 11, color: SGColors.textMuted, decoration: TextDecoration.underline)),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  InputDecoration _inputDecor(String hint, IconData icon) {
    return InputDecoration(
      hintText: hint,
      hintStyle: const TextStyle(color: SGColors.textMuted),
      prefixIcon: Icon(icon, color: SGColors.textMuted, size: 20),
      filled: true,
      fillColor: Colors.white.withValues(alpha: 0.05),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: BorderSide(color: Colors.white.withValues(alpha: 0.1)),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: BorderSide(color: Colors.white.withValues(alpha: 0.1)),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(color: Color(0xFF00E5A8)),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(color: Colors.redAccent),
      ),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
    );
  }
}
