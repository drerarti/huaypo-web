"use client";

import { useEffect, useRef, useState } from "react";

type AudioToggleProps = {
  compact?: boolean;
};

type AudioStatus = "idle" | "loading" | "playing" | "error";

const AMBIENT_AUDIO_SRC = "/media/ambient-wind-loop.wav";
const TARGET_VOLUME = 0.22;
const DEBUG_AUDIO = process.env.NODE_ENV !== "production";

function clampVolume(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.min(1, value));
}

function fadeVolume(
  audio: HTMLAudioElement,
  from: number,
  to: number,
  duration: number,
  frameRef: { current: number | null },
  token: number,
  activeTokenRef: { current: number },
  onComplete?: () => void,
) {
  const start = window.performance.now();
  const safeFrom = clampVolume(from);
  const safeTo = clampVolume(to);

  function frame(now: number) {
    if (token !== activeTokenRef.current) {
      frameRef.current = null;
      return;
    }

    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    const nextVolume = safeFrom + (safeTo - safeFrom) * eased;
    audio.volume = clampVolume(nextVolume);

    if (progress < 1) {
      frameRef.current = window.requestAnimationFrame(frame);
      return;
    }

    audio.volume = safeTo;
    frameRef.current = null;
    onComplete?.();
  }

  frameRef.current = window.requestAnimationFrame(frame);
}

