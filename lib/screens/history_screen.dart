import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../providers/auth_provider.dart';
import '../theme/app_theme.dart';

/// Shows a unified activity feed: recent prediction results + fantasy contest results.
/// All data is read directly from Supabase (authenticated user's rows only).
class HistoryScreen extends StatefulWidget {
  const HistoryScreen({super.key});

  @override
  State<HistoryScreen> createState() => _HistoryScreenState();
}

class _HistoryScreenState extends State<HistoryScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabCtrl;
  List<Map<String, dynamic>> _predictions = [];
  List<Map<String, dynamic>> _fantasy     = [];
  bool _loadingPred = true;
  bool _loadingFant = true;

  @override
  void initState() {
    super.initState();
    _tabCtrl = TabController(length: 2, vsync: this);
    _loadPredictions();
    _loadFantasy();
  }

  @override
  void dispose() {
    _tabCtrl.dispose();
    super.dispose();
  }

  Future<void> _loadPredictions() async {
    setState(() => _loadingPred = true);
    try {
      final db = Supabase.instance.client;
      // user_predictions joined to prediction_questions for question text
      final res = await db
          .from('user_predictions')
          .select('id, match_id, selected_option, result, coins_wagered, coins_won, created_at, prediction_questions(question_text, question_type)')
          .order('created_at', ascending: false)
          .limit(50);
      if (mounted) {
        setState(() {
          _predictions = (res as List).map((e) => e as Map<String, dynamic>).toList();
          _loadingPred = false;
        });
      }
    } catch (_) {
      if (mounted) setState(() => _loadingPred = false);
    }
  }

  Future<void> _loadFantasy() async {
    setState(() => _loadingFant = true);
    try {
      final db = Supabase.instance.client;
      // contest_participants joined to contests for match/title info
      final res = await db
          .from('contest_participants')
          .select('id, contest_id, team_code, total_pts, rank, prize_won, joined_at, contests(title, match_id, match_name, status, prize_pool)')
          .order('joined_at', ascending: false)
          .limit(50);
      if (mounted) {
        setState(() {
          _fantasy = (res as List).map((e) => e as Map<String, dynamic>).toList();
          _loadingFant = false;
        });
      }
    } catch (_) {
      if (mounted) setState(() => _loadingFant = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Game History'),
        bottom: TabBar(
          controller: _tabCtrl,
          tabs: const [
            Tab(text: 'Predictions'),
            Tab(text: 'Fantasy'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabCtrl,
        children: [
          _PredictionHistory(
            items: _predictions,
            loading: _loadingPred,
            onRefresh: _loadPredictions,
          ),
          _FantasyHistory(
            items: _fantasy,
            loading: _loadingFant,
            onRefresh: _loadFantasy,
          ),
        ],
      ),
    );
  }
}

// ── Prediction history tab ────────────────────────────────────────────────────

class _PredictionHistory extends StatelessWidget {
  final List<Map<String, dynamic>> items;
  final bool loading;
  final Future<void> Function() onRefresh;

  const _PredictionHistory({
    required this.items, required this.loading, required this.onRefresh,
  });

  @override
  Widget build(BuildContext context) {
    if (loading) {
      return const Center(child: CircularProgressIndicator(strokeWidth: 2));
    }
    if (items.isEmpty) {
      return _emptyState('No predictions yet', 'Submit predictions on live matches to see your history here.',
          Icons.psychology_outlined);
    }
    return RefreshIndicator(
      onRefresh: onRefresh,
      child: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: items.length,
        separatorBuilder: (_, __) => const SizedBox(height: 8),
        itemBuilder: (_, i) => _PredCard(item: items[i]),
      ),
    );
  }
}

class _PredCard extends StatelessWidget {
  final Map<String, dynamic> item;
  const _PredCard({required this.item});

  @override
  Widget build(BuildContext context) {
    final result  = item['result'] as String? ?? 'pending';
    final question = (item['prediction_questions'] as Map<String, dynamic>?)?['question_text'] ?? 'Prediction';
    final wagered = (item['coins_wagered'] ?? 0) as int;
    final won     = (item['coins_won'] ?? 0) as int;
    final date    = _formatDate(item['created_at'] as String? ?? '');

    final (statusColor, statusIcon, statusText) = switch (result) {
      'won'     => (SGColors.good,    Icons.check_circle_rounded,   'Won'),
      'lost'    => (SGColors.wicket,  Icons.cancel_rounded,         'Lost'),
      'refunded'=> (SGColors.warn,    Icons.undo_rounded,           'Refunded'),
      _         => (SGColors.textMuted, Icons.hourglass_top_rounded, 'Pending'),
    };

    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: SGColors.card,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: statusColor.withValues(alpha: 0.2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(children: [
            Expanded(child: Text(question,
              style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: SGColors.textPrimary),
              maxLines: 2, overflow: TextOverflow.ellipsis)),
            const SizedBox(width: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color: statusColor.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(mainAxisSize: MainAxisSize.min, children: [
                Icon(statusIcon, size: 12, color: statusColor),
                const SizedBox(width: 4),
                Text(statusText, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: statusColor)),
              ]),
            ),
          ]),
          const SizedBox(height: 8),
          Row(children: [
            Text('Your pick: ${item['selected_option'] ?? '—'}',
              style: TextStyle(fontSize: 12, color: SGColors.textSecondary)),
            const Spacer(),
            if (result == 'won' && won > 0)
              Text('+$won pts', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: SGColors.good))
            else if (wagered > 0)
              Text('-$wagered pts', style: TextStyle(fontSize: 12, color: SGColors.textMuted)),
          ]),
          const SizedBox(height: 4),
          Text(date, style: TextStyle(fontSize: 11, color: SGColors.textMuted)),
        ],
      ),
    );
  }
}

