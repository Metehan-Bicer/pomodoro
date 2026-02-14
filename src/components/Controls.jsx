const modeButtonColors = {
  work: {
    bg: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-bright) 100%)',
    border: 'var(--primary-bright)',
    shadow: 'var(--shadow-glow), var(--shadow-md)',
  },
  shortBreak: {
    bg: 'linear-gradient(135deg, var(--teal) 0%, #3dd6b4 100%)',
    border: '#3dd6b4',
    shadow: '0 0 40px var(--teal-glow), var(--shadow-md)',
  },
  longBreak: {
    bg: 'linear-gradient(135deg, var(--indigo) 0%, #95a5e6 100%)',
    border: '#95a5e6',
    shadow: '0 0 40px var(--indigo-glow), var(--shadow-md)',
  },
};

export default function Controls({ isRunning, onStart, onPause, onReset, progress, mode }) {
  const btnColor = modeButtonColors[mode] || modeButtonColors.work;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      animation: 'fadeInUp 0.5s ease-out both',
      animationDelay: '0.3s',
    }}>
      {/* Reset */}
      <button
        onClick={onReset}
        title="Sifirla"
        style={{
          width: 48,
          height: 48,
          borderRadius: 'var(--radius-full)',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all var(--transition-smooth)',
          opacity: progress > 0 ? 1 : 0.3,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--bg-hover)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'var(--bg-elevated)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 1 9 9 9.75 9.75 0 0 1-6.74-2.74L3 21" />
          <path d="M3 14V21H10" />
        </svg>
      </button>

      {/* Play / Pause */}
      <button
        onClick={isRunning ? onPause : onStart}
        style={{
          width: 72,
          height: 72,
          borderRadius: 'var(--radius-full)',
          background: isRunning
            ? 'linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-card) 100%)'
            : btnColor.bg,
          border: isRunning ? '1px solid var(--border-light)' : `1px solid ${btnColor.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all var(--transition-smooth)',
          boxShadow: isRunning ? 'var(--shadow-sm)' : btnColor.shadow,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.08)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        onMouseDown={e => {
          e.currentTarget.style.transform = 'scale(0.95)';
        }}
        onMouseUp={e => {
          e.currentTarget.style.transform = 'scale(1.08)';
        }}
      >
        {isRunning ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--text-primary)">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: 2 }}>
            <polygon points="6,3 20,12 6,21" />
          </svg>
        )}
      </button>

      {/* Skip */}
      <button
        onClick={onReset}
        title="Atla"
        style={{
          width: 48,
          height: 48,
          borderRadius: 'var(--radius-full)',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all var(--transition-smooth)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--bg-hover)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'var(--bg-elevated)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5,4 15,12 5,20" fill="var(--text-secondary)" />
          <line x1="19" y1="5" x2="19" y2="19" />
        </svg>
      </button>
    </div>
  );
}
