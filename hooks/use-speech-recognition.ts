"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useLanguage } from "./use-language"

interface UseSpeechRecognitionProps {
  commands: { command: string; callback: () => void; description: string }[]
  onListening?: (isListening: boolean) => void
  onResult?: (transcript: string) => void
  onError?: (error: string) => void
}

interface SpeechRecognitionResult {
  transcript: string
  isListening: boolean
  startListening: () => void
  stopListening: () => void
  hasRecognitionSupport: boolean
  availableCommands: { command: string; description: string }[]
  currentLanguage: string
}

export function useSpeechRecognition({
  commands,
  onListening,
  onResult,
  onError,
}: UseSpeechRecognitionProps): SpeechRecognitionResult {
  const [transcript, setTranscript] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [hasRecognitionSupport, setHasRecognitionSupport] = useState(false)

  const { currentLanguage, t } = useLanguage()
  const recognitionRef = useRef<any>(null)

  // Initialize speech recognition with current language
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check for browser support
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

      if (SpeechRecognition) {
        setHasRecognitionSupport(true)
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = currentLanguage.speechCode

        recognitionRef.current.onstart = () => {
          setIsListening(true)
          if (onListening) onListening(true)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
          if (onListening) onListening(false)
        }

        recognitionRef.current.onerror = (event: any) => {
          if (onError) onError(event.error)
          console.error("Speech recognition error:", event.error)
        }

        recognitionRef.current.onresult = (event: any) => {
          const current = event.resultIndex
          const result = event.results[current][0].transcript.trim().toLowerCase()

          setTranscript(result)
          if (onResult) onResult(result)

          // Check if the transcript matches any commands
          commands.forEach(({ command, callback }) => {
            // Get the translated command for the current language
            const translatedCommand = t(command).toLowerCase()
            if (result.includes(translatedCommand)) {
              callback()
            }
          })
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [commands, onListening, onResult, onError, currentLanguage, t])

  // Update language when it changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = currentLanguage.speechCode
    }
  }, [currentLanguage])

  const startListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start()
      } catch (error) {
        // If already started, stop and restart
        recognitionRef.current.stop()
        setTimeout(() => {
          recognitionRef.current.start()
        }, 100)
      }
    }
  }, [])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }, [])

  // Extract just the command and description for the available commands list
  const availableCommands = commands.map(({ command, description }) => ({
    command: t(command),
    description: t(description),
  }))

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
    availableCommands,
    currentLanguage: currentLanguage.speechCode,
  }
}
