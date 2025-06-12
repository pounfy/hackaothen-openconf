"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Eye,
  Ear,
  Hand,
  Brain,
  ArrowRight,
  ArrowLeft,
  Check,
  Volume2,
  Palette,
  Type,
  Zap,
  Star,
  Play,
  Pause,
  Mic,
  Globe,
} from "lucide-react"
import { VoiceNavigationProvider } from "@/components/voice-navigation/voice-navigation-provider"
import { VoiceToggleButton } from "@/components/voice-navigation/voice-toggle-button"
import { LanguageSelector } from "@/components/language-selector"
import { useVoiceNavigation } from "@/components/voice-navigation/voice-navigation-provider"
import { useLanguage } from "@/hooks/use-language"

interface OnboardingFlowProps {
  onComplete: () => void
  highContrast: boolean
  setHighContrast: (value: boolean) => void
}

export default function OnboardingFlow({ onComplete, highContrast, setHighContrast }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [fontSize, setFontSize] = useState([16])
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const { t } = useLanguage()
  const totalSteps = 6

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCompletedSteps([...completedSteps, currentStep])
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipOnboarding = () => {
    onComplete()
  }

  const completeOnboarding = () => {
    setCompletedSteps([...completedSteps, currentStep])
    onComplete()
  }

  // Define voice commands for navigation using translation keys
  const voiceCommands = [
    {
      command: "voice.next",
      callback: nextStep,
      description: "voice.desc.next",
    },
    {
      command: "voice.previous",
      callback: prevStep,
      description: "voice.desc.previous",
    },
    {
      command: "voice.back",
      callback: prevStep,
      description: "voice.desc.back",
    },
    {
      command: "voice.skip",
      callback: skipOnboarding,
      description: "voice.desc.skip",
    },
    {
      command: "voice.complete",
      callback: completeOnboarding,
      description: "voice.desc.complete",
    },
    {
      command: "voice.finish",
      callback: completeOnboarding,
      description: "voice.desc.finish",
    },
    {
      command: "voice.start",
      callback: nextStep,
      description: "voice.desc.start",
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
    {
      command: "voice.enable_audio",
      callback: () => setAudioEnabled(true),
      description: "voice.desc.enable_audio",
    },
    {
      command: "voice.disable_audio",
      callback: () => setAudioEnabled(false),
      description: "voice.desc.disable_audio",
    },
  ]

  // Wrap the component with the voice navigation provider
  return (
    <VoiceNavigationProvider commands={voiceCommands} welcomeMessage={t("voice.welcome")}>
      <OnboardingFlowContent
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        fontSize={fontSize}
        setFontSize={setFontSize}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        completedSteps={completedSteps}
        setCompletedSteps={setCompletedSteps}
        totalSteps={totalSteps}
        onComplete={onComplete}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
      />
    </VoiceNavigationProvider>
  )
}

interface OnboardingFlowContentProps {
  currentStep: number
  setCurrentStep: (step: number) => void
  fontSize: number[]
  setFontSize: (size: number[]) => void
  audioEnabled: boolean
  setAudioEnabled: (enabled: boolean) => void
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
  completedSteps: number[]
  setCompletedSteps: (steps: number[]) => void
  totalSteps: number
  onComplete: () => void
  highContrast: boolean
  setHighContrast: (enabled: boolean) => void
}

function OnboardingFlowContent({
  currentStep,
  setCurrentStep,
  fontSize,
  setFontSize,
  audioEnabled,
  setAudioEnabled,
  isPlaying,
  setIsPlaying,
  completedSteps,
  setCompletedSteps,
  totalSteps,
  onComplete,
  highContrast,
  setHighContrast,
}: OnboardingFlowContentProps) {
  const { speak, stopSpeaking, isVoiceEnabled } = useVoiceNavigation()
  const { t, currentLanguage } = useLanguage()

  // Simulate text-to-speech for demo
  const speakText = (text: string) => {
    if (audioEnabled) {
      speak(text)
      setIsPlaying(true)
    }
  }

  const stopSpeaking2 = () => {
    stopSpeaking()
    setIsPlaying(false)
  }

  // Step content to be read by screen readers and voice
  const stepContents = [
    "Welcome to AccessiFlow! We're here to help you create and test accessible digital experiences. This quick setup will personalize the app for your needs.",
    "Accessibility ensures everyone can use digital products effectively. We focus on visual, auditory, motor, and cognitive accessibility features.",
    "Visual accessibility features help users with visual impairments. Try the high contrast mode and font size adjustments to see how they improve readability.",
    "Audio and motor features help users with hearing and mobility challenges. All content is properly labeled for screen readers and buttons are sized for easy interaction.",
    "Choose what you'd like to focus on first. You can learn accessibility basics, test your website, explore tools, or join our community.",
    "You're all set! Your personalized accessibility dashboard is ready. Let's start building more inclusive digital experiences together.",
  ]

  useEffect(() => {
    // Announce step changes to screen readers
    const stepTitles = [
      "Welcome to AccessiFlow",
      "Understanding Accessibility",
      "Visual Accessibility Features",
      "Audio and Motor Features",
      "Personalize Your Experience",
      "You're All Set!",
    ]

    if (stepTitles[currentStep]) {
      const announcement = `Step ${currentStep + 1} of ${totalSteps}: ${stepTitles[currentStep]}`

      // Create a live region announcement
      const liveRegion = document.createElement("div")
      liveRegion.setAttribute("aria-live", "polite")
      liveRegion.setAttribute("aria-atomic", "true")
      liveRegion.className = "sr-only"
      liveRegion.textContent = announcement
      document.body.appendChild(liveRegion)

      // If voice or audio is enabled, speak the step content
      if (isVoiceEnabled || audioEnabled) {
        speak(`${announcement}. ${stepContents[currentStep]}`)
      }

      setTimeout(() => {
        document.body.removeChild(liveRegion)
      }, 1000)
    }
  }, [currentStep, isVoiceEnabled, audioEnabled, speak, stepContents, totalSteps])

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <WelcomeStep
            highContrast={highContrast}
            audioEnabled={audioEnabled}
            setAudioEnabled={setAudioEnabled}
            speakText={speakText}
            isPlaying={isPlaying}
            stopSpeaking={stopSpeaking2}
          />
        )
      case 1:
        return <AccessibilityIntroStep highContrast={highContrast} speakText={speakText} />
      case 2:
        return (
          <VisualFeaturesStep
            highContrast={highContrast}
            setHighContrast={setHighContrast}
            fontSize={fontSize}
            setFontSize={setFontSize}
            speakText={speakText}
          />
        )
      case 3:
        return <AudioMotorStep highContrast={highContrast} speakText={speakText} />
      case 4:
        return <PersonalizationStep highContrast={highContrast} speakText={speakText} />
      case 5:
        return <CompletionStep highContrast={highContrast} speakText={speakText} />
      default:
        return null
    }
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        highContrast ? "bg-black text-white" : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}
    >
      {/* Status Bar */}
      <div
        className={`h-6 ${
          highContrast ? "bg-gray-900" : "bg-blue-600"
        } flex items-center justify-between px-4 text-white text-xs`}
      >
        <span>9:41</span>
        <span>Setup</span>
      </div>

      {/* Progress Header */}
      <div className={`p-4 ${highContrast ? "bg-gray-900" : "bg-white/80"} backdrop-blur-sm border-b`}>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-semibold">Getting Started</h1>
          <div className="flex items-center gap-2">
            <LanguageSelector showLabel={false} />
            <VoiceToggleButton />
            <Button variant="ghost" size="sm" onClick={onComplete}>
              Skip
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
          </div>
          <Progress
            value={((currentStep + 1) / totalSteps) * 100}
            className="h-2"
            aria-label={`Progress: Step ${currentStep + 1} of ${totalSteps}`}
          />
        </div>

        {/* Language indicator */}
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <Globe className="w-4 h-4" />
          <span>
            {currentLanguage.nativeName} ({currentLanguage.speechCode})
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">{renderStep()}</div>

      {/* Navigation Footer */}
      <div
        className={`p-4 ${highContrast ? "bg-gray-900 border-t border-gray-700" : "bg-white/80 border-t"} backdrop-blur-sm`}
      >
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}
            className="gap-2"
            aria-label="Go to previous step"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          {currentStep === totalSteps - 1 ? (
            <Button onClick={onComplete} className="gap-2">
              Get Started
              <Check className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={() => setCurrentStep(currentStep + 1)} className="gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// Background Element Component
function BackgroundElement() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        background: "linear-gradient(115deg, #3a3a9e 80%, #8888ce 70%)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        pointerEvents: "none", // optional, prevents blocking clicks
      }}
    />
  )
}

