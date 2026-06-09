import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Layers,
  Map,
  Building2,
  Backpack,
  ChevronLeft,
  Mountain,
} from "lucide-react";
import { CardStack } from "./components/CardStack";
import { ItineraryView } from "./components/ItineraryView";
import { HotelsView } from "./components/HotelsView";
import { TipsView } from "./components/TipsView";

type Tab = "cards" | "itinerary" | "hotels" | "tips";

const TABS: {
  id: Tab;
  label: string;
  icon: React.ReactNode;
}[] = [
  { id: "cards", label: "Explore", icon: <Layers size={18} /> },
  {
    id: "itinerary",
    label: "Itinerary",
    icon: <Map size={18} />,
  },
  {
    id: "hotels",
    label: "Hotels",
    icon: <Building2 size={18} />,
  },
  { id: "tips", label: "Tips", icon: <Backpack size={18} /> },
];

function CoverScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1578048117504-495014256835?w=900&h=1200&fit=crop&auto=format"
          alt="Himachal Pradesh mountains"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,22,34,0.4) 0%, rgba(11,22,34,0.2) 30%, rgba(11,22,34,0.75) 65%, rgba(11,22,34,0.98) 100%)",
          }}
        />
      </div>

      {/* Top branding */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-8">
        <div className="flex items-center gap-2">
          <Mountain size={18} color="#f4a461" />
          <span
            style={{
              fontFamily: "DM Mono",
              fontSize: 12,
              color: "#f4a461",
              letterSpacing: "0.12em",
            }}
          >
            HIMACHAL FAMILY TRIP
          </span>
        </div>
        <span
          style={{
            fontFamily: "DM Mono",
            fontSize: 11,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          12–14 JUNE
        </span>
      </div>

      {/* Bottom content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 pb-10">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 self-start"
          style={{
            background: "rgba(244,164,97,0.15)",
            border: "1px solid rgba(244,164,97,0.3)",
          }}
        >
          <span
            style={{
              fontFamily: "DM Mono",
              fontSize: 9,
              color: "#f4a461",
              letterSpacing: "0.06em",
            }}
          >
            GZB → JWALAMUKHI → CHAMUNDA → MCLEOD GANJ → GZB
          </span>
        </div>

        <h1
          style={{
            fontFamily: "Playfair Display",
            fontSize: 48,
            fontWeight: 800,
            color: "#f0ede8",
            lineHeight: 1.08,
            marginBottom: 14,
          }}
        >
          Where the
          <br />
          <em style={{ color: "#f4a461" }}>Mountains</em>
          <br />
          Speak
        </h1>

        <p
          style={{
            fontFamily: "Inter",
            fontSize: 14,
            color: "rgba(240,237,232,0.68)",
            lineHeight: 1.65,
            marginBottom: 28,
            maxWidth: 290,
          }}
        >
          A divine journey through the sacred temples and
          breathtaking peaks of Himachal Pradesh. Swipe through
          your destinations.
        </p>

        {/* Stats */}
        <div className="flex gap-6 mb-8">
          {[
            { value: "3", label: "Days" },
            { value: "2", label: "Nights" },
            { value: "5+", label: "Stops" },
            { value: "~1000", label: "KM" },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: "Playfair Display",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#f4a461",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "DM Mono",
                  fontSize: 9,
                  color: "#8fa3bb",
                  letterSpacing: "0.1em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <motion.button
          onClick={onStart}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 rounded-2xl relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #e07b39 0%, #f4a461 100%)",
            fontFamily: "Inter",
            fontSize: 16,
            fontWeight: 600,
            color: "white",
          }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ x: ["−100%", "200%"] }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "linear",
            }}
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
              width: "50%",
            }}
          />
          Start Exploring ✦
        </motion.button>

        <p
          className="text-center mt-3"
          style={{
            fontFamily: "Inter",
            fontSize: 11,
            color: "rgba(255,255,255,0.35)",
          }}
        >
          Swipe cards · Browse itinerary · Plan your journey
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("cards");

  const tabLabels: Record<Tab, string> = {
    cards: "Swipe Destinations",
    itinerary: "Day-by-Day Plan",
    hotels: "Your Stays",
    tips: "Tips & Packing",
  };

  if (!started) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: "#0b1622" }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            width: "min(430px, 100vw)",
            height: "min(900px, 100vh)",
            borderRadius: "min(2rem, 0px)",
          }}
        >
          <CoverScreen onStart={() => setStarted(true)} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ background: "#060f1a" }}
    >
      <div
        className="flex flex-col overflow-hidden relative"
        style={{
          width: "min(430px, 100vw)",
          height: "min(900px, 100vh)",
          background: "#0b1622",
          borderRadius: "min(2rem, 0px)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Mountain size={13} color="#f4a461" />
              <span
                style={{
                  fontFamily: "DM Mono",
                  fontSize: 10,
                  color: "#f4a461",
                  letterSpacing: "0.1em",
                }}
              >
                HIMACHAL · JUNE 2026
              </span>
            </div>
            <h1
              style={{
                fontFamily: "Playfair Display",
                fontSize: 19,
                fontWeight: 700,
                color: "#f0ede8",
                lineHeight: 1.2,
              }}
            >
              {tabLabels[activeTab]}
            </h1>
          </div>

          {activeTab !== "cards" ? (
            <button
              onClick={() => setActiveTab("cards")}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              <ChevronLeft size={16} color="#8fa3bb" />
            </button>
          ) : (
            <div
              className="px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(244,164,97,0.15)",
                border: "1px solid rgba(244,164,97,0.25)",
              }}
            >
              <span
                style={{
                  fontFamily: "DM Mono",
                  fontSize: 10,
                  color: "#f4a461",
                }}
              >
                12–14 JUN
              </span>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0"
            >
              {activeTab === "cards" && (
                <CardStack
                  onComplete={() => {
                    setActiveTab("itinerary");
                  }}
                />
              )}
              {activeTab === "itinerary" && <ItineraryView />}
              {activeTab === "hotels" && <HotelsView />}
              {activeTab === "tips" && <TipsView />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom navigation */}
        <div
          className="flex-shrink-0 flex items-center px-2 pt-2 pb-3"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(11,22,34,0.97)",
          }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 flex flex-col items-center gap-1 py-1.5 rounded-xl transition-all duration-200 relative"
                style={{
                  background: isActive
                    ? "rgba(224,123,57,0.12)"
                    : "transparent",
                }}
              >
                <span
                  style={{
                    color: isActive ? "#e07b39" : "#4a6080",
                  }}
                >
                  {tab.icon}
                </span>
                <span
                  style={{
                    fontFamily: "Inter",
                    fontSize: 10,
                    color: isActive ? "#e07b39" : "#4a6080",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-dot"
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: "#e07b39" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
