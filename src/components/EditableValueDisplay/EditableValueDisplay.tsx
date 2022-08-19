import { useState } from 'react';
import ValueEditor from './ValueEditor';
import css from './EditableValueDisplay.module.scss';

type Props = {
   value: number | string;
   setValue: (val: number | string) => void;
   baseStyle?: string;
   className?: string;
   enforceType?: 'number' | 'string';
   enforceRange?: { min: number; max: number };
};

export const EditableValueDisplay = ({
   value,
   setValue,
   baseStyle = '',
   className = '',
   enforceType,
   enforceRange,
}: Props): JSX.Element => {
   const [editMode, setEditMode] = useState(false);

   const sanitizeValue = (val: number | string): void => {
      if (enforceType === 'number') return void setValue(parseFloat(val as string));
      if (enforceType === 'string') return void setValue(val.toString());
      return void setValue(val);
   };

   const display = editMode ? (
      <ValueEditor
         value={value}
         setValue={sanitizeValue}
         setEditMode={setEditMode}
         enforceType={enforceType}
         enforceRange={enforceRange}
      />
   ) : (
      <>{value}</>
   );

   return (
      <div
         title={value.toString()}
         className={`${css.container} ${baseStyle}`}
         onDoubleClick={(): void => setEditMode(true)}
      >
         <div className={`${css.valueArea} ${className}`}>{display}</div>
      </div>
   );
};
