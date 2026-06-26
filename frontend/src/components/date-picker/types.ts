export interface DatePickerProps {
  id?: string;
  name?: string;
  selected?: Date | null;
  className?: string;
  placeholderText?: string;
  label?: string;
  error?: string;
  onChange: (date: Date | null) => void;
}
