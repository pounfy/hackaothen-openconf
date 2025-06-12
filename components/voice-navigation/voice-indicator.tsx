"use client"

import { useEffect, useState } from "react"
import { Volume2, Mic } from "lucide-react"

interface VoiceIndicatorProps {
  isListening: boolean
  isSpeaking: boolean
  transcript: string
}

export function VoiceIndicator({ isListening, isSpeaking, transcript }: VoiceIndicatorProps) {
  const [showTranscript, setShowTranscript] = useState(false)
  const [displayedTranscript, setDisplayedTranscript] = useState("")

  // Show transcript briefly when there's new speech
  useEffect(() => {
    if (transcript) {
      setDisplayedTranscript(transcript)
      setShowTranscript(true)

      const timer = setTimeout(() => {
        setShowTranscript(false)
      }, 5000) // Hide after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [transcript])

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end">
      {/* Voice activity indicator */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 shadow-lg mb-2">
        {isSpeaking ? (
          <Volume2 className="w-6 h-6 text-white animate-pulse" />
        ) : (
          <Mic className={`w-6 h-6 text-white ${isListening ? "animate-pulse" : ""}`} />
        )}
      </div>

      {/* Transcript bubble */}
      {showTranscript && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 mb-2 max-w-xs animate-fade-in">
          <p className="text-sm">{displayedTranscript}</p>
        </div>
      )}
    </div>
  )
}
