import { useState } from 'react';
import { useGameStore } from '../store/game-store';

export default function ReviewPanel() {
  const { playerState, clearVuln, closeEvent } = useGameStore();
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [archivingId, setArchivingId] = useState<string | null>(null);

  const activeVulns = playerState.vulnerabilities.filter(v => !v.cleared);
  const clearedVulns = playerState.vulnerabilities.filter(v => v.cleared);

  const handleClear = (vulnId: string) => {
    setArchivingId(vulnId);
    setTimeout(() => {
      clearVuln(vulnId, reasons[vulnId] || '已复盘');
      setReasons(prev => ({ ...prev, [vulnId]: '' }));
      setArchivingId(null);
    }, 600);
  };

  return (
    <div className="review-panel">
      <h2>🔍 知识漏洞复盘</h2>
      
      {activeVulns.length === 0 && (
        <p style={{ color: '#2ecc71', marginBottom: 20, fontSize: 16 }}>
          🎉 没有未清除的漏洞！继续保持！
        </p>
      )}
      
      <div className="vuln-list">
        {activeVulns.map(v => (
          <div 
            key={v.id} 
            className={`vuln-card ${archivingId === v.id ? 'vuln-archiving' : ''}`}
          >
            <div className="vuln-header">
              <span className="vuln-subject">{v.subject}</span>
              <span className={`vuln-level ${v.riskLevel}`}>{v.riskLevel}</span>
            </div>
            <div className="vuln-topic">{v.topic}</div>
            <div className="vuln-reason">
              错因: {v.mistakeReason || '未记录'} | 出现次数: {v.occurrenceCount}
            </div>
            <div className="vuln-actions">
              <input
                type="text"
                placeholder="填写复盘原因/学习笔记..."
                value={reasons[v.id] || ''}
                onChange={e => setReasons({ ...reasons, [v.id]: e.target.value })}
                disabled={archivingId === v.id}
              />
              <button 
                className="action-btn primary"
                onClick={() => handleClear(v.id)}
                disabled={archivingId === v.id}
              >
                {archivingId === v.id ? '归档中...' : '✓ 清除漏洞'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {clearedVulns.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h3 style={{ marginBottom: 12, color: '#888', fontSize: 14 }}>
            📂 已归档漏洞 ({clearedVulns.length})
          </h3>
          <div className="vuln-list">
            {clearedVulns.map(v => (
              <div key={v.id} className="vuln-card cleared">
                <div className="vuln-header">
                  <span className="vuln-subject">{v.subject}</span>
                  <span style={{ color: '#2ecc71', fontSize: 12 }}>✅ 已清除</span>
                </div>
                <div className="vuln-topic">{v.topic}</div>
                <div className="vuln-reason">{v.mistakeReason}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button 
        className="action-btn primary" 
        onClick={closeEvent} 
        style={{ marginTop: 20 }}
      >
        ← 返回办公室
      </button>
    </div>
  );
}
