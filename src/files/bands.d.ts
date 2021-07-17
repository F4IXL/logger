interface NamedRange {
    [index: number]: [string, number, number]
}

export interface Band {
    name: string,
    range: [number, number],
    sections: NamedRange,
    modes: NamedRange
}

export interface Bands {
    [id: number]: Band
}

declare const band:Bands

export default band
