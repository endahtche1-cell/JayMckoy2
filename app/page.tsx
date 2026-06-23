import SpinGallery from '@/components/SpinGallery'

export default function HomePage() {
  return (
    <div style={{ background: 'transparent', minHeight: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <SpinGallery />
    </div>
  )
}
