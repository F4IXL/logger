import { ContestsKey } from './contests'

export type VfoMode = 'USB' | 'LSB' | 'CW' | 'AM' | 'FM' | 'DIGI'

export interface VfoState {
    frequency: number,
    mode: VfoMode
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace LogSettingsOptions {
    export type Operator = 'SINGLE-OP' | 'MULTI-OP' | 'CHECKLOG'
    export type Operators = string
    export type Mode = 'CW' | 'DIGI' | 'FM' | 'RTTY' | 'SSB' | 'MIXED'
    export type Band = 'ALL' | '160M' | '80M' | '40M' | '20M' | '15M' | '10M' | 'LIMITED' | 'CHECKLOG'
    export type Power = 'HIGH' | 'LOW' | 'QRP'
    export type Overlay = 'N/A' | 'CLASSIC' | 'ROOKIE' | 'TB-WIRES' | 'NOVICE-TECH' | 'OVER-50'
    export type StationCategory = 'FIXED' | 'MOBILE' | 'PORTABLE' | 'ROVER' | 'EXPEDITION' | 'HQ' | 'SCHOOL'
    export type AssistedCategory = 'ASSISTED' | 'NON-ASSISTED'
    export type TimeCategory = 'N/A' | '6-HOURS' | '12-HOURS' | '24-HOURS'
}

export type Band = '20M' | '40M' | '80M' | '11M' | '10M'
export interface Datetime {
    year: number
    month: number
    day: number
    time: number
}

export interface VFO {
    frequency: string
    mode: VfoMode
}

export interface ExchangedData {
    call: string
    rst: number
    exchange: string
}

export interface ReceivedData extends ExchangedData {
    comment?: string
    name?: string
}
export type SentData = ExchangedData

export interface Qso {
    id?: IDBValidKey, // ID is only existing when retrived from database
    logId: number,
    datetime: Datetime
    vfo: VFO,
    received: ReceivedData,
    sent: SentData
}

export type QsoList = Array<Qso>

export interface UserSettings {
    currentLog: IDBValidKey
}

export interface LogSettings {
    band: LogSettingsOptions.Band
    mode: LogSettingsOptions.Mode
    operator: LogSettingsOptions.Operator
    operators: LogSettingsOptions.Operators
    power: LogSettingsOptions.Power
    stationCategory: LogSettingsOptions.StationCategory
    assistedCategory: LogSettingsOptions.AssistedCategory
    timeCategory: LogSettingsOptions.TimeCategory
}

export interface LogStation {
    call: string,
    name: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    grid: string,
    cq: number,
    itu: number,
    licence: number,
    latitude: number,
    longitude: number,
    tx: string,
    power: string,
    antenna: string,
    antennaHeight: string,
    arrlSection: string,
    email: string
}

export interface Log {
    id?: IDBValidKey, // ID is only existing when retrived from database
    name: string,
    contest: ContestsKey,
    settings: LogSettings,
    station: LogStation
}

export type LogList = Log[]
