/// Models for Contests, Partners, and Referrals

class Contest {
  final String id;
  final String contestCode;
  final String matchId;
  final String matchName;
  final String homeTeam;
  final String awayTeam;
  final String homeLogo;
  final String awayLogo;
  final String contestType; // 'public' | 'private'
  final String? creatorId;
  final String title;
  final String description;
  final int entryFee;
  final int maxPlayers;
  final int playerCount;
  final int prizePool;
  final List<PrizeBreakdown> prizeBreakdown;
  final String status; // 'open' | 'live' | 'completed' | 'cancelled'
  final String? inviteCode;
  final bool joined;
  final int spotsLeft;
  final int fillPct;

  Contest({
    required this.id,
    required this.contestCode,
    required this.matchId,
    this.matchName = '',
    this.homeTeam = '',
    this.awayTeam = '',
    this.homeLogo = '',
    this.awayLogo = '',
    this.contestType = 'public',
    this.creatorId,
    this.title = '',
    this.description = '',
    this.entryFee = 0,
    this.maxPlayers = 1000,
    this.playerCount = 0,
    this.prizePool = 0,
    this.prizeBreakdown = const [],
    this.status = 'open',
    this.inviteCode,
    this.joined = false,
    this.spotsLeft = 1000,
    this.fillPct = 0,
  });

  bool get isPublic => contestType == 'public';
  bool get isFull => spotsLeft <= 0;

  factory Contest.fromJson(Map<String, dynamic> j) {
    final breakdown = (j['prize_breakdown'] ?? j['prizeBreakdown'] ?? []) as List;
    return Contest(
      id: j['id'] ?? '',
      contestCode: j['contest_code'] ?? j['contestCode'] ?? '',
      matchId: j['match_id'] ?? j['matchId'] ?? '',
      matchName: j['match_name'] ?? j['matchName'] ?? '',
      homeTeam: j['home_team'] ?? j['homeTeam'] ?? '',
      awayTeam: j['away_team'] ?? j['awayTeam'] ?? '',
      homeLogo: j['home_logo'] ?? j['homeLogo'] ?? '',
      awayLogo: j['away_logo'] ?? j['awayLogo'] ?? '',
      contestType: j['contest_type'] ?? j['contestType'] ?? 'public',
      creatorId: j['creator_id'] ?? j['creatorId'],
      title: j['title'] ?? '',
      description: j['description'] ?? '',
      entryFee: (j['entry_fee'] ?? j['entryFee'] ?? 0) as int,
      maxPlayers: (j['max_players'] ?? j['maxPlayers'] ?? 1000) as int,
      playerCount: (j['player_count'] ?? j['playerCount'] ?? 0) as int,
      prizePool: (j['prize_pool'] ?? j['prizePool'] ?? 0) as int,
      prizeBreakdown: breakdown.map((b) => PrizeBreakdown.fromJson(b)).toList(),
      status: j['status'] ?? 'open',
      inviteCode: j['invite_code'] ?? j['inviteCode'],
      joined: j['joined'] == true,
      spotsLeft: (j['spotsLeft'] ?? j['spots_left'] ?? 0) as int,
      fillPct: (j['fillPct'] ?? j['fill_pct'] ?? 0) as int,
    );
  }
}

class PrizeBreakdown {
  final int rank;
  final int pct;

  PrizeBreakdown({required this.rank, required this.pct});

  factory PrizeBreakdown.fromJson(Map<String, dynamic> j) {
    return PrizeBreakdown(
      rank: (j['rank'] ?? 1) as int,
      pct: (j['pct'] ?? 0) as int,
    );
  }
}

class PartnerData {
  final String id;
  final String refCode;
  final String status; // 'pending' | 'active' | 'suspended'
  final String displayName;
  final String avatarUrl;
  final String bio;
  final int totalReferrals;
  final int activeReferrals;
  final int activePlayers;
  final int gamesCreated;
  final double totalEarned;
  final double pendingPayout;
  final double paidOut;
  final int conversionRate;
  final String referralLink;

  PartnerData({
    required this.id,
    required this.refCode,
    this.status = 'pending',
    this.displayName = '',
    this.avatarUrl = '',
    this.bio = '',
    this.totalReferrals = 0,
    this.activeReferrals = 0,
    this.activePlayers = 0,
    this.gamesCreated = 0,
    this.totalEarned = 0,
    this.pendingPayout = 0,
    this.paidOut = 0,
    this.conversionRate = 0,
    this.referralLink = '',
  });

  bool get isActive => status == 'active';
  bool get isPending => status == 'pending';

  factory PartnerData.fromJson(Map<String, dynamic> j) {
    return PartnerData(
      id: j['id'] ?? '',
      refCode: j['refCode'] ?? j['ref_code'] ?? '',
      status: j['status'] ?? 'pending',
      displayName: j['displayName'] ?? j['display_name'] ?? '',
      avatarUrl: j['avatarUrl'] ?? j['avatar_url'] ?? '',
      bio: j['bio'] ?? '',
      totalReferrals: (j['totalReferrals'] ?? j['total_referrals'] ?? 0) as int,
      activeReferrals: (j['activeReferrals'] ?? j['active_referrals'] ?? 0) as int,
      activePlayers: (j['activePlayers'] ?? j['active_players'] ?? 0) as int,
      gamesCreated: (j['gamesCreated'] ?? j['games_created'] ?? 0) as int,
      totalEarned: (j['totalEarned'] ?? j['total_earned'] ?? 0).toDouble(),
      pendingPayout: (j['pendingPayout'] ?? j['pending_payout'] ?? 0).toDouble(),
      paidOut: (j['paidOut'] ?? j['paid_out'] ?? 0).toDouble(),
      conversionRate: (j['conversionRate'] ?? j['conversion_rate'] ?? 0) as int,
      referralLink: j['referralLink'] ?? j['referral_link'] ?? '',
    );
  }
}

class Earning {
  final String id;
  final double amount;
  final String source;
  final String description;
  final String createdAt;

  Earning({
    required this.id,
    required this.amount,
    required this.source,
    this.description = '',
    this.createdAt = '',
  });

  factory Earning.fromJson(Map<String, dynamic> j) {
    return Earning(
      id: j['id'] ?? '',
      amount: (j['amount'] ?? 0).toDouble(),
      source: j['source'] ?? '',
      description: j['description'] ?? '',
      createdAt: j['createdAt'] ?? j['created_at'] ?? '',
    );
  }
}
