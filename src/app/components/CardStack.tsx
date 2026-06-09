import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { Heart, X, Star, MapPin, Clock, ChevronDown } from "lucide-react";

export interface TravelCard {
  id: number;
  day: string;
  dayNum: number;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  categoryColor: string;
  duration: string;
  distance?: string;
  highlights: string[];
  description: string;
  tags: string[];
  saved?: boolean;
}

const CARDS: TravelCard[] = [
  {
    id: 1,
    day: "Cover",
    dayNum: 0,
    title: "Himachal Pradesh",
    subtitle: "Family Road Trip Adventure",
    image: "https://images.unsplash.com/photo-1578048117504-495014256835?w=800&h=1100&fit=crop&auto=format",
    category: "⛰️ Mountain Escape",
    categoryColor: "#3a7bbf",
    duration: "3 Days / 2 Nights",
    distance: "Ghaziabad → McLeod Ganj",
    highlights: ["Sacred Temples", "Tibetan Culture", "Mountain Views"],
    description: "Embark on a divine journey through the land of gods — from the eternal flames of Jwalamukhi to the serene heights of McLeod Ganj, guided by the Dhauladhar peaks.",
    tags: ["June 12–14, 2026", "Private Cab", "Family Trip"],
  },
  {
    id: 2,
    day: "Day 1",
    dayNum: 1,
    title: "The Great Departure",
    subtitle: "Ghaziabad in the Pre-Dawn Hours",
    image: "https://images.unsplash.com/photo-1601920791548-bd0a29f848c4?w=800&h=1100&fit=crop&auto=format",
    category: "🚗 Road Journey",
    categoryColor: "#e07b39",
    duration: "~8–9 Hours Drive",
    distance: "~480 km to Jwalamukhi",
    highlights: ["Pre-Dawn Start", "Flexible Breaks", "Scenic Passes"],
    description: "Begin before sunrise for a magical pre-dawn drive through the plains and into the Himalayas. Pause for meals and breaks as needed, and watch the mountains gradually rise on the horizon.",
    tags: ["Pre-Dawn Departure", "June 12, 2026", "Comfort Breaks"],
  },
  {
    id: 3,
    day: "Day 1",
    dayNum: 1,
    title: "Hotel REEM",
    subtitle: "Your Jwalamukhi Haven",
    image: "https://images.unsplash.com/photo-1628699543232-dc241b48a4b3?w=800&h=1100&fit=crop&auto=format",
    category: "🏨 Night Stay",
    categoryColor: "#4a9d72",
    duration: "Around 4:00–4:30 PM",
    distance: "Jwalamukhi Town Centre",
    highlights: ["Mountain Views", "Local Cuisine", "Comfortable Rooms"],
    description: "Settle into Hotel REEM after a long day of travel, freshen up, and relax before heading to Jwalamukhi Temple and the local market. Rest well for tomorrow's adventures through the Kangra Valley.",
    tags: ["Freshen Up First", "June 12–13, 2026", "Breakfast Included"],
  },
  {
    id: 4,
    day: "Day 1",
    dayNum: 1,
    title: "Jwalamukhi Temple",
    subtitle: "The Temple of Eternal Flames",
    image: "https://images.unsplash.com/photo-1625072290979-cac544181be8?w=800&h=1100&fit=crop&auto=format",
    category: "🔥 Shakti Peeth",
    categoryColor: "#e07b39",
    duration: "Around 5:30–7:00 PM",
    distance: "Jwalamukhi Town",
    highlights: ["Eternal Flames", "Aarti Ceremony", "Local Market"],
    description: "Visit the temple after checking into the hotel and getting refreshed. Witness the miracle of natural gas flames burning from fissures in rock, then soak in the evening aarti atmosphere before exploring the locality.",
    tags: ["After Hotel Check-in", "Photography", "Spiritual"],
  },
  {
    id: 5,
    day: "Day 2",
    dayNum: 2,
    title: "Chamunda Devi Temple",
    subtitle: "Sacred Riverside Shrine",
    image: "https://images.unsplash.com/photo-1617469165786-8007eda3caa7?w=800&h=1100&fit=crop&auto=format",
    category: "🕉️ Temple Visit",
    categoryColor: "#e07b39",
    duration: "Around 10:00–11:30 AM",
    distance: "~30 km from Jwalamukhi",
    highlights: ["Riverside Darshan", "Valley Views", "Sacred Steps"],
    description: "Perched dramatically above a deep gorge of the Baner Khad river, Chamunda Devi temple radiates ancient power. The surrounding pine forests and river views make it an unforgettable spiritual experience.",
    tags: ["Late Morning Visit", "June 13, 2026", "Photography"],
  },
  {
    id: 6,
    day: "Day 2",
    dayNum: 2,
    title: "Kangra Fort",
    subtitle: "Ancient Kingdom of the Hills",
    image: "https://images.unsplash.com/photo-1656670610903-025312104457?w=800&h=1100&fit=crop&auto=format",
    category: "🏰 Optional Stop",
    categoryColor: "#8a9bb0",
    duration: "Around 12:00–1:30 PM",
    distance: "~25 km from Chamunda Devi",
    highlights: ["Ancient Ruins", "Valley Panoramas", "Mughal History"],
    description: "One of the oldest forts in India, Kangra Fort once held treasures that made it the richest kingdom in the subcontinent. If time permits, the panoramic views of the Kangra Valley from the ramparts are breathtaking.",
    tags: ["Optional", "Historical", "Viewpoint"],
  },
  {
    id: 7,
    day: "Day 2",
    dayNum: 2,
    title: "McLeod Ganj Arrival",
    subtitle: "Little Lhasa in the Himalayas",
    image: "https://images.unsplash.com/photo-1628070018796-a9f4e2dd482a?w=800&h=1100&fit=crop&auto=format",
    category: "🏔️ Hill Station",
    categoryColor: "#3a7bbf",
    duration: "Around 3:00–4:00 PM",
    distance: "~70 km from Kangra",
    highlights: ["Tibetan Culture", "Café Scene", "Prayer Flags"],
    description: "Arrive in McLeod Ganj, the vibrant home-in-exile of the Tibetan community. The air is fresh with pine and incense, the streets alive with monks, trekkers, and cafe culture set against the Dhauladhar peaks.",
    tags: ["June 13, 2026", "1,457m Elevation", "Vibrant Town"],
  },
  {
    id: 8,
    day: "Day 2",
    dayNum: 2,
    title: "Tsuglagkhang Complex",
    subtitle: "Dalai Lama's Sacred Space",
    image: "https://images.unsplash.com/photo-1503641926155-5c17619b79d0?w=800&h=1100&fit=crop&auto=format",
    category: "☸️ Buddhist Temple",
    categoryColor: "#c77dba",
    duration: "Around 4:30–5:30 PM",
    distance: "McLeod Ganj Centre",
    highlights: ["Main Temple", "Tibet Museum", "Prayer Wheels"],
    description: "The spiritual heart of the Tibetan exile community. Walk through spinning prayer wheels, watch monks in meditation, and visit the Tibet Museum. The panoramic views of the Kangra Valley from the temple grounds are stunning.",
    tags: ["Must Visit", "Photography", "Peaceful"],
  },
  {
    id: 9,
    day: "Day 2",
    dayNum: 2,
    title: "Bhagsu Waterfall",
    subtitle: "Hidden Gem Above McLeod",
    image: "https://images.unsplash.com/photo-1742281415579-fa5c7a169788?w=800&h=1100&fit=crop&auto=format",
    category: "💧 Nature Spot",
    categoryColor: "#3a7bbf",
    duration: "Around 5:30–6:30 PM",
    distance: "2 km from McLeod Ganj",
    highlights: ["Waterfall Trek", "Scenic Café", "Cool Mist"],
    description: "A short walk from the Bhagsu Nag temple leads to this stunning cascade tumbling through mountain rock. The famous Shiva Café perched above the waterfall offers incredible views with excellent food.",
    tags: ["Easy Trek", "Waterfall", "Family Friendly"],
  },
  {
    id: 10,
    day: "Day 2",
    dayNum: 2,
    title: "Hotel Woodz",
    subtitle: "Forest Retreat in McLeod Ganj",
    image: "https://images.unsplash.com/photo-1618772446265-3f9f8e6f8487?w=800&h=1100&fit=crop&auto=format",
    category: "🏨 Night Stay",
    categoryColor: "#4a9d72",
    duration: "Around 9:00 PM",
    distance: "McLeod Ganj / Bhagsu Area",
    highlights: ["Forest Views", "Mountain Air", "Cozy Rooms"],
    description: "Nestled among cedar and rhododendron trees, Hotel Woodz offers a serene escape after an exciting day. Wake up to misty mountain views and the sound of birds — the perfect base for exploring McLeod Ganj.",
    tags: ["Flexible Morning Checkout", "June 13–14, 2026", "Breakfast Included"],
  },
  {
    id: 11,
    day: "Day 3",
    dayNum: 3,
    title: "Homeward Bound",
    subtitle: "McLeod Ganj → Ghaziabad",
    image: "https://images.unsplash.com/photo-1626002547082-f12bc6b7a72b?w=800&h=1100&fit=crop&auto=format",
    category: "🚗 Return Journey",
    categoryColor: "#e07b39",
    duration: "~10–11 Hours Drive",
    distance: "~490 km",
    highlights: ["Mountain Morning", "Scenic Stops", "Valley Views"],
    description: "Depart later in the morning with hearts full of memories. Take breaks as needed along the way, enjoy the last glimpses of the Shivalik Range, and aim to reach Ghaziabad by evening.",
    tags: ["June 14, 2026", "Around 9:30–10:30 AM", "Evening Arrival"],
  },
  {
    id: 12,
    day: "Fin",
    dayNum: 0,
    title: "Till We Meet Again",
    subtitle: "Dhauladhar Calling",
    image: "https://images.unsplash.com/photo-1616942986550-ea6469c08530?w=800&h=1100&fit=crop&auto=format",
    category: "✨ Journey Complete",
    categoryColor: "#f4a461",
    duration: "3 Days / 2 Nights",
    distance: "~1,000+ km Round Trip",
    highlights: ["Sacred Temples Visited", "Mountains Conquered", "Memories Made"],
    description: "\"Collect moments, not things. Every road leads to a story worth remembering.\" — Thank you for traveling with us. The mountains will always be waiting.",
    tags: ["12–14 June 2026", "Family Memories", "Come Again"],
  },
];

