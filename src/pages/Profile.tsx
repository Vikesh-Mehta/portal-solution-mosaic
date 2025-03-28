
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
  Pill // Import the Pill icon instead of using PillIcon
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Ravi Sharma',
    email: 'ravi.sharma@example.com',
    phone: '+91 98765 43210',
    dob: '15-05-1978',
    address: 'Village Chandpur, Dist. Bijnor, Uttar Pradesh',
    gender: 'Male',
    bloodGroup: 'B+',
    height: '172 cm',
    weight: '68 kg',
    allergies: 'None',
    chronicConditions: 'High Blood Pressure'
  });

  const [formData, setFormData] = useState({ ...userData });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUserData(formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData(userData);
    setEditMode(false);
  };

  const recentAppointments = [
    {
      id: 1,
      date: '03 Jun 2023',
      time: '10:30 AM',
      doctor: 'Dr. Ananya Singh',
      type: 'Virtual Consultation',
      status: 'Completed'
    },
    {
      id: 2,
      date: '15 May 2023',
      time: '11:00 AM',
      doctor: 'Smart Health Booth',
      type: 'Health Checkup',
      status: 'Completed'
    },
    {
      id: 3,
      date: '28 Apr 2023',
      time: '09:45 AM',
      doctor: 'Dr. Rajesh Kumar',
      type: 'Virtual Consultation',
      status: 'Completed'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      date: 'Tomorrow',
      time: '10:00 AM',
      doctor: 'Dr. Ananya Singh',
      type: 'Virtual Consultation',
      status: 'Scheduled'
    }
  ];

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
                    <h2 className="text-xl font-semibold">{userData.name}</h2>
                    <p className="text-sm text-muted-foreground">{userData.email}</p>
                  </div>
                  
                  {!editMode ? (
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Phone size={18} className="mr-3 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">{userData.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Calendar size={18} className="mr-3 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Date of Birth</p>
                          <p className="text-sm text-muted-foreground">{userData.dob}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin size={18} className="mr-3 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Address</p>
                          <p className="text-sm text-muted-foreground">{userData.address}</p>
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
                        <label className="text-sm font-medium mb-1 block">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full py-2 px-3 rounded-md bg-background border border-input focus:border-ring focus:ring-1 focus:ring-ring focus:outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
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
                          type="text"
                          name="dob"
                          value={formData.dob}
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
                  <button className="p-1 rounded-full hover:bg-muted/80 transition-colors">
                    <Edit size={16} />
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p className="text-sm font-medium">{userData.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Blood Group</p>
                      <p className="text-sm font-medium">{userData.bloodGroup}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Height</p>
                      <p className="text-sm font-medium">{userData.height}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="text-sm font-medium">{userData.weight}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Allergies</p>
                    <p className="text-sm font-medium">{userData.allergies || 'None reported'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Chronic Conditions</p>
                    <p className="text-sm font-medium">{userData.chronicConditions || 'None reported'}</p>
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
                  <button className="inline-flex items-center text-sm font-medium text-medical-600 dark:text-medical-400 hover:underline">
                    <PlusCircle size={16} className="mr-1" />
                    New Appointment
                  </button>
                </div>
                
                <div>
                  {upcomingAppointments.length > 0 ? (
                    <ul className="divide-y divide-border">
                      {upcomingAppointments.map(appointment => (
                        <li key={appointment.id}>
                          <div className="p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="bg-medical-50 dark:bg-medical-900/30 text-medical-600 dark:text-medical-400 p-2 rounded-md mr-3">
                                  <Calendar size={18} />
                                </div>
                                <div>
                                  <h4 className="font-medium">{appointment.type}</h4>
                                  <p className="text-sm text-muted-foreground">with {appointment.doctor}</p>
                                </div>
                              </div>
                              <span className="text-xs px-2 py-1 rounded-full bg-healing-100 text-healing-600 dark:bg-healing-900/30 dark:text-healing-400">
                                {appointment.status}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <div className="flex items-center mr-4">
                                <Calendar size={14} className="mr-1" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock size={14} className="mr-1" />
                                <span>{appointment.time}</span>
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
                      <button className="mt-2 text-sm text-medical-600 dark:text-medical-400 hover:underline">
                        Schedule an appointment
                      </button>
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
                  <ul className="divide-y divide-border">
                    {recentAppointments.map(appointment => (
                      <li key={appointment.id}>
                        <div className="p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="bg-muted p-2 rounded-md mr-3">
                                {appointment.type === 'Health Checkup' ? (
                                  <Activity size={18} className="text-muted-foreground" />
                                ) : (
                                  <Calendar size={18} className="text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium">{appointment.type}</h4>
                                <p className="text-sm text-muted-foreground">with {appointment.doctor}</p>
                              </div>
                            </div>
                            <span className="text-xs px-2 py-1 rounded-full bg-muted">
                              {appointment.status}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <div className="flex items-center mr-4">
                              <Calendar size={14} className="mr-1" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              <span>{appointment.time}</span>
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
                  <ul className="space-y-3">
                    {[
                      {
                        title: 'Health Checkup Report',
                        date: '03 Jun 2023',
                        summary: 'Routine health checkup - All parameters normal'
                      },
                      {
                        title: 'Blood Test Report',
                        date: '15 May 2023',
                        summary: 'Complete blood count and lipid profile'
                      },
                      {
                        title: 'Health Checkup Report',
                        date: '28 Apr 2023',
                        summary: 'Routine health checkup - Blood pressure slightly elevated'
                      }
                    ].map((report, index) => (
                      <li key={index}>
                        <button className="w-full flex items-start p-3 rounded-lg hover:bg-muted/50 transition-colors text-left">
                          <div className="p-2 rounded-md bg-muted mr-3">
                            <FileText size={16} className="text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{report.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{report.date}</p>
                            <p className="text-xs text-muted-foreground mt-1">{report.summary}</p>
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
                  {[
                    {
                      name: 'Amlodipine',
                      dosage: '5mg',
                      frequency: 'Once daily',
                      purpose: 'Blood pressure control',
                      startDate: '12 Jan 2023',
                      refillDate: '10 Jul 2023'
                    }
                  ].map((med, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{med.name} {med.dosage}</h4>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-healing-100 text-healing-600 dark:bg-healing-900/30 dark:text-healing-400 flex items-center">
                          <Check size={10} className="mr-1" />
                          Active
                        </span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex">
                          <div className="w-24 text-muted-foreground">Frequency:</div>
                          <div>{med.frequency}</div>
                        </div>
                        <div className="flex">
                          <div className="w-24 text-muted-foreground">Purpose:</div>
                          <div>{med.purpose}</div>
                        </div>
                        <div className="flex">
                          <div className="w-24 text-muted-foreground">Started:</div>
                          <div>{med.startDate}</div>
                        </div>
                        <div className="flex">
                          <div className="w-24 text-muted-foreground">Next Refill:</div>
                          <div className="text-medical-600 dark:text-medical-400">{med.refillDate}</div>
                        </div>
                      </div>
                    </div>
                  ))}
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
