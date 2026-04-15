import 'package:flutter/material.dart';
import '../models/cricket_models.dart';
import '../theme/app_theme.dart';

class AIPredictionWidget extends StatelessWidget {
  final Prediction   prediction;
  final CricketMatch match;
  const AIPredictionWidget({super.key, required this.prediction, required this.match});

  @override
  Widget build(BuildContext context) {
    if (prediction.hasError) {
      return const Center(
        child: Padding(padding: EdgeInsets.all(40),
          child: Text('Prediction unavailable', style: TextStyle(color: SGColors.textMuted))),
      );
    }

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          // ── Header ───────────────────────────────────────────
          SGCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Text('🤖 ', style: TextStyle(fontSize: 20)),
                    const Text('SportGod AI', style: TextStyle(
                      color: SGColors.textPrimary, fontWeight: FontWeight.w700, fontSize: 16,
                    )),
                    const SizedBox(width: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(
                        color:        Colors.purple.withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Text('Powered by Claude',
                        style: TextStyle(color: Colors.purpleAccent, fontSize: 10, fontWeight: FontWeight.w700)),
                    ),
                  ],
                ),
                const SizedBox(height: 20),

                // Win probability bar
                _WinProbBar(
                  homeProb: prediction.homeProb,
                  awayProb: prediction.awayProb,
                  homeTeam: match.teamHome.short,
                  awayTeam: match.teamAway.short,
                ),
                const SizedBox(height: 16),

                // Momentum
                _MomentumChip(momentum: prediction.momentum, reason: prediction.momentumReason),
              ],
            ),
          ),

          const SizedBox(height: 12),

          // ── Key insight ──────────────────────────────────────
          SGCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(children: [
                  Text('⚡ ', style: TextStyle(fontSize: 16)),
                  Text('Key Insight', style: TextStyle(
                    color: Colors.amber, fontWeight: FontWeight.w700, fontSize: 13,
                  )),
                ]),
                const SizedBox(height: 10),
                Text(prediction.keyInsight, style: const TextStyle(
                  color: SGColors.textPrimary, fontSize: 14, height: 1.5,
                )),
                const SizedBox(height: 12),
                Text(prediction.summary, style: const TextStyle(
                  color: SGColors.textSecondary, fontSize: 13, height: 1.5,
                )),
              ],
            ),
          ),

          // ── Risk factors ─────────────────────────────────────
          if (prediction.riskFactors.isNotEmpty) ...[
            const SizedBox(height: 12),
            SGCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Risk factors', style: TextStyle(
                    color: SGColors.textSecondary, fontSize: 11, fontWeight: FontWeight.w700,
                    letterSpacing: 0.8,
                  )),
                  const SizedBox(height: 10),
                  ...prediction.riskFactors.map((f) => Padding(
                    padding: const EdgeInsets.only(bottom: 6),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('▸ ', style: TextStyle(color: SGColors.wicket, fontSize: 12)),
                        Expanded(child: Text(f, style: const TextStyle(color: SGColors.textSecondary, fontSize: 13))),
                      ],
                    ),
                  )),
                ],
              ),
            ),
          ],

          const SizedBox(height: 12),

          // ── Confidence ───────────────────────────────────────
          SGCard(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('AI Confidence', style: TextStyle(color: SGColors.textSecondary, fontSize: 12)),
                Row(
                  children: List.generate(10, (i) => Padding(
                    padding: const EdgeInsets.only(left: 3),
                    child: Container(
                      width: 8, height: 8,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: i < prediction.confidence ? SGColors.good : Colors.white.withValues(alpha: 0.12),
                      ),
                    ),
                  )),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _WinProbBar extends StatelessWidget {
  final int    homeProb, awayProb;
  final String homeTeam, awayTeam;
  const _WinProbBar({required this.homeProb, required this.awayProb, required this.homeTeam, required this.awayTeam});

  @override
  Widget build(BuildContext context) => Column(
    children: [
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(homeTeam, style: const TextStyle(color: SGColors.textSecondary, fontSize: 12, fontWeight: FontWeight.w600)),
          Text(awayTeam, style: const TextStyle(color: SGColors.textSecondary, fontSize: 12, fontWeight: FontWeight.w600)),
        ],
      ),
      const SizedBox(height: 8),
      ClipRRect(
        borderRadius: BorderRadius.circular(8),
        child: Row(
          children: [
            Flexible(
              flex: homeProb,
              child: Container(
                height: 28,
                color: SGColors.boundary,
                alignment: Alignment.centerRight,
                padding: const EdgeInsets.only(right: 8),
                child: Text('$homeProb%', style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w800)),
              ),
            ),
            Flexible(
              flex: awayProb,
              child: Container(
                height: 28,
                color: SGColors.wicket,
                alignment: Alignment.centerLeft,
                padding: const EdgeInsets.only(left: 8),
                child: Text('$awayProb%', style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w800)),
              ),
            ),
          ],
        ),
      ),
    ],
  );
}

class _MomentumChip extends StatelessWidget {
  final String momentum, reason;
  const _MomentumChip({required this.momentum, required this.reason});

  @override
  Widget build(BuildContext context) {
    final color = switch (momentum) {
      'home'    => SGColors.boundary,
      'away'    => SGColors.wicket,
      _         => SGColors.textMuted,
    };
    final arrow = switch (momentum) {
      'home'    => '→ Home momentum',
      'away'    => '← Away momentum',
      _         => '↔ Balanced',
    };

    return Row(
      children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
          decoration: BoxDecoration(
            color:        color.withValues(alpha: 0.15),
            borderRadius: BorderRadius.circular(20),
          ),
          child: Text(arrow, style: TextStyle(color: color, fontSize: 11, fontWeight: FontWeight.w700)),
        ),
        const SizedBox(width: 10),
        Expanded(child: Text(reason, style: const TextStyle(color: SGColors.textSecondary, fontSize: 12))),
      ],
    );
  }
}
