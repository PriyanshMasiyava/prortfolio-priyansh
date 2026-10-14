import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../lib/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={!isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 rounded-lg border border-theme text-theme-muted
                 hover:text-violet-400 hover:border-violet-500/50
                 transition-all duration-200 focus:outline-none
                 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  )
}
