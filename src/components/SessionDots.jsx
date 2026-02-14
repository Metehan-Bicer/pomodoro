export default function SessionDots({ sessionsCompleted, longBreakInterval }) {
  const totalDots = longBreakInterval;
  const currentCycle = sessionsCompleted % longBreakInterval;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      animation: 'fadeIn 0.5s ease-out both',
      animationDelay: '0.4s',
    }}>
      <span style={{
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        fontWeight: 300,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}>
        Oturum
      </span>
      <div style={{ display: 'flex', gap: '6px' }}>
        {Array.from({ length: totalDots }, (_, i) => {
          const filled = i < currentCycle;
          return (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: filled ? 'var(--primary)' : 'var(--bg-elevated)',
                border: `1px solid ${filled ? 'var(--primary)' : 'var(--border-light)'}`,
                transition: 'all var(--transition-smooth)',
                boxShadow: filled ? '0 0 8px var(--primary-glow)' : 'none',
              }}
            />
          );
        })}
      </div>
      <span style={{
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        fontWeight: 300,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {sessionsCompleted} toplam
      </span>
    </div>
  );
}
