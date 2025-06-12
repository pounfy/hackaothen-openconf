"use client"

import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import { useVoiceNavigation } from "./voice-navigation-provider"
import { useLanguage } from "@/hooks/use-language"

interface VoiceToggleButtonProps {
  className?: string
}

export function VoiceToggleButton({ className = "" }: VoiceToggleButtonProps) {
  const { isVoiceEnabled, toggleVoiceNavigation, hasVoiceSupport } = useVoiceNavigation()
  const { t } = useLanguage()

  if (!hasVoiceSupport) {
    return null
  }

  return (
    <Button
      variant={isVoiceEnabled ? "default" : "outline"}
      size="sm"
      className={`gap-2 ${className}`}
      onClick={toggleVoiceNavigation}
      aria-pressed={isVoiceEnabled}
      aria-label={isVoiceEnabled ? t("disable_voice_navigation") : t("enable_voice_navigation")}
    >
      {isVoiceEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
      {isVoiceEnabled ? t("voice_on") : t("voice_off")}
    </Button>
  )
}
