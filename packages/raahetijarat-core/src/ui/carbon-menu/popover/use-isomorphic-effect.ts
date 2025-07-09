import { useEffect, useLayoutEffect } from 'react';

// useLayoutEffect will show warning if used during ssr, e.g. with Next.js
// useraahetijaratEffect removes it by replacing useLayoutEffect with useEffect during ssr
export const useraahetijaratEffect =
  typeof document !== 'undefined' ? useLayoutEffect : useEffect;
