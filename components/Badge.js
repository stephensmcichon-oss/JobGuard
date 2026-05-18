export default function Badge({ text, type }) {
  let bgColor, textColor;

  switch (type.toLowerCase()) {
    case 'urgent':
    case 'bug':
      bgColor = 'var(--status-urgent-bg)';
      textColor = 'var(--status-urgent-text)';
      break;
    case 'normal':
    case 'feature':
      bgColor = 'var(--status-normal-bg)';
      textColor = 'var(--status-normal-text)';
      break;
    case 'productive':
      bgColor = 'var(--status-productive-bg)';
      textColor = 'var(--status-productive-text)';
      break;
    case 'deep work':
      bgColor = 'var(--status-deepwork-bg)';
      textColor = 'var(--status-deepwork-text)';
      break;
    case 'high':
    case 'security':
      bgColor = 'var(--status-high-bg)';
      textColor = 'var(--status-high-text)';
      break;
    case 'low':
    case 'refactor':
    default:
      bgColor = 'var(--status-low-bg)';
      textColor = 'var(--status-low-text)';
      break;
  }

  return (
    <span
      style={{
        backgroundColor: bgColor,
        color: textColor,
        padding: '0.2rem 0.6rem',
        borderRadius: 'var(--radius-xl)',
        fontSize: '0.65rem',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </span>
  );
}
