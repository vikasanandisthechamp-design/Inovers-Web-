import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

/// Displays a team logo: network image → coloured initials fallback.
/// Used in match cards across the app — identical logic to the web TeamLogo component.
class TeamLogoWidget extends StatelessWidget {
  final String short;
  final String name;
  final String imageUrl;
  final double size;

  const TeamLogoWidget({
    super.key,
    required this.short,
    required this.name,
    required this.imageUrl,
    this.size = 40,
  });

  // Deterministic accent colour from the team short code.
  Color _accent() {
    const palette = [
      Color(0xFF00E5A8), // green
      Color(0xFF00C9FF), // cyan
      Color(0xFF6366F1), // indigo
      Color(0xFFA78BFA), // violet
      Color(0xFFF59E0B), // amber
      Color(0xFFEF4444), // red
      Color(0xFF22C55E), // emerald
      Color(0xFFEC4899), // pink
    ];
    final hash = short.codeUnits.fold(0, (a, b) => a + b);
    return palette[hash % palette.length];
  }

  String get _initials {
    if (short.isNotEmpty) return short.length > 3 ? short.substring(0, 3) : short;
    final words = name.trim().split(RegExp(r'\s+'));
    if (words.length >= 2) return '${words[0][0]}${words[1][0]}'.toUpperCase();
    return name.isNotEmpty ? name[0].toUpperCase() : '?';
  }

  @override
  Widget build(BuildContext context) {
    final accent = _accent();
    final radius = size / 2;

    // No URL → initials badge
    if (imageUrl.isEmpty) {
      return _InitialsBadge(initials: _initials, accent: accent, radius: radius, size: size);
    }

    return ClipRRect(
      borderRadius: BorderRadius.circular(radius),
      child: CachedNetworkImage(
        imageUrl: imageUrl,
        width: size,
        height: size,
        fit: BoxFit.contain,
        fadeInDuration: const Duration(milliseconds: 200),
        // Show initials while loading and on error
        placeholder: (_, __) => _InitialsBadge(initials: _initials, accent: accent, radius: radius, size: size),
        errorWidget:  (_, __, ___) => _InitialsBadge(initials: _initials, accent: accent, radius: radius, size: size),
      ),
    );
  }
}

class _InitialsBadge extends StatelessWidget {
  final String initials;
  final Color  accent;
  final double radius;
  final double size;
  const _InitialsBadge({required this.initials, required this.accent, required this.radius, required this.size});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size, height: size,
      decoration: BoxDecoration(
        color: accent.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(radius),
        border: Border.all(color: accent.withValues(alpha: 0.25), width: 1.5),
      ),
      alignment: Alignment.center,
      child: Text(
        initials,
        style: TextStyle(
          fontSize: size * 0.32,
          fontWeight: FontWeight.w800,
          color: accent,
          letterSpacing: -0.5,
        ),
      ),
    );
  }
}
