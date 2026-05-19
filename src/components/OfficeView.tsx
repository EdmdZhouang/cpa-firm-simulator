import { useGameStore } from '../store/game-store';

export default function OfficeView() {
  const { playerState, openReview } = useGameStore();
  const { completedCases, unlockedCases, vulnerabilities, resources, activeCaseId } = playerState;
  
  const activeVulnCount = vulnerabilities.filter(v => !v.cleared).length;
  const isLowCash = resources.cash < 2000;
  const isHighRisk = resources.risk >= 70;
  const isTired = resources.energy < resources.maxEnergy * 0.3;

  // Simple character state
  const getPlayerSprite = () => {
    if (isTired) return '/sprites/v2/256/character/player-tired-1.png';
    if (activeCaseId) return '/sprites/v2/256/character/player-working-computer.png';
    return '/sprites/v2/256/character/player-idle.png';
  };

  return (
    <div className="office-view">
      <div className="office-scene">
        <h2 className="office-title">一人工作室</h2>
        
        {/* Environment props */}
        <div className="office-furniture pixel-window">
          <img src="/sprites/v2/128/office/window-sunny.png" alt="窗户" />
        </div>
        <div className="office-furniture pixel-clock">
          <img src="/sprites/v2/128/office/wall-clock.png" alt="时钟" />
        </div>
        <div className="office-furniture pixel-coffee">
          <img src="/sprites/v2/128/office/coffee-cup.png" alt="咖啡" />
        </div>
        
        <div className="office-furniture pixel-desk">
          <img src="/sprites/v2/256/office/desk-computer.png" alt="办公桌" />
        </div>
        
        <div className="office-furniture pixel-player">
          <img src={getPlayerSprite()} alt="主角" />
        </div>
        
        <div className="office-furniture pixel-cabinet">
          <img src="/sprites/v2/256/office/filing-cabinet.png" alt="文件柜" />
        </div>
        
        <div className="office-furniture pixel-printer">
          <img src="/sprites/v2/128/office/printer.png" alt="打印机" />
        </div>
        
        {/* File stack for vulnerabilities */}
        {activeVulnCount > 0 && (
          <div className="file-pile">
            <img src="/sprites/v2/128/folders/file-stack.png" alt="待处理文件" />
            {activeVulnCount > 1 && (
              <span className="file-pile-count">{activeVulnCount}</span>
            )}
          </div>
        )}
        
        {/* High risk alert */}
        {isHighRisk && (
          <div className="risk-alert">
            <img src="/sprites/v2/128/feedback/alert-lamp.png" alt="风险警报" />
          </div>
        )}
        
        {/* Low cash indicator */}
        {isLowCash && (
          <div className="bill-pile">
            <img src="/sprites/v2/128/feedback/coin-reward.png" alt="资金紧张" style={{ filter: 'grayscale(1) brightness(0.5)' }} />
          </div>
        )}
        
        <div className="office-info">
          <div className="office-info-item">
            <img src="/sprites/v2/128/folders/folder-archive.png" alt="" className="office-info-icon" />
            <span>已完成: {completedCases.length} 个案件</span>
          </div>
          <div className="office-info-item">
            <img src="/sprites/v2/128/folders/folder-accounting.png" alt="" className="office-info-icon" />
            <span>已解锁: {unlockedCases.length} 个案件</span>
          </div>
          <div className="office-info-item">
            <img src="/sprites/v2/128/folders/folder-risk.png" alt="" className="office-info-icon" />
            <span>知识漏洞: {activeVulnCount} 个</span>
          </div>
          <RiskAlert isHighRisk={isHighRisk} />
          <CashAlert isLowCash={isLowCash} />
          <button className="office-action-btn" onClick={openReview}>
            <img src="/sprites/v2/128/folders/review-note-stack.png" alt="" className="btn-icon" />
            复盘漏洞 ({activeVulnCount})
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
      <img src="/sprites/v2/128/feedback/risk-warning-popup.png" alt="" className="office-info-icon" style={{ width: 20, height: 20 }} />
      <span>风险过高！请降低风险</span>
    </div>
  );
}

function CashAlert({ isLowCash }: { isLowCash: boolean }) {
  if (!isLowCash) return null;
  return (
    <div className="office-info-item" style={{ color: '#f1c40f' }}>
      <img src="/sprites/v2/128/feedback/coin-reward.png" alt="" className="office-info-icon" style={{ width: 20, height: 20, filter: 'grayscale(1) brightness(0.5)' }} />
      <span>现金紧张！注意支出</span>
    </div>
  );
}

function CaseBoard() {
  const { allCases, playerState, startCase } = useGameStore();
  const { unlockedCases, completedCases, activeCaseId } = playerState;

  const subjects = [
    { key: '会计', label: '会计', colorClass: 'acc', folder: '/sprites/v2/128/folders/folder-accounting.png' },
    { key: '税法', label: '税法', colorClass: 'tax', folder: '/sprites/v2/128/folders/folder-tax.png' },
    { key: '经济法', label: '经济法', colorClass: 'law', folder: '/sprites/v2/128/folders/folder-law.png' },
  ] as const;

  const getCaseStatus = (caseId: string) => {
    if (completedCases.includes(caseId)) return 'completed';
    if (activeCaseId === caseId) return 'active';
    if (unlockedCases.includes(caseId)) return 'available';
    return 'locked';
  };

  return (
    <div className="case-board">
      <h3>
        <img src="/sprites/v2/128/office/case-board.png" alt="" className="case-board-icon" />
        案件板
      </h3>
      {subjects.map(({ key, label, colorClass, folder }) => {
        const subjectCases = allCases.filter(c => c.subject === key);
        if (subjectCases.length === 0) return null;
        
        return (
          <div key={key} className={`case-section ${colorClass}`}>
            <h4>
              <img src={folder} alt="" className="section-folder-icon" />
              {label}
            </h4>
            {subjectCases.map(c => {
              const status = getCaseStatus(c.id);
              return (
                <div
                  key={c.id}
                  className={`case-card ${status} ${colorClass}`}
                  onClick={() => status === 'available' && startCase(c.id)}
                >
                  <div className="case-folder-icon">
                    <img src={folder} alt="" />
                  </div>
                  <div className="case-content">
                    <div className="case-title">{c.title}</div>
                    <div className="case-meta">
                      <span className="case-difficulty">
                        {Array.from({ length: c.difficulty }).map((_, i) => (
                          <span key={i} className="star">★</span>
                        ))}
                      </span>
                      <span>{c.reward.cash}💰</span>
                      <span>{c.deadlineTurns}天</span>
                    </div>
                  </div>
                  {status === 'completed' && (
                    <div className="case-status-overlay">
                      <img src="/sprites/v2/128/feedback/pass-stamp.png" alt="已完成" />
                    </div>
                  )}
                  {status === 'active' && (
                    <div className="case-status-overlay active-indicator">
                      <img src="/sprites/v2/128/feedback/progress-arrow.png" alt="进行中" />
                    </div>
                  )}
                  {status === 'locked' && (
                    <div className="case-status-overlay locked-overlay">
                      <img src="/sprites/v2/128/feedback/locked-seal.png" alt="锁定" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
