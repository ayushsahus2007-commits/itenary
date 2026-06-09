import { motion } from "motion/react";
import { CheckSquare, Square, Phone, AlertTriangle, Cloud, Shirt, Navigation } from "lucide-react";
import { useState } from "react";

const PACKING_ITEMS = [
  {
    category: "Clothing & Comfort",
    icon: <Shirt size={16} />,
    color: "#3a7bbf",
    items: [
      "Light cotton clothes (daytime is warm)",
      "Fleece jacket / sweater (evenings cold at McLeod)",
      "Rain poncho / light waterproof layer",
      "Comfortable walking shoes with grip",
      "Flip-flops for temple visits",
      "Temple scarf / dupatta for women",
      "Sunglasses and sun hat",
      "Warm socks (1–2 extra pairs)",
    ],
  },
  {
    category: "Documents & Money",
    icon: <Navigation size={16} />,
    color: "#e07b39",
    items: [
      "Government ID for all members",
      "Hotel booking confirmations (printed)",
      "Cab driver's contact number saved",
      "Emergency contact list on paper",
      "Cash (ATMs can be unreliable in hills)",
      "UPI apps with offline QR backup",
      "Vehicle registration (if own car)",
    ],
  },
  {
    category: "Health & Safety",
    icon: <AlertTriangle size={16} />,
    color: "#4a9d72",
    items: [
      "Basic first-aid kit (band-aids, antiseptic)",
      "Personal prescription medications",
      "Motion sickness tablets",
      "Sunscreen SPF 50+ (UV is intense at altitude)",
      "Lip balm (mountain air is very dry)",
      "Hand sanitizer and wet wipes",
      "Insect repellent for forest areas",
      "ORS / electrolyte sachets",
    ],
  },
  {
    category: "Devices & Extras",
    icon: <Cloud size={16} />,
    color: "#c77dba",
    items: [
      "Power bank (essential for long days)",
      "Car charger / adapter",
      "Camera or phone with ample storage",
      "Offline Google Maps downloaded",
      "Earphones for the long drive",
      "Kids entertainment (tablets, books)",
      "Reusable water bottles (min. 1L each)",
      "Snack bag for the road",
    ],
  },
];

const TIPS_SECTIONS = [
  {
    title: "Road Conditions",
    icon: "🛣️",
    color: "#e07b39",
    tips: [
      "NH-44 and NH-154 are generally smooth — mountain roads from Kangra onwards are narrower",
      "June sees occasional rain — carry a tow rope and check weather before Jwalamukhi",
      "Avoid driving after dark on mountain roads — mist and poor visibility are hazards",
      "Landslides possible near Chamunda and McLeod — check HPRTC/HP Police road updates",
    ],
  },
  {
    title: "Weather Expectations",
    icon: "🌤️",
    color: "#3a7bbf",
    tips: [
      "June: Jwalamukhi 30–35°C day, 20–22°C night — pleasant but pre-monsoon humidity",
      "McLeod Ganj: 18–24°C day, 10–14°C night — always carry a jacket",
      "Pre-monsoon showers possible — pack light waterproofs",
      "Mountain evenings are cool year-round — do not underestimate them",
    ],
  },
  {
    title: "Temple Etiquette",
    icon: "🕉️",
    color: "#c77dba",
    tips: [
      "Remove footwear before entering all temples — carry a small bag for shoes",
      "Dress modestly — shoulders and knees covered; avoid sleeveless at Shakti temples",
      "Photography restrictions apply inside main sanctuaries — ask before clicking",
      "Do not touch idols or sacred items — maintain respectful distance",
      "Jwalamukhi temple: no leather items inside (belts, bags) out of reverence",
    ],
  },
  {
    title: "Fuel & Logistics",
    icon: "⛽",
    color: "#4a9d72",
    tips: [
      "Keep fuel, tea, and comfort breaks flexible so you can stop according to the route and situation",
      "Carry ₹2,000–₹3,000 cash for emergencies in areas with poor connectivity",
      "Negotiate toll costs into the cab fare upfront to avoid disputes",
      "Keep the cab driver's personal number — contact is key if plans change",
    ],
  },
];

const EMERGENCY = [
  { label: "Police (National)", number: "100" },
  { label: "Ambulance", number: "108" },
  { label: "Tourist Helpline HP", number: "1800-180-8027" },
  { label: "District Hospital Dharamsala", number: "01892-222499" },
  { label: "Himachal Traffic Control", number: "0177-2621780" },
  { label: "Hotel REEM (Jwalamukhi)", number: "Save before trip" },
  { label: "Hotel Woodz (McLeod)", number: "Save before trip" },
];

