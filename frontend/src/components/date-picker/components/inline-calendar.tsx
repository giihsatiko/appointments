import ReactDatePicker from 'react-datepicker';
import { ptBR } from 'date-fns/locale/pt-BR';
import '../react-datepicker.css';

type InlineCalendarProps = {
  selected?: Date | null;
  onChange: (date: Date | null) => void;
};

export function InlineCalendar({ selected, onChange }: InlineCalendarProps) {
  return (
    <ReactDatePicker
      inline
      selected={selected}
      onChange={onChange}
      locale={ptBR}
      dateFormat="dd/MM/yyyy"
      minDate={new Date()}
      selectsMultiple={false}
      selectsRange={false}
    />
  );
}
