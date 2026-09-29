import React, { useState } from 'react';
import {
  BrainCircuit,
  Search,
  CheckCircle2,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  BarChart3
} from 'lucide-react';
import { skillsData } from '../../data/mockData';
import { RadarChart } from '../common/RadarChart';
import type { NavigationTab } from '../layout/Sidebar';

interface SkillIntelligencePageProps {
  onNavigate: (tab: NavigationTab) => void;
  onFilterLearningBySkill?: (skillName: string) => void;
}

export const SkillIntelligencePage: React.FC<SkillIntelligencePageProps> = ({
  onNavigate,
  onFilterLearningBySkill,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedSkillId, setExpandedSkillId] = useState<string | null>('SK-STAT-02'); // Default open critical gap

  const categories = ['All', 'Statistics', 'Technical', 'Digital Governance', 'Behavioural'];
  const priorities = ['All', 'Critical', 'High', 'Medium', 'Low'];

  // Filter skills
  const filteredSkills = skillsData.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesPriority = selectedPriority === 'All' || skill.priority === selectedPriority;
    const matchesSearch =
      searchQuery === '' ||
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      skill.recommendationReason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPriority && matchesSearch;
  });

  // Calculate high-level metrics
  const totalSkills = skillsData.length;
  const criticalCount = skillsData.filter((s) => s.priority === 'Critical').length;
  const highCount = skillsData.filter((s) => s.priority === 'High').length;
  const compliantCount = skillsData.filter((s) => s.gap <= 0.3).length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem',
          backgroundColor: '#FFFFFF',
          padding: '1.5rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-igot" style={{ fontSize: '0.75rem' }}>
              <BrainCircuit size={14} /> MoSPI Competency Intelligence Engine
            </span>
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-navy)', letterSpacing: '-0.02em', margin: 0 }}>
            Skill Intelligence & Competency Gap Analysis
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem', maxWidth: '750px' }}>
            Multi-dimensional evaluation of Dr. Rajesh Kumar Sharma against the Indian Statistical Service (ISS) Senior Statistical Officer benchmark standards.
          </p>
        </div>

        {/* Quick summary stats */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-navy)' }}>{totalSkills}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Tracked Skills</div>
          </div>
          <div style={{ width: '1px', height: '35px', backgroundColor: 'var(--border-subtle)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--status-critical)' }}>{criticalCount}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Critical Gaps</div>
          </div>
          <div style={{ width: '1px', height: '35px', backgroundColor: 'var(--border-subtle)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--status-high)' }}>{highCount}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>High Priority</div>
          </div>
          <div style={{ width: '1px', height: '35px', backgroundColor: 'var(--border-subtle)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gov-green)' }}>{compliantCount}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>At Benchmark</div>
          </div>
        </div>
      </div>

      {/* Interactive Competency Graph Section */}
      <div
        className="gov-card"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        <div>
          <div className="section-header" style={{ marginBottom: '0.5rem' }}>
            <div>
              <h2 className="section-title">
                <BarChart3 size={20} style={{ color: 'var(--accent-blue)' }} />
                Interactive Competency Radar Map
              </h2>
              <p className="section-subtitle">
                Visualizing multi-axis alignment across Statistics, Technical Tools, Governance, and Behavioural standards.
              </p>
            </div>
          </div>

          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
            Toggle layers above the chart to inspect your profile against the statutory MoSPI Cadre Mandate and peer cohort distribution. Notice significant outward expansion required in <strong>National Accounts (SNA 2008)</strong> and <strong>DPDPA Data Privacy</strong>.
          </p>

          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--accent-blue)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '0.2rem' }}>
              <Info size={16} style={{ color: 'var(--accent-blue)' }} />
              <span>AI Competency Diagnostic Note</span>
            </div>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
              Cadre standard requires minimum Level 4.0 across all technical & statistical indices prior to eligibility for Assistant Director (AD) promotion board in 2027.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <RadarChart size={380} />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          backgroundColor: '#FFFFFF',
          padding: '1.25rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  backgroundColor: selectedCategory === cat ? 'var(--primary-navy)' : 'var(--bg-subtle)',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
              >
                {cat}
                {cat !== 'All' && (
                  <span style={{ marginLeft: '0.35rem', opacity: 0.7, fontSize: '0.72rem' }}>
                    ({skillsData.filter((s) => s.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div style={{ position: 'relative', width: '280px' }}>
            <Search
              size={15}
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              type="text"
              placeholder="Search skill name or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.45rem 0.75rem 0.45rem 2rem',
                fontSize: '0.8rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Priority Filter Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
          <span style={{ fontWeight: 600 }}>Filter by Gap Priority:</span>
          {priorities.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPriority(p)}
              style={{
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.75rem',
                fontWeight: selectedPriority === p ? 700 : 500,
                backgroundColor: selectedPriority === p ? '#E2E8F0' : 'transparent',
                color: selectedPriority === p ? 'var(--text-main)' : 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Intelligence Cards / Matrix List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', padding: '0 0.5rem' }}>
          <span>Showing {filteredSkills.length} of {skillsData.length} competencies</span>
          <span>Click any card to inspect "Why Recommended by AI" and curriculum alignment</span>
        </div>

        {filteredSkills.map((skill) => {
          const isExpanded = expandedSkillId === skill.id;
          const currentPct = (skill.currentLevel / 5) * 100;
          const targetPct = (skill.requiredLevel / 5) * 100;

          return (
            <div
              key={skill.id}
              className="gov-card"
              style={{
                borderColor: skill.priority === 'Critical' ? 'rgba(220, 38, 38, 0.3)' : 'var(--border-card)',
                transition: 'all 0.25s',
              }}
            >
              <div
                onClick={() => setExpandedSkillId(isExpanded ? null : skill.id)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                {/* Left info */}
                <div style={{ flex: '1', minWidth: '260px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                      {skill.name}
                    </span>
                    <span
                      className={`badge ${
                        skill.priority === 'Critical'
                          ? 'badge-critical'
                          : skill.priority === 'High'
                          ? 'badge-high'
                          : skill.priority === 'Medium'
                          ? 'badge-medium'
                          : 'badge-low'
                      }`}
                    >
                      {skill.priority} Gap (+{skill.gap.toFixed(1)})
                    </span>
                    <span className="badge badge-category">{skill.category}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>ID: {skill.id}</span>
                    <span>•</span>
                    <span>Peer Benchmark: {skill.cadreBenchmark.toFixed(1)} / 5.0</span>
                    {skill.certifiedDate && (
                      <>
                        <span>•</span>
                        <span style={{ color: 'var(--gov-green)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                          <CheckCircle2 size={12} /> Certified {skill.certifiedDate}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Center / Right: Numerical comparison meter */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexShrink: 0 }}>
                  <div style={{ width: '200px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                        Level {skill.currentLevel.toFixed(1)}
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>
                        Target: <strong style={{ color: 'var(--gov-saffron)' }}>{skill.requiredLevel.toFixed(1)}</strong>
                      </span>
                    </div>

                    {/* Dual level visual indicator */}
                    <div style={{ position: 'relative', height: '8px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      {/* Target marker background */}
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: `${targetPct}%`,
                          height: '100%',
                          backgroundColor: 'rgba(234, 88, 12, 0.25)',
                        }}
                      />
                      {/* Current level bar */}
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: `${currentPct}%`,
                          height: '100%',
                          backgroundColor: skill.gap > 1.0 ? 'var(--status-critical)' : 'var(--accent-blue)',
                          borderRadius: 'var(--radius-full)',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onFilterLearningBySkill && onFilterLearningBySkill(skill.name);
                        onNavigate('learning');
                      }}
                      className="btn-secondary"
                      style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                    >
                      Bridge Gap →
                    </button>
                    {isExpanded ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                  </div>
                </div>
              </div>

              {/* Expandable "Why AI Recommended this Skill" section */}
              {isExpanded && (
                <div
                  style={{
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    animation: 'fadeIn 0.2s ease-out',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'var(--gov-saffron-light)',
                      border: '1px solid rgba(230, 81, 0, 0.2)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                    }}
                  >
                    <Sparkles size={18} style={{ color: 'var(--gov-saffron)', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--gov-saffron)', marginBottom: '0.2rem' }}>
                        Why MoSPI AI Engine Recommends This Skill:
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#7C2D12', lineHeight: 1.45, margin: 0 }}>
                        {skill.recommendationReason}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.78rem' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Methodology Tags:</span>
                      {skill.tags.map((tag) => (
                        <span key={tag} style={{ backgroundColor: 'var(--bg-subtle)', padding: '0.15rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => onNavigate('assessment')}
                        style={{
                          color: 'var(--accent-blue)',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        Verify this Skill via AI Assessment →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
