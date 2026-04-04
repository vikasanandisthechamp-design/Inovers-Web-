import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../theme/app_theme.dart';

const _backend = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'https://sportgod-backend-production.up.railway.app',
);

class TeamBuilderScreen extends StatefulWidget {
  final String matchId;
  const TeamBuilderScreen({super.key, required this.matchId});

  @override
  State<TeamBuilderScreen> createState() => _TeamBuilderScreenState();
}

class _TeamBuilderScreenState extends State<TeamBuilderScreen> {
  List<Map<String, dynamic>> _players = [];
  final Set<String> _selected = {};
  String? _captain;
  String? _viceCaptain;
  bool _loading = true;
  String? _error;
  double _budget = 100;
  double _spent = 0;

  @override
  void initState() {
    super.initState();
    _loadPlayers();
  }

  Future<void> _loadPlayers() async {
    setState(() => _loading = true);
    try {
      final token = context.read<AuthProvider>().accessToken;
      final res = await http.get(
        Uri.parse('$_backend/api/v1/fantasy/players/${widget.matchId}'),
        headers: {if (token != null) 'Authorization': 'Bearer $token'},
      ).timeout(const Duration(seconds: 10));

      if (res.statusCode == 200) {
        final data = json.decode(res.body);
        final players = (data['players'] ?? data['data'] ?? []) as List;
        setState(() {
          _players = players.cast<Map<String, dynamic>>();
          _budget = (data['budget'] ?? 100).toDouble();
          _loading = false;
        });
      } else {
        setState(() {
          _error = 'Failed to load players';
          _loading = false;
        });
      }
    } catch (e) {
      setState(() {
        _error = 'Network error';
        _loading = false;
      });
    }
  }

  void _togglePlayer(Map<String, dynamic> player) {
    final id = player['id'].toString();
    final cost = (player['credits'] ?? player['cost'] ?? 8.0).toDouble();

    setState(() {
      if (_selected.contains(id)) {
        _selected.remove(id);
        _spent -= cost;
        if (_captain == id) _captain = null;
        if (_viceCaptain == id) _viceCaptain = null;
      } else {
        if (_selected.length >= 11) return;
        if (_spent + cost > _budget) return;
        _selected.add(id);
        _spent += cost;
      }
    });
  }

  Future<void> _submitTeam() async {
    if (_selected.length != 11 || _captain == null || _viceCaptain == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Select 11 players, a Captain and Vice Captain')),
      );
      return;
    }

    final token = context.read<AuthProvider>().accessToken;
    if (token == null) return;

