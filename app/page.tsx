"use client"

import { useState, useEffect } from "react"
import MobileLayout from "@/components/mobile-layout"
import MobileLogin from "@/components/mobile-login"
import MobileTools from "@/components/mobile-tools"
import MobileReports from "@/components/mobile-reports"
import MobileLearn from "@/components/mobile-learn"
import MobileProfile from "@/components/mobile-profile"
import OnboardingFlow from "@/components/onboarding/onboarding-flow"
import { VoiceNavigationProvider } from "@/components/voice-navigation/voice-navigation-provider"
import { VoiceToggleButton } from "@/components/voice-navigation/voice-toggle-button"
import { LanguageProvider, useLanguage } from "@/hooks/use-language"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Eye, Ear, Hand, Brain, CheckCircle, AlertCircle, Info, Zap } from "lucide-react"

function AccessibilityAppContent() {
  const [fontSize, setFontSize] = useState([16])
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [screenReader, setScreenReader] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [activeTab, setActiveTab] = useState("home")

  const { t } = useLanguage()

  // Check if user has completed onboarding before
  useEffect(() => {
    const onboardingCompleted = localStorage.getItem("accessiflow-onboarding-completed")
    if (onboardingCompleted === "true") {
      setHasCompletedOnboarding(true)
    }
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setActiveTab("home")
  }

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true)
    localStorage.setItem("accessiflow-onboarding-completed", "true")
  }

  const restartOnboarding = () => {
    setHasCompletedOnboarding(false)
    localStorage.removeItem("accessiflow-onboarding-completed")
  }

  // Define voice commands for the main app using translation keys
  const mainAppVoiceCommands = [
    {
      command: "voice.go_to_home",
      callback: () => setActiveTab("home"),
      description: "voice.desc.go_to_home",
    },
    {
      command: "voice.go_to_tools",
      callback: () => setActiveTab("tools"),
      description: "voice.desc.go_to_tools",
    },
    {
      command: "voice.go_to_reports",
      callback: () => setActiveTab("reports"),
      description: "voice.desc.go_to_reports",
    },
    {
      command: "voice.go_to_learn",
      callback: () => setActiveTab("learn"),
      description: "voice.desc.go_to_learn",
    },
    {
      command: "voice.go_to_profile",
      callback: () => setActiveTab("profile"),
      description: "voice.desc.go_to_profile",
    },
    {
      command: "voice.sign_out",
      callback: () => handleLogout(),
      description: "voice.desc.sign_out",
    },
    {
      command: "voice.logout",
      callback: () => handleLogout(),
      description: "voice.desc.logout",
    },
    {
      command: "voice.restart_tutorial",
      callback: () => restartOnboarding(),
      description: "voice.desc.restart_tutorial",
    },
    {
      command: "voice.enable_high_contrast",
      callback: () => setHighContrast(true),
      description: "voice.desc.enable_high_contrast",
    },
    {
      command: "voice.disable_high_contrast",
      callback: () => setHighContrast(false),
      description: "voice.desc.disable_high_contrast",
    },
    {
      command: "voice.increase_font_size",
      callback: () => setFontSize([Math.min(fontSize[0] + 2, 24)]),
      description: "voice.desc.increase_font_size",
    },
    {
      command: "voice.decrease_font_size",
      callback: () => setFontSize([Math.max(fontSize[0] - 2, 12)]),
      description: "voice.desc.decrease_font_size",
    },
  ]

  const renderActiveTab = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-6">
            {/* Quick Settings Panel */}
            <Card className={`mb-8 ${highContrast ? "bg-gray-900 border-gray-700" : "bg-white/70 backdrop-blur-sm"}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    Quick Accessibility Settings
                  </CardTitle>
                  <VoiceToggleButton />
                </div>
                <CardDescription>Adjust these settings to customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="font-size" className="text-sm font-medium">
                      Font Size: {fontSize[0]}px
                    </label>
                    <Slider
                      id="font-size"
                      min={12}
                      max={24}
                      step={1}
                      value={fontSize}
                      onValueChange={setFontSize}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label htmlFor="high-contrast" className="text-sm font-medium">
                      High Contrast
                    </label>
                    <Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
                  </div>

                  <div className="flex items-center justify-between">
                    <label htmlFor="reduced-motion" className="text-sm font-medium">
                      Reduced Motion
                    </label>
                    <Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={setReducedMotion} />
                  </div>

                  <div className="flex items-center justify-between">
                    <label htmlFor="screen-reader" className="text-sm font-medium">
                      Screen Reader Mode
                    </label>
                    <Switch id="screen-reader" checked={screenReader} onCheckedChange={setScreenReader} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accessibility Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Eye,
                  title: "Visual Accessibility",
                  description: "High contrast, font scaling, and color adjustments",
                  status: "active",
                  color: "bg-blue-500",
                },
                {
                  icon: Ear,
                  title: "Audio Accessibility",
                  description: "Screen reader support and audio descriptions",
                  status: "active",
                  color: "bg-green-500",
                },
                {
                  icon: Hand,
                  title: "Motor Accessibility",
                  description: "Keyboard navigation and gesture alternatives",
                  status: "partial",
                  color: "bg-yellow-500",
                },
                {
                  icon: Brain,
                  title: "Cognitive Accessibility",
                  description: "Simplified interfaces and clear navigation",
                  status: "active",
                  color: "bg-purple-500",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className={`relative overflow-hidden ${
                    highContrast
                      ? "bg-gray-900 border-gray-700"
                      : "bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow"
                  }`}
                >
                  <div className={`absolute top-0 left-0 w-full h-1 ${feature.color}`} />
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <feature.icon
                        className={`w-6 h-6 ${
                          feature.status === "active"
                            ? "text-green-600"
                            : feature.status === "partial"
                              ? "text-yellow-600"
                              : "text-gray-400"
                        }`}
                      />
                      <Badge
                        variant={
                          feature.status === "active"
                            ? "default"
                            : feature.status === "partial"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {feature.status === "active" ? "Active" : feature.status === "partial" ? "Partial" : "Inactive"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className={`text-sm ${highContrast ? "text-gray-300" : "text-gray-600"}`}>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Accessibility Score */}
            <Card className={highContrast ? "bg-gray-900 border-gray-700" : "bg-white/70 backdrop-blur-sm"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Accessibility Score
                </CardTitle>
                <CardDescription>Your current accessibility compliance level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">87%</span>
                    <Badge variant="secondary">WCAG 2.1 AA</Badge>
                  </div>
                  <Progress value={87} className="h-3" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>24 checks passed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                      <span>3 warnings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-600" />
                      <span>2 recommendations</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "tools":
        return <MobileTools highContrast={highContrast} />
      case "reports":
        return <MobileReports highContrast={highContrast} />
      case "learn":
        return <MobileLearn highContrast={highContrast} />
      case "profile":
        return (
          <MobileProfile highContrast={highContrast} onLogout={handleLogout} onRestartOnboarding={restartOnboarding} />
        )
      default:
        return null
    }
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <MobileLogin onLogin={handleLogin} />
  }

  // Show onboarding if not completed
  if (!hasCompletedOnboarding) {
    return (
      <OnboardingFlow
        onComplete={handleOnboardingComplete}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
      />
    )
  }

  // Show main app with voice navigation
  return (
    <VoiceNavigationProvider commands={mainAppVoiceCommands} welcomeMessage={t("voice.main_welcome")}>
      <MobileLayout activeTab={activeTab} onTabChange={setActiveTab} highContrast={highContrast}>
        {renderActiveTab()}
      </MobileLayout>
    </VoiceNavigationProvider>
  )
}

export default function AccessibilityApp() {
  return (
    <LanguageProvider>
      <AccessibilityAppContent />
    </LanguageProvider>
  )
}
