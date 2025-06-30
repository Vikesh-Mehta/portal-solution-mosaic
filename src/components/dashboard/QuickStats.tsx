
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Activity, FileText, Clock } from 'lucide-react';

interface QuickStatsProps {
  records: any[];
  appointments: any[];
}

const QuickStats = ({ records, appointments }: QuickStatsProps) => {
  const totalRecords = records.length;
  const upcomingAppointments = appointments.filter(apt => {
    const appointmentDate = new Date(apt.appointment_date + 'T' + apt.appointment_time);
    return appointmentDate > new Date() && apt.status === 'scheduled';
  }).length;
  
  const lastCheckup = records.find(r => r.record_type === 'checkup');
  const daysSinceLastCheckup = lastCheckup 
    ? Math.floor((new Date().getTime() - new Date(lastCheckup.date_recorded).getTime()) / (1000 * 3600 * 24))
    : null;

  const thisMonthRecords = records.filter(r => {
    const recordDate = new Date(r.date_recorded);
    const now = new Date();
    return recordDate.getMonth() === now.getMonth() && recordDate.getFullYear() === now.getFullYear();
  }).length;

  const stats = [
    {
      title: 'Total Records',
      value: totalRecords,
      icon: <FileText size={20} />,
      color: 'bg-blue-500'
    },
    {
      title: 'Upcoming Appointments',
      value: upcomingAppointments,
      icon: <Calendar size={20} />,
      color: 'bg-green-500'
    },
    {
      title: 'This Month',
      value: thisMonthRecords,
      icon: <Activity size={20} />,
      color: 'bg-purple-500'
    },
    {
      title: 'Days Since Checkup',
      value: daysSinceLastCheckup ?? '--',
      icon: <Clock size={20} />,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${stat.color} text-white`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;