// ── Fantasy history tab ───────────────────────────────────────────────────────

class _FantasyHistory extends StatelessWidget {
  final List<Map<String, dynamic>> items;
  final bool loading;
  final Future<void> Function() onRefresh;

  const _FantasyHistory({
    required this.items, required this.loading, required this.onRefresh,
  });

  @override
  Widget build(BuildContext context) {
    if (loading) {
      return const Center(child: CircularProgressIndicator(strokeWidth: 2));
    }
    if (items.isEmpty) {
      return _emptyState('No fantasy teams yet', 'Join contests and build your dream team to see results here.',
          Icons.groups_outlined);
    }
    return RefreshIndicator(
      onRefresh: onRefresh,
      child: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: items.length,
        separatorBuilder: (_, __) => const SizedBox(height: 8),
        itemBuilder: (_, i) => _FantasyCard(item: items[i]),
      ),
    );
  }
}

class _FantasyCard extends StatelessWidget {
  final Map<String, dynamic> item;
  const _FantasyCard({required this.item});

  @override
  Widget build(BuildContext context) {
    final contest   = (item['contests'] as Map<String, dynamic>?) ?? {};
    final title     = contest['title'] ?? contest['match_name'] ?? 'Contest';
    final pts       = (item['total_pts'] ?? 0) as int;
    final rank      = item['rank'] as int?;
    final prize     = (item['prize_won'] ?? 0) as int;
    final status    = contest['status'] as String? ?? 'open';
    final teamCode  = item['team_code'] as String? ?? '';
    final date      = _formatDate(item['joined_at'] as String? ?? '');

    final isCompleted = status == 'completed' || status == 'settled';
    final rankColor = (rank ?? 999) <= 3 && isCompleted
        ? const Color(0xFFFFD700) : SGColors.textSecondary;

    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: SGColors.card,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(children: [
            Expanded(child: Text(title,
              style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: SGColors.textPrimary),
              maxLines: 2, overflow: TextOverflow.ellipsis)),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color: _statusColor(status).withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(status.toUpperCase(),
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: _statusColor(status))),
            ),
          ]),
          const SizedBox(height: 8),
          Row(children: [
            // Points
            _statBadge('PTS', '$pts', SGColors.textPrimary),
            const SizedBox(width: 12),
            // Rank
            if (rank != null && isCompleted)
              _statBadge('RANK', '#$rank', rankColor),
            // Prize
            if (prize > 0) ...[
              const SizedBox(width: 12),
              _statBadge('WON', '+$prize pts', SGColors.good),
            ],
            const Spacer(),
            if (teamCode.isNotEmpty)
              Text(teamCode, style: TextStyle(fontSize: 11, color: SGColors.textMuted)),
          ]),
          const SizedBox(height: 4),
          Text(date, style: TextStyle(fontSize: 11, color: SGColors.textMuted)),
        ],
      ),
    );
  }

  Widget _statBadge(String label, String value, Color color) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(label, style: TextStyle(fontSize: 9, fontWeight: FontWeight.w800, color: SGColors.textMuted, letterSpacing: 0.5)),
      Text(value, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: color)),
    ],
  );

  Color _statusColor(String status) => switch (status) {
    'live'      => SGColors.live,
    'completed' => SGColors.good,
    'settled'   => SGColors.good,
    'cancelled' => SGColors.wicket,
    _           => SGColors.textMuted,
  };
}

// ── Shared helpers ────────────────────────────────────────────────────────────

Widget _emptyState(String title, String subtitle, IconData icon) => Center(
  child: Padding(
    padding: const EdgeInsets.all(40),
    child: Column(mainAxisSize: MainAxisSize.min, children: [
      Icon(icon, size: 56, color: SGColors.textMuted),
      const SizedBox(height: 16),
      Text(title, style: const TextStyle(
        fontSize: 16, fontWeight: FontWeight.w700, color: SGColors.textPrimary)),
      const SizedBox(height: 8),
      Text(subtitle, style: TextStyle(
        fontSize: 13, color: SGColors.textMuted, height: 1.4),
        textAlign: TextAlign.center),
    ]),
  ),
);

String _formatDate(String iso) {
  if (iso.isEmpty) return '';
  try {
    final dt = DateTime.parse(iso).toLocal();
    final months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return '${dt.day} ${months[dt.month - 1]} · ${dt.hour.toString().padLeft(2,'0')}:${dt.minute.toString().padLeft(2,'0')}';
  } catch (_) {
    return '';
  }
}
