/**
 * Возвращает процентное значение одного числа по отношению к другому.
 *
 * @param value Число, для которого необходимо вычислить процентное значение.
 * @param total Число, к которому необходимо вычислить процентное значение.
 * @returns Процентное значение.
 */
export const getPercent = (value: number | string, total: number | string) => {
    const numberValue = Number(value);
    const numberTotal = Number(total);
    return Math.round((numberValue / numberTotal) * 100);
};
