import TextInput from './TextInput';
import { getPrice } from '../utils/getPrice';
import { calcMonthPayment } from '../utils/calcMothPayment';
import { getPercent } from '../utils/getPercent';
import { TFormValues } from './MortgageForm/initialValues';
import { FormikErrors } from 'formik';

interface IMonthPayment {
    cost: string;
    firstPayment: string;
    time: string;
    errors: FormikErrors<TFormValues>;
}

const MonthPayment = ({ cost, firstPayment, time, errors }: IMonthPayment) => {
    const minPayment = calcMonthPayment(cost, firstPayment, 30);
    const maxPayment = calcMonthPayment(cost, firstPayment, 4);
    const maxPaymentPrice = getPrice(maxPayment);
    const minPaymentPrice = getPrice(minPayment);
    const monthPayment = calcMonthPayment(cost, firstPayment, time);
    const percent = getPercent(monthPayment - minPayment, maxPayment - minPayment);
    const isErrors = errors.cost || errors.firstPayment || errors.time;

    return (
        <TextInput
            id="monthlyPayment"
            name="monthlyPayment"
            label="Ежемесячный платеж"
            limits={{
                max: isErrors ? getPrice(0) : maxPaymentPrice,
                min: isErrors ? getPrice(0) : minPaymentPrice,
            }}
            infoMessage={<p className="text-xs">Увеличьте ежемесячный платеж и переплачивайте меньше</p>}
            percent={isErrors ? 0 : percent}
            fixedValue={isErrors ? '0' : monthPayment.toString()}
            readOnly
        />
    );
};

export default MonthPayment;
