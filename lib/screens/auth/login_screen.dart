import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../theme/app_theme.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailCtrl = TextEditingController();
  final _passCtrl = TextEditingController();
  bool _isSignUp = false;
  String? _error;

  @override
  void dispose() {
    _emailCtrl.dispose();
    _passCtrl.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    final auth = context.read<AuthProvider>();
    final email = _emailCtrl.text.trim();
    final pass = _passCtrl.text.trim();
    if (email.isEmpty || pass.isEmpty) {
      setState(() => _error = 'Please fill in all fields');
      return;
    }
    String? err;
    if (_isSignUp) {
      err = await auth.signUp(email, pass);
    } else {
      err = await auth.signIn(email, pass);
    }
    if (err != null && mounted) {
      setState(() => _error = err);
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
                Text(
                  'SportGod AI',
                  style: TextStyle(
                    fontSize: 28, fontWeight: FontWeight.w900,
                    color: SGColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  _isSignUp ? 'Create your account' : 'Welcome back',
                  style: TextStyle(fontSize: 14, color: SGColors.textMuted),
                ),
                const SizedBox(height: 40),

                // Email
                _buildField(_emailCtrl, 'Email', Icons.email_outlined, false),
                const SizedBox(height: 14),

                // Password
                _buildField(_passCtrl, 'Password', Icons.lock_outline, true),
                const SizedBox(height: 8),

                if (_error != null)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: Text(_error!, style: const TextStyle(color: Colors.redAccent, fontSize: 13)),
                  ),

                const SizedBox(height: 8),

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
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(14),
                        ),
                      ),
                      child: auth.loading
                          ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.black))
                          : Text(
                              _isSignUp ? 'Create Account' : 'Sign In',
                              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: Color(0xFF0F0F11)),
                            ),
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
                      style: TextStyle(fontSize: 13, color: SGColors.textMuted),
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
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildField(TextEditingController ctrl, String hint, IconData icon, bool obscure) {
    return TextField(
      controller: ctrl,
      obscureText: obscure,
      style: const TextStyle(color: Colors.white, fontSize: 15),
      decoration: InputDecoration(
        hintText: hint,
        hintStyle: TextStyle(color: SGColors.textMuted),
        prefixIcon: Icon(icon, color: SGColors.textMuted, size: 20),
        filled: true,
        fillColor: Colors.white.withOpacity(0.05),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide(color: Colors.white.withOpacity(0.1)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide(color: Colors.white.withOpacity(0.1)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFF00E5A8)),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      ),
    );
  }
}
