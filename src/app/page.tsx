import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { FeatureSection } from "@/components/landing/feature-section";
import { MeetBlitzy } from "@/components/landing/meet-blitzy";
import { SessionsTracking } from "@/components/landing/sessions";
import { Footer } from "@/components/landing/footer";
import { CheckCircle2, Lock, LayoutGrid, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <Navbar />

      <Hero />

      <MeetBlitzy />

      <div id="features">
        <FeatureSection
          title="Visualize your financial landscape"
          description="Stop squinting at spreadsheets. Our dashboard gives you a bird's eye view of your entire financial landscape in real-time."
          features={[
            "Real-time GST tracking",
            "Automated invoice reconciliation",
            "Predictive tax liability alerts",
            "Deadline reminders"
          ]}
          imageSide="right"
          imageComponent={
            <div className="relative w-full h-full flex items-center justify-center bg-black/40">
              <div className="relative bg-[#09090b] border border-white/10 rounded-2xl aspect-square w-3/4 shadow-2xl flex items-center justify-center p-8">
                {/* Abstract Chart */}
                <div className="w-full h-full relative">
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/20 to-transparent rounded-b-xl"></div>
                  <div className="absolute bottom-0 left-4 w-8 h-[60%] bg-primary rounded-t-lg"></div>
                  <div className="absolute bottom-0 left-16 w-8 h-[80%] bg-primary/80 rounded-t-lg"></div>
                  <div className="absolute bottom-0 left-28 w-8 h-[40%] bg-primary/60 rounded-t-lg"></div>
                  <div className="absolute bottom-0 right-8 w-8 h-[90%] bg-purple-400 rounded-t-lg shadow-[0_0_20px_rgba(168,85,247,0.5)]"></div>
                </div>
              </div>
            </div>
          }
        />

        <FeatureSection
          title="Bank-grade security. Standard."
          description="Your financial data is sensitive. We treat it that way. 256-bit encryption, 2FA, and daily immutable backups."
          features={[
            "End-to-End Encryption",
            "Secure Document Vault",
            "Role-based Access Control",
            "Activity Logs"
          ]}
          imageSide="left"
          imageComponent={
            <div className="relative w-full h-full flex items-center justify-center bg-black/40">
              <div className="relative bg-[#09090b] border border-white/10 rounded-2xl w-3/4 aspect-square shadow-2xl p-8 flex items-center justify-center">
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
          }
        />
      </div>

      <SessionsTracking />

      <Footer />
    </main>
  );
}
