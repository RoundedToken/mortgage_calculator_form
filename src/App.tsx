import { Formik, Form } from 'formik';
import { getPercent } from './utils/getPercent';
import { validationSchema } from './utils/validationSchema';
import { usePostFormMutation } from './store';
import TextInput from './components/TextInput';
import MonthPayment from './components/MonthPayment';
import FirstPayment from './components/FirstPayment';
import Select from './components/Select';
import { cityOptions, ownershipOtions, periodOptions, typeOptions } from './constants';

const MortgageForm = () => {
    const [update] = usePostFormMutation();

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
                    time: '30',
                    monthlyPayment: '2684',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    //Отправка формы на условный роут
                    update(values);
                    //Сохранение формы в localStorage
                    localStorage.setItem('form', JSON.stringify(values));
                    alert(JSON.stringify(values));
                    setSubmitting(false);
                }}
            >
                {({ values, isValid, dirty, errors }) => (
                    <Form className="h-full flex flex-col gap-8">
                        <h1 className="w-[1130px] mx-auto text-5xl text-white font-normal tablet:mx-[55px] tablet:w-auto mobile:w-[350px] mobile:text-[31px] mobile:font-normal mobile:mx-auto">
                            Рассчитайте ипотеку быстро и просто
                        </h1>
                        <div className="w-[1130px] grid gap-y-8 mx-auto justify-between tablet:gap-x-16 tablet:justify-start tablet:w-auto tablet:ml-[55px] mobile:flex mobile:flex-col mobile:mx-auto">
                            <TextInput
                                id="cost"
                                name="cost"
                                type="text"
                                label="Стоимость недвижимости"
                                isFormatted
                                maxLength={10}
                            />

                            <Select
                                id="city"
                                name="city"
                                type="text"
                                label="Город покупки недвижимости"
                                options={cityOptions}
                                placeholder="Выберите город"
                                isSearch
                            />

                            <Select
                                id="period"
                                name="period"
                                type="text"
                                label="Когда вы планируете оформить ипотеку?"
                                options={periodOptions}
                                placeholder="Выберите период"
                            />

                            <FirstPayment firstPayment={values.firstPayment} cost={values.cost} />

                            <Select
                                className="tablet:row-start-3"
                                id="type"
                                name="type"
                                type="text"
                                label="Тип недвижимости"
                                options={typeOptions}
                                placeholder="Выберите тип недвижимости"
                            />

                            <Select
                                id="ownership"
                                name="ownership"
                                type="text"
                                label="Вы уже владеете недвижимостью?"
                                className="tablet:row-start-4"
                                options={ownershipOtions}
                                placeholder="Выберите ответ"
                            />

                            <span className=" col-span-3 w-full h-px bg-base_stroke tablet:col-span-2 mobile:col-span-1" />

                            <TextInput
                                id="time"
                                name="time"
                                type="text"
                                label="Срок"
                                limits={{ min: '4 года', max: '30 лет' }}
                                percent={getPercent(values.time, 30)}
                                maxLength={2}
                            />

                            <MonthPayment
                                errors={errors}
                                cost={values.cost}
                                time={values.time}
                                firstPayment={values.firstPayment}
                                currentValue={values.monthlyPayment}
                            />
                        </div>

                        <div className="w-full border-t border-base_stroke py-8 mt-auto flex justify-center mobile:bg-base_secondary mobile:py-6 mobile:px-5">
                            <div className="w-[1130px] flex justify-end tablet:w-full tablet:pr-[55px] mobile:p-0">
                                <button
                                    className={`${
                                        isValid && dirty ? 'bg-my_yellow' : 'bg-slate-500'
                                    } px-4 py-3 text-my_black rounded-lg font-medium w-[249px] h-[56px] mobile:w-[350px] mobile:mx-auto`}
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
