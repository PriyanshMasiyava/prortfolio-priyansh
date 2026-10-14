import { useState, useId } from 'react'
import { Mail, Phone, Send, ExternalLink, CheckCircle2, AlertCircle, Info } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { profile } from '../data/profile'

// ─── Types ─────────────────────────────────────────────────────────────────────

interface FormFields {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

type SubmitState = 'idle' | 'submitting' | 'ready' | 'error'

// ─── Validation ────────────────────────────────────────────────────────────────

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {}

  if (!fields.name.trim()) {
    errors.name = 'Full name is required.'
  }

  if (!fields.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!fields.subject.trim()) {
    errors.subject = 'Subject is required.'
  }

  if (!fields.message.trim()) {
    errors.message = 'Message is required.'
  } else if (fields.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }

  return errors
}

// ─── Helper — build encoded mailto href ──────────────────────────────────────

function buildMailto(fields: FormFields): string {
  const subject = encodeURIComponent(`[Portfolio Contact] ${fields.subject.trim()}`)
  const body = encodeURIComponent(
    `Hi Priyansh,\n\nName: ${fields.name.trim()}\nEmail: ${fields.email.trim()}\n\n${fields.message.trim()}\n`
  )
  return `mailto:${profile.contact.email}?subject=${subject}&body=${body}`
}

// ─── FieldError ───────────────────────────────────────────────────────────────

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5">
      <AlertCircle size={12} className="flex-shrink-0" />
      {message}
    </p>
  )
}

// ─── Contact Info Cards ───────────────────────────────────────────────────────

