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
      <h2>
        <img src="/sprites/v2/128/folders/review-note-stack.png" alt="" className="panel-icon" />
        知识漏洞复盘
      </h2>
      
      {activeVulns.length === 0 && (
        <p className="review-empty">
          <img src="/sprites/v2/128/feedback/pass-stamp.png" alt="" className="empty-icon" />
          没有未清除的漏洞！继续保持！
        </p>
      )}
      
      <div className="vuln-list">
        {activeVulns.map(v => (
          <div 
            key={v.id} 
            className={`vuln-card ${archivingId === v.id ? 'vuln-archiving' : ''}`}
          >
            <div className="vuln-header">
              <img 
                src={`/sprites/v2/128/folders/folder-${v.subject === '会计' ? 'accounting' : v.subject === '税法' ? 'tax' : 'law'}.png`} 
                alt="" 
                className="vuln-folder-icon" 
              />
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
                <img src="/sprites/v2/128/feedback/stamp.png" alt="" className="btn-icon" />
                {archivingId === v.id ? '归档中...' : '清除漏洞'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {clearedVulns.length > 0 && (
        <div className="cleared-section">
          <h3>
            <img src="/sprites/v2/128/folders/folder-archive.png" alt="" className="section-icon" />
            已归档漏洞 ({clearedVulns.length})
          </h3>
          <div className="vuln-list">
            {clearedVulns.map(v => (
              <div key={v.id} className="vuln-card cleared">
                <div className="vuln-header">
                  <img 
                    src={`/sprites/v2/128/folders/folder-${v.subject === '会计' ? 'accounting' : v.subject === '税法' ? 'tax' : 'law'}.png`} 
                    alt="" 
                    className="vuln-folder-icon" 
                  />
                  <span className="vuln-subject">{v.subject}</span>
                  <span className="cleared-badge">
                    <img src="/sprites/v2/128/feedback/pass-stamp.png" alt="" />
                    已清除
                  </span>
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
