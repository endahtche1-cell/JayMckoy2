export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ padding: '48px 0 56px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
      <a
        href="https://tiktok.com/@jaymckoyy"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: '14px',
          color: '#000',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.01em',
        }}
      >
        @jaymckoyy
      </a>

      <p style={{
        marginTop: '18px',
        fontSize: '11px',
        color: '#9a9a9a',
        fontFamily: 'var(--font-body)',
        letterSpacing: '0.04em',
      }}>
        © {year} Jay McKoy · Site by KIET STUDIOS
      </p>
    </footer>
  )
}
