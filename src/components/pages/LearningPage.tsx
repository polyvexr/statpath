import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  X,
  Search
} from 'lucide-react';
import { trainingCourses, learningPathMilestones } from '../../data/mockData';
import type { TrainingCourse } from '../../types';

interface LearningPageProps {
  initialSearch?: string;
}

export const LearningPage: React.FC<LearningPageProps> = ({ initialSearch = '' }) => {
  const [providerFilter, setProviderFilter] = useState<'All' | 'iGOT Karmayogi' | 'NSSTA TPAC'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedCourse, setSelectedCourse] = useState<TrainingCourse | null>(null);
  const [enrolledSuccessMsg, setEnrolledSuccessMsg] = useState<string | null>(null);

  const categories = ['All', 'Statistics', 'Technical', 'Digital Governance', 'Behavioural'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const statuses = ['All', 'In Progress', 'Mandatory', 'Recommended', 'Completed'];

  // Filter courses
  const filteredCourses = trainingCourses.filter((course) => {
    const matchesProvider = providerFilter === 'All' || course.provider === providerFilter;
    const matchesCategory = categoryFilter === 'All' || course.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || course.status === statusFilter;
    const matchesDifficulty = difficultyFilter === 'All' || course.difficulty === difficultyFilter;
    const matchesSearch =
      searchQuery === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skillsCovered.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      course.recommendationReason.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesProvider && matchesCategory && matchesStatus && matchesDifficulty && matchesSearch;
  });

  const handleEnroll = (course: TrainingCourse) => {
    setEnrolledSuccessMsg(`Nomination & Enrollment confirmed for "${course.title}". Added to your iGOT Karmayogi profile.`);
    setTimeout(() => setEnrolledSuccessMsg(null), 5000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2.5rem' }}>
      {/* Toast Alert for Enrollment */}
      {enrolledSuccessMsg && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            right: '25px',
            zIndex: 999,
            backgroundColor: '#065F46',
            color: 'white',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-xl)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            maxWidth: '480px',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <CheckCircle2 size={20} style={{ color: '#6EE7B7', flexShrink: 0 }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{enrolledSuccessMsg}</span>
        </div>
      )}

      {/* Header Banner */}
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
              <GraduationCap size={14} /> MoSPI Integrated Training Ecosystem
            </span>
            <span className="badge badge-nssta" style={{ fontSize: '0.75rem' }}>
              NSSTA TPAC 2026-27 Calendar
            </span>
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-navy)', letterSpacing: '-0.02em', margin: 0 }}>
            Personalized Learning & Recommendations
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem', maxWidth: '780px' }}>
            AI-curated learning pathways combining asynchronous self-paced certifications on <strong>iGOT Karmayogi</strong> with in-person residential programs at the <strong>National Statistical Systems Training Academy (NSSTA), Greater Noida</strong>.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <div
            style={{
              padding: '0.5rem 0.9rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--igot-purple-light)',
              border: '1px solid rgba(124, 58, 237, 0.2)',
              fontSize: '0.78rem',
              color: 'var(--igot-purple)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <BookOpen size={16} /> 4 iGOT Modules Active
          </div>
          <div
            style={{
              padding: '0.5rem 0.9rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--nssta-gold-light)',
              border: '1px solid rgba(180, 83, 9, 0.2)',
              fontSize: '0.78rem',
              color: 'var(--nssta-gold)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <MapPin size={16} /> NSSTA Greater Noida
          </div>
        </div>
      </div>

      {/* Personalized Career Pathway Timeline */}
      <div className="gov-card">
        <div className="section-header">
          <div>
            <h2 className="section-title">
              <Sparkles size={18} style={{ color: 'var(--gov-saffron)' }} />
              Personalized ISS Cadre Learning Pathway (2025 - 2027)
            </h2>
            <p className="section-subtitle">
              Structured progressive competency milestones towards Senior Statistical Officer (SSO) mastery and Assistant Director readiness
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
            marginTop: '0.5rem',
            position: 'relative',
          }}
        >
          {learningPathMilestones.map((milestone) => {
            const isCompleted = milestone.status === 'completed';
            const isCurrent = milestone.status === 'current';

            return (
              <div
                key={milestone.step}
                style={{
                  borderRadius: 'var(--radius-lg)',
                  border: isCurrent
                    ? '2px solid var(--accent-blue)'
                    : isCompleted
                    ? '1px solid #A7F3D0'
                    : '1px solid var(--border-subtle)',
                  backgroundColor: isCurrent ? 'var(--accent-blue-light)' : isCompleted ? '#F0FDF4' : 'var(--bg-page)',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  position: 'relative',
                  boxShadow: isCurrent ? 'var(--shadow-md)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: isCompleted ? 'var(--gov-green)' : isCurrent ? 'var(--accent-blue)' : '#94A3B8',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={14} /> : milestone.step}
                  </span>

                  <span
                    className={`badge ${
                      isCompleted ? 'badge-low' : isCurrent ? 'badge-medium' : 'badge-category'
                    }`}
                    style={{ fontSize: '0.65rem' }}
                  >
                    {isCompleted ? 'Completed' : isCurrent ? 'Active Stage' : 'Future'}
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                  {milestone.title}
                </div>

                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: isCurrent ? 'var(--accent-blue)' : 'var(--text-muted)' }}>
                  Target: {milestone.roleTarget}
                </div>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: '0.2rem 0' }}>
                  {milestone.description}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {milestone.estimatedWeeks} • {milestone.coursesCount} Courses
                  </span>
                  <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                    {milestone.keySkills.map((k) => (
                      <span key={k} style={{ fontSize: '0.65rem', backgroundColor: '#FFFFFF', padding: '0.1rem 0.35rem', borderRadius: '3px', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Navigation Bar */}
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
          {/* Provider Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {(['All', 'iGOT Karmayogi', 'NSSTA TPAC'] as const).map((prov) => (
              <button
                key={prov}
                onClick={() => setProviderFilter(prov)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: providerFilter === prov ? 700 : 500,
                  backgroundColor: providerFilter === prov ? 'var(--primary-navy)' : 'var(--bg-subtle)',
                  color: providerFilter === prov ? '#FFFFFF' : 'var(--text-secondary)',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: providerFilter === prov ? 'var(--primary-navy)' : 'var(--border-subtle)',
                }}
              >
                {prov}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div style={{ position: 'relative', width: '320px' }}>
            <Search
              size={15}
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              type="text"
              placeholder="Search course title or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.45rem 0.75rem 0.45rem 2.1rem',
                fontSize: '0.8rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Secondary filters: Category, Difficulty, Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.78rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.75rem' }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Difficulty:</span>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              style={{ padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.75rem' }}
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.75rem' }}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {(categoryFilter !== 'All' || statusFilter !== 'All' || difficultyFilter !== 'All' || providerFilter !== 'All' || searchQuery !== '') && (
            <button
              onClick={() => {
                setProviderFilter('All');
                setCategoryFilter('All');
                setStatusFilter('All');
                setDifficultyFilter('All');
                setSearchQuery('');
              }}
              style={{ color: 'var(--accent-blue)', fontWeight: 600, marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '3px' }}
            >
              <X size={14} /> Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Course Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.25rem' }}>
        {filteredCourses.map((course) => {
          const isIGOT = course.provider === 'iGOT Karmayogi';

          return (
            <div
              key={course.id}
              className="gov-card gov-card-interactive"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: isIGOT ? '4px solid var(--igot-purple)' : '4px solid var(--nssta-gold)',
                position: 'relative',
              }}
              onClick={() => setSelectedCourse(course)}
            >
              <div>
                {/* Header Tag Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <span className={`badge ${isIGOT ? 'badge-igot' : 'badge-nssta'}`}>
                    {course.provider}
                  </span>

                  <span
                    className={`badge ${
                      course.status === 'Mandatory'
                        ? 'badge-critical'
                        : course.status === 'In Progress'
                        ? 'badge-high'
                        : course.status === 'Completed'
                        ? 'badge-low'
                        : 'badge-medium'
                    }`}
                  >
                    {course.status}
                  </span>
                </div>

                {/* Course Title */}
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-navy)', lineHeight: 1.35, marginBottom: '0.5rem' }}>
                  {course.title}
                </h3>

                {/* Meta details */}
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    <Clock size={12} /> {course.duration}
                  </span>
                  <span>•</span>
                  <span>{course.difficulty}</span>
                  <span>•</span>
                  <span>{course.format}</span>
                </div>

                {/* Recommendation Reason Box */}
                <div
                  style={{
                    backgroundColor: 'var(--bg-subtle)',
                    padding: '0.65rem 0.8rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    marginBottom: '0.85rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.15rem' }}>
                    <Sparkles size={12} style={{ color: 'var(--gov-saffron)' }} />
                    Why Recommended:
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                    {course.recommendationReason}
                  </p>
                </div>

                {/* Skills Covered Tags */}
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  {course.skillsCovered.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: '0.68rem',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '4px',
                        padding: '0.15rem 0.45rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Progress & Action */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                {course.progress !== undefined ? (
                  <div style={{ marginBottom: '0.6rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Module Completion</span>
                      <span style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>{course.progress}%</span>
                    </div>
                    <div style={{ height: '6px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${course.progress}%`,
                          height: '100%',
                          backgroundColor: isIGOT ? 'var(--igot-purple)' : 'var(--nssta-gold)',
                          borderRadius: 'var(--radius-full)',
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                    <span>⭐ {course.rating} Rating</span>
                    <span>{course.enrolledCount} Officers Enrolled</span>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnroll(course);
                    }}
                    className={isIGOT ? 'btn-primary' : 'btn-saffron'}
                    style={{ flex: 1, fontSize: '0.75rem', padding: '0.45rem 0.6rem', justifyContent: 'center' }}
                  >
                    {course.progress !== undefined ? 'Resume Module' : isIGOT ? 'Enroll via iGOT SSO' : 'Register for TPAC Workshop'}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCourse(course);
                    }}
                    className="btn-secondary"
                    style={{ fontSize: '0.75rem', padding: '0.45rem 0.6rem' }}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)',
            padding: '1rem',
          }}
          onClick={() => setSelectedCourse(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '650px',
              width: '100%',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-xl)',
              animation: 'fadeIn 0.2s ease-out',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span className={`badge ${selectedCourse.provider === 'iGOT Karmayogi' ? 'badge-igot' : 'badge-nssta'}`}>
                    {selectedCourse.provider}
                  </span>
                  <span className="badge badge-category">{selectedCourse.category}</span>
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-navy)', margin: 0 }}>
                  {selectedCourse.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                style={{ padding: '0.4rem', borderRadius: '50%', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-page)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                fontSize: '0.78rem',
              }}
            >
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>Format:</span>
                <strong>{selectedCourse.format}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>Duration:</span>
                <strong>{selectedCourse.duration}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>Difficulty:</span>
                <strong>{selectedCourse.difficulty}</strong>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '0.35rem' }}>
                AI Recommendation Alignment:
              </h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {selectedCourse.recommendationReason}
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '0.35rem' }}>
                Target Competencies Bridged:
              </h4>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {selectedCourse.skillsCovered.map((s) => (
                  <span key={s} className="badge badge-medium" style={{ fontSize: '0.75rem' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => setSelectedCourse(null)} className="btn-secondary">
                Close
              </button>
              <button
                onClick={() => {
                  handleEnroll(selectedCourse);
                  setSelectedCourse(null);
                }}
                className={selectedCourse.provider === 'iGOT Karmayogi' ? 'btn-primary' : 'btn-saffron'}
              >
                Confirm Official Nomination
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
