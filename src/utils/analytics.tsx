
// Analytics utility for tracking user interactions
// In a production environment, you would integrate with services like Google Analytics, Mixpanel, etc.

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
}

class Analytics {
  private isProduction = import.meta.env.PROD;

  track(event: string, properties?: Record<string, any>) {
    if (!this.isProduction) {
      console.log('Analytics Event:', { event, properties });
      return;
    }

    // In production, you would send this to your analytics service
    // Example: gtag('event', event, properties);
  }

  page(pageName: string, properties?: Record<string, any>) {
    if (!this.isProduction) {
      console.log('Page View:', { page: pageName, properties });
      return;
    }

    // In production, you would track page views
    // Example: gtag('config', 'GA_MEASUREMENT_ID', { page_title: pageName });
  }

  identify(userId: string, traits?: Record<string, any>) {
    if (!this.isProduction) {
      console.log('User Identified:', { userId, traits });
      return;
    }

    // In production, you would identify the user
    // Example: gtag('config', 'GA_MEASUREMENT_ID', { user_id: userId });
  }
}

export const analytics = new Analytics();

// Common tracking events
export const trackHealthCheckup = (type: string) => {
  analytics.track('health_checkup_completed', { type });
};

export const trackAppointmentBooked = (doctorName: string, type: string) => {
  analytics.track('appointment_booked', { doctor_name: doctorName, appointment_type: type });
};

export const trackProfileUpdated = () => {
  analytics.track('profile_updated');
};

export const trackPageView = (pageName: string) => {
  analytics.page(pageName);
};
