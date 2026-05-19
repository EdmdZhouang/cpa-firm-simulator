import { useGameStore } from '../store/game-store';

export default function ResourceBar() {
  const { playerState } = useGameStore();
  const { resources, skills, currentTurn } = playerState;

  return (
    <div className="resource-bar">
      <div className="resource-item">
        <span className="resource-label">📅</span>
        <span className="resource-value">第{currentTurn}天</span>
      </div>
      <div className="resource-item cash">
        <span className="resource-label">💰</span>
        <span className="resource-value">{resources.cash}</span>
      </div>
      <div className="resource-item reputation">
        <span className="resource-label">⭐</span>
        <span className="resource-value">{resources.reputation}</span>
      </div>
      <div className="resource-item risk">
        <span className="resource-label">⚠️</span>
        <span className="resource-value">{resources.risk}</span>
      </div>
      <div className="resource-item energy">
        <span className="resource-label">⚡</span>
        <span className="resource-value">{resources.energy}/{resources.maxEnergy}</span>
      </div>
      <div className="resource-item">
        <span className="resource-label">📊</span>
        <span className="resource-value">会:{skills.accounting} 税:{skills.tax} 法:{skills.economicLaw}</span>
      </div>
    </div>
  );
}
