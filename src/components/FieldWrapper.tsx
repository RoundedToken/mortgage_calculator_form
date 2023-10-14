import { FieldMetaProps } from 'formik';
import { ReactNode, useRef, useState } from 'react';
import InfoMessage from './InfoMessage';
import ErrorMessage from './ErrorMessage';
import infoImg from '../assets/Info.svg';
import Portal from './Portal';
import Tooltip from './Tooltip';

interface IFieldWrapper {
    label: string;
    children?: ReactNode;
    className?: string;
    isFormatted?: boolean;
    percent?: number;
    infoMessage?: ReactNode;
    meta: FieldMetaProps<string>;
    id?: string;
    name: string;
    containerRef: React.RefObject<HTMLDivElement>;
    tooltip?: ReactNode;
}

const FieldWrapper = ({
    tooltip,
    label,
    children,
    className,
    infoMessage,
    meta,
    id,
    name,
    containerRef,
}: IFieldWrapper) => {
    const [isOpen, setIsOpen] = useState(false);
    const activatorRef = useRef<HTMLImageElement>(null);

    return (
        <div ref={containerRef} className={`flex flex-col gap-3 w-[325px] mobile:w-[350px] ${className}`}>
            <label className="flex gap-1.5 text-base font-medium text-primary" htmlFor={id || name}>
                {label}

                {tooltip && (
                    <img
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                        ref={activatorRef}
                        src={infoImg}
                        alt="info"
                        width={20}
                        height={20}
                    />
                )}
            </label>

            {children}

            {infoMessage && <InfoMessage>{infoMessage}</InfoMessage>}

            {meta.touched && meta.error ? <ErrorMessage text={meta.error} /> : null}

            {tooltip && (
                <Portal
                    container={document.body}
                    activatorRef={activatorRef}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    marginTop={12}
                >
                    <Tooltip tooltip={tooltip} />
                </Portal>
            )}
        </div>
    );
};

export default FieldWrapper;
