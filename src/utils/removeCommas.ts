/**
 * Удаляет запятые из строки.
 *
 * @param str Строка, из которой необходимо удалить запятые.
 * @returns Строка без запятых.
 */
export const removeCommas = (str: string) => {
    return str.replace(/,/g, '');
};
