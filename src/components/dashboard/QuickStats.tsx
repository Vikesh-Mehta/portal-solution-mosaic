
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Activity, FileText, Clock, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface QuickStatsProps {
  records: any[];
  appointments: any[];
  loading?: boolean;
}

const QuickStats = ({ records, appointments, loading = false }: QuickStatsProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-full animate-pulse" />
                <div className="space-y-2">
                  <div className="h-6 w-8 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalRecords = records?.length || 0;
  
  const upcomingAppointments = appointments?.filter(apt => {
    try {
      const appointmentDate = new Date(apt.appointment_date + 'T' + apt.appointment_time);
      return appointmentDate > new Date() && apt.status === 'scheduled';
    } catch {
      return false;
    }
  }).length || 0;
  
  const lastCheckup = records?.find(r => r.record_type === 'checkup');
  const daysSinceLastCheckup = lastCheckup 
    ? Math.floor((new Date().getTime() - new Date(lastCheckup.date_recorded).getTime()) / (1000 * 3600 * 24))
    : null;

  const thisMonthRecords = records?.filter(r => {
    try {
      const recordDate = new Date(r.date_recorded);
      const now = new Date();
      return recordDate.getMonth() === now.getMonth() && recordDate.getFullYear() === now.getFullYear();
    } catch {
      return false;
    }
  }).length || 0;

  const getHealthTrend = () => {
    if (records?.length < 2) return null;
    const recentRecords = records.slice(0, 2);
    return recentRecords.length > 1 ? 'improving' : null;
  };

  const stats = [
    {
      title: 'Total Records',
      value: totalRecords,
      icon: <FileText size={20} />,
      color: 'bg-blue-500',
      trend: totalRecords > 0 ? '+' + totalRecords : null
    },
    {
      title: 'Upcoming Appointments',
      value: upcomingAppointments,
      icon: <Calendar size={20} />,
      color: 'bg-green-500',
      urgent: upcomingAppointments > 0
    },
    {
      title: 'This Month',
      value: thisMonthRecords,
      icon: <Activity size={20} />,
      color: 'bg-purple-500',
      trend: getHealthTrend()
    },
    {
      title: 'Days Since Checkup',
      value: daysSinceLastCheckup ?? '--',
      icon: <Clock size={20} />,
      color: daysSinceLastCheckup > 30 ? 'bg-red-500' : 'bg-orange-500',
      warning: daysSinceLastCheckup > 30
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${stat.color} text-white relative`}>
                {stat.icon}
                {stat.urgent && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  {stat.trend && (
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp size={12} className="mr-1" />
                      {stat.trend}
                    </Badge>
                  )}
                  {stat.warning && (
                    <Badge variant="destructive" className="text-xs">
                      Overdue
                    </Badge>
                  )}
                </div>
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
