// TrajectoryTurn: sticky Turn header plus the padded Message/Step body.

import type { ReactNode } from 'react'
import type { TranslateNS } from '@deepseek-ai/dsh-client-ui-slots'
import type { NS } from './locales.ts'
import { TrajectoryTurnHeader } from './TrajectoryTurnHeader.tsx'
import css from './TrajectoryTurn.module.css'

export interface TrajectoryTurnProps {
  /** 1-based turn index for the sticky header. */
  turn: number
  /** Message / Step headers and TrajectoryCell rows. */
  children?: ReactNode
  /** Translate a turn-header dictionary key. */
  t: TranslateNS<typeof NS>
}

/**
 * Render one turn section (sticky header + body).
 * @param props - turn index and body children.
 * @returns the turn section element.
 */
export function TrajectoryTurn({ turn, children, t }: TrajectoryTurnProps) {
  return (
    <section className={css.root} data-turn={turn}>
      <TrajectoryTurnHeader turn={turn} t={t} />
      <div className={css.body}>{children}</div>
    </section>
  )
}
