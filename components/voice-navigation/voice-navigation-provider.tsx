"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { useSpeechSynthesis } from "@/hooks/use-speech-synthesis"
import { useLanguage } from "@/hooks/use-language"
import { VoiceCommandTooltip } from "./voice-command-tooltip"
import { VoiceIndicator } from "./voice-indicator"

interface VoiceNavigationContextType {
  isVoiceEnabled: boolean
  toggleVoiceNavigation: () => void
  isListening: boolean
  isSpeaking: boolean
  transcript: string
  speak: (text: string) => void
  stopSpeaking: () => void
  startListening: () => void
  stopListening: () => void
  hasVoiceSupport: boolean
  availableCommands: { command: string; description: string }[]
  lastCommand: string | null
  currentLanguage: string
}

const VoiceNavigationContext = createContext<VoiceNavigationContextType | undefined>(undefined)

interface VoiceNavigationProviderProps {
  children: ReactNode
  commands: { command: string; callback: () => void; description: string }[]
  welcomeMessage?: string
}

export function VoiceNavigationProvider({ children, commands, welcomeMessage }: VoiceNavigationProviderProps) {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const [lastCommand, setLastCommand] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)

  const { t } = useLanguage()

  // Get the welcome message from translations if not provided
  const defaultWelcomeMessage = welcomeMessage || t("voice.welcome")

  // Add help command to list all available commands
  const allCommands = [
    ...commands,
    {
      command: "voice.help",
      callback: () => {
        const commandList = commands.map((cmd) => t(cmd.command)).join(", ")
        const helpMessage = t("voice.help_message").replace("{commands}", commandList)
        speak(helpMessage)
        setShowTooltip(true)
        setTimeout(() => setShowTooltip(false), 10000) // Hide tooltip after 10 seconds
      },
      description: "voice.desc.help",
    },
    {
      command: "voice.stop_listening",
      callback: () => {
        speak(t("voice.disabled"))
        setIsVoiceEnabled(false)
      },
      description: "voice.desc.stop_listening",
    },
  ]

  const { transcript, isListening, startListening, stopListening, hasRecognitionSupport, availableCommands } =
    useSpeechRecognition({
      commands: allCommands,
      onResult: (result) => {
        if (result) {
          setLastCommand(result)
        }
      },
    })

  const {
    speak,
    stop: stopSpeaking,
    isSpeaking,
    hasSynthesisSupport,
    currentLanguage,
  } = useSpeechSynthesis({
    rate: 0.9, // Slightly slower for better comprehension
  })

  const hasVoiceSupport = hasRecognitionSupport && hasSynthesisSupport

  const toggleVoiceNavigation = () => {
    if (!isVoiceEnabled) {
      setIsVoiceEnabled(true)
      speak(defaultWelcomeMessage)
    } else {
      setIsVoiceEnabled(false)
      stopSpeaking()
      stopListening()
    }
  }

  // Start/stop listening based on voice enabled state
  useEffect(() => {
    if (isVoiceEnabled) {
      startListening()
    } else {
      stopListening()
    }
  }, [isVoiceEnabled, startListening, stopListening])

  return (
    <VoiceNavigationContext.Provider
      value={{
        isVoiceEnabled,
        toggleVoiceNavigation,
        isListening,
        isSpeaking,
        transcript,
        speak,
        stopSpeaking,
        startListening,
        stopListening,
        hasVoiceSupport,
        availableCommands,
        lastCommand,
        currentLanguage,
      }}
    >
      {children}
      {isVoiceEnabled && <VoiceIndicator isListening={isListening} isSpeaking={isSpeaking} transcript={transcript} />}
      {showTooltip && isVoiceEnabled && <VoiceCommandTooltip commands={availableCommands} />}
    </VoiceNavigationContext.Provider>
  )
}

export function useVoiceNavigation() {
  const context = useContext(VoiceNavigationContext)
  if (context === undefined) {
    throw new Error("useVoiceNavigation must be used within a VoiceNavigationProvider")
  }
  return context
}
