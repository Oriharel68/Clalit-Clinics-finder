import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface Clinic {
  id: number;
  ClinicName: string;
  AdditionalInfo: string; // New property for additional information
  // Add other properties as needed
}

const SearchClinics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  useEffect(() => {
    // Fetch clinics from the backend when the component mounts
    fetchClinics();
  }, []);

  // Replace the placeholder with the actual fetch method to retrieve clinic data from your backend
  const fetchClinics = async (): Promise<void> => {
    try {
        const data = await axios.get('')
      const staticClinics: Clinic[] = [
        { id: 1, ClinicName: 'מרפאה א', AdditionalInfo: 'מידע על מרפאה א' },
        { id: 2, ClinicName: 'מרפאה ב', AdditionalInfo: 'מידע על מרפאה ב' },
        // Add more clinics as needed
      ];
      setClinics(staticClinics);
    } catch (error) {
      console.error('Error fetching clinics:', error);
    }
  };

  // Function to filter clinics based on the search term
  const filterClinics = (): Clinic[] => {
    return clinics.filter(clinic =>
      clinic.ClinicName.includes(searchTerm)
    );
  };

  // Click handler to select a clinic and show additional info
  const handleClinicClick = (clinic: Clinic): void => {
    setSelectedClinic(clinic);
    setSearchTerm('');
  };

  // Click handler to close the clinic info card
  const handleCloseInfo = (): void => {
    setSelectedClinic(null);
  };

  return (
    <div className="container h-screen flex flex-col items-center justify-center text-right">
      <div className="relative inline-block">
        <input
          type="text"
          dir="rtl"
          placeholder="חיפוש מרפאות..."
          className="w-full px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-300 text-lg rtl pl-10 pr-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded z-10 rtl">
            {filterClinics().length === 0 ? (
              <div className="p-2 text-gray-500">לא נמצאו מרפאות</div>
            ) : (
              filterClinics().map((clinic) => (
                <div
                  key={clinic.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleClinicClick(clinic)}
                >
                  <p className="text-lg font-semibold">{clinic.ClinicName}</p>
                  {/* Add other clinic information as needed */}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {selectedClinic && (
        <div className="absolute mt-8 w-full max-w-xl bg-white border border-gray-300 p-4 rounded z-10 rtl">
          <div className="flex justify-between">
            <div className="close-Button-container">
              <button
                className="px-2 py-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={handleCloseInfo}
              >
                סגור
              </button>
            </div>
            <div className="info-container">
              <p className="text-lg font-semibold">{selectedClinic.ClinicName}</p>
              <p>{selectedClinic.AdditionalInfo}</p>
            </div>
          </div>
          {/* Add other clinic information as needed */}
        </div>
      )}
    </div>
  );
};

export default SearchClinics;
