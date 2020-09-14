import {calculateHit, calculateWin, generateMatrix} from "./utils";

test("detects a hit", () => {
    const hits = calculateHit(mockData);
    hits.map(hit => console.log(hit.symbols));
    expect(hits.length).toEqual(2);
});


test("should be balanced", () => {

    let totalWin = 0;
    let biggestWin = 0;
    let amountSpins = 100000;
    let amountBigHits = 0;

    for (let spins = 0; spins < amountSpins; spins++) {
        const matrix = generateMatrix();
        const hits = calculateHit(matrix);
        const win = calculateWin(hits) || 0;
        if (biggestWin < win) {
            biggestWin = win;
        }

        if (win > 100) {
            amountBigHits++;
        }
        totalWin += win;
    }

    const effectiveWin = totalWin - amountSpins;
    console.log({biggestWin});
    console.log({amountBigHits});
    console.log({effectiveWin});
    console.log({rtp: 100 * totalWin / amountSpins});
    expect(effectiveWin).toBeLessThanOrEqual(0);
});
export const mockData = [
    [
        {value: 1, height: 2},
        null,
        {value: 1, height: 1},
        {value: 1, height: 1},
        {value: 2, height: 1},
        {value: 2, height: 1},
        {value: 2, height: 1},
        {value: 3, height: 1}
    ],
    [
        {value: 3, height: 1},
        {value: 1, height: 1},
        {value: 1, height: 1},
        {value: 1, height: 1},
        {value: 1, height: 1},
        {value: 1, height: 1},
        {value: 1, height: 1},
        {value: 1, height: 1}],
    [
        {value: 3, height: 4},
        null,
        null,
        null,
        {value: 1, height: 4},
        null,
        null,
        null
    ],
    [
        {value: 1, height: 8},
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ],
    [
        {value: 3, height: 4},
        null,
        null,
        null,
        {value: 1, height: 4},
        null,
        null,
        null
    ],
    [
        {value: 1, height: 4},
        null,
        null,
        null,
        {value: 1, height: 4},
        null,
        null,
        null
    ]
];

const mockData2 = [
    [
        {
            "value": 5,
            "height": 1
        },
        {
            "value": 9,
            "height": 3
        },
        null,
        null,
        {
            "value": 1,
            "height": 3
        },
        null,
        null,
        {
            "value": 6,
            "height": 1
        }
    ],
    [
        {
            "value": 8,
            "height": 2
        },
        null,
        {
            "value": 3,
            "height": 3
        },
        null,
        null,
        {
            "value": 6,
            "height": 3
        },
        null,
        null
    ],
    [
        {
            "value": 7,
            "height": 1
        },
        {
            "value": 5,
            "height": 2
        },
        null,
        {
            "value": 3,
            "height": 3
        },
        null,
        null,
        {
            "value": 1,
            "height": 1
        },
        {
            "value": 4,
            "height": 1
        }
    ],
    [
        {
            "value": 5,
            "height": 1
        },
        {
            "value": 2,
            "height": 3
        },
        null,
        null,
        {
            "value": 4,
            "height": 2
        },
        null,
        {
            "value": 4,
            "height": 2
        },
        null
    ],
    [
        {
            "value": 6,
            "height": 3
        },
        null,
        null,
        {
            "value": 3,
            "height": 1
        },
        {
            "value": 7,
            "height": 1
        },
        {
            "value": 5,
            "height": 2
        },
        null,
        {
            "value": 3,
            "height": 1
        }
    ],
    [
        {
            "value": 4,
            "height": 1
        },
        {
            "value": 6,
            "height": 2
        },
        null,
        {
            "value": 9,
            "height": 2
        },
        null,
        {
            "value": 2,
            "height": 3
        },
        null,
        null
    ]
];
