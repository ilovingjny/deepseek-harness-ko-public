// TrajectoryTurnHeader: sticky per-turn bar with Input/Output/Think/Time labels.

import type { TranslateNS } from '@deepseek-ai/dsh-client-ui-slots'
import type { NS } from './locales.ts'
import css from './TrajectoryTurnHeader.module.css'

const COLUMN_LABEL_KEYS = ['turn.input', 'turn.output', 'turn.think', 'turn.time'] as const

export interface TrajectoryTurnHeaderProps {
  /** 1-based turn index shown as `Turn N`. */
  turn: number
  /** Translate a turn-header dictionary key. */
  t: TranslateNS<typeof NS>
}

/**
 * Render the sticky turn header row.
 * @param props.turn - turn index.
 * @param props.t - turn-header translate function.
 * @returns the sticky header element.
 */
export function TrajectoryTurnHeader({ turn, t }: TrajectoryTurnHeaderProps) {
  return (
    <div className={css.root}>
      <div className={css.inner}>
        <span className={css.title}>{t('turn.title', { turn })}</span>
        <div className={css.columns} aria-hidden="true">
          {COLUMN_LABEL_KEYS.map(key => (
            <span key={key} className={css.column}>{t(key)}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
