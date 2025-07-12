
# Smart Health - Rural Healthcare Platform

Smart Health is an AI-integrated self-service healthcare platform designed specifically for rural communities. It provides 24/7 access to medical assistance through smart health booths, bringing healthcare closer to underserved areas without requiring a full hospital infrastructure.

## Features

### 🏥 Core Healthcare Features
- **Health Checkup System** - Record and track vital signs (heart rate, blood pressure, blood sugar, oxygen levels)
- **Virtual Consultations** - Connect with qualified doctors remotely
- **Medicine Advisor** - AI-powered medication guidance and information
- **Health Records Management** - Secure storage and tracking of medical history
- **Appointment Scheduling** - Book and manage healthcare appointments

### 👤 User Management
- **User Authentication** - Secure login/signup with Supabase Auth
- **Profile Management** - Comprehensive health profiles with medical history
- **Health Tracking** - Personal health dashboard with insights and trends
- **Notifications** - Health reminders and appointment alerts

### 🎨 User Experience
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode** - Adaptive theme support
- **Accessibility** - Built with accessibility best practices
- **Progressive Web App** - Installable and works offline

## Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality component library
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Lucide React** - Beautiful icon library

### Backend & Database
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Relational database with RLS (Row Level Security)
- **Supabase Auth** - Authentication and user management
- **Edge Functions** - Serverless functions for custom logic

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── layout/          # Layout components (Header, Footer)
│   ├── home/            # Landing page components
│   └── dashboard/       # Dashboard-specific components
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── contexts/            # React contexts (Auth, Theme)
├── utils/               # Utility functions
├── integrations/        # Third-party integrations
└── lib/                 # Library configurations
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-health
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Run the SQL migrations in `supabase/migrations/`
   - Update the Supabase configuration in `src/integrations/supabase/client.ts`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Database Schema

### Tables
- **profiles** - User profiles and personal information
- **health_records** - Medical records and health data
- **appointments** - Healthcare appointments and scheduling

### Security
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Secure authentication with Supabase Auth

## Key Features Implementation

### Health Tracking System
- Real-time vital signs monitoring
- Health score calculation and trends
- Risk assessment and recommendations
- Historical data visualization

### Virtual Consultations
- Doctor availability management
- Appointment scheduling system
- Video consultation preparation
- Medical record sharing

### Medicine Advisory
- Drug information database
- Interaction checking
- Dosage recommendations
- Side effect warnings

## Production Deployment

### Environment Variables
Ensure these are set in your production environment:
- Supabase URL and API keys
- Any third-party service API keys
- Analytics configuration

### Performance Optimizations
- Code splitting and lazy loading
- Image optimization
- Bundle size optimization
- Caching strategies implemented

### Security Features
- HTTPS enforcement
- Content Security Policy headers
- Input validation and sanitization
- Rate limiting on API endpoints

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support, email support@smarthealth.com or join our community discussions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Smart Health** - Bringing healthcare to every community, one smart booth at a time.
