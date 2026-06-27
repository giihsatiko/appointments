export interface TimeInputProps {
  id?: string;
  name?: string;
  label?: string;
  error?: string;
  required?: boolean;
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}
