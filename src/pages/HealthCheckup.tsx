
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Droplet, Waves, Activity, Save, ArrowLeft } from 'lucide-react';
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
  const { addHealthRecord } = useUserHealthRecords();
  const { toast } = useToast();
  
  const [vitalSigns, setVitalSigns] = useState({
    heartRate: { value: '', unit: 'bpm', status: 'normal' as const },
    bloodPressure: { value: '', unit: 'mmHg', status: 'normal' as const },
    bloodSugar: { value: '', unit: 'mg/dL', status: 'normal' as const },
    oxygenLevel: { value: '', unit: '%', status: 'normal' as const }
  });
  
  const [formData, setFormData] = useState({
    title: 'Regular Health Checkup',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await addHealthRecord({
        record_type: 'checkup',
        title: formData.title,
        description: formData.description,
        doctor_name: formData.doctorName || null,
        date_recorded: new Date().toISOString().split('T')[0],
        vital_signs: vitalSigns,
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
            {/* Vital Signs Section */}
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
                <div className="space-y-2">
                  <Label htmlFor="heartRate" className="flex items-center">
                    <Heart size={16} className="mr-2 text-red-500" />
                    Heart Rate (bpm)
                  </Label>
                  <Input
                    id="heartRate"
                    type="number"
                    placeholder="e.g., 72"
                    value={vitalSigns.heartRate.value}
                    onChange={(e) => handleVitalChange('heartRate', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bloodPressure" className="flex items-center">
                    <Activity size={16} className="mr-2 text-blue-500" />
                    Blood Pressure (mmHg)
                  </Label>
                  <Input
                    id="bloodPressure"
                    placeholder="e.g., 120/80"
                    value={vitalSigns.bloodPressure.value}
                    onChange={(e) => handleVitalChange('bloodPressure', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bloodSugar" className="flex items-center">
                    <Droplet size={16} className="mr-2 text-orange-500" />
                    Blood Sugar (mg/dL)
                  </Label>
                  <Input
                    id="bloodSugar"
                    type="number"
                    placeholder="e.g., 95"
                    value={vitalSigns.bloodSugar.value}
                    onChange={(e) => handleVitalChange('bloodSugar', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="oxygenLevel" className="flex items-center">
                    <Waves size={16} className="mr-2 text-cyan-500" />
                    Oxygen Level (%)
                  </Label>
                  <Input
                    id="oxygenLevel"
                    type="number"
                    placeholder="e.g., 98"
                    value={vitalSigns.oxygenLevel.value}
                    onChange={(e) => handleVitalChange('oxygenLevel', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
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
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe how you're feeling or any symptoms..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="recommendations">Recommendations</Label>
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
