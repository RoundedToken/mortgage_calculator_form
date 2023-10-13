import { Formik, Form, useField, FieldConfig } from 'formik';
import { FC, ReactNode, useEffect, useRef } from 'react';
import currenciesImg from './assets/Currencies.svg';
import { getPrice } from './utils/getPrice';
import { getPercent } from './utils/getPercent';
import { removeCommas } from './utils/removeCommas';
import { formatNumber } from './utils/formatNumber';
import FieldWrapper from './components/FieldWrapper';
import { validationSchema } from './utils/validationSchema';

interface IMyTextInput {
    label: string;
    className?: string;
    isFormatted?: boolean;
    percent?: number;
    infoMessage?: ReactNode;
    limits?: { min: string; max: string };
}

type BuiltInTextInputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

const MyTextInput: FC<BuiltInTextInputProps & FieldConfig<string> & IMyTextInput> = ({
    label,
    infoMessage,
    className,
    percent,
    isFormatted = false,
    limits,
    ...props
}) => {
    const [field, meta, helpers] = useField(props);
    const { value } = field;
    const { setValue } = helpers;
    const containerRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLSpanElement>(null);
    const per = percent ?? 0;
    const widthPercent = Math.min(per, 100);

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
        if (containerRef.current && circleRef.current && percent) {
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
                        value={isFormatted ? formatNumber(value) : value}
                        onChange={handleChange}
                    />

                    <img width={20} height={20} src={currenciesImg} alt="Currencies" />

                    {percent && (
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

const MortgageForm = () => {
    return (
        <>
            <Formik
                initialValues={{
                    cost: '1000000',
                    city: '',
                    period: '',
                    firstPayment: '500000',
                    type: '',
                    ownership: '',
                    time: '4',
                    monthlyPayment: '3333',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    alert(JSON.stringify(values));
                    setSubmitting(false);
                }}
            >
                {(form) => (
                    <Form className="h-full flex flex-col gap-8">
                        <h1 className="w-[1130px] mx-auto text-5xl text-white font-normal tablet:mx-[55px] tablet:w-auto mobile:w-[350px] mobile:text-[31px] mobile:font-normal mobile:mx-auto">
                            Рассчитайте ипотеку быстро и просто
                        </h1>
                        <div className="w-[1130px] grid gap-y-8 mx-auto justify-between tablet:gap-x-16 tablet:justify-start tablet:w-auto tablet:ml-[55px] mobile:flex mobile:flex-col mobile:mx-auto">
                            <MyTextInput
                                id="cost"
                                name="cost"
                                type="text"
                                label="Стоимость недвижимости"
                                isFormatted
                            />

                            <MyTextInput
                                id="city"
                                name="city"
                                type="text"
                                label="Город покупки недвижимости"
                            />

                            <MyTextInput
                                id="period"
                                name="period"
                                type="text"
                                label="Когда вы планируете оформить ипотеку?"
                            />

                            <MyTextInput
                                id="firstPayment"
                                name="firstPayment"
                                type="text"
                                label="Первоначальный взнос"
                                className="tablet:row-start-3"
                                isFormatted
                                percent={getPercent(form.values.firstPayment, form.values.cost)}
                                infoMessage={
                                    <span className="text-xs">
                                        <p>
                                            Cумма финансирования:
                                            <span className="font-bold">
                                                {getPrice(+form.values.firstPayment)}
                                            </span>
                                        </p>
                                        <p>
                                            Процент финансирования:
                                            <span className="font-bold">{`${getPercent(
                                                form.values.firstPayment,
                                                form.values.cost
                                            )}%`}</span>
                                        </p>
                                    </span>
                                }
                            />

                            <MyTextInput
                                className="tablet:row-start-3"
                                id="type"
                                name="type"
                                type="text"
                                label="Тип недвижимости"
                            />

                            <MyTextInput
                                id="ownership"
                                name="ownership"
                                type="text"
                                label="Вы уже владеете недвижимостью?"
                                className="tablet:row-start-4"
                            />

                            <span className=" col-span-3 w-full h-px bg-base_stroke tablet:col-span-2 mobile:col-span-1" />

                            <MyTextInput
                                id="time"
                                name="time"
                                type="number"
                                label="Cрок"
                                limits={{ min: '4 года', max: '30 лет' }}
                                percent={33}
                            />

                            <MyTextInput
                                id="monthlyPayment"
                                name="monthlyPayment"
                                type="number"
                                label="Ежемесячный платеж"
                                infoMessage={
                                    <p className="text-xs">
                                        Увеличьте ежемесячный платеж и переплачивайте меньше
                                    </p>
                                }
                                limits={{ min: getPrice(123), max: getPrice(45789) }}
                                percent={50}
                            />
                        </div>

                        <div className="w-full border-t border-base_stroke py-8 mt-auto flex justify-center mobile:bg-base_secondary mobile:py-6 mobile:px-5">
                            <div className="w-[1130px] flex justify-end tablet:w-full tablet:pr-[55px] mobile:p-0">
                                <button
                                    className="bg-my_yellow px-4 py-3 text-my_black rounded-lg font-inter font-medium w-[249px] h-[56px] mobile:w-[350px] mobile:mx-auto"
                                    type="submit"
                                >
                                    Продолжить
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

function App() {
    return <MortgageForm />;
}

export default App;
