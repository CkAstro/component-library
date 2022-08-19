import { render, screen } from '@/test';
import ButtonHeader from '../ButtonHeader';

describe('ButtonHeader (unit)', () => {
   test('render', () => {
      render(<ButtonHeader text="test" />);
      expect(screen.getByText('test')).toBeInTheDocument();
   });

   test('className is applied', () => {
      const className = 'test';
      render(<ButtonHeader text="test" className={className} />);

      expect(document.querySelector('.button__header__content.test')).toBeInTheDocument();
   });
});
