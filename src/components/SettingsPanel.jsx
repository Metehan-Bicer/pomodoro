import { useState, useEffect } from 'react';

export default function SettingsPanel({ settings, onUpdate, isOpen, onClose }) {
  const [local, setLocal] = useState(settings);

  useEffect(() => {
    setLocal(settings);
  }, [settings]);

  if (!isOpen) return null;

  const handleChange = (key, value) => {
    setLocal(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onUpdate(local);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          animation: 'fadeIn 0.2s ease-out',
        }}
      />

      {/* Panel */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 420,
        maxHeight: '80vh',
        overflowY: 'auto',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-lg)',
        padding: '32px',
        zIndex: 101,
        animation: 'scaleIn 0.3s ease-out',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 28,
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 400,
            letterSpacing: '0.02em',
          }}>
            Ayarlar
          </h2>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background var(--transition-fast)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Time Settings */}
        <div style={{ marginBottom: 24 }}>
          <label style={{
            display: 'block',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 12,
            fontWeight: 500,
          }}>
            Sure (dakika)
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { key: 'work', label: 'Odaklan' },
              { key: 'shortBreak', label: 'Kısa Mola' },
              { key: 'longBreak', label: 'Uzun Mola' },
            ].map(({ key, label }) => (
              <div key={key}>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  marginBottom: 6,
                }}>
                  {label}
                </div>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={local[key]}
                  onChange={e => handleChange(key, Math.max(1, Math.min(120, parseInt(e.target.value) || 1)))}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    textAlign: 'center',
                    outline: 'none',
                    transition: 'border-color var(--transition-fast)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Long break interval */}
        <div style={{ marginBottom: 24 }}>
          <label style={{
            display: 'block',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 8,
            fontWeight: 500,
          }}>
            Uzun mola araligi
          </label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <input
              type="range"
              min="2"
              max="8"
              value={local.longBreakInterval}
              onChange={e => handleChange('longBreakInterval', parseInt(e.target.value))}
              style={{
                flex: 1,
                accentColor: 'var(--primary)',
                height: 4,
              }}
            />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              color: 'var(--primary)',
              minWidth: 24,
              textAlign: 'center',
            }}>
              {local.longBreakInterval}
            </span>
          </div>
          <div style={{
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            marginTop: 4,
          }}>
            Her {local.longBreakInterval} oturumda bir uzun mola
          </div>
        </div>

        {/* Toggles */}
        <div style={{ marginBottom: 28 }}>
          <label style={{
            display: 'block',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 12,
            fontWeight: 500,
          }}>
            Otomasyon
          </label>
          {[
            { key: 'autoStartBreaks', label: 'Molaları otomatik baslat' },
            { key: 'autoStartWork', label: 'Calismayi otomatik baslat' },
            { key: 'soundEnabled', label: 'Ses efektleri' },
          ].map(({ key, label }) => (
            <div
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {label}
              </span>
              <button
                onClick={() => handleChange(key, !local[key])}
                style={{
                  width: 42,
                  height: 24,
                  borderRadius: 'var(--radius-full)',
                  background: local[key] ? 'var(--primary)' : 'var(--bg-input)',
                  border: `1px solid ${local[key] ? 'var(--primary)' : 'var(--border-light)'}`,
                  position: 'relative',
                  transition: 'all var(--transition-smooth)',
                }}
              >
                <div style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: local[key] ? 'var(--bg-deep)' : 'var(--text-muted)',
                  position: 'absolute',
                  top: 2,
                  left: local[key] ? 21 : 2,
                  transition: 'all var(--transition-smooth)',
                }} />
              </button>
            </div>
          ))}
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-bright) 100%)',
            color: 'var(--bg-deep)',
            fontSize: '0.9rem',
            fontWeight: 600,
            transition: 'all var(--transition-smooth)',
            boxShadow: 'var(--shadow-glow)',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Kaydet
        </button>
      </div>
    </>
  );
}
