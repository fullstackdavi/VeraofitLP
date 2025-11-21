import { useEffect, useRef } from "react";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Função para tentar reproduzir o vídeo
    const playVideo = async () => {
      try {
        // Garantir que o vídeo está mudo (requisito para autoplay)
        video.muted = true;
        video.playsInline = true;
        
        // Tentar reproduzir
        await video.play();
        console.log("Vídeo reproduzindo com sucesso");
      } catch (error) {
        console.log("Erro ao tentar reproduzir vídeo:", error);
        
        // Em caso de erro, tentar novamente após uma interação do usuário
        const tryPlayOnInteraction = async () => {
          try {
            await video.play();
            console.log("Vídeo reproduzindo após interação");
            // Remover os listeners após sucesso
            document.removeEventListener("touchstart", tryPlayOnInteraction);
            document.removeEventListener("click", tryPlayOnInteraction);
          } catch (err) {
            console.log("Ainda não foi possível reproduzir:", err);
          }
        };

        // Adicionar listeners para eventos de interação
        document.addEventListener("touchstart", tryPlayOnInteraction, { once: true });
        document.addEventListener("click", tryPlayOnInteraction, { once: true });
      }
    };

    // Tentar reproduzir quando o vídeo estiver pronto
    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener("loadeddata", playVideo, { once: true });
    }

    // Usar Intersection Observer para garantir reprodução quando visível
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video.paused) {
            playVideo();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
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
      data-testid="background-video"
    >
      <source
        src="https://media.istockphoto.com/id/2183275271/video/super-slow-motion-shot-of-ice-cube-falling-into-glass-with-lemonade-at-1000fps-with-camera.mp4?s=mp4-640x640-is&k=20&c=ZJvOdaDxxpUPoxSS5ZlqXr10sRlIkzBnonuLmuZhTRo="
        type="video/mp4"
      />
    </video>
  );
}
