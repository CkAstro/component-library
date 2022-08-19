import { NestableDropDown } from './NestableDropDown';
import css from './Display.module.scss';

type Props = {
   style?: React.CSSProperties;
   children: React.ReactNode;
};

const Box = ({ style, children }: Props): JSX.Element => {
   return (
      <div style={style} className={css.box}>
         {children}
      </div>
   );
};

const Display = (): JSX.Element => {
   return (
      <div className={css.container}>
         <div className={css.container__header}>&lt;NestableDropDown /&gt;</div>
         <div className={css.container__props}>
            <pre>{`type Props = {
   baseItem: React.ReactNode;
   header?: string;
   children?: React.ReactNode;
   background?: string;
   direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
};`}</pre>
         </div>
         <NestableDropDown baseItem={<Box>1</Box>} header="&lt;NestableDropDown /&gt;">
            <NestableDropDown baseItem={<Box>2</Box>} header="more nesting" background="orange">
               <NestableDropDown baseItem={<Box>4</Box>} header="even more">
                  <NestableDropDown baseItem={<Box>7</Box>} header="a tooltip" />
                  <NestableDropDown baseItem={<Box>8</Box>} header="another tooltip" />
               </NestableDropDown>
               <NestableDropDown
                  baseItem={<Box style={{ width: '8rem' }}>5</Box>}
                  header="just a tooltip"
               />
               <Box style={{ borderRadius: '25%', color: 'orange' }}>6</Box>
            </NestableDropDown>
            <NestableDropDown
               baseItem={<Box style={{ background: '#f85' }}>3</Box>}
               header="Column Style"
               direction="column"
            >
               <div className={css.columns}>item 1</div>
               <div className={css.columns}>item 2</div>
               <div className={css.columns}>item 3</div>
               <div className={css.columns}>item 4</div>
            </NestableDropDown>
         </NestableDropDown>
      </div>
   );
};

export { Display, Box };
