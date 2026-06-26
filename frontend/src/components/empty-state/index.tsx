import { emptyStateStyles } from './styles';
import type { EmptyStateProps } from './types';

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  const styles = emptyStateStyles();

  return (
    <div className={styles.root({ className })} {...props}>
      <div className={styles.iconWrapper()}>
        <Icon className={styles.icon()} aria-hidden="true" />
      </div>
      <h3 className={styles.title()}>{title}</h3>
      {description && <p className={styles.description()}>{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
