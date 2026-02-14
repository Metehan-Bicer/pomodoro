export default function Stats({ dailyStats, sessionsCompleted }) {
  const cards = [
    {
      label: 'Bugunku Oturumlar',
      value: dailyStats.workSessions,
      color: 'var(--primary)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12,6 12,12 16,14" />
        </svg>
      ),
    },
    {
      label: 'Odaklanma Suresi',
      value: `${dailyStats.totalFocusMinutes}dk`,
      color: 'var(--teal)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4" /><path d="M12 18v4" />
          <path d="m4.93 4.93 2.83 2.83" /><path d="m16.24 16.24 2.83 2.83" />
          <path d="M2 12h4" /><path d="M18 12h4" />
          <path d="m4.93 19.07 2.83-2.83" /><path d="m16.24 7.76 2.83-2.83" />
        </svg>
      ),
    },
    {
      label: 'Toplam Oturum',
      value: sessionsCompleted,
      color: 'var(--indigo)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--indigo)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 12,
      width: '100%',
      maxWidth: 440,
      animation: 'fadeInUp 0.5s ease-out both',
      animationDelay: '0.6s',
    }}>
      {cards.map((card, i) => (
        <div
          key={i}
          style={{
            padding: '16px 12px',
            background: 'var(--bg-elevated)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            textAlign: 'center',
            transition: 'all var(--transition-smooth)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--border-light)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border-subtle)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>{card.icon}</div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            fontWeight: 600,
            color: card.color,
            lineHeight: 1,
            marginBottom: 4,
          }}>
            {card.value}
          </div>
          <div style={{
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontWeight: 300,
          }}>
            {card.label}
          </div>
        </div>
      ))}
    </div>
  );
}
