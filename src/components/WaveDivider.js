export default function WaveDivider({ flip = false, color = '#FAFAF5' }) {
  return (
    <div className="wave-divider" style={flip ? { transform: 'rotate(180deg)' } : {}}>
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill={color}
          d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,50 1440,40 L1440,100 L0,100 Z"
        />
      </svg>
    </div>
  );
}
