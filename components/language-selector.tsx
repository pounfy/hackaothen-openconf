import { useState } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Check, X } from "lucide-react"
import { useLanguage, type Language } from "@/hooks/use-language"

export function LanguageSelector({ className = "", showLabel = true }) {
  const [isOpen, setIsOpen] = useState(false)
  const { currentLanguage, setLanguage, supportedLanguages, t } = useLanguage()

  const handleLanguageSelect = (language) => {
    setLanguage(language)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="sm"
        className={`gap-2 relative z-50 ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t("select_language")}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4" />
        <span className="flex items-center gap-1">
          <span>{currentLanguage.flag}</span>
          {showLabel && <span>{currentLanguage.code.toUpperCase()}</span>}
        </span>
      </Button>

      {isOpen &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[1000000] bg-black/30 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <div className="fixed inset-0 flex items-center justify-center z-[1000001]">
              <Card
                className="w-full max-w-md max-h-[90vh] bg-white dark:bg-gray-900 shadow-2xl border-2"
                style={{ margin: "auto" }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      {t("select_language")}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-6 h-6 p-0"
                      onClick={() => setIsOpen(false)}
                      aria-label={t("close")}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-5">
                  <div
                    className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto"
                    role="listbox"
                    aria-label={t("select_language")}
                  >
                    {supportedLanguages.map((language) => {
                      const isSelected = language.code === currentLanguage.code
                      return (
                        <button
                          key={language.code}
                          className={`flex items-center justify-between p-3 rounded-lg border transition-colors text-left ${
                            isSelected
                              ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
                              : "bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                          }`}
                          onClick={() => handleLanguageSelect(language)}
                          role="option"
                          aria-selected={isSelected}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{language.flag}</span>
                            <div>
                              <div className="font-medium">{language.nativeName}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{language.name}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {language.code.toUpperCase()}
                            </Badge>
                            {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>,
          document.body
        )
      }
    </div>
  )
}
