import { useState } from 'react';
import { ButtonGroup } from './ButtonGroup';
import css from './Display.module.scss';

const Group1 = (): JSX.Element => {
   const [value, setValue] = useState<string | number>('1');

   return (
      <div className={css.container__item}>
         <div className={css.container__group}>
            <ButtonGroup
               value={value}
               setter={setValue}
               buttons={[
                  { text: 'Button', value: '1' },
                  { text: 'Group', value: '2' },
                  { text: 'Without', value: '3' },
                  { text: 'Header', value: '4' },
               ]}
            />
         </div>
         <div className={css.container__info}>
            <div>
               Button <span className={css.value}>{value}</span> selected.
            </div>
         </div>
      </div>
   );
};

const Group2 = (): JSX.Element => {
   const [value, setValue] = useState<string | number>('1');

   return (
      <div className={css.container__item}>
         <div className={css.container__group}>
            <ButtonGroup
               value={value}
               setter={setValue}
               header="Button"
               buttons={[
                  { text: 'Group', value: '1' },
                  { text: 'With', value: '2' },
                  { text: 'Header', value: '3' },
                  { text: 'Defined', value: '4' },
               ]}
            />
         </div>
         <div className={css.container__info}>
            <div>
               Button <span className={css.value}>{value}</span> selected.
            </div>
         </div>
      </div>
   );
};

const Group3 = (): JSX.Element => {
   const [value, setValue] = useState<string | number>('1');

   return (
      <div className={css.container__item}>
         <div className={css.container__group}>
            <ButtonGroup
               value={value}
               setter={setValue}
               header="Another"
               buttons={[
                  { text: 'Button', value: '1' },
                  { text: 'Group', value: '2' },
                  { text: 'With', value: '3' },
                  { text: 'Header', value: '4' },
                  { text: 'Defined', value: '5' },
               ]}
            />
         </div>
         <div className={css.container__info}>
            <div>
               Button <span className={css.value}>{value}</span> selected.
            </div>
         </div>
      </div>
   );
};

const Group4 = (): JSX.Element => {
   const [value1, setValue1] = useState<string | number>('1');
   const [value2, setValue2] = useState<string | number>('1');

   return (
      <div className={css.container__item}>
         <div className={css.container__group}>
            <ButtonGroup
               value={value1}
               setter={setValue1}
               header="Groups of"
               headerWidth="20%"
               buttons={[
                  { text: 'Button', value: '1' },
                  { text: 'Groups', value: '2' },
               ]}
            />
            <ButtonGroup
               value={value2}
               setter={setValue2}
               header="With"
               headerWidth="20%"
               buttons={[
                  { text: 'Adjusted', value: '1' },
                  { text: 'Header', value: '2' },
                  { text: 'Width', value: '3' },
               ]}
            />
         </div>
         <div className={css.container__info}>
            <div>
               Buttons <span className={css.value}>{value1}</span> and{' '}
               <span className={css.value}>{value2}</span> selected.
            </div>
         </div>
      </div>
   );
};

const Display = (): JSX.Element => (
   <div className={css.container}>
      <div className={css.container__header}>&lt;ButtonGroup /&gt;</div>
      <div className={css.container__props}>
         <pre>{`type ButtonProps = { text: string, value: string };`}</pre>
         <pre>{`type Props = { 
   buttons: ButtonProps[], 
   value: string, 
   setter: (val: string | number) => void, 
   header?: string; 
   headerWidth?: string; 
};`}</pre>
      </div>
      <Group1 />
      <Group2 />
      <Group3 />
      <Group4 />
   </div>
);

export { Display };
