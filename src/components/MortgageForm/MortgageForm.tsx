import { Formik, Form } from 'formik';
import { cityOptions, periodOptions, typeOptions, ownershipOtions } from './constants';
import { usePostFormMutation } from '../../store';
import { getPercent } from '../../utils/getPercent';
import { validationSchema } from './validationSchema';
import FirstPayment from '../FirstPayment';
import MonthPayment from '../MonthPayment';
import Select from '../Select';
import TextInput from '../TextInput';
import FormSubmit from '../FormSubmit';
import { initialValues } from './initialValues';

const MortgageForm = () => {
    const [update] = usePostFormMutation();

    return (
        <>
            <Formik
                initialValues={initialValues}
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
                                label="Стоимость недвижимости"
                                isFormatted
                                maxLength={10}
                            />

                            <Select
                                id="city"
                                name="city"
                                label="Город покупки недвижимости"
                                options={cityOptions}
                                placeholder="Выберите город"
                                isSearch
                            />

                            <Select
                                id="period"
                                name="period"
                                label="Когда вы планируете оформить ипотеку?"
                                options={periodOptions}
                                placeholder="Выберите период"
                            />

                            <FirstPayment firstPayment={values.firstPayment} cost={values.cost} />

                            <Select
                                className="tablet:row-start-3"
                                id="type"
                                name="type"
                                label="Тип недвижимости"
                                options={typeOptions}
                                placeholder="Выберите тип недвижимости"
                            />

                            <Select
                                id="ownership"
                                name="ownership"
                                label="Вы уже владеете недвижимостью?"
                                className="tablet:row-start-4"
                                options={ownershipOtions}
                                placeholder="Выберите ответ"
                            />

                            <span className=" col-span-3 w-full h-px bg-base_stroke tablet:col-span-2 mobile:col-span-1" />

                            <TextInput
                                id="time"
                                name="time"
                                label="Срок"
                                limits={{ min: '4 года', max: '30 лет' }}
                                percent={getPercent(values.time, 30)}
                                maxLength={2}
                                isCurrency={false}
                            />

                            <MonthPayment
                                errors={errors}
                                cost={values.cost}
                                time={values.time}
                                firstPayment={values.firstPayment}
                            />
                        </div>

                        <FormSubmit isValid={isValid} dirty={dirty} />
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default MortgageForm;
