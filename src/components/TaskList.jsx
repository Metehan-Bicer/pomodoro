import { useState, useRef } from 'react';

export default function TaskList({ tasks, onAdd, onToggle, onDelete, onClearCompleted }) {
  const [input, setInput] = useState('');
  const [hoveredId, setHoveredId] = useState(null);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(input);
    setInput('');
    inputRef.current?.focus();
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div style={{
      width: '100%',
      maxWidth: 440,
      animation: 'fadeInUp 0.5s ease-out both',
      animationDelay: '0.5s',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            letterSpacing: '0.02em',
          }}>
            Gorevler
          </h2>
        </div>
        {completedTasks.length > 0 && (
          <button
            onClick={onClearCompleted}
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--red-soft)';
              e.currentTarget.style.borderColor = 'var(--red-glow)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
          >
            Temizle
          </button>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 16px',
          background: 'var(--bg-input)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          transition: 'border-color var(--transition-fast)',
        }}
          onFocus={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
          onBlur={e => e.currentTarget.style.borderColor = 'var(--border-light)'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Yeni gorev ekle..."
            style={{
              flex: 1,
              fontSize: '0.9rem',
              color: 'var(--text-primary)',
              outline: 'none',
              background: 'transparent',
            }}
          />
          {input.trim() && (
            <button
              type="submit"
              style={{
                fontSize: '0.75rem',
                color: 'var(--primary)',
                fontWeight: 500,
                padding: '4px 8px',
              }}
            >
              Ekle
            </button>
          )}
        </div>
      </form>

      {/* Task items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {activeTasks.map((task, i) => (
          <TaskItem
            key={task.id}
            task={task}
            isHovered={hoveredId === task.id}
            onHover={() => setHoveredId(task.id)}
            onLeave={() => setHoveredId(null)}
            onToggle={onToggle}
            onDelete={onDelete}
            isFirst={i === 0}
          />
        ))}

        {completedTasks.length > 0 && activeTasks.length > 0 && (
          <div style={{
            height: 1,
            background: 'var(--border-subtle)',
            margin: '8px 0',
          }} />
        )}

        {completedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            isHovered={hoveredId === task.id}
            onHover={() => setHoveredId(task.id)}
            onLeave={() => setHoveredId(null)}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}

        {tasks.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '32px 0',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
              <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" />
              <path d="M15 3v4a2 2 0 0 0 2 2h4" />
            </svg>
            Henuz gorev yok. Bir gorev ekleyin ve odaklanmaya baslayin!
          </div>
        )}
      </div>
    </div>
  );
}

function TaskItem({ task, isHovered, onHover, onLeave, onToggle, onDelete, isFirst }) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 14px',
        borderRadius: 'var(--radius-sm)',
        background: isHovered ? 'var(--bg-elevated)' : 'transparent',
        transition: 'background var(--transition-fast)',
        borderLeft: isFirst && !task.completed ? '2px solid var(--primary)' : '2px solid transparent',
      }}
    >
      <button
        onClick={() => onToggle(task.id)}
        style={{
          width: 20,
          height: 20,
          borderRadius: 6,
          border: `1.5px solid ${task.completed ? 'var(--green-soft)' : 'var(--border-light)'}`,
          background: task.completed ? 'var(--green-soft)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all var(--transition-fast)',
        }}
      >
        {task.completed && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20,6 9,17 4,12" />
          </svg>
        )}
      </button>

      <span style={{
        flex: 1,
        fontSize: '0.9rem',
        color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)',
        textDecoration: task.completed ? 'line-through' : 'none',
        fontWeight: 300,
        lineHeight: 1.4,
      }}>
        {task.text}
      </span>

      {task.pomodoros > 0 && (
        <span style={{
          fontSize: '0.7rem',
          color: 'var(--primary-dim)',
          fontVariantNumeric: 'tabular-nums',
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--primary-dim)" stroke="none">
            <circle cx="12" cy="12" r="10" />
          </svg>
          {task.pomodoros}
        </span>
      )}

      {isHovered && (
        <button
          onClick={() => onDelete(task.id)}
          style={{
            width: 24,
            height: 24,
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.5,
            transition: 'opacity var(--transition-fast)',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--red-soft)" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
