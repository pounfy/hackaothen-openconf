"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

interface MobileLearnProps {
  highContrast: boolean
}

export default function MobileLearn({ highContrast }: MobileLearnProps) {
  const { t } = useLanguage()

  const lessons = [
    {
      title: t("wcag_guidelines"),
      description: t("learn_web_guidelines"),
      level: t("beginner"),
      duration: "10 " + t("min"),
    },
    {
      title: t("screen_reader_testing"),
      description: t("test_assistive_technologies"),
      level: t("intermediate"),
      duration: "15 " + t("min"),
    },
    {
      title: t("color_contrast"),
      description: t("understanding_color_requirements"),
      level: t("beginner"),
      duration: "8 " + t("min"),
    },
    {
      title: t("keyboard_navigation_impl"),
      description: t("implementing_keyboard_controls"),
      level: t("advanced"),
      duration: "20 " + t("min"),
    },
    {
      title: t("aria_labels"),
      description: t("using_aria_effectively"),
      level: t("intermediate"),
      duration: "12 " + t("min"),
    },
    {
      title: t("focus_management"),
      description: t("managing_focus_better_ux"),
      level: t("advanced"),
      duration: "18 " + t("min"),
    },
  ]

  return (
    <div className="px-4 py-4 space-y-6">
      <h1 className={`text-xl font-bold ${highContrast ? "text-white" : "text-gray-900"}`}>
        {t("learn_accessibility")}
      </h1>

      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <Card
            key={index}
            className={`${highContrast ? "bg-gray-900 border-gray-700" : "bg-white/70 backdrop-blur-sm"}`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{lesson.title}</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {lesson.level}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className={`text-xs ${highContrast ? "text-gray-300" : "text-gray-600"} mb-3`}>{lesson.description}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${highContrast ? "text-gray-400" : "text-gray-500"}`}>{lesson.duration}</span>
                <Button variant="ghost" size="sm" className="h-8">
                  {t("start_learning")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
