import 'package:flutter/material.dart';
import '../models/cricket_models.dart';
import '../theme/app_theme.dart';

class CommentaryFeedWidget extends StatelessWidget {
  final List<BallEvent> commentary;
  const CommentaryFeedWidget({super.key, required this.commentary});

  @override
  Widget build(BuildContext context) {
    return SGCard(
      padding: EdgeInsets.zero,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Commentary', style: TextStyle(
                  color: SGColors.textPrimary, fontWeight: FontWeight.w600, fontSize: 14,
                )),
                Text('${commentary.length} balls',
                  style: const TextStyle(color: SGColors.textMuted, fontSize: 12)),
              ],
            ),
          ),
          const Divider(height: 1),

          if (commentary.isEmpty)
            const Padding(
              padding: EdgeInsets.symmetric(vertical: 40),
              child: Center(child: Text('Waiting for first ball…',
                style: TextStyle(color: SGColors.textMuted))),
            )
          else
            ListView.separated(
              shrinkWrap:   true,
              physics:      const NeverScrollableScrollPhysics(),
              itemCount:    commentary.length > 30 ? 30 : commentary.length,
              separatorBuilder: (_, __) => const Divider(height: 1),
              itemBuilder:  (ctx, i) => _BallTile(
                ball:     commentary[i],
                isLatest: i == 0,
              ),
            ),
        ],
      ),
    );
  }
}

class _BallTile extends StatelessWidget {
  final BallEvent ball;
  final bool      isLatest;
  const _BallTile({required this.ball, required this.isLatest});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: isLatest ? SGColors.good.withOpacity(0.05) : Colors.transparent,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Over.ball
          SizedBox(
            width: 36,
            child: Text(
              ball.over,
              style: const TextStyle(
                color:      SGColors.textMuted,
                fontSize:   11,
                fontFamily: 'monospace',
              ),
            ),
          ),

          // Badge
          BallBadge(label: ball.badgeLabel),
          const SizedBox(width: 12),

          // Commentary
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  ball.commentary.isNotEmpty ? ball.commentary : '${ball.batsmanName} to ${ball.bowlerName}',
                  style: const TextStyle(
                    color:    SGColors.textPrimary,
                    fontSize: 13,
                    height:   1.5,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  '${ball.batsmanName} · ${ball.bowlerName}',
                  style: const TextStyle(color: SGColors.textMuted, fontSize: 11),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
