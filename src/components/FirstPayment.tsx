import { getPercent } from '../utils/getPercent';
import { getPrice } from '../utils/getPrice';
import TextInput from './TextInput';

interface IFirstPayment {
    cost: string;
    firstPayment: string;
}

const FirstPayment = ({ cost, firstPayment }: IFirstPayment) => {
    const percent = getPercent(firstPayment, cost);
    const firstPaymentPrice = getPrice(+firstPayment);

    return (
        <TextInput
            id="firstPayment"
            name="firstPayment"
            type="text"
            label="Первоначальный взнос"
            className="tablet:row-start-3"
            isFormatted
            percent={percent}
            maxLength={10}
            infoMessage={
                <span className="text-xs">
                    <p>
                        Сумма финансирования:
                        <span className="font-bold">{firstPaymentPrice}</span>
                    </p>

                    <p>
                        Процент финансирования:
                        <span className="font-bold">{`${percent}%`}</span>
                    </p>
                </span>
            }
        />
    );
};

export default FirstPayment;