interface CardProps {
  card: TravelCard;
  isTop: boolean;
  stackIndex: number;
  onSwipe: (id: number, direction: "left" | "right") => void;
}

function SwipeCard({ card, isTop, stackIndex, onSwipe }: CardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const opacity = useTransform(x, [-250, -150, 0, 150, 250], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [0, 80, 150], [0, 0.8, 1]);
  const nopeOpacity = useTransform(x, [-150, -80, 0], [1, 0.8, 0]);
  const scale = isTop ? 1 : Math.max(0.88, 1 - stackIndex * 0.04);
  const yOffset = isTop ? 0 : stackIndex * 14;

  function handleDragEnd(_: unknown, info: { offset: { x: number }; velocity: { x: number } }) {
    const threshold = 120;
    const velocity = info.velocity.x;
    const distance = info.offset.x;

    if (Math.abs(distance) > threshold || Math.abs(velocity) > 500) {
      const dir = distance > 0 || velocity > 0 ? "right" : "left";
      animate(x, dir === "right" ? 600 : -600, { duration: 0.35 });
      setTimeout(() => onSwipe(card.id, dir), 300);
    } else {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
    }
  }

  return (
    <motion.div
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
        scale,
        y: yOffset,
        zIndex: 20 - stackIndex,
        position: "absolute",
        width: "100%",
        height: "100%",
        touchAction: "none",
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={isTop ? handleDragEnd : undefined}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      whileHover={isTop ? { scale: 1.01 } : undefined}
      className="cursor-grab active:cursor-grabbing"
    >
      {/* Like / Nope stamps */}
      {isTop && (
        <>
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-10 left-6 z-30 rotate-[-25deg] border-4 border-[#4a9d72] rounded-lg px-4 py-1.5 select-none pointer-events-none"
          >
            <span className="text-[#4a9d72] font-black tracking-widest" style={{ fontFamily: "Inter", fontSize: 28 }}>SAVE ❤</span>
          </motion.div>
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-10 right-6 z-30 rotate-[25deg] border-4 border-[#e03d3d] rounded-lg px-4 py-1.5 select-none pointer-events-none"
          >
            <span className="text-[#e03d3d] font-black tracking-widest" style={{ fontFamily: "Inter", fontSize: 28 }}>SKIP ✕</span>
          </motion.div>
        </>
      )}

      {/* Card body */}
      <div className="w-full h-full rounded-3xl overflow-hidden relative shadow-2xl" style={{ background: "#13243a" }}>
        {/* Photo */}
        <div className="absolute inset-0">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, rgba(11,22,34,0.98) 0%, rgba(11,22,34,0.7) 45%, rgba(11,22,34,0.15) 75%, transparent 100%)"
          }} />
        </div>

        {/* Day badge */}
        <div className="absolute top-5 left-5 z-20">
          <span
            className="px-3 py-1 rounded-full text-white text-xs font-semibold tracking-wider"
            style={{ backgroundColor: card.categoryColor, fontFamily: "Inter" }}
          >
            {card.day !== "Cover" && card.day !== "Fin" ? card.day : "✦"}
          </span>
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          {/* Category badge */}
          <div className="mb-3">
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: card.categoryColor, fontFamily: "Inter" }}>
              {card.category}
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-white mb-1 leading-tight"
            style={{ fontFamily: "Playfair Display", fontSize: 28, fontWeight: 700 }}
          >
            {card.title}
          </h2>
          <p className="text-gray-300 mb-4 text-sm" style={{ fontFamily: "Inter" }}>
            {card.subtitle}
          </p>

          {/* Info row */}
          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-gray-400" />
              <span className="text-xs text-gray-300" style={{ fontFamily: "Inter" }}>{card.duration}</span>
            </div>
            {card.distance && (
              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="text-gray-400" />
                <span className="text-xs text-gray-300" style={{ fontFamily: "Inter" }}>{card.distance}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3" style={{ fontFamily: "Inter" }}>
            {card.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mb-3">
            {card.highlights.map((h) => (
              <span
                key={h}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.1)", color: "#f0ede8", fontFamily: "Inter", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {card.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded"
                style={{ color: card.categoryColor, fontFamily: "DM Mono", background: "rgba(255,255,255,0.05)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface CardStackProps {
  onComplete: () => void;
}

export function CardStack({ onComplete }: CardStackProps) {
  const [cards, setCards] = useState(CARDS);
  const [saved, setSaved] = useState<number[]>([]);
  const [lastSwipe, setLastSwipe] = useState<"left" | "right" | null>(null);
  const [actionFlash, setActionFlash] = useState<"left" | "right" | null>(null);
  const topCardX = useMotionValue(0);

  function handleSwipe(id: number, direction: "left" | "right") {
    if (direction === "right") setSaved((s) => [...s, id]);
    setLastSwipe(direction);
    setActionFlash(direction);
    setTimeout(() => setActionFlash(null), 600);
    setTimeout(() => {
      setCards((prev) => {
        const remaining = prev.filter((c) => c.id !== id);
        if (remaining.length === 0) onComplete();
        return remaining;
      });
    }, 350);
  }

  function triggerSwipe(dir: "left" | "right") {
    if (cards.length === 0) return;
    const top = cards[0];
    animate(topCardX, dir === "right" ? 600 : -600, { duration: 0.35 });
    setTimeout(() => handleSwipe(top.id, dir), 300);
  }

  const visibleCards = cards.slice(0, 4);
  const progress = ((CARDS.length - cards.length) / CARDS.length) * 100;

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
        <div className="text-6xl mb-2">🏔️</div>
        <h2 style={{ fontFamily: "Playfair Display", fontSize: 32, color: "#f0ede8", fontWeight: 700 }}>
          Your Trip is Ready!
        </h2>
        <p style={{ fontFamily: "Inter", color: "#8fa3bb", fontSize: 15 }}>
          You saved {saved.length} destination{saved.length !== 1 ? "s" : ""}.
          Explore the full itinerary below.
        </p>
        <button
          onClick={onComplete}
          className="px-8 py-3 rounded-full font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #e07b39, #f4a461)", fontFamily: "Inter" }}
        >
          View Full Itinerary
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full select-none">
      {/* Progress bar */}
      <div className="px-6 pt-2 pb-3">
        <div className="flex items-center justify-between mb-2">
          <span style={{ fontFamily: "DM Mono", fontSize: 11, color: "#8fa3bb" }}>
            {CARDS.length - cards.length} / {CARDS.length} EXPLORED
          </span>
          <span style={{ fontFamily: "DM Mono", fontSize: 11, color: "#4a9d72" }}>
            {saved.length} SAVED ♥
          </span>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #e07b39, #f4a461)" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Card stack area */}
      <div className="flex-1 relative px-4" style={{ minHeight: 0 }}>
        {/* Flash overlay */}
        {actionFlash && (
          <motion.div
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50 rounded-3xl pointer-events-none"
            style={{ background: actionFlash === "right" ? "rgba(74,157,114,0.3)" : "rgba(224,61,61,0.3)" }}
          />
        )}

        <div className="relative w-full h-full">
          {[...visibleCards].reverse().map((card, revIdx) => {
            const stackIndex = visibleCards.length - 1 - revIdx;
            return (
              <SwipeCard
                key={card.id}
                card={card}
                isTop={stackIndex === 0}
                stackIndex={stackIndex}
                onSwipe={handleSwipe}
              />
            );
          })}
        </div>
      </div>

      {/* Swipe hint */}
      <div className="text-center py-2">
        <p style={{ fontFamily: "Inter", fontSize: 12, color: "#8fa3bb" }}>
          Drag card or use buttons below
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-6 pb-4 pt-1">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => triggerSwipe("left")}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: "#1a2f45", border: "2px solid rgba(224,61,61,0.5)" }}
        >
          <X size={24} color="#e03d3d" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => triggerSwipe("right")}
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: "linear-gradient(135deg, #e07b39, #f4a461)" }}
        >
          <Heart size={26} color="white" fill="white" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => triggerSwipe("right")}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: "#1a2f45", border: "2px solid rgba(74,157,114,0.5)" }}
        >
          <Star size={22} color="#4a9d72" />
        </motion.button>
      </div>
    </div>
  );
}
