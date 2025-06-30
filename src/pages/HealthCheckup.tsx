
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Droplet, Waves, Activity, Save, ArrowLeft, TrendingUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUserHealthRecords } from '@/hooks/useUserHealthRecords';
import { useToast } from '@/hooks/use-toast';

const HealthCheckup = () => {
  const navigate = useNavigate();
  const { addHealthRecord, records } = useUserHealthRecords();
  const { toast } = useToast();
  
  const [vitalSigns, setVitalSigns] = useState({
    heartRate: { value: '', unit: 'bpm', status: 'normal' as const },
    bloodPressure: { value: '', unit: 'mmHg', status: 'normal' as const },
    bloodSugar: { value: '', unit: 'mg/dL', status: 'normal' as const },
    oxygenLevel: { value: '', unit: '%', status: 'normal' as const }
  });
  
  const [formData, setFormData] = useState({
    title: `Health Checkup - ${new Date().toLocaleDateString()}`,
    description: '',
    doctorName: '',
    recommendations: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleVitalChange = (vital: string, value: string) => {
    setVitalSigns(prev => ({
      ...prev,
      [vital]: { ...prev[vital as keyof typeof prev], value }
    }));
  };

  const getVitalStatus = (vital: string, value: string) => {
    if (!value) return 'normal';
    
    const numValue = parseFloat(value);
    
    switch (vital) {
      case 'heartRate':
        if (numValue >= 60 && numValue <= 100) return 'normal';
        if (numValue >= 50 && numValue <= 110) return 'warning';
        return 'danger';
      case 'bloodSugar':
        if (numValue >= 70 && numValue <= 140) return 'normal';
        if (numValue >= 60 && numValue <= 180) return 'warning';
        return 'danger';
      case 'oxygenLevel':
        if (numValue >= 95) return 'normal';
        if (numValue >= 90) return 'warning';
        return 'danger';
      default:
        return 'normal';
    }
  };

  const getPreviousValue = (vital: string) => {
    const lastCheckup = records.find(r => 
      r.record_type === 'checkup' && 
      r.vital_signs && 
      r.vital_signs[vital]?.value
    );
    return lastCheckup?.vital_signs[vital]?.value || null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Update vital signs status before saving
      const updatedVitalSigns = Object.entries(vitalSigns).reduce((acc, [key, vital]) => {
        acc[key] = {
          ...vital,
          status: getVitalStatus(key, vital.value)
        };
        return acc;
      }, {} as typeof vitalSigns);

      const result = await addHealthRecord({
        record_type: 'checkup',
        title: formData.title,
        description: formData.description,
        doctor_name: formData.doctorName || null,
        date_recorded: new Date().toISOString().split('T')[0],
        vital_signs: updatedVitalSigns,
        test_results: null,
        recommendations: formData.recommendations || null
      });
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      toast({
        title: "Health checkup saved",
        description: "Your health data has been recorded successfully.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving health checkup:', error);
      toast({
        title: "Error",
        description: "Failed to save health checkup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="mb-4"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold mb-2">Health Checkup</h1>
            <p className="text-muted-foreground">
              Record your vital signs and health information
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2" />
                  Vital Signs
                </CardTitle>
                <CardDescription>
                  Enter your current vital signs measurements
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(vitalSigns).map(([key, vital]) => {
                  const previousValue = getPreviousValue(key);
                  const icons = {
                    heartRate: <Heart size={16} className="mr-2 text-red-500" />,
                    bloodPressure: <Activity size={16} className="mr-2 text-blue-500" />,
                    bloodSugar: <Droplet size={16} className="mr-2 text-orange-500" />,
                    oxygenLevel: <Waves size={16} className="mr-2 text-cyan-500" />
                  };
                  
                  const labels = {
                    heartRate: 'Heart Rate (bpm)',
                    bloodPressure: 'Blood Pressure (mmHg)',
                    bloodSugar: 'Blood Sugar (mg/dL)',
                    oxygenLevel: 'Oxygen Level (%)'
                  };

                  const placeholders = {
                    heartRate: 'e.g., 72',
                    bloodPressure: 'e.g., 120/80',
                    bloodSugar: 'e.g., 95',
                    oxygenLevel: 'e.g., 98'
                  };

                  return (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key} className="flex items-center">
                        {icons[key as keyof typeof icons]}
                        {labels[key as keyof typeof labels]}
                      </Label>
                      <Input
                        id={key}
                        type={key === 'bloodPressure' ? 'text' : 'number'}
                        placeholder={placeholders[key as keyof typeof placeholders]}
                        value={vital.value}
                        onChange={(e) => handleVitalChange(key, e.target.value)}
                        className={
                          vital.value ? (
                            getVitalStatus(key, vital.value) === 'danger' ? 'border-red-500' :
                            getVitalStatus(key, vital.value) === 'warning' ? 'border-yellow-500' :
                            'border-green-500'
                          ) : ''
                        }
                      />
                      {previousValue && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <TrendingUp size={12} className="mr-1" />
                          Previous: {previousValue} {vital.unit}
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>
                  Provide additional details about your checkup
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Checkup Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="doctorName">Doctor Name (Optional)</Label>
                  <Input
                    id="doctorName"
                    placeholder="e.g., Dr. Smith"
                    value={formData.doctorName}
                    onChange={(e) => setFormData(prev => ({ ...prev, doctorName: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">How are you feeling?</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe how you're feeling or any symptoms..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="recommendations">Notes & Recommendations</Label>
                  <Textarea
                    id="recommendations"
                    placeholder="Any recommendations or notes..."
                    value={formData.recommendations}
                    onChange={(e) => setFormData(prev => ({ ...prev, recommendations: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                <Save size={16} className="mr-2" />
                {loading ? 'Saving...' : 'Save Checkup'}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HealthCheckup;
