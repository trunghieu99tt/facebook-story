import { useEffect } from 'react';

// Hook
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useOnClickOutside = (ref: any, handler: any): void => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref?.current?.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export { useOnClickOutside };
