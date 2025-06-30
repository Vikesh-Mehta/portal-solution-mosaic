
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Save, ArrowLeft, Edit } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { profile, loading, updateProfile } = useUserProfile();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    date_of_birth: '',
    gender: '',
    blood_group: '',
    height_cm: '',
    weight_kg: '',
    address: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    medical_conditions: [] as string[],
    allergies: [] as string[],
    current_medications: [] as string[]
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone: profile.phone || '',
        date_of_birth: profile.date_of_birth || '',
        gender: profile.gender || '',
        blood_group: profile.blood_group || '',
        height_cm: profile.height_cm?.toString() || '',
        weight_kg: profile.weight_kg?.toString() || '',
        address: profile.address || '',
        emergency_contact_name: profile.emergency_contact_name || '',
        emergency_contact_phone: profile.emergency_contact_phone || '',
        medical_conditions: profile.medical_conditions || [],
        allergies: profile.allergies || [],
        current_medications: profile.current_medications || []
      });
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updates = {
        ...formData,
        height_cm: formData.height_cm ? parseInt(formData.height_cm) : null,
        weight_kg: formData.weight_kg ? parseFloat(formData.weight_kg) : null
      };

      const result = await updateProfile(updates);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been saved successfully.",
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleArrayFieldChange = (field: string, value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: items }));
  };

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="mb-4"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Profile</h1>
                <p className="text-muted-foreground">
                  Manage your personal information and health details
                </p>
              </div>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Your basic personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={profile?.email || ''}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date of Birth</Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData(prev => ({ ...prev, date_of_birth: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Health Information */}
            <Card>
              <CardHeader>
                <CardTitle>Health Information</CardTitle>
                <CardDescription>
                  Your health-related details
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="blood_group">Blood Group</Label>
                  <Select
                    value={formData.blood_group}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, blood_group: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="height_cm">Height (cm)</Label>
                  <Input
                    id="height_cm"
                    type="number"
                    value={formData.height_cm}
                    onChange={(e) => setFormData(prev => ({ ...prev, height_cm: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight_kg">Weight (kg)</Label>
                  <Input
                    id="weight_kg"
                    type="number"
                    step="0.1"
                    value={formData.weight_kg}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight_kg: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="medical_conditions">Medical Conditions</Label>
                  <Input
                    id="medical_conditions"
                    placeholder="e.g., Diabetes, Hypertension (comma separated)"
                    value={formData.medical_conditions.join(', ')}
                    onChange={(e) => handleArrayFieldChange('medical_conditions', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Input
                    id="allergies"
                    placeholder="e.g., Peanuts, Shellfish (comma separated)"
                    value={formData.allergies.join(', ')}
                    onChange={(e) => handleArrayFieldChange('allergies', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="current_medications">Current Medications</Label>
                  <Input
                    id="current_medications"
                    placeholder="e.g., Metformin, Lisinopril (comma separated)"
                    value={formData.current_medications.join(', ')}
                    onChange={(e) => handleArrayFieldChange('current_medications', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
                <CardDescription>
                  Someone to contact in case of emergency
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_name">Contact Name</Label>
                  <Input
                    id="emergency_contact_name"
                    value={formData.emergency_contact_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, emergency_contact_name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_phone">Contact Phone</Label>
                  <Input
                    id="emergency_contact_phone"
                    value={formData.emergency_contact_phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, emergency_contact_phone: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {isEditing && (
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsEditing(false);
                    // Reset form data to original values
                    if (profile) {
                      setFormData({
                        first_name: profile.first_name || '',
                        last_name: profile.last_name || '',
                        phone: profile.phone || '',
                        date_of_birth: profile.date_of_birth || '',
                        gender: profile.gender || '',
                        blood_group: profile.blood_group || '',
                        height_cm: profile.height_cm?.toString() || '',
                        weight_kg: profile.weight_kg?.toString() || '',
                        address: profile.address || '',
                        emergency_contact_name: profile.emergency_contact_name || '',
                        emergency_contact_phone: profile.emergency_contact_phone || '',
                        medical_conditions: profile.medical_conditions || [],
                        allergies: profile.allergies || [],
                        current_medications: profile.current_medications || []
                      });
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  <Save size={16} className="mr-2" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            )}
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
