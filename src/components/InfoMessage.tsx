import { ReactNode } from 'react';
import warningCircleImg from '../assets/WarningCircle.svg';

const InfoMessage = ({ children }: { children: ReactNode }) => {
    return (
        <div className="px-3 py-1.5 flex gap-1 items-start rounded bg-base_secondary">
            <img src={warningCircleImg} alt="Warning" width={16} height={16} />

            <div className="text-primary text-sm font-normal">{children}</div>
        </div>
    );
};

export default InfoMessage;
