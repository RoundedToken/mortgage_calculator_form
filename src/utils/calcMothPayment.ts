/**
 * Рассчитывает ежемесячный платеж по ипотеке
 *
 * @param propertyCost - Полная стоимость недвижимости
 * @param initialPayment - Сумма первоначального взноса
 * @param years - Количество лет выплаты ипотеки
 * @returns Ежемесячная сумма платежа
 */
export function calcMonthPayment(
    propertyCost: number,
    initialPayment: number,
    years: number
): number {
    const interestRate = 0.05; // 5% годовых

    const months = years * 12; // кол-во месяцев

    const creditAmount = propertyCost - initialPayment;

    const monthlyRate = interestRate / 12;

    const monthlyPayment = creditAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)));

    return Math.round(monthlyPayment);
}
