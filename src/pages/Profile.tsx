
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  PlusCircle,
  Clock,
  FileText,
  Activity,
  Check,
  Pill
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useUserHealthRecords } from '@/hooks/useUserHealthRecords';
import { useUserAppointments } from '@/hooks/useUserAppointments';
import { toast } from 'sonner';

const Profile = () => {
  const { profile, loading, updateProfile } = useUserProfile();
  const { records } = useUserHealthRecords();
  const { appointments } = useUserAppointments();
  
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    address: '',
    gender: '',
    blood_group: '',
    height_cm: '',
    weight_kg: '',
    allergies: '',
    medical_conditions: ''
  });

  // Update form data when profile loads
  useState(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        date_of_birth: profile.date_of_birth || '',
        address: profile.address || '',
        gender: profile.gender || '',
        blood_group: profile.blood_group || '',
        height_cm: profile.height_cm?.toString() || '',
        weight_kg: profile.weight_kg?.toString() || '',
        allergies: profile.allergies?.join(', ') || '',
        medical_conditions: profile.medical_conditions?.join(', ') || ''
      });
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updates = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        date_of_birth: formData.date_of_birth,
        address: formData.address,
        gender: formData.gender,
        blood_group: formData.blood_group,
        height_cm: formData.height_cm ? parseInt(formData.height_cm) : null,
        weight_kg: formData.weight_kg ? parseFloat(formData.weight_kg) : null,
        allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()) : [],
        medical_conditions: formData.medical_conditions ? formData.medical_conditions.split(',').map(s => s.trim()) : []
      };

      const { error } = await updateProfile(updates);
      
      if (error) {
        toast.error(error);
      } else {
        toast.success('Profile updated successfully!');
        setEditMode(false);
      }
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        date_of_birth: profile.date_of_birth || '',
        address: profile.address || '',
        gender: profile.gender || '',
        blood_group: profile.blood_group || '',
        height_cm: profile.height_cm?.toString() || '',
        weight_kg: profile.weight_kg?.toString() || '',
        allergies: profile.allergies?.join(', ') || '',
        medical_conditions: profile.medical_conditions?.join(', ') || ''
      });
    }
    setEditMode(false);
  };

  // Get upcoming and recent appointments
  const upcomingAppointments = appointments.filter(apt => {
    const appointmentDate = new Date(apt.appointment_date + 'T' + apt.appointment_time);
    return appointmentDate > new Date() && apt.status === 'scheduled';
  });

  const recentAppointments = appointments.filter(apt => {
    const appointmentDate = new Date(apt.appointment_date + 'T' + apt.appointment_time);
    return appointmentDate <= new Date() || apt.status === 'completed';
  }).slice(0, 3);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-24 pb-12 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-medical-200 border-t-medical-600 rounded-full animate-spin"></div>
        </main>
        <Footer />
      </div>
    );
  }

  const userName = profile ? 
    `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 
    profile.email.split('@')[0] : 
    'User';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                      <User size={40} className="text-muted-foreground/60" />
                    </div>
                    <h2 className="text-xl font-semibold">{userName}</h2>
                    <p className="text-sm text-muted-foreground">{profile?.email}</p>
                  </div>
                  
                  {!editMode ? (
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Phone size={18} className="mr-3 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">{profile?.phone || 'Not provided'}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Calendar size={18} className="mr-3 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Date of Birth</p>
                          <p className="text-sm text-muted-foreground">
                            {profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : 'Not provided'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin size={18} className="mr-3 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Address</p>
                          <p className="text-sm text-muted-foreground">{profile?.address || 'Not provided'}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setEditMode(true)}
                        className="w-full flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                      >
                        <Edit size={16} className="mr-2" />
                        Edit Profile
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">First Name</label>
                        <input
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleInputChange}
                          className="w-full py-2 px-3 rounded-md bg-background border border-input focus:border-ring focus:ring-1 focus:ring-ring focus:outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Last Name</label>
                        <input
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleInputChange}
                          className="w-full py-2 px-3 rounded-md bg-background border border-input focus:border-ring focus:ring-1 focus:ring-ring focus:outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full py-2 px-3 rounded-md bg-background border border-input focus:border-ring focus:ring-1 focus:ring-ring focus:outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Date of Birth</label>
                        <input
                          type="date"
                          name="date_of_birth"
                          value={formData.date_of_birth}
                          onChange={handleInputChange}
                          className="w-full py-2 px-3 rounded-md bg-background border border-input focus:border-ring focus:ring-1 focus:ring-ring focus:outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full py-2 px-3 rounded-md bg-background border border-input focus:border-ring focus:ring-1 focus:ring-ring focus:outline-none text-sm"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={handleSave}
                          className="flex-1 flex items-center justify-center rounded-lg bg-medical-600 px-4 py-2 text-sm font-medium text-white hover:bg-medical-700 transition-colors"
                        >
                          <Save size={16} className="mr-2" />
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex-1 flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-medium">Medical Information</h3>
                  <button 
                    onClick={() => setEditMode(true)}
                    className="p-1 rounded-full hover:bg-muted/80 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p className="text-sm font-medium">{profile?.gender || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Blood Group</p>
                      <p className="text-sm font-medium">{profile?.blood_group || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Height</p>
                      <p className="text-sm font-medium">{profile?.height_cm ? `${profile.height_cm} cm` : 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="text-sm font-medium">{profile?.weight_kg ? `${profile.weight_kg} kg` : 'Not specified'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Allergies</p>
                    <p className="text-sm font-medium">
                      {profile?.allergies && profile.allergies.length > 0 ? profile.allergies.join(', ') : 'None reported'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Medical Conditions</p>
                    <p className="text-sm font-medium">
                      {profile?.medical_conditions && profile.medical_conditions.length > 0 ? 
                        profile.medical_conditions.join(', ') : 'None reported'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Appointments and Reports Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Appointments */}
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-medium flex items-center">
                    <Calendar size={18} className="mr-2 text-medical-600" />
                    Upcoming Appointments
                  </h3>
                  <Link
                    to="/virtual-consultation"
                    className="inline-flex items-center text-sm font-medium text-medical-600 dark:text-medical-400 hover:underline"
                  >
                    <PlusCircle size={16} className="mr-1" />
                    New Appointment
                  </Link>
                </div>
                
                <div>
                  {upcomingAppointments.length > 0 ? (
                    <ul className="divide-y divide-border">
                      {upcomingAppointments.slice(0, 3).map(appointment => (
                        <li key={appointment.id}>
                          <div className="p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="bg-medical-50 dark:bg-medical-900/30 text-medical-600 dark:text-medical-400 p-2 rounded-md mr-3">
                                  <Calendar size={18} />
                                </div>
                                <div>
                                  <h4 className="font-medium">{appointment.appointment_type}</h4>
                                  <p className="text-sm text-muted-foreground">with {appointment.doctor_name}</p>
                                </div>
                              </div>
                              <span className="text-xs px-2 py-1 rounded-full bg-healing-100 text-healing-600 dark:bg-healing-900/30 dark:text-healing-400">
                                {appointment.status}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <div className="flex items-center mr-4">
                                <Calendar size={14} className="mr-1" />
                                <span>{new Date(appointment.appointment_date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock size={14} className="mr-1" />
                                <span>{appointment.appointment_time}</span>
                              </div>
                            </div>
                            <div className="mt-3 flex justify-end space-x-2">
                              <button className="text-xs px-3 py-1 rounded-md border border-border hover:bg-muted transition-colors">
                                Reschedule
                              </button>
                              <Link 
                                to="/virtual-consultation" 
                                className="text-xs px-3 py-1 rounded-md bg-medical-600 text-white hover:bg-medical-700 transition-colors"
                              >
                                Join
                              </Link>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-muted-foreground">No upcoming appointments</p>
                      <Link
                        to="/virtual-consultation"
                        className="mt-2 text-sm text-medical-600 dark:text-medical-400 hover:underline"
                      >
                        Schedule an appointment
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Recent Appointments */}
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-medium flex items-center">
                    <Clock size={18} className="mr-2 text-medical-600" />
                    Recent Appointments
                  </h3>
                  <button className="text-sm font-medium text-medical-600 dark:text-medical-400 hover:underline">
                    View All
                  </button>
                </div>
                
                <div>
                  {recentAppointments.length > 0 ? (
                    <ul className="divide-y divide-border">
                      {recentAppointments.map(appointment => (
                        <li key={appointment.id}>
                          <div className="p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="bg-muted p-2 rounded-md mr-3">
                                  {appointment.appointment_type === 'Health Checkup' ? (
                                    <Activity size={18} className="text-muted-foreground" />
                                  ) : (
                                    <Calendar size={18} className="text-muted-foreground" />
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-medium">{appointment.appointment_type}</h4>
                                  <p className="text-sm text-muted-foreground">with {appointment.doctor_name}</p>
                                </div>
                              </div>
                              <span className="text-xs px-2 py-1 rounded-full bg-muted">
                                {appointment.status}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <div className="flex items-center mr-4">
                                <Calendar size={14} className="mr-1" />
                                <span>{new Date(appointment.appointment_date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock size={14} className="mr-1" />
                                <span>{appointment.appointment_time}</span>
                              </div>
                            </div>
                            <div className="mt-3 flex justify-end">
                              <button className="text-xs px-3 py-1 rounded-md border border-border hover:bg-muted transition-colors">
                                View Details
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-muted-foreground">No recent appointments</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Medical Reports */}
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-medium flex items-center">
                    <FileText size={18} className="mr-2 text-medical-600" />
                    Medical Reports
                  </h3>
                  <button className="text-sm font-medium text-medical-600 dark:text-medical-400 hover:underline">
                    View All
                  </button>
                </div>
                
                <div className="p-4">
                  {records.length > 0 ? (
                    <ul className="space-y-3">
                      {records.slice(0, 3).map((record) => (
                        <li key={record.id}>
                          <button className="w-full flex items-start p-3 rounded-lg hover:bg-muted/50 transition-colors text-left">
                            <div className="p-2 rounded-md bg-muted mr-3">
                              <FileText size={16} className="text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{record.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(record.date_recorded).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {record.description || 'No description available'}
                              </p>
                            </div>
                            <div className="ml-4">
                              <svg className="w-5 h-5 text-medical-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-muted-foreground">No medical reports yet</p>
                      <Link
                        to="/health-checkup"
                        className="mt-2 text-sm text-medical-600 dark:text-medical-400 hover:underline"
                      >
                        Start your first health checkup
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Medication */}
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-medium flex items-center">
                    <Pill size={18} className="mr-2 text-medical-600" />
                    Current Medications
                  </h3>
                  <Link
                    to="/medicine-advisor"
                    className="text-sm font-medium text-medical-600 dark:text-medical-400 hover:underline"
                  >
                    Medicine Advisor
                  </Link>
                </div>
                
                <div className="p-4">
                  {profile?.current_medications && profile.current_medications.length > 0 ? (
                    <div className="space-y-3">
                      {profile.current_medications.map((medication, index) => (
                        <div key={index} className="border border-border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">{medication}</h4>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-healing-100 text-healing-600 dark:bg-healing-900/30 dark:text-healing-400 flex items-center">
                              <Check size={10} className="mr-1" />
                              Active
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-muted-foreground">No current medications</p>
                      <Link
                        to="/medicine-advisor"
                        className="mt-2 text-sm text-medical-600 dark:text-medical-400 hover:underline"
                      >
                        Get medicine recommendations
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
