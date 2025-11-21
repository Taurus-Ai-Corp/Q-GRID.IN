import { Scan, Fingerprint, Mic, Eye, Activity, ShieldCheck, ShieldAlert } from "lucide-react";

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

export const MOCK_USER = {
  id: "usr_qrm_001",
  name: "Alex Cipher",
  balance: "2,450,000.00 QRM",
  securityScore: 85,
  quantumKeysRotated: "2024-05-20T10:00:00Z"
};

export const MOCK_PROFILES = [
  {
    id: "bio_001",
    type: "FACIAL_RECOGNITION",
    status: "ACTIVE",
    enrolledAt: "2024-01-15",
    lastVerified: "2 mins ago",
    livenessScore: 98.5
  },
  {
    id: "bio_002",
    type: "FINGERPRINT",
    status: "ACTIVE",
    enrolledAt: "2024-01-15",
    lastVerified: "1 hour ago",
    livenessScore: 99.0
  },
  {
    id: "bio_003",
    type: "VOICE_BIOMETRICS",
    status: "NOT_ENROLLED",
    enrolledAt: null,
    lastVerified: null,
    livenessScore: null
  }
];

export const MOCK_LOGS = [
  {
    id: "ver_001",
    type: "Transaction Auth",
    method: "Fingerprint",
    result: "SUCCESS",
    timestamp: "2024-05-21 14:30:22",
    location: "New York, US",
    riskScore: 12
  },
  {
    id: "ver_002",
    type: "Login",
    method: "Facial Recognition",
    result: "SUCCESS",
    timestamp: "2024-05-21 09:15:00",
    location: "New York, US",
    riskScore: 5
  },
  {
    id: "ver_003",
    type: "High Value Transfer",
    method: "Iris Scan",
    result: "FAILED",
    timestamp: "2024-05-20 18:45:11",
    location: "Unknown Proxy",
    riskScore: 88
  },
  {
    id: "ver_004",
    type: "Settings Change",
    method: "Behavioral",
    result: "SUCCESS",
    timestamp: "2024-05-20 10:00:00",
    location: "New York, US",
    riskScore: 20
  }
];
