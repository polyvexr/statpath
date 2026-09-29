import React from 'react';
import {
  LayoutDashboard,
  BrainCircuit,
  GraduationCap,
  MessageSquareCheck,
  Award,
  Sparkles
} from 'lucide-react';
import { officerProfile } from '../../data/mockData';

export type NavigationTab = 'dashboard' | 'skills' | 'learning' | 'assessment';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab }) => {
  const navItems = [
    {
      id: 'dashboard' as NavigationTab,
      label: 'Employee Dashboard',
      description: 'Overview, Gaps & Next Steps',
      icon: <LayoutDashboard size={20} />,
      badge: 'Main',
    },
    {
      id: 'skills' as NavigationTab,
      label: 'Skill Intelligence',
      description: 'Competency Graph & Gap Analysis',
      icon: <BrainCircuit size={20} />,
      badge: '3 Gaps',
      badgeClass: 'badge-critical',
    },
    {
      id: 'learning' as NavigationTab,
      label: 'Learning & Pathways',
      description: 'iGOT & NSSTA TPAC Modules',
      icon: <GraduationCap size={20} />,
      badge: '7 Courses',
    },
    {
      id: 'assessment' as NavigationTab,
      label: 'AI Assessment',
      description: 'Interactive Interview & Quizzes',
      icon: <MessageSquareCheck size={20} />,
      badge: 'AI Ready',
      badgeClass: 'badge-igot',
    },
  ];

  return (
    <aside
      style={{
        width: '270px',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 65px)',
        position: 'sticky',
        top: '65px',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      {/* Officer Summary Card in Sidebar */}
      <div style={{ padding: '1.25rem 1rem 0.75rem 1rem' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #0B2545 0%, #134074 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem',
            color: 'white',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle watermarked emblem design */}
          <div
            style={{
              position: 'absolute',
              right: '-12px',
              bottom: '-12px',
              opacity: 0.12,
              pointerEvents: 'none',
            }}
          >
            <Award size={90} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontWeight: 700,
                color: '#93C5FD',
              }}
            >
              MoSPI Competency Score
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>
              {officerProfile.overallScore}
            </span>
            <span style={{ fontSize: '0.9rem', color: '#94A3B8', fontWeight: 600 }}>/ 100</span>
            <span
              style={{
                marginLeft: 'auto',
                fontSize: '0.75rem',
                fontWeight: 700,
                backgroundColor: 'rgba(37, 99, 235, 0.4)',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                color: '#DBEAFE',
                border: '1px solid rgba(219, 234, 254, 0.2)',
              }}
            >
              Top 12%
            </span>
          </div>

          <div style={{ height: '5px', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div
              style={{
                width: `${(officerProfile.overallScore / officerProfile.targetScore) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #38BDF8, #4ADE80)',
                borderRadius: 'var(--radius-full)',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#CBD5E1', marginTop: '0.4rem' }}>
            <span>Target Cadre: 88</span>
            <span>Gap: -12 pts</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Links */}
      <nav style={{ padding: '0.5rem 0.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <div style={{ padding: '0.35rem 0.5rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Portal Navigation
        </div>

        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                width: '100%',
                padding: '0.75rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'var(--accent-blue-light)' : 'transparent',
                color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 500,
                textAlign: 'left',
                transition: 'all var(--transition-fast)',
                borderLeft: isActive ? '3.5px solid var(--accent-blue)' : '3.5px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
                  e.currentTarget.style.color = 'var(--text-main)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              <div style={{ color: isActive ? 'var(--accent-blue)' : 'var(--text-muted)', display: 'flex' }}>
                {item.icon}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span
                      className={`badge ${item.badgeClass || 'badge-category'}`}
                      style={{ fontSize: '0.65rem', padding: '0.1rem 0.45rem' }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* AI Quick Advice Footer Pill */}
      <div style={{ padding: '1rem', borderTop: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-page)' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
            <Sparkles size={14} style={{ color: '#D97706' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>AI Priority Alert</span>
          </div>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
            SNA 2008 & DPDPA courses directly bridge 68% of your cadre benchmark deficit.
          </p>
          <button
            onClick={() => onSelectTab('assessment')}
            style={{
              marginTop: '0.5rem',
              width: '100%',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: 'var(--accent-blue)',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3rem',
              padding: '0.3rem',
              backgroundColor: 'var(--accent-blue-light)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            Run Diagnostic Now →
          </button>
        </div>
      </div>
    </aside>
  );
};
