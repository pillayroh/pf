import { about, education, experiences } from '../data/content'
import { Reveal } from './Reveal'

function Label({ children }: { children: string }) {
  return (
    <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
      {children}
    </p>
  )
}

export function AboutExperience() {
  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        {/* centered header */}
        <Reveal className="text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-line/80" aria-hidden="true" />
            <span className="font-mono text-xs tracking-[0.28em] text-primary">
              THE PATH
            </span>
            <span className="h-px w-10 bg-line/80" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
            Built close to the customer.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          {/* LEFT: About me */}
          <div>
            <Label>About me</Label>
            <p
              className="text-[15px] leading-relaxed sm:text-base"
              style={{ color: '#ffffff' }}
            >
              {about.short}
            </p>
          </div>

          {/* RIGHT: Education (first) then Experience */}
          <div className="space-y-10">
            <Reveal>
              <Label>Education</Label>
              <h3 className="text-lg font-semibold text-ink">
                {education.university}
              </h3>
              <p className="mt-1 text-[15px] text-secondary">
                {education.degree}
              </p>
              <p className="mt-1 font-mono text-xs text-faint">
                {education.graduation}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Focus: {education.focus.join(' · ')}
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <Label>Experience</Label>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="text-lg font-semibold text-ink">
                        {exp.role}
                      </h3>
                      <span className="font-mono text-xs text-faint">
                        {exp.dates}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[15px] text-muted">
                      {exp.company}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
