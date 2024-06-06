export type StyleY = 't' | 'm' | 'b'
export type StyleX = 'l' | 'm' | 'r'
export type StickType = 'tl' | 'tm' | 'tr' | 'mr' | 'br' | 'bm' | 'bl' | 'ml'

export type LimitRange = { min: number | null, max: number | null }
export type Limit = {
    left: LimitRange,
    right: LimitRange,
    top: LimitRange,
    bottom: LimitRange,
}