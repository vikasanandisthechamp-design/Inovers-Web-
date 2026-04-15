import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../theme/app_theme.dart';

const _backend = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'https://sportgod-backend-production.up.railway.app',
);

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _ctrl = TextEditingController();
  final _scroll = ScrollController();
  final List<_Message> _messages = [];
  bool _sending = false;

  final _starters = [
    'Who has the best strike rate in IPL 2026?',
    'Which team is likely to top the table?',
    'Best fantasy captain picks for today',
    'Compare Virat Kohli vs Rohit Sharma stats',
  ];

  @override
  void dispose() {
    _ctrl.dispose();
    _scroll.dispose();
    super.dispose();
  }

  Future<void> _send(String text) async {
    if (text.trim().isEmpty) return;
    _ctrl.clear();

    setState(() {
      _messages.add(_Message(text: text, isUser: true));
      _sending = true;
    });
    _scrollBottom();

    final token = context.read<AuthProvider>().accessToken;

    try {
      // Build conversation history (last 10 messages for context)
      final history = (_messages.length > 10 ? _messages.sublist(_messages.length - 10) : _messages).map((m) => {
        'role': m.isUser ? 'user' : 'assistant',
        'content': m.text,
      }).toList();

      final res = await http.post(
        Uri.parse('$_backend/api/v1/chat'),
        headers: {
          'Content-Type': 'application/json',
          if (token != null) 'Authorization': 'Bearer $token',
        },
        body: json.encode({'question': text, 'history': history}),
      ).timeout(const Duration(seconds: 30));

      if (res.statusCode == 200) {
        final data = json.decode(res.body) as Map<String, dynamic>;
        // Backend returns { answer: "..." }
        final reply = (data['answer'] ?? data['response'] ?? data['message'] ?? '').toString().trim();
        setState(() => _messages.add(_Message(
          text: reply.isNotEmpty ? reply : 'No response received. Please try again.',
          isUser: false,
        )));
      } else if (res.statusCode == 503) {
        setState(() => _messages.add(_Message(
          text: 'AI model is temporarily unavailable. Please try again in a moment.',
          isUser: false,
        )));
      } else {
        setState(() => _messages.add(_Message(
          text: 'Sorry, I could not process that request (${res.statusCode}). Please try again.',
          isUser: false,
        )));
      }
    } on http.ClientException {
      setState(() => _messages.add(_Message(
        text: 'Network error. Please check your connection and try again.',
        isUser: false,
      )));
    } catch (_) {
      setState(() => _messages.add(_Message(
        text: 'Request timed out. The AI may be busy — please try again.',
        isUser: false,
      )));
    }

    _sending = false;
    if (mounted) setState(() {});
    _scrollBottom();
  }

  void _scrollBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scroll.hasClients) {
        _scroll.animateTo(
          _scroll.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(children: [
          Container(
            width: 28, height: 28,
            decoration: BoxDecoration(
              gradient: const LinearGradient(colors: [Color(0xFF00E5A8), Color(0xFF00C9FF)]),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Center(child: Icon(Icons.psychology_rounded, size: 16, color: Color(0xFF0F0F11))),
          ),
          const SizedBox(width: 10),
          const Text('SportsGPT'),
        ]),
      ),
      body: Column(children: [
        Expanded(
          child: _messages.isEmpty
              ? _emptyState()
              : ListView.builder(
                  controller: _scroll,
                  padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
                  itemCount: _messages.length + (_sending ? 1 : 0),
                  itemBuilder: (_, i) {
                    if (i == _messages.length) return _typingIndicator();
                    return _messageBubble(_messages[i]);
                  },
                ),
        ),

        // Input
        Container(
          padding: EdgeInsets.fromLTRB(16, 8, 8, MediaQuery.of(context).padding.bottom + 8),
          decoration: BoxDecoration(
            color: SGColors.card,
            border: Border(top: BorderSide(color: Colors.white.withValues(alpha: 0.06))),
          ),
          child: Row(children: [
            Expanded(
              child: TextField(
                controller: _ctrl,
                style: const TextStyle(color: Colors.white, fontSize: 14),
                decoration: const InputDecoration(
                  hintText: 'Ask about cricket...',
                  hintStyle: TextStyle(color: SGColors.textMuted),
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                ),
                onSubmitted: _send,
              ),
            ),
            IconButton(
              onPressed: _sending ? null : () => _send(_ctrl.text),
              icon: const Icon(Icons.send_rounded, size: 22),
              color: const Color(0xFF00E5A8),
            ),
          ]),
        ),
      ]),
    );
  }

  Widget _emptyState() {
    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(32),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          Container(
            width: 64, height: 64,
            decoration: BoxDecoration(
              gradient: const LinearGradient(colors: [Color(0xFF00E5A8), Color(0xFF00C9FF)]),
              borderRadius: BorderRadius.circular(18),
            ),
            child: const Center(child: Icon(Icons.psychology_rounded, size: 32, color: Color(0xFF0F0F11))),
          ),
          const SizedBox(height: 20),
          const Text('SportsGPT', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: SGColors.textPrimary)),
          const SizedBox(height: 6),
          const Text('Your AI cricket assistant', style: TextStyle(fontSize: 13, color: SGColors.textMuted)),
          const SizedBox(height: 28),
          ..._starters.map((s) => Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: GestureDetector(
              onTap: () => _send(s),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.04),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
                ),
                child: Text(s, style: const TextStyle(fontSize: 13, color: SGColors.textSecondary)),
              ),
            ),
          )),
        ]),
      ),
    );
  }

  Widget _messageBubble(_Message msg) {
    return Align(
      alignment: msg.isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.78),
        margin: const EdgeInsets.only(bottom: 10),
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: msg.isUser ? const Color(0xFF00E5A8).withValues(alpha: 0.12) : SGColors.card,
          borderRadius: BorderRadius.circular(16).copyWith(
            bottomRight: msg.isUser ? const Radius.circular(4) : null,
            bottomLeft: !msg.isUser ? const Radius.circular(4) : null,
          ),
          border: Border.all(color: msg.isUser
              ? const Color(0xFF00E5A8).withValues(alpha: 0.2)
              : Colors.white.withValues(alpha: 0.06)),
        ),
        child: msg.isUser
            ? Text(msg.text, style: const TextStyle(fontSize: 14, color: SGColors.textPrimary))
            : MarkdownBody(
                data: msg.text,
                styleSheet: MarkdownStyleSheet(
                  p: const TextStyle(fontSize: 14, color: SGColors.textPrimary, height: 1.5),
                  strong: const TextStyle(fontWeight: FontWeight.w700, color: SGColors.textPrimary),
                  code: TextStyle(
                    fontSize: 12, color: const Color(0xFF00E5A8),
                    backgroundColor: Colors.white.withValues(alpha: 0.06),
                  ),
                ),
              ),
      ),
    );
  }

  Widget _typingIndicator() {
    return Align(
      alignment: Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.only(bottom: 10),
        padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
        decoration: BoxDecoration(
          color: SGColors.card,
          borderRadius: BorderRadius.circular(16).copyWith(bottomLeft: const Radius.circular(4)),
          border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
        ),
        child: Row(mainAxisSize: MainAxisSize.min, children: [
          for (var i = 0; i < 3; i++) ...[
            Container(width: 7, height: 7, decoration: BoxDecoration(
              color: SGColors.textMuted.withValues(alpha: 0.5), shape: BoxShape.circle)),
            if (i < 2) const SizedBox(width: 4),
          ],
        ]),
      ),
    );
  }
}

class _Message {
  final String text;
  final bool isUser;
  _Message({required this.text, required this.isUser});
}
