import { atom } from 'jotai';

export const cartAtom = atom<{ id?: number; name?: string; price?: number; amount: number }[]>([]);