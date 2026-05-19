import { useGameStore } from '../store/game-store';
import CaseBoard from './CaseBoard';

export default function OfficeView() {
  const { playerState, openReview } = useGameStore();

  return (
    <div className="office-view">
      <div className="office-scene">
        <h2 className="office-title">🏢 一人工作室</h2>
        <p>欢迎来到你的CPA事务所！</p>
        <p style={{ marginTop: 12, fontSize: 14, color: '#aaa' }}>
          📋 已完成案件: {playerState.completedCases.length} 个<br/>
          🔓 已解锁案件: {playerState.unlockedCases.length} 个<br/>
          🐛 知识漏洞: {playerState.vulnerabilities.filter(v => !v.cleared).length} 个
        </p>
        <div className="pixel-desk" />
        <div className="pixel-player" />
        
        <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
          <button className="action-btn primary" onClick={openReview}>
            🔍 复盘漏洞 ({playerState.vulnerabilities.filter(v => !v.cleared).length})
          </button>
        </div>
      </div>
      <CaseBoard />
    </div>
  );
}
