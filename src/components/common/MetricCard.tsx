import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  iconBg?: string;
  progress?: number;
  badge?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  change,
  changeType = 'positive',
  icon,
  iconBg = 'var(--accent-blue-light)',
  progress,
  badge,
  onClick,
}) => {
  return (
    <div
      className={`gov-card ${onClick ? 'gov-card-interactive' : ''}`}
      onClick={onClick}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>{title}</span>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-navy)',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          {value}
        </span>
        {badge && (
          <span className="badge badge-low" style={{ fontSize: '0.7rem' }}>
            {badge}
          </span>
        )}
      </div>

      {progress !== undefined && (
        <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
            <span>Target Progress</span>
            <span style={{ fontWeight: 600 }}>{progress}%</span>
          </div>
          <div style={{ height: '6px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #2563EB, #0D8A4E)',
                borderRadius: 'var(--radius-full)',
                transition: 'width 0.5s ease',
              }}
            />
          </div>
        </div>
      )}

      {(subtitle || change) && (
        <div style={{ marginTop: 'auto', paddingTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
          {change && (
            <span
              style={{
                fontWeight: 600,
                color: changeType === 'positive' ? 'var(--gov-green)' : changeType === 'negative' ? 'var(--status-critical)' : 'var(--text-muted)',
              }}
            >
              {change}
            </span>
          )}
          {subtitle && <span style={{ color: 'var(--text-muted)' }}>{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
