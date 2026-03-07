import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { calculateWritingStats, getReadabilityLevel, type WritingStats } from './writing-stats';
import './stats.css';
import type { AnalyticsSummary } from '../types';

const StatsPopup = () => {
  const [stats, setStats] = useState<WritingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Get active element's text
      const response = await chrome.runtime.sendMessage({ type: 'GET_ACTIVE_TEXT' });
      const analyticsResponse = await chrome.runtime.sendMessage({ type: 'GET_ANALYTICS_SUMMARY' });
      setAnalytics(analyticsResponse);
      
      if (response?.text) {
        const calculatedStats = calculateWritingStats(response.text, response.issues);
        setStats(calculatedStats);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="stats-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Calculating statistics...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="stats-container">
        <div className="empty-state">
          <p>No text to analyze. Start typing to see statistics.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="stats-container">
      <header className="stats-header">
        <h1>📊 Writing Statistics</h1>
      </header>

      <main className="stats-main">
        {/* Quick Stats Grid */}
        <section className="stats-section">
          <h2>Overview</h2>
          <div className="stats-grid">
            <StatCard label="Words" value={stats.wordCount.toLocaleString()} />
            <StatCard label="Characters" value={stats.characterCount.toLocaleString()} />
            <StatCard label="Sentences" value={stats.sentenceCount.toLocaleString()} />
            <StatCard label="Paragraphs" value={stats.paragraphCount.toLocaleString()} />
          </div>
        </section>

        {/* Readability */}
        <section className="stats-section">
          <h2>Readability</h2>
          <div className="readability-card">
            <div className="readability-score">
              <span className="score-value">{stats.fleschReadingEase}</span>
              <span className="score-label">Flesch Reading Ease</span>
            </div>
            <div className="readability-level">{getReadabilityLevel(stats.fleschReadingEase)}</div>
            <div className="readability-details">
              <div className="detail-item">
                <span className="detail-label">Grade Level:</span>
                <span className="detail-value">{stats.fleschKincaidGrade}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Avg Sentence:</span>
                <span className="detail-value">{stats.averageSentenceLength.toFixed(1)} words</span>
              </div>
            </div>
          </div>
        </section>

        {/* Time Estimates */}
        <section className="stats-section">
          <h2>Reading Time</h2>
          <div className="time-grid">
            <TimeCard
              icon="📖"
              label="Reading Time"
              value={formatTime(stats.readingTimeSeconds)}
            />
            <TimeCard
              icon="🎤"
              label="Speaking Time"
              value={formatTime(stats.speakingTimeSeconds)}
            />
          </div>
        </section>

        {/* Vocabulary */}
        <section className="stats-section">
          <h2>Vocabulary</h2>
          <div className="vocab-grid">
            <StatCard label="Unique Words" value={stats.uniqueWords.toLocaleString()} />
            <StatCard label="Vocabulary Diversity" value={`${stats.vocabularyDiversity.toFixed(1)}%`} />
            <StatCard label="Avg Word Length" value={stats.averageWordLength.toFixed(1)} />
            <StatCard label="Syllables" value={stats.syllableCount.toLocaleString()} />
          </div>
        </section>

        {/* Issues Breakdown */}
        {stats.grammarIssues + stats.spellingIssues + stats.clarityIssues + stats.styleIssues > 0 && (
          <section className="stats-section">
            <h2>Issues Found</h2>
            <div className="issues-grid">
              {stats.grammarIssues > 0 && (
                <IssueCard type="grammar" count={stats.grammarIssues} color="#ef4444" />
              )}
              {stats.spellingIssues > 0 && (
                <IssueCard type="spelling" count={stats.spellingIssues} color="#ef4444" />
              )}
              {stats.clarityIssues > 0 && (
                <IssueCard type="clarity" count={stats.clarityIssues} color="#f59e0b" />
              )}
              {stats.styleIssues > 0 && (
                <IssueCard type="style" count={stats.styleIssues} color="#3b82f6" />
              )}
            </div>
          </section>
        )}

        {analytics && (
          <section className="stats-section">
            <h2>Synced Usage</h2>
            <div className="stats-grid">
              <StatCard label="Analyses" value={analytics.totals.analysis_runs || 0} />
              <StatCard label="Suggestions Applied" value={analytics.totals.suggestions_applied || 0} />
              <StatCard label="Autocomplete Accepted" value={analytics.totals.autocomplete_accepted || 0} />
              <StatCard label="Rewrites Applied" value={analytics.totals.rewrite_applied || 0} />
            </div>
            <p className="sync-caption">
              Synced activity {analytics.lastUpdatedAt ? `updated ${new Date(analytics.lastUpdatedAt).toLocaleString()}` : 'has not been recorded yet'}.
            </p>
          </section>
        )}
      </main>
    </div>
  );
};

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function TimeCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="time-card">
      <span className="time-icon">{icon}</span>
      <div className="time-info">
        <div className="time-value">{value}</div>
        <div className="time-label">{label}</div>
      </div>
    </div>
  );
}

function IssueCard({ type, count, color }: { type: string; count: number; color: string }) {
  return (
    <div className="issue-card" style={{ borderColor: color }}>
      <span className="issue-count" style={{ color }}>{count}</span>
      <span className="issue-type">{type}</span>
    </div>
  );
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StatsPopup />
  </React.StrictMode>
);
