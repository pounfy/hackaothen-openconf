"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface VoiceCommandTooltipProps {
  commands: { command: string; description: string }[]
}

export function VoiceCommandTooltip({ commands }: VoiceCommandTooltipProps) {
  const [isVisible, setIsVisible] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    // Auto-hide after 20 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 20000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm">
      <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-xl border-blue-200 dark:border-blue-900">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{t("voice_commands")}</CardTitle>
            <button
              onClick={() => setIsVisible(false)}
              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={t("close")}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {commands.map((cmd, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="font-semibold text-blue-600 dark:text-blue-400">"{cmd.command}"</span>
                <span className="text-gray-600 dark:text-gray-300">- {cmd.description}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
