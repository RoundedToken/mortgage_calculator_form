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
            label="Первоначальный взнос"
            className="tablet:row-start-3"
            isFormatted
            tooltip={
                <div className="text-sm font-normal">
                    <p>
                        <span className="font-medium">Основная квартира:</span> у заемщика нет квартиры ставка
                        финансирования
                        <br />
                        <span className="font-medium">Максимум до 75%</span>
                    </p>

                    <p>
                        <br />
                        <span className="font-medium">Альтернативная квартира:</span> Для заемщика квартира, которую он
                        обязуется продать в течение двух лет ставка финансирования
                        <br />
                        <span className="font-medium">Максимум до 70%</span>
                    </p>

                    <p>
                        <br />
                        <span className="font-medium">Вторая квартира или выше:</span> у заемщика уже есть ставка
                        финансирования квартиры
                        <br />
                        <span className="font-medium">Максимум до 50%</span>
                    </p>
                </div>
            }
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
