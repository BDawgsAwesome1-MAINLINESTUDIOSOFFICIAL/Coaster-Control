import { useGameStore } from '../store/gameStore'
import './UI.css'

export default function UI() {
  const {
    money,
    parkRating,
    visitors,
    happiness,
    buildMode,
    isBuilding,
    trackPoints,
    tracks,
    coasterRunning,
    setBuildMode,
    setIsBuilding,
    finishTrack,
    clearTrackPoints,
    startCoaster,
    stopCoaster,
    updateParkStats
  } = useGameStore()

  const handleStartBuilding = () => {
    setIsBuilding(true)
    clearTrackPoints()
  }

  const handleFinishTrack = () => {
    if (trackPoints.length >= 4) {
      finishTrack()
      updateParkStats()
    } else {
      alert('Need at least 4 points to build a track!')
    }
  }

  const handleCancelBuilding = () => {
    setIsBuilding(false)
    clearTrackPoints()
  }

  const handleStartRide = () => {
    if (tracks.length > 0) {
      if (coasterRunning) {
        stopCoaster()
      } else {
        startCoaster()
      }
    } else {
      alert('Build a track first!')
    }
  }

  return (
    <div className="ui-container">
      {/* Top HUD */}
      <div className="hud-top">
        <div className="stat-panel">
          <div className="stat-item">
            <span className="stat-label">Money:</span>
            <span className="stat-value">${money.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Visitors:</span>
            <span className="stat-value">{visitors}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Park Rating:</span>
            <span className="stat-value">{parkRating.toFixed(1)}/10</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Happiness:</span>
            <span className="stat-value">{happiness}%</span>
          </div>
        </div>
      </div>

      {/* Building Panel */}
      <div className="build-panel">
        <h3>Build Mode</h3>
        <div className="build-buttons">
          <button
            className={buildMode === 'track' ? 'active' : ''}
            onClick={() => setBuildMode('track')}
          >
            Track
          </button>
        </div>

        {buildMode === 'track' && (
          <div className="track-controls">
            {!isBuilding ? (
              <button className="primary-button" onClick={handleStartBuilding}>
                Start Building Track
              </button>
            ) : (
              <>
                <div className="track-info">
                  Points: {trackPoints.length} (Need 4+)
                </div>
                <div className="track-actions">
                  <button
                    className="success-button"
                    onClick={handleFinishTrack}
                    disabled={trackPoints.length < 4}
                  >
                    Finish Track (${trackPoints.length * 100})
                  </button>
                  <button
                    className="cancel-button"
                    onClick={handleCancelBuilding}
                  >
                    Cancel
                  </button>
                </div>
                <div className="instructions">
                  Click on the ground to place track points
                </div>
              </>
            )}
          </div>
        )}

        {/* Coaster Controls */}
        <div className="coaster-controls">
          <h3>Coaster Controls</h3>
          <button
            className={coasterRunning ? 'stop-button' : 'start-button'}
            onClick={handleStartRide}
            disabled={tracks.length === 0}
          >
            {coasterRunning ? 'Stop Ride' : 'Start Ride'}
          </button>
          <div className="track-count">
            Tracks Built: {tracks.length}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="instructions-panel">
        <h4>Controls</h4>
        <ul>
          <li>Left Click + Drag: Rotate camera</li>
          <li>Right Click + Drag: Pan camera</li>
          <li>Scroll: Zoom in/out</li>
          <li>Click ground: Place track point (in build mode)</li>
        </ul>
      </div>
    </div>
  )
}

