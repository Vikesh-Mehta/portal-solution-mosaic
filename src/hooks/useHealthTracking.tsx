
import { useState, useEffect, useMemo } from 'react';
import { useUserHealthRecords } from './useUserHealthRecords';
import { useUserAppointments } from './useUserAppointments';
import { useToast } from './use-toast';

export interface HealthMetric {
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'danger';
  trend?: 'up' | 'down' | 'stable';
}

export interface HealthSummary {
  overallScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
  lastCheckupDays: number | null;
  nextAppointment: any | null;
}

export const useHealthTracking = () => {
  const { records, loading: recordsLoading, error: recordsError } = useUserHealthRecords();
  const { appointments, loading: appointmentsLoading, error: appointmentsError } = useUserAppointments();
  const { toast } = useToast();
  const [healthSummary, setHealthSummary] = useState<HealthSummary | null>(null);

  // Get latest vital signs
  const latestVitals = useMemo(() => {
    const latestRecord = records?.find(record => 
      record.record_type === 'checkup' && record.vital_signs
    );
    return latestRecord?.vital_signs || null;
  }, [records]);

  // Calculate health trends
  const healthTrends = useMemo(() => {
    if (!records || records.length < 2) return {};
    
    const checkups = records
      .filter(r => r.record_type === 'checkup' && r.vital_signs)
      .slice(0, 2);
    
    if (checkups.length < 2) return {};
    
    const trends: Record<string, 'up' | 'down' | 'stable'> = {};
    const current = checkups[0].vital_signs;
    const previous = checkups[1].vital_signs;
    
    ['heartRate', 'bloodPressure', 'bloodSugar', 'oxygenLevel'].forEach(vital => {
      if (current?.[vital]?.value && previous?.[vital]?.value) {
        const currentVal = parseFloat(current[vital].value);
        const previousVal = parseFloat(previous[vital].value);
        
        if (currentVal > previousVal * 1.05) trends[vital] = 'up';
        else if (currentVal < previousVal * 0.95) trends[vital] = 'down';
        else trends[vital] = 'stable';
      }
    });
    
    return trends;
  }, [records]);

  // Calculate health score and summary
  useEffect(() => {
    if (!latestVitals) {
      setHealthSummary({
        overallScore: 0,
        riskLevel: 'medium',
        recommendations: ['Start tracking your health by recording vital signs'],
        lastCheckupDays: null,
        nextAppointment: null
      });
      return;
    }

    let score = 0;
    let maxScore = 0;
    const recommendations: string[] = [];

    // Heart rate scoring
    if (latestVitals.heartRate?.value) {
      const hr = parseFloat(latestVitals.heartRate.value);
      maxScore += 25;
      if (hr >= 60 && hr <= 100) {
        score += 25;
      } else if (hr >= 50 && hr <= 110) {
        score += 15;
        recommendations.push('Monitor your heart rate - it\'s slightly outside the optimal range');
      } else {
        score += 5;
        recommendations.push('Consult a doctor about your heart rate readings');
      }
    }

    // Blood pressure scoring
    if (latestVitals.bloodPressure?.value) {
      const bp = latestVitals.bloodPressure.value.split('/');
      if (bp.length === 2) {
        const systolic = parseInt(bp[0]);
        const diastolic = parseInt(bp[1]);
        maxScore += 25;
        
        if (systolic <= 120 && diastolic <= 80) {
          score += 25;
        } else if (systolic <= 140 && diastolic <= 90) {
          score += 15;
          recommendations.push('Consider lifestyle changes to improve blood pressure');
        } else {
          score += 5;
          recommendations.push('High blood pressure detected - consult a healthcare provider');
        }
      }
    }

    // Blood sugar scoring
    if (latestVitals.bloodSugar?.value) {
      const bs = parseFloat(latestVitals.bloodSugar.value);
      maxScore += 25;
      if (bs >= 70 && bs <= 140) {
        score += 25;
      } else if (bs >= 60 && bs <= 180) {
        score += 15;
        recommendations.push('Monitor your blood sugar levels more closely');
      } else {
        score += 5;
        recommendations.push('Abnormal blood sugar levels - seek medical advice');
      }
    }

    // Oxygen level scoring
    if (latestVitals.oxygenLevel?.value) {
      const ox = parseFloat(latestVitals.oxygenLevel.value);
      maxScore += 25;
      if (ox >= 95) {
        score += 25;
      } else if (ox >= 90) {
        score += 15;
        recommendations.push('Oxygen levels are slightly low - consider consulting a doctor');
      } else {
        score += 5;
        recommendations.push('Low oxygen levels detected - seek immediate medical attention');
      }
    }

    const overallScore = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    
    // Calculate last checkup days
    const lastCheckup = records?.find(r => r.record_type === 'checkup');
    const lastCheckupDays = lastCheckup 
      ? Math.floor((new Date().getTime() - new Date(lastCheckup.date_recorded).getTime()) / (1000 * 3600 * 24))
      : null;

    // Find next appointment
    const nextAppointment = appointments
      ?.filter(apt => {
        const appointmentDate = new Date(apt.appointment_date + 'T' + apt.appointment_time);
        return appointmentDate > new Date() && apt.status === 'scheduled';
      })
      .sort((a, b) => {
        const dateA = new Date(a.appointment_date + 'T' + a.appointment_time);
        const dateB = new Date(b.appointment_date + 'T' + b.appointment_time);
        return dateA.getTime() - dateB.getTime();
      })[0] || null;

    // Add general recommendations
    if (overallScore >= 80) {
      recommendations.unshift('Excellent health! Keep up the good work');
    } else if (overallScore >= 60) {
      recommendations.unshift('Good health overall, with room for improvement');
    } else {
      recommendations.unshift('Health needs attention - consider scheduling a checkup');
    }

    if (lastCheckupDays && lastCheckupDays > 90) {
      recommendations.push('It\'s been a while since your last checkup - consider scheduling one');
    }

    setHealthSummary({
      overallScore,
      riskLevel: overallScore >= 70 ? 'low' : overallScore >= 50 ? 'medium' : 'high',
      recommendations: recommendations.slice(0, 3),
      lastCheckupDays,
      nextAppointment
    });
  }, [latestVitals, records, appointments]);

  // Error handling
  useEffect(() => {
    if (recordsError) {
      toast({
        title: "Error loading health records",
        description: "Please try refreshing the page",
        variant: "destructive",
      });
    }
    if (appointmentsError) {
      toast({
        title: "Error loading appointments",
        description: "Please try refreshing the page",
        variant: "destructive",
      });
    }
  }, [recordsError, appointmentsError, toast]);

  return {
    records: records || [],
    appointments: appointments || [],
    latestVitals,
    healthTrends,
    healthSummary,
    loading: recordsLoading || appointmentsLoading,
    error: recordsError || appointmentsError
  };
};
