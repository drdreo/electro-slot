export function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateReel() {
    let totalHeight = 0;
    const maxHeight = 8;

    const reel = [];
    while (totalHeight < maxHeight) {
        let symbolHeight = getRandom(1, 3);
        if (totalHeight + symbolHeight > maxHeight) {
            symbolHeight = maxHeight - totalHeight;
        }
        const value = getRandom(1, 9);
        reel.push({value, height: symbolHeight});

        // insert null values for height
        for (let i = 0; i < symbolHeight - 1; i++) {
            reel.push(null);
        }
        totalHeight += symbolHeight;
    }

    return reel;
}

export function generateMatrix() {
    const matrix = [];
    for (let i = 0; i < 6; i++) {
        matrix.push(generateReel());
    }

    return matrix;
}

export function calculateMegaways(matrix) {
    return matrix.reduce((prev, cur) => {
        return prev * cur.filter(el => el).length;
    }, 1);
}

export function getCountSymbolsInReel(reel) {
    return reel.filter(el => el).length;
}

export function calculateHit(matrix) {

    for (let symbol of matrix[0]) {
        let reel = 1;

        while (symbol && matrix[reel] && isSymbolInReel(symbol.value, matrix[reel])) {
            matrix[reel].map(sym => {
                if (sym && sym.value === symbol.value) {
                    sym.hit = true;
                }
                return sym;
            });
            reel++;
        }
    }

    return matrix;
}

function isSymbolInReel(value, reel) {
    return reel.filter(el => el).some(symbol => symbol.value === value);
}
