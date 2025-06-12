"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Eye, Ear, Hand, Brain, CheckCircle, AlertCircle, Info, Zap, Settings } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface MobileHomeProps {
  highContrast: boolean
  fontSize: number[]
  setFontSize: (value: number[]) => void
  reducedMotion: boolean
  setReducedMotion: (value: boolean) => void
  screenReader: boolean
  setScreenReader: (value: boolean) => void
}

export default function MobileHome({
  highContrast,
  fontSize,
  setFontSize,
  reducedMotion,
  setReducedMotion,
  screenReader,
  setScreenReader,
}: MobileHomeProps) {
  const { t } = useLanguage()

  const accessibilityFeatures = [
    {
      icon: Eye,
      title: t("visual_accessibility"),
      description: t("high_contrast") + ", " + t("large_text"),
      status: "active",
      color: "bg-blue-500",
    },
    {
      icon: Ear,
      title: t("auditory_accessibility"),
      description: t("screen_reader_support"),
      status: "active",
      color: "bg-green-500",
    },
    {
      icon: Hand,
      title: t("motor_accessibility"),
      description: t("touch_targets"),
      status: "partial",
      color: "bg-yellow-500",
    },
    {
      icon: Brain,
      title: t("cognitive_accessibility"),
      description: t("simple_navigation"),
      status: "active",
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-xl font-bold ${highContrast ? "text-white" : "text-gray-900"}`}>
            {t("welcome_back_home")}
          </h1>
          <p className={`text-sm ${highContrast ? "text-gray-300" : "text-gray-600"}`}>
            {t("accessibility_dashboard")}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <Settings className="w-5 h-5" />
        </div>
      </div>

      {/* Quick Settings */}
      <Card className={`${highContrast ? "bg-gray-900 border-gray-700" : "bg-white/70 backdrop-blur-sm"}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-600" />
            {t("quick_accessibility_settings")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="font-size" className="text-sm font-medium flex justify-between">
              <span>{t("font_size")}</span>
              <span>{fontSize[0]}px</span>
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
            <label htmlFor="reduced-motion" className="text-sm font-medium">
              {t("reduced_motion")}
            </label>
            <Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={setReducedMotion} />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="screen-reader" className="text-sm font-medium">
              {t("screen_reader_mode")}
            </label>
            <Switch id="screen-reader" checked={screenReader} onCheckedChange={setScreenReader} />
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Features */}
      <div className="grid grid-cols-2 gap-3">
        {accessibilityFeatures.map((feature, index) => (
          <Card
            key={index}
            className={`relative overflow-hidden ${
              highContrast ? "bg-gray-900 border-gray-700" : "bg-white/70 backdrop-blur-sm"
            }`}
          >
            <div className={`absolute top-0 left-0 w-full h-1 ${feature.color}`} />
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <feature.icon
                  className={`w-5 h-5 ${
                    feature.status === "active"
                      ? "text-green-600"
                      : feature.status === "partial"
                        ? "text-yellow-600"
                        : "text-gray-400"
                  }`}
                />
                <Badge
                  variant={
                    feature.status === "active" ? "default" : feature.status === "partial" ? "secondary" : "outline"
                  }
                  className="text-xs"
                >
                  {feature.status === "active"
                    ? t("active")
                    : feature.status === "partial"
                      ? t("partial")
                      : t("inactive")}
                </Badge>
              </div>
              <h3 className="font-semibold text-sm">{feature.title}</h3>
              <p className={`text-xs ${highContrast ? "text-gray-300" : "text-gray-600"}`}>{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Accessibility Score */}
      <Card className={highContrast ? "bg-gray-900 border-gray-700" : "bg-white/70 backdrop-blur-sm"}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            {t("accessibility_score")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-green-600">87%</span>
            <Badge variant="secondary">WCAG 2.1 AA</Badge>
          </div>
          <Progress value={87} className="h-2" />
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span>24 {t("checks_passed")}</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-yellow-600" />
              <span>3 {t("warnings")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Info className="w-3 h-3 text-blue-600" />
              <span>2 {t("recommendations")}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
