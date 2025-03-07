
import React from 'react';

interface StoreThemeProps {
  children: React.ReactNode;
}

const StoreTheme: React.FC<StoreThemeProps> = ({ children }) => {
  return (
    <div className="store-theme">
      <style jsx global>{`
        .store-theme {
          --card-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
          --card-shadow-hover: 0 20px 30px -15px rgba(2, 12, 27, 0.7);
          --card-bg: linear-gradient(120deg, #2a3a57 0%, #1f2b45 100%);
          --neon-text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
        }

        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }

        .card-3d:hover {
          transform: translateY(-10px) rotateX(5deg);
        }

        .neon-text {
          text-shadow: var(--neon-text-shadow);
        }

        .gem-shine {
          position: relative;
          overflow: hidden;
        }

        .gem-shine::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to bottom right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(45deg);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) rotate(45deg);
          }
        }

        .pulse-glow {
          animation: pulseGlow 2s infinite;
        }

        @keyframes pulseGlow {
          0%, 100% {
            filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.8));
          }
        }
      `}</style>
      {children}
    </div>
  );
};

export default StoreTheme;
