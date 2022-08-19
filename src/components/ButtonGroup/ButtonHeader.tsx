import css from './ButtonGroup.module.scss';

type Props = {
   text: string;
   className?: string;
};

const ButtonHeader = ({ text, className }: Props): JSX.Element => (
   <div className={css.button__header}>
      <div className={`${css.button__header__content} ${className!}`}>{text}</div>
   </div>
);

ButtonHeader.defaultProps = { className: '' };

export default ButtonHeader;
