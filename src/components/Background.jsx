import { useMemo } from 'react';

const styles = {
  wrapper: {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  gradient: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232, 89, 74, 0.05) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 100%, rgba(123, 143, 219, 0.03) 0%, transparent 50%),
      radial-gradient(ellipse 40% 40% at 10% 60%, rgba(46, 196, 160, 0.02) 0%, transparent 50%),
      var(--bg-deep)
    `,
  },
  grain: {
    position: 'absolute',
    inset: '-200%',
    width: '400%',
    height: '400%',
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
    backgroundSize: '128px 128px',
    opacity: 0.03,
    animation: 'grain 8s steps(10) infinite',
  },
  vignette: {
    position: 'absolute',
    inset: 0,
    background: `radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.5) 100%)`,
  },
};

export default function Background({ mode }) {
  const modeGlow = useMemo(() => {
    const colors = {
      work: 'rgba(232, 89, 74, 0.04)',
      shortBreak: 'rgba(46, 196, 160, 0.04)',
      longBreak: 'rgba(123, 143, 219, 0.04)',
    };
    return {
      position: 'absolute',
      inset: 0,
      background: `radial-gradient(circle 500px at 50% 40%, ${colors[mode] || colors.work}, transparent 70%)`,
      transition: 'background 1.5s ease',
    };
  }, [mode]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.gradient} />
      <div style={modeGlow} />
      <div style={styles.grain} />
      <div style={styles.vignette} />
    </div>
  );
}
