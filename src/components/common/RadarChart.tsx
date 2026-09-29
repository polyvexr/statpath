import React, { useState } from 'react';

interface RadarDataPoint {
  label: string;
  current: number; // 0 to 5
  required: number; // 0 to 5
  benchmark: number; // 0 to 5
}

interface RadarChartProps {
  data?: RadarDataPoint[];
  size?: number;
}

const defaultRadarData: RadarDataPoint[] = [
  { label: 'Sample Surveys & NSSO', current: 4.2, required: 4.5, benchmark: 4.0 },
  { label: 'National Accounts (SNA)', current: 3.1, required: 4.8, benchmark: 4.4 },
  { label: 'CPI & Inflation Analytics', current: 4.0, required: 4.2, benchmark: 3.9 },
  { label: 'Time Series & Seasonal Adj', current: 3.4, required: 4.5, benchmark: 4.1 },
  { label: 'R & Python Computing', current: 3.2, required: 4.6, benchmark: 4.0 },
  { label: 'PLFS Big Data Pipelines', current: 2.3, required: 4.0, benchmark: 3.6 },
  { label: 'DPDPA 2023 Data Privacy', current: 2.4, required: 4.2, benchmark: 3.8 },
  { label: 'Evidence Policy Advisory', current: 3.7, required: 4.5, benchmark: 4.0 },
];

