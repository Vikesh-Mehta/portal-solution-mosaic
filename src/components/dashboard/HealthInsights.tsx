
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';

interface HealthInsightsProps {
  records: any[];
}

const HealthInsights = ({ records }: HealthInsightsProps) => {
  const getLatestVitals = () => {
    const latestRecord = records.find(r => r.record_type === 'checkup' && r.vital_signs);
    return latestRecord?.vital_signs || null;
  };

  const getHealthTrend = (vital: string) => {
    const checkups = records
      .filter(r => r.record_type === 'checkup' && r.vital_signs?.[vital]?.value)
      .slice(0, 2);
    
    if (checkups.length < 2) return 'stable';
    
    const current = parseFloat(checkups[0].vital_signs[vital].value);
    const previous = parseFloat(checkups[1].vital_signs[vital].value);
    
    if (current > previous) return 'up';
    if (current < previous) return 'down';
    return 'stable';
  };

  const getHealthScore = () => {
    const vitals = getLatestVitals();
    if (!vitals) return 0;
    
    let score = 0;
    let count = 0;
    
    // Heart rate: 60-100 optimal
    if (vitals.heartRate?.value) {
      const hr = parseFloat(vitals.heartRate.value);
      if (hr >= 60 && hr <= 100) score += 25;
      else if (hr >= 50 && hr <= 110) score += 15;
      count += 25;
    }
    
    // Blood pressure: 120/80 optimal
    if (vitals.bloodPressure?.value) {
      const bp = vitals.bloodPressure.value.split('/');
      if (bp.length === 2) {
        const systolic = parseInt(bp[0]);
        const diastolic = parseInt(bp[1]);
        if (systolic <= 120 && diastolic <= 80) score += 25;
        else if (systolic <= 140 && diastolic <= 90) score += 15;
        count += 25;
      }
    }
    
    // Blood sugar: 70-140 optimal
    if (vitals.bloodSugar?.value) {
      const bs = parseFloat(vitals.bloodSugar.value);
      if (bs >= 70 && bs <= 140) score += 25;
      else if (bs >= 60 && bs <= 180) score += 15;
      count += 25;
    }
    
    // Oxygen level: 95-100 optimal
    if (vitals.oxygenLevel?.value) {
      const ox = parseFloat(vitals.oxygenLevel.value);
      if (ox >= 95) score += 25;
      else if (ox >= 90) score += 15;
      count += 25;
    }
    
    return count > 0 ? Math.round((score / count) * 100) : 0;
  };

  const vitals = getLatestVitals();
  const healthScore = getHealthScore();

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} className="text-red-500" />;
      case 'down': return <TrendingDown size={16} className="text-green-500" />;
      default: return <Minus size={16} className="text-gray-500" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Health Insights
          {healthScore > 0 && (
            <Badge variant={healthScore >= 80 ? 'default' : healthScore >= 60 ? 'secondary' : 'destructive'}>
              Score: {healthScore}%
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Your health trends and personalized insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {healthScore > 0 ? (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Health Score</span>
                <span className={`font-medium ${getScoreColor(healthScore)}`}>{healthScore}%</span>
              </div>
              <Progress value={healthScore} className="h-2" />
            </div>
            
            {vitals && (
              <div className="grid grid-cols-2 gap-3">
                {vitals.heartRate?.value && (
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="text-sm">Heart Rate</span>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(getHealthTrend('heartRate'))}
                      <span className="text-sm font-medium">{vitals.heartRate.value} bpm</span>
                    </div>
                  </div>
                )}
                
                {vitals.bloodPressure?.value && (
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="text-sm">Blood Pressure</span>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(getHealthTrend('bloodPressure'))}
                      <span className="text-sm font-medium">{vitals.bloodPressure.value}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                💡 Health Tip
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {healthScore >= 80 
                  ? "Great job! Keep maintaining your healthy lifestyle."
                  : healthScore >= 60
                  ? "Good progress! Consider regular exercise and a balanced diet."
                  : "Schedule a consultation with a doctor for personalized advice."
                }
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <AlertTriangle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground text-sm">
              No health data available. Start with a health checkup to see insights.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthInsights;
