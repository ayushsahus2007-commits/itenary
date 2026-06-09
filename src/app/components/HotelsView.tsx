import { motion } from "motion/react";
import { MapPin, Clock, Wifi, Utensils, Mountain, Star } from "lucide-react";

const HOTELS = [
  {
    name: "Hotel REEM",
    location: "Jwalamukhi, Himachal Pradesh",
    night: "Night 1 — June 12–13, 2026",
    checkIn: "Late Afternoon (Flexible)",
    checkOut: "Morning",
    image: "https://images.unsplash.com/photo-1628699543232-dc241b48a4b3?w=800&h=500&fit=crop&auto=format",
    color: "#e07b39",
    rating: 4.1,
    priceRange: "₹1,500–₹2,500 / night",
    description: "A comfortable mid-range property steps from the Jwalamukhi temple complex. Known for its clean rooms, helpful staff, and easy access to the temple market. The hotel serves simple but satisfying local cuisine.",
    amenities: [
      { icon: <Wifi size={16} />, label: "Free WiFi" },
      { icon: <Utensils size={16} />, label: "Restaurant" },
      { icon: <Mountain size={16} />, label: "Valley Views" },
      { icon: <Star size={16} />, label: "Temple Proximity" },
    ],
    highlights: [
      "5-minute walk to Jwalamukhi Temple",
      "Free parking for private vehicles",
      "Himachali meals available on request",
      "24-hour reception",
      "Hot water — essential at altitude",
    ],
    tips: "Book in advance for summer season. Request a room facing the hills for better views.",
  },
  {
    name: "Hotel Woodz",
    location: "McLeod Ganj / Bhagsu Area, Dharamsala",
    night: "Night 2 — June 13–14, 2026",
    checkIn: "Afternoon / Evening (Flexible)",
    checkOut: "Morning",
    image: "https://images.unsplash.com/photo-1618772446265-3f9f8e6f8487?w=800&h=500&fit=crop&auto=format",
    color: "#4a9d72",
    rating: 4.3,
    priceRange: "₹2,000–₹3,500 / night",
    description: "A charming property nestled among the deodar cedar trees of McLeod Ganj, Hotel Woodz offers the quintessential Himalayan stay experience. The cool mountain air and forest ambiance make it a peaceful retreat after temple hopping and waterfall walks.",
    amenities: [
      { icon: <Wifi size={16} />, label: "Free WiFi" },
      { icon: <Utensils size={16} />, label: "Café & Dining" },
      { icon: <Mountain size={16} />, label: "Dhauladhar Views" },
      { icon: <Star size={16} />, label: "Forest Setting" },
    ],
    highlights: [
      "10-minute walk to Bhagsu Waterfall",
      "15-minute walk to Tsuglagkhang Complex",
      "Rooftop dining with mountain views",
      "Cozy wood-panelled interiors",
      "In-room heaters available (cool nights)",
    ],
    tips: "The hotel can arrange packed lunches and trekking guides. Ask for the Dhauladhar-facing room.",
  },
];

