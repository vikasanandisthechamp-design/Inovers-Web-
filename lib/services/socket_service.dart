import 'dart:async';
import 'dart:convert';
import 'package:web_socket_channel/web_socket_channel.dart';
import '../models/cricket_models.dart';

const _wsBaseUrl = String.fromEnvironment(
  'WS_BASE_URL',
  defaultValue: 'ws://10.0.2.2:8000',
);

enum SocketState { connecting, connected, disconnected, error }

class SocketService {
  WebSocketChannel?          _channel;
  StreamSubscription?        _sub;
  Timer?                     _reconnectTimer;
  int                        _reconnectCount = 0;
  static const _maxReconnect = 10;

  final String matchId;

  // Stream controllers — subscribers listen to these
  final _ballController    = StreamController<BallEvent>.broadcast();
  final _matchController   = StreamController<CricketMatch>.broadcast();
  final _stateController   = StreamController<SocketState>.broadcast();
  final _snapshotController = StreamController<Map<String, dynamic>>.broadcast();

  Stream<BallEvent>          get ballStream     => _ballController.stream;
  Stream<CricketMatch>       get matchStream    => _matchController.stream;
  Stream<SocketState>        get stateStream    => _stateController.stream;
  Stream<Map<String, dynamic>> get snapshotStream => _snapshotController.stream;

  SocketService(this.matchId);

  void connect() {
    _stateController.add(SocketState.connecting);

    try {
      final uri = Uri.parse('$_wsBaseUrl/ws/matches/$matchId');
      _channel = WebSocketChannel.connect(uri);

      _sub = _channel!.stream.listen(
        _onMessage,
        onError: _onError,
        onDone:  _onDone,
      );

      _stateController.add(SocketState.connected);
      _reconnectCount = 0;
    } catch (e) {
      _stateController.add(SocketState.error);
      _scheduleReconnect();
    }
  }

  void _onMessage(dynamic raw) {
    try {
      final msg = json.decode(raw as String) as Map<String, dynamic>;
      final type = msg['type'] as String? ?? '';

      switch (type) {
        case 'snapshot':
          _snapshotController.add(msg);

        case 'ball_event':
          _ballController.add(BallEvent.fromJson(msg));

        case 'score_update':
          // Handled via snapshot re-parse at screen level
          break;

        case 'ping':
          _channel?.sink.add(json.encode({'type': 'pong'}));
      }
    } catch (_) {
      // Malformed message — ignore
    }
  }

  void _onError(dynamic error) {
    _stateController.add(SocketState.error);
    _scheduleReconnect();
  }

  void _onDone() {
    _stateController.add(SocketState.disconnected);
    _scheduleReconnect();
  }

  void _scheduleReconnect() {
    if (_reconnectCount >= _maxReconnect) return;
    final delay = Duration(
      milliseconds: (1000 * (1 << _reconnectCount)).clamp(1000, 30000),
    );
    _reconnectCount++;
    _reconnectTimer = Timer(delay, connect);
  }

  void dispose() {
    _reconnectTimer?.cancel();
    _sub?.cancel();
    _channel?.sink.close();
    _ballController.close();
    _matchController.close();
    _stateController.close();
    _snapshotController.close();
  }
}
