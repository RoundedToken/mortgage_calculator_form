import { useEffect, useRef } from 'react';

const RangeBar = ({ percent, containerRef }: { percent: number; containerRef: React.RefObject<HTMLDivElement> }) => {
    const per = percent ?? 0;
    const widthPercent = Math.min(per, 100);
    const circleRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (containerRef.current && circleRef.current && percent !== undefined) {
            const containerWidth = containerRef.current.offsetWidth;
            const circleWidthHalf = circleRef.current.offsetWidth / 2;
            const maxWidth = containerWidth - circleWidthHalf;
            const dynamicWidth = (containerWidth * percent) / 100 - circleWidthHalf;
            const translateX = Math.min(maxWidth, dynamicWidth);

            circleRef.current.style.transform = `translateX(${translateX}px)`;
        }
    }, [containerRef, circleRef, percent]);

    return (
        <>
            <span
                style={{ width: `${widthPercent}%` }}
                className={`h-0.5 bg-my_yellow absolute bottom-[-1px] left-0 rounded-[1.5px]`}
            />

            <span
                ref={circleRef}
                className="bg-my_yellow rounded-full w-3 h-3 absolute bottom-[-6px] translate-y-1/2 left-0"
            />
        </>
    );
};

export default RangeBar;
