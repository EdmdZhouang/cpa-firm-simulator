import { useState } from 'react';
import { useGameStore } from '../store/game-store';

export default function ReviewPanel() {
  const { playerState, clearVuln, closeEvent } = useGameStore();
  const [reasons, setReasons] = useState<Record<string, string>>({});

  const activeVulns = playerState.vulnerabilities.filter(v => !v.cleared);
  const clearedVulns = playerState.vulnerabilities.filter(v => v.cleared);

  return (
    <div className="review-panel">
      <h2>🔍 知识漏洞复盘</h2>
      
      {activeVulns.length === 0 && (
        <p style={{ color: '#4c4', marginBottom: 16 }}>🎉 没有未清除的漏洞！</p>
      )}
      
      <div className="vuln-list">
        {activeVulns.map(v => (
          <div key={v.id} className="vuln-card">
            <div className="vuln-header">
              <span className="vuln-subject">{v.subject}</span>
              <span className={`vuln-level ${v.riskLevel}`}>{v.riskLevel}</span>
            </div>
            <div className="vuln-topic">{v.topic}</div>
            <div className="vuln-reason">
              错因: {v.mistakeReason || '未记录'} | 次数: {v.occurrenceCount}
            </div>
            <div className="vuln-actions">
              <input
                type="text"
                placeholder="填写复盘原因..."
                value={reasons[v.id] || ''}
                onChange={e => setReasons({ ...reasons, [v.id]: e.target.value })}
              />
              <button 
                className="action-btn"
                onClick={() => {
                  clearVuln(v.id, reasons[v.id] || '已复盘');
                  setReasons({ ...reasons, [v.id]: '' });
                }}
              >
                ✓ 清除
              </button>
            </div>
          </div>
        ))}
      </div>

      {clearedVulns.length > 0 && (
        <div>
          <h3 style={{ marginTop: 24, marginBottom: 12, color: '#888' }}>已清除漏洞</h3>
          <div className="vuln-list">
            {clearedVulns.map(v => (
              <div key={v.id} className="vuln-card cleared">
                <div className="vuln-header">
                  <span className="vuln-subject">{v.subject}</span>
                  <span>✅ 已清除</span>
                </div>
                <div className="vuln-topic">{v.topic}</div>
                <div className="vuln-reason">{v.mistakeReason}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button className="action-btn primary" onClick={closeEvent} style={{ marginTop: 16 }}>
        ← 返回办公室
      </button>
    </div>
  );
}
