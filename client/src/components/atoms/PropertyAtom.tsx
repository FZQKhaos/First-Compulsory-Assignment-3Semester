import { atom } from 'jotai';
import { Property } from '../../Api.ts';

export const propertyAtom = atom<Property[]>([]);