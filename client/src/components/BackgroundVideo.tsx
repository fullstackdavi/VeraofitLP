import { useEffect, useRef, useState } from "react";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Configurar atributos críticos imediatamente
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.volume = 0;

    let playAttempts = 0;
    const maxAttempts = 10;

    // Função agressiva para reproduzir o vídeo
    const attemptPlay = async () => {
      if (!video || isPlaying) return;
      
      playAttempts++;
      
      try {
        video.muted = true;
        video.volume = 0;
        
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          console.log("✅ Vídeo iniciado no frame", video.currentTime);
          return true;
        }
      } catch (error: any) {
        if (playAttempts < maxAttempts) {
          // Tentar novamente após 100ms
          setTimeout(attemptPlay, 100);
        }
        return false;
      }
      return false;
    };

    // Tentar reproduzir imediatamente
    attemptPlay();

    // Eventos que indicam que o vídeo está pronto
    const events = [
      'loadstart',
      'loadedmetadata', 
      'loadeddata',
      'canplay',
      'canplaythrough'
    ];

    events.forEach(event => {
      video.addEventListener(event, attemptPlay);
    });

    // Fallback: tentar após qualquer interação
    const interactionEvents = ['touchstart', 'touchend', 'touchmove', 'click', 'scroll'];
    const handleInteraction = () => {
      if (!isPlaying) {
        attemptPlay();
      }
    };

    interactionEvents.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true, passive: true });
    });

    // Tentar novamente quando a página fica visível
    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        attemptPlay();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Garantir que está sempre tocando
    const playInterval = setInterval(() => {
      if (video.paused && !document.hidden) {
        attemptPlay();
      }
    }, 1000);

    return () => {
      events.forEach(event => {
        video.removeEventListener(event, attemptPlay);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(playInterval);
    };
  }, [isPlaying]);

  return (
    <>
      <video
        ref={videoRef}
        id="background-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        webkit-playsinline="true"
        x-webkit-airplay="allow"
        data-testid="background-video"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -2,
          opacity: isPlaying ? 1 : 0.5,
          transition: 'opacity 0.3s ease-in-out'
        }}
      >
        <source
          src="https://media.istockphoto.com/id/2183275271/video/super-slow-motion-shot-of-ice-cube-falling-into-glass-with-lemonade-at-1000fps-with-camera.mp4?s=mp4-640x640-is&k=20&c=ZJvOdaDxxpUPoxSS5ZlqXr10sRlIkzBnonuLmuZhTRo=#t=0.5"
          type="video/mp4"
        />
      </video>
      
      {/* Overlay escuro para melhor legibilidade do texto */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
    </>
  );
}
