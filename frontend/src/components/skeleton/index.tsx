import { skeletonStyles } from './styles';
import type { SkeletonProps } from './types';

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={skeletonStyles({ className })} {...props} />;
}
