import { useraahetijaratEffect } from '../../hooks/use-event-listener';
import React, { forwardRef, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { assignRef } from '../../ui/carbon-menu/popover/use-merged-ref';

function createPortalNode(props: React.ComponentPropsWithoutRef<'div'>) {
  const node = document.createElement('div');
  node.setAttribute('data-portal', 'true');
  typeof props.className === 'string' &&
    node.classList.add(...props.className.split(' ').filter(Boolean));
  typeof props.style === 'object' && Object.assign(node.style, props.style);
  typeof props.id === 'string' && node.setAttribute('id', props.id);
  return node;
}

export interface PortalProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Portal children, for example, custom modal or popover */
  children: React.ReactNode;

  /** Element inside which portal should be created, by default a new div element is created and appended to the `document.body` */
  target?: HTMLElement | string;
}

export const Portal = forwardRef<HTMLDivElement, PortalProps>(
  ({ children, target, ...props }, ref) => {
    const [mounted, setMounted] = useState(false);
    const nodeRef = useRef<HTMLElement | null>(null);

    useraahetijaratEffect(() => {
      setMounted(true);
      nodeRef.current = !target
        ? createPortalNode(props)
        : typeof target === 'string'
          ? document.querySelector(target)
          : target;

      assignRef(ref, nodeRef.current);

      if (!target && nodeRef.current) {
        document.body.appendChild(nodeRef.current);
      }

      return () => {
        if (!target && nodeRef.current) {
          document.body.removeChild(nodeRef.current);
        }
      };
    }, [target]);

    if (!mounted || !nodeRef.current) {
      return null;
    }

    return createPortal(<>{children}</>, nodeRef.current);
  }
);

Portal.displayName = 'Portal';
