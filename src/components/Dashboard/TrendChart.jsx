import { useDailyBalanceTrend } from '../../hooks/useFinance';
import { useState, useRef, useEffect } from 'react';

export default function TrendChart() {
  const data = useDailyBalanceTrend();
  const [mounted, setMounted] = useState(false);
  const [tooltip, setTooltip] = useState(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  if (data.length === 0) {
    return (
      <div className="relative rounded-3xl bg-zinc-950 border border-white/5 p-10 flex flex-col items-center justify-center h-full min-h-64 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-transparent to-blue-950/10 pointer-events-none" />
        <span className="text-4xl opacity-20 mb-3">◌</span>
        <p className="text-xs tracking-[0.2em] uppercase text-white/25 font-mono">No balance data</p>
      </div>
    );
  }

  const minBalance = Math.min(...data.map((d) => d.balance));
  const maxBalance = Math.max(...data.map((d) => d.balance));
  const range = maxBalance - minBalance || 1;
  const pad = range * 0.15;
  const scaledMin = minBalance - pad;
  const scaledMax = maxBalance + pad;

  const W = 560;
  const H = 220;
  const ML = 0;
  const MR = 0;
  const MT = 16;
  const MB = 0;
  const cW = W - ML - MR;
  const cH = H - MT - MB;

  const xS = (i) => (i / (data.length - 1)) * cW;
  const yS = (v) => cH - ((v - scaledMin) / (scaledMax - scaledMin)) * cH;

  const pts = data.map((d, i) => [xS(i), MT + yS(d.balance)]);
  const lineD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  const areaD = `${lineD} L ${pts[pts.length - 1][0]} ${H} L ${pts[0][0]} ${H} Z`;

  const lastBalance = data[data.length - 1].balance;
  const firstBalance = data[0].balance;
  const isUp = lastBalance >= firstBalance;
  const changePct = (((lastBalance - firstBalance) / Math.abs(firstBalance)) * 100).toFixed(1);

  const yTicks = [0, 0.33, 0.66, 1].map((f) => ({
    y: MT + f * cH,
    val: Math.round(scaledMax - f * (scaledMax - scaledMin)),
  }));

  const xLabelStep = Math.max(1, Math.floor(data.length / 5));
  const xLabels = data
    .map((d, i) => ({ i, label: d.date }))
    .filter((_, i) => i % xLabelStep === 0 || i === data.length - 1);

  const accentColor = isUp ? '#34d399' : '#f87171';
  const accentDim = isUp ? '#34d39920' : '#f8717120';

  return (
    <div
      className="relative rounded-3xl bg-zinc-950 p-10 overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]"
      style={{ border: `1px solid ${accentColor}30` }}
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-10 right-10 w-80 h-80 rounded-full blur-3xl opacity-[0.07]"
          style={{ backgroundColor: accentColor }}
        />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-600/[0.04] blur-3xl" />
      </div>

      {/* ── HEADER ── */}
      <div className="relative flex justify-between items-start mb-10">
        <div>
          <p className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-white/25 font-mono mb-2">
            <span className="inline-block w-5 h-px bg-white/20" />
            Analytics
          </p>
          <h2 className="text-2xl font-black tracking-tight leading-none text-white/90">
            Balance<br />
            <span className="text-white/40">Trend</span>
          </h2>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-medium border"
            style={{
              color: accentColor,
              backgroundColor: accentDim,
              borderColor: `${accentColor}30`,
            }}
          >
            <span className="text-base leading-none">{isUp ? '↑' : '↓'}</span>
            {isUp ? '+' : ''}{changePct}%
          </span>
          <div className="text-right">
            <p className="text-[10px] tracking-[0.18em] uppercase text-white/100 font-mono mb-0.5">Current</p>
            <p className="text-2xl font-black tracking-tight text-white leading-none">
              <span className="text-base font-normal text-white/100 mr-0.5">₹</span>
              {lastBalance.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>

      {/* ── SVG CHART ── */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-4 pr-2 pointer-events-none">
          {yTicks.map((t, i) => (
            <span key={i} className="text-[9px] font-mono text-white/40 leading-none">
              ₹{t.val.toLocaleString('en-IN')}
            </span>
          ))}
        </div>

        <div className="ml-14 overflow-x-auto py-2">
          <svg
            ref={svgRef}
            width={W}
            height={H}
            viewBox={`0 0 ${W} ${H}`}
            className="block"
          >
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accentColor} stopOpacity="0.18" />
                <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
                <stop offset="50%" stopColor={accentColor} stopOpacity="1" />
                <stop offset="100%" stopColor={accentColor} stopOpacity="0.6" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Horizontal grid lines */}
            {yTicks.map((t, i) => (
              <line
                key={i}
                x1={0} y1={t.y}
                x2={W} y2={t.y}
                stroke="rgba(255,255,255,0.04)"
                strokeDasharray="4 6"
              />
            ))}

            {/* Area fill */}
            <path
              d={areaD}
              fill="url(#areaGrad)"
              style={{
                opacity: mounted ? 1 : 0,
                transition: 'opacity 0.8s ease',
              }}
            />

            {/* Line */}
            <path
              d={lineD}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              style={{
                strokeDasharray: mounted ? 'none' : '2000',
                strokeDashoffset: mounted ? '0' : '2000',
                transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)',
              }}
            />

            {/* Data points */}
            {data.map((d, i) => (
              <g key={i}>
                <circle
                  cx={pts[i][0]}
                  cy={pts[i][1]}
                  r="16"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() =>
                    setTooltip({ i, x: pts[i][0], y: pts[i][1], date: d.date, balance: d.balance })
                  }
                  onMouseLeave={() => setTooltip(null)}
                />
                {(i === 0 || i === data.length - 1 || tooltip?.i === i) && (
                  <circle
                    cx={pts[i][0]}
                    cy={pts[i][1]}
                    r={tooltip?.i === i ? 5 : 3.5}
                    fill={accentColor}
                    style={{ filter: `drop-shadow(0 0 6px ${accentColor})` }}
                  />
                )}
              </g>
            ))}

            {/* Tooltip */}
            {tooltip && (() => {
              const tw = 130;
              const th = 46;
              const tx = Math.min(Math.max(tooltip.x - tw / 2, 4), W - tw - 4);
              const ty = tooltip.y - th - 14;
              return (
                <g>
                  <rect
                    x={tx} y={ty}
                    width={tw} height={th}
                    rx="8"
                    fill="#18181b"
                    stroke={`${accentColor}40`}
                    strokeWidth="1"
                  />
                  <text x={tx + tw / 2} y={ty + 15} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="monospace" letterSpacing="1">
                    {tooltip.date}
                  </text>
                  <text x={tx + tw / 2} y={ty + 34} textAnchor="middle" fill={accentColor} fontSize="13" fontWeight="700" fontFamily="monospace">
                    ₹{tooltip.balance.toLocaleString('en-IN')}
                  </text>
                </g>
              );
            })()}

            {/* X-axis labels */}
            {xLabels.map(({ i, label }) => (
              <text
                key={i}
                x={pts[i][0]}
                y={H - 2}
                textAnchor="middle"
                fill="rgba(255,255,255,0.18)"
                fontSize="9"
                fontFamily="monospace"
              >
                {label}
              </text>
            ))}
          </svg>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="relative h-px my-8 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── FOOTER STATS ── */}
      <div className="relative grid grid-cols-3">
        {[
          {
            value: `₹${minBalance.toLocaleString('en-IN')}`,
            label: 'Period Low',
            color: '#f87171',
          },
          {
            value: `₹${maxBalance.toLocaleString('en-IN')}`,
            label: 'Period High',
            color: '#34d399',
          },
          {
            value: `${data.length}d`,
            label: 'Duration',
            color: 'rgba(255,255,255,0.6)',
          },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={`text-center px-6 py-2 ${i < 2 ? 'border-r border-white/10' : ''}`}
          >
            <p
              className="text-xl font-mono font-medium tracking-tight truncate"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
            <p className="text-[9px] tracking-[0.18em] uppercase text-white/20 font-mono mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}