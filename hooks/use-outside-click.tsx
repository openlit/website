import React, { useEffect } from 'react'
/* eslint-disable @typescript-eslint/no-explicit-any */
export const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, callback: any) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      callback(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, callback])
}
/* eslint-enable @typescript-eslint/no-explicit-any */
