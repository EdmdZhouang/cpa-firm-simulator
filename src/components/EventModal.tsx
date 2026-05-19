import { useGameStore } from '../store/game-store';

export default function EventModal() {
  const { eventMessage, closeEvent, gamePhase } = useGameStore();

  if (!eventMessage) return null;

  return (
    <div className="event-modal-overlay" onClick={closeEvent}>
      <div className="event-modal" onClick={e => e.stopPropagation()}>
        <h3>📢 事件</h3>
        <p>{eventMessage}</p>
        <button onClick={closeEvent}>{gamePhase === 'event' ? '确定' : '关闭'}</button>
      </div>
    </div>
  );
}
