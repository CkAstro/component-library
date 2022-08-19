import { render, screen, userEvent } from '@/test';
import Button from '../Button';

const user = userEvent.setup({ delay: null });

describe('Button (unit)', () => {
   test('renders', () => {
      render(<Button text="test" onClick={() => {}} />);
      expect(screen.getByText('test')).toBeInTheDocument();
   });

   test('className is applied', () => {
      const className = 'test';
      render(<Button text="test" onClick={() => {}} className={className} />);

      expect(document.querySelector('.button.test')).toBeInTheDocument();
   });

   test('clicking triggers onClick function', async () => {
      const onClick = jest.fn(() => {});
      render(<Button text="test" onClick={onClick} />);
      const button = screen.getByText('test');

      expect(onClick.mock.calls).toHaveLength(0);
      await user.click(button);
      expect(onClick.mock.calls).toHaveLength(1);
   });
});
