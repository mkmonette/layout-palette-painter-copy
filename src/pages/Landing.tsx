"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Palette,
  Zap,
  Eye,
  Crown,
  Star,
  ArrowRight,
  Check,
  Sparkles,
  Target,
  Clock,
  PlayCircle,
  Download,
  Share2,
  Wand2,
  Layers,
  Heart,
  TrendingUp,
  MessageCircle,
  Send,
  Menu,
  X,
} from "lucide-react"

// Floating Color Palette Component
const FloatingPalette = ({
  colors,
  className = "",
  delay = 0,
}: {
  colors: string[]
  className?: string
  delay?: number
}) => (
  <div className={`floating-palette animate-float ${className}`} style={{ animationDelay: `${delay}s` }}>
    <div className="flex space-x-1 p-3 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300">
      {colors.map((color, i) => (
        <div
          key={i}
          className="w-8 h-8 rounded-xl shadow-lg hover:scale-110 transition-transform duration-200"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  </div>
)

// Animated Counter Component
const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number
  duration?: number
  suffix?: string
}) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, duration])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Scroll reveal hook
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )
    const elements = document.querySelectorAll(".scroll-reveal")
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function Landing() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useScrollReveal()

  const vibrantPalettes = [
    ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
    ["#FECA57", "#FF9FF3", "#54A0FF", "#5F27CD"],
    ["#00D2D3", "#FF9F43", "#EE5A24", "#0984E3"],
    ["#A29BFE", "#FD79A8", "#FDCB6E", "#6C5CE7"],
    ["#74B9FF", "#00B894", "#FDCB6E", "#E17055"],
  ]

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ name, email, message })
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50" />
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-100/20 via-transparent to-purple-100/20 animate-pulse" />

      {/* Floating Palettes */}
      {vibrantPalettes.map((palette, i) => (
        <FloatingPalette
          key={i}
          colors={palette}
          delay={i * 0.5}
          className={`absolute z-10 ${
            i === 0
              ? "top-20 right-10 lg:right-20"
              : i === 1
                ? "top-1/3 left-5 lg:left-10"
                : i === 2
                  ? "bottom-1/3 right-5 lg:right-1/3"
                  : i === 3
                    ? "top-2/3 left-1/4"
                    : "bottom-20 left-1/2"
          } hidden lg:block`}
        />
      ))}

      {/* Navigation */}
      <nav className="relative z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-3 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-2xl shadow-lg group-hover:scale-105 transition-transform">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Palette Painter
                </h1>
                <p className="text-xs text-gray-600">AI Color Generator</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                How it Works
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Pricing
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Reviews
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" className="hidden sm:flex border-purple-200 hover:bg-purple-50 bg-transparent">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all">
                <Sparkles className="h-4 w-4 mr-2" />
                Get Started
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/20">
              <div className="flex flex-col space-y-3 pt-4">
                <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                  How it Works
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                  Pricing
                </a>
                <a href="#testimonials" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                  Reviews
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center scroll-reveal">
            <Badge className="mb-8 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 hover:from-purple-200 hover:to-pink-200 text-sm px-6 py-3 rounded-full shadow-lg">
              <Crown className="h-4 w-4 mr-2" />
              AI-Powered Color Generation
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Create{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                Perfect Colors
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Instantly
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              Transform your designs with AI-generated color palettes. Choose from professional templates, customize
              every shade, and see live previews in real-time. Perfect for designers, developers, and brands.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-10 py-6 shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 rounded-2xl"
              >
                <Zap className="h-5 w-5 mr-2" />
                Start Creating Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300 rounded-2xl hover:scale-105 transition-all duration-300 bg-transparent"
              >
                <PlayCircle className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { number: 50000, suffix: "+", label: "Happy Designers" },
                { number: 100, suffix: "+", label: "AI Templates" },
                { number: 1000000, suffix: "+", label: "Palettes Generated" },
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  </div>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Preview Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="scroll-reveal">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                See It in{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Action
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Watch as our AI creates stunning color combinations in real-time
              </p>
            </div>

            <Card className="p-8 md:p-12 bg-white/60 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Interactive Color Generator</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-gray-600">AI analyzing color harmony...</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                      <span className="text-gray-600">Generating accessible combinations...</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                      <span className="text-gray-600">Optimizing for your brand...</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {vibrantPalettes.slice(0, 3).map((palette, i) => (
                    <div key={i} className="flex space-x-2 animate-fade-in" style={{ animationDelay: `${i * 0.2}s` }}>
                      {palette.map((color, j) => (
                        <div
                          key={j}
                          className="flex-1 h-16 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50/50 to-pink-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stop Struggling with{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Color Choices
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We solve the most common design challenges that keep you stuck
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: "Poor Color Harmony",
                description: "No more clashing colors or unbalanced palettes",
                color: "from-red-500 to-pink-500",
              },
              {
                icon: Eye,
                title: "Accessibility Issues",
                description: "Ensure perfect contrast ratios for all users",
                color: "from-blue-500 to-purple-500",
              },
              {
                icon: Clock,
                title: "Time Wasted",
                description: "Stop spending hours tweaking colors manually",
                color: "from-green-500 to-teal-500",
              },
              {
                icon: Sparkles,
                title: "Lack of Inspiration",
                description: "Get fresh, trending color combinations instantly",
                color: "from-purple-500 to-indigo-500",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="p-6 hover:scale-105 transition-all duration-300 scroll-reveal border-0 bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl group"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How It{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create stunning color palettes in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                icon: Wand2,
                title: "Choose Your Style",
                description: "Select from 100+ professional templates or describe your vision to our AI",
                color: "from-purple-500 to-pink-500",
              },
              {
                step: "02",
                icon: Palette,
                title: "Generate Instantly",
                description: "Our AI creates perfect color harmonies with accessibility built-in",
                color: "from-pink-500 to-blue-500",
              },
              {
                step: "03",
                icon: Download,
                title: "Export & Use",
                description: "Download in any format, copy hex codes, or integrate with your design tools",
                color: "from-blue-500 to-purple-500",
              },
            ].map((item, i) => (
              <div key={i} className="text-center scroll-reveal group">
                <div className="relative mb-8">
                  <div
                    className={`w-24 h-24 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-all duration-300`}
                  >
                    <item.icon className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-l from-blue-50/50 to-purple-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Powerful{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to create, customize, and implement perfect color palettes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "AI Generation",
                description: "Advanced AI creates harmonious color combinations based on color theory principles",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Eye,
                title: "Accessibility Checker",
                description: "Built-in WCAG compliance ensures your colors work for everyone",
                color: "from-blue-500 to-purple-500",
              },
              {
                icon: Layers,
                title: "100+ Templates",
                description: "Professional templates for every industry and design style",
                color: "from-green-500 to-blue-500",
              },
              {
                icon: Download,
                title: "Multiple Export Formats",
                description: "CSS, Sass, Adobe Swatch, Sketch, Figma, and more",
                color: "from-pink-500 to-red-500",
              },
              {
                icon: Share2,
                title: "Team Collaboration",
                description: "Share palettes with your team and collect feedback instantly",
                color: "from-indigo-500 to-purple-500",
              },
              {
                icon: TrendingUp,
                title: "Trending Colors",
                description: "Stay updated with the latest color trends and popular combinations",
                color: "from-orange-500 to-pink-500",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="p-8 hover:scale-105 transition-all duration-300 scroll-reveal group border-0 bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Simple{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Start free, upgrade when you need more power</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="p-8 hover:scale-105 transition-all duration-300 scroll-reveal border-2 border-gray-200 bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Free</h3>
                <div className="text-5xl font-bold mb-4">
                  $0<span className="text-lg text-gray-500">/month</span>
                </div>
                <p className="text-gray-600">Perfect for getting started</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "10 AI-generated palettes/month",
                  "Basic templates",
                  "Standard export formats",
                  "Community support",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full py-4 rounded-2xl bg-transparent" variant="outline">
                Get Started Free
              </Button>
            </Card>

            {/* Pro Plan */}
            <Card className="p-8 hover:scale-105 transition-all duration-300 scroll-reveal border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden shadow-2xl rounded-3xl">
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-bl-2xl shadow-lg">
                <span className="text-sm font-bold">Most Popular</span>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Pro</h3>
                <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  $9<span className="text-lg text-gray-500">/month</span>
                </div>
                <p className="text-gray-600">For professional designers</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited AI generations",
                  "100+ premium templates",
                  "Advanced export formats",
                  "Team collaboration",
                  "Priority support",
                  "Custom brand palettes",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-4 rounded-2xl shadow-lg">
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Pro
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-r from-purple-50/50 to-pink-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Loved by{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Thousands
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See what our users are saying about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "UI/UX Designer",
                company: "TechCorp",
                avatar: "/placeholder.svg?height=60&width=60",
                rating: 5,
                text: "This tool has revolutionized my design workflow. I can create perfect color palettes in minutes instead of hours.",
              },
              {
                name: "Marcus Rivera",
                role: "Brand Strategist",
                company: "Creative Studio",
                avatar: "/placeholder.svg?height=60&width=60",
                rating: 5,
                text: "The AI understands color psychology better than most humans. It's become essential for all our brand projects.",
              },
              {
                name: "Emily Watson",
                role: "Frontend Developer",
                company: "StartupXYZ",
                avatar: "/placeholder.svg?height=60&width=60",
                rating: 5,
                text: "Finally, a tool that generates accessible color schemes by default. The code export feature is a game-changer.",
              },
            ].map((testimonial, i) => (
              <Card
                key={i}
                className="p-8 hover:scale-105 transition-all duration-300 scroll-reveal border-0 bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full mr-4 shadow-lg"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Create Amazing Colors?</h2>
            <p className="text-lg md:text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of designers and developers who are already creating stunning palettes with our AI
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-10 py-6 shadow-2xl hover:scale-105 transition-all duration-300 rounded-2xl"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Start Creating for Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-10 py-6 rounded-2xl hover:scale-105 transition-all duration-300 bg-transparent"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500" />

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Palette Painter</h3>
                  <p className="text-sm text-gray-400">AI Color Generator</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Create perfect color palettes with AI. Trusted by designers, developers, and brands worldwide.
              </p>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer group">
                  <Heart className="h-5 w-5 group-hover:text-pink-400 transition-colors" />
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer group">
                  <Share2 className="h-5 w-5 group-hover:text-blue-400 transition-colors" />
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer group">
                  <MessageCircle className="h-5 w-5 group-hover:text-green-400 transition-colors" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-6 text-lg">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    How it Works
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    Reviews
                  </a>
                </li>
              </ul>

              <h4 className="font-bold mb-4 text-lg mt-8">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Form */}
            <div>
              <h4 className="font-bold mb-6 text-lg">Get in Touch</h4>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl focus:bg-white/20 transition-colors"
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl focus:bg-white/20 transition-colors"
                />
                <Textarea
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-24 rounded-xl focus:bg-white/20 transition-colors resize-none"
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl py-3 font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>

              {/* Newsletter Signup */}
              <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                <h5 className="font-semibold mb-2">Stay Updated</h5>
                <p className="text-sm text-gray-400 mb-3">Get the latest color trends and tips</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-lg text-sm"
                  />
                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg px-4">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">© 2024 Palette Painter. All rights reserved.</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                <span>for designers</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
              <a href="#" className="hover:text-white transition-colors">
                API Docs
              </a>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
