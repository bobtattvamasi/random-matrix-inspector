import {
    generateMatrix,
    findGlobalMin,
    findMinPositive,
    countReplacements
} from './utils.js';


// === ПАРСИНГ ПАРАМЕТРОВ ИЗ КОМАНДНОЙ СТРОКИ ===
const args = process.argv.slice(2);
// Ожидаем: node src/index.js [size] [min] [max] [cellWidth]
// Например: node src/index.js 10 -100 100 5

const [ rawSize, rawMin, rawMax, rawCellWidth ] = args;
const SIZE       = Number(rawSize)     || 10;
const MIN        = Number(rawMin)      || -100;
const MAX        = Number(rawMax)      || 100;
const CELL_WIDTH = Number(rawCellWidth) || 5;

// ANSI-коды
const RESET  = '\x1b[0m';
const RED    = '\x1b[31m';
const GREEN  = '\x1b[32m';
const CYAN   = '\x1b[36m';
const BOLD   = '\x1b[1m';

// Генерируем и анализируем
const mat = generateMatrix(SIZE, SIZE, MIN, MAX);
const { min: minValue, rowIndex: minRow } = findGlobalMin(mat);

// Собираем шапку
let header = 'Row'.padEnd(CELL_WIDTH);
for (let j = 0; j < SIZE; j++) {
    header += String(j).padStart(CELL_WIDTH);
}
header += ' | Min+'.padStart(8) + 'Repl'.padStart(6);

// Рисуем рамку
const totalWidth = header.length + 2;
console.log('┌' + '─'.repeat(totalWidth) + '┐');
console.log('│ ' + BOLD + CYAN + header + RESET + ' │');
console.log('├' + '─'.repeat(totalWidth) + '┤');

// Строки таблицы
mat.forEach((row, i) => {
    const mp = findMinPositive(row);
    const rp = countReplacements(row);
    const mark = i === minRow ? '*' : ' ';
    let line = `${mark}${String(i).padEnd(4)}`;

    row.forEach(val => {
        let cell = String(val).padStart(CELL_WIDTH);
        if (i === minRow && val === minValue)      cell = RED + cell + RESET;
        else if (val === mp)                        cell = GREEN + cell + RESET;
        line += cell;
    });

    line += ' | ' + (mp === null ? '—'.padStart(CELL_WIDTH) : String(mp).padStart(CELL_WIDTH));
    line += String(rp).padStart(6);
    console.log('│ ' + line + ' │');
});

// Нижняя граница
console.log('└' + '─'.repeat(totalWidth) + '┘');

// Легенда
console.log('\n' + BOLD + 'Легенда:' + RESET);
console.log(`* — строка с глобальным минимумом`);
console.log(`${RED}■${RESET} — глобальный минимум (${RED}${minValue}${RESET})`);
console.log(`${GREEN}■${RESET} — минимальные положительные в строках`);
console.log(`${CYAN}Min+${RESET} — колонка минимальных положительных в строке`);
console.log(`${CYAN}Repl${RESET} — колонка количеств замен для «не 3 подряд»`);

