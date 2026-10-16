import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import SectionHeading from './SectionHeading';

type DatasetKey = 'accuracy' | 'throughput';

interface DataPoint {
  label: string;
  value: number;
}

const datasets: Record<DatasetKey, { label: string; unit: string; data: DataPoint[] }> = {
  accuracy: {
    label: 'Model Accuracy (%)',
    unit: '%',
    data: [
      { label: 'Logistic', value: 82 },
      { label: 'Random Forest', value: 89 },
      { label: 'XGBoost', value: 93 },
      { label: 'Ensemble', value: 95 },
      { label: 'Tuned', value: 97 },
    ],
  },
  throughput: {
    label: 'Inference Throughput (req/s)',
    unit: ' req/s',
    data: [
      { label: 'Batch 1', value: 120 },
      { label: 'Batch 8', value: 210 },
      { label: 'Batch 32', value: 280 },
      { label: 'Batch 64', value: 260 },
      { label: 'Batch 128', value: 240 },
    ],
  },
};

const CHART_W = 520;
const CHART_H = 260;
const PAD = { top: 24, right: 24, bottom: 36, left: 44 };

export default function DataViz() {
  const [datasetKey, setDatasetKey] = useState<DatasetKey>('accuracy');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dataset = datasets[datasetKey];
  const { data } = dataset;

  const innerW = CHART_W - PAD.left - PAD.right;
  const innerH = CHART_H - PAD.top - PAD.bottom;
  const maxVal = Math.max(...data.map((d) => d.value));
  const yMax = Math.ceil(maxVal / 10) * 10 + 10;
  const barWidth = innerW / data.length * 0.5;
  const barGap = innerW / data.length;

  const yTicks = useMemo(() => {
    const ticks: number[] = [];
    const step = yMax / 4;
    for (let i = 0; i <= 4; i++) ticks.push(Math.round(step * i));
    return ticks;
  }, [yMax]);

  const xForBar = useCallback(
    (i: number) => PAD.left + barGap * i + (barGap - barWidth) / 2,
    [barGap, barWidth],
  );

  const yForValue = useCallback(
    (v: number) => PAD.top + innerH - (v / yMax) * innerH,
    [innerH, yMax],
  );

  // Line chart points
  const linePoints = useMemo(
    () =>
      data.map((d, i) => ({
        x: PAD.left + barGap * i + barGap / 2,
        y: PAD.top + innerH - (d.value / yMax) * innerH,
        ...d,
      })),
    [data, barGap, innerH, yMax],
  );

  const linePath = useMemo(() => {
    if (linePoints.length === 0) return '';
    return linePoints
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(' ');
  }, [linePoints]);

  const areaPath = useMemo(() => {
    if (linePoints.length === 0) return '';
    const base = PAD.top + innerH;
    return (
      `M ${linePoints[0].x.toFixed(1)} ${base} ` +
      linePoints.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') +
      ` L ${linePoints[linePoints.length - 1].x.toFixed(1)} ${base} Z`
    );
  }, [linePoints, innerH]);

  const pathLength = useMemo(() => {
    if (typeof window === 'undefined' || !linePath) return 1000;
    const ns = 'http://www.w3.org/2000/svg';
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', linePath);
    return path.getTotalLength();
  }, [linePath]);

  const switchDataset = (key: DatasetKey) => {
    if (key === datasetKey) return;
    setHoverIndex(null);
    setDatasetKey(key);
  };

  return (
    <section ref={sectionRef} id="data-viz" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading sectionNumber="05" title="Data in Motion" />

        <p className="text-sm text-gray-400 mt-6 max-w-2xl leading-relaxed">
          A glimpse of how data transforms into insight — illustrative charts with
          interactive hover details.
        </p>

        {/* Toggle */}
        <div className="flex items-center gap-2 mt-8 mb-8">
          <div className="inline-flex p-1 bg-[#111827] border border-white/5 rounded-lg">
            {(Object.keys(datasets) as DatasetKey[]).map((key) => (
              <button
                key={key}
                onClick={() => switchDataset(key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400/40 ${
                  datasetKey === key
                    ? 'bg-sky-500/20 text-sky-300'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                aria-pressed={datasetKey === key}
              >
                {key === 'accuracy' ? (
                  <span className="inline-flex items-center gap-1.5">
                    <BarChart3 size={13} /> Accuracy
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5">
                    <TrendingUp size={13} /> Throughput
                  </span>
                )}
              </button>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">{dataset.label}</span>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-5 md:gap-6">
          {/* Bar chart */}
          <div className="bg-[#111827] border border-white/5 rounded-xl p-6 hover:border-sky-400/20 transition-colors duration-300">
            <h3 className="text-sm font-semibold text-white mb-1">Bar Chart</h3>
            <p className="text-xs text-gray-500 mb-4">{dataset.label}</p>
            <div className="w-full overflow-x-auto">
              <svg
                viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                className="w-full h-auto"
                style={{ minWidth: 300 }}
                role="img"
                aria-label={`Bar chart showing ${dataset.label}`}
              >
                {/* Y grid lines */}
                {yTicks.map((tick) => {
                  const y = PAD.top + innerH - (tick / yMax) * innerH;
                  return (
                    <g key={tick}>
                      <line
                        x1={PAD.left}
                        y1={y}
                        x2={CHART_W - PAD.right}
                        y2={y}
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth={1}
                      />
                      <text
                        x={PAD.left - 8}
                        y={y + 4}
                        textAnchor="end"
                        className="fill-gray-500"
                        style={{ fontSize: 10 }}
                      >
                        {tick}
                      </text>
                    </g>
                  );
                })}

                {/* Bars */}
                {data.map((d, i) => {
                  const x = xForBar(i);
                  const y = yForValue(d.value);
                  const h = PAD.top + innerH - y;
                  const isHovered = hoverIndex === i;
                  return (
                    <g key={d.label}>
                      <rect
                        x={x}
                        y={inView || prefersReducedMotion ? y : PAD.top + innerH}
                        width={barWidth}
                        height={inView || prefersReducedMotion ? h : 0}
                        rx={3}
                        fill={isHovered ? 'url(#barGradientHover)' : 'url(#barGradient)'}
                        style={{
                          transition: prefersReducedMotion
                            ? 'none'
                            : 'y 0.8s cubic-bezier(0.22,1,0.36,1), height 0.8s cubic-bezier(0.22,1,0.36,1), fill 0.2s ease',
                          transitionDelay: prefersReducedMotion ? '0s' : `${i * 0.08}s`,
                        }}
                        onMouseEnter={() => setHoverIndex(i)}
                        onMouseLeave={() => setHoverIndex(null)}
                        className="cursor-pointer focus:outline-none"
                        tabIndex={0}
                        onFocus={() => setHoverIndex(i)}
                        onBlur={() => setHoverIndex(null)}
                      />
                      <text
                        x={x + barWidth / 2}
                        y={CHART_H - PAD.bottom + 16}
                        textAnchor="middle"
                        className="fill-gray-500"
                        style={{ fontSize: 10 }}
                      >
                        {d.label.length > 10 ? d.label.slice(0, 8) + '…' : d.label}
                      </text>
                    </g>
                  );
                })}

                {/* Tooltip for bar */}
                {hoverIndex !== null && (
                  <g style={{ pointerEvents: 'none' }}>
                    {(() => {
                      const d = data[hoverIndex];
                      const x = xForBar(hoverIndex) + barWidth / 2;
                      const y = yForValue(d.value) - 10;
                      const tw = 56;
                      const tx = Math.max(PAD.left, Math.min(x - tw / 2, CHART_W - PAD.right - tw));
                      return (
                        <>
                          <rect
                            x={tx}
                            y={y - 22}
                            width={tw}
                            height={20}
                            rx={4}
                            fill="#1e293b"
                            stroke="rgba(56,189,248,0.3)"
                            strokeWidth={1}
                          />
                          <text
                            x={tx + tw / 2}
                            y={y - 8}
                            textAnchor="middle"
                            className="fill-sky-300"
                            style={{ fontSize: 10, fontWeight: 600 }}
                          >
                            {d.value}{dataset.unit}
                          </text>
                        </>
                      );
                    })()}
                  </g>
                )}

                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(56,189,248,0.8)" />
                    <stop offset="100%" stopColor="rgba(56,189,248,0.15)" />
                  </linearGradient>
                  <linearGradient id="barGradientHover" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(56,189,248,1)" />
                    <stop offset="100%" stopColor="rgba(99,102,241,0.4)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Line chart */}
          <div className="bg-[#111827] border border-white/5 rounded-xl p-6 hover:border-violet-400/20 transition-colors duration-300">
            <h3 className="text-sm font-semibold text-white mb-1">Line Chart</h3>
            <p className="text-xs text-gray-500 mb-4">{dataset.label}</p>
            <div className="w-full overflow-x-auto">
              <svg
                viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                className="w-full h-auto"
                style={{ minWidth: 300 }}
                role="img"
                aria-label={`Line chart showing ${dataset.label}`}
              >
                {/* Y grid lines */}
                {yTicks.map((tick) => {
                  const y = PAD.top + innerH - (tick / yMax) * innerH;
                  return (
                    <g key={tick}>
                      <line
                        x1={PAD.left}
                        y1={y}
                        x2={CHART_W - PAD.right}
                        y2={y}
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth={1}
                      />
                      <text
                        x={PAD.left - 8}
                        y={y + 4}
                        textAnchor="end"
                        className="fill-gray-500"
                        style={{ fontSize: 10 }}
                      >
                        {tick}
                      </text>
                    </g>
                  );
                })}

                {/* X labels */}
                {data.map((d, i) => (
                  <text
                    key={d.label}
                    x={PAD.left + barGap * i + barGap / 2}
                    y={CHART_H - PAD.bottom + 16}
                    textAnchor="middle"
                    className="fill-gray-500"
                    style={{ fontSize: 10 }}
                  >
                    {d.label.length > 10 ? d.label.slice(0, 8) + '…' : d.label}
                  </text>
                ))}

                {/* Area fill */}
                {inView && !prefersReducedMotion && (
                  <path
                    d={areaPath}
                    fill="url(#areaGradient)"
                    opacity={0}
                    style={{
                      animation: 'vizFadeIn 0.6s ease-out 0.5s forwards',
                    }}
                  />
                )}
                {(inView || prefersReducedMotion) && (
                  <path
                    d={areaPath}
                    fill={prefersReducedMotion ? 'url(#areaGradient)' : 'none'}
                    opacity={prefersReducedMotion ? 1 : undefined}
                  />
                )}

                {/* Line */}
                <path
                  d={linePath}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={
                    prefersReducedMotion
                      ? {}
                      : inView
                        ? {
                            strokeDasharray: pathLength,
                            strokeDashoffset: 0,
                            transition: 'stroke-dashoffset 1.2s ease-out',
                          }
                        : {
                            strokeDasharray: pathLength,
                            strokeDashoffset: pathLength,
                          }
                  }
                />

                {/* Points */}
                {linePoints.map((p, i) => {
                  const isHovered = hoverIndex === i;
                  return (
                    <g key={p.label}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isHovered ? 6 : 4}
                        fill={isHovered ? '#a78bfa' : '#0a0f1e'}
                        stroke="#a78bfa"
                        strokeWidth={2}
                        style={{ transition: 'r 0.2s ease' }}
                        onMouseEnter={() => setHoverIndex(i)}
                        onMouseLeave={() => setHoverIndex(null)}
                        className="cursor-pointer focus:outline-none"
                        tabIndex={0}
                        onFocus={() => setHoverIndex(i)}
                        onBlur={() => setHoverIndex(null)}
                        opacity={inView || prefersReducedMotion ? 1 : 0}
                      />
                      {isHovered && (
                        <g style={{ pointerEvents: 'none' }}>
                          {(() => {
                            const tw = 56;
                            const tx = Math.max(PAD.left, Math.min(p.x - tw / 2, CHART_W - PAD.right - tw));
                            return (
                              <>
                                <rect
                                  x={tx}
                                  y={p.y - 32}
                                  width={tw}
                                  height={20}
                                  rx={4}
                                  fill="#1e293b"
                                  stroke="rgba(167,139,250,0.3)"
                                  strokeWidth={1}
                                />
                                <text
                                  x={tx + tw / 2}
                                  y={p.y - 18}
                                  textAnchor="middle"
                                  className="fill-violet-300"
                                  style={{ fontSize: 10, fontWeight: 600 }}
                                >
                                  {p.value}{dataset.unit}
                                </text>
                              </>
                            );
                          })()}
                        </g>
                      )}
                    </g>
                  );
                })}

                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(167,139,250,0.2)" />
                    <stop offset="100%" stopColor="rgba(167,139,250,0)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes vizFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
