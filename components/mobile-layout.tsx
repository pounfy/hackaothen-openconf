"use client"

import type React from "react"
import { useState } from "react"
import { Home, PenToolIcon as Tools, BarChart2, BookOpen, User } from "lucide-react"
import { VoiceToggleButton } from "@/components/voice-navigation/voice-toggle-button"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/hooks/use-language"

interface MobileLayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
  highContrast: boolean
}

export default function MobileLayout({ children, activeTab, onTabChange, highContrast }: MobileLayoutProps) {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const { t } = useLanguage()

  const tabs = [
    { id: "home", label: t("home"), icon: Home },
    { id: "tools", label: t("tools"), icon: Tools },
    { id: "reports", label: t("reports"), icon: BarChart2 },
    { id: "learn", label: t("learn"), icon: BookOpen },
    { id: "profile", label: t("profile"), icon: User },
  ]

  return (
    <div
      className={`flex flex-col min-h-screen ${
        highContrast ? "bg-black text-white" : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}
    >
      {/* Status Bar - Mobile App Style */}
      <div
        className={`h-6 ${
          highContrast ? "bg-gray-900" : "bg-blue-600"
        } flex items-center justify-between px-4 text-white text-xs`}
      >
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
              fill="white"
            />
            <path d="M12 17L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="9" r="1" fill="white" />
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 9L1 15C1 16.1046 1.89543 17 3 17L17 17C18.1046 17 19 16.1046 19 15L19 9C19 7.89543 18.1046 7 17 7L3 7C1.89543 7 1 7.89543 1 9Z"
              stroke="white"
              strokeWidth="2"
            />
            <path d="M19 11H23V13H19V11Z" fill="white" />
            <path
              d="M4 10L4 14M7 10L7 14M10 10L10 14M13 10L13 14M16 10L16 14"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="6" width="16" height="12" rx="2" stroke="white" strokeWidth="2" />
            <path
              d="M20 10L23 8V16L20 14"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M1 8L4 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 16L4 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 6H19C20.1046 6 21 6.89543 21 8V16C21 17.1046 20.1046 18 19 18H5C3.89543 18 3 17.1046 3 16V8C3 6.89543 3.89543 6 5 6Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M3 10L21 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Header with Voice Toggle and Language Selector */}
      <div className={`p-4 ${highContrast ? "bg-gray-900" : "bg-white/80"} backdrop-blur-sm border-b`}>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">AccessiFlow</h1>
          <div className="flex items-center gap-2">
            <LanguageSelector showLabel={false} />
            <VoiceToggleButton />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">{children}</div>

      {/* Bottom Navigation */}
      <div
        className={`fixed bottom-0 left-0 right-0 h-16 ${
          highContrast
            ? "bg-gray-900 border-t border-gray-700"
            : "bg-white/90 backdrop-blur-sm border-t border-gray-200"
        } flex items-center justify-around`}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              className={`flex flex-col items-center justify-center h-full w-full transition-colors ${
                isActive
                  ? highContrast
                    ? "text-white"
                    : "text-blue-600"
                  : highContrast
                    ? "text-gray-400"
                    : "text-gray-500"
              }`}
              onClick={() => onTabChange(tab.id)}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
