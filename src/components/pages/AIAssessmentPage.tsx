import React, { useState } from 'react';
import {
  MessageSquareCheck,
  Bot,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Send,
  Brain,
  CheckCircle,
  XCircle,
  FileText
} from 'lucide-react';
import { aiAssessmentChat, quizQuestions } from '../../data/mockData';

export const AIAssessmentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'interview' | 'quiz'>('interview');

  // Conversational state
  const [visibleMessagesCount, setVisibleMessagesCount] = useState<number>(aiAssessmentChat.length);
  const [customInput, setCustomInput] = useState<string>('');

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<number, boolean>>({});

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (submittedQuestions[questionId]) return; // locked once answered
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuestion = (questionId: number) => {
    if (selectedAnswers[questionId] === undefined) return;
    setSubmittedQuestions((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmittedQuestions({});
  };

  // Compute quiz score
  const totalAnswered = Object.keys(submittedQuestions).length;
  const correctCount = Object.keys(submittedQuestions).filter((qId) => {
    const q = quizQuestions.find((item) => item.id === Number(qId));
    return q && selectedAnswers[Number(qId)] === q.correctOptionIndex;
  }).length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2.5rem' }}>
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
              <Bot size={14} /> Karmayogi AI Evaluator Engine
            </span>
            <span className="badge badge-low" style={{ fontSize: '0.75rem' }}>
              Standard: MoSPI / NSSTA Matrix
            </span>
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-navy)', letterSpacing: '-0.02em', margin: 0 }}>
            AI Competency Assessment & Diagnostic Center
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem', maxWidth: '780px' }}>
            Evaluate your practical statistical readiness through contextual scenario interviews and official diagnostic quizzes based on UN SNA 2008 and MoSPI survey protocols.
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--bg-subtle)',
            padding: '0.3rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <button
            onClick={() => setActiveTab('interview')}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 700,
              backgroundColor: activeTab === 'interview' ? 'var(--primary-navy)' : 'transparent',
              color: activeTab === 'interview' ? '#FFFFFF' : 'var(--text-secondary)',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <MessageSquareCheck size={16} />
            AI Competency Interview
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 700,
              backgroundColor: activeTab === 'quiz' ? 'var(--primary-navy)' : 'transparent',
              color: activeTab === 'quiz' ? '#FFFFFF' : 'var(--text-secondary)',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <HelpCircle size={16} />
            Diagnostic Skill Quiz ({quizQuestions.length})
          </button>
        </div>
      </div>

      {/* TAB 1: AI Competency Interview */}
      {activeTab === 'interview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
          {/* Left Column: Chat Conversation Interface */}
          <div className="gov-card" style={{ display: 'flex', flexDirection: 'column', height: '640px', padding: 0, overflow: 'hidden' }}>
            {/* Chat Header */}
            <div
              style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--igot-purple)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Bot size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                    Karmayogi AI Assessor (MoSPI Model v2.4)
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--gov-green)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--gov-green)' }} />
                    Scenario Assessment: National Accounts & DPDPA
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setVisibleMessagesCount(visibleMessagesCount >= aiAssessmentChat.length ? 3 : aiAssessmentChat.length)}
                  className="btn-secondary"
                  style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}
                >
                  {visibleMessagesCount >= aiAssessmentChat.length ? 'Show Initial Step' : 'Show Full Dialog'}
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div
              style={{
                flex: 1,
                padding: '1.25rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                backgroundColor: '#FAFAFA',
              }}
            >
              {aiAssessmentChat.slice(0, visibleMessagesCount).map((msg) => {
                const isAI = msg.sender === 'ai';

                return (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isAI ? 'flex-start' : 'flex-end',
                      gap: '0.35rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.6rem',
                        maxWidth: '85%',
                        flexDirection: isAI ? 'row' : 'row-reverse',
                      }}
                    >
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          backgroundColor: isAI ? 'var(--igot-purple)' : 'var(--primary-navy)',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        {isAI ? <Bot size={16} /> : 'RS'}
                      </div>

                      <div
                        style={{
                          backgroundColor: isAI ? '#FFFFFF' : 'var(--primary-navy)',
                          color: isAI ? 'var(--text-main)' : '#FFFFFF',
                          padding: '0.85rem 1rem',
                          borderRadius: 'var(--radius-lg)',
                          border: isAI ? '1px solid var(--border-subtle)' : 'none',
                          boxShadow: 'var(--shadow-sm)',
                          fontSize: '0.825rem',
                          lineHeight: 1.5,
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>

                    {/* Competency Pill Evaluation if attached */}
                    {msg.competencyPill && (
                      <div
                        style={{
                          marginRight: isAI ? 0 : '38px',
                          marginLeft: isAI ? '38px' : 0,
                          backgroundColor: 'var(--gov-green-light)',
                          border: '1px solid rgba(13, 138, 78, 0.25)',
                          borderRadius: 'var(--radius-full)',
                          padding: '0.2rem 0.65rem',
                          fontSize: '0.7rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          color: 'var(--gov-green)',
                          fontWeight: 700,
                        }}
                      >
                        <Sparkles size={12} />
                        <span>AI Evaluated: {msg.competencyPill.skill} → {msg.competencyPill.evaluatedLevel} ({msg.competencyPill.confidence}% confidence)</span>
                      </div>
                    )}

                    <span style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', marginRight: isAI ? 0 : '42px', marginLeft: isAI ? '42px' : 0 }}>
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Chat Input Simulation */}
            <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--border-subtle)', backgroundColor: '#FFFFFF', display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Simulate response to AI Evaluator..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && customInput.trim()) {
                    setCustomInput('');
                  }
                }}
                style={{
                  flex: 1,
                  padding: '0.55rem 0.85rem',
                  fontSize: '0.8rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  outline: 'none',
                }}
              />
              <button
                onClick={() => {
                  if (visibleMessagesCount < aiAssessmentChat.length) {
                    setVisibleMessagesCount(visibleMessagesCount + 1);
                  }
                  setCustomInput('');
                }}
                className="btn-primary"
                style={{ fontSize: '0.78rem', padding: '0.5rem 0.9rem' }}
              >
                <Send size={14} /> Send
              </button>
            </div>
          </div>

          {/* Right Column: Real-Time Competency Scorecard Generated from Conversation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #0B2545 0%, #134074 100%)',
                color: 'white',
                borderRadius: 'var(--radius-xl)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#93C5FD', fontWeight: 700 }}>
                    AI Conversation Scorecard
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0.2rem 0' }}>
                    Evaluated Competency Index
                  </h3>
                </div>
                <div
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.25)',
                    color: '#A7F3D0',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  Grade A • Distinction
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>87</span>
                <span style={{ fontSize: '1.1rem', color: '#94A3B8' }}>/ 100</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#6EE7B7', fontWeight: 600 }}>
                  +11 pts above baseline
                </span>
              </div>

              <p style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.45, margin: 0 }}>
                Generated from multi-turn interview evaluation. High demonstration of survey weight modeling and microdata privacy under DPDPA standards.
              </p>
            </div>

            {/* Skill-wise assessment rubric breakdown */}
            <div className="gov-card">
              <div className="section-header" style={{ marginBottom: '0.75rem' }}>
                <h3 className="section-title" style={{ fontSize: '1rem' }}>
                  <Brain size={18} style={{ color: 'var(--accent-blue)' }} />
                  Skill-Wise Evaluation Breakdown
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  { name: 'Survey Imputation & Validation', score: 88, level: 'Level 4.4 • Advanced', delta: '+0.2' },
                  { name: 'Data Anonymization & DPDPA 2023', score: 84, level: 'Level 4.2 • Proficient', delta: '+1.8 (Bridged!)' },
                  { name: 'National Accounts (SNA 2008)', score: 89, level: 'Level 4.5 • Advanced', delta: '+1.4' },
                  { name: 'Official Statistics Governance', score: 92, level: 'Level 4.6 • Mastered', delta: '+0.1' },
                ].map((item) => (
                  <div key={item.name} style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.6rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.825rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{item.name}</span>
                      <span style={{ fontWeight: 800, color: 'var(--accent-blue)' }}>{item.score}%</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      <span>{item.level}</span>
                      <span style={{ color: 'var(--gov-green)', fontWeight: 700 }}>{item.delta}</span>
                    </div>

                    <div style={{ height: '5px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden', marginTop: '0.3rem' }}>
                      <div
                        style={{
                          width: `${item.score}%`,
                          height: '100%',
                          backgroundColor: item.score >= 85 ? 'var(--gov-green)' : 'var(--accent-blue)',
                          borderRadius: 'var(--radius-full)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official AI Recommendation Card */}
            <div
              style={{
                backgroundColor: 'var(--gov-saffron-light)',
                border: '1px solid rgba(230, 81, 0, 0.25)',
                borderRadius: 'var(--radius-lg)',
                padding: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', fontWeight: 800, color: 'var(--gov-saffron)', marginBottom: '0.35rem' }}>
                <Sparkles size={16} />
                <span>MoSPI Cadre Reviewer Action:</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#7C2D12', lineHeight: 1.45, margin: 0 }}>
                Score verified for Dr. Rajesh Kumar Sharma. Endorsed for nomination to the <strong>2026 Base Year Revision Inter-Divisional Committee</strong> and qualified for NSSTA TPAC Advanced Certification.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Diagnostic Skill Quiz */}
      {activeTab === 'quiz' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Quiz Stats Banner */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '1rem 1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Progress Status
              </span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                {totalAnswered} of {quizQuestions.length} Questions Completed
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Diagnostic Accuracy:</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gov-green)' }}>
                  {totalAnswered > 0 ? `${Math.round((correctCount / totalAnswered) * 100)}%` : '--'} ({correctCount} Correct)
                </div>
              </div>

              <button onClick={handleResetQuiz} className="btn-secondary" style={{ fontSize: '0.75rem' }}>
                <RotateCcw size={14} /> Reset Quiz
              </button>
            </div>
          </div>

          {/* Questions List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {quizQuestions.map((q, idx) => {
              const isSubmitted = submittedQuestions[q.id];
              const selectedOpt = selectedAnswers[q.id];
              const isCorrect = selectedOpt === q.correctOptionIndex;

              return (
                <div
                  key={q.id}
                  className="gov-card"
                  style={{
                    borderColor: isSubmitted
                      ? isCorrect
                        ? 'var(--gov-green)'
                        : 'var(--status-critical)'
                      : 'var(--border-card)',
                    borderLeft: isSubmitted
                      ? isCorrect
                        ? '5px solid var(--gov-green)'
                        : '5px solid var(--status-critical)'
                      : '5px solid var(--accent-blue)',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          backgroundColor: 'var(--primary-navy)',
                          color: 'white',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.5rem',
                        }}
                      >
                        Question {idx + 1}
                      </span>
                      <span className="badge badge-category" style={{ fontSize: '0.68rem' }}>
                        {q.category}
                      </span>
                    </div>

                    {isSubmitted && (
                      <span
                        className={`badge ${isCorrect ? 'badge-low' : 'badge-critical'}`}
                        style={{ fontSize: '0.72rem' }}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle size={12} /> Correct (+1.0)
                          </>
                        ) : (
                          <>
                            <XCircle size={12} /> Incorrect (0.0)
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1.45 }}>
                    {q.question}
                  </h3>

                  {/* Options List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedOpt === optIdx;
                      const isOptionCorrect = optIdx === q.correctOptionIndex;

                      let optBg = '#FFFFFF';
                      let optBorder = 'var(--border-subtle)';
                      let optColor = 'var(--text-secondary)';

                      if (isSubmitted) {
                        if (isOptionCorrect) {
                          optBg = 'var(--gov-green-light)';
                          optBorder = 'var(--gov-green)';
                          optColor = '#065F46';
                        } else if (isOptionSelected && !isOptionCorrect) {
                          optBg = 'var(--status-critical-bg)';
                          optBorder = 'var(--status-critical)';
                          optColor = '#991B1B';
                        }
                      } else if (isOptionSelected) {
                        optBg = 'var(--accent-blue-light)';
                        optBorder = 'var(--accent-blue)';
                        optColor = 'var(--accent-blue)';
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          style={{
                            padding: '0.65rem 0.9rem',
                            borderRadius: 'var(--radius-md)',
                            border: `1.5px solid ${optBorder}`,
                            backgroundColor: optBg,
                            color: optColor,
                            fontSize: '0.825rem',
                            cursor: isSubmitted ? 'default' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.15s',
                            fontWeight: isOptionSelected || (isSubmitted && isOptionCorrect) ? 600 : 400,
                          }}
                        >
                          <span>{opt}</span>
                          {isSubmitted && isOptionCorrect && (
                            <CheckCircle2 size={16} style={{ color: 'var(--gov-green)', flexShrink: 0 }} />
                          )}
                          {isSubmitted && isOptionSelected && !isOptionCorrect && (
                            <XCircle size={16} style={{ color: 'var(--status-critical)', flexShrink: 0 }} />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Submit Question Action */}
                  {!isSubmitted && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleSubmitQuestion(q.id)}
                        disabled={selectedOpt === undefined}
                        className="btn-primary"
                        style={{
                          fontSize: '0.78rem',
                          padding: '0.4rem 0.9rem',
                          opacity: selectedOpt === undefined ? 0.5 : 1,
                          cursor: selectedOpt === undefined ? 'not-allowed' : 'pointer',
                        }}
                      >
                        Submit & Verify Answer
                      </button>
                    </div>
                  )}

                  {/* Explanation & Official Reference Box displayed after answering */}
                  {isSubmitted && (
                    <div
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: isCorrect ? 'var(--gov-green-light)' : 'var(--bg-subtle)',
                        border: `1px solid ${isCorrect ? 'rgba(13, 138, 78, 0.25)' : 'var(--border-subtle)'}`,
                        animation: 'fadeIn 0.25s ease-out',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 800, color: isCorrect ? 'var(--gov-green)' : 'var(--text-main)', marginBottom: '0.25rem' }}>
                        <Sparkles size={14} />
                        <span>Methodology Explanation & Justification:</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                        {q.explanation}
                      </p>
                      <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <FileText size={12} />
                        <span>Official Reference: {q.referenceSource}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
