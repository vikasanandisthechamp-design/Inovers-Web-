import 'package:equatable/equatable.dart';

// ── Team ─────────────────────────────────────────────────────────────

class Team extends Equatable {
  final String id;
  final String name;
  final String short;
  final String imageUrl;
  final String country;

  const Team({
    required this.id,
    required this.name,
    required this.short,
    required this.imageUrl,
    required this.country,
  });

  factory Team.fromJson(Map<String, dynamic> j) => Team(
    id:       j['id']        ?? '',
    name:     j['name']      ?? '',
    short:    j['short']     ?? '',
    imageUrl: j['image_url'] ?? '',
    country:  j['country']   ?? '',
  );

  @override
  List<Object?> get props => [id];
}

// ── Innings run ───────────────────────────────────────────────────────

class InningsRun extends Equatable {
  final String teamId;
  final int    inning;
  final int    score;
  final int    wickets;
  final String overs;
  final bool   declared;

  const InningsRun({
    required this.teamId,
    required this.inning,
    required this.score,
    required this.wickets,
    required this.overs,
    required this.declared,
  });

  factory InningsRun.fromJson(Map<String, dynamic> j) => InningsRun(
    teamId:   (j['team_id'] ?? '').toString(),
    inning:   j['inning']   ?? 1,
    score:    j['score']    ?? 0,
    wickets:  j['wickets']  ?? 0,
    overs:    (j['overs']   ?? '0').toString(),
    declared: j['declared'] ?? false,
  );

  String get scoreString => '$score/$wickets';
  String get oversString => '($overs ov)';

  @override
  List<Object?> get props => [teamId, inning];
}

// ── Match ─────────────────────────────────────────────────────────────

class CricketMatch extends Equatable {
  final String      id;
  final String      note;
  final String      status;
  final String      matchType;
  final Team        teamHome;
  final Team        teamAway;
  final List<InningsRun> runs;
  final String      venue;
  final String      date;

  const CricketMatch({
    required this.id,
    required this.note,
    required this.status,
    required this.matchType,
    required this.teamHome,
    required this.teamAway,
    required this.runs,
    required this.venue,
    required this.date,
  });

  bool get isLive => status == 'Live';

  List<InningsRun> runsFor(String teamId) =>
      runs.where((r) => r.teamId == teamId).toList();

  factory CricketMatch.fromJson(Map<String, dynamic> j) {
    final venue = j['venue'] as Map<String, dynamic>? ?? {};
    return CricketMatch(
      id:        (j['id'] ?? '').toString(),
      note:      j['note']       ?? '',
      status:    j['status']     ?? 'NS',
      matchType: j['match_type'] ?? 'T20',
      teamHome:  Team.fromJson(j['team_home'] ?? {}),
      teamAway:  Team.fromJson(j['team_away'] ?? {}),
      runs:      ((j['runs'] ?? []) as List)
                    .map((r) => InningsRun.fromJson(r))
                    .toList(),
      venue:     '${venue['name'] ?? ''}${venue['city'] != null ? ', ${venue['city']}' : ''}',
      date:      j['date'] ?? '',
    );
  }

  @override
  List<Object?> get props => [id, status, note, runs];
}

// ── Batting row ───────────────────────────────────────────────────────

class BattingRow extends Equatable {
  final String playerId;
  final String playerName;
  final String teamId;
  final String inning;
  final int    runs;
  final int    balls;
  final int    fours;
  final int    sixes;
  final double strikeRate;
  final String howOut;

  const BattingRow({
    required this.playerId,
    required this.playerName,
    required this.teamId,
    required this.inning,
    required this.runs,
    required this.balls,
    required this.fours,
    required this.sixes,
    required this.strikeRate,
    required this.howOut,
  });

  bool get isNotOut => howOut == 'not out';

  factory BattingRow.fromJson(Map<String, dynamic> j) => BattingRow(
    playerId:   (j['player_id']   ?? '').toString(),
    playerName: j['player_name']  ?? '',
    teamId:     (j['team_id']     ?? '').toString(),
    inning:     j['inning']       ?? 'S1',
    runs:       j['runs']         ?? 0,
    balls:      j['balls']        ?? 0,
    fours:      j['fours']        ?? 0,
    sixes:      j['sixes']        ?? 0,
    strikeRate: (j['strike_rate'] ?? 0.0).toDouble(),
    howOut:     j['how_out']      ?? 'not out',
  );

  @override
  List<Object?> get props => [playerId, inning];
}

// ── Bowling row ───────────────────────────────────────────────────────

class BowlingRow extends Equatable {
  final String playerId;
  final String playerName;
  final String teamId;
  final String inning;
  final double overs;
  final int    maidens;
  final int    runs;
  final int    wickets;
  final double economy;

  const BowlingRow({
    required this.playerId,
    required this.playerName,
    required this.teamId,
    required this.inning,
    required this.overs,
    required this.maidens,
    required this.runs,
    required this.wickets,
    required this.economy,
  });

