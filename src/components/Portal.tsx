import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({
    children,
    container,
    activatorRef,
    isOpen,
    setIsOpen,
    marginTop = 0,
}: {
    children: ReactNode;
    container: Element | DocumentFragment;
    activatorRef: React.RefObject<HTMLDivElement>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
    marginTop?: number;
}) => {
    const portalRef = useRef<HTMLDivElement>(null);
    const [isResize, setIsResize] = useState(false);

    const handleResize = useCallback(() => setIsResize(true), []);

    const closeDropdown = useCallback(
        (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const portal = portalRef.current;
            const activator = activatorRef.current;

            if (!portal?.contains(target) && !activator?.contains(target)) {
                setIsOpen(false);
            }
        },
        [activatorRef, setIsOpen],
    );

    useEffect(() => {
        const activator = activatorRef.current;
        const portal = portalRef.current;

        if (portal && activator) {
            const activatorRect = activator.getBoundingClientRect();
            const left = activatorRect.left;
            const activatorHeight = activatorRect.height;
            const top = activator.offsetTop;

            portal.style.top = `${top + marginTop + activatorHeight}px`;
            portal.style.left = `${left}px`;
        }

        setIsResize(false);

        if (isOpen) {
            window.addEventListener('click', closeDropdown);
            window.addEventListener('resize', handleResize);
        } else {
            window.removeEventListener('click', closeDropdown);
            window.removeEventListener('resize', handleResize);
        }
    }, [isOpen, closeDropdown, activatorRef, marginTop, isResize, handleResize]);

    return isOpen
        ? createPortal(
              <div className="absolute" ref={portalRef}>
                  {children}
              </div>,
              container,
          )
        : null;
};

export default Portal;
