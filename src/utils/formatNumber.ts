import { removeCommas } from './removeCommas';

export const formatNumber = (numberString: string) => {
    if (numberString === '') return '';

    const number = Number(removeCommas(numberString));

    const formatter = new Intl.NumberFormat('he-IL', {
        style: 'decimal',
    });

    return formatter.format(number);
};