function ContactInfoCard({
  href,
  icon,
  label,
  value,
  hoverColor,
  iconBg,
  external,
}: {
  href: string
  icon: React.ReactNode
  label: string
  value: string
  hoverColor: string
  iconBg: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`flex items-center gap-4 p-4 bg-theme-card border border-theme rounded-xl
                  hover:border-violet-500/40 transition-all duration-200 group focus:outline-none
                  focus:ring-2 focus:ring-violet-500 focus:ring-offset-2`}
      aria-label={`${label}: ${value}${external ? ' (opens in new tab)' : ''}`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-theme-subtle mb-0.5">{label}</p>
        <p className={`text-sm font-medium text-theme-secondary transition-colors duration-200 truncate ${hoverColor}`}>
          {value}
        </p>
      </div>
      {external && (
        <ExternalLink size={13} className="text-theme-subtle flex-shrink-0 ml-auto" aria-hidden="true" />
      )}
    </a>
  )
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const uid = useId()
  const nameId = `${uid}-name`
  const emailId = `${uid}-email`
  const subjectId = `${uid}-subject`
  const messageId = `${uid}-message`
  const nameErrId = `${uid}-name-err`
  const emailErrId = `${uid}-email-err`
  const subjectErrId = `${uid}-subject-err`
  const messageErrId = `${uid}-message-err`
  const statusId = `${uid}-status`

  const [fields, setFields] = useState<FormFields>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({})
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [mailtoHref, setMailtoHref] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    // Re-validate touched fields live
    if (touched[name as keyof FormFields]) {
      const newErrors = validate({ ...fields, [name]: value })
      setErrors(prev => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }))
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const newErrors = validate(fields)
    setErrors(prev => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Mark all as touched and show all errors
    setTouched({ name: true, email: true, subject: true, message: true })
    const newErrors = validate(fields)
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setSubmitState('error')
      return
    }

    // Build the mailto link and transition to ready state
    setSubmitState('submitting')
    const href = buildMailto(fields)
    setMailtoHref(href)
    setSubmitState('ready')
  }

  function handleReset() {
    setFields({ name: '', email: '', subject: '', message: '' })
    setErrors({})
    setTouched({})
    setSubmitState('idle')
    setMailtoHref('')
  }

  // "ready" state — show the mailto launch button
  if (submitState === 'ready' && mailtoHref) {
    return (
      <div className="space-y-6">
        <div className="p-5 rounded-xl bg-violet-500/10 border border-violet-500/30" role="status" id={statusId}>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={20} className="text-violet-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-theme-primary mb-1">Your message is ready to send</p>
              <p className="text-sm text-theme-secondary leading-relaxed">
                Click the button below to open your email application. Your subject and message
                have been pre-filled — just hit <strong>Send</strong> in your email app to deliver
                the message.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-theme-card border border-theme space-y-1.5 text-sm">
          <div className="flex gap-2">
            <span className="text-theme-subtle w-16 flex-shrink-0">To:</span>
            <span className="text-theme-secondary">{profile.contact.email}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-theme-subtle w-16 flex-shrink-0">From:</span>
            <span className="text-theme-secondary">{fields.name} &lt;{fields.email}&gt;</span>
          </div>
          <div className="flex gap-2">
            <span className="text-theme-subtle w-16 flex-shrink-0">Subject:</span>
            <span className="text-theme-secondary truncate">{fields.subject}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={mailtoHref}
            className="btn-primary flex-1 justify-center"
            aria-label="Open your email application to send this message"
          >
            <Mail size={16} />
            Open Email App to Send
          </a>
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary flex-1 justify-center"
            aria-label="Write a new message"
          >
            Write Another Message
          </button>
        </div>

        <div className="flex items-start gap-2 text-xs text-theme-subtle">
          <Info size={13} className="flex-shrink-0 mt-0.5" />
          <span>
            This portfolio does not have a direct mail server. Your default email application
            will open with the message pre-filled — you need to press Send inside it.
          </span>
        </div>
      </div>
    )
  }

  const inputBase =
    'input-field transition-all duration-200'
  const inputError =
    'border-red-500/60 focus:ring-red-500 focus:border-red-500/60'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="space-y-5"
    >
      {/* Name + Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={nameId} className="block text-sm font-medium text-theme-secondary mb-1.5">
            Full Name <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            value={fields.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Priyansh Masiyava"
            autoComplete="name"
            required
            aria-required="true"
            aria-describedby={errors.name ? nameErrId : undefined}
            aria-invalid={!!errors.name}
            className={`${inputBase} ${errors.name ? inputError : ''}`}
          />
          <FieldError id={nameErrId} message={errors.name} />
        </div>

        <div>
          <label htmlFor={emailId} className="block text-sm font-medium text-theme-secondary mb-1.5">
            Email Address <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            value={fields.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="you@example.com"
            autoComplete="email"
            required
            aria-required="true"
            aria-describedby={errors.email ? emailErrId : undefined}
            aria-invalid={!!errors.email}
            className={`${inputBase} ${errors.email ? inputError : ''}`}
          />
          <FieldError id={emailErrId} message={errors.email} />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor={subjectId} className="block text-sm font-medium text-theme-secondary mb-1.5">
          Subject <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <input
          id={subjectId}
          name="subject"
          type="text"
          value={fields.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Internship opportunity / Project collaboration / Just saying hi"
          required
          aria-required="true"
          aria-describedby={errors.subject ? subjectErrId : undefined}
          aria-invalid={!!errors.subject}
          className={`${inputBase} ${errors.subject ? inputError : ''}`}
        />
        <FieldError id={subjectErrId} message={errors.subject} />
      </div>

      {/* Message */}
      <div>
        <label htmlFor={messageId} className="block text-sm font-medium text-theme-secondary mb-1.5">
          Message <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={5}
          value={fields.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Tell me about the opportunity, project, or question you have in mind..."
          required
          aria-required="true"
          aria-describedby={errors.message ? messageErrId : undefined}
          aria-invalid={!!errors.message}
          className={`${inputBase} resize-none ${errors.message ? inputError : ''}`}
        />
        <div className="flex items-center justify-between mt-1">
          <FieldError id={messageErrId} message={errors.message} />
          <span className="text-xs text-theme-subtle ml-auto">
            {fields.message.length} chars
          </span>
        </div>
      </div>

      {/* Validation summary */}
      {submitState === 'error' && Object.keys(errors).length > 0 && (
        <div
          id={statusId}
          role="alert"
          className="flex items-start gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3"
        >
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          Please fix the errors above before sending.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitState === 'submitting'}
        className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        aria-describedby={statusId}
      >
        <Send size={16} />
        {submitState === 'submitting' ? 'Preparing…' : 'Prepare Message'}
      </button>

      {/* Honest disclaimer */}
      <div className="flex items-start gap-2 text-xs text-theme-subtle">
        <Info size={12} className="flex-shrink-0 mt-0.5" />
        <span>
          Submitting this form will open your email application with the message pre-filled.
          No message is stored or sent automatically — you send it yourself via your email app.
        </span>
      </div>
    </form>
  )
}

