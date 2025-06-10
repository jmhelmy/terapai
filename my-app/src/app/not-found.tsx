// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 100px)',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        padding: '20px',
        color: '#334155',
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(3rem, 10vw, 6rem)',
          fontWeight: 700,
          color: '#009DA3',
          margin: '0 0 0.5rem 0',
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '1rem',
        }}
      >
        Page Not Found
      </h2>
      <p
        style={{
          fontSize: '1.125rem',
          marginBottom: '2rem',
          maxWidth: '400px',
          color: '#475569',
        }}
      >
        Oops! It seems the page you’re looking for doesn’t exist or has been
        moved.
      </p>
      {/* No onMouseOver / onMouseOut — hover effect via CSS only */}
      <Link
        href="/"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: 500,
          color: 'white',
          backgroundColor: '#009DA3',
          borderRadius: '0.375rem',
          textDecoration: 'none',
          transition: 'opacity 0.2s ease-in-out',
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
}
