import { render, screen, userEvent } from '@/test';
import type { MockElement } from '@/test';
import { ButtonGroup } from '..';

const user = userEvent.setup({ delay: null });

describe('ButtonGroup (unit)', () => {
   test('renders', () => {
      render(
         <ButtonGroup
            value="3"
            setter={() => {}}
            buttons={[
               { text: 'test', value: '1' },
               { text: 'buttons', value: 2 },
            ]}
         />
      );
      expect(document.querySelector('.container')).toBeInTheDocument();
      expect(screen.getByText('test')).toBeInTheDocument();
      expect(screen.getByText('buttons')).toBeInTheDocument();
   });

   test('header', () => {
      render(
         <ButtonGroup
            value="3"
            setter={() => {}}
            header="header"
            buttons={[
               { text: 'test', value: '1' },
               { text: 'buttons', value: 2 },
            ]}
         />
      );
      expect(screen.getByText('header')).toBeInTheDocument();
      expect(document.querySelector('.container__header')).toBeInTheDocument();
      expect(document.querySelector('.container__group')).toBeInTheDocument();
   });

   test('no header', () => {
      render(
         <ButtonGroup
            value="3"
            setter={() => {}}
            buttons={[
               { text: 'test', value: '1' },
               { text: 'buttons', value: 2 },
            ]}
         />
      );
      expect(document.querySelector('.container__header')).toBeNull();
      expect(document.querySelector('.container__group')).toBeInTheDocument();
   });

   test('no buttons', () => {
      const err = new Error('ButtonGroup requires at least one button');
      expect(() => render(<ButtonGroup value="3" setter={() => {}} buttons={[]} />)).toThrow(err);
   });

   test('custom header width applied', () => {
      const width = '20%';
      render(
         <ButtonGroup
            value="3"
            setter={() => {}}
            header="header"
            headerWidth={width}
            buttons={[
               { text: 'test', value: '1' },
               { text: 'buttons', value: 2 },
            ]}
         />
      );
      const element: MockElement = document.querySelector('.container__header')!;
      expect(element.style._values.width).toStrictEqual(width);
   });
});

describe('ButtonGroup (integration)', () => {
   let value: string | number;
   const setValue = (val: string | number): void => {
      value = val;
   };

   beforeEach(() => (value = 'test'));

   test('setter function', async () => {
      render(
         <ButtonGroup
            value={value}
            setter={setValue}
            buttons={[
               { text: 'test', value: '1' },
               { text: 'buttons', value: 2 },
            ]}
         />
      );

      expect(value).toBe('test');

      await user.click(screen.getByText('test'));
      expect(value).toBe('1');
   });

   test('multiple clicks', async () => {
      render(
         <ButtonGroup
            value={value}
            setter={setValue}
            buttons={[
               { text: 'test', value: '1' },
               { text: 'buttons', value: 2 },
            ]}
         />
      );

      expect(value).toBe('test');

      await user.click(screen.getByText('buttons'));
      expect(value).toBe(2);

      await user.click(screen.getByText('test'));
      expect(value).toBe('1');
   });

   test('multiple ButtonGroups', async () => {
      const buttons1 = [
         { text: 'test1-1', value: 'a' },
         { text: 'test1-2', value: 'b' },
         { text: 'test1-3', value: 'c' },
      ];
      let value1: string | number = buttons1[2].value;
      const setValue1 = (val: string | number): string | number => (value1 = val);

      const buttons2 = [
         { text: 'test2-1', value: '1' },
         { text: 'test2-2', value: '2' },
      ];
      let value2: string | number = buttons2[1].value;
      const setValue2 = (val: string | number): string | number => (value2 = val);
      render(
         <div>
            <ButtonGroup value={value1} setter={setValue1} buttons={buttons1} />
            <ButtonGroup value={value2} setter={setValue2} buttons={buttons2} />
         </div>
      );

      let button1 = buttons1[0];
      let button2 = buttons2[1];
      await user.click(screen.getByText(button1.text));
      await user.click(screen.getByText(button2.text));
      expect(value1).toStrictEqual(button1.value);
      expect(value2).toStrictEqual(button2.value);

      button1 = buttons1[1];
      button2 = buttons2[0];
      await user.click(screen.getByText(button1.text));
      await user.click(screen.getByText(button2.text));
      expect(value1).toStrictEqual(button1.value);
      expect(value2).toStrictEqual(button2.value);
   });
});
