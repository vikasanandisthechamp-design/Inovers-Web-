import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../providers/coins_provider.dart';
import '../theme/app_theme.dart';
import 'chat/chat_screen.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final coins = context.watch<CoinsProvider>();
    final user = auth.user;

    return Scaffold(
      appBar: AppBar(title: const Text('Profile')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // User card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: SGColors.card,
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: Colors.white.withOpacity(0.08)),
            ),
            child: Row(children: [
              CircleAvatar(
                radius: 28,
                backgroundColor: const Color(0xFF00E5A8).withOpacity(0.15),
                child: Text(
                  (user?.email?.substring(0, 1) ?? 'U').toUpperCase(),
                  style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: Color(0xFF00E5A8)),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    user?.email ?? 'User',
                    style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: SGColors.textPrimary),
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 4),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color: auth.isPremium
                          ? const Color(0xFFA78BFA).withOpacity(0.15)
                          : const Color(0xFF00E5A8).withOpacity(0.1),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      auth.isPremium ? 'PRO' : 'FREE',
                      style: TextStyle(
                        fontSize: 10, fontWeight: FontWeight.w800,
                        color: auth.isPremium ? const Color(0xFFA78BFA) : const Color(0xFF00E5A8),
                        letterSpacing: 0.8,
                      ),
                    ),
                  ),
                ],
              )),
            ]),
          ),
          const SizedBox(height: 16),

          // Points card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(colors: [Color(0xFF1C1C21), Color(0xFF252530)]),
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: Colors.white.withOpacity(0.08)),
            ),
            child: Column(children: [
              Row(children: [
                const Icon(Icons.stars_rounded, size: 28, color: Color(0xFFFFD700)),
                const SizedBox(width: 16),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('SG Points', style: TextStyle(fontSize: 12, color: SGColors.textMuted)),
                    const SizedBox(height: 2),
                    Text(
                      '${coins.balance}',
                      style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w900, color: Color(0xFFFFD700)),
                    ),
                  ],
                ),
                const Spacer(),
                IconButton(
                  onPressed: () => coins.sync(auth.accessToken),
                  icon: const Icon(Icons.refresh_rounded, color: SGColors.textMuted, size: 20),
                ),
              ]),
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.03),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(children: [
                  Icon(Icons.info_outline_rounded, size: 14, color: SGColors.textMuted.withOpacity(0.6)),
                  const SizedBox(width: 6),
                  Expanded(child: Text(
                    'Virtual points for games only. No real-money value. Cannot be redeemed or exchanged.',
                    style: TextStyle(fontSize: 10, color: SGColors.textMuted, fontStyle: FontStyle.italic, height: 1.3),
                  )),
                ]),
              ),
            ]),
          ),
          const SizedBox(height: 24),

          // Menu items
          _menuItem(context, Icons.chat_bubble_rounded, 'SportsGPT Chat', 'Ask AI anything about cricket', () {
            Navigator.push(context, MaterialPageRoute(builder: (_) => const ChatScreen()));
          }),
          _menuItem(context, Icons.history_rounded, 'Game History', 'View past predictions & fantasy picks', null),
          _menuItem(context, Icons.leaderboard_rounded, 'Leaderboard', 'See top cricket minds', null),

          const SizedBox(height: 16),

          // Legal section header
          Padding(
            padding: const EdgeInsets.only(left: 4, bottom: 8),
            child: Text('LEGAL', style: TextStyle(
              fontSize: 10, fontWeight: FontWeight.w800, color: SGColors.textMuted, letterSpacing: 1.2,
            )),
          ),
          _menuItem(context, Icons.privacy_tip_outlined, 'Privacy Policy', 'How we handle your data', () {
            Navigator.pushNamed(context, '/privacy');
          }),
          _menuItem(context, Icons.description_outlined, 'Terms of Service', 'Rules and guidelines', () {
            Navigator.pushNamed(context, '/terms');
          }),
          _menuItem(context, Icons.info_outline_rounded, 'About', 'SportGod AI v1.0', null),

          const SizedBox(height: 24),

          // Anti-gambling statement
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: const Color(0xFF22C55E).withOpacity(0.04),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: const Color(0xFF22C55E).withOpacity(0.1)),
            ),
            child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Icon(Icons.volunteer_activism_rounded, size: 18, color: const Color(0xFF22C55E).withOpacity(0.7)),
              const SizedBox(width: 10),
              Expanded(child: Text(
                'SportGod AI promotes skill-based sports engagement as a healthy alternative to gambling. '
                'No real money is involved anywhere in this app.',
                style: TextStyle(fontSize: 11, color: const Color(0xFF22C55E).withOpacity(0.8), height: 1.4),
              )),
            ]),
          ),

          const SizedBox(height: 16),

          // Sign out
          TextButton.icon(
            onPressed: () => auth.signOut(),
            icon: const Icon(Icons.logout_rounded, size: 18),
            label: const Text('Sign Out'),
            style: TextButton.styleFrom(foregroundColor: Colors.redAccent),
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }

  Widget _menuItem(BuildContext context, IconData icon, String title, String subtitle, VoidCallback? onTap) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: SGColors.card,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.white.withOpacity(0.06)),
      ),
      child: ListTile(
        onTap: onTap,
        leading: Icon(icon, color: const Color(0xFF00E5A8), size: 22),
        title: Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: SGColors.textPrimary)),
        subtitle: Text(subtitle, style: TextStyle(fontSize: 12, color: SGColors.textMuted)),
        trailing: Icon(Icons.chevron_right_rounded, color: SGColors.textMuted, size: 20),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      ),
    );
  }
}
