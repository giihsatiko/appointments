export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  highlight?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isConfirming?: boolean;
  tone?: 'danger' | 'default';
}
