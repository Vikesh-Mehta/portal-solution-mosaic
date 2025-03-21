
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Droplet, 
  Waves, 
  Activity, 
  Clock, 
  Calendar, 
  ChevronRight, 
  CalendarDays,
  VideoIcon,
  PillIcon
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HealthMetricCard from '@/components/ui/HealthMetricCard';
import VirtualDoctorCard from '@/components/ui/VirtualDoctorCard';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: 'Ravi Sharma',
    age: 45,
    lastCheckup: '2 days ago',
    nextAppointment: 'Tomorrow, 10:00 AM',
    metrics: {
      heartRate: { value: 72, unit: 'bpm', status: 'normal' as const },
      bloodPressure: { value: '126/82', unit: 'mmHg', status: 'normal' as const },
      bloodSugar: { value: 110, unit: 'mg/dL', status: 'normal' as const },
      oxygenLevel: { value: 98, unit: '%', status: 'normal' as const }
    }
  });

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const doctors = [
    {
      id: 'dr-1',
      name: 'Dr. Ananya Singh',
      specialty: 'General Physician',
      availability: 'Available' as const,
      rating: 4.8
    },
    {
      id: 'dr-2',
      name: 'Dr. Rajesh Kumar',
      specialty: 'Cardiologist',
      availability: 'Busy' as const,
      rating: 4.9
    },
    {
      id: 'dr-3',
      name: 'Dr. Priya Patel',
      specialty: 'Pediatrician',
      availability: 'Available' as const,
      rating: 4.7
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'checkup',
      title: 'Health Checkup',
      date: '2 days ago',
      description: 'Blood pressure, heart rate, and oxygen levels measured',
      icon: <Activity size={16} className="text-medical-500" />
    },
    {
      id: 2,
      type: 'consultation',
      title: 'Virtual Consultation',
      date: '5 days ago',
      description: 'Consulted with Dr. Ananya about recurring headaches',
      icon: <VideoIcon size={16} className="text-medical-500" />
    },
    {
      id: 3,
      type: 'medication',
      title: 'Medication Dispensed',
      date: '5 days ago',
      description: 'Prescribed paracetamol for headache relief',
      icon: <PillIcon size={16} className="text-medical-500" />
    },
    {
      id: 4,
      type: 'checkup',
      title: 'Health Checkup',
      date: '2 weeks ago',
      description: 'Full health assessment including ECG',
      icon: <Activity size={16} className="text-medical-500" />
    }
  ];

  const upcomingReminders = [
    {
      id: 1,
      title: 'Virtual Consultation',
      date: 'Tomorrow, 10:00 AM',
      description: 'Follow-up with Dr. Ananya Singh',
      icon: <VideoIcon size={16} className="text-healing-500" />
    },
    {
      id: 2,
      title: 'Medication Reminder',
      date: 'Today, 08:00 PM',
      description: 'Take blood pressure medication',
      icon: <PillIcon size={16} className="text-healing-500" />
    },
    {
      id: 3,
      title: 'Health Checkup Due',
      date: 'In 3 days',
      description: 'Regular monthly checkup at Smart Health Booth',
      icon: <Activity size={16} className="text-healing-500" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 md:px-6 mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <div className="w-12 h-12 border-4 border-medical-200 border-t-medical-600 rounded-full animate-spin"></div>
              <p className="text-muted-foreground mt-4">Loading your health dashboard...</p>
            </div>
          ) : (
            <>
              {/* Header Section */}
              <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Welcome, {userData.name}</h1>
                    <p className="text-muted-foreground">
                      Here's a summary of your health stats and recent activities
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center space-x-3">
                    <div className="text-sm text-muted-foreground">
                      <span className="block">Last checkup: {userData.lastCheckup}</span>
                      <span className="block mt-1">Next appointment: {userData.nextAppointment}</span>
                    </div>
                    <Link 
                      to="/health-checkup"
                      className="bg-medical-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-medical-700 transition-colors"
                    >
                      New Checkup
                    </Link>
                  </div>
                </div>
              </div>

              {/* Health Metrics Section */}
              <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Health Metrics</h2>
                  <Link 
                    to="/health-checkup"
                    className="text-sm font-medium text-medical-600 dark:text-medical-400 hover:underline flex items-center"
                  >
                    <span>View Details</span>
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <HealthMetricCard
                    title="Heart Rate"
                    value={userData.metrics.heartRate.value}
                    unit={userData.metrics.heartRate.unit}
                    status={userData.metrics.heartRate.status}
                    icon={<Heart size={20} />}
                    description="Normal resting heart rate"
                  />
                  <HealthMetricCard
                    title="Blood Pressure"
                    value={userData.metrics.bloodPressure.value}
                    unit={userData.metrics.bloodPressure.unit}
                    status={userData.metrics.bloodPressure.status}
                    icon={<Activity size={20} />}
                    description="Healthy range"
                  />
                  <HealthMetricCard
                    title="Blood Sugar"
                    value={userData.metrics.bloodSugar.value}
                    unit={userData.metrics.bloodSugar.unit}
                    status={userData.metrics.bloodSugar.status}
                    icon={<Droplet size={20} />}
                    description="Fasting glucose level"
                  />
                  <HealthMetricCard
                    title="Oxygen Level"
                    value={userData.metrics.oxygenLevel.value}
                    unit={userData.metrics.oxygenLevel.unit}
                    status={userData.metrics.oxygenLevel.status}
                    icon={<Waves size={20} />}
                    description="SpO2 measurement"
                  />
                </div>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Virtual Doctors Section */}
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">Available Doctors</h2>
                      <Link 
                        to="/virtual-consultation"
                        className="text-sm font-medium text-medical-600 dark:text-medical-400 hover:underline flex items-center"
                      >
                        <span>View All</span>
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {doctors.map(doctor => (
                        <VirtualDoctorCard 
                          key={doctor.id}
                          id={doctor.id}
                          name={doctor.name}
                          specialty={doctor.specialty}
                          availability={doctor.availability}
                          rating={doctor.rating}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Recent Activity Section */}
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">Recent Activity</h2>
                      <button className="text-sm font-medium text-medical-600 dark:text-medical-400 hover:underline flex items-center">
                        <span>View All</span>
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                    
                    <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
                      <ul className="divide-y divide-border">
                        {recentActivities.map(activity => (
                          <li key={activity.id}>
                            <div className="p-4 hover:bg-muted/50 transition-colors">
                              <div className="flex items-start">
                                <div className="p-2 rounded-full bg-muted mr-3 mt-0.5">
                                  {activity.icon}
                                </div>
                                <div>
                                  <div className="flex items-center">
                                    <h3 className="font-medium">{activity.title}</h3>
                                    <span className="ml-2 text-xs text-muted-foreground">
                                      {activity.date}
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {activity.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Calendar Section */}
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">Upcoming</h2>
                      <button className="text-sm font-medium text-medical-600 dark:text-medical-400 hover:underline flex items-center">
                        <span>View Calendar</span>
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                    
                    <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
                      <div className="p-4 bg-muted/50 border-b border-border flex items-center justify-between">
                        <h3 className="font-medium flex items-center">
                          <Calendar size={18} className="mr-2" />
                          Reminders & Appointments
                        </h3>
                        <button className="p-1 rounded-full hover:bg-muted/80 transition-colors">
                          <CalendarDays size={16} />
                        </button>
                      </div>
                      <ul className="divide-y divide-border">
                        {upcomingReminders.map(reminder => (
                          <li key={reminder.id}>
                            <div className="p-4 hover:bg-muted/50 transition-colors">
                              <div className="flex items-start">
                                <div className="p-2 rounded-full bg-muted/70 mr-3 mt-0.5">
                                  {reminder.icon}
                                </div>
                                <div>
                                  <div className="flex items-center">
                                    <h3 className="font-medium">{reminder.title}</h3>
                                  </div>
                                  <p className="text-xs text-medical-600 dark:text-medical-400 font-medium flex items-center mt-1">
                                    <Clock size={12} className="mr-1" />
                                    {reminder.date}
                                  </p>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {reminder.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  {/* Quick Actions Section */}
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">Quick Actions</h2>
                    </div>
                    
                    <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
                      <div className="p-1">
                        <Link
                          to="/health-checkup"
                          className="flex items-center p-3 hover:bg-muted/50 rounded-lg transition-colors"
                        >
                          <div className="p-2 rounded-full bg-healing-50 dark:bg-healing-900/30 mr-3">
                            <Activity size={18} className="text-healing-600 dark:text-healing-400" />
                          </div>
                          <span className="font-medium">New Health Checkup</span>
                        </Link>
                        <Link
                          to="/virtual-consultation"
                          className="flex items-center p-3 hover:bg-muted/50 rounded-lg transition-colors"
                        >
                          <div className="p-2 rounded-full bg-medical-50 dark:bg-medical-900/30 mr-3">
                            <VideoIcon size={18} className="text-medical-600 dark:text-medical-400" />
                          </div>
                          <span className="font-medium">Virtual Consultation</span>
                        </Link>
                        <Link
                          to="/medicine-advisor"
                          className="flex items-center p-3 hover:bg-muted/50 rounded-lg transition-colors"
                        >
                          <div className="p-2 rounded-full bg-amber-50 dark:bg-amber-900/30 mr-3">
                            <PillIcon size={18} className="text-amber-600 dark:text-amber-400" />
                          </div>
                          <span className="font-medium">Medicine Advisor</span>
                        </Link>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
