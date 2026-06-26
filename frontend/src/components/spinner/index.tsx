import { Loader2 } from 'lucide-react';
import { spinnerStyles } from './styles';
import type { SpinnerProps } from './types';

export function Spinner({ size = 'md', className, ...props }: SpinnerProps) {
  const styles = spinnerStyles({ size });

  return (
    <div className={styles.root({ className })} {...props}>
      <Loader2 className={styles.icon()} />
    </div>
  );
}
