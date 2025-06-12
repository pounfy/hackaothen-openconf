"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useLanguage } from "./use-language"

interface UseSpeechSynthesisProps {
  onStart?: () => void
  onEnd?: () => void
  onError?: (error: string) => void
  rate?: number
  pitch?: number
  volume?: number
}

interface SpeechSynthesisResult {
  speak: (text: string) => void
  stop: () => void
  isSpeaking: boolean
  hasSynthesisSupport: boolean
  setRate: (rate: number) => void
  setPitch: (pitch: number) => void
  setVolume: (volume: number) => void
  voices: SpeechSynthesisVoice[]
  setVoice: (voice: SpeechSynthesisVoice) => void
  currentVoice: SpeechSynthesisVoice | null
  currentLanguage: string
}

export function useSpeechSynthesis({
  onStart,
  onEnd,
  onError,
  rate = 1,
  pitch = 1,
  volume = 1,
}: UseSpeechSynthesisProps = {}): SpeechSynthesisResult {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [hasSynthesisSupport, setHasSynthesisSupport] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null)

  const { currentLanguage } = useLanguage()
  const rateRef = useRef(rate)
  const pitchRef = useRef(pitch)
  const volumeRef = useRef(volume)
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null)

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setHasSynthesisSupport(true)

      // Get available voices
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices()
        if (availableVoices.length > 0) {
          setVoices(availableVoices)

          // Find the best voice for the current language
          const findBestVoice = () => {
            // Try to find a voice that matches the current language
            const languageVoices = availableVoices.filter(
              (voice) =>
                voice.lang.startsWith(currentLanguage.code) || voice.lang.startsWith(currentLanguage.speechCode),
            )

            if (languageVoices.length > 0) {
              // Prefer female voices, then any voice for the language
              const femaleVoice = languageVoices.find(
                (voice) => voice.name.toLowerCase().includes("female") || voice.name.toLowerCase().includes("woman"),
              )
              return femaleVoice || languageVoices[0]
            }

            // Fallback to English if available
            const englishVoice = availableVoices.find((voice) => voice.lang.startsWith("en"))
            return englishVoice || availableVoices[0]
          }

          const bestVoice = findBestVoice()
          setCurrentVoice(bestVoice)
          voiceRef.current = bestVoice
        }
      }

      loadVoices()

      // Chrome loads voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices
      }
    }
  }, [currentLanguage])

  const speak = useCallback(
    (text: string) => {
      if (!hasSynthesisSupport) return

      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)

      utterance.rate = rateRef.current
      utterance.pitch = pitchRef.current
      utterance.volume = volumeRef.current

      // Set the language for the utterance
      utterance.lang = currentLanguage.speechCode

      if (voiceRef.current) {
        utterance.voice = voiceRef.current
      }

      utterance.onstart = () => {
        setIsSpeaking(true)
        if (onStart) onStart()
      }

      utterance.onend = () => {
        setIsSpeaking(false)
        if (onEnd) onEnd()
      }

      utterance.onerror = (event) => {
        if (onError) onError(event.error)
        console.error("Speech synthesis error:", event)
      }

      window.speechSynthesis.speak(utterance)
    },
    [hasSynthesisSupport, onStart, onEnd, onError, currentLanguage],
  )

  const stop = useCallback(() => {
    if (hasSynthesisSupport) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }, [hasSynthesisSupport])

  const setRate = useCallback((newRate: number) => {
    rateRef.current = newRate
  }, [])

  const setPitch = useCallback((newPitch: number) => {
    pitchRef.current = newPitch
  }, [])

  const setVolume = useCallback((newVolume: number) => {
    volumeRef.current = newVolume
  }, [])

  const setVoice = useCallback((voice: SpeechSynthesisVoice) => {
    voiceRef.current = voice
    setCurrentVoice(voice)
  }, [])

  return {
    speak,
    stop,
    isSpeaking,
    hasSynthesisSupport,
    setRate,
    setPitch,
    setVolume,
    voices,
    setVoice,
    currentVoice,
    currentLanguage: currentLanguage.speechCode,
  }
}
