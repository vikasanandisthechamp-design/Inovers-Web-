import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../providers/coins_provider.dart';
import '../../theme/app_theme.dart';

const _backend = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'https://sportgod-backend-production.up.railway.app',
);

class PredictScreen extends StatefulWidget {
  final String matchId;
  const PredictScreen({super.key, required this.matchId});

  @override
  State<PredictScreen> createState() => _PredictScreenState();
}

class _PredictScreenState extends State<PredictScreen> {
  List<Map<String, dynamic>> _markets = [];
  final Map<String, _Selection> _selections = {};
  bool _loading = true;
  bool _submitting = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadMarkets();
  }

  Future<void> _loadMarkets() async {
    setState(() => _loading = true);
    try {
      final token = context.read<AuthProvider>().accessToken;
      final res = await http.get(
        Uri.parse('$_backend/api/v1/games/predict/markets/${widget.matchId}'),
        headers: {if (token != null) 'Authorization': 'Bearer $token'},
      ).timeout(const Duration(seconds: 10));

      if (res.statusCode == 200) {
        final data = json.decode(res.body);
        final markets = (data['markets'] ?? data['data'] ?? []) as List;
        setState(() {
          _markets = markets.cast<Map<String, dynamic>>();
          _loading = false;
        });
      } else {
        setState(() {
          _error = 'No prediction questions available';
          _loading = false;
        });
      }
    } catch (_) {
      setState(() {
        _error = 'Failed to load predictions';
        _loading = false;
      });
    }
  }

  Future<void> _submitPredictions() async {
    if (_selections.isEmpty) return;
    setState(() => _submitting = true);

    final token = context.read<AuthProvider>().accessToken;
    if (token == null) return;

    int submitted = 0;
    for (final entry in _selections.entries) {
      try {
        final sel = entry.value;
        final res = await http.post(
          Uri.parse('$_backend/api/v1/games/predict/bet'),
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
          body: json.encode({
            'contest_id': widget.matchId,
            'match_id': widget.matchId,
            'market_id': entry.key,
            'option_id': sel.optionId,
            'option_label': sel.optionLabel,
            'odds': sel.odds,
            'coins': sel.coins,
          }),
        );

        if (res.statusCode == 200 || res.statusCode == 201) {
          submitted++;
        }
      } catch (_) {}
    }

    if (mounted) {
      context.read<CoinsProvider>().sync(token);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('$submitted prediction(s) submitted!'),
          backgroundColor: const Color(0xFF00E5A8),
        ),
      );
      setState(() => _submitting = false);
      _loadMarkets();
    }
  }

  @override
  Widget build(BuildContext context) {
    final coins = context.watch<CoinsProvider>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Predictions'),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 16),
            child: Center(
              child: Row(children: [
                const Icon(Icons.stars_rounded, size: 18, color: Color(0xFFFFD700)),
                const SizedBox(width: 4),
                Text('${coins.balance}', style: const TextStyle(
                  fontSize: 14, fontWeight: FontWeight.w800, color: Color(0xFFFFD700),
                )),
              ]),
            ),
          ),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(Icons.psychology_outlined, size: 48, color: SGColors.textMuted),
                    const SizedBox(height: 12),
                    Text(_error!, style: TextStyle(color: SGColors.textMuted)),
                    const SizedBox(height: 16),
                    TextButton(onPressed: _loadMarkets, child: const Text('Retry')),
                  ],
                ))
              : Column(children: [
                  // Disclaimer banner
                  Container(
                    margin: const EdgeInsets.fromLTRB(16, 12, 16, 0),
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                    decoration: BoxDecoration(
                      color: const Color(0xFF6366F1).withOpacity(0.08),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: const Color(0xFF6366F1).withOpacity(0.2)),
                    ),
                    child: Row(children: [
                      const Icon(Icons.info_outline_rounded, size: 16, color: Color(0xFF6366F1)),
                      const SizedBox(width: 8),
                      Expanded(child: Text(
                        'Points-only game. No real money involved. Play responsibly!',
                        style: TextStyle(fontSize: 11, color: const Color(0xFF6366F1).withOpacity(0.9)),
                      )),
                    ]),
                  ),

                  Expanded(
                    child: ListView.builder(
                      padding: const EdgeInsets.all(16),
                      itemCount: _markets.length,
                      itemBuilder: (_, i) => _marketCard(_markets[i]),
                    ),
                  ),
                  if (_selections.isNotEmpty)
                    SafeArea(
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: SizedBox(
                          width: double.infinity,
                          height: 50,
                          child: ElevatedButton(
                            onPressed: _submitting ? null : _submitPredictions,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF00E5A8),
                              foregroundColor: const Color(0xFF0F0F11),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                            ),
                            child: _submitting
                                ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2))
                                : Text(
                                    'Submit ${_selections.length} Prediction(s)',
                                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
                                  ),
                          ),
                        ),
                      ),
                    ),
                ]),
    );
  }

  Widget _marketCard(Map<String, dynamic> market) {
    final marketId = market['id'].toString();
    final question = market['question'] ?? market['title'] ?? '';
    final options = (market['options'] ?? []) as List;
    final status = market['status'] ?? 'open';
    final userPick = market['user_bet'] as Map<String, dynamic>?;
    final isLocked = status != 'open' || userPick != null;

    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: SGColors.card,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.08)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(question, style: const TextStyle(
            fontSize: 15, fontWeight: FontWeight.w700, color: SGColors.textPrimary,
          )),
          const SizedBox(height: 12),

          if (userPick != null)
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: const Color(0xFF00E5A8).withOpacity(0.08),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Row(children: [
                const Icon(Icons.check_circle_rounded, size: 18, color: Color(0xFF00E5A8)),
                const SizedBox(width: 8),
                Expanded(child: Text(
                  'Your pick: ${userPick['option_label']} (${userPick['coins']} pts)',
                  style: const TextStyle(fontSize: 12, color: Color(0xFF00E5A8)),
                )),
              ]),
            )
          else
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: options.map<Widget>((opt) {
                final optId = opt['id'].toString();
                final label = opt['label'] ?? '';
                final multiplier = (opt['odds'] ?? 1.0).toDouble();
                final selected = _selections[marketId]?.optionId == optId;

                return GestureDetector(
                  onTap: isLocked ? null : () {
                    setState(() {
                      if (selected) {
                        _selections.remove(marketId);
                      } else {
                        _selections[marketId] = _Selection(
                          optionId: optId,
                          optionLabel: label,
                          odds: multiplier,
                          coins: 50,
                        );
                      }
                    });
                  },
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                    decoration: BoxDecoration(
                      color: selected
                          ? const Color(0xFF00E5A8).withOpacity(0.12)
                          : Colors.white.withOpacity(0.04),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: selected
                            ? const Color(0xFF00E5A8).withOpacity(0.4)
                            : Colors.white.withOpacity(0.1),
                      ),
                    ),
                    child: Column(children: [
                      Text(label, style: TextStyle(
                        fontSize: 13, fontWeight: FontWeight.w700,
                        color: selected ? const Color(0xFF00E5A8) : SGColors.textPrimary,
                      )),
                      const SizedBox(height: 2),
                      Text('${multiplier}x pts', style: TextStyle(
                        fontSize: 11, color: SGColors.textMuted,
                      )),
                    ]),
                  ),
                );
              }).toList(),
            ),
        ],
      ),
    );
  }
}

class _Selection {
  final String optionId;
  final String optionLabel;
  final double odds;
  final int coins;

  _Selection({
    required this.optionId,
    required this.optionLabel,
    required this.odds,
    required this.coins,
  });
}
