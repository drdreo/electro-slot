// test("detects a hit", () => {
//     const hits = calculateHit(mockData);
//     hits.map(hit => console.log(hit.symbols));
//     expect(hits.length).toEqual(2);
// });

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
