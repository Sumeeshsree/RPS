import { FileText, Building, Calculator, Scale, BadgeCheck, TrendingUp } from "lucide-react"; // Relevant icons

export function MeetBlitzy() { // Kept name same to avoid refactoring page.tsx, could rename if cleaner
    const features = [
        {
            icon: <FileText className="w-6 h-6 text-primary" />,
            title: "GST Registration & Filing",
            description: "Seamless GSTR-1, GSTR-3B filings with 100% accuracy. We handle amendments and notices.",
            className: "md:col-span-2",
        },
        {
            icon: <Calculator className="w-6 h-6 text-blue-400" />,
            title: "Income Tax",
            description: "Personal and corporate ITR filing. Tax planning to maximize your savings legally.",
        },
        {
            icon: <Building className="w-6 h-6 text-green-400" />,
            title: "Company Formation",
            description: "PVT LTD, LLP, or Partnership. We handle everything from name reservation to incorporation.",
        },
        {
            icon: <TrendingUp className="w-6 h-6 text-orange-400" />,
            title: "Bookkeeping",
            description: "Maintain clear standards-compliant accounts ledgers for stress-free audits.",
        },
        {
            icon: <Scale className="w-6 h-6 text-pink-400" />,
            title: "Legal Compliance",
            description: "FSSAI, Trademark, ISO, and other statutory registrations for your business.",
            className: "md:col-span-2",
        },
    ];

    return (
        <section id="services" className="py-20 bg-black/40">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                        <BadgeCheck className="w-4 h-4" />
                        <span>Expert Services</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Our <span className="text-primary">Expertise</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Comprehensive tax and legal solutions tailored for startups and established enterprises.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className={`bg-[#0A0A0C] border border-white/5 p-8 rounded-2xl hover:border-primary/50 transition-colors group ${feature.className || ""}`}
                        >
                            <div className="bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
