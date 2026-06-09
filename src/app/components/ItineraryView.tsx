import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Navigation } from "lucide-react";

const DAYS = [
  {
    num: 1,
    date: "June 12, Friday",
    title: "Ghaziabad to Jwalamukhi",
    subtitle: "The Sacred Flame Awaits",
    color: "#e07b39",
    hero: "https://images.unsplash.com/photo-1601920791548-bd0a29f848c4?w=900&h=400&fit=crop&auto=format",
    stops: [
      {
        time: "Around 3:00 AM",
        icon: "🌙",
        title: "Departure from Ghaziabad",
        desc: "Set off in the cool pre-dawn hours to beat traffic on NH-44. Pack snacks and warm layers — the highways are empty and the drive magical under starlight.",
        type: "travel",
        image: null,
      },
      {
        time: "Around 6:30–7:30 AM",
        icon: "☕",
        title: "Breakfast Stop",
        desc: "Pause on the highway for a relaxed breakfast whenever it feels convenient. Keep the plan flexible and choose a comfortable stop based on time, traffic, and the family's mood.",
        type: "food",
        image: null,
      },
      {
        time: "Around 12:30–1:30 PM",
        icon: "⛽",
        title: "Comfort Break on the Way",
        desc: "Take a short break to refuel, stretch, and refresh whenever needed during the drive. The idea is to stay comfortable and adjust the journey naturally along the route.",
        type: "stop",
        image: null,
      },
      {
        time: "Around 4:00–4:30 PM",
        icon: "🏨",
        title: "Check-in: Hotel REEM, Jwalamukhi",
        desc: "Reach Jwalamukhi, check into the hotel, freshen up, and relax after the long drive. Take your time with a bath and rest a little before heading out for the evening temple visit.",
        type: "hotel",
        image: "https://images.unsplash.com/photo-1628699543232-dc241b48a4b3?w=600&h=350&fit=crop&auto=format",
      },
      {
        time: "Around 5:30–7:00 PM",
        icon: "🔥",
        title: "Jwalamukhi Temple Darshan",
        desc: "Visit the sacred Shakti Peeth after settling into the hotel. Natural gas flames burn eternally from rock fissures here, making it both a divine shrine and a geological marvel. Take in the temple atmosphere, offer prasad, and enjoy the evening darshan.",
        type: "highlight",
        image: "https://images.unsplash.com/photo-1625072290979-cac544181be8?w=600&h=350&fit=crop&auto=format",
      },
      {
        time: "Around 7:00–8:00 PM",
        icon: "🛍️",
        title: "Local Market Exploration",
        desc: "Spend some time exploring the lively area around the temple at an easy pace. Browse the local market, soak in the atmosphere, and enjoy the evening in town before returning to the hotel.",
        type: "activity",
        image: null,
      },
      {
        time: "Around 8:30 PM Onward",
        icon: "🍽️",
        title: "Dinner & Rest",
        desc: "Wrap up the day with a comforting dinner and a relaxed evening at the hotel. Rest well and get ready for the journey through Kangra Valley on Day 2.",
        type: "food",
        image: null,
      },
    ],
    tips: ["Carry warm layers — temperatures drop at night even in June", "Temple dress code: remove footwear, cover shoulders", "Keep the road schedule flexible and stop as needed for comfort"],
  },
  {
    num: 2,
    date: "June 13, Saturday",
    title: "Chamunda → Kangra → McLeod Ganj",
    subtitle: "The Valley of Gods & Little Lhasa",
    color: "#3a7bbf",
    hero: "https://images.unsplash.com/photo-1617469165786-8007eda3caa7?w=900&h=400&fit=crop&auto=format",
    stops: [
      {
        time: "Around 7:30–8:30 AM",
        icon: "🌅",
        title: "Breakfast at Hotel REEM",
        desc: "Start with a filling breakfast before checking out later in the morning. Keep the start relaxed and head out once everyone is refreshed and ready for the day.",
        type: "food",
        image: null,
      },
      {
        time: "Around 10:00–11:30 AM",
        icon: "🕉️",
        title: "Chamunda Devi Temple",
        desc: "Perched dramatically above the gorge of the Baner Khad river, this powerful Shakti shrine draws pilgrims from across India. The walk down the stone steps to the riverside temple is meditative, the views of the surrounding Kangra Valley breathtaking. Allow time for proper darshan and the riverside ghat.",
        type: "highlight",
        image: "https://images.unsplash.com/photo-1617469165786-8007eda3caa7?w=600&h=350&fit=crop&auto=format",
      },
      {
        time: "Around 12:00–1:30 PM",
        icon: "🏰",
        title: "Kangra Fort (Optional — Time Permitting)",
        desc: "One of the oldest forts in India, the Kangra Fort sits at the confluence of two rivers and commands panoramic valley views. If time allows, explore the ancient ramparts, Laxmi Narayan temple within, and learn about its fascinating Mughal and Sikh history.",
        type: "optional",
        image: "https://images.unsplash.com/photo-1656670610903-025312104457?w=600&h=350&fit=crop&auto=format",
      },
      {
        time: "Around 1:30–2:30 PM",
        icon: "🍽️",
        title: "Lunch Break",
        desc: "Take a lunch break whenever it feels natural during the day. You can decide the best place in the moment depending on timing, energy, and where you happen to be.",
        type: "food",
        image: null,
      },
      {
        time: "Around 3:00–4:00 PM",
        icon: "🏔️",
        title: "Arrive McLeod Ganj",
        desc: "Drive up the winding road to McLeod Ganj at 1,457m. The town greets you with colorful prayer flags, the scent of pine and juniper incense, and a unique blend of Indian and Tibetan cultures.",
        type: "travel",
        image: "https://images.unsplash.com/photo-1628070018796-a9f4e2dd482a?w=600&h=350&fit=crop&auto=format",
      },
      {
        time: "Around 4:30–5:30 PM",
        icon: "☸️",
        title: "Tsuglagkhang Complex & Namgyal Monastery",
        desc: "Visit the spiritual heart of the Tibetan exile community. Walk around the prayer wheel circuit, visit the main Tsuglagkhang temple with its golden Buddha statues, and if lucky, witness the monks' evening prayers. The Tibet Museum here is deeply moving.",
        type: "highlight",
        image: "https://images.unsplash.com/photo-1503641926155-5c17619b79d0?w=600&h=350&fit=crop&auto=format",
      },
      {
        time: "Around 5:30–6:30 PM",
        icon: "💧",
        title: "Bhagsu Nag Temple & Waterfall",
        desc: "A 20-minute walk from McLeod leads to the Bhagsu Nag temple and then the dramatic waterfall cascading 30m through mountain rock. The famous Shiva Café perched above offers spectacular views, great momos, and fresh juice.",
        type: "highlight",
        image: "https://images.unsplash.com/photo-1742281415579-fa5c7a169788?w=600&h=350&fit=crop&auto=format",
      },
      {
        time: "Around 7:00–8:30 PM",
        icon: "🛍️",
        title: "Tibetan Market & Café Evening",
        desc: "Browse the Tibetan market for handmade jewelry, thangka paintings, singing bowls, and prayer flags. End the day at a rooftop café watching the city lights flicker against the mountain silhouette.",
        type: "activity",
        image: null,
      },
      {
        time: "Around 9:00 PM",
        icon: "🏨",
        title: "Check-in: Hotel Woodz, McLeod Ganj",
        desc: "Retire to your forest-view rooms at Hotel Woodz. The cool mountain air, sound of crickets, and cedar-scented breeze make for a perfect night's sleep at altitude.",
        type: "hotel",
        image: "https://images.unsplash.com/photo-1618772446265-3f9f8e6f8487?w=600&h=350&fit=crop&auto=format",
      },
    ],
    tips: ["Bhagsu waterfall path can be slippery — wear good grip shoes", "Tsuglagkhang may be closed on select Buddhist holidays", "Carry small denomination notes for Tibetan market shopping"],
  },
  {
    num: 3,
    date: "June 14, Sunday",
    title: "McLeod Ganj to Ghaziabad",
    subtitle: "Until the Mountains Call Again",
    color: "#4a9d72",
    hero: "https://images.unsplash.com/photo-1626002547082-f12bc6b7a72b?w=900&h=400&fit=crop&auto=format",
    stops: [
      {
        time: "Around 6:30–7:00 AM",
        icon: "🌄",
        title: "Final Sunrise Moment",
        desc: "Wake early to catch the Dhauladhar peaks glowing pink in the dawn light from your hotel window or a nearby viewpoint. This last moment of mountain magic is worth the early wake-up.",
        type: "activity",
        image: null,
      },
      {
        time: "Around 7:30–8:30 AM",
        icon: "☕",
        title: "Breakfast at Hotel Woodz",
        desc: "Enjoy your last mountain breakfast and take the morning easy before checking out later in the morning. Head back once everyone is ready for the return drive.",
        type: "food",
        image: null,
      },
      {
        time: "Around 9:30–10:30 AM",
        icon: "🚗",
        title: "Depart McLeod Ganj",
        desc: "Begin the ~490km return journey to Ghaziabad. The descending views of the Kangra Valley as you leave the hills are spectacular — take one last look at the peaks.",
        type: "travel",
        image: "https://images.unsplash.com/photo-1596829568009-bc436aac1b63?w=600&h=350&fit=crop&auto=format",
      },
      {
        time: "Around 1:00–2:00 PM",
        icon: "🍽️",
        title: "Lunch Break",
        desc: "Pause for lunch wherever it feels convenient on the return journey. The plan stays open so you can decide based on the route, traffic, and how everyone is feeling.",
        type: "food",
        image: null,
      },
      {
        time: "Around 3:30–4:30 PM",
        icon: "⛽",
        title: "Rest Stop on the Way",
        desc: "Take another short break on the way back if needed for fuel, tea, or a quick stretch. Keeping this flexible makes the drive smoother and more comfortable.",
        type: "stop",
        image: null,
      },
      {
        time: "Around 7:30–8:30 PM",
        icon: "🏠",
        title: "Arrive Ghaziabad",
        desc: "Return home with minds full of mountain mist, hearts warmed by temple visits, and phones full of incredible photographs. The mountains will be waiting for your next visit.",
        type: "end",
        image: null,
      },
    ],
    tips: ["Try to leave in the morning to avoid late-evening traffic near Delhi", "Weekend return traffic can get heavier as you approach the plains", "Keep a little buffer time for relaxed snack or tea breaks on the highway"],
  },
];

