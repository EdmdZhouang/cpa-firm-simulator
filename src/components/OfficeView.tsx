import { useGameStore } from '../store/game-store';

export default function OfficeView() {
  const { playerState, openReview } = useGameStore();
  const { completedCases, unlockedCases, vulnerabilities, resources } = playerState;
  
  const activeVulnCount = vulnerabilities.filter(v => !v.cleared).length;
  const isLowCash = resources.cash < 2000;
  const isHighRisk = resources.risk > 60;

  return (
    <div className="office-view">
      <div className="office-scene">
        <h2 className="office-title">🏢 一人工作室</h2>
        
        <div className="office-furniture pixel-desk">
          <img src="/sprites/desk.svg" alt="办公桌" />
        </div>
        
        <div className="office-furniture pixel-player">
          <img src="/sprites/player.svg" alt="主角" />
        </div>
        
        <div className="office-furniture pixel-cabinet">
          <img src="/sprites/cabinet.svg" alt="文件柜" />
        </div>
        
        <div className="office-furniture pixel-printer">
          <img src="/sprites/printer.svg" alt="打印机" />
        </div>
        
        {activeVulnCount > 0 && (
          <div className="file-pile">
            {Array.from({ length: Math.min(activeVulnCount, 5) }).map((_, i) => (
              <div key={i} className="file-item" />
            ))}
          </div>
        )}
        
        {isHighRisk && (
          <div className="risk-alert">
            <img src="/sprites/alert.svg" alt="风险警报" />
          </div>
        )}
        
        {isLowCash && (
          <div className="bill-pile">
            <img src="/sprites/bill.svg" alt="账单" />
          </div>
        )}
        
        <div className="office-info">
          <div className="office-info-item">
            <span>📋</span>
            <span>已完成: {completedCases.length} 个案件</span>
          </div>
          <div className="office-info-item">
            <span>🔓</span>
            <span>已解锁: {unlockedCases.length} 个案件</span>
          </div>
          <div className="office-info-item">
            <span>🐛</span>
            <span>知识漏洞: {activeVulnCount} 个</span>
          </div>
          <RiskAlert isHighRisk={isHighRisk} />
          <CashAlert isLowCash={isLowCash} />
          <button className="office-action-btn" onClick={openReview}>
            🔍 复盘漏洞 ({activeVulnCount})
          </button>
        </div>
      </div>
      <CaseBoard />
    </div>
  );
}

function RiskAlert({ isHighRisk }: { isHighRisk: boolean }) {
  if (!isHighRisk) return null;
  return (
    <div className="office-info-item" style={{ color: '#e74c3c' }}>
      <span>⚠️</span>
      <span>风险过高！请降低风险</span>
    </div>
  );
}

function CashAlert({ isLowCash }: { isLowCash: boolean }) {
  if (!isLowCash) return null;
  return (
    <div className="office-info-item" style={{ color: '#f1c40f' }}>
      <span>💰</span>
      <span>现金紧张！注意支出</span>
    </div>
  );
}

function CaseBoard() {
  const { allCases, playerState, startCase } = useGameStore();
  const { unlockedCases, completedCases, activeCaseId } = playerState;

  const subjects = [
    { key: '会计', label: '会计', colorClass: 'acc' },
    { key: '税法', label: '税法', colorClass: 'tax' },
    { key: '经济法', label: '经济法', colorClass: 'law' },
  ] as const;

  const getCaseStatus = (caseId: string) => {
    if (completedCases.includes(caseId)) return 'completed';
    if (activeCaseId === caseId) return 'active';
    if (unlockedCases.includes(caseId)) return 'available';
    return 'locked';
  };

  return (
    <div className="case-board">
      <h3>📋 案件板</h3>
      {subjects.map(({ key, label, colorClass }) => {
        const subjectCases = allCases.filter(c => c.subject === key);
        if (subjectCases.length === 0) return null;
        
        return (
          <div key={key} className={`case-section ${colorClass}`}>
            <h4>{label}</h4>
            {subjectCases.map(c => {
              const status = getCaseStatus(c.id);
              return (
                <div
                  key={c.id}
                  className={`case-card ${status} ${colorClass}`}
                  onClick={() => status === 'available' && startCase(c.id)}
                >
                  <div className="case-title">{c.title}</div>
                  <div className="case-meta">
                    <span className="case-difficulty">
                      {Array.from({ length: c.difficulty }).map((_, i) => (
                        <span key={i} className="star">★</span>
                      ))}
                    </span>
                    <span>💰{c.reward.cash}</span>
                    <span>⏱️{c.deadlineTurns}天</span>
                    {status === 'completed' && <span>✅</span>}
                    {status === 'active' && <span>🔄</span>}
                    {status === 'locked' && <span>🔒</span>}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
