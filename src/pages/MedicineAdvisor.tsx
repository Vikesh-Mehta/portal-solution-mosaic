
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, Pill, AlertTriangle, Info, Clock } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const MedicineAdvisor = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);

  // Simplified medicine database
  const medicines = [
    {
      id: 1,
      name: 'Paracetamol',
      genericName: 'Acetaminophen',
      category: 'Pain Relief',
      dosage: '500mg - 1000mg every 4-6 hours',
      maxDaily: '4000mg per day',
      uses: ['Fever', 'Headache', 'Body pain', 'Cold symptoms'],
      sideEffects: ['Rare when used as directed', 'Liver damage with overdose'],
      warnings: ['Do not exceed recommended dose', 'Avoid alcohol'],
      available: true
    },
    {
      id: 2,
      name: 'Ibuprofen',
      genericName: 'Ibuprofen',
      category: 'Pain Relief',
      dosage: '200mg - 400mg every 4-6 hours',
      maxDaily: '1200mg per day',
      uses: ['Pain', 'Inflammation', 'Fever', 'Menstrual cramps'],
      sideEffects: ['Stomach upset', 'Dizziness', 'Headache'],
      warnings: ['Take with food', 'Not for people with stomach ulcers'],
      available: true
    },
    {
      id: 3,
      name: 'Cetirizine',
      genericName: 'Cetirizine HCl',
      category: 'Antihistamine',
      dosage: '10mg once daily',
      maxDaily: '10mg per day',
      uses: ['Allergies', 'Hay fever', 'Itching', 'Hives'],
      sideEffects: ['Drowsiness', 'Dry mouth', 'Fatigue'],
      warnings: ['May cause drowsiness', 'Avoid alcohol'],
      available: true
    },
    {
      id: 4,
      name: 'Omeprazole',
      genericName: 'Omeprazole',
      category: 'Acid Reducer',
      dosage: '20mg once daily before breakfast',
      maxDaily: '20mg per day',
      uses: ['Heartburn', 'Acid reflux', 'Stomach ulcers'],
      sideEffects: ['Headache', 'Nausea', 'Stomach pain'],
      warnings: ['Take before meals', 'Long-term use may affect bone density'],
      available: true
    }
  ];

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.uses.some(use => use.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="mb-4"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold mb-2">Medicine Information</h1>
            <p className="text-muted-foreground">
              Quick reference for common over-the-counter medications
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Search and Medicine List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Pill className="mr-2" />
                    Search Medicines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      placeholder="Search by name or symptom..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    {filteredMedicines.map((medicine) => (
                      <div
                        key={medicine.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedMedicine?.id === medicine.id 
                            ? 'bg-primary/10 border-primary' 
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setSelectedMedicine(medicine)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{medicine.name}</h4>
                            <p className="text-sm text-muted-foreground">{medicine.category}</p>
                          </div>
                          {medicine.available && (
                            <Badge variant="secondary" className="text-xs">Available</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Medicine Details */}
            <div className="lg:col-span-2">
              {selectedMedicine ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {selectedMedicine.name}
                        <Badge>{selectedMedicine.category}</Badge>
                      </CardTitle>
                      <CardDescription>
                        Generic name: {selectedMedicine.genericName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center">
                            <Clock size={16} className="mr-2" />
                            Dosage Information
                          </h4>
                          <p className="text-sm text-muted-foreground mb-1">
                            <strong>Typical dose:</strong> {selectedMedicine.dosage}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <strong>Maximum daily:</strong> {selectedMedicine.maxDaily}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Common Uses</h4>
                          <div className="flex flex-wrap gap-1">
                            {selectedMedicine.uses.map((use: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {use}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-orange-600">
                          <Info size={16} className="mr-2" />
                          Side Effects
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {selectedMedicine.sideEffects.map((effect: string, index: number) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start">
                              <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {effect}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-red-600">
                          <AlertTriangle size={16} className="mr-2" />
                          Warnings
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {selectedMedicine.warnings.map((warning: string, index: number) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start">
                              <span className="w-1 h-1 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {warning}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="text-yellow-600 mt-0.5" size={20} />
                        <div>
                          <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                            Important Disclaimer
                          </h4>
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            This information is for educational purposes only and should not replace professional medical advice. 
                            Always consult with a healthcare professional before taking any medication, especially if you have 
                            existing health conditions or are taking other medications.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Pill className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Select a Medicine</h3>
                    <p className="text-muted-foreground">
                      Choose a medicine from the list to view detailed information about dosage, uses, and safety guidelines.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MedicineAdvisor;
