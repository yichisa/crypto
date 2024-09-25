import React from 'react';
import { useTheme } from '@fluentui/react';

const SponsoredRow: React.FC = () => {
  const theme = useTheme();

  return (
    <a
      href="https://bs_0e8bb7e0.ironnode.care"
      rel="nofollow noopener noreferrer"
      target="_blank"
      aria-label="CryptoAllStars"
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        padding: '2px',
        backgroundColor: theme.palette.neutralLight,
        flexGrow: 1,
        height: '30px',
        background: 'linear-gradient(45deg, #ff69b4, #ff1493, #ff00ff, #ff6ec7, #ff1493, #db7093, #ff69b4)',
        backgroundSize: '400% 400%',
        animation: 'neonPink 5s ease infinite',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      
    >
      <style>
        {`
          @keyframes neonPink {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <small style={{ fontSize: '14px', fontWeight: 'bold' }}>
        CryptoAllStars - $STARS Presale Raises Over $300k in the First 24 Hours, Will CryptoAllStars be the Next Meme Coin to Explode?
      </small>
    </a>
  );
};

export default SponsoredRow;
