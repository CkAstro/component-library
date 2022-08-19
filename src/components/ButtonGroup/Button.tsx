import css from './ButtonGroup.module.scss';

type Props = {
   text: string;
   onClick: () => void;
   className?: string;
};

const Button = ({ text, onClick, className }: Props): JSX.Element => (
   <button className={`${css.button} ${className!}`} onClick={onClick} onKeyPress={onClick}>
      <div className={css.button__content}>{text}</div>
   </button>
);

Button.defaultProps = { className: '' };

export default Button;
