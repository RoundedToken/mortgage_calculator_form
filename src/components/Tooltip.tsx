import { ReactNode } from 'react';
import triangleImg from '../assets/TopRight.svg';

const Tooltip = ({ tooltip }: { tooltip: ReactNode }) => {
    return (
        <div
            style={{ boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.12)' }}
            className="px-2 py-1 bg-tooltip rounded w-[266px] relative"
        >
            {tooltip}

            <img className="absolute top-[-6px] left-2" src={triangleImg} alt="tooltip" width={8} height={6} />
        </div>
    );
};

export default Tooltip;
