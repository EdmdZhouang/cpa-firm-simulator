import { useState } from 'react';
import { useGameStore } from '../store/game-store';
import { getCorrectRate } from '../engine/case-battle';
import type { Question } from '../types/game';

export default function BattleView() {
  const { 
    currentCase, currentQuestion, battleState, playerState,
    answerQuestion, useAction: performAction, endTurn
  } = useGameStore();
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [answeredQuestion, setAnsweredQuestion] = useState<Question | null>(null);
  const [questionKey, setQuestionKey] = useState(0);
  const [feedbackAnim, setFeedbackAnim] = useState<'correct' | 'wrong' | null>(null);

  if (!currentCase || !battleState) return null;

  const handleAnswer = () => {
    if (selectedOption === null || !currentQuestion) return;
    setAnsweredQuestion(currentQuestion);
    const res = answerQuestion(selectedOption);
    setLastResult(res);
    setShowResult(true);
    setSelectedOption(null);
    setFeedbackAnim(res.isCorrect ? 'correct' : 'wrong');
    setTimeout(() => setFeedbackAnim(null), 1200);
  };

  const handleNext = () => {
    setShowResult(false);
    setLastResult(null);
    setAnsweredQuestion(null);
    setQuestionKey(k => k + 1);
  };

  const correctRate = getCorrectRate(battleState);
  const displayedQuestion = showResult && answeredQuestion ? answeredQuestion : currentQuestion;

  return (
    <div className="battle-view">
      {/* Feedback overlay */}
      {feedbackAnim === 'correct' && (
        <div className="feedback-overlay correct-overlay">
          <img src="/sprites/v2/128/feedback/pass-stamp.png" alt="正确" />
        </div>
      )}
      {feedbackAnim === 'wrong' && (
        <div className="feedback-overlay wrong-overlay">
          <img src="/sprites/v2/128/feedback/fail-stamp.png" alt="错误" />
        </div>
      )}

      {/* 战斗头部 - 项目作战台 */}
      <div className="battle-header">
        <div className="battle-title">
          <img src="/sprites/v2/128/folders/folder-accounting.png" alt="" className="battle-title-icon" />
          {currentCase.title}
        </div>
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
            <span className="bar-value" style={{ 
              color: battleState.risk >= 80 ? '#e74c3c' : battleState.risk >= 60 ? '#f39c12' : 'inherit'
            }}>
              {battleState.risk}%
            </span>
          </div>
        </div>
        <div className="battle-stats">
          <span>答题: {battleState.questionsAnswered}</span>
          <span>正确: {battleState.correctCount}</span>
          <span>正确率: {correctRate}%</span>
          <span>剩余: {battleState.turnsRemaining}回合</span>
        </div>
      </div>

      {/* 题目区域 */}
      {displayedQuestion && (
        <div className="question-area" key={questionKey}>
          <div className="question-scenario">
            {displayedQuestion.scenario}
          </div>
          
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
                <img src="/sprites/v2/128/feedback/stamp.png" alt="" className="btn-icon" />
                提交答案
              </button>
            </>
          ) : (
            <>
              <div className={`feedback-area ${lastResult?.isCorrect ? 'correct' : 'wrong'}`}>
                {lastResult?.isCorrect ? '回答正确！进度推进' : '回答错误！风险增加'}
              </div>
              
              {!lastResult?.isCorrect && (
                <div className="explanation">
                  <strong>复核意见：</strong><br/>
                  {displayedQuestion.explanation}
                </div>
              )}
              
              <button className="action-btn primary" onClick={handleNext}>
                下一题 →
              </button>
            </>
          )}
        </div>
      )}

      {/* 行动面板 */}
      <div className="action-panel">
        <button 
          className="action-btn" 
          onClick={() => performAction('study')} 
          disabled={playerState.resources.energy < 15}
          title="消耗15精力，提高命中率"
        >
          <img src="/sprites/v2/128/character/player-reading.png" alt="" className="btn-icon" />
          学习专项 (-15⚡)
        </button>
        <button 
          className="action-btn" 
          onClick={() => performAction('expert')} 
          disabled={playerState.resources.energy < 5 || playerState.resources.cash < 1000}
          title="消耗5精力+1000现金，降低风险"
        >
          <img src="/sprites/v2/128/character/player-accountant.png" alt="" className="btn-icon" />
          请专家 (-5⚡ -1000💰)
        </button>
        <button 
          className="action-btn" 
          onClick={() => performAction('qc')} 
          disabled={playerState.resources.energy < 15}
          title="消耗15精力，降低翻车概率"
        >
          <img src="/sprites/v2/128/feedback/progress-arrow.png" alt="" className="btn-icon" />
          质量控制 (-15⚡)
        </button>
        <button 
          className="action-btn" 
          onClick={() => performAction('rest')}
          title="恢复30精力"
        >
          <img src="/sprites/v2/128/office/coffee-cup.png" alt="" className="btn-icon" />
          休息 (+30⚡)
        </button>
        <button 
          className="action-btn" 
          onClick={endTurn}
          title="结束本回合，扣除固定成本"
        >
          <img src="/sprites/v2/128/office/wall-clock.png" alt="" className="btn-icon" />
          结束回合
        </button>
      </div>
    </div>
  );
}
