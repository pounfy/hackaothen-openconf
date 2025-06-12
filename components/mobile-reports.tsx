"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Zap, FileText, BarChart2 } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface MobileReportsProps {
  highContrast: boolean
}

export default function MobileReports({ highContrast }: MobileReportsProps) {
  const { t } = useLanguage()

  return (
    <div className="px-4 py-4 space-y-6">
      <h1 className={`text-xl font-bold ${highContrast ? "text-white" : "text-gray-900"}`}>
        {t("accessibility_reports")}
      </h1>

      <Card className={highContrast ? "bg-gray-900 border-gray-700" : "bg-white/70 backdrop-blur-sm"}>
        <CardHeader>
          <CardTitle className="text-base">{t("generate_report")}</CardTitle>
          <CardDescription>{t("comprehensive_audit")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-base font-semibold mb-2">{t("start_first_audit")}</h3>
            <p className={`${highContrast ? "text-gray-300" : "text-gray-600"} text-sm mb-4`}>{t("identify_issues")}</p>
            <Button className="gap-2">
              <Zap className="w-4 h-4" />
              {t("start_audit")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <h2 className={`text-lg font-semibold ${highContrast ? "text-white" : "text-gray-900"}`}>
        {t("recent_reports")}
      </h2>

      <div className="space-y-3">
        {[
          { title: t("homepage_audit"), date: "May 15, 2023", score: 87, icon: FileText },
          { title: t("login_page_audit"), date: "May 10, 2023", score: 92, icon: FileText },
          { title: t("monthly_summary"), date: "May 1, 2023", score: 84, icon: BarChart2 },
        ].map((report, index) => (
          <Card
            key={index}
            className={`${highContrast ? "bg-gray-900 border-gray-700" : "bg-white/70 backdrop-blur-sm"}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <report.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{report.title}</h3>
                  <p className={`text-xs ${highContrast ? "text-gray-300" : "text-gray-600"}`}>{report.date}</p>
                </div>
                <div className={`text-sm font-semibold ${report.score >= 90 ? "text-green-600" : "text-yellow-600"}`}>
                  {report.score}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
