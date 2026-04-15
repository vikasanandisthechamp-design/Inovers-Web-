import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../theme/app_theme.dart';

class PrivacyScreen extends StatelessWidget {
  const PrivacyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Privacy Policy')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          const Text('Privacy Policy', style: TextStyle(
            fontSize: 22, fontWeight: FontWeight.w800, color: SGColors.textPrimary,
          )),
          const SizedBox(height: 6),
          const Text('Last updated: April 2026', style: TextStyle(fontSize: 12, color: SGColors.textMuted)),
          const SizedBox(height: 24),

          _section('Information We Collect',
            'We collect your email address when you create an account. '
            'We also collect usage data such as app interactions to improve our services. '
            'We do NOT collect payment information, financial data, or location data.'),

          _section('How We Use Your Information',
            'Your email is used for account authentication and important notifications. '
            'Usage data helps us improve the app experience. '
            'We do not sell your personal information to third parties.'),

          _section('Virtual Points (SG Points)',
            'SG Points are virtual in-app points with no real-world monetary value. '
            'They cannot be purchased, redeemed, withdrawn, exchanged, or converted to real money, '
            'cash, prizes, gift cards, or any goods or services. '
            'SG Points exist solely for in-app engagement and leaderboard ranking.'),

          _section('Data Security',
            'All data is transmitted over encrypted HTTPS connections. '
            'Your account credentials are managed through Supabase, which uses industry-standard '
            'encryption and security practices.'),

          _section('Data Retention & Deletion',
            'You can request deletion of your account and all associated data by contacting us. '
            'Upon deletion, all personal data is permanently removed from our systems.'),

          _section('Third-Party Services',
            'We use Supabase for authentication, and our backend API for cricket data. '
            'We do not integrate with advertising networks or tracking services.'),

          _section('Children\'s Privacy',
            'This app is intended for users aged 13 and older. '
            'We do not knowingly collect information from children under 13.'),

          _section('Contact Us',
            'For questions about this privacy policy or to request data deletion, '
            'please contact us at support@sportgod.in'),

          const SizedBox(height: 24),
          Center(
            child: TextButton(
              onPressed: () => launchUrl(Uri.parse('https://www.sportgod.in/privacy')),
              child: const Text('View Full Policy Online'),
            ),
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _section(String title, String body) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(
            fontSize: 15, fontWeight: FontWeight.w700, color: SGColors.textPrimary,
          )),
          const SizedBox(height: 8),
          Text(body, style: const TextStyle(
            fontSize: 13, color: SGColors.textSecondary, height: 1.6,
          )),
        ],
      ),
    );
  }
}
