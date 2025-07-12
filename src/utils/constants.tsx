
export const APP_CONFIG = {
  name: 'Smart Health',
  description: 'AI-integrated self-service healthcare for rural communities',
  version: '1.0.0',
  author: 'Smart Health Team',
  contact: {
    email: 'support@smarthealth.com',
    phone: '+1 (555) 123-4567'
  }
};

export const HEALTH_METRICS = {
  HEART_RATE: {
    min: 60,
    max: 100,
    unit: 'bpm',
    name: 'Heart Rate'
  },
  BLOOD_PRESSURE: {
    systolic: { min: 90, max: 120 },
    diastolic: { min: 60, max: 80 },
    unit: 'mmHg',
    name: 'Blood Pressure'
  },
  BLOOD_SUGAR: {
    min: 70,
    max: 140,
    unit: 'mg/dL',
    name: 'Blood Sugar'
  },
  OXYGEN_LEVEL: {
    min: 95,
    max: 100,
    unit: '%',
    name: 'Oxygen Level'
  }
};

export const APPOINTMENT_TYPES = [
  'General Consultation',
  'Health Checkup',
  'Follow-up',
  'Emergency',
  'Specialist Consultation'
];

export const BLOOD_GROUPS = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

export const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'];
