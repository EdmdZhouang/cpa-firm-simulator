import { useGameStore } from '../store/game-store';

export default function ResourceBar() {
  const { playerState } = useGameStore();
  const { resources, skills, currentTurn } = playerState;

  const getRiskClass = () => {
    if (resources.risk >= 80) return 'risk-high';
    if (resources.risk >= 60) return 'risk-med';
    return 'risk-low';
  };

  const riskColor = resources.risk >= 80 ? '#e74c3c' : resources.risk >= 60 ? '#f39c12' : 'inherit';

  return (
    <div className="resource-bar">
      <div className="resource-item">
        <img src="/sprites/v2/128/office/wall-clock.png" alt="" className="resource-icon-img" />
        <span className="resource-label">天数</span>
        <span className="resource-value">{currentTurn}</span>
      </div>
      
      <div className="resource-item cash">
        <img src="/sprites/v2/128/feedback/coin-reward.png" alt="" className="resource-icon-img" />
        <span className="resource-label">现金</span>
        <span className="resource-value">{resources.cash}</span>
        <div className="resource-bar-fill">
          <div 
            className="resource-bar-fill-inner cash" 
            style={{ width: `${Math.min(100, resources.cash / 100)}%` }}
          />
        </div>
      </div>
      
      <div className="resource-item reputation">
        <img src="/sprites/v2/128/feedback/reputation-star-badge.png" alt="" className="resource-icon-img" />
        <span className="resource-label">声誉</span>
        <span className="resource-value">{resources.reputation}</span>
        <div className="resource-bar-fill">
          <div 
            className="resource-bar-fill-inner reputation" 
            style={{ width: `${resources.reputation}%` }}
          />
        </div>
      </div>
      
      <div className="resource-item risk">
        <img src="/sprites/v2/128/feedback/alert-lamp.png" alt="" className="resource-icon-img" />
        <span className="resource-label">风险</span>
        <span className="resource-value" style={{ color: riskColor }}>
          {resources.risk}
        </span>
        <div className="resource-bar-fill">
          <div 
            className={`resource-bar-fill-inner ${getRiskClass()}`} 
            style={{ width: `${resources.risk}%` }}
          />
        </div>
      </div>
      
      <div className="resource-item energy">
        <img src="/sprites/v2/128/feedback/fatigue-low-energy.png" alt="" className="resource-icon-img" />
        <span className="resource-label">精力</span>
        <span className="resource-value">{resources.energy}</span>
        <div className="resource-bar-fill">
          <div 
            className="resource-bar-fill-inner energy" 
            style={{ width: `${(resources.energy / resources.maxEnergy) * 100}%` }}
          />
        </div>
      </div>
      
      <div className="resource-item">
        <img src="/sprites/v2/128/feedback/level-up-badge.png" alt="" className="resource-icon-img" />
        <span className="resource-label">熟练度</span>
        <span className="resource-value" style={{ fontSize: '12px' }}>
          <span style={{ color: '#4ecdc4' }}>会{skills.accounting}</span>
          <span style={{ color: '#f39c12' }}> 税{skills.tax}</span>
          <span style={{ color: '#9b59b6' }}> 法{skills.economicLaw}</span>
        </span>
      </div>
    </div>
  );
}
