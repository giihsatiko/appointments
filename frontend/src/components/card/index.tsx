import { cardStyles } from './styles';
import type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from './types';

export function Card({ className, ...props }: CardProps) {
  return <div className={cardStyles().root({ className })} {...props} />;
}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cardStyles().header({ className })} {...props} />;
}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return <h3 className={cardStyles().title({ className })} {...props} />;
}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return <p className={cardStyles().description({ className })} {...props} />;
}

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cardStyles().content({ className })} {...props} />;
}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return <div className={cardStyles().footer({ className })} {...props} />;
}
