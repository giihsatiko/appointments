export interface TimeInputProps {
  id?: string;
  name?: string;
  label?: string;
  error?: string;
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}