  factory BowlingRow.fromJson(Map<String, dynamic> j) => BowlingRow(
    playerId:   (j['player_id']  ?? '').toString(),
    playerName: j['player_name'] ?? '',
    teamId:     (j['team_id']    ?? '').toString(),
    inning:     j['inning']      ?? 'S1',
    overs:      (j['overs']      ?? 0.0).toDouble(),
    maidens:    j['maidens']     ?? 0,
    runs:       j['runs']        ?? 0,
    wickets:    j['wickets']     ?? 0,
    economy:    (j['economy']    ?? 0.0).toDouble(),
  );

  @override
  List<Object?> get props => [playerId, inning];
}

// ── Scorecard ─────────────────────────────────────────────────────────

class Scorecard {
  final String         matchId;
  final List<BattingRow>  batting;
  final List<BowlingRow>  bowling;
  final List<InningsRun>  runs;

  const Scorecard({
    required this.matchId,
    required this.batting,
    required this.bowling,
    required this.runs,
  });

  factory Scorecard.fromJson(Map<String, dynamic> j) => Scorecard(
    matchId: (j['match_id'] ?? '').toString(),
    batting: ((j['batting'] ?? []) as List).map((b) => BattingRow.fromJson(b)).toList(),
    bowling: ((j['bowling'] ?? []) as List).map((b) => BowlingRow.fromJson(b)).toList(),
    runs:    ((j['runs']    ?? []) as List).map((r) => InningsRun.fromJson(r)).toList(),
  );
}

// ── Ball event ────────────────────────────────────────────────────────

class BallEvent extends Equatable {
  final String ballId;
  final String matchId;
  final String over;
  final int    runs;
  final bool   isFour;
  final bool   isSix;
  final bool   isWicket;
  final bool   isWide;
  final bool   isNoball;
  final String batsmanName;
  final String bowlerName;
  final String commentary;

  const BallEvent({
    required this.ballId,
    required this.matchId,
    required this.over,
    required this.runs,
    required this.isFour,
    required this.isSix,
    required this.isWicket,
    required this.isWide,
    required this.isNoball,
    required this.batsmanName,
    required this.bowlerName,
    required this.commentary,
  });

  factory BallEvent.fromJson(Map<String, dynamic> j) => BallEvent(
    ballId:      (j['ball_id']  ?? '').toString(),
    matchId:     (j['match_id'] ?? '').toString(),
    over:        (j['over']     ?? '').toString(),
    runs:         j['runs']     ?? 0,
    isFour:       j['is_four']  ?? false,
    isSix:        j['is_six']   ?? false,
    isWicket:     j['is_wicket']?? false,
    isWide:       j['is_wide']  ?? false,
    isNoball:     j['is_noball']?? false,
    batsmanName: (j['batsman']  as Map?)?['name'] ?? '',
    bowlerName:  (j['bowler']   as Map?)?['name'] ?? '',
    commentary:   j['commentary']?? '',
  );

  String get badgeLabel {
    if (isWicket) return 'W';
    if (isSix)    return '6';
    if (isFour)   return '4';
    if (isWide)   return 'WD';
    if (isNoball) return 'NB';
    return '$runs';
  }

  @override
  List<Object?> get props => [ballId];
}

// ── AI Prediction ─────────────────────────────────────────────────────

class Prediction {
  final int    homeProb;
  final int    awayProb;
  final String momentum;
  final String momentumReason;
  final String keyInsight;
  final String summary;
  final List<String> riskFactors;
  final int    confidence;
  final bool   hasError;

  const Prediction({
    required this.homeProb,
    required this.awayProb,
    required this.momentum,
    required this.momentumReason,
    required this.keyInsight,
    required this.summary,
    required this.riskFactors,
    required this.confidence,
    this.hasError = false,
  });

  factory Prediction.fromJson(Map<String, dynamic> j) {
    final wp = j['win_probability'] as Map<String, dynamic>? ?? {};
    return Prediction(
      homeProb:       (wp['team_home'] ?? 50) as int,
      awayProb:       (wp['team_away'] ?? 50) as int,
      momentum:       j['momentum']        ?? 'neutral',
      momentumReason: j['momentum_reason'] ?? '',
      keyInsight:     j['key_insight']     ?? '',
      summary:        j['prediction_summary'] ?? '',
      riskFactors:    ((j['risk_factors'] ?? []) as List)
                          .map((e) => e.toString())
                          .toList(),
      confidence:     j['confidence'] ?? 5,
      hasError:       j['error'] ?? false,
    );
  }

  factory Prediction.empty() => const Prediction(
    homeProb: 50, awayProb: 50,
    momentum: 'neutral', momentumReason: '',
    keyInsight: '', summary: '',
    riskFactors: [], confidence: 0,
    hasError: true,
  );
}
