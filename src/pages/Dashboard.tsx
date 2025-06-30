
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Droplet, 
  Waves, 
  Activity, 
  ChevronRight, 
  VideoIcon,
  PillIcon,
  Settings,
  Bell
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HealthMetricCard from '@/components/ui/HealthMetricCard';
import VirtualDoctorCard from '@/components/ui/VirtualDoctorCard';
import HealthInsights from '@/components/dashboard/HealthInsights';
import QuickStats from '@/components/dashboard/QuickStats';
import AppointmentReminders from '@/components/dashboard/AppointmentReminders';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useUserHealthRecords } from '@/hooks/useUserHealthRecords';
import { useUserAppointments } from '@/hooks/useUserAppointments';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { profile, loading: profileLoading } = useUserProfile();
  const { records, loading: recordsLoading } = useUserHealthRecords();
  const { appointments, loading: appointmentsLoading } = useUserAppointments();
  
  const loading = profileLoading || recordsLoading || appointmentsLoading;

  // Get latest health metrics from the most recent health record
  const latestHealthRecord = records.find(record => 
    record.record_type === 'checkup' && record.vital_signs
  );

  const healthMetrics = latestHealthRecord?.vital_signs || {
    heartRate: { value: '--', unit: 'bpm', status: 'normal' as const },
    bloodPressure: { value: '--', unit: 'mmHg', status: 'normal' as const },
    bloodSugar: { value: '--', unit: 'mg/dL', status: 'normal' as const },
    oxygenLevel: { value: '--', unit: '%', status: 'normal' as const }
  };

  // Get recent health activities
  const recentActivities = records.slice(0, 4).map(record => ({
    id: record.id,
    type: record.record_type,
    title: record.title,
    date: new Date(record.date_recorded).toLocaleDateString(),
    description: record.description || 'No description available',
    icon: record.record_type === 'checkup' ? 
      <Activity size={16} className="text-medical-500" /> :
      record.record_type === 'consultation' ?
      <VideoIcon size={16} className="text-medical-500" /> :
      <PillIcon size={16} className="text-medical-500" />
  }));

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
      availability: 'Available' as const,
      rating: 4.9
    }
  ];

  const userName = profile ? 
    `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 
    profile.email.split('@')[0] : 
    'User';

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
                    <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}</h1>
                    <p className="text-muted-foreground">
                      Here's your health overview and recent activities
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center space-x-3">
                    <Button variant="outline" size="sm">
                      <Bell size={16} className="mr-2" />
                      Notifications
                    </Button>
                    <Link to="/profile">
                      <Button variant="outline" size="sm">
                        <Settings size={16} className="mr-2" />
                        Settings
                      </Button>
                    </Link>
                    <Link to="/health-checkup">
                      <Button>
                        <Activity size={16} className="mr-2" />
                        New Checkup
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mb-8">
                <QuickStats records={records} appointments={appointments} />
              </div>

              {/* Health Metrics Section */}
              <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Latest Vital Signs</h2>
                  <Link 
                    to="/health-checkup"
                    className="text-sm font-medium text-medical-600 dark:text-medical-400 hover:underline flex items-center"
                  >
                    <span>Record New</span>
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <HealthMetricCard
                    title="Heart Rate"
                    value={healthMetrics.heartRate?.value || '--'}
                    unit={healthMetrics.heartRate?.unit || 'bpm'}
                    status={healthMetrics.heartRate?.status || 'normal'}
                    icon={<Heart size={20} />}
                    description={healthMetrics.heartRate?.value !== '--' ? "Normal resting heart rate" : "No recent data"}
                  />
                  <HealthMetricCard
                    title="Blood Pressure"
                    value={healthMetrics.bloodPressure?.value || '--'}
                    unit={healthMetrics.bloodPressure?.unit || 'mmHg'}
                    status={healthMetrics.bloodPressure?.status || 'normal'}
                    icon={<Activity size={20} />}
                    description={healthMetrics.bloodPressure?.value !== '--' ? "Healthy range" : "No recent data"}
                  />
                  <HealthMetricCard
                    title="Blood Sugar"
                    value={healthMetrics.bloodSugar?.value || '--'}
                    unit={healthMetrics.bloodSugar?.unit || 'mg/dL'}
                    status={healthMetrics.bloodSugar?.status || 'normal'}
                    icon={<Droplet size={20} />}
                    description={healthMetrics.bloodSugar?.value !== '--' ? "Fasting glucose level" : "No recent data"}
                  />
                  <HealthMetricCard
                    title="Oxygen Level"
                    value={healthMetrics.oxygenLevel?.value || '--'}
                    unit={healthMetrics.oxygenLevel?.unit || '%'}
                    status={healthMetrics.oxygenLevel?.status || 'normal'}
                    icon={<Waves size={20} />}
                    description={healthMetrics.oxygenLevel?.value !== '--' ? "SpO2 measurement" : "No recent data"}
                  />
                </div>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Health Insights */}
                  <HealthInsights records={records} />

                  {/* Available Doctors Section */}
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
                      <h2 className="text-xl font-semibold">Recent Health Activity</h2>
                    </div>
                    
                    <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
                      {recentActivities.length > 0 ? (
                        <ul className="divide-y divide-border">
                          {recentActivities.map(activity => (
                            <li key={activity.id}>
                              <div className="p-4 hover:bg-muted/50 transition-colors">
                                <div className="flex items-start">
                                  <div className="p-2 rounded-full bg-muted mr-3 mt-0.5">
                                    {activity.icon}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <h3 className="font-medium">{activity.title}</h3>
                                      <span className="text-xs text-muted-foreground">
                                        {activity.date}
                                      </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {activity.description.length > 100 
                                        ? `${activity.description.substring(0, 100)}...` 
                                        : activity.description
                                      }
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="p-6 text-center">
                          <Activity className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground mb-3">No health activities yet</p>
                          <Link to="/health-checkup">
                            <Button size="sm">
                              Start your first health checkup
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Appointment Reminders */}
                  <AppointmentReminders appointments={appointments} />

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
                          <span className="font-medium">Record Health Data</span>
                        </Link>
                        <Link
                          to="/virtual-consultation"
                          className="flex items-center p-3 hover:bg-muted/50 rounded-lg transition-colors"
                        >
                          <div className="p-2 rounded-full bg-medical-50 dark:bg-medical-900/30 mr-3">
                            <VideoIcon size={18} className="text-medical-600 dark:text-medical-400" />
                          </div>
                          <span className="font-medium">Book Consultation</span>
                        </Link>
                        <Link
                          to="/medicine-advisor"
                          className="flex items-center p-3 hover:bg-muted/50 rounded-lg transition-colors"
                        >
                          <div className="p-2 rounded-full bg-amber-50 dark:bg-amber-900/30 mr-3">
                            <PillIcon size={18} className="text-amber-600 dark:text-amber-400" />
                          </div>
                          <span className="font-medium">Medicine Guide</span>
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
