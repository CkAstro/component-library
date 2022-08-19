import { useState } from 'react';
import { render, screen, userEvent } from '@/test';
import { EditableValueDisplay } from '../EditableValueDisplay';

const user = userEvent.setup({ delay: null });

const defaultValue = 'this is a test';
const MockContainer = (): JSX.Element => {
   const [value, setValue] = useState<number | string>(defaultValue);

   return <EditableValueDisplay value={value} setValue={setValue} />;
};

describe('EditableValueDisplay (unit)', () => {
   test('renders with value', () => {
      render(<MockContainer />);
      expect(screen.getByText(defaultValue)).toBeInTheDocument();
   });

   test('input opens on double click', async () => {
      render(<MockContainer />);
      expect(document.querySelector('input')).toBeNull();

      await user.dblClick(screen.getByText(defaultValue));
      expect(document.querySelector('input')).toBeInTheDocument();
   });

   test('update value', async () => {
      const newValue = 'new test value';
      render(<MockContainer />);
      expect(screen.queryByText(newValue)).not.toBeInTheDocument();

      // double click and type new value
      await user.dblClick(screen.getByText(defaultValue));
      await user.keyboard(`${newValue}{Enter}`);

      expect(screen.getByText(newValue)).toBeInTheDocument();
   });

   test('cancel update on escape', async () => {
      const newValue = 'new test value';
      render(<MockContainer />);
      expect(screen.queryByText(newValue)).not.toBeInTheDocument();

      // double click, type new value
      await user.dblClick(screen.getByText(defaultValue));
      await user.keyboard(newValue);

      //    getByDisplayValue failing for some reason..
      const inputBox: HTMLInputElement = screen.getByRole('textbox');
      expect(inputBox.value).toBe(newValue);

      // then escape out of value change
      await user.keyboard('{Escape}');
      expect(screen.queryByDisplayValue(newValue)).not.toBeInTheDocument();
      expect(screen.getByText(defaultValue)).toBeInTheDocument();
   });

   test('enforce string type', async () => {
      const defaultString = 'test string';
      const newString = 'a new string';
      const MockEnforceContainer = (): JSX.Element => {
         const [value, setValue] = useState<number | string>(defaultString);

         return (
            <div>
               <EditableValueDisplay value={value} setValue={setValue} enforceType="string" />
               {typeof value}
            </div>
         );
      };

      render(<MockEnforceContainer />);

      expect(screen.getByText('string')).toBeInTheDocument();
      expect(screen.queryByText('number')).not.toBeInTheDocument();

      // change the value
      await user.dblClick(screen.getByText(defaultString));
      await user.keyboard(`${newString}{Enter}`);

      expect(screen.getByText(newString)).toBeInTheDocument();
      expect(screen.queryByText(defaultString)).not.toBeInTheDocument();
      expect(screen.getByText('string')).toBeInTheDocument();
      expect(screen.queryByText('number')).not.toBeInTheDocument();
   });

   test('enforce number type', async () => {
      const defaultNumber = 3.14;
      const newNumber = 9.81;
      const MockEnforceContainer = (): JSX.Element => {
         const [value, setValue] = useState<number | string>(defaultNumber);

         return (
            <div>
               <EditableValueDisplay value={value} setValue={setValue} enforceType="number" />
               {/* check type and write to DOM for querying */}
               {typeof value}
            </div>
         );
      };

      render(<MockEnforceContainer />);

      expect(screen.getByText('number')).toBeInTheDocument();
      expect(screen.queryByText('string')).not.toBeInTheDocument();

      // change the value
      await user.dblClick(screen.getByText(defaultNumber));
      await user.keyboard(`${newNumber}{Enter}`);

      expect(screen.getByText(newNumber)).toBeInTheDocument();
      expect(screen.queryByText(defaultNumber)).not.toBeInTheDocument();
      expect(screen.getByText('number')).toBeInTheDocument();
      expect(screen.queryByText('string')).not.toBeInTheDocument();
   });

   test('no submit on non-number', async () => {
      const defaultNumber = 3.14;
      const newNumber = '9.81a';
      const MockEnforceContainer = (): JSX.Element => {
         const [value, setValue] = useState<number | string>(defaultNumber);

         return (
            <div>
               <EditableValueDisplay value={value} setValue={setValue} enforceType="number" />
               {/* check type and write to DOM for querying */}
               {typeof value}
            </div>
         );
      };

      render(<MockEnforceContainer />);

      expect(screen.getByText('number')).toBeInTheDocument();
      expect(screen.queryByText('string')).not.toBeInTheDocument();

      // change the value
      await user.dblClick(screen.getByText(defaultNumber));
      await user.keyboard(`${newNumber}{Enter}`);

      // ensure value was not changed, input box is still open
      expect(screen.queryByText(newNumber)).not.toBeInTheDocument();
      expect(screen.queryByText(defaultNumber)).not.toBeInTheDocument();

      //    getByDisplayValue failing for some reason..
      const inputBox: HTMLInputElement = screen.getByRole('textbox');
      expect(inputBox).toBeInTheDocument();
      expect(inputBox.value).toBe(newNumber);

      expect(document.querySelector('.valueArea__input')).toBeInTheDocument();
   });

   test('no submit on out-of-range', async () => {
      const defaultNumber = 3.14;
      const newMinNumber = '2.5';
      const newMaxNumber = '10.0';
      const MockEnforceContainer = (): JSX.Element => {
         const [value, setValue] = useState<number | string>(defaultNumber);

         return (
            <div>
               <EditableValueDisplay
                  value={value}
                  setValue={setValue}
                  enforceType="number"
                  enforceRange={{ min: 3.14, max: 9.81 }}
               />
               {/* check type and write to DOM for querying */}
               {typeof value}
            </div>
         );
      };

      render(<MockEnforceContainer />);

      expect(screen.getByText('number')).toBeInTheDocument();
      expect(screen.queryByText('string')).not.toBeInTheDocument();

      // change the value to something below the min
      await user.dblClick(screen.getByText(defaultNumber));
      await user.keyboard(`${newMinNumber}{Enter}`);

      // ensure value was not changed, input box is still open
      expect(screen.queryByText(newMinNumber)).not.toBeInTheDocument();
      expect(screen.queryByText(defaultNumber)).not.toBeInTheDocument();

      //    getByDisplayValue failing for some reason..
      const inputBox: HTMLInputElement = screen.getByRole('textbox');
      expect(inputBox).toBeInTheDocument();
      expect(inputBox.value).toBe(newMinNumber);

      // change the value to something above the max
      await user.keyboard(`{Control>}a{/Control}${newMaxNumber}{Enter}`);

      // ensure value was not changed, input box is still open
      expect(screen.queryByText(newMaxNumber)).not.toBeInTheDocument();
      expect(screen.queryByText(defaultNumber)).not.toBeInTheDocument();
      expect(inputBox).toBeInTheDocument();
      expect(inputBox.value).toBe(newMaxNumber);

      expect(document.querySelector('.valueArea__input')).toBeInTheDocument();
   });

   test('ensure no textbox on blur', async () => {
      const MockEnforceContainer = (): JSX.Element => {
         const [value, setValue] = useState<number | string>(defaultValue);

         return (
            <div>
               <EditableValueDisplay value={value} setValue={setValue} />
               {/* check type and write to DOM for querying */}
               {typeof value}
            </div>
         );
      };

      render(<MockEnforceContainer />);

      expect(screen.getByText('string')).toBeInTheDocument();
      expect(screen.queryByText('number')).not.toBeInTheDocument();

      // change the value
      await user.dblClick(screen.getByText(defaultValue));

      // ensure value was not changed, input box is still open
      expect(screen.queryByText(defaultValue)).not.toBeInTheDocument();

      //    getByDisplayValue failing for some reason..
      const inputBox: HTMLInputElement = screen.getByRole('textbox');
      expect(inputBox).toBeInTheDocument();

      // click off the textbox
      await user.click(screen.getByText('string'));
      expect(inputBox).not.toBeInTheDocument();

      expect(document.querySelector('.valueArea__input')).not.toBeInTheDocument();
   });
});
