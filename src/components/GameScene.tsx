import { useEffect, useRef, useState, useCallback } from 'react';
import Phaser from 'phaser';
import { createGameConfig } from '../phaser/GameConfig';
import { OfficeScene, type SceneState } from '../phaser/scenes/OfficeScene';
import { useGameStore } from '../store/game-store';
import CaseBoard from './CaseBoard';

export default function GameScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const [showCaseBoard, setShowCaseBoard] = useState(false);

  const {
    playerState,
    openReview,
    startCase,
  } = useGameStore();

  const { activeCaseId, vulnerabilities, resources } = playerState;
  const vulnCount = vulnerabilities.filter((v) => !v.cleared).length;
  const isHighRisk = resources.risk >= 70;
  const isTired = resources.energy < resources.maxEnergy * 0.3;
  const bridgeRef = useRef({ activeCaseId, openReview });

  useEffect(() => {
    bridgeRef.current = { activeCaseId, openReview };
  }, [activeCaseId, openReview]);

  // Initialize Phaser game
  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    const config = createGameConfig(containerRef.current);
    const game = new Phaser.Game(config);
    gameRef.current = game;

    // Bridge: Phaser events -> React
    const handleCaseBoard = () => {
      window.setTimeout(() => setShowCaseBoard(true), 120);
    };
    const handleFileStack = () => bridgeRef.current.openReview();
    const handleDesk = () => {
      if (!bridgeRef.current.activeCaseId) {
        console.log('先从案件板接案');
      }
    };

    game.events.on('case-board-clicked', handleCaseBoard);
    game.events.on('file-stack-clicked', handleFileStack);
    game.events.on('desk-clicked', handleDesk);

    return () => {
      game.events.off('case-board-clicked', handleCaseBoard);
      game.events.off('file-stack-clicked', handleFileStack);
      game.events.off('desk-clicked', handleDesk);
      game.destroy(true);
      gameRef.current = null;
    };
  }, []);

  // Sync Zustand state -> Phaser scene
  useEffect(() => {
    const scene = gameRef.current?.scene.getScene('OfficeScene') as OfficeScene | undefined;
    if (!scene) return;

    const state: SceneState = {
      activeCaseId,
      vulnCount,
      isHighRisk,
      isTired,
    };
    scene.syncState(state);
  }, [activeCaseId, vulnCount, isHighRisk, isTired]);

  const handleStartCase = useCallback((caseId: string) => {
    const success = startCase(caseId);
    if (success) {
      setShowCaseBoard(false);
    }
  }, [startCase]);

  return (
    <div
      style={{
        position: 'relative',
        flex: '1 1 auto',
        minHeight: 0,
        width: '100%',
        overflow: 'hidden',
        background: 'var(--pixel-bg)',
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />

      {showCaseBoard && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            padding: 20,
          }}
        >
          <div
            style={{
              background: 'var(--pixel-panel)',
              border: '4px solid var(--pixel-border)',
              borderRadius: 8,
              padding: 20,
              maxWidth: 600,
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setShowCaseBoard(false)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'var(--pixel-panel-light)',
                border: '2px solid var(--pixel-border)',
                color: 'var(--pixel-text)',
                padding: '4px 12px',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              ✕ 关闭
            </button>
            <CaseBoard onSelectCase={handleStartCase} />
          </div>
        </div>
      )}
    </div>
  );
}
