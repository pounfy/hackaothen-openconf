"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/hooks/use-language"

interface MobileLoginProps {
  onLogin: () => void
}

export default function MobileLogin({ onLogin }: MobileLoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const { t } = useLanguage()

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    onLogin()
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
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

      {/* Language Selector */}
      <div className="absolute top-10 left-4 z-10">
        <LanguageSelector showLabel={false} />
      </div>

      {/* Accessibility Toggle */}
      <div className="absolute top-10 right-4 z-10">
        <div className="flex items-center gap-2 p-2 rounded-lg bg-white/80 backdrop-blur-sm border">
          <Label htmlFor="login-contrast" className="text-sm font-medium">
            {t("high_contrast")}
          </Label>
          <Switch
            id="login-contrast"
            checked={highContrast}
            onCheckedChange={setHighContrast}
            aria-describedby="contrast-description"
          />
          <span id="contrast-description" className="sr-only">
            Toggle high contrast mode for better visibility
          </span>
        </div>
      </div>

      <div className="px-4 py-8">
        {/* App Logo and Title */}
        <div className="flex flex-col items-center mb-8 mt-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <h1 className={`text-2xl font-bold ${highContrast ? "text-white" : "text-gray-900"}`}>AccesLink</h1>
          <p className={`text-sm ${highContrast ? "text-gray-300" : "text-gray-600"}`}>
            Making digital experiences accessible for everyone
          </p>
        </div>

        {/* Login Form */}
        <Card className={`${highContrast ? "bg-gray-900 border-gray-700" : "bg-white/80 backdrop-blur-sm"}`}>
          <CardContent className="p-4 pt-6">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="pt-0 text-center pb-0.5">
                <Label htmlFor="email" className="text-sm font-medium">
                  {t("email_address")}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={!!errors.email}
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-600" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  {t("password")}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 pr-10 ${errors.password ? "border-red-500 focus:border-red-500" : ""}`}
                    aria-describedby={errors.password ? "password-error" : "password-help"}
                    aria-invalid={!!errors.password}
                    autoComplete="current-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <p id="password-error" className="text-sm text-red-600" role="alert">
                    {errors.password}
                  </p>
                )}
                {!errors.password && (
                  <p id="password-help" className="text-xs text-gray-500">
                    Password must be at least 6 characters long
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm">
                    {t("remember_me")}
                  </Label>
                </div>
                <Button variant="link" className="px-0 text-sm">
                  {t("forgot_password")}
                </Button>
              </div>

              <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t("signing_in")}
                  </>
                ) : (
                  <>
                    {t("sign_in")}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className={`text-sm ${highContrast ? "text-gray-300" : "text-gray-600"}`}>
                {t("dont_have_account")}{" "}
                <Button variant="link" className="px-0 text-sm font-medium">
                  {t("sign_up")}
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className={`mt-4 ${highContrast ? "bg-gray-900 border-gray-700" : "bg-blue-50/50 border-blue-200"}`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600 flex-shrink-0 mt-0.5"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <div>
                <h4 className="font-medium text-blue-900 mb-1">{t("demo_account")}</h4>
                <p className="text-sm text-blue-700 mb-2">{t("try_demo_credentials")}</p>
                <div className="text-xs space-y-1 font-mono">
                  <div>Email: demo@accessiflow.com</div>
                  <div>Password: demo123</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
