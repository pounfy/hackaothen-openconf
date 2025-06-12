"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, Type, Volume2, Keyboard } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface MobileToolsProps {
  highContrast: boolean
}

export default function MobileTools({ highContrast }: MobileToolsProps) {
  const { t } = useLanguage()

  const quickActions = [
    {
      icon: Palette,
      label: t("color_contrast_checker"),
      description: t("test_color_combinations"),
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: Type,
      label: t("text_size_adjuster"),
      description: t("optimize_text_readability"),
      color: "from-green-500 to-green-700",
    },
    {
      icon: Volume2,
      label: t("screen_reader_test"),
      description: t("verify_content_screen_readers"),
      color: "from-purple-500 to-purple-700",
    },
    {
      icon: Keyboard,
      label: t("keyboard_navigation_test"),
      description: t("test_keyboard_interaction"),
      color: "from-orange-500 to-orange-700",
    },
  ]

  return (
    <div className="px-4 py-4 space-y-4">
      <h1 className={`text-xl font-bold ${highContrast ? "text-white" : "text-gray-900"}`}>
        {t("accessibility_tools")}
      </h1>

      <div className="space-y-4">
        {quickActions.map((action, index) => (
          <Card
            key={index}
            className={`${highContrast ? "bg-gray-900 border-gray-700" : "bg-white/70 backdrop-blur-sm"}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center`}
                >
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{action.label}</h3>
                  <p className={`text-xs ${highContrast ? "text-gray-300" : "text-gray-600"}`}>{action.description}</p>
                </div>
              </div>
              <Button className="w-full mt-3" size="sm">
                {t("open_tool")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
