export function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateReel(reelNum, rig) {
    let totalHeight = 0;
    const maxHeight = 8;

    const reel = [];
    while (totalHeight < maxHeight) {
        let symbolHeight = getRandom(1, rig ? 3 : 6);
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

export function generateMatrix(rig) {
    const matrix = [];
    for (let i = 0; i < 6; i++) {
        matrix.push(generateReel(i, rig));
    }
    return matrix;
}

let shitSpins = 0;

export function generateRiggedMatrix() {
    let matrix = generateMatrix();
    let megaways = calculateMegaways(matrix);
    const hit = calculateHit(matrix);

    if (hit > 10) {
        shitSpins = 0;
    }
    // little help
    if (megaways < 1000) {
        shitSpins++;
        if (shitSpins >= 50) {
            matrix = generateMatrix(true);
            shitSpins = 0;
        }
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

export function calculateWin(hits) {
    let totalWin = 0;

    for (let hit of hits) {
        let win = 1;

        const groupedSymbols = groupBy(hit.symbols, sym => sym.position.r);
        const symbolValue = getValueOfSymbol(hit.symbols[0].value, groupedSymbols.size);

        groupedSymbols.forEach(symbols => {
            win *= symbols.length;
        });

        win *= symbolValue;
        totalWin += win;
    }

    return totalWin ? round(totalWin, 2) : null;
}


function getValueOfSymbol(symbol, connectedReels) {

    const og_payTable = {
        1: [0.1, 0.2, 0.3, 0.4],
        2: [0.1, 0.2, 0.3, 0.4],
        3: [0.1, 0.2, 0.3, 0.4],
        4: [0.2, 0.4, 0.6, 1],
        5: [0.2, 0.4, 0.6, 1],
        6: [0.2, 0.4, 0.6, 1],
        7: [0.5, 1, 2, 4],
        8: [0.5, 1, 2.5, 5]
    };

    const rig_payTable = {
        1: [0.05, 0.1, 0.2, 0.3],
        2: [0.05, 0.1, 0.2, 0.3],
        3: [0.05, 0.1, 0.2, 0.3],
        4: [0.1, 0.2, 0.3, 0.4],
        5: [0.1, 0.2, 0.3, 0.4],
        6: [0.1, 0.2, 0.3, 0.4],
        7: [0.3, 0.4, 0.5, 0.5],
        8: [0.3, 0.4, 0.5, 0.5]
    };

    return og_payTable[symbol][connectedReels - 3];
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


function round(num, X) {
    return +(Math.round(num + "e+" + X) + "e-" + X);
}

/**
 * @description
 * Takes an Array<V>, and a grouping function,
 * and returns a Map of the array grouped by the grouping function.
 *
 * @param list An array of type V.
 * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.
 *                  K is generally intended to be a property key of V.
 *
 * @returns Map of the array grouped by the grouping function.
 */
//export function groupBy<K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>> {
//    const map = new Map<K, Array<V>>();
function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}
