import { useSpendingByCategory } from '../../hooks/useFinance';
import { getCategoryColor } from '../../data/mockData';
import { useState, useEffect } from 'react';

function DonutChart({ data, total }) {
  const SIZE = 160;
  const STROKE = 13;
  const R = (SIZE - STROKE) / 2;
  const CIRC = 2 * Math.PI * R;
  const GAP = 4;

  let accumulated = 0;
  const segments = data.map((item) => {
    const fraction = item.amount / total;
    const arcLen = fraction * CIRC - GAP;
    const offset = CIRC - accumulated * CIRC;
    accumulated += fraction;
    return { arcLen, offset, color: getCategoryColor(item.category), fraction };
  });

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      style={{ transform: 'rotate(-90deg)' }}
    >
      <circle
        cx={SIZE / 2} cy={SIZE / 2} r={R}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={STROKE}
      />
      {segments.map((seg, i) => (
        <circle
          key={i}
          cx={SIZE / 2} cy={SIZE / 2} r={R}
          fill="none"
          stroke={seg.color}
          strokeWidth={STROKE}
          strokeDasharray={`${Math.max(seg.arcLen, 0)} ${CIRC}`}
          strokeDashoffset={seg.offset}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 5px ${seg.color}70)` }}
        />
      ))}
    </svg>
  );
}

export default function CategoryChart() {
  const data = useSpendingByCategory();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  if (data.length === 0) {
    return (
      <div className="relative rounded-3xl bg-zinc-950 border border-white/5 p-10 flex flex-col items-center justify-center h-full min-h-64 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-transparent to-cyan-950/10 pointer-events-none" />
        <span className="text-4xl opacity-20 mb-3">◌</span>
        <p className="text-xs tracking-[0.2em] uppercase text-white/20 font-mono">No data available</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.amount, 0);
  const avg = Math.round(total / data.length);
  const topCategory = data.reduce((a, b) => (a.amount > b.amount ? a : b));

  return (
    <div className="relative rounded-3xl bg-zinc-950 border border-white/[0.06] p-8 overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]">

      {/* Ambient glow background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 right-0 w-72 h-72 rounded-full bg-violet-600/[0.07] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-cyan-600/[0.05] blur-3xl" />
      </div>

      {/* ── HEADER ── */}
      <div className="relative flex justify-between items-start mb-8">
        <div>
          <p className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-white/25 font-mono mb-2">
            <span className="inline-block w-5 h-px bg-white/20" />
            Expenditure
          </p>
          <h2 className="text-2xl font-black tracking-tight leading-none text-white/90">
            Spending<br />
            <span className="text-white/40">Breakdown</span>
          </h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] tracking-[0.18em] uppercase text-white/25 font-mono mb-1">Total Spent</p>
          <p className="text-3xl font-black tracking-tight text-white leading-none">
            <span className="text-lg font-normal text-white/40 mr-0.5">₹</span>
            {total.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* ── DONUT + LEGEND ── */}
      <div className="relative flex items-center gap-7 mb-8">
        {/* Ring */}
        <div className="relative flex-shrink-0 w-40 h-40">
          <DonutChart data={data} total={total} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-white leading-none">{data.length}</span>
            <span className="text-[9px] tracking-[0.18em] uppercase text-white/25 font-mono mt-1">categories</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 flex flex-col gap-2.5">
          {data.slice(0, 5).map((item) => {
            const pct = ((item.amount / total) * 100).toFixed(1);
            const color = getCategoryColor(item.category);
            return (
              <div key={item.category} className="flex items-center gap-2.5 group cursor-default">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0 transition-transform duration-200 group-hover:scale-125"
                  style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
                />
                <span className="flex-1 text-[11px] font-mono text-white/45 truncate group-hover:text-white/70 transition-colors duration-200">
                  {item.category}
                </span>
                <span className="text-[11px] font-mono text-white/20">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="relative h-px mb-7 bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* ── BAR ROWS ── */}
      <div className="relative flex flex-col gap-4">
        {data.map((item, index) => {
          const pct = (item.amount / total) * 100;
          const color = getCategoryColor(item.category);
          return (
            <div
              key={item.category}
              className="transition-all duration-500"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(8px)',
                transitionDelay: `${100 + index * 60}ms`,
              }}
            >
              {/* Label row */}
              <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-[13px] font-bold text-white/80 tracking-tight">{item.category}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-[13px] font-mono font-medium text-white/70">
                    ₹{item.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] font-mono text-white/20">{pct.toFixed(1)}%</span>
                </div>
              </div>

              {/* Bar track */}
              <div className="relative h-1 bg-white/[0.05] rounded-full">
                <div
                  className="absolute left-0 top-0 h-full rounded-full transition-all duration-[900ms] ease-out"
                  style={{
                    width: mounted ? `${pct}%` : '0%',
                    background: `linear-gradient(90deg, ${color}80, ${color})`,
                    boxShadow: `0 0 8px ${color}50`,
                    transitionDelay: `${150 + index * 60}ms`,
                  }}
                >
                  {/* Tip dot */}
                  <span
                    className="absolute -right-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 8px ${color}, 0 0 16px ${color}60`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── FOOTER STATS ── */}
      <div className="relative mt-8 pt-6 border-t border-white/[0.05] grid grid-cols-3">
        {[
          { value: data.length, label: 'Categories' },
          { value: `₹${avg.toLocaleString('en-IN')}`, label: 'Avg / Cat' },
          { value: topCategory.category.split(' ')[0], label: 'Top Category' },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={`text-center px-4 ${i < 2 ? 'border-r border-white/[0.05]' : ''}`}
          >
            <p className="text-xl font-mono font-medium text-white/80 tracking-tight truncate">{stat.value}</p>
            <p className="text-[9px] tracking-[0.18em] uppercase text-white/20 font-mono mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}