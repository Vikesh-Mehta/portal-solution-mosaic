
import { z } from 'zod';

export const healthMetricsSchema = z.object({
  heartRate: z.object({
    value: z.string().min(1, 'Heart rate is required'),
    unit: z.string().default('bpm'),
    status: z.enum(['normal', 'warning', 'danger']).default('normal')
  }).optional(),
  bloodPressure: z.object({
    value: z.string().min(1, 'Blood pressure is required'),
    unit: z.string().default('mmHg'),
    status: z.enum(['normal', 'warning', 'danger']).default('normal')
  }).optional(),
  bloodSugar: z.object({
    value: z.string().min(1, 'Blood sugar is required'),
    unit: z.string().default('mg/dL'),
    status: z.enum(['normal', 'warning', 'danger']).default('normal')
  }).optional(),
  oxygenLevel: z.object({
    value: z.string().min(1, 'Oxygen level is required'),
    unit: z.string().default('%'),
    status: z.enum(['normal', 'warning', 'danger']).default('normal')
  }).optional()
});

export const profileSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  date_of_birth: z.string().optional(),
  gender: z.string().optional(),
  blood_group: z.string().optional(),
  height_cm: z.number().positive().optional(),
  weight_kg: z.number().positive().optional(),
  address: z.string().optional(),
  emergency_contact_name: z.string().optional(),
  emergency_contact_phone: z.string().optional(),
  medical_conditions: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
  current_medications: z.array(z.string()).optional()
});

export const appointmentSchema = z.object({
  doctor_name: z.string().min(1, 'Doctor name is required'),
  appointment_type: z.string().min(1, 'Appointment type is required'),
  appointment_date: z.string().min(1, 'Appointment date is required'),
  appointment_time: z.string().min(1, 'Appointment time is required'),
  notes: z.string().optional()
});
