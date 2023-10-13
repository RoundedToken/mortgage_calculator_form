import { FieldMetaProps } from 'formik';
import { ReactNode } from 'react';
import InfoMessage from './InfoMessage';
import ErrorMessage from './ErrorMessage';

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
}

const FieldWrapper = ({
    label,
    children,
    className,
    infoMessage,
    meta,
    id,
    name,
    containerRef,
}: IFieldWrapper) => {
    return (
        <div
            ref={containerRef}
            className={`flex flex-col gap-3 w-[325px] mobile:w-[350px] ${className}`}
        >
            <label className="text-base font-medium text-primary font-inter" htmlFor={id || name}>
                {label}
            </label>

            {children}

            {infoMessage && <InfoMessage>{infoMessage}</InfoMessage>}

            {meta.touched && meta.error ? <ErrorMessage text={meta.error} /> : null}
        </div>
    );
};

export default FieldWrapper;
