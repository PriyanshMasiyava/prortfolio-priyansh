import { Link } from 'react-router-dom'
import { Download } from 'lucide-react'

interface ResumeButtonProps {
  variant?: 'primary' | 'secondary'
  className?: string
}

/**
 * ResumeButton — links to the /resume print page since no PDF file exists in
 * the repository. When a real PDF is added to public/resume/, swap the `to`
 * prop for an <a href download> pointing to the PDF path instead.
 */
export default function ResumeButton({
  variant = 'secondary',
  className = '',
}: ResumeButtonProps) {
  return (
    <Link
      to="/resume"
      className={`${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${className}`}
      aria-label="View and print resume"
    >
      <Download size={16} />
      View Resume
    </Link>
  )
}