export function AudioToggle({ compact = false }: AudioToggleProps) {
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState<AudioStatus>("idle");
  const [message, setMessage] = useState("preparando la atmosfera sonora");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeFrameRef = useRef<number | null>(null);
  const enabledRef = useRef(false);
  const readyRef = useRef(false);
  const activeTokenRef = useRef(0);

  useEffect(() => {
    const audio = new window.Audio(AMBIENT_AUDIO_SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audio.muted = false;
    audio.defaultMuted = false;
    audio.setAttribute("playsinline", "true");
    audioRef.current = audio;

    const handleCanPlay = () => {
      if (DEBUG_AUDIO) {
        console.info("[audio] canplaythrough", {
          src: AMBIENT_AUDIO_SRC,
          readyState: audio.readyState,
          duration: audio.duration,
        });
      }
      readyRef.current = true;
      setStatus((current) => (current === "error" ? current : "idle"));
      setMessage("activa una atmosfera sonora opcional");
    };
    const handlePlaying = () => {
      if (DEBUG_AUDIO) {
        console.info("[audio] playing", {
          currentTime: audio.currentTime,
          volume: audio.volume,
          paused: audio.paused,
          muted: audio.muted,
        });
      }

      enabledRef.current = true;
      setEnabled(true);
      setStatus("playing");
      setMessage("reproduciendo brisa suave, agua y naturaleza");
    };
    const handlePause = () => {
      if (DEBUG_AUDIO) {
        console.info("[audio] pause", {
          currentTime: audio.currentTime,
          volume: audio.volume,
        });
      }

      if (!enabledRef.current) {
        setEnabled(false);
        setStatus((current) => (current === "error" ? "error" : readyRef.current ? "idle" : current));
        setMessage(readyRef.current ? "activa una atmosfera sonora opcional" : "preparando la atmosfera sonora");
      }
    };
    const handleError = () => {
      if (DEBUG_AUDIO) {
        console.error("[audio] error", audio.error);
      }

      enabledRef.current = false;
      setEnabled(false);
      setStatus("error");
      setMessage("no pudimos cargar el audio ambiental");
    };

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);
    audio.load();

    return () => {
      if (fadeFrameRef.current) {
        window.cancelAnimationFrame(fadeFrameRef.current);
      }
      activeTokenRef.current += 1;
      readyRef.current = false;
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      audioRef.current = null;
    };
  }, []);

  async function handleToggle() {
    const audio = audioRef.current;

    if (!audio) {
      setMessage("no encontramos el audio ambiental");
      setStatus("error");
      return;
    }

    activeTokenRef.current += 1;
    const token = activeTokenRef.current;

    if (fadeFrameRef.current) {
      window.cancelAnimationFrame(fadeFrameRef.current);
      fadeFrameRef.current = null;
    }

    audio.volume = clampVolume(audio.volume);

    if (!enabledRef.current) {
      try {
        setStatus("loading");
        setMessage(readyRef.current ? "activando atmosfera sonora" : "cargando audio ambiental");
        audio.volume = 0;
        audio.muted = false;
        await audio.play();
        if (token !== activeTokenRef.current) {
          audio.pause();
          audio.volume = 0;
          return;
        }

        enabledRef.current = true;
        fadeVolume(audio, 0, TARGET_VOLUME, 1200, fadeFrameRef, token, activeTokenRef);
      } catch (error) {
        if (DEBUG_AUDIO) {
          console.error("[audio] play() failed", error);
        }
        enabledRef.current = false;
        setEnabled(false);
        setStatus("error");
        setMessage("el navegador bloqueo la reproduccion. vuelve a intentarlo");
      }
      return;
    }

    enabledRef.current = false;
    setEnabled(false);
    setStatus(readyRef.current ? "loading" : "idle");
    setMessage("apagando atmosfera sonora");
    fadeVolume(audio, audio.volume, 0, 900, fadeFrameRef, token, activeTokenRef, () => {
      if (token !== activeTokenRef.current) {
        return;
      }

      audio.volume = 0;
      audio.pause();
    });
  }

  const label =
    status === "playing"
      ? "Atmosfera sonora activa"
      : status === "loading"
        ? "Activando atmosfera sonora"
        : status === "error"
          ? "Error en la atmosfera sonora"
          : "Activar atmosfera sonora";

  return (
    <button
      type="button"
      onClick={() => void handleToggle()}
      aria-pressed={status === "playing"}
      aria-label={label}
      title={label}
      disabled={status === "loading" && !enabled}
      className={`group inline-flex items-center gap-3 rounded-full border px-3.5 py-2.5 text-sm font-medium transition duration-300 ${
        status === "playing"
          ? "border-[rgba(208,192,143,0.52)] bg-[rgba(247,243,233,0.14)] text-[#F7F3E9] shadow-[0_0_28px_rgba(208,192,143,0.18)]"
          : status === "error"
            ? "border-[rgba(190,115,115,0.4)] bg-[rgba(120,34,34,0.18)] text-[#FFF0EB]"
            : status === "loading"
              ? "border-[rgba(208,192,143,0.34)] bg-[rgba(247,243,233,0.1)] text-[#F7F3E9]"
              : "border-white/16 bg-white/[0.05] text-[#F1E8D6] hover:border-[rgba(208,192,143,0.38)] hover:bg-white/[0.08]"
      } ${compact ? "" : "max-w-full justify-between"} ${
        status === "loading" && !enabled ? "cursor-wait opacity-90" : ""
      }`}
    >
      <span className="relative flex h-7 w-7 items-center justify-center">
        <span
          className={`absolute inset-0 rounded-full transition ${
            status === "playing"
              ? "bg-[rgba(208,192,143,0.18)]"
              : status === "error"
                ? "bg-[rgba(190,115,115,0.2)]"
                : "bg-[rgba(247,243,233,0.06)]"
          }`}
        />
        <span className="relative flex items-center gap-[3px]">
          <span
            className={`block w-[2px] rounded-full transition-all duration-300 ${
              status === "playing"
                ? "h-3.5 bg-[#D7C398]"
                : status === "error"
                  ? "h-2.5 bg-[#F2B8A7]"
                  : "h-2 bg-[#D4CCBC]"
            }`}
          />
          <span
            className={`block w-[2px] rounded-full transition-all duration-300 ${
              status === "playing"
                ? "h-5 bg-[#F7F3E9]"
                : status === "error"
                  ? "h-4 bg-[#FFF0EB]"
                  : "h-3 bg-[#D4CCBC]"
            }`}
          />
          <span
            className={`block w-[2px] rounded-full transition-all duration-300 ${
              status === "playing"
                ? "h-3.5 bg-[#D7C398]"
                : status === "error"
                  ? "h-2.5 bg-[#F2B8A7]"
                  : "h-2 bg-[#D4CCBC]"
            }`}
          />
        </span>
      </span>
      {compact ? (
        <span className="text-[11px] uppercase tracking-[0.18em] text-current">
          {status === "playing"
            ? "Sonido activo"
            : status === "loading"
              ? "Cargando"
              : status === "error"
                ? "Sin audio"
                : "Sonido"}
        </span>
      ) : (
        <span className="flex min-w-0 flex-col items-start leading-none">
          <span className="text-[12px] font-semibold text-current">{label}</span>
          <span className="mt-1 max-w-full text-[10px] uppercase tracking-[0.22em] text-[#D8CEB8]">
            {message}
          </span>
        </span>
      )}
    </button>
  );
}
