import { atom } from 'jotai';
import { Order } from "../../Api.ts";


export const orderAtom = atom<Order[]>([]);