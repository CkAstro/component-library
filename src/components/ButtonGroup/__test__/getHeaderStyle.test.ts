import '@/test';
import getHeaderStyle from '../getHeaderStyle';

describe('getHeaderStyle', () => {
   test('plain number (assumed pixels)', () => {
      expect(getHeaderStyle('11')).toStrictEqual({ width: '11px' });
   });

   test('no input', () => {
      expect(getHeaderStyle(undefined)).toStrictEqual({});
   });

   test('custom input', () => {
      expect(getHeaderStyle('1rem')).toStrictEqual({ width: '1rem' });
      expect(getHeaderStyle('20%')).toStrictEqual({ width: '20%' });
   });

   test('bad custom input', () => {
      // this just won't render
      expect(getHeaderStyle('11%rem?px')).toStrictEqual({ width: '11%rem?px' });
   });
});
