
import { useState, useEffect } from 'react';
import { Bell, X, Calendar, Heart, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Notification {
  id: string;
  type: 'appointment' | 'health' | 'reminder' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationCenterProps {
  appointments: any[];
  healthSummary: any;
}

const NotificationCenter = ({ appointments, healthSummary }: NotificationCenterProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const newNotifications: Notification[] = [];

    // Appointment notifications
    appointments?.forEach(apt => {
      const appointmentDate = new Date(apt.appointment_date + 'T' + apt.appointment_time);
      const hoursUntil = (appointmentDate.getTime() - new Date().getTime()) / (1000 * 3600);
      
      if (hoursUntil > 0 && hoursUntil <= 24 && apt.status === 'scheduled') {
        newNotifications.push({
          id: `apt-${apt.id}`,
          type: 'appointment',
          title: 'Upcoming Appointment',
          message: `${apt.appointment_type} with ${apt.doctor_name} in ${Math.round(hoursUntil)} hours`,
          timestamp: new Date(),
          read: false,
          priority: hoursUntil <= 2 ? 'high' : 'medium'
        });
      }
    });

    // Health notifications
    if (healthSummary) {
      if (healthSummary.riskLevel === 'high') {
        newNotifications.push({
          id: 'health-risk',
          type: 'health',
          title: 'Health Alert',
          message: 'Your health metrics need attention. Consider scheduling a checkup.',
          timestamp: new Date(),
          read: false,
          priority: 'high'
        });
      }

      if (healthSummary.lastCheckupDays && healthSummary.lastCheckupDays > 90) {
        newNotifications.push({
          id: 'checkup-reminder',
          type: 'reminder',
          title: 'Checkup Reminder',
          message: `It's been ${healthSummary.lastCheckupDays} days since your last checkup`,
          timestamp: new Date(),
          read: false,
          priority: 'medium'
        });
      }

      if (healthSummary.overallScore >= 80) {
        newNotifications.push({
          id: 'health-achievement',
          type: 'achievement',
          title: 'Great Health Score!',
          message: `Your health score is ${healthSummary.overallScore}%. Keep it up!`,
          timestamp: new Date(),
          read: false,
          priority: 'low'
        });
      }
    }

    setNotifications(newNotifications);
  }, [appointments, healthSummary]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment': return <Calendar size={16} />;
      case 'health': return <Heart size={16} />;
      case 'reminder': return <AlertTriangle size={16} />;
      case 'achievement': return <CheckCircle size={16} />;
      default: return <Bell size={16} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Bell size={16} className="mr-2" />
          Notifications
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              {notifications.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAll}>
                  Clear All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <Bell className="mx-auto h-8 w-8 mb-2 opacity-50" />
                <p>No notifications</p>
              </div>
            ) : (
              <ScrollArea className="h-96">
                <div className="space-y-1 p-2">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border-l-4 ${getPriorityColor(notification.priority)} ${
                        notification.read ? 'bg-muted/30' : 'bg-background hover:bg-muted/50'
                      } cursor-pointer transition-colors`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 text-muted-foreground">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
