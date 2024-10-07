export type Generation = {
    label: string,
    first: number,
    last: number,
}

export const POKEMON_GENERATIONS: Generation[] = [
        {
            label: "Gen1",
            first: 1,
            last: 151,
        },
        {
            label: "Gen2",
            first: 152,
            last: 251,
        },
        {
            label: "Gen3",
            first: 252,
            last: 386,
        },
        {
            label: "Gen4",
            first: 387,
            last: 493,
        },
        {
            label: "Gen5",
            first: 494,
            last: 649,
        },
        {
            label: "Gen6",
            first: 650,
            last: 721,
        },
        {
            label: "Gen7",
            first: 722,
            last: 809,
        },
        {
            label: "Gen8",
            first: 810,
            last: 905,
        },
        {
            label: "Gen9",
            first: 906,
            last: 1015,
        }

    ];