// Welcome Step Component
function WelcomeStep({
  highContrast,
  audioEnabled,
  setAudioEnabled,
  speakText,
  isPlaying,
  stopSpeaking,
}: {
  highContrast: boolean
  audioEnabled: boolean
  setAudioEnabled: (value: boolean) => void
  speakText: (text: string) => void
  isPlaying: boolean
  stopSpeaking: () => void
}) {
  const { t } = useLanguage()
  const welcomeText =
    "Welcome to AccessiFlow! We're here to help you create and test accessible digital experiences. This quick setup will personalize the app for your needs."

  return (
    <div className="space-y-6 text-center">
      <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto">
        <Eye className="w-12 h-12 text-white" />
      </div>

      <div className="space-y-2">
        <h2 className={`text-2xl font-bold ${highContrast ? "text-white" : "text-gray-900"}`}>
          Welcome to AccessiFlow
        </h2>
        <p className={`text-base ${highContrast ? "text-gray-300" : "text-gray-600"} max-w-md mx-auto leading-relaxed`}>
          {welcomeText}
        </p>
      </div>

      <Card className={`${highContrast ? "bg-gray-900 border-gray-700" : "bg-white/70 backdrop-blur-sm"}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <p className="font-medium">Audio Assistance</p>
                <p className={`text-sm ${highContrast ? "text-gray-300" : "text-gray-600"}`}>
                  Hear instructions read aloud
                </p>
              </div>
            </div>
            <Switch checked={audioEnabled} onCheckedChange={setAudioEnabled} aria-label="Enable audio assistance" />
          </div>

          {audioEnabled && (
            <div className="mt-4 pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => (isPlaying ? stopSpeaking() : speakText(welcomeText))}
                className="gap-2"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? "Stop" : "Play"} Welcome Message
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className={`${highContrast ? "bg-gray-900 border-gray-700" : "bg-white/70 backdrop-blur-sm"}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mic className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <p className="font-medium">{t("voice_navigation")}</p>
                <p className={`text-sm ${highContrast ? "text-gray-300" : "text-gray-600"}`}>
                  Navigate using voice commands
                </p>
              </div>
            </div>
            <VoiceToggleButton />
          </div>
          <div className="mt-3 text-sm text-left">
            <p className={`${highContrast ? "text-gray-300" : "text-gray-600"}`}>
              Try saying: "{t("voice.next")}", "{t("voice.back")}", "{t("voice.help")}", or "
              {t("voice.enable_high_contrast")}"
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap justify-center gap-2">
        <Badge variant="secondary">WCAG 2.1 AA Compliant</Badge>
        <Badge variant="secondary">Screen Reader Ready</Badge>
        <Badge variant="secondary">Voice Controlled</Badge>
        <Badge variant="secondary">Multilingual</Badge>
      </div>
    </div>
  )
}

// Accessibility Introduction Step
function AccessibilityIntroStep({
  highContrast,
  speakText,
}: { highContrast: boolean; speakText: (text: string) => void }) {
  const features = [
    {
      icon: Eye,
      title: "Visual",
      description: "For users with visual impairments or preferences",
      examples: ["High contrast", "Large text", "Color alternatives"],
      color: "bg-blue-500",
    },
    {
      icon: Ear,
      title: "Auditory",
      description: "For users who are deaf or hard of hearing",
      examples: ["Screen readers", "Visual alerts", "Captions"],
      color: "bg-green-500",
    },
    {
      icon: Hand,
      title: "Motor",
      description: "For users with mobility or dexterity challenges",
      examples: ["Voice control", "Large buttons", "Gesture alternatives"],
      color: "bg-yellow-500",
    },
    {
      icon: Brain,
      title: "Cognitive",
      description: "For users with learning or attention differences",
      examples: ["Simple navigation", "Clear language", "Consistent layout"],
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="relative">
      <BackgroundElement />
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className={`text-xl font-bold ${highContrast ? "text-white" : "text-white"}`}>
            Understanding Accessibility
          </h2>
          <p className={`${highContrast ? "text-gray-300" : "text-white"}`}>
            Accessibility ensures everyone can use digital products effectively
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`${highContrast ? "bg-gray-900 border-gray-700" : "bg-white/70 backdrop-blur-sm"} relative overflow-hidden`}
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${feature.color}`} />
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 ${feature.color} rounded-lg flex items-center justify-center`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{feature.title} Accessibility</h3>
                    <p className={`text-sm ${highContrast ? "text-gray-300" : "text-gray-600"} mb-2`}>
                      {feature.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {feature.examples.map((example, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className={`${highContrast ? "bg-blue-900 border-blue-700" : "bg-blue-50 border-blue-200"}`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Did You Know?</h4>
                <p className="text-sm text-blue-800">
                  Over 1 billion people worldwide have some form of disability. Accessible design benefits everyone, not
                  just people with disabilities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Visual Features Step
function VisualFeaturesStep({
  highContrast,
  setHighContrast,
  fontSize,
  setFontSize,
  speakText,
}: {
  highContrast: boolean
  setHighContrast: (value: boolean) => void
  fontSize: number[]
  setFontSize: (value: number[]) => void
  speakText: (text: string) => void
}) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className={`text-xl font-bold ${highContrast ? "text-white" : "text-gray-900"}`}>
          Visual Accessibility Features
        </h2>
        <p className={`${highContrast ? "text-gray-300" : "text-gray-600"}`}>
          Try these features to see how they improve readability
        </p>
      </div>

      <Card className={`${highContrast ? "bg-gray-900 border-gray-700" : "bg-white/70 backdrop-blur-sm"}`}>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">High Contrast Mode</p>
                <p className={`text-sm ${highContrast ? "text-gray-300" : "text-gray-600"}`}>
                  Increases contrast for better visibility
                </p>
              </div>
            </div>
            <Switch checked={highContrast} onCheckedChange={setHighContrast} aria-label="Toggle high contrast mode" />
          </div>

          <div className="pt-4 border-t space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Type className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Font Size</p>
                  <p className={`text-sm ${highContrast ? "text-gray-300" : "text-gray-600"}`}>
                    Current size: {fontSize[0]}px
                  </p>
                </div>
              </div>
            </div>
            <Slider
              value={fontSize}
              onValueChange={setFontSize}
              min={12}
              max={24}
              step={1}
              className="w-full"
              aria-label="Adjust font size"
            />
          </div>
        </CardContent>
      </Card>

      <Card className={`${highContrast ? "bg-gray-900 border-gray-700" : "bg-white/70 backdrop-blur-sm"}`}>
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">Sample Text</h3>
          <div
            className={`p-3 rounded border ${highContrast ? "bg-black border-gray-600" : "bg-gray-50 border-gray-200"}`}
            style={{ fontSize: `${fontSize[0]}px` }}
          >
            <p className={`${highContrast ? "text-white" : "text-gray-900"} leading-relaxed`}>
              This is how text will appear with your current settings. Notice how the high contrast mode and font size
              changes affect readability.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className={`${highContrast ? "bg-green-900 border-green-700" : "bg-green-50 border-green-200"}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-900 mb-1">Great!</h4>
              <p className="text-sm text-green-800">
                These settings will be saved and applied throughout the app. You can always change them later in the
                settings menu.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Audio and Motor Features Step
function AudioMotorStep({ highContrast, speakText }: { highContrast: boolean; speakText: (text: string) => void }) {
  const { t } = useLanguage()

  const features = [
    {
      icon: Volume2,
      title: "Screen Reader Support",
      description: "All content is properly labeled for screen readers",
      demo: "This text can be read by assistive technologies",
    },
    {
      icon: Hand,
      title: "Touch Targets",
      description: "All buttons are at least 44x44 pixels for easy tapping",
      demo: "Try tapping this large, accessible button",
    },
    {
      icon: Zap,
      title: "Keyboard Navigation",
      description: "Navigate the entire app using only keyboard or switch controls",
      demo: "Tab through elements in logical order",
    },
    {
      icon: Mic,
      title: "Voice Navigation",
      description: "Control the app using just your voice",
      demo: `Try saying '${t("voice.next")}' to go to the next step`,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className={`text-xl font-bold ${highContrast ? "text-white" : "text-gray-900"}`}>Audio & Motor Features</h2>
        <p className={`${highContrast ? "text-gray-300" : "text-gray-600"}`}>
          Features that help with hearing and movement
        </p>
      </div>

      <div className="space-y-4">
        {features.map((feature, index) => (
          <Card
            key={index}
            className={`${highContrast ? "bg-gray-900 border-gray-700" : "bg-white/70 backdrop-blur-sm"}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className={`text-sm ${highContrast ? "text-gray-300" : "text-gray-600"}`}>{feature.description}</p>
                </div>
              </div>

              <div
                className={`p-3 rounded border ${highContrast ? "bg-black border-gray-600" : "bg-gray-50 border-gray-200"}`}
              >
                <p className={`text-sm ${highContrast ? "text-gray-300" : "text-gray-700"} mb-2`}>
                  Demo: {feature.demo}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="min-h-[44px] min-w-[44px]"
                  aria-label={`Demo button for ${feature.title}`}
                >
                  Try Me
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Personalization Step
function PersonalizationStep({
  highContrast,
  speakText,
}: { highContrast: boolean; speakText: (text: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className={`text-xl font-bold ${highContrast ? "text-white" : "text-gray-900"}`}>
          Personalize Your Experience
        </h2>
        <p className={`${highContrast ? "text-gray-300" : "text-gray-600"}`}>
          Choose what you'd like to focus on first
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {[
          {
            title: "Learn Accessibility Basics",
            description: "Start with fundamental concepts and guidelines",
            icon: Brain,
            color: "from-blue-500 to-blue-700",
          },
          {
            title: "Test My Website",
            description: "Run accessibility audits on your existing site",
            icon: Zap,
            color: "from-green-500 to-green-700",
          },
          {
            title: "Explore Tools",
            description: "Try color contrast checkers and other utilities",
            icon: Palette,
            color: "from-purple-500 to-purple-700",
          },
          {
            title: "Join the Community",
            description: "Connect with other accessibility advocates",
            icon: Star,
            color: "from-orange-500 to-orange-700",
          },
        ].map((option, index) => (
          <Card
            key={index}
            className={`${highContrast ? "bg-gray-900 border-gray-700 hover:border-gray-600" : "bg-white/70 backdrop-blur-sm hover:shadow-lg"} cursor-pointer transition-all`}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center`}
                >
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{option.title}</h3>
                  <p className={`text-sm ${highContrast ? "text-gray-300" : "text-gray-600"}`}>{option.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Completion Step
function CompletionStep({ highContrast, speakText }: { highContrast: boolean; speakText: (text: string) => void }) {
  return (
    <div className="space-y-6 text-center">
      <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-12 h-12 text-white" />
      </div>

      <div className="space-y-2">
        <h2 className={`text-2xl font-bold ${highContrast ? "text-white" : "text-gray-900"}`}>You're All Set!</h2>
        <p className={`text-base ${highContrast ? "text-gray-300" : "text-gray-600"} max-w-md mx-auto leading-relaxed`}>
          Welcome to AccessiFlow! Your personalized accessibility dashboard is ready. Let's start building more
          inclusive digital experiences together.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        <div className={`p-4 rounded-lg ${highContrast ? "bg-gray-900" : "bg-white/70"} text-center`}>
          <div className="text-2xl font-bold text-green-600">87%</div>
          <div className={`text-xs ${highContrast ? "text-gray-300" : "text-gray-600"}`}>Accessibility Score</div>
        </div>
        <div className={`p-4 rounded-lg ${highContrast ? "bg-gray-900" : "bg-white/70"} text-center`}>
          <div className="text-2xl font-bold text-blue-600">24</div>
          <div className={`text-xs ${highContrast ? "text-gray-300" : "text-gray-600"}`}>Tools Available</div>
        </div>
      </div>

      <Card className={`${highContrast ? "bg-blue-900 border-blue-700" : "bg-blue-50 border-blue-200"}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Quick Tip</h4>
              <p className="text-sm text-blue-800">
                You can always revisit this tutorial from the Profile tab. Your accessibility settings are saved and
                will persist across sessions. Voice navigation will remain available throughout the app in your selected
                language.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
