import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:share_plus/share_plus.dart';
import '../../models/contest_models.dart';
import '../../providers/auth_provider.dart';
import '../../services/contest_service.dart';
import '../../theme/app_theme.dart';

class PartnerScreen extends StatefulWidget {
  const PartnerScreen({super.key});

  @override
  State<PartnerScreen> createState() => _PartnerScreenState();
}

class _PartnerScreenState extends State<PartnerScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  ContestService? _service;

  bool _loading = true;
  bool _applying = false;
  String? _error;

  // Partner data
  bool _isPartner = false;
  PartnerData? _partner;
  List<Earning> _earnings = [];
  List<Map<String, dynamic>> _referrals = [];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _loadPartnerData();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _loadPartnerData() async {
    setState(() { _loading = true; _error = null; });

    final token = context.read<AuthProvider>().accessToken;
    _service = ContestService(token: token);

    try {
      final result = await _service!.getPartnerStatus();

      if (result['isPartner'] == true || result['partner'] != null) {
        _isPartner = true;
        final partnerJson = result['partner'] as Map<String, dynamic>? ?? result;
        _partner = PartnerData.fromJson(partnerJson);

        // Load earnings
        final earningsList = result['earnings'] as List? ?? [];
        _earnings = earningsList.map((e) => Earning.fromJson(e as Map<String, dynamic>)).toList();

        // Load referrals
        _referrals = (result['referrals'] as List? ?? []).cast<Map<String, dynamic>>();
      } else {
        _isPartner = false;
      }
    } catch (e) {
      _error = 'Failed to load partner data';
    }

    if (mounted) setState(() => _loading = false);
  }

  Future<void> _applyAsPartner() async {
    setState(() => _applying = true);

    final token = context.read<AuthProvider>().accessToken;
    _service = ContestService(token: token);

    String? successMsg;
    String? errorMsg;

    try {
      final result = await _service!.applyPartner();
      if (result['ok'] == true) {
        successMsg = 'Partner application submitted! 🎉';
        await _loadPartnerData();
      } else {
        errorMsg = result['error'] as String? ?? 'Failed to apply';
      }
    } catch (_) {
      errorMsg = 'Network error. Try again.';
    }

    if (!mounted) return;
    setState(() => _applying = false);

    if (successMsg != null) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text(successMsg),
        backgroundColor: const Color(0xFF00E5A8),
      ));
    } else if (errorMsg != null) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(errorMsg)));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Partner Program'),
        centerTitle: true,
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? _buildError()
              : _isPartner
                  ? _buildPartnerDashboard()
                  : _buildApplyScreen(),
    );
  }

  // ── Apply Screen ──────────────────────────────────────────────────────

  Widget _buildApplyScreen() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Hero section
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  const Color(0xFF6366F1).withValues(alpha: 0.15),
                  const Color(0xFF8B5CF6).withValues(alpha: 0.08),
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0xFF6366F1).withValues(alpha: 0.2)),
            ),
            child: const Column(
              children: [
                Icon(Icons.rocket_launch_rounded, size: 48, color: Color(0xFF8B5CF6)),
                SizedBox(height: 16),
                Text(
                  'Become a Partner',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900, color: SGColors.textPrimary),
                ),
                SizedBox(height: 8),
                Text(
                  'Create private contests, earn from every entry, and grow your cricket community.',
                  style: TextStyle(fontSize: 14, color: SGColors.textMuted, height: 1.5),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),

          const SizedBox(height: 24),

          // Benefits
          _benefitCard(Icons.sports_cricket_rounded, 'Create Private Games',
              'Host exclusive contests with custom entry fees and invite codes'),
          _benefitCard(Icons.monetization_on_rounded, 'Earn 10% Commission',
              'Get 10% of every entry fee from your private contests'),
          _benefitCard(Icons.people_rounded, 'Build Your Community',
              'Share referral links and grow your player base'),
          _benefitCard(Icons.trending_up_rounded, 'Track Performance',
              'Full analytics dashboard with earnings and referral stats'),

          const SizedBox(height: 24),

          // Requirements
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFFFFA500).withValues(alpha: 0.06),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: const Color(0xFFFFA500).withValues(alpha: 0.15)),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(Icons.info_outline_rounded, size: 18, color: Color(0xFFFFA500)),
                    SizedBox(width: 8),
                    Text('Activation Requirement',
                        style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: Color(0xFFFFA500))),
                  ],
                ),
                SizedBox(height: 8),
                Text(
                  'Refer 49 users to activate your partner account. Once active, you can create private contests and earn commissions.',
                  style: TextStyle(fontSize: 13, color: SGColors.textMuted, height: 1.5),
                ),
              ],
            ),
          ),

          const SizedBox(height: 32),

          // Apply button
          SizedBox(
            height: 52,
            child: ElevatedButton(
              onPressed: _applying ? null : _applyAsPartner,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF8B5CF6),
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
              ),
              child: _applying
                  ? const SizedBox(width: 22, height: 22,
                      child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                  : const Text('Apply Now', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800)),
            ),
          ),

          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _benefitCard(IconData icon, String title, String desc) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: SGColors.card,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
      ),
      child: Row(
        children: [
          Container(
            width: 42,
            height: 42,
            decoration: BoxDecoration(
              color: const Color(0xFF00E5A8).withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, size: 22, color: const Color(0xFF00E5A8)),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: SGColors.textPrimary)),
                const SizedBox(height: 2),
                Text(desc, style: const TextStyle(fontSize: 12, color: SGColors.textMuted)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ── Partner Dashboard ─────────────────────────────────────────────────

  Widget _buildPartnerDashboard() {
    final p = _partner!;

    return Column(
      children: [
        // Status banner
        Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          color: p.isActive
              ? const Color(0xFF00E5A8).withValues(alpha: 0.08)
              : const Color(0xFFFFA500).withValues(alpha: 0.08),
          child: Row(
            children: [
              Icon(
                p.isActive ? Icons.verified_rounded : Icons.hourglass_top_rounded,
                size: 16,
                color: p.isActive ? const Color(0xFF00E5A8) : const Color(0xFFFFA500),
              ),
              const SizedBox(width: 8),
              Text(
                p.isActive ? 'Active Partner' : 'Pending — ${p.totalReferrals}/49 referrals',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w700,
                  color: p.isActive ? const Color(0xFF00E5A8) : const Color(0xFFFFA500),
                ),
              ),
            ],
          ),
        ),

        // Activation progress (if pending)
        if (p.isPending)
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('Activation Progress', style: TextStyle(fontSize: 12, color: SGColors.textMuted)),
                    Text('${p.totalReferrals}/49', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: SGColors.textPrimary)),
                  ],
                ),
                const SizedBox(height: 8),
                ClipRRect(
                  borderRadius: BorderRadius.circular(6),
                  child: LinearProgressIndicator(
                    value: p.totalReferrals / 49,
                    backgroundColor: Colors.white.withValues(alpha: 0.08),
                    valueColor: const AlwaysStoppedAnimation(Color(0xFF8B5CF6)),
                    minHeight: 8,
                  ),
                ),
              ],
            ),
          ),

        // Referral link share
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
          child: Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: SGColors.card,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Your Referral Code', style: TextStyle(fontSize: 11, color: SGColors.textMuted)),
                      const SizedBox(height: 4),
                      Text(p.refCode, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Color(0xFF8B5CF6), letterSpacing: 2)),
                    ],
                  ),
                ),
                IconButton(
                  onPressed: () {
                    Clipboard.setData(ClipboardData(text: p.referralLink.isNotEmpty ? p.referralLink : 'https://sportgod.in/join?ref=${p.refCode}'));
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Referral link copied!'), backgroundColor: Color(0xFF00E5A8)),
                    );
                  },
                  icon: const Icon(Icons.copy_rounded, size: 20, color: SGColors.textMuted),
                ),
                IconButton(
                  onPressed: () {
                    final link = p.referralLink.isNotEmpty ? p.referralLink : 'https://sportgod.in/join?ref=${p.refCode}';
                    Share.share('Join me on SportGod AI for cricket fantasy & predictions! Use my link: $link');
                  },
                  icon: const Icon(Icons.share_rounded, size: 20, color: Color(0xFF8B5CF6)),
                ),
              ],
            ),
          ),
        ),

        // Tabs
        TabBar(
          controller: _tabController,
          labelColor: const Color(0xFF00E5A8),
          unselectedLabelColor: SGColors.textMuted,
          indicatorColor: const Color(0xFF00E5A8),
          tabs: const [
            Tab(text: 'Overview'),
            Tab(text: 'Earnings'),
            Tab(text: 'Referrals'),
          ],
        ),

        // Tab content
        Expanded(
          child: TabBarView(
            controller: _tabController,
            children: [
              _buildOverviewTab(),
              _buildEarningsTab(),
              _buildReferralsTab(),
            ],
          ),
        ),
      ],
    );
  }

  // ── Overview Tab ──────────────────────────────────────────────────────

  Widget _buildOverviewTab() {
    final p = _partner!;
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          // Stats grid
          Row(
            children: [
              _statCard('Total Referrals', '${p.totalReferrals}', Icons.people_rounded, const Color(0xFF3B82F6)),
              const SizedBox(width: 12),
              _statCard('Active Players', '${p.activePlayers}', Icons.sports_cricket_rounded, const Color(0xFF00E5A8)),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              _statCard('Games Created', '${p.gamesCreated}', Icons.emoji_events_rounded, const Color(0xFFFFA500)),
              const SizedBox(width: 12),
              _statCard('Conversion', '${p.conversionRate}%', Icons.trending_up_rounded, const Color(0xFF8B5CF6)),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              _statCard('Total Earned', '${p.totalEarned.toStringAsFixed(0)} SP', Icons.monetization_on_rounded, const Color(0xFFFFD700)),
              const SizedBox(width: 12),
              _statCard('Pending', '${p.pendingPayout.toStringAsFixed(0)} SP', Icons.hourglass_bottom_rounded, SGColors.textMuted),
            ],
          ),
        ],
      ),
    );
  }

  Widget _statCard(String label, String value, IconData icon, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: SGColors.card,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, size: 20, color: color),
            const SizedBox(height: 10),
            Text(value, style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: color)),
            const SizedBox(height: 2),
            Text(label, style: const TextStyle(fontSize: 11, color: SGColors.textMuted)),
          ],
        ),
      ),
    );
  }

  // ── Earnings Tab ──────────────────────────────────────────────────────

  Widget _buildEarningsTab() {
    if (_earnings.isEmpty) {
      return Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.account_balance_wallet_rounded, size: 48, color: SGColors.textMuted.withValues(alpha: 0.3)),
            const SizedBox(height: 12),
            const Text('No earnings yet', style: TextStyle(fontSize: 14, color: SGColors.textMuted)),
            const SizedBox(height: 4),
            Text('Create private contests to start earning!', style: TextStyle(fontSize: 12, color: SGColors.textMuted.withValues(alpha: 0.6))),
          ],
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: _earnings.length,
      itemBuilder: (_, i) {
        final e = _earnings[i];
        return Container(
          margin: const EdgeInsets.only(bottom: 8),
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: SGColors.card,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
          ),
          child: Row(
            children: [
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  color: const Color(0xFFFFD700).withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.monetization_on_rounded, size: 18, color: Color(0xFFFFD700)),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(e.source, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: SGColors.textPrimary)),
                    if (e.description.isNotEmpty)
                      Text(e.description, style: const TextStyle(fontSize: 11, color: SGColors.textMuted)),
                  ],
                ),
              ),
              Text(
                '+${e.amount.toStringAsFixed(0)} SP',
                style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: Color(0xFF00E5A8)),
              ),
            ],
          ),
        );
      },
    );
  }

  // ── Referrals Tab ─────────────────────────────────────────────────────

  Widget _buildReferralsTab() {
    if (_referrals.isEmpty) {
      return Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.people_outline_rounded, size: 48, color: SGColors.textMuted.withValues(alpha: 0.3)),
            const SizedBox(height: 12),
            const Text('No referrals yet', style: TextStyle(fontSize: 14, color: SGColors.textMuted)),
            const SizedBox(height: 4),
            Text('Share your referral link to get started!', style: TextStyle(fontSize: 12, color: SGColors.textMuted.withValues(alpha: 0.6))),
          ],
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: _referrals.length,
      itemBuilder: (_, i) {
        final r = _referrals[i];
        final name = r['display_name'] ?? r['email'] ?? 'User';
        final date = r['created_at'] ?? '';

        return Container(
          margin: const EdgeInsets.only(bottom: 8),
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: SGColors.card,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
          ),
          child: Row(
            children: [
              CircleAvatar(
                radius: 18,
                backgroundColor: const Color(0xFF6366F1).withValues(alpha: 0.15),
                child: Text(
                  name.toString().isNotEmpty ? name.toString()[0].toUpperCase() : '?',
                  style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: Color(0xFF6366F1)),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(name.toString(), style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: SGColors.textPrimary)),
                    if (date.isNotEmpty)
                      Text(date, style: const TextStyle(fontSize: 11, color: SGColors.textMuted)),
                  ],
                ),
              ),
              const Icon(Icons.check_circle_rounded, size: 20, color: Color(0xFF00E5A8)),
            ],
          ),
        );
      },
    );
  }

  // ── Error State ───────────────────────────────────────────────────────

  Widget _buildError() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.cloud_off_rounded, size: 48, color: SGColors.textMuted),
            const SizedBox(height: 16),
            Text(_error!, style: const TextStyle(color: SGColors.textMuted, fontSize: 14), textAlign: TextAlign.center),
            const SizedBox(height: 16),
            FilledButton.icon(
              onPressed: _loadPartnerData,
              icon: const Icon(Icons.refresh_rounded, size: 18),
              label: const Text('Retry'),
            ),
          ],
        ),
      ),
    );
  }
}
