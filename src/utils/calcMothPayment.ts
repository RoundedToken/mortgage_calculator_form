import { removeCommas } from './removeCommas';

/**
 * Рассчитывает ежемесячный платеж по ипотеке
 *
 * @param propertyCost - Полная стоимость недвижимости
 * @param initialPayment - Сумма первоначального взноса
 * @param years - Количество лет выплаты ипотеки
 * @returns Ежемесячная сумма платежа
 */
export function calcMonthPayment(
    propertyCost: number | string,
    initialPayment: number | string,
    years: number | string,
): number {
    const propertyCostNumber = typeof propertyCost === 'string' ? +removeCommas(propertyCost) : propertyCost;
    const initialPaymentNumber = typeof initialPayment === 'string' ? +removeCommas(initialPayment) : initialPayment;
    const yearsNumber = typeof years === 'string' ? +removeCommas(years) : years;

    const interestRate = 0.05; // 5% годовых

    const months = yearsNumber * 12; // кол-во месяцев

    const creditAmount = propertyCostNumber - initialPaymentNumber;

    const monthlyRate = interestRate / 12;

    const monthlyPayment = creditAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)));

    return Math.round(monthlyPayment);
}
