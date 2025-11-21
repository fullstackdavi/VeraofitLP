import { useEffect, useRef } from "react";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Função para tentar reproduzir o vídeo
    const playVideo = async () => {
      try {
        // Garantir atributos críticos para mobile
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.defaultMuted = true;
        
        // Força o vídeo a carregar
        video.load();
        
        // Tentar reproduzir
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          console.log("✅ Vídeo reproduzindo com sucesso");
        }
      } catch (error) {
        console.log("⚠️ Primeira tentativa falhou, aguardando interação:", error);
        
        // Em caso de erro, tentar novamente após uma interação do usuário
        const tryPlayOnInteraction = async () => {
          try {
            video.muted = true;
            video.playsInline = true;
            await video.play();
            console.log("✅ Vídeo reproduzindo após interação do usuário");
          } catch (err) {
            console.log("❌ Ainda não foi possível reproduzir:", err);
          }
        };

        // Múltiplos eventos de interação para garantir compatibilidade
        const events = ['touchstart', 'touchend', 'click', 'scroll'];
        events.forEach(eventType => {
          document.addEventListener(eventType, tryPlayOnInteraction, { once: true, passive: true });
        });
      }
    };

    // Respeitar preferência de movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    // Tentar reproduzir imediatamente
    playVideo();

    // Tentar também quando os metadados carregarem
    video.addEventListener('loadedmetadata', playVideo, { once: true });
    
    // E quando o vídeo estiver pronto para reproduzir
    video.addEventListener('canplay', playVideo, { once: true });

    // Usar Intersection Observer para garantir reprodução quando visível
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video.paused) {
            playVideo();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    // Adicionar listener para quando a página voltar ao foco
    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        playVideo();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
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
        zIndex: -2
      }}
    >
      <source
        src="https://media.istockphoto.com/id/2183275271/video/super-slow-motion-shot-of-ice-cube-falling-into-glass-with-lemonade-at-1000fps-with-camera.mp4?s=mp4-640x640-is&k=20&c=ZJvOdaDxxpUPoxSS5ZlqXr10sRlIkzBnonuLmuZhTRo=#t=0.001"
        type="video/mp4"
      />
      Seu navegador não suporta vídeos HTML5.
    </video>
  );
}
