export const getPrice = (price: number) => {
    const formatter = new Intl.NumberFormat('he-IL', {
        style: 'currency',
        currency: 'ILS',
        minimumFractionDigits: 0,
    });

    const formattedPrice = formatter.format(price);

    return `${formattedPrice.slice(0, -1)} ${formattedPrice.slice(-1)}`;
};
