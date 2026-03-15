import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'screens/home_screen.dart';
import 'screens/match_screen.dart';
import 'theme/app_theme.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  // Prefer dark status bar icons on the nav
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor:       Colors.transparent,
    statusBarBrightness:  Brightness.dark,
    statusBarIconBrightness: Brightness.light,
  ));

  runApp(const SportGodApp());
}

final _router = GoRouter(
  routes: [
    GoRoute(
      path:    '/',
      builder: (_, __) => const HomeScreen(),
    ),
    GoRoute(
      path:    '/match/:matchId',
      builder: (_, state) => MatchScreen(
        matchId: state.pathParameters['matchId']!,
      ),
    ),
  ],
);

class SportGodApp extends StatelessWidget {
  const SportGodApp({super.key});

  @override
  Widget build(BuildContext context) => MaterialApp.router(
    title:         'SportGod AI',
    theme:         AppTheme.dark,
    darkTheme:     AppTheme.dark,
    themeMode:     ThemeMode.dark,
    routerConfig:  _router,
    debugShowCheckedModeBanner: false,
  );
}
