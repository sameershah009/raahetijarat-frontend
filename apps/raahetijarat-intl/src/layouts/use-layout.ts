'use client';

import { LAYOUT_OPTIONS } from '@/config/enums';
import { atom, useAtom } from 'jotai';

// 1. set initial atom for raahetijarat layout
const raahetijaratLayoutAtom = atom(
  typeof window !== 'undefined'
    ? localStorage.getItem('raahetijarat-layout')
    : LAYOUT_OPTIONS.HYDROGEN
);

const raahetijaratLayoutAtomWithPersistence = atom(
  (get) => get(raahetijaratLayoutAtom),
  (get, set, newStorage: any) => {
    set(raahetijaratLayoutAtom, newStorage);
    localStorage.setItem('raahetijarat-layout', newStorage);
  }
);

// 2. useLayout hook to check which layout is available
export function useLayout() {
  const [layout, setLayout] = useAtom(raahetijaratLayoutAtomWithPersistence);
  return {
    layout: layout === null ? LAYOUT_OPTIONS.HYDROGEN : layout,
    setLayout,
  };
}
