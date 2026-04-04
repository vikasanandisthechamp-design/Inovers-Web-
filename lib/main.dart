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
import 'theme/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SupabaseService.init();

  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    statusBarBrightness: Brightness.dark,
    statusBarIconBrightness: Brightness.light,
  ));

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
        if (settings.name?.startsWith('/match/') == true) {
          final matchId = settings.name!.replaceFirst('/match/', '');
          return MaterialPageRoute(
            builder: (_) => MatchScreen(matchId: matchId),
          );
        }
        if (settings.name?.startsWith('/fantasy/build/') == true) {
          final matchId = settings.name!.replaceFirst('/fantasy/build/', '');
          return MaterialPageRoute(
            builder: (_) => TeamBuilderScreen(matchId: matchId),
          );
        }
        if (settings.name?.startsWith('/predict/') == true) {
          final matchId = settings.name!.replaceFirst('/predict/', '');
          return MaterialPageRoute(
            builder: (_) => PredictScreen(matchId: matchId),
          );
        }
        return null;
      },
    );
  }
}
