import ButtonGroup from '@/components/ButtonGroup';
import EditableValueDisplay from '@/components/EditableValueDisplay';
import NestableDropDown from '@/components/NestableDropDown';
import type { Component } from '@/types';

export const components: Array<Component> = [
   { name: 'ButtonGroup', display: <ButtonGroup.Display /> },
   { name: 'EditableValueDisplay', display: <EditableValueDisplay.Display /> },
   { name: 'NestableDropDown', display: <NestableDropDown.Display /> },
];
