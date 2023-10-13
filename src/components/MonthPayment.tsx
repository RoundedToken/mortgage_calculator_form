import TextInput from './TextInput';
import { getPrice } from '../utils/getPrice';
import { calcMonthPayment } from '../utils/calcMothPayment';
import { removeCommas } from '../utils/removeCommas';
import { getPercent } from '../utils/getPercent';
import { IFormValues } from '../models/IFormValues';
import { FormikErrors } from 'formik';

interface IMonthPayment {
    cost: string;
    firstPayment: string;
    time: string;
    currentValue: string;
    errors: FormikErrors<IFormValues>;
}

const MonthPayment = ({ cost, firstPayment, time, currentValue, errors }: IMonthPayment) => {
    const minPayment = calcMonthPayment(+removeCommas(cost), +removeCommas(firstPayment), 30);
    const maxPayment = calcMonthPayment(+removeCommas(cost), +removeCommas(firstPayment), 4);
    const maxPaymentPrice = getPrice(maxPayment);
    const minPaymentPrice = getPrice(minPayment);
    const monthPayment = calcMonthPayment(
        +removeCommas(cost),
        +removeCommas(firstPayment),
        +removeCommas(time),
    ).toString();
    const percent = getPercent(+monthPayment - minPayment, maxPayment - minPayment);
    const isErrors = errors.cost || errors.firstPayment || errors.time;

    return (
        <TextInput
            id="monthlyPayment"
            name="monthlyPayment"
            type="text"
            label="Ежемесячный платеж"
            limits={{
                max: isErrors ? getPrice(0) : maxPaymentPrice,
                min: isErrors ? getPrice(0) : minPaymentPrice,
            }}
            min={minPayment}
            max={maxPayment}
            infoMessage={<p className="text-xs">Увеличьте ежемесячный платеж и переплачивайте меньше</p>}
            percent={percent}
            fixedValue={isErrors ? currentValue : monthPayment}
            readOnly
        />
    );
};

export default MonthPayment;
