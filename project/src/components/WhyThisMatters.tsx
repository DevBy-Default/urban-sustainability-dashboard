import { ShieldCheck, Ruler, Users } from "lucide-react";

const cards = [
  {
    icon: ShieldCheck,
    title: "Municipal Officers",
    description:
      "Identify cities requiring environmental intervention and prioritize investments. Use comparative data to allocate resources for pollution control and green infrastructure development.",
    gradient: "from-blue-500 to-blue-600",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    bg: "bg-gradient-to-br from-blue-50 to-white",
    border: "border-blue-100",
  },
  {
    icon: Ruler,
    title: "Urban Planners",
    description:
      "Understand sustainability patterns and benchmark city performance. Correlate environmental metrics with urban development outcomes to build more resilient cities.",
    gradient: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    bg: "bg-gradient-to-br from-emerald-50 to-white",
    border: "border-emerald-100",
  },
  {
    icon: Users,
    title: "Citizens",
    description:
      "Compare cities using health, livability and environmental indicators. Advocate for better urban policies, cleaner air, and more green spaces in your community.",
    gradient: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    bg: "bg-gradient-to-br from-amber-50 to-white",
    border: "border-amber-100",
  },
];

export default function WhyThisMatters() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-fade-in-up stagger-7">
      <div className="px-5 pt-5 pb-3">
        <h3 className="text-sm font-semibold text-gray-800">Why This Matters</h3>
        <p className="text-[11px] text-gray-400 mt-0.5">How different stakeholders benefit from this data</p>
      </div>
      <div className="px-5 pb-5 grid grid-cols-1 gap-3">
        {cards.map(card => (
          <div
            key={card.title}
            className={`${card.bg} ${card.border} border rounded-xl p-4 card-hover`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 ${card.iconBg} rounded-lg flex items-center justify-center shrink-0`}>
                <card.icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-gray-800 mb-1">{card.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
