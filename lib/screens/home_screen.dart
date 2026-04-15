import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../models/cricket_models.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _api = ApiService();
  List<CricketMatch> _matches  = [];
  bool               _loading  = true;
  String?            _error;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() { _loading = true; _error = null; });
    try {
      final matches = await _api.getLiveMatches();
      if (mounted) setState(() { _matches = matches; _loading = false; });
    } catch (e) {
      if (mounted) setState(() { _error = e.toString(); _loading = false; });
    }
  }

  @override
  void dispose() {
    _api.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Row(children: [
          Text('🏏 ', style: TextStyle(fontSize: 22)),
          Text('SportGod ', style: TextStyle(fontWeight: FontWeight.w800)),
          Text('AI', style: TextStyle(color: Colors.purpleAccent, fontWeight: FontWeight.w800)),
        ]),
        actions: [
          IconButton(icon: const Icon(Icons.refresh), onPressed: _load),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _load,
        child: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
            ? _ErrorView(error: _error!, onRetry: _load)
            : _matches.isEmpty
              ? const _EmptyState()
              : ListView.separated(
                  padding: const EdgeInsets.all(16),
                  itemCount:  _matches.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 12),
                  itemBuilder: (ctx, i) => _MatchCard(
                    match:  _matches[i],
                    onTap:  () => ctx.push('/match/${_matches[i].id}'),
                  ),
                ),
      ),
    );
  }
}

class _MatchCard extends StatelessWidget {
  final CricketMatch match;
  final VoidCallback onTap;
  const _MatchCard({required this.match, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final homeRuns = match.runsFor(match.teamHome.id);
    final awayRuns = match.runsFor(match.teamAway.id);
    final latestHome = homeRuns.lastOrNull;
    final latestAway = awayRuns.lastOrNull;

    return SGCard(
      onTap: onTap,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(match.matchType, style: const TextStyle(color: SGColors.textMuted, fontSize: 11, fontWeight: FontWeight.w600)),
              _StatusBadge(status: match.status),
            ],
          ),
          const SizedBox(height: 14),
          Row(
            children: [
              Expanded(child: _TeamBlock(
                name:   match.teamHome.name,
                short:  match.teamHome.short,
                run:    latestHome,
                align:  TextAlign.left,
              )),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 12),
                child: Text('vs', style: TextStyle(color: SGColors.textMuted, fontSize: 12, fontWeight: FontWeight.w700)),
              ),
              Expanded(child: _TeamBlock(
                name:   match.teamAway.name,
                short:  match.teamAway.short,
                run:    latestAway,
                align:  TextAlign.right,
              )),
            ],
          ),
          if (match.note.isNotEmpty) ...[
            const SizedBox(height: 10),
            Text(match.note,
              style: const TextStyle(color: SGColors.textSecondary, fontSize: 12),
              maxLines: 1, overflow: TextOverflow.ellipsis),
          ],
        ],
      ),
    );
  }
}

class _TeamBlock extends StatelessWidget {
  final String        name, short;
  final InningsRun?   run;
  final TextAlign     align;
  const _TeamBlock({required this.name, required this.short, this.run, required this.align});

  @override
  Widget build(BuildContext context) => Column(
    crossAxisAlignment: align == TextAlign.left ? CrossAxisAlignment.start : CrossAxisAlignment.end,
    children: [
      Text(short.isNotEmpty ? short : name,
        style: const TextStyle(color: SGColors.textPrimary, fontWeight: FontWeight.w600, fontSize: 14),
        textAlign: align, overflow: TextOverflow.ellipsis),
      if (run != null)
        Text(
          '${run!.scoreString}  (${run!.overs})',
          textAlign: align,
          style: const TextStyle(
            color:    SGColors.textPrimary,
            fontSize: 18, fontWeight: FontWeight.w800,
            fontFeatures: [FontFeature.tabularFigures()],
          ),
        ),
    ],
  );
}

class _StatusBadge extends StatelessWidget {
  final String status;
  const _StatusBadge({required this.status});

  @override
  Widget build(BuildContext context) {
    final isLive = status == 'Live';
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color:        (isLive ? SGColors.live : SGColors.textMuted).withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(20),
        border:       Border.all(color: (isLive ? SGColors.live : SGColors.textMuted).withValues(alpha: 0.3)),
      ),
      child: Row(mainAxisSize: MainAxisSize.min, children: [
        if (isLive) Container(
          width: 6, height: 6,
          margin: const EdgeInsets.only(right: 5),
          decoration: const BoxDecoration(color: SGColors.live, shape: BoxShape.circle),
        ),
        Text(status, style: TextStyle(
          color:      isLive ? SGColors.live : SGColors.textMuted,
          fontSize:   10, fontWeight: FontWeight.w800,
        )),
      ]),
    );
  }
}

class _EmptyState extends StatelessWidget {
  const _EmptyState();
  @override
  Widget build(BuildContext context) => const Center(
    child: Column(mainAxisSize: MainAxisSize.min, children: [
      Text('🏏', style: TextStyle(fontSize: 48)),
      SizedBox(height: 16),
      Text('No live matches right now', style: TextStyle(color: SGColors.textSecondary, fontSize: 16)),
      SizedBox(height: 6),
      Text('Pull to refresh', style: TextStyle(color: SGColors.textMuted, fontSize: 13)),
    ]),
  );
}

class _ErrorView extends StatelessWidget {
  final String error;
  final VoidCallback onRetry;
  const _ErrorView({required this.error, required this.onRetry});
  @override
  Widget build(BuildContext context) => Center(
    child: Column(mainAxisSize: MainAxisSize.min, children: [
      const Icon(Icons.wifi_off, color: SGColors.wicket, size: 48),
      const SizedBox(height: 12),
      const Text('Could not load matches', style: TextStyle(color: SGColors.textSecondary)),
      const SizedBox(height: 16),
      FilledButton(onPressed: onRetry, child: const Text('Retry')),
    ]),
  );
}
