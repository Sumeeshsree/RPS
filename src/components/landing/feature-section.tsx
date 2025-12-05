import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface FeatureSectionProps {
    title: string;
    description: string;
    features?: string[];
    imageSide?: "left" | "right";
    className?: string;
    imageComponent?: React.ReactNode;
}

export function FeatureSection({
    title,
    description,
    features = [],
    imageSide = "right",
    className,
    imageComponent,
}: FeatureSectionProps) {
    return (
        <section className={cn("py-20 md:py-32 overflow-hidden", className)}>
            <div className="container mx-auto px-6">
                <div className={cn(
                    "flex flex-col md:flex-row items-center gap-12 md:gap-24",
                    imageSide === "left" && "md:flex-row-reverse"
                )}>
                    {/* Content */}
                    <div className="flex-1 space-y-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                            {title}
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {description}
                        </p>

                        {features.length > 0 && (
                            <ul className="space-y-4">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                                        <span className="text-base">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <Button size="lg" variant="outline" className="rounded-full border-white/10 hover:bg-white/10 text-white mt-4">
                            Learn more
                        </Button>
                    </div>

                    {/* Visual/Image */}
                    <div className="flex-1 w-full bg-white/5 rounded-2xl border border-white/10 aspect-square md:aspect-[4/3] flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        {imageComponent ? imageComponent : (
                            <div className="text-muted-foreground/30 font-medium">Feature Calculation</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
