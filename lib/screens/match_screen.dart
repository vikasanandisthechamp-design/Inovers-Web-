import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../models/cricket_models.dart';
import '../services/api_service.dart';
import '../services/socket_service.dart';
import '../theme/app_theme.dart';
import '../widgets/match_header_widget.dart';
import '../widgets/live_scoreboard_widget.dart';
import '../widgets/commentary_feed_widget.dart';
import '../widgets/scorecard_table_widget.dart';
import '../widgets/ai_prediction_widget.dart';

class MatchScreen extends StatefulWidget {
  final String matchId;
  const MatchScreen({super.key, required this.matchId});

  @override
  State<MatchScreen> createState() => _MatchScreenState();
}

class _MatchScreenState extends State<MatchScreen>
    with SingleTickerProviderStateMixin {

  final _api    = ApiService();
  late  SocketService _socket;
  late  TabController _tabController;

  CricketMatch? _match;
  Scorecard?    _scorecard;
  Prediction?   _prediction;
  final List<BallEvent> _commentary = [];

  SocketState _socketState = SocketState.connecting;
  bool        _loading     = true;
  bool        _ballFlash   = false;
  String?     _error;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _socket = SocketService(widget.matchId);

    _socket.stateStream.listen((s) {
      if (mounted) setState(() => _socketState = s);
    });

    _socket.snapshotStream.listen(_handleSnapshot);
    _socket.ballStream.listen(_handleBall);

    _socket.connect();
    _loadInitialData();
  }

  Future<void> _loadInitialData() async {
    try {
      final results = await Future.wait([
        _api.getMatch(widget.matchId),
        _api.getScorecard(widget.matchId),
        _api.getCommentary(widget.matchId),
        _api.getPrediction(widget.matchId),
      ]);
      if (!mounted) return;
      setState(() {
        _match      = results[0] as CricketMatch;
        _scorecard  = results[1] as Scorecard;
        _commentary.addAll((results[2] as List<BallEvent>).reversed);
        _prediction = results[3] as Prediction;
        _loading    = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() { _error = e.toString(); _loading = false; });
    }
  }

  void _handleSnapshot(Map<String, dynamic> msg) {
    if (!mounted) return;
    setState(() {
      if (msg['match'] != null) {
        _match = CricketMatch.fromJson(msg['match']);
      }
      if (msg['scorecard'] != null) {
        _scorecard = Scorecard.fromJson(msg['scorecard']);
      }
      final balls = (msg['commentary'] ?? []) as List;
      if (balls.isNotEmpty) {
        final fresh = balls.map((b) => BallEvent.fromJson(b)).toList();
        for (final b in fresh) {
          if (!_commentary.any((c) => c.ballId == b.ballId)) {
            _commentary.insert(0, b);
          }
        }
      }
      _loading = false;
    });
  }

  void _handleBall(BallEvent ball) {
    if (!mounted) return;
    setState(() {
      if (!_commentary.any((c) => c.ballId == ball.ballId)) {
        _commentary.insert(0, ball);
        if (_commentary.length > 100) _commentary.removeLast();
      }
      _ballFlash = true;
    });
    Future.delayed(const Duration(milliseconds: 1500), () {
      if (mounted) setState(() => _ballFlash = false);
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    _socket.dispose();
    _api.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final match = _match;

    return Scaffold(
      appBar: AppBar(
        title: Text(match == null
          ? 'Loading…'
          : '${match.teamHome.short} vs ${match.teamAway.short}',
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 16),
            child: _ConnectionDot(state: _socketState),
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Live'),
            Tab(text: 'Scorecard'),
            Tab(text: 'AI'),
          ],
        ),
      ),
      body: _loading
        ? const _LoadingView()
        : _error != null
          ? _ErrorView(error: _error!, onRetry: _loadInitialData)
          : match == null
            ? const _LoadingView()
            : TabBarView(
                controller: _tabController,
                children: [
                  // ── Tab 1: Live ────────────────────────────────
                  _LiveTab(
                    match:      match,
                    scorecard:  _scorecard,
                    commentary: _commentary,
                    ballFlash:  _ballFlash,
                  ),
                  // ── Tab 2: Scorecard ───────────────────────────
                  _scorecard != null
                    ? ScorecardTableWidget(
                        scorecard: _scorecard!,
                        match:     match,
                      )
                    : const Center(child: Text('Scorecard loading…')),
                  // ── Tab 3: AI Predictions ──────────────────────
                  _prediction != null
                    ? AIPredictionWidget(
                        prediction: _prediction!,
                        match:      match,
                      )
                    : const Center(child: Text('Generating prediction…')),
                ],
              ),
    );
  }
}

// ── Live tab ──────────────────────────────────────────────────────────

class _LiveTab extends StatelessWidget {
  final CricketMatch    match;
  final Scorecard?      scorecard;
  final List<BallEvent> commentary;
  final bool            ballFlash;

  const _LiveTab({
    required this.match,
    required this.scorecard,
    required this.commentary,
    required this.ballFlash,
  });

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: () async {},
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          MatchHeaderWidget(match: match, ballFlash: ballFlash)
              .animate().fadeIn(duration: 300.ms),
          const SizedBox(height: 12),
          if (scorecard != null && match.isLive) ...[
            LiveScoreboardWidget(
              scorecard: scorecard!,
              match:     match,
              commentary: commentary,
              ballFlash: ballFlash,
            ).animate().fadeIn(duration: 400.ms, delay: 100.ms),
            const SizedBox(height: 12),
          ],
          CommentaryFeedWidget(commentary: commentary)
              .animate().fadeIn(duration: 500.ms, delay: 200.ms),
        ],
      ),
    );
  }
}

// ── Helper widgets ────────────────────────────────────────────────────

class _ConnectionDot extends StatelessWidget {
  final SocketState state;
  const _ConnectionDot({required this.state});

  @override
  Widget build(BuildContext context) {
    final color = switch (state) {
      SocketState.connected    => SGColors.good,
      SocketState.connecting   => SGColors.warn,
      SocketState.disconnected => SGColors.textMuted,
      SocketState.error        => SGColors.wicket,
    };
    final label = switch (state) {
      SocketState.connected    => 'Live',
      SocketState.connecting   => 'Connecting',
      SocketState.disconnected => 'Reconnecting',
      SocketState.error        => 'Error',
    };
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 8, height: 8,
          decoration: BoxDecoration(color: color, shape: BoxShape.circle),
        ),
        const SizedBox(width: 6),
        Text(label, style: TextStyle(color: color, fontSize: 12, fontWeight: FontWeight.w600)),
      ],
    );
  }
}

class _LoadingView extends StatelessWidget {
  const _LoadingView();
  @override
  Widget build(BuildContext context) => const Center(
    child: CircularProgressIndicator(),
  );
}

class _ErrorView extends StatelessWidget {
  final String error;
  final VoidCallback onRetry;
  const _ErrorView({required this.error, required this.onRetry});

  @override
  Widget build(BuildContext context) => Center(
    child: Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.error_outline, color: SGColors.wicket, size: 48),
          const SizedBox(height: 12),
          Text('Failed to load match', style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 8),
          Text(error, style: Theme.of(context).textTheme.bodySmall, textAlign: TextAlign.center),
          const SizedBox(height: 20),
          FilledButton(onPressed: onRetry, child: const Text('Retry')),
        ],
      ),
    ),
  );
}