    try {
      final res = await http.post(
        Uri.parse('$_backend/api/v1/fantasy/teams/create'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: json.encode({
          'match_id': widget.matchId,
          'player_ids': _selected.toList(),
          'captain_id': _captain,
          'vice_captain_id': _viceCaptain,
        }),
      );

      if (res.statusCode == 200 || res.statusCode == 201) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Team submitted!'), backgroundColor: Color(0xFF00E5A8)),
          );
          Navigator.pop(context);
        }
      } else {
        final data = json.decode(res.body);
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(data['error'] ?? 'Failed to submit team')),
          );
        }
      }
    } catch (_) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Network error')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Build Team'),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 16),
            child: Center(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: const Color(0xFF00E5A8).withOpacity(0.1),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  '${_selected.length}/11',
                  style: const TextStyle(
                    fontSize: 14, fontWeight: FontWeight.w800,
                    color: Color(0xFF00E5A8),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text(_error!, style: TextStyle(color: SGColors.textMuted)))
              : Column(
                  children: [
                    // Budget bar
                    Container(
                      padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
                      color: SGColors.card,
                      child: Row(children: [
                        Text('Budget: ', style: TextStyle(fontSize: 12, color: SGColors.textMuted)),
                        Expanded(
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(4),
                            child: LinearProgressIndicator(
                              value: _spent / _budget,
                              backgroundColor: Colors.white.withOpacity(0.08),
                              valueColor: AlwaysStoppedAnimation(
                                _spent / _budget > 0.9 ? Colors.redAccent : const Color(0xFF00E5A8),
                              ),
                              minHeight: 6,
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Text(
                          '${(_budget - _spent).toStringAsFixed(1)} left',
                          style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: SGColors.textPrimary),
                        ),
                      ]),
                    ),

                    // Player list
                    Expanded(
                      child: ListView.builder(
                        padding: const EdgeInsets.all(12),
                        itemCount: _players.length,
                        itemBuilder: (_, i) => _playerCard(_players[i]),
                      ),
                    ),

                    // Submit
                    SafeArea(
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: SizedBox(
                          width: double.infinity,
                          height: 50,
                          child: ElevatedButton(
                            onPressed: _selected.length == 11 ? _submitTeam : null,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF00E5A8),
                              foregroundColor: const Color(0xFF0F0F11),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                            ),
                            child: const Text('Submit Team', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800)),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
    );
  }

  Widget _playerCard(Map<String, dynamic> player) {
    final id = player['id'].toString();
    final selected = _selected.contains(id);
    final name = player['name'] ?? player['player_name'] ?? '';
    final role = player['role'] ?? player['playing_role'] ?? '';
    final team = player['team'] ?? player['team_short'] ?? '';
    final cost = (player['credits'] ?? player['cost'] ?? 8.0).toDouble();
    final pts = player['points'] ?? player['pts_avg'] ?? 0;
    final isCap = _captain == id;
    final isVC = _viceCaptain == id;

    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: selected ? const Color(0xFF00E5A8).withOpacity(0.06) : SGColors.card,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(
          color: selected ? const Color(0xFF00E5A8).withOpacity(0.3) : Colors.white.withOpacity(0.06),
        ),
      ),
      child: ListTile(
        onTap: () => _togglePlayer(player),
        leading: CircleAvatar(
          radius: 18,
          backgroundColor: _roleColor(role).withOpacity(0.15),
          child: Text(
            _roleShort(role),
            style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: _roleColor(role)),
          ),
        ),
        title: Text(name, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: SGColors.textPrimary)),
        subtitle: Text('$team  ·  $cost pts  ·  Avg $pts', style: TextStyle(fontSize: 11, color: SGColors.textMuted)),
        trailing: selected
            ? Row(mainAxisSize: MainAxisSize.min, children: [
                _capButton('C', isCap, () => setState(() => _captain = isCap ? null : id)),
                const SizedBox(width: 6),
                _capButton('VC', isVC, () => setState(() => _viceCaptain = isVC ? null : id)),
              ])
            : Icon(Icons.add_circle_outline, color: SGColors.textMuted, size: 22),
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 4),
      ),
    );
  }

  Widget _capButton(String label, bool active, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 30, height: 30,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: active ? const Color(0xFF00E5A8) : Colors.transparent,
          border: Border.all(color: active ? const Color(0xFF00E5A8) : SGColors.textMuted),
        ),
        alignment: Alignment.center,
        child: Text(label, style: TextStyle(
          fontSize: 10, fontWeight: FontWeight.w800,
          color: active ? const Color(0xFF0F0F11) : SGColors.textMuted,
        )),
      ),
    );
  }

  Color _roleColor(String role) {
    switch (role.toLowerCase()) {
      case 'bat': case 'batter': return const Color(0xFF3B82F6);
      case 'bowl': case 'bowler': return const Color(0xFFA855F7);
      case 'all': case 'all-rounder': return const Color(0xFF00E5A8);
      case 'wk': case 'keeper': return const Color(0xFFFFD700);
      default: return SGColors.textMuted;
    }
  }

  String _roleShort(String role) {
    switch (role.toLowerCase()) {
      case 'bat': case 'batter': return 'BAT';
      case 'bowl': case 'bowler': return 'BWL';
      case 'all': case 'all-rounder': return 'AR';
      case 'wk': case 'keeper': return 'WK';
      default: return role.substring(0, role.length.clamp(0, 3)).toUpperCase();
    }
  }
}