export const RadarChart: React.FC<RadarChartProps> = ({
  data = defaultRadarData,
  size = 360,
}) => {
  const [showCurrent, setShowCurrent] = useState(true);
  const [showRequired, setShowRequired] = useState(true);
  const [showBenchmark, setShowBenchmark] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const center = size / 2;
  const radius = size * 0.38;
  const totalAxes = data.length;
  const maxVal = 5;

  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (value / maxVal) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const getPathString = (getValue: (d: RadarDataPoint) => number) => {
    const points = data.map((d, i) => {
      const { x, y } = getCoordinates(getValue(d), i);
      return `${x},${y}`;
    });
    return points.join(' ');
  };

  // Concentric levels (1 to 5)
  const levels = [1, 2, 3, 4, 5];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Interactive layer toggles */}
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={() => setShowCurrent(!showCurrent)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.78rem',
            fontWeight: 600,
            border: '1px solid #3B82F6',
            backgroundColor: showCurrent ? '#EFF6FF' : 'transparent',
            color: showCurrent ? '#1D4ED8' : 'var(--text-muted)',
            transition: 'all 0.2s',
          }}
        >
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#2563EB',
              opacity: showCurrent ? 1 : 0.4,
            }}
          />
          Current Competency
        </button>

        <button
          onClick={() => setShowRequired(!showRequired)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.78rem',
            fontWeight: 600,
            border: '1px solid #EA580C',
            backgroundColor: showRequired ? '#FFF7ED' : 'transparent',
            color: showRequired ? '#EA580C' : 'var(--text-muted)',
            transition: 'all 0.2s',
          }}
        >
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#EA580C',
              opacity: showRequired ? 1 : 0.4,
            }}
          />
          Required Standard (MoSPI Target)
        </button>

        <button
          onClick={() => setShowBenchmark(!showBenchmark)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.78rem',
            fontWeight: 600,
            border: '1px solid #94A3B8',
            backgroundColor: showBenchmark ? '#F1F5F9' : 'transparent',
            color: showBenchmark ? '#334155' : 'var(--text-muted)',
            transition: 'all 0.2s',
          }}
        >
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#64748B',
              opacity: showBenchmark ? 1 : 0.4,
            }}
          />
          Peer Cadre Average
        </button>
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: `${size}px` }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          style={{ width: '100%', height: 'auto', overflow: 'visible' }}
        >
          {/* Concentric rings */}
          {levels.map((lvl) => {
            const r = (lvl / maxVal) * radius;
            const points = data
              .map((_, i) => {
                const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
                return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
              })
              .join(' ');

            return (
              <g key={`ring-${lvl}`}>
                <polygon
                  points={points}
                  fill={lvl % 2 === 0 ? 'rgba(241, 245, 249, 0.4)' : 'rgba(255, 255, 255, 0.6)'}
                  stroke="#E2E8F0"
                  strokeWidth="1"
                />
                <text
                  x={center + 4}
                  y={center - r + 3}
                  fontSize="9"
                  fill="#94A3B8"
                  fontWeight="600"
                >
                  {lvl}.0
                </text>
              </g>
            );
          })}

          {/* Radial axis lines and labels */}
          {data.map((d, i) => {
            const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
            const lineEnd = {
              x: center + radius * Math.cos(angle),
              y: center + radius * Math.sin(angle),
            };

            const labelR = radius + 22;
            const labelX = center + labelR * Math.cos(angle);
            const labelY = center + labelR * Math.sin(angle);

            const isHovered = hoveredPoint === i;

            return (
              <g
                key={`axis-${i}`}
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
                style={{ cursor: 'pointer' }}
              >
                <line
                  x1={center}
                  y1={center}
                  x2={lineEnd.x}
                  y2={lineEnd.y}
                  stroke={isHovered ? '#3B82F6' : '#E2E8F0'}
                  strokeWidth={isHovered ? '2' : '1'}
                />
                <text
                  x={labelX}
                  y={labelY}
                  fontSize="10"
                  fontWeight={isHovered ? '700' : '600'}
                  fill={isHovered ? '#1D4ED8' : '#334155'}
                  textAnchor={
                    Math.abs(Math.cos(angle)) < 0.1
                      ? 'middle'
                      : Math.cos(angle) > 0
                      ? 'start'
                      : 'end'
                  }
                  dominantBaseline="central"
                >
                  {d.label.length > 22 ? d.label.substring(0, 20) + '...' : d.label}
                </text>
              </g>
            );
          })}

          {/* Required polygon */}
          {showRequired && (
            <polygon
              points={getPathString((d) => d.required)}
              fill="rgba(234, 88, 12, 0.08)"
              stroke="#EA580C"
              strokeWidth="2"
              strokeDasharray="4 3"
              style={{ transition: 'all 0.3s' }}
            />
          )}

          {/* Benchmark polygon */}
          {showBenchmark && (
            <polygon
              points={getPathString((d) => d.benchmark)}
              fill="rgba(100, 116, 139, 0.05)"
              stroke="#64748B"
              strokeWidth="1.5"
              style={{ transition: 'all 0.3s' }}
            />
          )}

          {/* Current polygon */}
          {showCurrent && (
            <polygon
              points={getPathString((d) => d.current)}
              fill="rgba(37, 99, 235, 0.22)"
              stroke="#2563EB"
              strokeWidth="2.5"
              style={{ transition: 'all 0.3s' }}
            />
          )}

          {/* Current points */}
          {showCurrent &&
            data.map((d, i) => {
              const { x, y } = getCoordinates(d.current, i);
              const isHovered = hoveredPoint === i;
              return (
                <circle
                  key={`curr-pt-${i}`}
                  cx={x}
                  cy={y}
                  r={isHovered ? 6 : 4}
                  fill="#2563EB"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  style={{ transition: 'all 0.2s', cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredPoint(i)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              );
            })}
        </svg>

        {/* Hover inspection tooltip */}
        {hoveredPoint !== null && (
          <div
            style={{
              position: 'absolute',
              bottom: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#0B2545',
              color: 'white',
              padding: '0.4rem 0.8rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.78rem',
              boxShadow: 'var(--shadow-md)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              zIndex: 10,
              display: 'flex',
              gap: '0.6rem',
            }}
          >
            <span style={{ fontWeight: 700 }}>{data[hoveredPoint].label}:</span>
            <span style={{ color: '#93C5FD' }}>Current: {data[hoveredPoint].current.toFixed(1)}</span>
            <span style={{ color: '#FDBA74' }}>Target: {data[hoveredPoint].required.toFixed(1)}</span>
            <span style={{ color: '#CBD5E1' }}>Peer: {data[hoveredPoint].benchmark.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  );
};
