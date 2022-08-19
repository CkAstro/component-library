/* eslint-disable no-implicit-coercion */
import { useEffect, useState } from 'react';
import css from './EditableValueDisplay.module.scss';

type Props = {
   value: number | string;
   setValue: (val: number | string) => void;
   setEditMode: (val: boolean) => void;
   enforceType?: 'number' | 'string';
   enforceRange?: { min: number; max: number };
};

const ValueEditor = ({
   value,
   setValue,
   setEditMode,
   enforceType,
   enforceRange,
}: Props): JSX.Element => {
   const [input, setInput] = useState(value);
   const [borderColor, setBorderColor] = useState<string>('green');

   const requestValueChange = (event: React.FormEvent): void => {
      event.preventDefault();
      if (enforceType === 'number' && Number.isNaN(+input)) return;
      if (enforceRange !== undefined && (input < enforceRange.min || input > enforceRange.max))
         return;
      setValue(input);
      setEditMode(false);
   };

   const handleKeyPress = (event: React.KeyboardEvent): void => {
      if (event.key === 'Escape') setEditMode(false);
   };

   const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => event.target.select();
   const handleInput = (event: React.FormEvent<HTMLInputElement>): void =>
      setInput(event.currentTarget.value);

   useEffect(() => {
      if (enforceType !== 'number') return void setBorderColor('green');

      const isNumber = !Number.isNaN(+input);
      if (!isNumber) return void setBorderColor('red');
      if (enforceRange === undefined) return void setBorderColor('green');
      if (input < enforceRange.min || input > enforceRange.max) return void setBorderColor('red');
      return void setBorderColor('green');
   }, [input, enforceType, enforceRange]);

   return (
      <form onSubmit={requestValueChange}>
         <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={true}
            style={{ borderColor: borderColor }}
            className={css.valueArea__input}
            onChange={handleInput}
            value={input}
            onKeyDown={handleKeyPress}
            onBlur={(): void => setEditMode(false)}
            onFocus={handleFocus}
         />
      </form>
   );
};

export default ValueEditor;
