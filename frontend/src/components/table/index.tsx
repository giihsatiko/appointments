import { tableStyles } from './styles';
import type {
  TableBodyProps,
  TableCellProps,
  TableHeadProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
} from './types';

export function Table({ className, ...props }: TableProps) {
  const styles = tableStyles();

  return (
    <div className={styles.wrapper()}>
      <table className={styles.table({ className })} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return <thead className={tableStyles().header({ className })} {...props} />;
}

export function TableBody({ className, ...props }: TableBodyProps) {
  return <tbody className={tableStyles().body({ className })} {...props} />;
}

export function TableRow({ className, ...props }: TableRowProps) {
  return <tr className={tableStyles().row({ className })} {...props} />;
}

export function TableHead({ className, ...props }: TableHeadProps) {
  return <th className={tableStyles().head({ className })} {...props} />;
}

export function TableCell({ className, ...props }: TableCellProps) {
  return <td className={tableStyles().cell({ className })} {...props} />;
}
