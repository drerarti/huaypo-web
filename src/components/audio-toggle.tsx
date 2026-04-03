"use client";

import { useEffect, useRef, useState } from "react";

type AudioToggleProps = {
  compact?: boolean;
};

function createNoiseBuffer(context: AudioContext, seconds = 3) {
  const buffer = context.createBuffer(1, context.sampleRate * seconds, context.sampleRate);
  const channelData = buffer.getChannelData(0);
  let last = 0;

  for (let i = 0; i < channelData.length; i += 1) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    channelData[i] = last * 3.2;
  }

  return buffer;
}

export function AudioToggle({ compact = false }: AudioToggleProps) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const sourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const timeoutRef = useRef<number | null>(null);

  async function ensureAudio() {
    if (typeof window === "undefined") {
      return null;
    }

    if (!audioContextRef.current) {
      const context = new window.AudioContext();
      const masterGain = context.createGain();
      masterGain.gain.value = 0;
      masterGain.connect(context.destination);

      const noiseBuffer = createNoiseBuffer(context);
      const windSource = context.createBufferSource();
      windSource.buffer = noiseBuffer;
      windSource.loop = true;
      windSource.playbackRate.value = 0.82;

      const shimmerSource = context.createBufferSource();
      shimmerSource.buffer = noiseBuffer;
      shimmerSource.loop = true;
      shimmerSource.playbackRate.value = 1.25;

      const windFilter = context.createBiquadFilter();
      windFilter.type = "lowpass";
      windFilter.frequency.value = 620;
      windFilter.Q.value = 0.25;

      const shimmerFilter = context.createBiquadFilter();
      shimmerFilter.type = "bandpass";
      shimmerFilter.frequency.value = 1600;
      shimmerFilter.Q.value = 0.55;

      const windGain = context.createGain();
      windGain.gain.value = 0.052;

      const shimmerGain = context.createGain();
      shimmerGain.gain.value = 0.01;

      const toneOscillator = context.createOscillator();
      toneOscillator.type = "sine";
      toneOscillator.frequency.value = 118;

      const toneGain = context.createGain();
      toneGain.gain.value = 0.0032;

      windSource.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(masterGain);

      shimmerSource.connect(shimmerFilter);
      shimmerFilter.connect(shimmerGain);
      shimmerGain.connect(masterGain);

      toneOscillator.connect(toneGain);
      toneGain.connect(masterGain);

      windSource.start();
      shimmerSource.start();
      toneOscillator.start();

      audioContextRef.current = context;
      masterGainRef.current = masterGain;
      sourcesRef.current = [windSource, shimmerSource];
      setReady(true);
    }

    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume();
    }

    return audioContextRef.current;
  }

  async function handleToggle() {
    const context = await ensureAudio();
    const masterGain = masterGainRef.current;

    if (!context || !masterGain) {
      return;
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const now = context.currentTime;
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(masterGain.gain.value, now);

    if (!enabled) {
      masterGain.gain.linearRampToValueAtTime(0.075, now + 1.4);
      setEnabled(true);
      return;
    }

    masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.1);
    timeoutRef.current = window.setTimeout(() => {
      void audioContextRef.current?.suspend();
    }, 1300);
    setEnabled(false);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      sourcesRef.current.forEach((source) => {
        try {
          source.stop();
        } catch {
          // Ignore stop errors during unmount cleanup.
        }
      });

      void audioContextRef.current?.close();
    };
  }, []);

  const label = enabled ? "Atmósfera sonora activa" : "Activar atmósfera sonora";
  const helper = enabled ? "viento y calma en loop" : "sonido opcional de viento suave";

  return (
    <button
      type="button"
      onClick={() => void handleToggle()}
      aria-pressed={enabled}
      aria-label={label}
      title={label}
      className={`group inline-flex items-center gap-3 rounded-full border px-3.5 py-2.5 text-sm font-medium transition duration-300 ${
        enabled
          ? "border-[rgba(208,192,143,0.48)] bg-[rgba(247,243,233,0.12)] text-[#F7F3E9] shadow-[0_0_28px_rgba(208,192,143,0.18)]"
          : "border-white/16 bg-white/[0.05] text-[#F1E8D6] hover:border-[rgba(208,192,143,0.38)] hover:bg-white/[0.08]"
      }`}
    >
      <span className="relative flex h-7 w-7 items-center justify-center">
        <span
          className={`absolute inset-0 rounded-full transition ${
            enabled ? "bg-[rgba(208,192,143,0.18)]" : "bg-[rgba(247,243,233,0.06)]"
          }`}
        />
        <span className="relative flex items-center gap-[3px]">
          <span
            className={`block w-[2px] rounded-full transition-all duration-300 ${
              enabled ? "h-3.5 bg-[#D7C398]" : "h-2 bg-[#D4CCBC]"
            }`}
          />
          <span
            className={`block w-[2px] rounded-full transition-all duration-300 ${
              enabled ? "h-5 bg-[#F7F3E9]" : "h-3 bg-[#D4CCBC]"
            }`}
          />
          <span
            className={`block w-[2px] rounded-full transition-all duration-300 ${
              enabled ? "h-3.5 bg-[#D7C398]" : "h-2 bg-[#D4CCBC]"
            }`}
          />
        </span>
      </span>
      {compact ? (
        <span className="text-[11px] uppercase tracking-[0.18em] text-current">Sonido</span>
      ) : (
        <span className="flex flex-col items-start leading-none">
          <span className="text-[12px] font-semibold text-current">{label}</span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.26em] text-[#D8CEB8]">
            {ready ? helper : "activa una capa de inmersion"}
          </span>
        </span>
      )}
    </button>
  );
}
