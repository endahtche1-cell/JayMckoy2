// Studio has its own self-contained layout — no global nav/footer
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
