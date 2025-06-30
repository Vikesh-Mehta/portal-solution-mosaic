
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VideoIcon, Calendar, Clock, ArrowLeft, CheckCircle, Star } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import VirtualDoctorCard from '@/components/ui/VirtualDoctorCard';
import { useUserAppointments } from '@/hooks/useUserAppointments';
import { useToast } from '@/hooks/use-toast';

const VirtualConsultation = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { addAppointment } = useUserAppointments();
  const { toast } = useToast();
  
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [appointmentData, setAppointmentData] = useState({
    appointmentType: '',
    appointmentDate: '',
    appointmentTime: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const doctors = [
    {
      id: 'dr-1',
      name: 'Dr. Ananya Singh',
      specialty: 'General Physician',
      availability: 'Available' as const,
      rating: 4.8,
      experience: '12 years',
      qualifications: ['MBBS', 'MD Internal Medicine'],
      languages: ['English', 'Hindi', 'Tamil'],
      consultationFee: 500
    },
    {
      id: 'dr-2',
      name: 'Dr. Rajesh Kumar',
      specialty: 'Cardiologist',
      availability: 'Busy' as const,
      rating: 4.9,
      experience: '15 years',
      qualifications: ['MBBS', 'MD Cardiology', 'DM Cardiology'],
      languages: ['English', 'Hindi'],
      consultationFee: 800
    },
    {
      id: 'dr-3',
      name: 'Dr. Priya Patel',
      specialty: 'Pediatrician',
      availability: 'Available' as const,
      rating: 4.7,
      experience: '10 years',
      qualifications: ['MBBS', 'MD Pediatrics'],
      languages: ['English', 'Hindi', 'Gujarati'],
      consultationFee: 600
    },
    {
      id: 'dr-4',
      name: 'Dr. Amit Sharma',
      specialty: 'Dermatologist',
      availability: 'Available' as const,
      rating: 4.6,
      experience: '8 years',
      qualifications: ['MBBS', 'MD Dermatology'],
      languages: ['English', 'Hindi'],
      consultationFee: 700
    }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30'
  ];

  useEffect(() => {
    if (doctorId) {
      const doctor = doctors.find(d => d.id === doctorId);
      setSelectedDoctor(doctor);
    }
  }, [doctorId]);

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
    navigate(`/virtual-consultation/${doctor.id}`);
  };

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor) return;
    
    setLoading(true);
    
    try {
      const result = await addAppointment({
        doctor_name: selectedDoctor.name,
        appointment_type: appointmentData.appointmentType,
        appointment_date: appointmentData.appointmentDate,
        appointment_time: appointmentData.appointmentTime,
        status: 'scheduled',
        notes: appointmentData.notes || null
      });
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      toast({
        title: "Appointment booked",
        description: `Your consultation with ${selectedDoctor.name} has been scheduled.`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="mb-4"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold mb-2">Virtual Consultation</h1>
            <p className="text-muted-foreground">
              {selectedDoctor 
                ? `Book an appointment with ${selectedDoctor.name}`
                : 'Choose a doctor and book your virtual consultation'
              }
            </p>
          </div>

          {!selectedDoctor ? (
            // Doctor Selection View
            <div>
              <h2 className="text-xl font-semibold mb-6">Available Doctors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map(doctor => (
                  <div key={doctor.id} onClick={() => handleDoctorSelect(doctor)} className="cursor-pointer">
                    <VirtualDoctorCard 
                      id={doctor.id}
                      name={doctor.name}
                      specialty={doctor.specialty}
                      availability={doctor.availability}
                      rating={doctor.rating}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Appointment Booking View
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Doctor Details */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center">
                        <VideoIcon size={24} className="text-medical-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{selectedDoctor.name}</CardTitle>
                        <CardDescription>{selectedDoctor.specialty}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Rating</span>
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{selectedDoctor.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Experience</span>
                      <span className="font-medium">{selectedDoctor.experience}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Fee</span>
                      <span className="font-medium">₹{selectedDoctor.consultationFee}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge variant={selectedDoctor.availability === 'Available' ? 'default' : 'secondary'}>
                        {selectedDoctor.availability}
                      </Badge>
                    </div>
                    
                    <div>
                      <span className="text-sm text-muted-foreground block mb-2">Qualifications</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedDoctor.qualifications.map((qual: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">{qual}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm text-muted-foreground block mb-2">Languages</span>
                      <span className="text-sm">{selectedDoctor.languages.join(', ')}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Appointment Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2" />
                      Book Appointment
                    </CardTitle>
                    <CardDescription>
                      Schedule your virtual consultation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBookAppointment} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="appointmentType">Consultation Type</Label>
                        <Select
                          value={appointmentData.appointmentType}
                          onValueChange={(value) => setAppointmentData(prev => ({ ...prev, appointmentType: value }))}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select consultation type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general-consultation">General Consultation</SelectItem>
                            <SelectItem value="follow-up">Follow-up</SelectItem>
                            <SelectItem value="second-opinion">Second Opinion</SelectItem>
                            <SelectItem value="prescription-renewal">Prescription Renewal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="appointmentDate">Date</Label>
                          <Input
                            id="appointmentDate"
                            type="date"
                            min={getTomorrowDate()}
                            value={appointmentData.appointmentDate}
                            onChange={(e) => setAppointmentData(prev => ({ ...prev, appointmentDate: e.target.value }))}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="appointmentTime">Time</Label>
                          <Select
                            value={appointmentData.appointmentTime}
                            onValueChange={(value) => setAppointmentData(prev => ({ ...prev, appointmentTime: value }))}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map(time => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          placeholder="Describe your symptoms or concerns..."
                          value={appointmentData.notes}
                          onChange={(e) => setAppointmentData(prev => ({ ...prev, notes: e.target.value }))}
                        />
                      </div>

                      <div className="flex justify-end space-x-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setSelectedDoctor(null)}
                        >
                          Change Doctor
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={loading || selectedDoctor.availability === 'Busy'}
                        >
                          <CheckCircle size={16} className="mr-2" />
                          {loading ? 'Booking...' : 'Book Appointment'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VirtualConsultation;
