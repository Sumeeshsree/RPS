import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  CheckCircle2, ArrowRight, ShieldCheck, Zap,
  BarChart3, Users, Building, Laptop, PieChart,
  Timer, Sparkles, LayoutGrid, Smartphone, ChevronRight,
  Play, Lock, Globe
} from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-foreground selection:bg-primary selection:text-white overflow-x-hidden">

      {/* Navbar - Floating Glass Pill */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <div className="bg-background/60 backdrop-blur-xl border border-white/5 rounded-full px-6 h-14 flex items-center justify-between w-full max-w-5xl shadow-2xl shadow-black/40 supports-[backdrop-filter]:bg-background/20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_25px_rgba(124,58,237,0.8)] transition-all duration-300">
              <Building className="h-4 w-4 text-white fill-current" />
            </div>
            <span className="text-sm font-bold tracking-tight text-white group-hover:text-primary transition-colors">RPS SYSTEM</span>
          </Link>

          <nav className="hidden md:flex gap-8 text-[13px] font-medium text-muted-foreground/80">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#services" className="hover:text-white transition-colors">Services</Link>
            <Link href="#security" className="hover:text-white transition-colors">Security</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button size="sm" className="h-9 px-5 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-full shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-32 lg:pt-40">

        {/* Hero Section */}
        <section className="relative flex flex-col items-center text-center px-4 max-w-6xl mx-auto">
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse-slow pointer-events-none"></div>

          {/* Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] font-medium text-primary-foreground/80 mb-8 hover:bg-white/10 transition-colors cursor-pointer animate-fade-in-up">
            <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded text-[10px] font-bold">NEW</span>
            <span>RPS Tax System 2.0 is live</span>
            <ChevronRight className="h-3 w-3 opacity-50" />
          </div>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-8 max-w-5xl leading-[0.95] drop-shadow-2xl">
            Tax Management <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50">for the 1%.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Automate your compliance, visualize your wealth, and secure your legacy.
            The operating system for modern tax professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm sm:max-w-none z-10">
            <Link href="#contact">
              <Button size="lg" className="h-12 px-8 text-sm font-semibold bg-white text-black hover:bg-white/90 rounded-full w-full sm:w-auto transition-transform hover:scale-105 active:scale-95 duration-200">
                Start for free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-12 px-8 text-sm font-semibold border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full w-full sm:w-auto backdrop-blur-sm transition-all group">
              <Play className="h-3 w-3 mr-2 fill-current opacity-70 group-hover:opacity-100" /> Watch Demo
            </Button>
          </div>

          {/* Dashboard Abstract VISUAL */}
          <div className="mt-24 relative w-full h-[300px] md:h-[600px] perspective-[2000px]">
            {/* Main Interface Plate */}
            <div className="absolute inset-x-4 md:inset-x-12 top-0 bottom-0 bg-[#09090b]/80 border border-white/10 rounded-t-[32px] md:rounded-t-[48px] backdrop-blur-md shadow-2xl shadow-primary/10 rotate-x-12 transform-gpu overflow-hidden">
              {/* Header Bar */}
              <div className="h-14 border-b border-white/5 flex items-center px-6 gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
              </div>
              {/* Grid Grid */}
              <div className="p-8 grid grid-cols-12 gap-6 h-full opacity-60">
                <div className="col-span-3 space-y-4">
                  <div className="h-[200px] bg-white/5 rounded-2xl border border-white/5 animate-pulse"></div>
                  <div className="h-[200px] bg-white/5 rounded-2xl border border-white/5"></div>
                </div>
                <div className="col-span-6 space-y-4">
                  <div className="h-[100px] bg-primary/10 rounded-2xl border border-primary/20"></div>
                  <div className="h-[300px] bg-white/5 rounded-2xl border border-white/5"></div>
                </div>
                <div className="col-span-3">
                  <div className="h-full bg-white/5 rounded-2xl border border-white/5"></div>
                </div>
              </div>
              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Logo Marquee */}
        <section className="py-10 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto px-4 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10"></div>
            <div className="flex gap-16 animate-marquee whitespace-nowrap opacity-40">
              {['ACME Corp', 'Stark Ind', 'Wayne Ent', 'Cyberdyne', 'Umbrella', 'Massive', 'Hooli', 'Initech'].map((logo) => (
                <div key={logo} className="text-xl font-bold uppercase tracking-widest">{logo}</div>
              ))}
              {['ACME Corp', 'Stark Ind', 'Wayne Ent', 'Cyberdyne', 'Umbrella', 'Massive', 'Hooli', 'Initech'].map((logo) => (
                <div key={logo} className="text-xl font-bold uppercase tracking-widest">{logo}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section id="features" className="py-32 bg-background relative">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-24">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Everything included.</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Packed with features to help you maximize efficiency and minimize headaches.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
              {/* Feature 1 - Large Left */}
              <div className="md:col-span-2 md:row-span-2 rounded-[32px] bg-secondary/30 border border-white/5 p-8 relative group overflow-hidden hover:bg-secondary/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                      <Zap className="h-6 w-6 stroke-[3px]" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">Lightning Fast Filing</h3>
                    <p className="text-muted-foreground text-lg max-w-sm">Use our AI-assisted drag & drop interface to file GST reforms 10x faster than traditional portals.</p>
                  </div>
                  {/* Abstract UI representation */}
                  <div className="mt-8 h-48 w-full bg-[#09090b] rounded-xl border border-white/10 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-4 left-4 right-4 h-2 bg-white/10 rounded-full"></div>
                    <div className="absolute top-10 left-4 w-1/3 h-2 bg-white/5 rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-3/4 h-32 bg-primary/10 rounded-tl-2xl border-t border-l border-primary/20"></div>
                  </div>
                </div>
              </div>

              {/* Feature 2 - Top Right */}
              <div className="rounded-[32px] bg-secondary/30 border border-white/5 p-8 relative group hover:bg-secondary/50 transition-colors">
                <ShieldCheck className="h-10 w-10 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Audit Proof</h3>
                <p className="text-sm text-muted-foreground">Every entry is immutable and logged for 7 years.</p>
              </div>

              {/* Feature 3 - Bottom Right */}
              <div className="rounded-[32px] bg-secondary/30 border border-white/5 p-8 relative group hover:bg-secondary/50 transition-colors">
                <Globe className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Access Anywhere</h3>
                <p className="text-sm text-muted-foreground">Cloud-native architecture means you work from anywhere.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Alternating Feature Sections */}
        <section className="py-24 space-y-32">
          {/* Item 1 */}
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-8">
                  <LayoutGrid className="h-6 w-6 text-purple-400" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Visualize your data <br /> like never before.</h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Stop squinting at spreadsheets. Our dashboard gives you a bird's eye view of your entire financial landscape in real-time.
                </p>
                <div className="flex flex-col gap-4 border-l-2 border-white/5 pl-6">
                  <div className="flex gap-3 items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-white">Real-time GST tracking</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-white">Automated invoice reconciliation</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-white">Predictive tax liability alerts</span>
                  </div>
                </div>
              </div>
              <div className="order-first md:order-last relative">
                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
                <div className="relative bg-[#09090b] border border-white/10 rounded-2xl aspect-square shadow-2xl flex items-center justify-center p-8">
                  {/* Abstract Chart */}
                  <div className="w-full h-full relative">
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/20 to-transparent rounded-b-xl"></div>
                    <div className="absolute bottom-0 left-4 w-8 h-[60%] bg-primary rounded-t-lg"></div>
                    <div className="absolute bottom-0 left-16 w-8 h-[80%] bg-primary/80 rounded-t-lg"></div>
                    <div className="absolute bottom-0 left-28 w-8 h-[40%] bg-primary/60 rounded-t-lg"></div>
                    <div className="absolute bottom-0 left-40 w-8 h-[90%] bg-purple-400 rounded-t-lg shadow-[0_0_20px_rgba(168,85,247,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full"></div>
                <div className="relative bg-[#09090b] border border-white/10 rounded-2xl aspect-square shadow-2xl p-8 flex items-center justify-center">
                  <Lock className="h-32 w-32 text-white/5" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-[#09090b] border border-green-500/30 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <span className="text-white font-mono font-bold">Encrypted & Secure</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-8">
                  <ShieldCheck className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Bank-grade security. <br />Standard.</h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Your financial data is sensitive. We treat it that way. 256-bit encryption, 2FA, and daily immutable backups.
                </p>
                <Button variant="link" className="px-0 text-white hover:text-primary">Read our Security Whitepaper <ChevronRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Footer - Large and Centered */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
              Ready to build?
            </h2>
            <div className="flex justify-center mb-12">
              <Link href="/login">
                <Button className="h-16 px-12 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_50px_rgba(124,58,237,0.4)] hover:shadow-[0_0_80px_rgba(124,58,237,0.6)] transition-all scale-100 hover:scale-105">
                  Get Started Now
                </Button>
              </Link>
            </div>
            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-white">Privacy Policy</Link>
              <Link href="#" className="hover:text-white">Terms of Service</Link>
              <Link href="#" className="hover:text-white">Twitter</Link>
              <Link href="#" className="hover:text-white">LinkedIn</Link>
            </div>
            <div className="mt-12 text-xs text-muted-foreground/50">
              © 2025 RPS Tax Associates. All rights reserved.
            </div>
          </div>
        </section>

      </main>

    </div>
  )
}
