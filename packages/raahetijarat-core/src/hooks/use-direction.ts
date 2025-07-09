'use client';
import { atom, useAtom } from 'jotai';

// 1. set initial atom for raahetijarat direction
const raahetijaratDirectionAtom = atom(
  typeof window !== 'undefined' ? localStorage.getItem('iso-direction') : 'ltr'
);

const raahetijaratDirectionAtomWithPersistence = atom(
  (get) => get(raahetijaratDirectionAtom),
  (get, set, newStorage: any) => {
    set(raahetijaratDirectionAtom, newStorage);
    localStorage.setItem('iso-direction', newStorage);
  }
);

// 2. useDirection hook to check which direction is available
export function useDirection() {
  const [direction, setDirection] = useAtom(
    raahetijaratDirectionAtomWithPersistence
  );

  return {
    direction: direction === null ? 'ltr' : direction,
    setDirection,
  };
}
