import { LogSettingsOptions } from '../types'

// Contests imports
import master from './definitions/master'
import NEAF from './definitions/NEAF'
import DX from './definitions/DX'

type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
}

export type ContestSettings = {
    operator: {
        default: LogSettingsOptions.Operator,
        override: LogSettingsOptions.Operator[],
        exclude: boolean,
        hide: boolean
    },
    band: {
        default: LogSettingsOptions.Band,
        override: LogSettingsOptions.Band[],
        exclude: boolean,
        hide: boolean
    },
    power: {
        default: LogSettingsOptions.Power,
        override: LogSettingsOptions.Power[],
        exclude: boolean,
        hide: boolean
    },
    mode: {
        default: LogSettingsOptions.Mode,
        override: LogSettingsOptions.Mode[],
        exclude: boolean,
        hide: boolean
    },
    overlay: {
        default: LogSettingsOptions.Overlay,
        override: LogSettingsOptions.Overlay[],
        exclude: boolean,
        hide: boolean
    },
    stationCategory: {
        default: LogSettingsOptions.StationCategory,
        override: LogSettingsOptions.StationCategory[],
        exclude: boolean,
        hide: boolean
    }
    assistedCategory: {
        default: LogSettingsOptions.AssistedCategory,
        override: LogSettingsOptions.AssistedCategory[],
        exclude: boolean,
        hide: boolean
    }
    timeCategory: {
        default: LogSettingsOptions.TimeCategory,
        override: LogSettingsOptions.TimeCategory[],
        exclude: boolean,
        hide: boolean
    }
    sentExchange: {
    }
    operators: {
    }
    soapbox: {
    }
}

export type ContestCustomEntry = {
  regex: string | RegExp,
  inputRegex: string | RegExp,
  allowSpace: boolean,
  required: boolean,
  label: string,
  exclude: boolean,
  hide: true,
  size: number
}

export type ContestEntry = {
        call: {
          name: string,
          regex?: string | RegExp,
          inputRegex?: string | RegExp,
        },
        rcvdRst: {
          name: string,
          regex?: string | RegExp,
          inputRegex?: string | RegExp,
          skip: boolean,
          hide: boolean
        },
        sentRst: {
          name: string,
          regex?: string | RegExp,
          inputRegex?: string | RegExp,
          skip: boolean,
          hide: boolean
        },
        name: {
          name: string,
          regex?: string | RegExp,
          inputRegex?: string | RegExp,
          required: boolean,
          skip: boolean,
          hide: boolean
        },
        rcvdSerial: {
          name: string,
          regex?: string | RegExp,
          inputRegex?: string | RegExp,
          required: boolean,
          skip: boolean,
          hide: boolean
        },
        sentSerial: {
          name: string,
          regex?: string | RegExp,
          inputRegex?: string | RegExp,
          required: boolean,
          skip: boolean,
          hide: boolean
        },
        rcvdExchange: {
          name: string,
          regex?: string | RegExp,
          inputRegex?: string | RegExp,
          required: boolean,
          skip: boolean,
          hide: boolean
        },
        sentExchange: {
          name: string,
          regex?: string | RegExp,
          inputRegex?: string | RegExp,
          required: boolean,
          skip: boolean,
          hide: boolean
        },
        power: {
          name: string,
          regex?: string | RegExp,
          inputRegex?: string | RegExp,
          required: boolean,
          skip: boolean,
          hide: boolean
        },
        reference: {
          name: string,
          regex?: string | RegExp,
          inputRegex?: string | RegExp,
          required: boolean,
          skip: boolean,
          hide: boolean
        },
        gridsquare: {
          name: string,
          regex?: string | RegExp,
          inputRegex?: string | RegExp,
          required: boolean,
          skip: boolean,
          hide: boolean
        },
        comment: {
          name: string,
          regex?: string | RegExp,
          inputRegex?: string | RegExp,
          required: boolean,
          skip: boolean,
          hide: boolean
        }
}

export type FinalContestEntry = ContestEntry & {
  [key: string]: ContestCustomEntry
}

export type ContestRules = {
    dupe: boolean | 'band' | 'day' | 'mode'
}

export type MasterContest = {
    name: string,
    settings: ContestSettings,
    entry: ContestEntry,
    rules: ContestRules
}

export type Contest = {
    name: string,
    settings: DeepPartial<ContestSettings>,
    entry: DeepPartial<ContestEntry>,
    rules: DeepPartial<ContestRules>
}

export type Contests = {
  DX: Contest,
  NEAF: Contest,
 }

export type ContestsKey = keyof Contests

export const contests:Contests = {
  DX,
  NEAF
}

export { master }
