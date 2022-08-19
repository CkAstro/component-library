import Button from './Button';
import ButtonHeader from './ButtonHeader';
import getHeaderStyle from './getHeaderStyle';
import css from './ButtonGroup.module.scss';

type ButtonProps = {
   text: string;
   value: string | number;
};

type Props = {
   buttons: ButtonProps[];
   value: string | number;
   setter: (val: string | number) => void;
   header?: string;
   headerWidth?: string;
};

export const ButtonGroup = ({
   buttons,
   value,
   setter,
   header,
   headerWidth,
}: Props): JSX.Element => {
   if (buttons.length < 1) {
      throw new Error('ButtonGroup requires at least one button');
   }
   const headerStyle = getHeaderStyle(headerWidth);

   const headerDiv =
      header !== '' ? (
         <div style={headerStyle} className={css.container__header}>
            <ButtonHeader text={header!} />
         </div>
      ) : null;

   const buttonDiv = (
      <div className={css.container__group}>
         {buttons.map((button, ind) => {
            const key = ind;
            return (
               <Button
                  key={key}
                  className={button.value === value ? css.active : ''}
                  text={button.text}
                  onClick={(): void => setter(button.value)}
               />
            );
         })}
      </div>
   );

   return (
      <div className={css.container}>
         {headerDiv}
         {buttonDiv}
      </div>
   );
};

ButtonGroup.defaultProps = {
   header: '',
   headerWidth: '',
};
