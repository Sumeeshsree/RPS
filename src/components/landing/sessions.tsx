import { ShieldCheck, History, Award } from "lucide-react";

export function SessionsTracking() { // Kept name to minimize refactor on page.tsx
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Why Choose RPS?
                        </h2>
                        <h3 className="text-xl md:text-2xl text-muted-foreground mb-6">
                            Proven track record. <br />
                            <span className="text-white">Clients trust us with their growth.</span>
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-8">
                            We don't just file taxes; we partner with you to ensure your financial compliance is a catalyst for growth, not a hurdle.
                        </p>
                        <div className="flex gap-8">
                            <div>
                                <div className="text-4xl font-bold text-white mb-1">500+</div>
                                <div className="text-sm text-muted-foreground">Happy Clients</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-white mb-1">10k+</div>
                                <div className="text-sm text-muted-foreground">Filings Done</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-white mb-1">100%</div>
                                <div className="text-sm text-muted-foreground">Audit Success</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full relative">
                        {/* Abstract Visualization */}
                        <div className="relative w-full aspect-square bg-gradient-to-tr from-gray-900 to-black rounded-full border border-white/5 flex items-center justify-center p-8 shadow-2xl">
                            <div className="absolute inset-4 rounded-full border border-dashed border-white/10 opacity-50 animate-[spin_60s_linear_infinite]" />
                            <div className="absolute inset-12 rounded-full border border-white/5 opacity-30" />

                            {/* Floating Cards */}
                            <div className="absolute top-1/4 left-0 bg-[#1A1A1E] p-4 rounded-xl border border-white/10 shadow-xl animate-fade-in-up md:-translate-x-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <ShieldCheck className="w-4 h-4 text-green-500" />
                                    <div className="text-xs text-muted-foreground">Compliance Score</div>
                                </div>
                                <div className="text-lg font-bold text-white">99.9%</div>
                            </div>

                            <div className="absolute bottom-1/4 right-0 bg-[#1A1A1E] p-4 rounded-xl border border-white/10 shadow-xl animate-fade-in-up [animation-delay:200ms] md:translate-x-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <History className="w-4 h-4 text-blue-500" />
                                    <div className="text-xs text-muted-foreground">Turnaround Time</div>
                                </div>
                                <div className="text-lg font-bold text-white">24 Hrs</div>
                            </div>

                            <div className="text-center z-10">
                                <Award className="w-16 h-16 text-primary mx-auto mb-2 opacity-80" />
                                <div className="text-lg text-white font-medium">Certified<br />Excellence</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
