import { MockElement, render, screen, userEvent } from '@/test';
import { Box } from '../Display';
import { NestableDropDown } from '../NestableDropDown';

const user = userEvent.setup({ delay: null });

// NOTE : not much to test until we get CSS modules working with jest
// commented 'expect' statement below fails since 'display: none' is not applied
describe('NestableDropDown (unit)', () => {
   test('base item renders', () => {
      render(<NestableDropDown baseItem={<Box>1</Box>} />);

      expect(screen.getByText('1')).toBeInTheDocument();
   });

   test('renders with header', async () => {
      render(<NestableDropDown baseItem={<Box>1</Box>} header="test header" />);

      // expect(screen.queryByText('test header')).not.toBeInTheDocument();

      await user.hover(screen.getByText('1'));
      expect(screen.getByText('test header')).toBeInTheDocument();
   });

   test('renders without header', async () => {
      render(<NestableDropDown baseItem={<Box>1</Box>} />);

      await user.hover(screen.getByText('1'));
      expect(document.querySelector('.dropDown__header')).not.toBeInTheDocument();
   });

   test('renders with children', async () => {
      render(
         <NestableDropDown baseItem={<Box>1</Box>} header="test header">
            <Box>2</Box>
            <Box>3</Box>
         </NestableDropDown>
      );

      // expect(screen.queryByText('2')).not.toBeInTheDocument();
      // expect(screen.queryByText('3')).not.toBeInTheDocument();

      await user.hover(screen.getByText('1'));
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();

      // verify styling
      const element: MockElement = document.querySelector('.dropDown__children')!;
      expect(element.style._values['flex-direction']).toBe('row');
   });

   test('renders with column-displayed children', async () => {
      render(
         <NestableDropDown baseItem={<Box>1</Box>} header="test header" direction="column">
            <Box>2</Box>
            <Box>3</Box>
         </NestableDropDown>
      );

      // expect(screen.queryByText('2')).not.toBeInTheDocument();
      // expect(screen.queryByText('3')).not.toBeInTheDocument();

      await user.hover(screen.getByText('1'));
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();

      // verify styling
      const element: MockElement = document.querySelector('.dropDown__children')!;
      expect(element.style._values['flex-direction']).toBe('column');
   });
});
