import React, { useState } from 'react';
import {
  Bell,
  Search,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Building2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { officerProfile } from '../../data/mockData';

interface HeaderProps {
  onSearchChange?: (val: string) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchChange, onNavigateToTab }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'white', borderBottom: '1px solid var(--border-subtle)' }}>
      {/* Indian National Tricolor Ribbon */}
      <div style={{ height: '3.5px', width: '100%', display: 'flex' }}>
        <div style={{ flex: 1, backgroundColor: '#FF9933' }} />
        <div style={{ flex: 1, backgroundColor: '#FFFFFF' }} />
        <div style={{ flex: 1, backgroundColor: '#138808' }} />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.5rem',
          gap: '1rem',
        }}
      >
        {/* Left Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #0B2545 0%, #134074 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)',
              fontWeight: 800,
              fontSize: '1.1rem',
              letterSpacing: '-0.02em',
            }}
          >
            <Building2 size={22} style={{ color: '#F8FAFC' }} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-navy)', letterSpacing: '-0.02em' }}>
                Karmayogi <span style={{ color: 'var(--accent-blue)' }}>SkillIntel</span>
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  backgroundColor: 'var(--gov-saffron-light)',
                  color: 'var(--gov-saffron)',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '4px',
                  border: '1px solid rgba(230, 81, 0, 0.2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                MoSPI AI Portal
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>Ministry of Statistics & Programme Implementation</span>
              <span>•</span>
              <span style={{ color: 'var(--gov-green)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--gov-green)', display: 'inline-block' }} />
                AI Competency Engine v2.4 Active
              </span>
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div style={{ flex: '1', maxWidth: '420px', position: 'relative' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }}
          />
          <input
            type="text"
            placeholder="Search competencies, SNA 2008, iGOT courses, NSSTA..."
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.55rem 0.75rem 0.55rem 2.25rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-subtle)',
              fontSize: '0.85rem',
              color: 'var(--text-main)',
              outline: 'none',
              transition: 'all 0.2s',
            }}
            onFocus={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.borderColor = 'var(--accent-blue)';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.12)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Right Section: Cadre Pill, Notifications, User Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Cadre Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'var(--accent-blue-light)',
              color: 'var(--accent-blue)',
              padding: '0.35rem 0.7rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid rgba(37, 99, 235, 0.2)',
            }}
          >
            <ShieldCheck size={14} />
            <span>ISS Cadre • Grp 'A'</span>
          </div>

          {/* Notifications Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: showNotifications ? 'var(--bg-subtle)' : 'transparent',
                color: 'var(--text-secondary)',
                position: 'relative',
                transition: 'background-color 0.2s',
              }}
              title="Official Notifications"
            >
              <Bell size={18} />
              <span
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#DC2626',
                  border: '1.5px solid white',
                }}
              />
            </button>

            {showNotifications && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '46px',
                  width: '320px',
                  backgroundColor: 'white',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  border: '1px solid var(--border-subtle)',
                  padding: '1rem',
                  zIndex: 200,
                  animation: 'fadeIn 0.2s ease-out',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Ministry Notifications</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-blue)', fontWeight: 600, cursor: 'pointer' }}>Mark all read</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div
                    style={{
                      padding: '0.6rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--status-critical-bg)',
                      borderLeft: '3px solid var(--status-critical)',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigateToTab && onNavigateToTab('learning');
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--status-critical)' }}>
                      <AlertCircle size={14} />
                      <span>Action Required: DPDPA 2023 Module</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                      Mandatory statutory compliance before upcoming NSSO microdata release.
                    </p>
                  </div>

                  <div
                    style={{
                      padding: '0.6rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--nssta-gold-light)',
                      borderLeft: '3px solid var(--nssta-gold)',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigateToTab && onNavigateToTab('learning');
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--nssta-gold)' }}>
                      <Sparkles size={14} />
                      <span>NSSTA Greater Noida Workshop</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                      Nominations open for 5-Day SNA 2008 Residential Session starting 14 Oct.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Trigger */}
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: showProfileMenu ? 'var(--bg-subtle)' : 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #134074, #0B2545)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  border: '2px solid #DBEAFE',
                }}
              >
                RS
              </div>
              <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.2 }}>
                  {officerProfile.name}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Senior Statistical Officer (SSO)
                </span>
              </div>
              <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
            </div>

            {showProfileMenu && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '50px',
                  width: '280px',
                  backgroundColor: 'white',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  border: '1px solid var(--border-subtle)',
                  padding: '1rem',
                  zIndex: 200,
                  animation: 'fadeIn 0.2s ease-out',
                }}
              >
                <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-navy)' }}>
                    {officerProfile.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                    {officerProfile.employeeCode}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    {officerProfile.division}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Cadre / Service:</span>
                    <span style={{ fontWeight: 600 }}>ISS (2018 Batch)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Competency Index:</span>
                    <span style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>76 / 100</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Verification Status:</span>
                    <span style={{ fontWeight: 600, color: 'var(--gov-green)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <CheckCircle2 size={12} /> Verified SSO
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
