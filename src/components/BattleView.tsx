import { useState } from 'react';
import { useGameStore } from '../store/game-store';
import { getCorrectRate } from '../engine/case-battle';
import type { Question } from '../types/game';

export default function BattleView() {
  const { 
    currentCase, currentQuestion, battleState, playerState,
    answerQuestion, useAction: performAction, endTurn, gamePhase
  } = useGameStore();
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [answeredQuestion, setAnsweredQuestion] = useState<Question | null>(null);

  if (!currentCase || !battleState) return null;

  const handleAnswer = () => {
    if (selectedOption === null || !currentQuestion) return;
    setAnsweredQuestion(currentQuestion);
    const res = answerQuestion(selectedOption);
    setResult(res);
    setShowResult(true);
    setSelectedOption(null);
  };

  const handleNext = () => {
    setShowResult(false);
    setResult(null);
    setAnsweredQuestion(null);
  };

  const correctRate = getCorrectRate(battleState);
  const displayedQuestion = showResult && answeredQuestion ? answeredQuestion : currentQuestion;

  return (
    <div className="battle-view">
      <div className="battle-header">
        <div className="battle-title">⚔️ {currentCase.title}</div>
        <div className="battle-bars">
          <div className="bar-row">
            <span className="bar-label">进度</span>
            <div className="bar-track">
              <div 
                className="bar-fill progress" 
                style={{ width: `${battleState.progress}%` }}
              />
            </div>
            <span className="bar-value">{battleState.progress}%</span>
          </div>
          <div className="bar-row">
            <span className="bar-label">风险</span>
            <div className="bar-track">
              <div 
                className="bar-fill risk" 
                style={{ width: `${battleState.risk}%` }}
              />
            </div>
            <span className="bar-value">{battleState.risk}%</span>
          </div>
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: '#aaa' }}>
          答题: {battleState.questionsAnswered} | 正确: {battleState.correctCount} | 正确率: {correctRate}% | 剩余回合: {battleState.turnsRemaining}
        </div>
      </div>

      {displayedQuestion && gamePhase !== 'event' && (
        <div className="question-area">
          <div className="question-scenario">📖 {displayedQuestion.scenario}</div>
          <div className="question-text">{displayedQuestion.question}</div>
          
          {!showResult ? (
            <>
              <div className="options-list">
                {displayedQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    className={`option-btn ${selectedOption === idx ? 'selected' : ''}`}
                    onClick={() => setSelectedOption(idx)}
                  >
                    {String.fromCharCode(65 + idx)}. {opt}
                  </button>
                ))}
              </div>
              <button 
                className="action-btn primary" 
                onClick={handleAnswer}
                disabled={selectedOption === null}
              >
                ✓ 提交答案
              </button>
            </>
          ) : (
            <>
              <div className={`feedback-area ${result?.isCorrect ? 'correct' : 'wrong'}`}>
                {result?.isCorrect ? '✅ 回答正确！' : '❌ 回答错误！'}
              </div>
              {!result?.isCorrect && (
                <div className="explanation">
                  <strong>解析：</strong><br/>{displayedQuestion.explanation}
                </div>
              )}
              <button className="action-btn primary" onClick={handleNext}>
                下一题 →
              </button>
            </>
          )}
        </div>
      )}

      <div className="action-panel">
        <button className="action-btn" onClick={() => performAction('study')} disabled={playerState.resources.energy < 15}>
          📚 学习专项 (-15⚡)
        </button>
        <button className="action-btn" onClick={() => performAction('expert')} disabled={playerState.resources.energy < 5 || playerState.resources.cash < 1000}>
          👨‍💼 请专家 (-5⚡ -1000💰)
        </button>
        <button className="action-btn" onClick={() => performAction('qc')} disabled={playerState.resources.energy < 15}>
          🔍 质量控制 (-15⚡)
        </button>
        <button className="action-btn" onClick={() => performAction('rest')}>
          ☕ 休息 (+30⚡)
        </button>
        <button className="action-btn" onClick={endTurn}>
          🌙 结束回合
        </button>
      </div>
    </div>
  );
}
