import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../theme/app_theme.dart';

class TermsScreen extends StatelessWidget {
  const TermsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Terms of Service')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          const Text('Terms of Service', style: TextStyle(
            fontSize: 22, fontWeight: FontWeight.w800, color: SGColors.textPrimary,
          )),
          const SizedBox(height: 6),
          Text('Last updated: April 2026', style: TextStyle(fontSize: 12, color: SGColors.textMuted)),
          const SizedBox(height: 24),

          _section('1. Acceptance of Terms',
            'By using SportGod AI, you agree to these terms. '
            'If you do not agree, please do not use the app.'),

          _section('2. Nature of the Platform',
            'SportGod AI is a skill-based sports engagement platform for entertainment purposes only. '
            'It is NOT a gambling, betting, or wagering platform.\n\n'
            'The app uses a virtual points system called "SG Points." These points:\n'
            '• Have NO real-world monetary value\n'
            '• Cannot be purchased with real money\n'
            '• Cannot be redeemed, withdrawn, or exchanged for cash, prizes, or goods\n'
            '• Exist solely for in-app engagement and leaderboard ranking\n\n'
            'SportGod AI does not facilitate, promote, or involve any form of real-money gambling.'),

          _section('3. Our Mission',
            'SportGod AI was built as a healthy alternative to real-money gambling platforms. '
            'We believe sports fans deserve skill-based engagement that rewards cricket knowledge — '
            'not luck-based systems that exploit users financially. '
            'We are committed to promoting responsible sports engagement.'),

          _section('4. Account Eligibility',
            'You must be at least 13 years old to create an account. '
            'You are responsible for maintaining the confidentiality of your login credentials.'),

          _section('5. User Conduct',
            'You agree not to:\n'
            '• Use the app for any unlawful purpose\n'
            '• Attempt to exploit bugs or vulnerabilities\n'
            '• Create multiple accounts to manipulate leaderboards\n'
            '• Impersonate other users'),

          _section('6. Prediction Challenges',
            'Prediction challenges are skill-based knowledge games similar to trivia quizzes. '
            'Users make predictions about cricket match outcomes using virtual SG Points. '
            'No element of real-money gambling or chance-based wagering exists in this feature. '
            'Results are determined by actual cricket match outcomes, rewarding cricket knowledge.'),

          _section('7. Fantasy Cricket',
            'Fantasy cricket allows users to build virtual teams and score points based on real player performance. '
            'This is a skill-based game for entertainment only. '
            'No real money is involved in team creation or scoring.'),

          _section('8. Intellectual Property',
            'All content, design, and branding in SportGod AI are owned by us. '
            'Cricket match data is sourced from third-party providers.'),

          _section('9. Limitation of Liability',
            'SportGod AI is provided "as is" without warranty. '
            'We are not liable for any damages arising from your use of the app.'),

          _section('10. Changes to Terms',
            'We may update these terms from time to time. '
            'Continued use of the app constitutes acceptance of updated terms.'),

          _section('11. Contact',
            'For questions or concerns, contact us at support@sportgod.in'),

          const SizedBox(height: 24),
          Center(
            child: TextButton(
              onPressed: () => launchUrl(Uri.parse('https://www.sportgod.in/terms')),
              child: const Text('View Full Terms Online'),
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
