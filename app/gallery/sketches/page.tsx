import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Sketches' }

export default function SketchesPage() {
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase mb-1" style={{ opacity: 0.35, fontFamily: 'var(--font-body)' }}>
          Gallery
        </p>
        <h1 className="text-3xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Sketches</h1>
      </div>
      <p className="text-sm mb-16 max-w-sm" style={{ opacity: 0.5, fontFamily: 'var(--font-body)' }}>
        Works in progress. Process shots. The stuff that doesn&apos;t make it to the main gallery yet.
      </p>

      <div className="max-w-md py-16">
        <p className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)', opacity: 0.4 }}>
          Coming soon.
        </p>
        <p className="text-sm" style={{ opacity: 0.5, fontFamily: 'var(--font-body)' }}>
          Jay&apos;s WIP and process shots are on their way here.
        </p>
      </div>
    </div>
  )
}
