import css from './NestableDropDown.module.scss';

type Props = {
   baseItem: React.ReactNode;
   header?: string;
   children?: React.ReactNode;
   background?: string;
   direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
};

export const NestableDropDown = ({
   baseItem,
   header = undefined,
   children,
   background = '#dbd9dd',
   direction = 'row',
}: Props): JSX.Element => {
   const flexAlign = direction.includes('column') ? 'stretch' : 'center';
   const flexStyle = {
      '--color': background,
      alignItems: flexAlign,
   };

   const childrenStyle = { flexDirection: direction };

   const headerElement =
      header !== undefined ? <div className={css.dropDown__header}>{header}</div> : null;

   const childrenElement =
      children !== undefined ? (
         <div className={css.dropDown__children} style={childrenStyle}>
            {children}
         </div>
      ) : null;

   return (
      <div className={css.dropDown}>
         {baseItem}
         <div className={css.dropDown__container}>
            <div className={css.dropDown__flex} style={flexStyle}>
               {headerElement}
               {childrenElement}
            </div>
         </div>
      </div>
   );
};
