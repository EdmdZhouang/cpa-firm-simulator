import { useEffect } from 'react';
import { useGameStore } from './store/game-store';
import OfficeView from './components/OfficeView';
import ResourceBar from './components/ResourceBar';
import BattleView from './components/BattleView';
import ReviewPanel from './components/ReviewPanel';
import EventModal from './components/EventModal';
import { hasSave } from './engine/save-load';
import './App.css';

function App() {
  const { 
    contentLoaded, gamePhase, eventMessage, 
    loadContent, save, load 
  } = useGameStore();

  useEffect(() => {
    Promise.all([
      fetch('/content/questions.json').then(r => r.json()),
      fetch('/content/cases.json').then(r => r.json()),
    ]).then(([qData, cData]) => {
      loadContent(qData.questions, cData.cases);
      if (hasSave()) {
        load();
      }
    }).catch(err => {
      console.error('加载内容失败:', err);
    });
  }, [loadContent, load]);

  if (!contentLoaded) {
    return (
      <div className="loading">
        <div className="loading-text">🏢 正在进入事务所...</div>
        <div className="loading-bar">
          <div className="loading-bar-fill" />
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <ResourceBar />
      
      {gamePhase === 'office' && <OfficeView />}
      {(gamePhase === 'case-battle' || gamePhase === 'question') && <BattleView />}
      {gamePhase === 'review' && <ReviewPanel />}
      
      {eventMessage && <EventModal />}
      
      <div className="bottom-bar">
        <button onClick={save}>💾 保存</button>
        <button onClick={load}>📂 读档</button>
        <span>CPA事务所模拟器 v1.1</span>
      </div>
    </div>
  );
}

export default App;
