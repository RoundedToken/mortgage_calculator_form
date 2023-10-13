import * as Yup from 'yup';
import { getPercent } from './getPercent';
import { removeCommas } from './removeCommas';
import { IFormValues } from '../models/IFormValues';

const requiredMessage = 'Выберите ответ';

export const validationSchema = Yup.object<IFormValues>({
    cost: Yup.string()
        .test(
            'isLessThen10,000,000',
            'Стоимость недвижимости не может превышать 10,000,000',
            (v) => +removeCommas(v || '') <= 10000000
        )
        .required(requiredMessage),
    city: Yup.string().required(requiredMessage),
    period: Yup.string().required(requiredMessage),
    firstPayment: Yup.string()
        .test(
            'isLessOrEquals100%',
            'Сумма первоначального взноса не может быть больше 100% от стоимости недвижимости',
            function (v) {
                return getPercent(removeCommas(v || ''), this.options.context?.cost) <= 100;
            }
        )
        .test(
            'isMoreOrEquals25%',
            'Сумма первоначального взноса не может быть меньше 25% от стоимости недвижимости',
            function (v) {
                return getPercent(removeCommas(v || ''), this.options.context?.cost) >= 25;
            }
        )
        .required(requiredMessage),
    type: Yup.string().required(requiredMessage),
    ownership: Yup.string().required(requiredMessage),
    time: Yup.string()
        .test(
            'isMoreOrEquals4',
            'Срок ипотеки не может быть меньше 4 лет',
            (v) => +removeCommas(v || '') >= 4
        )
        .test(
            'isLessOrEquals30',
            'Срок ипотеки не может превышать 30 лет',
            (v) => +removeCommas(v || '') <= 30
        )
        .required(requiredMessage),
    monthlyPayment: Yup.number().required(requiredMessage),
});