export function TipsView() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggle(key: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const totalItems = PACKING_ITEMS.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedCount = checked.size;

  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-3 pb-6" style={{ scrollbarWidth: "none" }}>
      <h2
        className="mb-1"
        style={{ fontFamily: "Playfair Display", fontSize: 22, fontWeight: 700, color: "#f0ede8" }}
      >
        Tips & Packing
      </h2>
      <p className="mb-4" style={{ fontFamily: "Inter", fontSize: 13, color: "#8fa3bb" }}>
        Everything you need for a perfect trip
      </p>

      {/* Packing checklist */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 style={{ fontFamily: "Playfair Display", fontSize: 17, fontWeight: 600, color: "#f0ede8" }}>
            🎒 Packing Checklist
          </h3>
          <span style={{ fontFamily: "DM Mono", fontSize: 11, color: "#4a9d72" }}>
            {checkedCount}/{totalItems} packed
          </span>
        </div>

        {/* Progress */}
        <div className="h-1.5 rounded-full mb-4 overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #4a9d72, #a8d8b4)" }}
            animate={{ width: `${(checkedCount / totalItems) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {PACKING_ITEMS.map((cat, ci) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.08 }}
            className="rounded-2xl overflow-hidden mb-4"
            style={{ background: "#13243a", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="p-4 pb-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${cat.color}20`, color: cat.color }}>
                  {cat.icon}
                </div>
                <span style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 600, color: "#f0ede8" }}>{cat.category}</span>
              </div>
              <div className="space-y-2">
                {cat.items.map((item, ii) => {
                  const key = `${ci}-${ii}`;
                  const isChecked = checked.has(key);
                  return (
                    <button
                      key={ii}
                      onClick={() => toggle(key)}
                      className="flex items-start gap-2.5 w-full text-left"
                    >
                      {isChecked
                        ? <CheckSquare size={16} style={{ color: cat.color, flexShrink: 0, marginTop: 1 }} />
                        : <Square size={16} style={{ color: "#4a6080", flexShrink: 0, marginTop: 1 }} />
                      }
                      <span
                        style={{
                          fontFamily: "Inter",
                          fontSize: 13,
                          color: isChecked ? "#5a7090" : "#a8b8cc",
                          textDecoration: isChecked ? "line-through" : "none",
                          lineHeight: 1.45,
                        }}
                      >
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Travel Tips */}
      <h3 className="mb-3" style={{ fontFamily: "Playfair Display", fontSize: 17, fontWeight: 600, color: "#f0ede8" }}>
        🗺️ Essential Travel Tips
      </h3>
      {TIPS_SECTIONS.map((section, i) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.08 }}
          className="rounded-2xl p-4 mb-4"
          style={{ background: "#13243a", border: `1px solid ${section.color}25` }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span style={{ fontSize: 18 }}>{section.icon}</span>
            <h4 style={{ fontFamily: "Inter", fontSize: 14, fontWeight: 600, color: section.color }}>{section.title}</h4>
          </div>
          {section.tips.map((tip, j) => (
            <div key={j} className="flex gap-2 mb-2 last:mb-0">
              <span style={{ color: section.color, flexShrink: 0, fontSize: 14, lineHeight: 1.5 }}>•</span>
              <p style={{ fontFamily: "Inter", fontSize: 12, color: "#8fa3bb", lineHeight: 1.6 }}>{tip}</p>
            </div>
          ))}
        </motion.div>
      ))}

      {/* Emergency Contacts */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="rounded-2xl overflow-hidden"
        style={{ background: "rgba(224,61,61,0.08)", border: "1px solid rgba(224,61,61,0.25)" }}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Phone size={16} color="#e03d3d" />
            <h4 style={{ fontFamily: "Playfair Display", fontSize: 15, fontWeight: 600, color: "#e03d3d" }}>Emergency Contacts</h4>
          </div>
          <div className="space-y-2">
            {EMERGENCY.map((e, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <span style={{ fontFamily: "Inter", fontSize: 12, color: "#8fa3bb" }}>{e.label}</span>
                <span style={{ fontFamily: "DM Mono", fontSize: 13, color: "#f0ede8", fontWeight: 500 }}>{e.number}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Closing quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 text-center px-4"
      >
        <div className="w-16 h-px mx-auto mb-4" style={{ background: "rgba(244,164,97,0.4)" }} />
        <p
          className="italic"
          style={{ fontFamily: "Playfair Display", fontSize: 15, color: "#f4a461", lineHeight: 1.7, fontStyle: "italic" }}
        >
          "Collect moments, not things. Every road leads to a story worth remembering."
        </p>
        <p className="mt-2" style={{ fontFamily: "DM Mono", fontSize: 11, color: "#8fa3bb" }}>— Himachal Pradesh Family Trip · June 2026</p>
      </motion.div>
    </div>
  );
}
