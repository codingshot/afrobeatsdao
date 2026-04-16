import { ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Live / “right now” events companion site */
export const VIBES_RIGHT_NOW_URL = "https://vibesright.now";

type VibesRightNowCtaProps = {
  /** `light` for white/light pages; `dark` for event detail (black) theme */
  tone?: "light" | "dark";
  className?: string;
};

export function VibesRightNowCta({ tone = "light", className }: VibesRightNowCtaProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "rounded-xl border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 text-left",
        isDark
          ? "border-[#008751]/50 bg-gray-900/90 text-white shadow-lg shadow-black/20"
          : "border-slate-200 bg-slate-50 text-slate-900 shadow-sm",
        className
      )}
    >
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
          isDark ? "bg-[#008751]/25 text-[#FFD600]" : "bg-[#008751]/15 text-[#008751]"
        )}
      >
        <Sparkles className="h-5 w-5" aria-hidden />
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <p className={cn("font-heading font-semibold text-base", isDark ? "text-white" : "text-slate-900")}>
          Want to see what&apos;s happening right now?
        </p>
        <p className={cn("text-sm leading-snug", isDark ? "text-gray-300" : "text-slate-600")}>
          Jump to live DJ sets, parties, and vibes in the moment on{" "}
          <span className="font-medium text-[#008751]">VibesRight.now</span>.
        </p>
      </div>
      <Button
        variant={isDark ? "outline" : "default"}
        className={cn(
          "shrink-0 w-full sm:w-auto border-[#008751]",
          isDark
            ? "border-[#FFD600] text-[#FFD600] hover:bg-[#FFD600]/10 hover:text-[#FFD600]"
            : "bg-[#008751] text-white hover:bg-[#008751]/90"
        )}
        asChild
      >
        <a href={VIBES_RIGHT_NOW_URL} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="mr-2 h-4 w-4" />
          Go to VibesRight.now
        </a>
      </Button>
    </div>
  );
}
