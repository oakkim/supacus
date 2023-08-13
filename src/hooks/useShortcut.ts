import { useCallback, useEffect, useRef, useState } from "react"

type Shortcut = {
  keys: Array<string>,
  callback: (e: KeyboardEvent) => void,
  disabled?: boolean
}

export default function useShortcut<T extends HTMLInputElement|HTMLTextAreaElement>(shortcuts: Array<Shortcut>) {
  const [shortcutDict, setKeymapDictionary] = useState<Record<string, Shortcut>>({})
  const [keyStack, setKeyStack] = useState<Array<string>>([])

  const ref = useRef<T>(null)

  useEffect(() => {
    const newShorcutDict: Record<string, Shortcut> = {}
    shortcuts.filter(keymap => !keymap.disabled).forEach(item => {
      const key = item.keys.join(",")
      newShorcutDict[key] = item
    })

    const keySet = new Set<string>()
    const newKeys = Object.keys(newShorcutDict)
    const oldKeys = Object.keys(shortcutDict)
    newKeys.concat(oldKeys).forEach(key => keySet.add(key))

    if (keySet.size != oldKeys.length) {
      setKeymapDictionary(newShorcutDict)
      return
    }

    for (const key of keySet) {
      const oldCallback = shortcutDict[key]?.callback
      const newCallback = newShorcutDict[key]?.callback
      if (oldCallback != newCallback || oldCallback.toString() !== newCallback.toString()) {
        setKeymapDictionary(newShorcutDict)
        return
      }
    }
  }, [shortcuts, shortcutDict])

  const handleKeyDown = useCallback((e: Event) => {
    const event = e as KeyboardEvent
    if (!(event.ctrlKey || event.altKey || event.metaKey || event.shiftKey || event.key == 'Enter')) {
      setKeyStack([])
      return
    }

    const newKeyStack = event.key == 'Ctrl' || event.key == 'Alt' || event.key == 'Shift' ? [event.key] : [...keyStack, event.key]
    if (!event.repeat && (keyStack.length === 0 || event.key !== keyStack[keyStack.length - 1])) {
      setKeyStack(newKeyStack)
      shortcutDict[newKeyStack.join(",")]?.callback(event)
    } else {
      shortcutDict[keyStack.join(",")]?.callback(event)
    }
  }, [keyStack, shortcutDict])

  const handleKeyUp = useCallback((e: Event) => {
    const event = e as KeyboardEvent
    if (!(event.ctrlKey || event.altKey || event.metaKey || event.shiftKey)) {
      setKeyStack([])
      return
    }
    keyStack.pop()
    setKeyStack([...keyStack])
  }, [keyStack])

  useEffect(() => {
    if (ref.current != null) {
      ref.current.addEventListener('keydown', handleKeyDown, true)
      ref.current.addEventListener('keyup', handleKeyUp, true)
    }

    return () => {
      if (ref.current != null) {
        ref.current.removeEventListener('keydown', handleKeyDown, true)
        ref.current.removeEventListener('keyup', handleKeyUp, true)
      }
    }
  }, [ref, keyStack, handleKeyDown, handleKeyUp])

  return ref
}