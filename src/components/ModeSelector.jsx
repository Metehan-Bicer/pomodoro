const modes = [
  {
    key: 'work',
    label: 'Odaklan',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
      </svg>
    ),
  },
  {
    key: 'shortBreak',
    label: 'Kisa Mola',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      </svg>
    ),
  },
  {
    key: 'longBreak',
    label: 'Uzun Mola',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22 16 8" />
        <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <line x1="20" y1="2" x2="22" y2="4" />
      </svg>
    ),
  },
];

const modeColors = {
  work: 'var(--primary)',
  shortBreak: 'var(--teal)',
  longBreak: 'var(--indigo)',
};

export default function ModeSelector({ mode, onSwitch, isRunning }) {
  return (
    <div style={{
      display: 'flex',
      gap: '6px',
      padding: '4px',
      background: 'var(--bg-elevated)',
      borderRadius: 'var(--radius-full)',
      border: '1px solid var(--border-light)',
      animation: 'fadeInDown 0.5s ease-out both',
      animationDelay: '0.1s',
    }}>
      {modes.map(({ key, label, icon }) => {
        const isActive = mode === key;
        return (
          <button
            key={key}
            onClick={() => onSwitch(key)}
            disabled={isRunning}
            style={{
              position: 'relative',
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: isActive ? 500 : 400,
              color: isActive ? '#fff' : 'var(--text-secondary)',
              background: isActive ? modeColors[key] : 'transparent',
              transition: 'all var(--transition-smooth)',
              opacity: isRunning && !isActive ? 0.4 : 1,
              cursor: isRunning ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            {icon}
            {label}
          </button>
        );
      })}
    </div>
  );
}
