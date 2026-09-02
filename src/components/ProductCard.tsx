import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, FlaskConical, Rocket } from 'lucide-react'
import type { Product } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useSound } from '../hooks/useSound'
import { GithubIcon } from './BrandIcons'
import { ProductWorkflowVisual } from './ProductWorkflowVisual'

interface Props {
  product: Product
  index: number
  onOpen: (product: Product) => void
}

const kindMeta = {
  product: {
    label: 'Product',
    Icon: Rocket,
    chip: 'border-success/50 text-success bg-base/80',
  },
  project: {
    label: 'Project',
    Icon: FlaskConical,
    chip: 'border-primary/50 text-primary-soft bg-base/80',
  },
} as const

export function ProductCard({ product, index, onOpen }: Props) {
  const { play } = useSound()
  const reduced = usePrefersReducedMotion()
  const meta = kindMeta[product.kind]
  const KindIcon = meta.Icon

  const open = () => {
    play('soft')
    onOpen(product)
  }

  return (
    <motion.article
      role="button"
      tabIndex={0}
      aria-label={`Open ${product.title} case study`}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          open()
        }
      }}
      className="group relative flex h-full w-[280px] shrink-0 cursor-pointer snap-start flex-col overflow-hidden rounded-2xl border border-line bg-surface/70 transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-[0_18px_50px_-24px_rgba(240,66,75,0.55)] sm:w-[312px]"
      whileHover={reduced ? undefined : { y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
    >
      <div className="p-4">
        <div className="relative">
          <ProductWorkflowVisual visual={product.visual} />

          {/* kind badge */}
          <span
            className={`pointer-events-none absolute left-2 top-2 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm ${meta.chip}`}
          >
            <KindIcon className="h-3 w-3" aria-hidden="true" />
            {meta.label}
          </span>

          {/* hover-revealed links */}
          {(product.github || product.website) && (
            <div className="absolute right-2 top-2 flex gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
              {product.github && (
                <a
                  href={product.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.stopPropagation()
                    play('tick')
                  }}
                  aria-label={`${product.title} on GitHub`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-base/85 text-ink backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary-soft"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              )}
              {product.website && (
                <a
                  href={product.website}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.stopPropagation()
                    play('tick')
                  }}
                  aria-label={`${product.title} website`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-base/85 text-ink backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary-soft"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>

        <div className="mt-3 flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold leading-tight text-ink">
              {product.title}
            </h3>
            <p className="mt-0.5 text-sm text-muted">{product.subtitle}</p>
          </div>
          <ArrowUpRight
            className="mt-1 h-4 w-4 shrink-0 text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-soft"
            aria-hidden="true"
          />
        </div>
      </div>

      <span className="sr-only">
        {index + 1}. {meta.label}
      </span>
    </motion.article>
  )
}
