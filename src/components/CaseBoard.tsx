import { useGameStore } from '../store/game-store';

interface CaseBoardProps {
  onSelectCase?: (caseId: string) => void;
}

export default function CaseBoard({ onSelectCase }: CaseBoardProps) {
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

  const handleClick = (caseId: string, status: string) => {
    if (status !== 'available') return;
    if (onSelectCase) {
      onSelectCase(caseId);
    } else {
      startCase(caseId);
    }
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
                  onClick={() => handleClick(c.id, status)}
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
