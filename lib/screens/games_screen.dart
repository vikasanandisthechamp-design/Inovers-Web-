import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../models/cricket_models.dart';
import '../theme/app_theme.dart';

class GamesScreen extends StatefulWidget {
  const GamesScreen({super.key});

  @override
  State<GamesScreen> createState() => _GamesScreenState();
}

class _GamesScreenState extends State<GamesScreen> {
  final _api = ApiService();
  List<CricketMatch> _matches = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() => _loading = true);
    try {
      _matches = await _api.getLiveMatches();
    } catch (_) {}
    if (mounted) setState(() => _loading = false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Games')),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: _load,
              child: ListView(
                padding: const EdgeInsets.all(16),
                children: [
                  // Fantasy card
                  _gameTypeCard(
                    icon: Icons.groups_rounded,
                    title: 'Fantasy Cricket',
                    subtitle: 'Build your dream team and compete',
                    gradient: [const Color(0xFF6366F1), const Color(0xFF8B5CF6)],
                  ),
                  const SizedBox(height: 12),

                  // Predictions card
                  _gameTypeCard(
                    icon: Icons.psychology_rounded,
                    title: 'Predictions',
                    subtitle: 'Test your cricket knowledge, earn points',
                    gradient: [const Color(0xFF00E5A8), const Color(0xFF00C9FF)],
                  ),
                  const SizedBox(height: 12),

                  // Anti-gambling disclaimer
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                    decoration: BoxDecoration(
                      color: const Color(0xFF22C55E).withOpacity(0.06),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: const Color(0xFF22C55E).withOpacity(0.15)),
                    ),
                    child: Row(children: [
                      Icon(Icons.volunteer_activism_rounded, size: 18, color: const Color(0xFF22C55E).withOpacity(0.8)),
                      const SizedBox(width: 10),
                      Expanded(child: Text(
                        'Points-only platform. No real money. We promote skill-based sports engagement, not gambling.',
                        style: TextStyle(fontSize: 11, color: const Color(0xFF22C55E).withOpacity(0.9), height: 1.4),
                      )),
                    ]),
                  ),
                  const SizedBox(height: 24),

                  // Match picker
                  Text('SELECT A MATCH', style: TextStyle(
                    fontSize: 11, fontWeight: FontWeight.w800,
                    color: SGColors.textMuted, letterSpacing: 1.2,
                  )),
                  const SizedBox(height: 10),

                  if (_matches.isEmpty)
                    _emptyState()
                  else
                    ..._matches.map(_matchEntry),
                ],
              ),
            ),
    );
  }

  Widget _gameTypeCard({
    required IconData icon,
    required String title,
    required String subtitle,
    required List<Color> gradient,
  }) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(colors: gradient),
        borderRadius: BorderRadius.circular(18),
      ),
      child: Row(children: [
        Icon(icon, size: 36, color: Colors.white),
        const SizedBox(width: 16),
        Expanded(child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: Colors.white)),
            const SizedBox(height: 4),
            Text(subtitle, style: TextStyle(fontSize: 12, color: Colors.white.withOpacity(0.8))),
          ],
        )),
      ]),
    );
  }

  Widget _matchEntry(CricketMatch m) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: SGColors.card,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.white.withOpacity(0.08)),
      ),
      child: Column(children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 14, 16, 8),
          child: Row(children: [
            if (m.isLive)
              Container(
                width: 6, height: 6, margin: const EdgeInsets.only(right: 8),
                decoration: const BoxDecoration(color: SGColors.live, shape: BoxShape.circle),
              ),
            Text('${m.teamHome.short} vs ${m.teamAway.short}',
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: SGColors.textPrimary)),
            const Spacer(),
            Text(m.matchType, style: TextStyle(fontSize: 11, color: SGColors.textMuted)),
          ]),
        ),
        Divider(color: Colors.white.withOpacity(0.06), height: 1),
        Row(children: [
          Expanded(
            child: TextButton.icon(
              onPressed: () => Navigator.pushNamed(context, '/fantasy/build/${m.id}'),
              icon: const Icon(Icons.groups_rounded, size: 16),
              label: const Text('Fantasy', style: TextStyle(fontSize: 12)),
              style: TextButton.styleFrom(foregroundColor: const Color(0xFF6366F1)),
            ),
          ),
          Container(width: 1, height: 28, color: Colors.white.withOpacity(0.06)),
          Expanded(
            child: TextButton.icon(
              onPressed: () => Navigator.pushNamed(context, '/predict/${m.id}'),
              icon: const Icon(Icons.psychology_rounded, size: 16),
              label: const Text('Predict', style: TextStyle(fontSize: 12)),
              style: TextButton.styleFrom(foregroundColor: const Color(0xFF00E5A8)),
            ),
          ),
        ]),
      ]),
    );
  }

  Widget _emptyState() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(40),
        child: Column(children: [
          Icon(Icons.sports_cricket_outlined, size: 48, color: SGColors.textMuted),
          const SizedBox(height: 12),
          Text('No matches available', style: TextStyle(color: SGColors.textMuted)),
        ]),
      ),
    );
  }
}
