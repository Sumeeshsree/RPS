import { Button } from "@/components/ui/button";
import { ArrowRight, FileCheck } from "lucide-react"; // Changed icon
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                {/* Announcement Pill */}
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up">
                    <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                    <span className="text-sm font-medium text-muted-foreground">Trusted by 500+ Businesses</span>
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight animate-fade-in-up [animation-delay:200ms]">
                    Tax Compliance. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Simplified.</span>
                </h1>

                {/* Subheadline */}
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up [animation-delay:400ms]">
                    The most trusted tax consultancy firm in Chennai. We handle your GST, Income Tax, and Company Formation so you can focus on building your business.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-in-up [animation-delay:600ms]">
                    <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full h-12 px-8 text-base font-semibold">
                        Get Started Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base font-semibold border-white/10 bg-white/5 hover:bg-white/10 hover:text-white text-white backdrop-blur-sm">
                        <FileCheck className="w-4 h-4 mr-2" />
                        Our Services
                    </Button>
                </div>

                {/* Hero Visual */}
                <div className="relative mx-auto max-w-5xl rounded-xl border border-white/10 bg-background/50 backdrop-blur-sm shadow-2xl overflow-hidden animate-fade-in-up [animation-delay:800ms]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
                    {/* Placeholder for the app screenshot/interface */}
                    <div className="aspect-[16/10] bg-[#0c0c0e] relative flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-muted-foreground text-sm mb-2">RPS Tax Associates Dashboard</div>
                            {/* Abstract Dashboard UI */}
                            <div className="w-[800px] h-[400px] bg-[#121214] rounded-lg border border-white/5 mx-auto p-4 grid grid-cols-12 gap-4">
                                {/* Sidebar */}
                                <div className="col-span-3 bg-white/5 rounded h-full flex flex-col gap-2 p-2">
                                    <div className="h-8 bg-white/10 rounded w-full mb-4"></div>
                                    <div className="h-4 bg-white/5 rounded w-3/4"></div>
                                    <div className="h-4 bg-white/5 rounded w-full"></div>
                                    <div className="h-4 bg-white/5 rounded w-5/6"></div>
                                </div>
                                {/* Main Content */}
                                <div className="col-span-9 flex flex-col gap-4">
                                    {/* Header */}
                                    <div className="h-16 bg-white/5 rounded w-full flex items-center px-4 justify-between">
                                        <div className="h-4 w-32 bg-white/10 rounded"></div>
                                        <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                                    </div>
                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-24 bg-white/5 rounded p-3">
                                            <div className="h-4 w-20 bg-white/10 rounded mb-2"></div>
                                            <div className="h-8 w-16 bg-primary/20 rounded"></div>
                                        </div>
                                        <div className="h-24 bg-white/5 rounded p-3">
                                            <div className="h-4 w-20 bg-white/10 rounded mb-2"></div>
                                            <div className="h-8 w-16 bg-green-500/20 rounded"></div>
                                        </div>
                                        <div className="h-24 bg-white/5 rounded p-3">
                                            <div className="h-4 w-20 bg-white/10 rounded mb-2"></div>
                                            <div className="h-8 w-16 bg-blue-500/20 rounded"></div>
                                        </div>
                                    </div>
                                    {/* Chart Area */}
                                    <div className="flex-1 bg-white/5 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 flex items-end justify-center gap-2 p-4">
                                            <div className="w-8 h-[40%] bg-primary/40 rounded-t"></div>
                                            <div className="w-8 h-[60%] bg-primary/40 rounded-t"></div>
                                            <div className="w-8 h-[30%] bg-primary/40 rounded-t"></div>
                                            <div className="w-8 h-[80%] bg-primary/60 rounded-t"></div>
                                            <div className="w-8 h-[50%] bg-primary/40 rounded-t"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