// ─── Contact Section ──────────────────────────────────────────────────────────

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-theme-section-alt">
      <div className="section-container">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-2">
            Let's Connect
          </p>
          <h2 className="section-heading text-theme-primary">
            Get In <span className="accent-text">Touch</span>
          </h2>
          <p className="mt-4 text-theme-muted max-w-2xl mx-auto leading-relaxed">
            I'm open to internship opportunities, entry-level roles, freelance projects, and
            collaborations. Whether you're a recruiter, a fellow developer, or someone with an
            interesting idea — feel free to reach out.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* ── Left — Contact info ────────────────────────────────── */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-theme-primary mb-2">Contact Information</h3>
              <p className="text-sm text-theme-muted leading-relaxed">
                Reach me directly via email or phone, or connect on LinkedIn and GitHub.
              </p>
            </div>

            <div className="space-y-3">
              <ContactInfoCard
                href={`mailto:${profile.contact.email}`}
                icon={<Mail size={18} className="text-violet-400" />}
                iconBg="bg-violet-500/15 border border-violet-500/30"
                label="Email"
                value={profile.contact.email}
                hoverColor="group-hover:text-violet-400"
              />
              <ContactInfoCard
                href={`tel:${profile.contact.phone.replace(/\s/g, '')}`}
                icon={<Phone size={18} className="text-violet-400" />}
                iconBg="bg-violet-500/15 border border-violet-500/30"
                label="Phone"
                value={profile.contact.phone}
                hoverColor="group-hover:text-violet-400"
              />
              <ContactInfoCard
                href={profile.contact.linkedin}
                icon={<LinkedinIcon size={18} className="text-teal-400" />}
                iconBg="bg-teal-400/10 border border-teal-400/30"
                label="LinkedIn"
                value="linkedin.com/in/priyansh-masiyava"
                hoverColor="group-hover:text-teal-400"
                external
              />
              <ContactInfoCard
                href={profile.contact.github}
                icon={<GithubIcon size={18} className="text-theme-secondary" />}
                iconBg="bg-theme-card border border-theme"
                label="GitHub"
                value="github.com/PriyanshMasiyava"
                hoverColor="group-hover:text-theme-primary"
                external
              />
            </div>

            {/* Availability note */}
            <div className="flex items-start gap-3 p-4 bg-theme-card border border-teal-400/20 rounded-xl">
              <div className="w-2.5 h-2.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0 animate-pulse" />
              <div>
                <p className="text-sm font-medium text-theme-primary">Available for opportunities</p>
                <p className="text-xs text-theme-muted mt-0.5">
                  Open to internships, entry-level developer roles, and
                  open-source collaborations.
                </p>
              </div>
            </div>
          </div>

          {/* ── Right — Form ───────────────────────────────────────── */}
          <div>
            <h3 className="text-xl font-semibold text-theme-primary mb-2">Send a Message</h3>
            <p className="text-sm text-theme-muted mb-6 leading-relaxed">
              Fill in the form and your email application will open with everything pre-filled —
              just hit Send from there.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
