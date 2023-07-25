import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { useState, useCallback } from 'react'
import type { ChangeEvent } from 'react'

export interface EyeSwapProps {
  className?: string
  iconClassName?: string
  onChange?: (checked: boolean) => void
}

function EyeSwap(props: EyeSwapProps) {
  const { className, onChange } = props
  const [checked, setChecked] = useState(false)

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setChecked(checked)
    onChange && onChange(checked)
  }, [])

  return (
    <label className={`daisy-swap ${className}`}>
      <input type="checkbox" checked={checked} onChange={handleChange} />

      <EyeIcon className="daisy-swap-on h-6 w-6" />
      <EyeSlashIcon className="daisy-swap-off h-6 w-6" />
    </label>
  )
}

export default EyeSwap
