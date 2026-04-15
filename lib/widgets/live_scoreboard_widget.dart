import 'package:flutter/material.dart';
import '../models/cricket_models.dart';
import '../theme/app_theme.dart';

class LiveScoreboardWidget extends StatelessWidget {
  final Scorecard      scorecard;
  final CricketMatch   match;
  final List<BallEvent> commentary;
  final bool           ballFlash;

  const LiveScoreboardWidget({
    super.key,
    required this.scorecard,
    required this.match,
    required this.commentary,
    required this.ballFlash,
  });

  String get _latestInning {
    for (final k in ['S4', 'S3', 'S2', 'S1']) {
      if (scorecard.batting.any((b) => b.inning == k)) return k;
    }
    return 'S1';
  }

  @override
  Widget build(BuildContext context) {
    final inn      = _latestInning;
    final batters  = scorecard.batting.where((b) => b.inning == inn && b.isNotOut).take(2).toList();
    final bowler   = scorecard.bowling.where((b) => b.inning == inn).lastOrNull;
    final lastBall = commentary.firstOrNull;

    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      decoration: BoxDecoration(
        color:        SGColors.card,
        borderRadius: BorderRadius.circular(16),
        border:       Border.all(
          color: ballFlash ? SGColors.good.withValues(alpha: 0.7) : Colors.white.withValues(alpha: 0.08),
          width: ballFlash ? 1.5 : 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Live', style: TextStyle(color: SGColors.textPrimary, fontWeight: FontWeight.w600, fontSize: 14)),
                if (lastBall != null) BallBadge(label: lastBall.badgeLabel),
              ],
            ),
          ),
          const Divider(height: 1),

          // Batters
          const Padding(
            padding: EdgeInsets.fromLTRB(16, 12, 16, 4),
            child: Text('BATTING', style: TextStyle(
              color: SGColors.textMuted, fontSize: 10, fontWeight: FontWeight.w700, letterSpacing: 1,
            )),
          ),
          ...batters.map((b) => _BatterTile(
            batter:      b,
            isOnStrike:  lastBall?.batsmanName == b.playerName,
          )),

          if (bowler != null) ...[
            const Divider(height: 1),
            const Padding(
              padding: EdgeInsets.fromLTRB(16, 12, 16, 4),
              child: Text('BOWLING', style: TextStyle(
                color: SGColors.textMuted, fontSize: 10, fontWeight: FontWeight.w700, letterSpacing: 1,
              )),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text(bowler.playerName, style: const TextStyle(color: SGColors.textPrimary, fontWeight: FontWeight.w500)),
                    Text('Econ ${bowler.economy.toStringAsFixed(2)}', style: const TextStyle(color: SGColors.textMuted, fontSize: 11)),
                  ]),
                  Text(
                    '${bowler.wickets}/${bowler.runs} (${bowler.overs} ov)',
                    style: const TextStyle(color: SGColors.textPrimary, fontWeight: FontWeight.w700, fontSize: 14),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _BatterTile extends StatelessWidget {
  final BattingRow batter;
  final bool       isOnStrike;
  const _BatterTile({required this.batter, required this.isOnStrike});

  @override
  Widget build(BuildContext context) => Container(
    margin: const EdgeInsets.fromLTRB(16, 0, 16, 8),
    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
    decoration: BoxDecoration(
      color: isOnStrike ? SGColors.primary.withValues(alpha: 0.1) : Colors.white.withValues(alpha: 0.04),
      borderRadius: BorderRadius.circular(10),
      border: isOnStrike ? Border.all(color: SGColors.primary.withValues(alpha: 0.4)) : null,
    ),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Row(children: [
          if (isOnStrike) const Text('🏏 ', style: TextStyle(fontSize: 14)),
          Text(batter.playerName, style: const TextStyle(color: SGColors.textPrimary, fontWeight: FontWeight.w500)),
        ]),
        Text(
          '${batter.runs} (${batter.balls})  SR ${batter.strikeRate.toStringAsFixed(1)}',
          style: const TextStyle(color: SGColors.textSecondary, fontSize: 12, fontFeatures: [FontFeature.tabularFigures()]),
        ),
      ],
    ),
  );
}
