
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PillIcon, Search, AlertTriangle, Info, Clock, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const MedicineAdvisor = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock medicine database
  const medicines = [
    {
      id: 1,
      name: 'Paracetamol',
      genericName: 'Acetaminophen',
      type: 'Pain Reliever',
      dosage: '500mg',
      uses: ['Fever', 'Headache', 'Body pain'],
      sideEffects: ['Nausea', 'Liver damage (overdose)'],
      precautions: ['Do not exceed 4g per day', 'Avoid alcohol'],
      price: '₹15-30',
      prescription: false
    },
    {
      id: 2,
      name: 'Ibuprofen',
      genericName: 'Ibuprofen',
      type: 'NSAID',
      dosage: '400mg',
      uses: ['Pain', 'Inflammation', 'Fever'],
      sideEffects: ['Stomach upset', 'Drowsiness'],
      precautions: ['Take with food', 'Avoid if allergic to NSAIDs'],
      price: '₹20-40',
      prescription: false
    },
    {
      id: 3,
      name: 'Amoxicillin',
      genericName: 'Amoxicillin',
      type: 'Antibiotic',
      dosage: '500mg',
      uses: ['Bacterial infections', 'Respiratory infections'],
      sideEffects: ['Diarrhea', 'Rash', 'Nausea'],
      precautions: ['Complete full course', 'Take as prescribed'],
      price: '₹50-100',
      prescription: true
    },
    {
      id: 4,
      name: 'Cetirizine',
      genericName: 'Cetirizine',
      type: 'Antihistamine',
      dosage: '10mg',
      uses: ['Allergies', 'Hay fever', 'Itching'],
      sideEffects: ['Drowsiness', 'Dry mouth'],
      precautions: ['Avoid alcohol', 'May cause drowsiness'],
      price: '₹25-50',
      prescription: false
    },
    {
      id: 5,
      name: 'Omeprazole',
      genericName: 'Omeprazole',
      type: 'Proton Pump Inhibitor',
      dosage: '20mg',
      uses: ['Acid reflux', 'Stomach ulcers', 'GERD'],
      sideEffects: ['Headache', 'Diarrhea', 'Stomach pain'],
      precautions: ['Take before meals', 'Long-term use may affect B12'],
      price: '₹40-80',
      prescription: false
    }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = medicines.filter(medicine =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine.uses.some(use => use.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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
            <h1 className="text-3xl font-bold mb-2">Medicine Advisor</h1>
            <p className="text-muted-foreground">
              Search for medicine information, dosages, and precautions
            </p>
          </div>

          {/* Disclaimer */}
          <Alert className="mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Disclaimer:</strong> This information is for educational purposes only. 
              Always consult with a healthcare professional before taking any medication.
            </AlertDescription>
          </Alert>

          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2" />
                Search Medicines
              </CardTitle>
              <CardDescription>
                Enter medicine name, generic name, or condition to search
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Input
                  placeholder="e.g., Paracetamol, headache, fever..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSearch} disabled={isSearching}>
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Search Results ({searchResults.length})</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {searchResults.map(medicine => (
                  <Card key={medicine.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center">
                            <PillIcon className="mr-2 text-blue-500" />
                            {medicine.name}
                          </CardTitle>
                          <CardDescription>
                            {medicine.genericName} • {medicine.type}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{medicine.dosage}</div>
                          <div className="text-xs text-muted-foreground">{medicine.price}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant={medicine.prescription ? "destructive" : "default"}>
                          {medicine.prescription ? 'Prescription Required' : 'Over the Counter'}
                        </Badge>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center">
                          <Info size={14} className="mr-1" />
                          Uses
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {medicine.uses.map((use: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {use}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center">
                          <AlertTriangle size={14} className="mr-1 text-orange-500" />
                          Side Effects
                        </h4>
                        <div className="text-sm text-muted-foreground">
                          {medicine.sideEffects.join(', ')}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center">
                          <Clock size={14} className="mr-1 text-red-500" />
                          Precautions
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {medicine.precautions.map((precaution: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{precaution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {searchResults.length === 0 && searchQuery && !isSearching && (
            <Card>
              <CardContent className="text-center py-12">
                <PillIcon size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No medicines found</h3>
                <p className="text-muted-foreground">
                  Try searching with different terms or check the spelling
                </p>
              </CardContent>
            </Card>
          )}

          {/* Popular Medicines */}
          {!searchQuery && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Popular Medicines</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {medicines.slice(0, 6).map(medicine => (
                  <Card key={medicine.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{medicine.name}</h3>
                        <Badge variant={medicine.prescription ? "destructive" : "default"} className="text-xs">
                          {medicine.prescription ? 'Rx' : 'OTC'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{medicine.type}</p>
                      <div className="text-xs text-muted-foreground">
                        Common uses: {medicine.uses.slice(0, 2).join(', ')}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MedicineAdvisor;
