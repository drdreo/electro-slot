export function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateReel(reelNum) {
    let totalHeight = 0;
    const maxHeight = 8;

    const reel = [];
    while (totalHeight < maxHeight) {
        let symbolHeight = getRandom(1, 4);
        if (totalHeight + symbolHeight > maxHeight) {
            symbolHeight = maxHeight - totalHeight;
        }

        // prevent wilds in first reel due to hit detection problem
        const value = reelNum === 0 ? getRandom(1, 8) : getRandom(1, 9);
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
        matrix.push(generateReel(i));
    }

    return matrix;
}

export function prettyPrintMatrix(matrix) {
    console.table(matrix);
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

    const hits = [];
    for (let symbol of matrix[0]) {
        // ignore null symbols or already hit symbols
        if (symbol && (hits.every(hit => !hit.hasAlreadyHit(symbol.value)) || symbol.value === 9)) {
            let hit = new Hit();
            for (let i = 0; i < matrix.length; i++) {
                const reel = matrix[i];
                let connected = false;
                for (let sym of reel) {
                    //  WILDS are value 9
                    // 1. check if current symbol is not null
                    // 2. hit same symbol
                    // 3. if current symbol is wild -> hit
                    if (sym && (symbol.value === sym.value || sym.value === 9)) {
                        hit.addSymbol({...sym, position: {r: i}});
                        connected = true;
                    }
                }

                // if the symbol didnt connect, we can stop checking
                if (!connected) {
                    break;
                }
                // if third reel connected
                if (i === 2 && connected) {
                    hit.isHit = true;
                }
            }
            if (hit.isHit) {
                hits.push(hit);
            }
        }
    }
    return hits;
}

class Hit {
    symbols = [];
    value;
    isHit = false;

    addSymbol(symbol) {
        if (symbol.value !== 9) {
            this.value = symbol.value;
        }
        this.symbols.push(symbol);
    }

    hasAlreadyHit(value) {
        return this.symbols.some(sym => sym.value === value);
    }
}
