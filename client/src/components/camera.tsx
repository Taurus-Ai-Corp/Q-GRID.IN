import { useEffect, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";

export function CameraComponent({
  onCapture,
  isActive,
}: {
  onCapture?: (canvas: HTMLCanvasElement) => void;
  isActive: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!isActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      return;
    }

    const startCamera = async () => {
      try {
        setError(null);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
          audio: false,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to access camera. Please check permissions."
        );
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [isActive]);

  // Auto-capture frames during scanning
  useEffect(() => {
    if (!isActive || !videoRef.current || !canvasRef.current) return;

    const captureFrame = () => {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        if (context) {
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
          context.drawImage(
            videoRef.current,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          onCapture?.(canvasRef.current);
        }
      }
    };

    const interval = setInterval(captureFrame, 100);
    return () => clearInterval(interval);
  }, [isActive, onCapture]);

  if (error) {
    return (
      <div className="w-80 h-80 flex items-center justify-center bg-destructive/10 border-2 border-destructive rounded-3xl">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Video element */}
      <video
        ref={videoRef}
        className="hidden"
        style={{ transform: "scaleX(-1)" }}
        playsInline
      />

      {/* Canvas for frame capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Display live feed */}
      {isActive && (
        <div className="relative w-80 h-80 rounded-3xl overflow-hidden border-2 border-primary shadow-[0_0_30px_rgba(0,240,255,0.3)]">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            style={{ transform: "scaleX(-1)" }}
            playsInline
          />
          {/* Scanning animation overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/80 shadow-[0_0_15px_#00f0ff] animate-[scan_2s_ease-in-out_infinite]" />
          </div>
        </div>
      )}
    </>
  );
}
