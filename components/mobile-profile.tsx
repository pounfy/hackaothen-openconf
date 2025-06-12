"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { User, Settings, Bell, Shield, LogOut, ChevronRight, Play } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface MobileProfileProps {
  highContrast: boolean
  onLogout: () => void
  onRestartOnboarding: () => void
}

export default function MobileProfile({ highContrast, onLogout, onRestartOnboarding }: MobileProfileProps) {
  const { t } = useLanguage()

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className={`text-xl font-bold ${highContrast ? "text-white" : "text-gray-900"}`}>Alex Johnson</h1>
          <p className={`text-sm ${highContrast ? "text-gray-300" : "text-gray-600"}`}>alex@example.com</p>
          <Badge className="mt-1">{t("pro_plan")}</Badge>
        </div>
      </div>

      {/* Accessibility Settings */}
      <Card className={`${highContrast ? "bg-gray-900 border-gray-700" : "bg-white/70 backdrop-blur-sm"}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Settings className="w-4 h-4 text-blue-600" />
            {t("accessibility_settings")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="high-contrast-profile" className="text-sm font-medium">
              {t("high_contrast_mode")}
            </label>
            <Switch id="high-contrast-profile" checked={highContrast} />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="screen-reader-profile" className="text-sm font-medium">
              {t("screen_reader_compatibility")}
            </label>
            <Switch id="screen-reader-profile" checked={true} />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="motion-profile" className="text-sm font-medium">
              {t("reduced_motion")}
            </label>
            <Switch id="motion-profile" checked={false} />
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card className={`${highContrast ? "bg-gray-900 border-gray-700" : "bg-white/70 backdrop-blur-sm"}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{t("account_settings")}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200">
            {[
              { icon: User, label: t("personal_information") },
              { icon: Bell, label: t("notifications") },
              { icon: Shield, label: t("privacy_security") },
              { icon: Play, label: t("restart_tutorial"), action: onRestartOnboarding },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                onClick={item.action}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Logout Button */}
      <Button variant="outline" className="w-full gap-2" onClick={onLogout}>
        <LogOut className="w-4 h-4" />
        {t("sign_out")}
      </Button>

      {/* App Version */}
      <div className="text-center">
        <p className={`text-xs ${highContrast ? "text-gray-400" : "text-gray-500"}`}>AccessiFlow v1.0.2</p>
      </div>
    </div>
  )
}
