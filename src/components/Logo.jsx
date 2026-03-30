export const Logo = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 24, md: 32, lg: 40 };
  const w = sizes[size] || 32;
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg width={w} height={w} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#6366f1" />
        <path
          d="M10 30V10H16L20 20L24 10H30V30H25V17L20 27L15 17V30H10Z"
          fill="white"
          fillOpacity="0.95"
        />
      </svg>
    </div>
  );
};