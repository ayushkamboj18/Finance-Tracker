import { useSummaryStats } from '../../hooks/useFinance';
import { overviewCardTemplates } from '../../data/cardConfig';

export default function OverviewCards({ cardIndex = null }) {
  const stats = useSummaryStats();

  const cards = [
    { ...overviewCardTemplates[0], value: stats.totalBalance },
    { ...overviewCardTemplates[1], value: stats.totalIncome },
    { ...overviewCardTemplates[2], value: stats.totalExpense },
    { ...overviewCardTemplates[3], value: stats.transactionCount },
  ];

  const CardItem = ({ card, index }) => (
    <div
      className="relative rounded-2xl bg-zinc-950 overflow-hidden p-8 hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]"
      style={{
        border: `1px solid ${card.accentBorder}`,
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: card.accent }}
      />
      <div
        className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: card.accent }}
      />

      {/* Content */}
      <div className="relative z-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-white/25">
            {card.title}
          </p>
          {/* Symbol badge */}
          <span
            className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black border"
            style={{
              color: card.accent,
              backgroundColor: card.accentDim,
              borderColor: card.accentBorder,
            }}
          >
            {card.symbol}
          </span>
        </div>

        {/* Value */}
        <p
          className="text-4xl font-black tracking-tight mb-2 leading-none"
          style={{ color: card.accent }}
        >
          {card.isCount
            ? card.value.toLocaleString()
            : `₹${card.value.toLocaleString('en-IN')}`}
        </p>

        {/* Label */}
        <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mt-3">
          {card.isCount ? 'Total Transactions' : 'Total Amount'}
        </p>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 opacity-40"
          style={{
            background: `linear-gradient(to right, transparent, ${card.accent}, transparent)`,
          }}
        />
      </div>
    </div>
  );

  if (cardIndex !== null) {
    return (
      <div className="w-full">
        <CardItem card={cards[cardIndex]} index={cardIndex} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 animate-slide-in-up max-w-6xl mx-auto w-full">
      {cards.map((card, index) => (
        <CardItem key={card.title} card={card} index={index} />
      ))}
    </div>
  );
}