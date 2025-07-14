/**
 * Генерирует матрицу size×size со случайными целыми в [min..max]
 * @param {number} rows
 * @param {number} cols
 * @param {number} min
 * @param {number} max
 * @returns {number[][]}
 */
export function generateMatrix(rows, cols, min, max) {
    const M = [];
    const span = max - min + 1;
    for (let i=0; i<rows; i++) {
        const row = [];
        for (let j=0; j<cols; j++) {
            row.push(Math.floor(Math.random() * span) + min);
        }
        M.push(row);
    }
    return M;
}

/**
 * Находит глобальный минимум в матрице и возвращает объект { value, rowIndex }
 * @param {number[][]} matrix
 */
export function findGlobalMin(matrix) {
    let min = Infinity;
    let rowIndex = -1;
    matrix.forEach((row, i) => {
        row.forEach(val => {
            if (val < min) {
                min = val;
                rowIndex = i;
            }
        });
    });
    return { min, rowIndex };
}

/**
 * Находит наименьшее положительное число в массиве.
 * Если положительных нет — возвращает null.
 * @param {number[]} row
 * @returns {number|null}
 */
export function findMinPositive(row) {
    const min = row.reduce(
        (acc, x) => x > 0 ? Math.min(acc, x) : acc,
        Infinity);
    return min === Infinity ? null : min;
}

/**
 * Считает минимальное кол-во замен, чтобы не было 3 подряд + или − чисел.
 * Ноль считается «разрывом цепочки».
 * На каждую третью подряд встречу «знаки» добавляем 1 замену и сбрасываем цепь.
 * @param {number[]} row
 * @returns {number}
 */
export function countReplacements(row) {
    let repl = 0; // счётчик замен
    let runSign = 0; // знак текущей цепочки: +1, −1 или 0 (нет цепочки)
    let runLen = 0; // длина текущей цепочки

    for (const x of row) {
        // 1) Определяем текущий «знак» элемента
        const sign = x > 0 ? 1 : x < 0 ? -1 : 0;
        // 2) Сброс или продолжение цепочки
        if (sign === 0 || sign !== runSign) {
            // если пришёл ноль или другой знак — начинаем новую цепочку
            runSign = sign;
            runLen = sign === 0 ? 0 : 1;
        } else {
            // увеличиваем длину той же цепочки
            runLen++;
        }

        // 3) Как только цепочка достигает длины 3 — считаем замену
        if (runSign !== 0 && runLen === 3) {
            // меняем этот третий элемент
            repl++;
            // после замены — разрываем цепочку
            runSign = 0;
            runLen = 0;
        }
    }

    return repl;
}