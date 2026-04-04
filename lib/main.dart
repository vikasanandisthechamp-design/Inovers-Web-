import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'services/supabase_service.dart';
import 'providers/auth_provider.dart';
import 'providers/coins_provider.dart';
import 'screens/shell_screen.dart';
import 'screens/auth/login_screen.dart';
import 'screens/match_screen.dart';
import 'screens/fantasy/team_builder_screen.dart';
import 'screens/predictions/predict_screen.dart';
import 'screens/contests/contests_screen.dart';
import 'screens/partner/partner_screen.dart';
import 'screens/legal/privacy_screen.dart';
import 'screens/legal/terms_screen.dart';
import 'theme/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Supabase — graceful failure
  try {
    await SupabaseService.init();
  } catch (e) {
    debugPrint('Supabase init failed: $e');
  }

  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    statusBarBrightness: Brightness.dark,
    statusBarIconBrightness: Brightness.light,
  ));

  // Lock to portrait
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
  ]);

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => CoinsProvider()),
      ],
      child: const SportGodApp(),
    ),
  );
}

class SportGodApp extends StatelessWidget {
  const SportGodApp({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();

    return MaterialApp(
      title: 'SportGod AI',
      theme: AppTheme.dark,
      darkTheme: AppTheme.dark,
      themeMode: ThemeMode.dark,
      debugShowCheckedModeBanner: false,
      home: auth.isLoggedIn ? const ShellScreen() : const LoginScreen(),
      onGenerateRoute: (settings) {
        final name = settings.name ?? '';
        if (name.startsWith('/match/')) {
          return MaterialPageRoute(
            builder: (_) => MatchScreen(matchId: name.replaceFirst('/match/', '')),
          );
        }
        if (name.startsWith('/fantasy/build/')) {
          return MaterialPageRoute(
            builder: (_) => TeamBuilderScreen(matchId: name.replaceFirst('/fantasy/build/', '')),
          );
        }
        if (name.startsWith('/predict/')) {
          return MaterialPageRoute(
            builder: (_) => PredictScreen(matchId: name.replaceFirst('/predict/', '')),
          );
        }
        if (name.startsWith('/contests/')) {
          final parts = name.replaceFirst('/contests/', '').split('?');
          final matchId = parts[0];
          String? teamCode;
          String? tab;
          if (parts.length > 1) {
            final params = Uri.splitQueryString(parts[1]);
            teamCode = params['team_code'];
            tab = params['tab'];
          }
          return MaterialPageRoute(
            builder: (_) => ContestsScreen(
              matchId: matchId,
              teamCode: teamCode,
              initialTab: tab == 'private' ? 1 : 0,
            ),
          );
        }
        if (name == '/partner') {
          return MaterialPageRoute(builder: (_) => const PartnerScreen());
        }
        if (name == '/privacy') {
          return MaterialPageRoute(builder: (_) => const PrivacyScreen());
        }
        if (name == '/terms') {
          return MaterialPageRoute(builder: (_) => const TermsScreen());
        }
        return null;
      },
    );
  }
}
