import { useGameStore } from '../store/game-store';

export default function CaseBoard() {
  const { allCases, playerState, startCase } = useGameStore();
  const { unlockedCases, completedCases, activeCaseId } = playerState;

  const subjects = ['会计', '税法', '经济法'] as const;

  const getCaseStatus = (caseId: string) => {
    if (completedCases.includes(caseId)) return 'completed';
    if (activeCaseId === caseId) return 'active';
    if (unlockedCases.includes(caseId)) return 'available';
    return 'locked';
  };

  return (
    <div className="case-board">
      <h3>📋 案件板</h3>
      {subjects.map(subject => {
        const subjectCases = allCases.filter(c => c.subject === subject);
        return (
          <div key={subject} className="case-section">
            <h4>{subject}</h4>
            {subjectCases.map(c => {
              const status = getCaseStatus(c.id);
              return (
                <div
                  key={c.id}
                  className={`case-card ${status}`}
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
                    {status === 'active' && <span>🔄进行中</span>}
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
