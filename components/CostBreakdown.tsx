import React from 'react';

const costData = {
  "goal": 25000,
  "title": "🔥 On The RoX – Donation Allocation 🔥",
  "sections": [
    {
      "name": "Core Gear (6 Hunters)",
      "items": [
        {"label": "Boards", "costPerUnit": 600, "quantity": 6, "icon": "🛹", "color": "#A2FF00"},
        {"label": "AR Glasses", "costPerUnit": 500, "quantity": 6, "icon": "👓", "color": "#FF00FF"},
        {"label": "Drones", "costPerUnit": 500, "quantity": 6, "icon": "🚁", "color": "#00FFFF"},
        {"label": "360° Cameras", "costPerUnit": 300, "quantity": 6, "icon": "📷", "color": "#FF1493"}
      ],
      "subtotal": 11400,
      "displayStyle": "neon-table"
    },
    {
      "name": "Operations / Event",
      "items": [
        {"label": "Licenses & Permits", "range": [6000, 6000], "icon": "📑", "color": "#FFD700"},
        {"label": "Lighthouse Venue", "range": [1000, 1000], "icon": "🌅", "color": "#FF4500"}
      ],
      "subtotalRange": [7000, 7000],
      "displayStyle": "neon-table"
    },
    {
      "name": "Tech Development",
      "items": [
        {"label": "AR Marker App", "range": [3000, 5000], "icon": "🧩", "color": "#00FF7F"}
      ],
      "subtotalRange": [3000, 5000],
      "displayStyle": "neon-table"
    }
  ],
  "remaining": {
    "range": [1600, 3600],
    "description": "These funds go toward livestream setup, marketing, and player rewards.",
    "color": "#FF69B4"
  },
  "tips": [
    "Hover over any item to see what your donation covers!",
    "Progress bars update in real time as donations come in.",
    "Ranges show minimum & maximum estimates for flexible planning."
  ]
};

const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);


export const CostBreakdown: React.FC = () => {
    return (
        <div className="bg-dark-accent/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-primary/20 max-w-4xl mx-auto animate-pop-in">
            <h2 className="text-3xl font-bold text-center text-light mb-8">{costData.title}</h2>

            <div className="space-y-8">
                {costData.sections.map((section, index) => (
                    <div key={index}>
                        <h3 className="text-xl font-bold text-primary tracking-wider mb-4 pb-2 border-b-2 border-primary/20">{section.name}</h3>
                        <ul className="space-y-2">
                            {section.items.map((item: any) => {
                                const costText = item.costPerUnit
                                    ? <><span className="text-light/70">{formatCurrency(item.costPerUnit)} x {item.quantity}</span> = {formatCurrency(item.costPerUnit * item.quantity)}</>
                                    : item.range[0] === item.range[1]
                                    ? formatCurrency(item.range[0])
                                    : `${formatCurrency(item.range[0])} - ${formatCurrency(item.range[1])}`;

                                return (
                                    <li key={item.label} className="flex flex-wrap items-center justify-between py-3 border-b border-primary/10 transition-colors hover:bg-primary/10 px-2 -mx-2 rounded-md" title="Your donation helps cover this cost!">
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-4" style={{ color: item.color }}>{item.icon}</span>
                                            <span className="font-medium text-light/90 text-lg">{item.label}</span>
                                        </div>
                                        <div className="text-light font-mono text-base sm:text-lg whitespace-nowrap pl-4 font-semibold">
                                            {costText}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                         <div className="text-right mt-3 pr-2">
                            <span className="text-light/80 font-semibold">Subtotal: </span>
                            <span className="font-bold text-secondary text-lg">
                                {section.subtotal ? formatCurrency(section.subtotal) : `${formatCurrency(section.subtotalRange[0])} - ${formatCurrency(section.subtotalRange[1])}`}
                            </span>
                        </div>
                    </div>
                ))}

                <div>
                    <h3 className="text-xl font-bold tracking-wider mb-4 pb-2 border-b-2 border-primary/20" style={{color: costData.remaining.color}}>Remaining Allocation</h3>
                    <div className="bg-black/20 p-4 rounded-lg flex items-center justify-between">
                         <p className="text-light/80 max-w-md">{costData.remaining.description}</p>
                         <p className="font-mono text-lg font-bold text-light">{`${formatCurrency(costData.remaining.range[0])} - ${formatCurrency(costData.remaining.range[1])}`}</p>
                    </div>
                </div>
            </div>

            <div className="mt-10 border-t-2 border-dashed border-secondary/20 pt-6">
                <div className="flex items-start">
                    <LightbulbIcon className="w-10 h-10 text-secondary mr-4 flex-shrink-0"/>
                    <div>
                        <h4 className="font-bold text-lg text-secondary">Pro Tips</h4>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-light/70 text-sm">
                            {costData.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
