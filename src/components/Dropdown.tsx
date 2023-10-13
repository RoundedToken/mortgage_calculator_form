import { ReactNode } from 'react';
import checkImg from '../assets/Check.svg';

const Dropdown = ({ children }: { children: ReactNode }) => {
    return (
        <div
            style={{ boxShadow: '0px 8px 32px 0px rgba(0, 0, 0, 0.16)' }}
            className="flex flex-col h-min max-h-[216px] overflow-auto absolute bg-base_secondary border-base_stroke border rounded-lg w-[325px] py-2 mobile:w-[350px]"
        >
            {children}
        </div>
    );
};

Dropdown.Item = ({
    value,
    onClick,
    currentValue,
}: {
    value: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    currentValue: string;
}) => {
    const isSelected = value === currentValue;

    return (
        <button
            onClick={onClick}
            className="flex gap-2 justify-between items-center text-left hover:bg-base_inputs w-full px-4 py-2.5 text-sm"
        >
            {value}

            {isSelected && <img src={checkImg} alt="selected" width={20} height={20} />}
        </button>
    );
};

export default Dropdown;
