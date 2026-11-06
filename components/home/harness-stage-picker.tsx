'use client'

import { HarnessCanvas, useHarnessSelection } from './harness-canvas'

export default function HarnessStagePicker() {
  const { activeLabel, toggle } = useHarnessSelection('Instrument')
  return <HarnessCanvas activeLabel={activeLabel} onToggle={toggle} />
}
