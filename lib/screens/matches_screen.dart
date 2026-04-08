import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../services/api_service.dart';
import '../models/cricket_models.dart';
import '../theme/app_theme.dart';

class MatchesScreen extends StatefulWidget {
  const MatchesScreen({super.key});

  @override
  State<MatchesScreen> createState() => _MatchesScreenState();
}

class _MatchesScreenState extends State<MatchesScreen> {
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
    final live = _matches.where((m) => m.isLive).toList();
    final other = _matches.where((m) => !m.isLive).toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Matches'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_rounded, size: 22),
            onPressed: _load,
          ),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: _load,
              child: ListView(
                padding: const EdgeInsets.all(16),
                children: [
                  if (live.isNotEmpty) ...[
                    _sectionHeader('LIVE', SGColors.live),
                    const SizedBox(height: 8),
                    ...live.map(_matchCard),
                    const SizedBox(height: 20),
                  ],
                  if (other.isNotEmpty) ...[
                    _sectionHeader('UPCOMING & RECENT', SGColors.textMuted),
                    const SizedBox(height: 8),
                    ...other.map(_matchCard),
                  ],
                  if (_matches.isEmpty)
                    Center(
                      child: Padding(
                        padding: const EdgeInsets.all(40),
                        child: Text('No matches found',
                          style: TextStyle(color: SGColors.textMuted)),
                      ),
                    ),
                ],
              ),
            ),
    );
  }

  Widget _sectionHeader(String title, Color color) {
    return Row(children: [
      Container(width: 6, height: 6, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
      const SizedBox(width: 8),
      Text(title, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: color, letterSpacing: 1.2)),
    ]);
  }

  Widget _matchCard(CricketMatch m) {
    return GestureDetector(
      onTap: () => context.push('/match/${m.id}'),
      child: Container(
        margin: const EdgeInsets.only(bottom: 10),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: SGColors.card,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.white.withOpacity(0.08)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Teams
            Row(
              children: [
                Expanded(child: _teamRow(m.teamHome, m.runsFor(m.teamHome.id))),
                const SizedBox(width: 12),
                Expanded(child: _teamRow(m.teamAway, m.runsFor(m.teamAway.id))),
              ],
            ),
            if (m.note.isNotEmpty) ...[
              const SizedBox(height: 10),
              Text(m.note, style: TextStyle(fontSize: 12, color: m.isLive ? SGColors.live : SGColors.textMuted)),
            ],
            const SizedBox(height: 6),
            Row(
              children: [
                if (m.isLive)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color: SGColors.live.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: const Text('LIVE', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: SGColors.live)),
                  ),
                const Spacer(),
                Text(m.matchType, style: TextStyle(fontSize: 11, color: SGColors.textMuted)),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _teamRow(Team team, List<InningsRun> runs) {
    final latest = runs.isNotEmpty ? runs.last : null;
    return Row(
      children: [
        Text(team.short, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: SGColors.textPrimary)),
        const Spacer(),
        if (latest != null)
          Text(latest.scoreString, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: SGColors.textPrimary)),
        if (latest != null) ...[
          const SizedBox(width: 6),
          Text(latest.oversString, style: TextStyle(fontSize: 11, color: SGColors.textMuted)),
        ],
      ],
    );
  }
}
