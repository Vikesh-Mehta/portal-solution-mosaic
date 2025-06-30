
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AppointmentRemindersProps {
  appointments: any[];
}

const AppointmentReminders = ({ appointments }: AppointmentRemindersProps) => {
  const upcomingAppointments = appointments
    .filter(apt => {
      const appointmentDate = new Date(apt.appointment_date + 'T' + apt.appointment_time);
      return appointmentDate > new Date() && apt.status === 'scheduled';
    })
    .sort((a, b) => {
      const dateA = new Date(a.appointment_date + 'T' + a.appointment_time);
      const dateB = new Date(b.appointment_date + 'T' + b.appointment_time);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 3);

  const getTimeUntilAppointment = (appointment: any) => {
    const appointmentDate = new Date(appointment.appointment_date + 'T' + appointment.appointment_time);
    const now = new Date();
    const diffHours = Math.floor((appointmentDate.getTime() - now.getTime()) / (1000 * 3600));
    
    if (diffHours < 24) {
      return `In ${diffHours} hours`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `In ${diffDays} days`;
    }
  };

  const getUrgencyBadge = (appointment: any) => {
    const appointmentDate = new Date(appointment.appointment_date + 'T' + appointment.appointment_time);
    const now = new Date();
    const diffHours = Math.floor((appointmentDate.getTime() - now.getTime()) / (1000 * 3600));
    
    if (diffHours <= 2) {
      return <Badge variant="destructive">Very Soon</Badge>;
    } else if (diffHours <= 24) {
      return <Badge variant="secondary">Today</Badge>;
    } else if (diffHours <= 48) {
      return <Badge variant="outline">Tomorrow</Badge>;
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2" size={20} />
          Upcoming Appointments
        </CardTitle>
        <CardDescription>
          Your scheduled consultations and checkups
        </CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{appointment.appointment_type}</h4>
                  {getUrgencyBadge(appointment)}
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Video size={14} className="mr-1" />
                  <span className="mr-4">with {appointment.doctor_name}</span>
                  <Clock size={14} className="mr-1" />
                  <span>{getTimeUntilAppointment(appointment)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {new Date(appointment.appointment_date).toLocaleDateString()} at {appointment.appointment_time}
                  </span>
                  <Button size="sm" variant="outline">
                    <Phone size={14} className="mr-1" />
                    Join Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-muted-foreground mb-3">No upcoming appointments</p>
            <Link to="/virtual-consultation">
              <Button size="sm">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentReminders;
