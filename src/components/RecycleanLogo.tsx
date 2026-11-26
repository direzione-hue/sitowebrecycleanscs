interface RecycleanLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export function RecycleanLogo({variant = 'light', className = 'w-7 h-7'}: RecycleanLogoProps) {
  const strokeColor = variant === 'dark' ? '#38BDF8' : '#1D4ED8';
  const accentColor = variant === 'dark' ? '#60A5FA' : '#0284C7';

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Top-right chasing arrow */}
      <path
        d="M13.3 5.2L16 2.5L21.8 12.2"
        stroke={strokeColor}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.6 8.8L22.2 12.8L18.2 12.3"
        stroke={strokeColor}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bottom-right chasing arrow */}
      <path
        d="M24.8 17.5L27.5 22.2L16.4 25.5"
        stroke={accentColor}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.2 28L15.7 25.7L18 22.2"
        stroke={accentColor}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Left-up chasing arrow */}
      <path
        d="M10.4 25.2H4.8L10.3 15.2"
        stroke={strokeColor}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.7 16L10.5 14.5L11.9 18.4"
        stroke={strokeColor}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
