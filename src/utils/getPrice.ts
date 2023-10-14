/**
 * Форматирует число в валютный формат ₪
 *
 * @param  price - Цена в числовом формате
 * @returns  Отформатированная цена в виде строки '1,234  ₪'
 */
export const getPrice = (price: number | string) => {
    const formatter = new Intl.NumberFormat('he-IL', {
        style: 'currency',
        currency: 'ILS',
        minimumFractionDigits: 0,
    });

    const formattedPrice = formatter.format(+price);

    return `${formattedPrice.slice(0, -1)} ${formattedPrice.slice(-1)}`;
};
