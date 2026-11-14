import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Paati Payanam — Tamil Conversation Adventure" },
      { name: "description", content: "Choose your Tamil dialect and start your journey to Paati's house." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Poppins:wght@400;500;600;700&family=Noto+Sans+Tamil:wght@500;700&display=swap",
      },
    ],
  }),
  component: Menu,
});

type Dialect = { id: string; label: string; ta: string; soon?: boolean };

const DIALECTS: Dialect[] = [
  { id: "eelam", label: "Eelam Tamil", ta: "ஈழத் தமிழ்", soon: true },
  { id: "indian", label: "Indian Tamil", ta: "இந்தியத் தமிழ்" },
  { id: "malaysian", label: "Malaysian Tamil", ta: "மலேசியத் தமிழ்", soon: true },
];

function Menu() {
  const [selected, setSelected] = useState<string | null>(null);

  const pick = (d: Dialect) => {
    if (d.soon) return;
    setSelected(d.id);
    try {
      window.localStorage.setItem("tamil-rpg:dialect", d.id);
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <main
      className="flex min-h-screen items-center justify-center p-5"
      style={{ background: "linear-gradient(135deg,#f3e3c3,#e9d2a0)", fontFamily: "'Poppins',sans-serif" }}
    >
      <div
        className="w-full max-w-xl rounded-[26px] p-12"
        style={{ background: "#fbf3e2", border: "3px solid #f6e4bd", boxShadow: "0 30px 70px rgba(80,40,10,0.35)" }}
      >
        <div className="mb-3 text-xs font-bold tracking-[2px]" style={{ color: "#c8841a" }}>
          TAMIL CONVERSATION ADVENTURE
        </div>
        <h1 className="text-5xl font-black leading-none" style={{ color: "#3a2316", fontFamily: "'Playfair Display',serif" }}>
          Paati Payanam
        </h1>
        <div className="mt-2 text-2xl font-bold" style={{ color: "#d8551f", fontFamily: "'Noto Sans Tamil',sans-serif" }}>
          பாட்டி பயணம்
        </div>
        <p className="mb-8 mt-4 max-w-md text-[15px] leading-relaxed" style={{ color: "#5a4536" }}>
          Come home, talk with Paati, and learn to speak with warmth, confidence, and respect.
        </p>

        <div className="mb-3 text-xs font-bold tracking-[1.5px]" style={{ color: "#8a6a4a" }}>
          CHOOSE YOUR TAMIL DIALECT
        </div>
        <div className="mb-8 flex flex-col gap-3">
          {DIALECTS.map((d) => {
            const isSelected = selected === d.id;
            return (
              <button
                key={d.id}
                onClick={() => pick(d)}
                disabled={d.soon}
                className="flex items-center justify-between rounded-xl px-5 py-3.5 text-left transition-transform active:scale-[0.99]"
                style={{
                  background: isSelected ? "#6e1b1b" : "#fff6e4",
                  border: `2px solid ${isSelected ? "#e8ad2f" : "#e8d8b8"}`,
                  cursor: d.soon ? "not-allowed" : "pointer",
                  opacity: d.soon ? 0.55 : 1,
                  boxShadow: isSelected ? "0 0 0 4px rgba(232,173,47,0.3)" : "none",
                }}
              >
                <span>
                  <span className="block font-bold" style={{ color: isSelected ? "#fff6e5" : "#3a2316", fontSize: "15px" }}>
                    {d.label}
                    {d.soon ? <span className="ml-2 text-xs font-medium opacity-70">coming soon</span> : null}
                  </span>
                  <span
                    className="mt-0.5 block text-[12.5px]"
                    style={{ color: isSelected ? "#ffd166" : "#d8551f", fontFamily: "'Noto Sans Tamil',sans-serif" }}
                  >
                    {d.ta}
                  </span>
                </span>
                {isSelected ? <span style={{ color: "#e8ad2f", fontWeight: 700 }}>✓</span> : null}
              </button>
            );
          })}
        </div>

        <Link
          to="/entrance"
          className="flex w-full items-center justify-center gap-2.5 rounded-2xl px-6 py-4 text-[17px] font-bold transition-transform active:translate-y-0 hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg,#f4c444,#e8a62d)",
            color: "#3a2316",
            textDecoration: "none",
            boxShadow: "0 10px 20px rgba(200,140,30,0.45)",
          }}
        >
          Start your journey →
        </Link>
        <div className="mt-3 text-[12.5px]" style={{ color: "#8a6a4a" }}>
          Selected: <b style={{ color: "#6e1b1b" }}>{DIALECTS.find((d) => d.id === selected)?.label ?? "—"}</b>
        </div>
      </div>
    </main>
  );
}
