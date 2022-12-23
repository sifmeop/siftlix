import { useEffect, useState } from 'react'

export const useDebounce = (value: string): string => {
  const [debounced, setDebounced] = useState<string>(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), 1000)
    return () => clearTimeout(handler)
  }, [value])

  return debounced
}
