"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Language {
  code: string
  name: string
  nativeName: string
  speechCode: string
  flag: string
}

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    speechCode: "en-US",
    flag: "🇺🇸",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    speechCode: "es-ES",
    flag: "🇪🇸",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    speechCode: "fr-FR",
    flag: "🇫🇷",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    speechCode: "de-DE",
    flag: "🇩🇪",
  },
  {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    speechCode: "it-IT",
    flag: "🇮🇹",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    speechCode: "pt-BR",
    flag: "🇧🇷",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    speechCode: "ja-JP",
    flag: "🇯🇵",
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    speechCode: "ko-KR",
    flag: "🇰🇷",
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    speechCode: "zh-CN",
    flag: "🇨🇳",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    speechCode: "ar-SA",
    flag: "🇸🇦",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    speechCode: "hi-IN",
    flag: "🇮🇳",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    speechCode: "ru-RU",
    flag: "🇷🇺",
  },
  {
    code: "el",
    name: "Greek",
    nativeName: "Ελληνικά",
    speechCode: "el-GR",
    flag: "🇬🇷",
  },
]

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  supportedLanguages: Language[]
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0])

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem("accessiflow-language")
    if (savedLanguage) {
      const language = SUPPORTED_LANGUAGES.find((lang) => lang.code === savedLanguage)
      if (language) {
        setCurrentLanguage(language)
      }
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0]
      const detectedLanguage = SUPPORTED_LANGUAGES.find((lang) => lang.code === browserLang)
      if (detectedLanguage) {
        setCurrentLanguage(detectedLanguage)
      }
    }
  }, [])

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language)
    localStorage.setItem("accessiflow-language", language.code)
  }

  // Enhanced translation function with fallback and debugging
  const t = (key: string): string => {
    // Try to get translation for current language
    const translation = translations[currentLanguage.code]?.[key]

    // If translation exists, return it
    if (translation) return translation

    // If no translation found, try English as fallback
    const fallback = translations.en[key]
    if (fallback) return fallback

    // If no translation found in English either, return the key itself
    // This makes it easier to identify missing translations
    return key
  }

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        supportedLanguages: SUPPORTED_LANGUAGES,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Translation dictionaries
const translations: Record<string, Record<string, string>> = {
  en: {
    // Voice commands
    "voice.next": "next",
    "voice.previous": "previous",
    "voice.back": "back",
    "voice.skip": "skip",
    "voice.complete": "complete",
    "voice.finish": "finish",
    "voice.start": "start",
    "voice.help": "help",
    "voice.stop_listening": "stop listening",
    "voice.enable_high_contrast": "enable high contrast",
    "voice.disable_high_contrast": "disable high contrast",
    "voice.increase_font_size": "increase font size",
    "voice.decrease_font_size": "decrease font size",
    "voice.enable_audio": "enable audio",
    "voice.disable_audio": "disable audio",
    "voice.go_to_home": "go to home",
    "voice.go_to_tools": "go to tools",
    "voice.go_to_reports": "go to reports",
    "voice.go_to_learn": "go to learn",
    "voice.go_to_profile": "go to profile",
    "voice.sign_out": "sign out",
    "voice.logout": "logout",
    "voice.restart_tutorial": "restart tutorial",

    // Voice descriptions
    "voice.desc.next": "Go to the next step",
    "voice.desc.previous": "Go to the previous step",
    "voice.desc.back": "Go to the previous step",
    "voice.desc.skip": "Skip the onboarding process",
    "voice.desc.complete": "Complete the onboarding process",
    "voice.desc.finish": "Complete the onboarding process",
    "voice.desc.start": "Start or continue the onboarding process",
    "voice.desc.help": "List all available voice commands",
    "voice.desc.stop_listening": "Turn off voice navigation",
    "voice.desc.enable_high_contrast": "Turn on high contrast mode",
    "voice.desc.disable_high_contrast": "Turn off high contrast mode",
    "voice.desc.increase_font_size": "Make the text larger",
    "voice.desc.decrease_font_size": "Make the text smaller",
    "voice.desc.enable_audio": "Turn on audio assistance",
    "voice.desc.disable_audio": "Turn off audio assistance",
    "voice.desc.go_to_home": "Navigate to the home tab",
    "voice.desc.go_to_tools": "Navigate to the tools tab",
    "voice.desc.go_to_reports": "Navigate to the reports tab",
    "voice.desc.go_to_learn": "Navigate to the learn tab",
    "voice.desc.go_to_profile": "Navigate to the profile tab",
    "voice.desc.sign_out": "Sign out of the application",
    "voice.desc.logout": "Sign out of the application",
    "voice.desc.restart_tutorial": "Restart the onboarding tutorial",

    // Voice messages
    "voice.welcome":
      "Welcome to AccessiFlow's voice navigation. You can say commands like 'next', 'back', or 'help' to navigate.",
    "voice.main_welcome":
      "Welcome to AccessiFlow. You can navigate the app using voice commands. Say 'help' to hear available commands.",
    "voice.help_message": "Available commands: {commands}. What would you like to do?",
    "voice.disabled": "Voice navigation disabled",

    // UI Text
    language: "Language",
    voice_navigation: "Voice Navigation",
    voice_on: "Voice On",
    voice_off: "Voice Off",
    enable_voice_navigation: "Enable voice navigation",
    disable_voice_navigation: "Disable voice navigation",
    voice_commands: "Voice Commands",
    close: "Close",
    select_language: "Select Language",

    // Home Page
    quick_accessibility_settings: "Quick Accessibility Settings",
    adjust_settings_customize: "Adjust these settings to customize your experience",
    font_size: "Font Size",
    high_contrast_mode: "High Contrast Mode",
    reduced_motion: "Reduced Motion",
    screen_reader_mode: "Screen Reader Mode",
    visual_accessibility: "Visual Accessibility",
    auditory_accessibility: "Audio Accessibility",
    motor_accessibility: "Motor Accessibility",
    cognitive_accessibility: "Cognitive Accessibility",
    visual_description: "High contrast, font scaling, and color adjustments",
    auditory_description: "Screen reader support and audio descriptions",
    motor_description: "Keyboard navigation and gesture alternatives",
    cognitive_description: "Simplified interfaces and clear navigation",
    active: "Active",
    partial: "Partial",
    inactive: "Inactive",
    accessibility_score: "Accessibility Score",
    current_compliance: "Your current accessibility compliance level",
    checks_passed: "checks passed",
    warnings: "warnings",
    recommendations: "recommendations",

    // Navigation
    home: "Home",
    tools: "Tools",
    reports: "Reports",
    learn: "Learn",
    profile: "Profile",

    // Login Page
    email_address: "Email Address",
    password: "Password",
    remember_me: "Remember me",
    forgot_password: "Forgot?",
    signing_in: "Signing in...",
    sign_in: "Sign In",
    dont_have_account: "Don't have an account?",
    sign_up: "Sign up",
    demo_account: "Demo Account",
    try_demo_credentials: "Try the app with these demo credentials:",
    high_contrast: "High Contrast",
  },
  es: {
    // Voice commands
    "voice.next": "siguiente",
    "voice.previous": "anterior",
    "voice.back": "atrás",
    "voice.skip": "saltar",
    "voice.complete": "completar",
    "voice.finish": "terminar",
    "voice.start": "empezar",
    "voice.help": "ayuda",
    "voice.stop_listening": "dejar de escuchar",
    "voice.enable_high_contrast": "activar alto contraste",
    "voice.disable_high_contrast": "desactivar alto contraste",
    "voice.increase_font_size": "aumentar tamaño de fuente",
    "voice.decrease_font_size": "disminuir tamaño de fuente",
    "voice.enable_audio": "activar audio",
    "voice.disable_audio": "desactivar audio",
    "voice.go_to_home": "ir a inicio",
    "voice.go_to_tools": "ir a herramientas",
    "voice.go_to_reports": "ir a reportes",
    "voice.go_to_learn": "ir a aprender",
    "voice.go_to_profile": "ir a perfil",
    "voice.sign_out": "cerrar sesión",
    "voice.logout": "salir",
    "voice.restart_tutorial": "reiniciar tutorial",

    // Voice descriptions
    "voice.desc.next": "Ir al siguiente paso",
    "voice.desc.previous": "Ir al paso anterior",
    "voice.desc.back": "Ir al paso anterior",
    "voice.desc.skip": "Saltar el proceso de incorporación",
    "voice.desc.complete": "Completar el proceso de incorporación",
    "voice.desc.finish": "Completar el proceso de incorporación",
    "voice.desc.start": "Iniciar o continuar el proceso de incorporación",
    "voice.desc.help": "Listar todos los comandos de voz disponibles",
    "voice.desc.stop_listening": "Desactivar la navegación por voz",
    "voice.desc.enable_high_contrast": "Activar el modo de alto contraste",
    "voice.desc.disable_high_contrast": "Desactivar el modo de alto contraste",
    "voice.desc.increase_font_size": "Hacer el texto más grande",
    "voice.desc.decrease_font_size": "Hacer el texto más pequeño",
    "voice.desc.enable_audio": "Activar asistencia de audio",
    "voice.desc.disable_audio": "Desactivar asistencia de audio",
    "voice.desc.go_to_home": "Navegar a la pestaña de inicio",
    "voice.desc.go_to_tools": "Navegar a la pestaña de herramientas",
    "voice.desc.go_to_reports": "Navegar a la pestaña de reportes",
    "voice.desc.go_to_learn": "Navegar a la pestaña de aprender",
    "voice.desc.go_to_profile": "Navegar a la pestaña de perfil",
    "voice.desc.sign_out": "Cerrar sesión de la aplicación",
    "voice.desc.logout": "Cerrar sesión de la aplicación",
    "voice.desc.restart_tutorial": "Reiniciar el tutorial de incorporación",

    // Voice messages
    "voice.welcome":
      "Bienvenido a la navegación por voz de AccessiFlow. Puedes decir comandos como 'siguiente', 'atrás' o 'ayuda' para navegar.",
    "voice.main_welcome":
      "Bienvenido a AccessiFlow. Puedes navegar por la aplicación usando comandos de voz. Di 'ayuda' para escuchar los comandos disponibles.",
    "voice.help_message": "Comandos disponibles: {commands}. ¿Qué te gustaría hacer?",
    "voice.disabled": "Navegación por voz desactivada",

    // UI Text
    language: "Idioma",
    voice_navigation: "Navegación por Voz",
    voice_on: "Voz Activada",
    voice_off: "Voz Desactivada",
    enable_voice_navigation: "Activar navegación por voz",
    disable_voice_navigation: "Desactivar navegación por voz",
    voice_commands: "Comandos de Voz",
    close: "Cerrar",
    select_language: "Seleccionar Idioma",

    // Home Page
    quick_accessibility_settings: "Configuración Rápida de Accesibilidad",
    adjust_settings_customize: "Ajusta estas configuraciones para personalizar tu experiencia",
    font_size: "Tamaño de Fuente",
    high_contrast_mode: "Modo de Alto Contraste",
    reduced_motion: "Movimiento Reducido",
    screen_reader_mode: "Modo de Lector de Pantalla",
    visual_accessibility: "Accesibilidad Visual",
    auditory_accessibility: "Accesibilidad Auditiva",
    motor_accessibility: "Accesibilidad Motora",
    cognitive_accessibility: "Accesibilidad Cognitiva",
    visual_description: "Alto contraste, escalado de fuente y ajustes de color",
    auditory_description: "Soporte para lectores de pantalla y descripciones de audio",
    motor_description: "Navegación por teclado y alternativas de gestos",
    cognitive_description: "Interfaces simplificadas y navegación clara",
    active: "Activo",
    partial: "Parcial",
    inactive: "Inactivo",
    accessibility_score: "Puntuación de Accesibilidad",
    current_compliance: "Tu nivel actual de cumplimiento de accesibilidad",
    checks_passed: "verificaciones aprobadas",
    warnings: "advertencias",
    recommendations: "recomendaciones",

    // Navigation
    home: "Inicio",
    tools: "Herramientas",
    reports: "Informes",
    learn: "Aprender",
    profile: "Perfil",

    // Login Page
    email_address: "Dirección de Correo",
    password: "Contraseña",
    remember_me: "Recordarme",
    forgot_password: "¿Olvidaste?",
    signing_in: "Iniciando sesión...",
    sign_in: "Iniciar Sesión",
    dont_have_account: "¿No tienes una cuenta?",
    sign_up: "Regístrate",
    demo_account: "Cuenta Demo",
    try_demo_credentials: "Prueba la aplicación con estas credenciales de demostración:",
    high_contrast: "Alto Contraste",
  },
  fr: {
    // Voice commands
    "voice.next": "suivant",
    "voice.previous": "précédent",
    "voice.back": "retour",
    "voice.skip": "ignorer",
    "voice.complete": "terminer",
    "voice.finish": "finir",
    "voice.start": "commencer",
    "voice.help": "aide",
    "voice.stop_listening": "arrêter d'écouter",
    "voice.enable_high_contrast": "activer contraste élevé",
    "voice.disable_high_contrast": "désactiver contraste élevé",
    "voice.increase_font_size": "augmenter taille police",
    "voice.decrease_font_size": "diminuer taille police",
    "voice.enable_audio": "activer audio",
    "voice.disable_audio": "désactiver audio",
    "voice.go_to_home": "aller à accueil",
    "voice.go_to_tools": "aller aux outils",
    "voice.go_to_reports": "aller aux rapports",
    "voice.go_to_learn": "aller à apprendre",
    "voice.go_to_profile": "aller au profil",
    "voice.sign_out": "se déconnecter",
    "voice.logout": "déconnexion",
    "voice.restart_tutorial": "redémarrer tutoriel",

    // Voice descriptions
    "voice.desc.next": "Aller à l'étape suivante",
    "voice.desc.previous": "Aller à l'étape précédente",
    "voice.desc.back": "Aller à l'étape précédente",
    "voice.desc.skip": "Ignorer le processus d'intégration",
    "voice.desc.complete": "Terminer le processus d'intégration",
    "voice.desc.finish": "Terminer le processus d'intégration",
    "voice.desc.start": "Commencer ou continuer le processus d'intégration",
    "voice.desc.help": "Lister toutes les commandes vocales disponibles",
    "voice.desc.stop_listening": "Désactiver la navigation vocale",
    "voice.desc.enable_high_contrast": "Activer le mode contraste élevé",
    "voice.desc.disable_high_contrast": "Désactiver le mode contraste élevé",
    "voice.desc.increase_font_size": "Agrandir le texte",
    "voice.desc.decrease_font_size": "Réduire le texte",
    "voice.desc.enable_audio": "Activer l'assistance audio",
    "voice.desc.disable_audio": "Désactiver l'assistance audio",
    "voice.desc.go_to_home": "Naviguer vers l'onglet accueil",
    "voice.desc.go_to_tools": "Naviguer vers l'onglet outils",
    "voice.desc.go_to_reports": "Naviguer vers l'onglet rapports",
    "voice.desc.go_to_learn": "Naviguer vers l'onglet apprendre",
    "voice.desc.go_to_profile": "Naviguer vers l'onglet profil",
    "voice.desc.sign_out": "Se déconnecter de l'application",
    "voice.desc.logout": "Se déconnecter de l'application",
    "voice.desc.restart_tutorial": "Redémarrer le tutoriel d'intégration",

    // Voice messages
    "voice.welcome":
      "Bienvenue dans la navigation vocale d'AccessiFlow. Vous pouvez dire des commandes comme 'suivant', 'retour' ou 'aide' pour naviguer.",
    "voice.main_welcome":
      "Bienvenue dans AccessiFlow. Vous pouvez naviguer dans l'application en utilisant des commandes vocales. Dites 'aide' pour entendre les commandes disponibles.",
    "voice.help_message": "Commandes disponibles : {commands}. Que souhaitez-vous faire ?",
    "voice.disabled": "Navigation vocale désactivée",

    // UI Text
    language: "Langue",
    voice_navigation: "Navigation Vocale",
    voice_on: "Voix Activée",
    voice_off: "Voix Désactivée",
    enable_voice_navigation: "Activer la navigation vocale",
    disable_voice_navigation: "Désactiver la navigation vocale",
    voice_commands: "Commandes Vocales",
    close: "Fermer",
    select_language: "Sélectionner la Langue",

    // Home Page
    quick_accessibility_settings: "Paramètres Rapides d'Accessibilité",
    adjust_settings_customize: "Ajustez ces paramètres pour personnaliser votre expérience",
    font_size: "Taille de Police",
    high_contrast_mode: "Mode Contraste Élevé",
    reduced_motion: "Mouvement Réduit",
    screen_reader_mode: "Mode Lecteur d'Écran",
    visual_accessibility: "Accessibilité Visuelle",
    auditory_accessibility: "Accessibilité Auditive",
    motor_accessibility: "Accessibilité Motrice",
    cognitive_accessibility: "Accessibilité Cognitive",
    visual_description: "Contraste élevé, mise à l'échelle des polices et ajustements de couleur",
    auditory_description: "Support pour lecteurs d'écran et descriptions audio",
    motor_description: "Navigation au clavier et alternatives gestuelles",
    cognitive_description: "Interfaces simplifiées et navigation claire",
    active: "Actif",
    partial: "Partiel",
    inactive: "Inactif",
    accessibility_score: "Score d'Accessibilité",
    current_compliance: "Votre niveau actuel de conformité d'accessibilité",
    checks_passed: "vérifications réussies",
    warnings: "avertissements",
    recommendations: "recommandations",

    // Navigation
    home: "Accueil",
    tools: "Outils",
    reports: "Rapports",
    learn: "Apprendre",
    profile: "Profil",

    // Login Page
    email_address: "Adresse Email",
    password: "Mot de Passe",
    remember_me: "Se souvenir de moi",
    forgot_password: "Oublié?",
    signing_in: "Connexion en cours...",
    sign_in: "Se Connecter",
    dont_have_account: "Vous n'avez pas de compte?",
    sign_up: "S'inscrire",
    demo_account: "Compte Démo",
    try_demo_credentials: "Essayez l'application avec ces identifiants de démonstration:",
    high_contrast: "Contraste Élevé",
  },
  de: {
    // Voice commands
    "voice.next": "weiter",
    "voice.previous": "zurück",
    "voice.back": "zurück",
    "voice.skip": "überspringen",
    "voice.complete": "abschließen",
    "voice.finish": "beenden",
    "voice.start": "starten",
    "voice.help": "hilfe",
    "voice.stop_listening": "aufhören zu hören",
    "voice.enable_high_contrast": "hohen kontrast aktivieren",
    "voice.disable_high_contrast": "hohen kontrast deaktivieren",
    "voice.increase_font_size": "schriftgröße erhöhen",
    "voice.decrease_font_size": "schriftgröße verringern",
    "voice.enable_audio": "audio aktivieren",
    "voice.disable_audio": "audio deaktivieren",
    "voice.go_to_home": "zur startseite gehen",
    "voice.go_to_tools": "zu werkzeugen gehen",
    "voice.go_to_reports": "zu berichten gehen",
    "voice.go_to_learn": "zum lernen gehen",
    "voice.go_to_profile": "zum profil gehen",
    "voice.sign_out": "abmelden",
    "voice.logout": "ausloggen",
    "voice.restart_tutorial": "tutorial neu starten",

    // Voice descriptions
    "voice.desc.next": "Zum nächsten Schritt gehen",
    "voice.desc.previous": "Zum vorherigen Schritt gehen",
    "voice.desc.back": "Zum vorherigen Schritt gehen",
    "voice.desc.skip": "Den Einführungsprozess überspringen",
    "voice.desc.complete": "Den Einführungsprozess abschließen",
    "voice.desc.finish": "Den Einführungsprozess abschließen",
    "voice.desc.start": "Den Einführungsprozess starten oder fortsetzen",
    "voice.desc.help": "Alle verfügbaren Sprachbefehle auflisten",
    "voice.desc.stop_listening": "Sprachnavigation deaktivieren",
    "voice.desc.enable_high_contrast": "Hohen Kontrast-Modus aktivieren",
    "voice.desc.disable_high_contrast": "Hohen Kontrast-Modus deaktivieren",
    "voice.desc.increase_font_size": "Text vergrößern",
    "voice.desc.decrease_font_size": "Text verkleinern",
    "voice.desc.enable_audio": "Audio-Unterstützung aktivieren",
    "voice.desc.disable_audio": "Audio-Unterstützung deaktivieren",
    "voice.desc.go_to_home": "Zur Startseite navigieren",
    "voice.desc.go_to_tools": "Zu Werkzeugen navigieren",
    "voice.desc.go_to_reports": "Zu Berichten navigieren",
    "voice.desc.go_to_learn": "Zum Lernen navigieren",
    "voice.desc.go_to_profile": "Zum Profil navigieren",
    "voice.desc.sign_out": "Von der Anwendung abmelden",
    "voice.desc.logout": "Von der Anwendung abmelden",
    "voice.desc.restart_tutorial": "Das Einführungs-Tutorial neu starten",

    // Voice messages
    "voice.welcome":
      "Willkommen zur Sprachnavigation von AccessiFlow. Sie können Befehle wie 'weiter', 'zurück' oder 'hilfe' sagen, um zu navigieren.",
    "voice.main_welcome":
      "Willkommen bei AccessiFlow. Sie können die App mit Sprachbefehlen navigieren. Sagen Sie 'hilfe', um verfügbare Befehle zu hören.",
    "voice.help_message": "Verfügbare Befehle: {commands}. Was möchten Sie tun?",
    "voice.disabled": "Sprachnavigation deaktiviert",

    // UI Text
    language: "Sprache",
    voice_navigation: "Sprachnavigation",
    voice_on: "Sprache An",
    voice_off: "Sprache Aus",
    enable_voice_navigation: "Sprachnavigation aktivieren",
    disable_voice_navigation: "Sprachnavigation deaktivieren",
    voice_commands: "Sprachbefehle",
    close: "Schließen",
    select_language: "Sprache Auswählen",

    // Home Page
    quick_accessibility_settings: "Schnelle Zugänglichkeitseinstellungen",
    adjust_settings_customize: "Passen Sie diese Einstellungen an, um Ihr Erlebnis zu personalisieren",
    font_size: "Schriftgröße",
    high_contrast_mode: "Hoher Kontrast Modus",
    reduced_motion: "Reduzierte Bewegung",
    screen_reader_mode: "Bildschirmleser-Modus",
    visual_accessibility: "Visuelle Zugänglichkeit",
    auditory_accessibility: "Auditive Zugänglichkeit",
    motor_accessibility: "Motorische Zugänglichkeit",
    cognitive_accessibility: "Kognitive Zugänglichkeit",
    visual_description: "Hoher Kontrast, Schriftskalierung und Farbanpassungen",
    auditory_description: "Unterstützung für Bildschirmleser und Audiobeschreibungen",
    motor_description: "Tastaturnavigation und Gestenalternativen",
    cognitive_description: "Vereinfachte Schnittstellen und klare Navigation",
    active: "Aktiv",
    partial: "Teilweise",
    inactive: "Inaktiv",
    accessibility_score: "Zugänglichkeitsbewertung",
    current_compliance: "Ihr aktuelles Niveau der Zugänglichkeitskonformität",
    checks_passed: "Prüfungen bestanden",
    warnings: "Warnungen",
    recommendations: "Empfehlungen",

    // Navigation
    home: "Startseite",
    tools: "Werkzeuge",
    reports: "Berichte",
    learn: "Lernen",
    profile: "Profil",

    // Login Page
    email_address: "E-Mail-Adresse",
    password: "Passwort",
    remember_me: "Angemeldet bleiben",
    forgot_password: "Vergessen?",
    signing_in: "Anmeldung läuft...",
    sign_in: "Anmelden",
    dont_have_account: "Haben Sie kein Konto?",
    sign_up: "Registrieren",
    demo_account: "Demo-Konto",
    try_demo_credentials: "Testen Sie die App mit diesen Demo-Anmeldedaten:",
    high_contrast: "Hoher Kontrast",
  },
  // Add more languages as needed...
  it: {
    "voice.next": "avanti",
    "voice.previous": "precedente",
    "voice.back": "indietro",
    "voice.help": "aiuto",
    language: "Lingua",
    voice_navigation: "Navigazione Vocale",
    voice_on: "Voce Attiva",
    voice_off: "Voce Disattiva",
    select_language: "Seleziona Lingua",
    home: "Home",
    tools: "Strumenti",
    reports: "Rapporti",
    learn: "Imparare",
    profile: "Profilo",
  },
  pt: {
    "voice.next": "próximo",
    "voice.previous": "anterior",
    "voice.back": "voltar",
    "voice.help": "ajuda",
    language: "Idioma",
    voice_navigation: "Navegação por Voz",
    voice_on: "Voz Ligada",
    voice_off: "Voz Desligada",
    select_language: "Selecionar Idioma",
    home: "Início",
    tools: "Ferramentas",
    reports: "Relatórios",
    learn: "Aprender",
    profile: "Perfil",
  },
  ja: {
    "voice.next": "次",
    "voice.previous": "前",
    "voice.back": "戻る",
    "voice.help": "ヘルプ",
    language: "言語",
    voice_navigation: "音声ナビゲーション",
    voice_on: "音声オン",
    voice_off: "音声オフ",
    select_language: "言語を選択",
    home: "ホーム",
    tools: "ツール",
    reports: "レポート",
    learn: "学ぶ",
    profile: "プロフィール",
  },
  ko: {
    "voice.next": "다음",
    "voice.previous": "이전",
    "voice.back": "뒤로",
    "voice.help": "도움말",
    language: "언어",
    voice_navigation: "음성 내비게이션",
    voice_on: "음성 켜짐",
    voice_off: "음성 꺼짐",
    select_language: "언어 선택",
    home: "홈",
    tools: "도구",
    reports: "보고서",
    learn: "학습",
    profile: "프로필",
  },
  zh: {
    "voice.next": "下一个",
    "voice.previous": "上一个",
    "voice.back": "返回",
    "voice.help": "帮助",
    language: "语言",
    voice_navigation: "语音导航",
    voice_on: "语音开启",
    voice_off: "语音关闭",
    select_language: "选择语言",
    home: "首页",
    tools: "工具",
    reports: "报告",
    learn: "学习",
    profile: "个人资料",
  },
  ar: {
    "voice.next": "التالي",
    "voice.previous": "السابق",
    "voice.back": "رجوع",
    "voice.help": "مساعدة",
    language: "اللغة",
    voice_navigation: "التنقل الصوتي",
    voice_on: "الصوت مفعل",
    voice_off: "الصوت معطل",
    select_language: "اختر اللغة",
    home: "الرئيسية",
    tools: "الأدوات",
    reports: "التقارير",
    learn: "التعلم",
    profile: "الملف الشخصي",
  },
  hi: {
    "voice.next": "अगला",
    "voice.previous": "पिछला",
    "voice.back": "वापस",
    "voice.help": "सहायता",
    language: "भाषा",
    voice_navigation: "आवाज़ नेविगेशन",
    voice_on: "आवाज़ चालू",
    voice_off: "आवाज़ बंद",
    select_language: "भाषा चुनें",
    home: "होम",
    tools: "उपकरण",
    reports: "रिपोर्ट",
    learn: "सीखें",
    profile: "प्रोफाइल",
  },
  ru: {
    "voice.next": "далее",
    "voice.previous": "назад",
    "voice.back": "назад",
    "voice.help": "помощь",
    language: "Язык",
    voice_navigation: "Голосовая Навигация",
    voice_on: "Голос Включен",
    voice_off: "Голос Выключен",
    select_language: "Выбрать Язык",
    home: "Главная",
    tools: "Инструменты",
    reports: "Отчеты",
    learn: "Обучение",
    profile: "Профиль",
  },
  el: {
    // Voice commands
    "voice.next": "επόμενο",
    "voice.previous": "προηγούμενο",
    "voice.back": "πίσω",
    "voice.skip": "παράλειψη",
    "voice.complete": "ολοκλήρωση",
    "voice.finish": "τέλος",
    "voice.start": "έναρξη",
    "voice.help": "βοήθεια",
    "voice.stop_listening": "σταμάτα να ακούς",
    "voice.enable_high_contrast": "ενεργοποίηση υψηλής αντίθεσης",
    "voice.disable_high_contrast": "απενεργοποίηση υψηλής αντίθεσης",
    "voice.increase_font_size": "αύξηση μεγέθους γραμματοσειράς",
    "voice.decrease_font_size": "μείωση μεγέθους γραμματοσειράς",
    "voice.enable_audio": "ενεργοποίηση ήχου",
    "voice.disable_audio": "απενεργοποίηση ήχου",
    "voice.go_to_home": "πήγαινε στην αρχική",
    "voice.go_to_tools": "πήγαινε στα εργαλεία",
    "voice.go_to_reports": "πήγαινε στις αναφορές",
    "voice.go_to_learn": "πήγαινε στη μάθηση",
    "voice.go_to_profile": "πήγαινε στο προφίλ",
    "voice.sign_out": "αποσύνδεση",
    "voice.logout": "έξοδος",
    "voice.restart_tutorial": "επανεκκίνηση οδηγού",

    // Voice descriptions
    "voice.desc.next": "Πήγαινε στο επόμενο βήμα",
    "voice.desc.previous": "Πήγαινε στο προηγούμενο βήμα",
    "voice.desc.back": "Πήγαινε στο προηγούμενο βήμα",
    "voice.desc.skip": "Παράλειψη της διαδικασίας εισαγωγής",
    "voice.desc.complete": "Ολοκλήρωση της διαδικασίας εισαγωγής",
    "voice.desc.finish": "Ολοκλήρωση της διαδικασίας εισαγωγής",
    "voice.desc.start": "Έναρξη ή συνέχιση της διαδικασίας εισαγωγής",
    "voice.desc.help": "Εμφάνιση όλων των διαθέσιμων φωνητικών εντολών",
    "voice.desc.stop_listening": "Απενεργοποίηση φωνητικής πλοήγησης",
    "voice.desc.enable_high_contrast": "Ενεργοποίηση λειτουργίας υψηλής αντίθεσης",
    "voice.desc.disable_high_contrast": "Απενεργοποίηση λειτουργίας υψηλής αντίθεσης",
    "voice.desc.increase_font_size": "Μεγέθυνση κειμένου",
    "voice.desc.decrease_font_size": "Σμίκρυνση κειμένου",
    "voice.desc.enable_audio": "Ενεργοποίηση ηχητικής υποστήριξης",
    "voice.desc.disable_audio": "Απενεργοποίηση ηχητικής υποστήριξης",
    "voice.desc.go_to_home": "Πλοήγηση στην καρτέλα αρχικής",
    "voice.desc.go_to_tools": "Πλοήγηση στην καρτέλα εργαλείων",
    "voice.desc.go_to_reports": "Πλοήγηση στην καρτέλα αναφορών",
    "voice.desc.go_to_learn": "Πλοήγηση στην καρτέλα μάθησης",
    "voice.desc.go_to_profile": "Πλοήγηση στην καρτέλα προφίλ",
    "voice.desc.sign_out": "Αποσύνδεση από την εφαρμογή",
    "voice.desc.logout": "Αποσύνδεση από την εφαρμογή",
    "voice.desc.restart_tutorial": "Επανεκκίνηση του οδηγού εισαγωγής",

    // Voice messages
    "voice.welcome":
      "Καλώς ήρθατε στη φωνητική πλοήγηση του AccessiFlow. Μπορείτε να πείτε εντολές όπως 'επόμενο', 'πίσω' ή 'βοήθεια' για να πλοηγηθείτε.",
    "voice.main_welcome":
      "Καλώς ήρθατε στο AccessiFlow. Μπορείτε να πλοηγηθείτε στην εφαρμογή χρησιμοποιώντας φωνητικές εντολές. Πείτε 'βοήθεια' για να ακούσετε τις διαθέσιμες εντολές.",
    "voice.help_message": "Διαθέσιμες εντολές: {commands}. Τι θα θέλατε να κάνετε;",
    "voice.disabled": "Φωνητική πλοήγηση απενεργοποιημένη",

    // UI Text
    language: "Γλώσσα",
    voice_navigation: "Φωνητική Πλοήγηση",
    voice_on: "Φωνή Ενεργή",
    voice_off: "Φωνή Ανενεργή",
    enable_voice_navigation: "Ενεργοποίηση φωνητικής πλοήγησης",
    disable_voice_navigation: "Απενεργοποίηση φωνητικής πλοήγησης",
    voice_commands: "Φωνητικές Εντολές",
    close: "Κλείσιμο",
    select_language: "Επιλογή Γλώσσας",

    // App Navigation
    home: "Αρχική",
    tools: "Εργαλεία",
    reports: "Αναφορές",
    learn: "Μάθηση",
    profile: "Προφίλ",

    // Login Page
    welcome_back: "Καλώς ήρθατε πίσω",
    sign_in: "Σύνδεση",
    email_address: "Διεύθυνση Email",
    password: "Κωδικός Πρόσβασης",
    remember_me: "Να με θυμάσαι",
    forgot_password: "Ξεχάσατε τον κωδικό;",
    signing_in: "Σύνδεση...",
    dont_have_account: "Δεν έχετε λογαριασμό;",
    sign_up: "Εγγραφή",
    demo_account: "Δοκιμαστικός Λογαριασμός",
    try_demo_credentials: "Δοκιμάστε την εφαρμογή με αυτά τα δοκιμαστικά διαπιστευτήρια:",
    high_contrast: "Υψηλή Αντίθεση",

    // Home Page
    quick_accessibility_settings: "Γρήγορες Ρυθμίσεις Προσβασιμότητας",
    adjust_settings_customize: "Προσαρμόστε αυτές τις ρυθμίσεις για να προσαρμόσετε την εμπειρία σας",
    font_size: "Μέγεθος Γραμματοσειράς",
    high_contrast_mode: "Λειτουργία Υψηλής Αντίθεσης",
    reduced_motion: "Μειωμένη Κίνηση",
    screen_reader_mode: "Λειτουργία Αναγνώστη Οθόνης",
    visual_accessibility: "Οπτική Προσβασιμότητα",
    auditory_accessibility: "Ακουστική Προσβασιμότητα",
    motor_accessibility: "Κινητική Προσβασιμότητα",
    cognitive_accessibility: "Γνωστική Προσβασιμότητα",
    visual_description: "Υψηλή αντίθεση, κλιμάκωση γραμματοσειράς και προσαρμογές χρωμάτων",
    auditory_description: "Υποστήριξη αναγνώστη οθόνης και ηχητικές περιγραφές",
    motor_description: "Πλοήγηση με πληκτρολόγιο και εναλλακτικές χειρονομίες",
    cognitive_description: "Απλοποιημένες διεπαφές και σαφής πλοήγηση",
    active: "Ενεργό",
    partial: "Μερικό",
    inactive: "Ανενεργό",
    accessibility_score: "Βαθμολογία Προσβασιμότητας",
    current_compliance: "Το τρέχον επίπεδο συμμόρφωσης προσβασιμότητας",
    checks_passed: "έλεγχοι πέρασαν",
    warnings: "προειδοποιήσεις",
    recommendations: "συστάσεις",
  },
}