function StopCard({ stop, color }: { stop: (typeof DAYS)[0]["stops"][0]; color: string }) {
  const [expanded, setExpanded] = useState(false);
  const typeStyles: Record<string, string> = {
    highlight: "border-l-4",
    hotel: "border-l-4",
    food: "border-l-2",
    travel: "border-l-2",
    optional: "border-l-2",
    activity: "border-l-2",
    stop: "border-l-2",
    end: "border-l-4",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl overflow-hidden mb-4 ${typeStyles[stop.type] || "border-l-2"}`}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderLeftColor: stop.type === "highlight" || stop.type === "hotel" || stop.type === "end" ? color : "rgba(255,255,255,0.12)",
        borderLeftWidth: stop.type === "highlight" || stop.type === "hotel" || stop.type === "end" ? 4 : 1,
      }}
    >
      <button
        className="w-full text-left p-4"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-3">
          <div className="text-2xl mt-0.5 flex-shrink-0">{stop.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span style={{ fontFamily: "DM Mono", fontSize: 11, color: "#8fa3bb" }}>{stop.time}</span>
              {stop.type === "optional" && (
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(138,155,176,0.2)", color: "#8fa3bb", fontFamily: "Inter" }}>Optional</span>
              )}
            </div>
            <h4
              className="mt-0.5"
              style={{ fontFamily: "Playfair Display", fontSize: 16, fontWeight: 600, color: "#f0ede8" }}
            >
              {stop.title}
            </h4>
          </div>
          <ChevronDown
            size={16}
            className="flex-shrink-0 mt-1 transition-transform duration-200"
            style={{ color: "#8fa3bb", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pl-12">
              <p style={{ fontFamily: "Inter", fontSize: 14, color: "#a8b8cc", lineHeight: 1.65 }}>
                {stop.desc}
              </p>
              {stop.image && (
                <div className="mt-3 rounded-xl overflow-hidden" style={{ height: 180 }}>
                  <img src={stop.image} alt={stop.title} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ItineraryView() {
  const [activeDay, setActiveDay] = useState(0);
  const day = DAYS[activeDay];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Day tabs */}
      <div className="px-4 pt-3 pb-2 flex gap-2">
        {DAYS.map((d, i) => (
          <button
            key={d.num}
            onClick={() => setActiveDay(i)}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              fontFamily: "Inter",
              background: activeDay === i ? d.color : "rgba(255,255,255,0.06)",
              color: activeDay === i ? "white" : "#8fa3bb",
              fontSize: 13,
            }}
          >
            Day {d.num}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4" style={{ scrollbarWidth: "none" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Hero image */}
            <div className="rounded-2xl overflow-hidden mb-4 relative" style={{ height: 160 }}>
              <img src={day.hero} alt={day.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,22,34,0.9) 0%, transparent 60%)" }} />
              <div className="absolute bottom-0 left-0 p-4">
                <p style={{ fontFamily: "DM Mono", fontSize: 11, color: day.color, marginBottom: 2 }}>{day.date}</p>
                <h3 style={{ fontFamily: "Playfair Display", fontSize: 20, fontWeight: 700, color: "#f0ede8", lineHeight: 1.2 }}>{day.title}</h3>
                <p style={{ fontFamily: "Inter", fontSize: 12, color: "#a8b8cc" }}>{day.subtitle}</p>
              </div>
            </div>

            {/* Route indicator */}
            <div className="flex items-center gap-2 mb-4 px-1">
              <Navigation size={13} style={{ color: day.color }} />
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${day.color}50, transparent)` }} />
              <span style={{ fontFamily: "DM Mono", fontSize: 10, color: "#8fa3bb" }}>
                {day.stops.length} stops planned
              </span>
            </div>

            {/* Stops */}
            {day.stops.map((stop, i) => (
              <StopCard key={i} stop={stop} color={day.color} />
            ))}

            {/* Travel Tips */}
            <div
              className="rounded-2xl p-4 mt-2"
              style={{ background: `${day.color}15`, border: `1px solid ${day.color}30` }}
            >
              <h4 className="mb-3" style={{ fontFamily: "Playfair Display", fontSize: 15, fontWeight: 600, color: day.color }}>
                💡 Day {day.num} Travel Tips
              </h4>
              {day.tips.map((tip, i) => (
                <div key={i} className="flex gap-2 mb-2 last:mb-0">
                  <span style={{ color: day.color, flexShrink: 0 }}>·</span>
                  <p style={{ fontFamily: "Inter", fontSize: 13, color: "#a8b8cc", lineHeight: 1.5 }}>{tip}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
