import { useMemo } from 'react';

const SIZE = 320;
const STROKE = 4;
const GLOW_STROKE = 8;
const RADIUS = (SIZE - GLOW_STROKE * 2) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CENTER = SIZE / 2;

const modeColors = {
  work: { main: '#e8594a', glow: 'rgba(232, 89, 74, 0.3)', bg: 'rgba(232, 89, 74, 0.05)' },
  shortBreak: { main: '#2ec4a0', glow: 'rgba(46, 196, 160, 0.3)', bg: 'rgba(46, 196, 160, 0.05)' },
  longBreak: { main: '#7b8fdb', glow: 'rgba(123, 143, 219, 0.3)', bg: 'rgba(123, 143, 219, 0.05)' },
};

export default function TimerRing({ progress, mode, isRunning, timeLeft }) {
  const colors = modeColors[mode] || modeColors.work;
  const dashOffset = CIRCUMFERENCE * (1 - progress);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const filterId = 'glow-filter';

  const tickMarks = useMemo(() => {
    const marks = [];
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * 360 - 90;
      const rad = (angle * Math.PI) / 180;
      const isHour = i % 5 === 0;
      const innerR = RADIUS - (isHour ? 14 : 8);
      const outerR = RADIUS - 3;
      marks.push(
        <line
          key={i}
          x1={CENTER + innerR * Math.cos(rad)}
          y1={CENTER + innerR * Math.sin(rad)}
          x2={CENTER + outerR * Math.cos(rad)}
          y2={CENTER + outerR * Math.sin(rad)}
          stroke={isHour ? 'rgba(232, 234, 240, 0.15)' : 'rgba(232, 234, 240, 0.05)'}
          strokeWidth={isHour ? 1.5 : 0.75}
          strokeLinecap="round"
        />
      );
    }
    return marks;
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: SIZE,
      height: SIZE,
      animation: 'scaleIn 0.6s ease-out both',
    }}>
      {isRunning && (
        <div style={{
          position: 'absolute',
          inset: -40,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.glow}, transparent 70%)`,
          animation: 'breathe 4s ease-in-out infinite',
          transition: 'opacity 1s ease',
        }} />
      )}

      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <defs>
          <filter id={filterId}>
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.main} />
            <stop offset="100%" stopColor={colors.main} stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {tickMarks}

        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="rgba(255, 255, 255, 0.04)"
          strokeWidth={STROKE}
        />

        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS - 20}
          fill={colors.bg}
          style={{ transition: 'fill 1s ease' }}
        />

        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke={colors.glow}
          strokeWidth={GLOW_STROKE}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
          style={{
            transition: isRunning ? 'stroke-dashoffset 0.3s linear' : 'stroke-dashoffset 0.5s ease',
            filter: `url(#${filterId})`,
          }}
        />

        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth={STROKE}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
          style={{
            transition: isRunning ? 'stroke-dashoffset 0.3s linear' : 'stroke-dashoffset 0.5s ease',
          }}
        />

        {progress > 0.01 && (
          <circle
            cx={CENTER + RADIUS * Math.cos(((progress * 360) - 90) * Math.PI / 180)}
            cy={CENTER + RADIUS * Math.sin(((progress * 360) - 90) * Math.PI / 180)}
            r={5}
            fill={colors.main}
            style={{
              filter: `drop-shadow(0 0 6px ${colors.glow})`,
              transition: isRunning ? 'cx 0.3s linear, cy 0.3s linear' : 'cx 0.5s ease, cy 0.5s ease',
            }}
          />
        )}
      </svg>

      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '4rem',
          fontWeight: 200,
          letterSpacing: '0.04em',
          lineHeight: 1,
          color: 'var(--text-primary)',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {timeString}
        </span>
      </div>
    </div>
  );
}
