import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import type { NavigationTab } from './components/layout/Sidebar';
import { DashboardPage } from './components/pages/DashboardPage';
import { SkillIntelligencePage } from './components/pages/SkillIntelligencePage';
import { LearningPage } from './components/pages/LearningPage';
import { AIAssessmentPage } from './components/pages/AIAssessmentPage';
import { Shield } from 'lucide-react';
import './App.css';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [learningSearchSkill, setLearningSearchSkill] = useState<string>('');

  const handleFilterLearningBySkill = (skillName: string) => {
    setLearningSearchSkill(skillName);
    setCurrentTab('learning');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-page)' }}>
      {/* Top Header */}
      <Header
        onNavigateToTab={(tab) => setCurrentTab(tab as NavigationTab)}
        onSearchChange={(query) => {
          if (query.trim()) {
            setLearningSearchSkill(query);
            if (currentTab !== 'learning' && currentTab !== 'skills') {
              setCurrentTab('skills');
            }
          }
        }}
      />

      {/* Main Body with Sidebar + Content */}
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar currentTab={currentTab} onSelectTab={setCurrentTab} />

        <main
          style={{
            flex: 1,
            padding: '1.75rem 2.25rem',
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
            overflowX: 'hidden',
          }}
        >
          {/* Breadcrumb & Cadre Indicator Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.25rem',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>MoSPI Karmayogi Portal</span>
              <span>/</span>
              <span style={{ fontWeight: 600, color: 'var(--primary-navy)', textTransform: 'capitalize' }}>
                {currentTab === 'dashboard'
                  ? 'Employee Dashboard'
                  : currentTab === 'skills'
                  ? 'Skill Intelligence'
                  : currentTab === 'learning'
                  ? 'Learning & Recommendations'
                  : 'AI Assessment'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                <Shield size={13} style={{ color: 'var(--gov-green)' }} /> NIC Security Verified
              </span>
              <span>•</span>
              <span>Cadre: ISS (2018)</span>
              <span>•</span>
              <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>MoSPI NAD Division</span>
            </div>
          </div>

          {/* Active Tab View */}
          {currentTab === 'dashboard' && (
            <DashboardPage
              onNavigate={setCurrentTab}
              onSelectCourse={() => setCurrentTab('learning')}
            />
          )}

          {currentTab === 'skills' && (
            <SkillIntelligencePage
              onNavigate={setCurrentTab}
              onFilterLearningBySkill={handleFilterLearningBySkill}
            />
          )}

          {currentTab === 'learning' && (
            <LearningPage initialSearch={learningSearchSkill} />
          )}

          {currentTab === 'assessment' && (
            <AIAssessmentPage />
          )}

          {/* Footer Bar */}
          <footer
            style={{
              marginTop: '3rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
            }}
          >
            <div>
              <strong>Karmayogi SkillIntel Platform</strong> — MoSPI AI Competency & Learning Engine (SIH26101 Prototype)
              <div style={{ marginTop: '0.2rem' }}>
                Aligned with National Data Governance Framework Policy (NDGFP) and Mission Karmayogi (DoPT).
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <span>Ministry of Statistics & Programme Implementation</span>
              <span>•</span>
              <span>NSSTA Greater Noida</span>
              <span>•</span>
              <span>iGOT Karmayogi</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
