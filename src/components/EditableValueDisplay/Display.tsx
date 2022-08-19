import { useState } from 'react';
import { EditableValueDisplay } from './EditableValueDisplay';
import css from './Display.module.scss';

const Display1 = (): JSX.Element => {
   const [value, setValue] = useState<string | number>('double-click me!');

   return (
      <div className={css.container__item}>
         <EditableValueDisplay value={value} setValue={setValue} />
         <div>
            Your value is:{' '}
            <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{value}</span>
         </div>
      </div>
   );
};

const Display2 = (): JSX.Element => {
   const [numberValue, setNumberValue] = useState<string | number>(3.14);

   return (
      <div className={css.container__item}>
         <EditableValueDisplay value={numberValue} setValue={setNumberValue} enforceType="number" />
         <div>
            This one will only accept numbers. Current value is{' '}
            <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{numberValue}</span>
         </div>
      </div>
   );
};

const Display3 = (): JSX.Element => {
   const [rangeValue, setRangeValue] = useState<string | number>(4.5);

   return (
      <div className={css.container__item}>
         <div>
            <EditableValueDisplay
               value={rangeValue}
               setValue={setRangeValue}
               enforceType="number"
               enforceRange={{ min: 3.14, max: 9.81 }}
            />
         </div>
         <div>
            And this one will only allow numerical input between 3.14 and 9.81. Current value is{' '}
            <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{rangeValue}</span>
         </div>
      </div>
   );
};

const Display = (): JSX.Element => {
   return (
      <div className={css.container}>
         <div className={css.container__header}>&lt;EditableValueDisplay /&gt;</div>
         <div className={css.container__props}>
            <pre>
               {`type Props = {
   value: number | string;
   setValue: (val: number | string) => void;
   baseStyle?: string;
   className?: string;
   enforceType?: 'number' | 'string';
   enforceRange?: { min: number; max: number };
};`}
            </pre>
         </div>
         <Display1 />
         <Display2 />
         <Display3 />
      </div>
   );
};

export { Display };
