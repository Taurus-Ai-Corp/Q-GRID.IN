import { Scan, Fingerprint, Mic, Eye, Activity } from "lucide-react";

export const BIOMETRIC_TYPES = {
  FACIAL_RECOGNITION: {
    id: "facial",
    label: "Facial Recognition",
    provider: "AWS Rekognition",
    accuracy: "99.9%",
    icon: Scan,
    color: "text-cyan-400",
    description: "Primary identity verification using 3D facial mapping."
  },
  FINGERPRINT: {
    id: "fingerprint",
    label: "Fingerprint",
    provider: "Device Sensors",
    accuracy: "99.8%",
    icon: Fingerprint,
    color: "text-emerald-400",
    description: "Quick transaction authorization via biometric sensors."
  },
  VOICE_BIOMETRICS: {
    id: "voice",
    label: "Voice Analysis",
    provider: "Nuance VocalPassword",
    accuracy: "99.5%",
    icon: Mic,
    color: "text-purple-400",
    description: "Phone-based verification and anti-spoofing."
  },
  IRIS_SCAN: {
    id: "iris",
    label: "Iris Scan",
    provider: "IrisGuard",
    accuracy: "99.99%",
    icon: Eye,
    color: "text-blue-400",
    description: "High-security institutional account access."
  },
  BEHAVIORAL: {
    id: "behavioral",
    label: "Behavioral",
    provider: "BioCatch",
    accuracy: "Continuous",
    icon: Activity,
    color: "text-orange-400",
    description: "Continuous authentication via typing and handling patterns."
  }
};

export const KYC_STATUS = {
  PENDING: "PENDING",
  VERIFIED: "VERIFIED",
  REJECTED: "REJECTED"
} as const;

export const BIOMETRIC_STATUS = {
  ACTIVE: "ACTIVE",
  NOT_ENROLLED: "NOT_ENROLLED",
  EXPIRED: "EXPIRED"
} as const;