export function HotelsView() {
  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-3 pb-6" style={{ scrollbarWidth: "none" }}>
      <h2
        className="mb-1"
        style={{ fontFamily: "Playfair Display", fontSize: 22, fontWeight: 700, color: "#f0ede8" }}
      >
        Your Stays
      </h2>
      <p className="mb-4" style={{ fontFamily: "Inter", fontSize: 13, color: "#8fa3bb" }}>
        Curated accommodations for each night
      </p>

      {HOTELS.map((hotel, i) => (
        <motion.div
          key={hotel.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12 }}
          className="rounded-3xl overflow-hidden mb-6"
          style={{ background: "#13243a", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Hero Image */}
          <div className="relative" style={{ height: 200 }}>
            <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(19,36,58,1) 0%, transparent 60%)" }} />

            {/* Night badge */}
            <div className="absolute top-4 left-4">
              <span
                className="px-3 py-1.5 rounded-full text-white text-xs font-semibold"
                style={{ background: hotel.color, fontFamily: "Inter" }}
              >
                {hotel.night}
              </span>
            </div>

            {/* Rating */}
            <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.6)" }}>
              <Star size={12} fill="#f4a461" color="#f4a461" />
              <span style={{ fontFamily: "DM Mono", fontSize: 12, color: "#f4a461" }}>{hotel.rating}</span>
            </div>

            {/* Name */}
            <div className="absolute bottom-0 left-0 p-4">
              <h3 style={{ fontFamily: "Playfair Display", fontSize: 22, fontWeight: 700, color: "#f0ede8" }}>
                {hotel.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin size={12} color="#8fa3bb" />
                <span style={{ fontFamily: "Inter", fontSize: 12, color: "#8fa3bb" }}>{hotel.location}</span>
              </div>
            </div>
          </div>

          <div className="p-4">
            {/* Check-in/out */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.05)" }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock size={12} color={hotel.color} />
                  <span style={{ fontFamily: "DM Mono", fontSize: 10, color: hotel.color }}>CHECK-IN</span>
                </div>
                <p style={{ fontFamily: "Inter", fontSize: 13, color: "#f0ede8", fontWeight: 500 }}>{hotel.checkIn}</p>
              </div>
              <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.05)" }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock size={12} color="#8fa3bb" />
                  <span style={{ fontFamily: "DM Mono", fontSize: 10, color: "#8fa3bb" }}>CHECK-OUT</span>
                </div>
                <p style={{ fontFamily: "Inter", fontSize: 13, color: "#f0ede8", fontWeight: 500 }}>{hotel.checkOut}</p>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontFamily: "Inter", fontSize: 12, color: "#8fa3bb" }}>Estimated Cost</span>
              <span style={{ fontFamily: "DM Mono", fontSize: 14, color: hotel.color, fontWeight: 500 }}>{hotel.priceRange}</span>
            </div>

            {/* Description */}
            <p className="mb-4" style={{ fontFamily: "Inter", fontSize: 13, color: "#a8b8cc", lineHeight: 1.65 }}>
              {hotel.description}
            </p>

            {/* Amenities */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {hotel.amenities.map((a, j) => (
                <div key={j} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: `${hotel.color}15` }}>
                  <span style={{ color: hotel.color }}>{a.icon}</span>
                  <span style={{ fontFamily: "Inter", fontSize: 12, color: "#f0ede8" }}>{a.label}</span>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="mb-4">
              <h4 className="mb-2" style={{ fontFamily: "Inter", fontSize: 12, fontWeight: 600, color: "#8fa3bb", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Highlights
              </h4>
              {hotel.highlights.map((h, j) => (
                <div key={j} className="flex gap-2 mb-1.5">
                  <span style={{ color: hotel.color, fontSize: 16, lineHeight: 1.2 }}>✓</span>
                  <span style={{ fontFamily: "Inter", fontSize: 13, color: "#a8b8cc" }}>{h}</span>
                </div>
              ))}
            </div>

            {/* Tip */}
            <div className="rounded-xl p-3" style={{ background: `${hotel.color}18`, border: `1px solid ${hotel.color}30` }}>
              <p style={{ fontFamily: "Inter", fontSize: 12, color: "#a8b8cc", lineHeight: 1.5 }}>
                💡 <span style={{ color: hotel.color, fontWeight: 500 }}>Pro Tip:</span> {hotel.tips}
              </p>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Booking reminder */}
      <div className="rounded-2xl p-4" style={{ background: "rgba(244,164,97,0.1)", border: "1px solid rgba(244,164,97,0.3)" }}>
        <h4 className="mb-2" style={{ fontFamily: "Playfair Display", fontSize: 16, fontWeight: 600, color: "#f4a461" }}>
          📋 Booking Checklist
        </h4>
        {["Book both hotels at least 2 weeks in advance", "Confirm arrival window with the hotel before departure", "Request extra blankets for cool June nights", "Carry printed booking confirmation"].map((item, i) => (
          <div key={i} className="flex gap-2 mb-1.5 last:mb-0">
            <span style={{ color: "#f4a461" }}>□</span>
            <span style={{ fontFamily: "Inter", fontSize: 13, color: "#a8b8cc" }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
