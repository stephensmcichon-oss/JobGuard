export default function Badge({ text, type }) {
  let badgeStyle = 'bg-base-300/50 text-base-content/70 border-base-300/80';

  if (type) {
    switch (type.toLowerCase()) {
      case 'urgent':
      case 'bug':
        badgeStyle = 'bg-error/15 text-error border-error/30 shadow-sm shadow-error/10';
        break;
      case 'normal':
      case 'feature':
        badgeStyle = 'bg-warning/15 text-warning border-warning/30 shadow-sm shadow-warning/10';
        break;
      case 'productive':
      case 'success':
        badgeStyle = 'bg-success/15 text-success border-success/30 shadow-sm shadow-success/10';
        break;
      case 'deep work':
      case 'high':
      case 'security':
        badgeStyle = 'bg-info/15 text-info border-info/30 shadow-sm shadow-info/10';
        break;
      case 'low':
      case 'refactor':
      default:
        badgeStyle = 'bg-base-300/50 text-base-content/70 border-base-300/80';
        break;
    }
  }

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border transition-all duration-200 ${badgeStyle}`}>
      {text}
    </span>
  );
}
