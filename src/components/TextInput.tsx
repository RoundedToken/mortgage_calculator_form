import { FieldConfig, useField } from 'formik';
import React, { FC, ReactNode, useRef } from 'react';
import { removeCommas } from '../utils/removeCommas';
import FieldWrapper from './FieldWrapper';
import { formatNumber } from '../utils/formatNumber';
import currenciesImg from '../assets/Currencies.svg';
import RangeBar from './RangeBar';

interface ITextInput {
    label: string;
    className?: string;
    isFormatted?: boolean;
    percent?: number;
    infoMessage?: ReactNode;
    limits?: { min: string; max: string };
    fixedValue?: string;
    tooltip?: ReactNode;
}

type BuiltInTextInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const TextInput: FC<BuiltInTextInputProps & FieldConfig<string> & ITextInput> = ({
    label,
    infoMessage,
    className,
    percent,
    isFormatted = false,
    limits,
    fixedValue,
    tooltip,
    ...props
}) => {
    const [field, meta, helpers] = useField(props);
    const { value } = field;
    const { setValue } = helpers;
    const containerRef = useRef<HTMLDivElement>(null);

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

    return (
        <FieldWrapper
            containerRef={containerRef}
            label={label}
            meta={meta}
            name={props.name}
            id={props.id}
            className={className}
            infoMessage={infoMessage}
            tooltip={tooltip}
        >
            <div className="flex flex-col gap-[5px]">
                <div
                    className={`border-base_stroke ${
                        meta.error &&
                        meta.touched &&
                        (percent ? 'border-l-error border-t-error border-r-error' : 'border-error')
                    } flex border bg-base_inputs rounded-md text-primary px-6 py-3 text-xl font-normal relative`}
                >
                    <input
                        type="text"
                        className="bg-transparent w-full"
                        {...field}
                        {...props}
                        value={fixedValue ? formatNumber(fixedValue) : isFormatted ? formatNumber(value) : value}
                        onChange={handleChange}
                    />

                    <img width={20} height={20} src={currenciesImg} alt="Currencies" />

                    {percent !== undefined && <RangeBar containerRef={containerRef} percent={percent} />}
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
