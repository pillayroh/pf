import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import type { BlogPost } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useSound } from '../hooks/useSound'

interface Props {
  post: BlogPost
  index?: number
}

/**
 * A blog post card that links out to the original post.
 * On hover the card pops up (scales and lifts) and the cover image zooms in.
 */
export function BlogPostCard({ post, index = 0 }: Props) {
  const reduced = usePrefersReducedMotion()
  const { play } = useSound()

  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${post.title} - read on ${post.platform} (opens in a new tab)`}
      onClick={() => play('soft')}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={reduced ? undefined : { scale: 1.04, y: -6 }}
      whileFocus={reduced ? undefined : { scale: 1.04, y: -6 }}
      transition={{
        opacity: { duration: 0.4, delay: index * 0.06 },
        y: { type: 'spring', stiffness: 300, damping: 22 },
        scale: { type: 'spring', stiffness: 300, damping: 22 },
      }}
      className="group relative z-0 flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/60 outline-none transition-[border-color,box-shadow] duration-300 hover:z-10 hover:border-primary/50 hover:shadow-[0_24px_60px_-20px_rgba(240,66,75,0.35)] focus-visible:z-10 focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-2">
        <img
          src={post.thumbnail}
          alt={post.thumbnailAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-focus-visible:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent"
          aria-hidden="true"
        />
        <span className="absolute left-3 top-3 rounded-full border border-line bg-base/70 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink backdrop-blur-sm">
          {post.platform}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="font-mono text-[11px] text-faint">{post.date}</span>
        <h2 className="mt-2 text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-primary-soft">
          {post.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>

        <div className="mb-4 mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-line bg-base/40 px-2 py-0.5 text-[11px] text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-3">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-faint">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {post.readingTime}
          </span>
          <span className="inline-flex items-center gap-1 text-sm text-muted transition-colors group-hover:text-primary-soft">
            Read on {post.platform}
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </motion.a>
  )
}
