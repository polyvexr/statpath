import React from 'react';
import {
  Sparkles,
  ArrowRight,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock,
  BarChart2,
  Brain,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { officerProfile, skillsData, trainingCourses, assessmentResults } from '../../data/mockData';
import { MetricCard } from '../common/MetricCard';
import { RadarChart } from '../common/RadarChart';
import type { NavigationTab } from '../layout/Sidebar';

interface DashboardPageProps {
  onNavigate: (tab: NavigationTab) => void;
  onSelectCourse?: (courseId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  // Filter top critical gaps
  const topGaps = [...skillsData]
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 3);

  // Active courses
  const activeCourses = trainingCourses.filter((c) => c.status === 'In Progress' || c.status === 'Mandatory');

  // Top recommended
  const recommendedCourses = trainingCourses.filter((c) => c.status === 'Recommended').slice(0, 2);

  // Calculate category averages
  const categories = ['Statistics', 'Technical', 'Digital Governance', 'Behavioural'] as const;
  const categoryAverages = categories.map((cat) => {
    const catSkills = skillsData.filter((s) => s.category === cat);
    const avgCurrent = catSkills.reduce((acc, s) => acc + s.currentLevel, 0) / catSkills.length;
    const avgRequired = catSkills.reduce((acc, s) => acc + s.requiredLevel, 0) / catSkills.length;
    return {
      category: cat,
      current: avgCurrent.toFixed(1),
      required: avgRequired.toFixed(1),
      percentage: Math.round((avgCurrent / 5) * 100),
    };
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
      {/* Officer Welcome & AI Next Step Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0B2545 0%, #134074 60%, #1E3A8A 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem 2rem',
          color: 'white',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#DBEAFE',
                }}
              >
                Cadre ID: {officerProfile.employeeCode}
              </span>
              <span
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.25)',
                  color: '#A7F3D0',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <CheckCircle2 size={12} /> ISS Batch 2018
              </span>
            </div>

            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
              Namaste, {officerProfile.name}
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#93C5FD', marginTop: '0.25rem' }}>
              {officerProfile.designation} • {officerProfile.division} • {officerProfile.location}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => onNavigate('assessment')}
              className="btn-saffron"
              style={{ fontSize: '0.85rem' }}
            >
              <Sparkles size={16} />
              Take AI Diagnostic
            </button>
            <button
              onClick={() => onNavigate('skills')}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                padding: '0.55rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              View Skill Matrix
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* AI Recommended Next Step Box */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            padding: '1.1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FBBF24',
              flexShrink: 0,
            }}
          >
            <Sparkles size={24} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#FCD34D' }}>
                AI Recommended Next Step
              </span>
              <span style={{ fontSize: '0.7rem', backgroundColor: 'rgba(239, 68, 68, 0.3)', color: '#FCA5A5', padding: '0.1rem 0.45rem', borderRadius: '4px', fontWeight: 700 }}>
                High Impact
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#E2E8F0', lineHeight: 1.45 }}>
              Complete the remaining 35% of <strong style={{ color: '#FFFFFF' }}>DPDPA 2023 for Statistical Officers</strong> on iGOT and register for the <strong style={{ color: '#FFFFFF' }}>NSSTA 5-day Residential Workshop on SNA 2008</strong>. Bridging these two areas will elevate your overall competency from 76 to 85, qualifying you for the 2026 Base Year Revision Taskforce.
            </p>
          </div>

          <button
            onClick={() => onNavigate('learning')}
            style={{
              backgroundColor: '#FFFFFF',
              color: 'var(--primary-navy)',
              fontWeight: 700,
              fontSize: '0.825rem',
              padding: '0.65rem 1.1rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: 'var(--shadow-md)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Resume Course
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
        <MetricCard
          title="Overall Competency Index"
          value={`${officerProfile.overallScore} / 100`}
          subtitle="Target Cadre Standard: 88"
          change="+4.2 pts"
          changeType="positive"
          progress={Math.round((officerProfile.overallScore / officerProfile.targetScore) * 100)}
          icon={<Brain size={20} />}
          badge="Proficient"
          onClick={() => onNavigate('skills')}
        />

        <MetricCard
          title="Verified Cadre Skills"
          value="11 / 14"
          subtitle="Meets or exceeds benchmark"
          change="78.5%"
          changeType="positive"
          progress={78}
          icon={<ShieldCheck size={20} />}
          iconBg="var(--gov-green-light)"
          onClick={() => onNavigate('skills')}
        />

        <MetricCard
          title="Top Skill Gaps"
          value="3 Critical"
          subtitle="SNA 2008, PLFS, DPDPA"
          change="Action Required"
          changeType="negative"
          icon={<AlertTriangle size={20} />}
          iconBg="var(--status-critical-bg)"
          onClick={() => onNavigate('skills')}
        />

        <MetricCard
          title="Learning Hours Logged"
          value="54.5 hrs"
          subtitle="iGOT & NSSTA combined"
          change="68% of Annual Target"
          changeType="positive"
          progress={68}
          icon={<BookOpen size={20} />}
          iconBg="var(--igot-purple-light)"
          onClick={() => onNavigate('learning')}
        />
      </div>

      {/* Main Grid: Left Column (Visualizations & Gaps), Right Column (Learning & Recent Results) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        {/* Left Column: Visualizations & Skill Gaps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Competency Visualization Card */}
          <div className="gov-card">
            <div className="section-header">
              <div>
                <h2 className="section-title">
                  <BarChart2 size={20} style={{ color: 'var(--accent-blue)' }} />
                  Competency Distribution Profile
                </h2>
                <p className="section-subtitle">
                  Comparing current evaluation against MoSPI ISS Cadre Benchmark and peer averages
                </p>
              </div>
              <button
                onClick={() => onNavigate('skills')}
                className="btn-secondary"
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.7rem' }}
              >
                Detailed Graph
              </button>
            </div>

            {/* Radar Chart Component */}
            <div style={{ padding: '0.5rem 0', display: 'flex', justifyContent: 'center' }}>
              <RadarChart size={340} />
            </div>

            {/* Category Progress Bars */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Category Proficiency Index
              </div>

              {categoryAverages.map((item) => (
                <div key={item.category}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.category}</span>
                    <span style={{ color: 'var(--text-muted)' }}>
                      <strong>{item.current}</strong> / 5.0 (Target: {item.required})
                    </span>
                  </div>
                  <div style={{ height: '7px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${item.percentage}%`,
                        height: '100%',
                        backgroundColor:
                          item.percentage >= 80 ? 'var(--gov-green)' : item.percentage >= 65 ? 'var(--accent-blue)' : 'var(--status-high)',
                        borderRadius: 'var(--radius-full)',
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Skill Gaps Table Card */}
          <div className="gov-card">
            <div className="section-header">
              <div>
                <h2 className="section-title">
                  <AlertTriangle size={18} style={{ color: 'var(--status-critical)' }} />
                  Priority Skill Gaps Requiring Action
                </h2>
                <p className="section-subtitle">Identified by MoSPI AI Engine based on role benchmark delta</p>
              </div>
              <button
                onClick={() => onNavigate('skills')}
                style={{ fontSize: '0.78rem', color: 'var(--accent-blue)', fontWeight: 600 }}
              >
                View all 14 skills →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {topGaps.map((skill) => (
                <div
                  key={skill.id}
                  style={{
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.9rem',
                    backgroundColor: 'var(--bg-page)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-main)' }}>
                          {skill.name}
                        </span>
                        <span className="badge badge-critical" style={{ fontSize: '0.65rem' }}>
                          Gap: +{skill.gap.toFixed(1)}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                        Category: {skill.category}
                      </span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        Level {skill.currentLevel.toFixed(1)} <span style={{ color: 'var(--text-muted)' }}>/ {skill.requiredLevel.toFixed(1)}</span>
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Target Standard</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                    {skill.recommendationReason}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.3rem', paddingTop: '0.4rem', borderTop: '1px solid rgba(226, 232, 240, 0.7)' }}>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      {skill.tags.map((tag) => (
                        <span key={tag} style={{ fontSize: '0.65rem', backgroundColor: '#FFFFFF', padding: '0.1rem 0.4rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => onNavigate('learning')}
                      className="btn-primary"
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}
                    >
                      Bridge Gap →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Learning Progress, Courses & Recent Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Learning Progress Card */}
          <div className="gov-card">
            <div className="section-header">
              <div>
                <h2 className="section-title">
                  <BookOpen size={20} style={{ color: 'var(--igot-purple)' }} />
                  Active Learning Progress
                </h2>
                <p className="section-subtitle">Ongoing certifications on iGOT Karmayogi & NSSTA TPAC</p>
              </div>
              <button
                onClick={() => onNavigate('learning')}
                className="btn-secondary"
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.7rem' }}
              >
                All Courses
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {activeCourses.map((course) => (
                <div
                  key={course.id}
                  style={{
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.9rem',
                    backgroundColor: 'white',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                    <span
                      className={`badge ${course.provider === 'iGOT Karmayogi' ? 'badge-igot' : 'badge-nssta'}`}
                    >
                      {course.provider}
                    </span>
                    {course.dueDate && (
                      <span style={{ fontSize: '0.72rem', color: 'var(--status-high)', display: 'inline-flex', alignItems: 'center', gap: '3px', fontWeight: 600 }}>
                        <Clock size={12} /> Target: {course.dueDate}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                    {course.title}
                  </h3>

                  <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                    <span>Duration: {course.duration}</span>
                    <span>•</span>
                    <span>Format: {course.format}</span>
                  </div>

                  {course.progress !== undefined ? (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Progress Completion</span>
                        <span style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>{course.progress}%</span>
                      </div>
                      <div style={{ height: '6px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${course.progress}%`,
                            height: '100%',
                            backgroundColor: 'var(--igot-purple)',
                            borderRadius: 'var(--radius-full)',
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="badge badge-high" style={{ fontSize: '0.7rem' }}>
                        Nomination Confirmed
                      </span>
                      <button
                        onClick={() => onNavigate('learning')}
                        style={{ fontSize: '0.75rem', color: 'var(--nssta-gold)', fontWeight: 700 }}
                      >
                        View Logistics Details →
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Courses Card */}
          <div className="gov-card">
            <div className="section-header">
              <div>
                <h2 className="section-title">
                  <Sparkles size={18} style={{ color: '#F59E0B' }} />
                  AI Recommended Courses
                </h2>
                <p className="section-subtitle">Tailored specifically to bridge identified statistical deficits</p>
              </div>
              <button
                onClick={() => onNavigate('learning')}
                style={{ fontSize: '0.78rem', color: 'var(--accent-blue)', fontWeight: 600 }}
              >
                Browse Catalog →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {recommendedCourses.map((course) => (
                <div
                  key={course.id}
                  style={{
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.9rem',
                    backgroundColor: 'var(--bg-page)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span className={`badge ${course.provider === 'iGOT Karmayogi' ? 'badge-igot' : 'badge-nssta'}`}>
                      {course.provider}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {course.duration}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                    {course.title}
                  </h3>

                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                    <strong>Why AI Recommended:</strong> {course.recommendationReason}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--gov-green)', fontWeight: 600 }}>
                      ⭐ {course.rating} ({course.enrolledCount} enrolled)
                    </span>
                    <button
                      onClick={() => onNavigate('learning')}
                      className="btn-primary"
                      style={{ fontSize: '0.72rem', padding: '0.3rem 0.75rem' }}
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Assessment Results Card */}
          <div className="gov-card">
            <div className="section-header">
              <div>
                <h2 className="section-title">
                  <FileCheck size={18} style={{ color: 'var(--gov-green)' }} />
                  Recent Assessment Results
                </h2>
                <p className="section-subtitle">Verified competency examinations & diagnostic checks</p>
              </div>
              <button
                onClick={() => onNavigate('assessment')}
                className="btn-secondary"
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.7rem' }}
              >
                Launch Test
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {assessmentResults.slice(0, 3).map((res) => (
                <div
                  key={res.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'white',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', maxWidth: '75%' }}>
                    <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {res.title}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {res.date} • {res.competencyArea}
                    </span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: res.score >= 80 ? 'var(--gov-green)' : res.score >= 70 ? 'var(--accent-blue)' : 'var(--status-critical)' }}>
                      {res.score}%
                    </div>
                    <span
                      className={`badge ${res.status === 'Distinction' ? 'badge-low' : res.status === 'Passed' ? 'badge-medium' : 'badge-critical'}`}
                      style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}
                    >
                      {res.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
