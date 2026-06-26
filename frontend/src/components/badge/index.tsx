import { badgeStyles } from './styles';
import type { BadgeProps } from './types';

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <div className={badgeStyles({ variant, className })} {...props}>
      {children}
    </div>
  );
}
