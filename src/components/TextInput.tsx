import { FieldConfig, useField } from 'formik';
import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { removeCommas } from '../utils/removeCommas';
import FieldWrapper from './FieldWrapper';
import { formatNumber } from '../utils/formatNumber';
import currenciesImg from '../assets/Currencies.svg';

interface ITextInput {
    label: string;
    className?: string;
    isFormatted?: boolean;
    percent?: number;
    infoMessage?: ReactNode;
    limits?: { min: string; max: string };
    fixedValue?: string;
    min?: number;
    max?: number;
}

type BuiltInTextInputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

const TextInput: FC<BuiltInTextInputProps & FieldConfig<string> & ITextInput> = ({
    label,
    infoMessage,
    className,
    percent,
    isFormatted = false,
    limits,
    fixedValue,
    min,
    max,
    ...props
}) => {
    const [field, meta, helpers] = useField(props);
    const { value } = field;
    const { setValue } = helpers;
    const containerRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLSpanElement>(null);
    const per = percent ?? 0;
    const widthPercent = Math.min(per, 100);
    const monthPay =
        fixedValue &&
        min &&
        max &&
        (+fixedValue < min ? min.toString() : +fixedValue > max ? max.toString() : fixedValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const newValue = removeCommas(value);

        if (value === '') {
            setValue(value);
            return;
        }

        if (!newValue.match(/^\d+$/)) {
            return;
        }

        setValue(newValue);
    };

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
        <FieldWrapper
            containerRef={containerRef}
            label={label}
            meta={meta}
            name={props.name}
            id={props.id}
            className={className}
            infoMessage={infoMessage}
        >
            <div className="flex flex-col gap-[5px]">
                <div className="flex border-base_stroke border bg-base_inputs rounded-md text-primary px-6 py-3 text-xl font-normal relative">
                    <input
                        className="bg-transparent w-full"
                        {...field}
                        {...props}
                        value={
                            monthPay
                                ? formatNumber(monthPay)
                                : isFormatted
                                ? formatNumber(value)
                                : value
                        }
                        onChange={handleChange}
                    />

                    <img width={20} height={20} src={currenciesImg} alt="Currencies" />

                    {percent !== undefined && (
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
                    )}
                </div>

                {limits && (
                    <div className="flex justify-between py-1.5 text-sm">
                        <span>{limits.min}</span>
                        <span>{limits.max}</span>
                    </div>
                )}
            </div>
        </FieldWrapper>
    );
};

export default TextInput;
