import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    intensity?: "low" | "medium" | "high";
}

export function GlassCard({
    children,
    className,
    intensity = "medium",
    ...props
}: GlassCardProps) {
    const intensityStyles = {
        low: "bg-white/5 backdrop-blur-md border-white/10",
        medium: "bg-white/10 backdrop-blur-lg border-white/20 shadow-xl",
        high: "bg-white/20 backdrop-blur-xl border-white/30 shadow-2xl"
    };

    return (
        <div
            className={cn(
                "rounded-2xl border transition-all duration-300",
                intensityStyles[intensity],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
