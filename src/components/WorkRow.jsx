import { useEffect, useState } from 'react'

/**
 * A row in the Work timeline. Rows with a `detail` block are clickable and open
 * the overlay from the design; rows without one render as plain, inert markup.
 */
export default function WorkRow({ job, last = false }) {
  const [open, setOpen] = useState(false)
  const hasDetail = Boolean(job.detail)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    // don't let the page scroll behind the overlay
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  const inner = (
    <>
      <div className="years">{job.years}</div>
      <div className="rail">
        <i />
        <div className="dot" />
      </div>
      {job.logo && (
        <img className="logo" src={job.logo} alt="" width="28" height="28" aria-hidden="true" />
      )}
      <div className="what">
        <div className="role">
          <span>{job.role}</span>
          {/* only rows with detail are clickable, so they need to say so */}
          {hasDetail && (
            <span className="more" aria-hidden="true">
              +
            </span>
          )}
        </div>
        <div className="org">{job.org}</div>
      </div>
    </>
  )

  const cls = ['row', job.current && 'current', last && 'last'].filter(Boolean).join(' ')

  return (
    <>
      {hasDetail ? (
        <button
          type="button"
          className={cls}
          aria-label={`${job.role}, ${job.org} — show details`}
          onClick={() => setOpen(true)}
        >
          {inner}
        </button>
      ) : (
        <div className={cls}>{inner}</div>
      )}

      {open && (
        <div
          className="overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${job.role}, ${job.org}`}
          onClick={() => setOpen(false)}
        >
          <div className="panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-head">
              <div className="panel-id">
                {job.logo && (
                  <img className="panel-logo" src={job.logo} alt="" width="34" height="34" aria-hidden="true" />
                )}
                <div className="panel-role">{job.role}</div>
                <div className="org">{job.org}</div>
                {job.years && <div className="org">{job.years}</div>}
              </div>
              <button
                type="button"
                className="panel-close"
                aria-label="Close"
                onClick={() => setOpen(false)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
                </svg>
              </button>
            </div>

            {job.detail.summary && <p className="panel-summary">{job.detail.summary}</p>}

            {job.detail.projects?.length > 0 && (
              <div className="panel-related">
                <div className="panel-related-label">Related posts</div>
                <ul className="panel-related-list">
                  {job.detail.projects.map((pr) => (
                    <li key={pr.name}>
                      <a href={pr.href}>
                        <span>{pr.name}</span>
                        {pr.note && <span className="note">{pr.note}</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
