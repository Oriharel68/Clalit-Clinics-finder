import axios from "axios";
import React, { useState, useEffect } from "react";
import ApiURL from "../ApiUrl/URL";
import blob from "../assets/blob.png";
import Clalit from "../assets/Clalit.png";
import { FaWaze } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";

interface Clinic {
  ClinicName: string;
  Area: string;
  Waze: string;
  WazeSite: string;
  ClinicCode: string;
  _id: string;
  // Add other properties as needed
}

const SearchClinics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  useEffect(() => {
    // Fetch clinics from the backend when the component mounts
    fetchClinics();
  }, []);

  // Replace the placeholder with the actual fetch method to retrieve clinic data from your backend
  const fetchClinics = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${ApiURL}/getClinics`);
      setClinics(data as any);
    } catch (error) {
      console.error("Error fetching clinics:", error);
    }
  };

  // Function to filter clinics based on the search term
  const filterClinics = (): Clinic[] => {
    const filteredClinics = clinics.filter((clinic) =>
      clinic.ClinicName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Return only the top 4 results
    return filteredClinics.slice(0, 4);
  };

  // Click handler to select a clinic and show additional info
  const handleClinicClick = (clinic: Clinic): void => {
    setSelectedClinic(clinic);
    setSearchTerm("");
    console.log(clinic);
  };

  // Click handler to close the clinic info card
  const handleCloseInfo = (): void => {
    setSelectedClinic(null);
  };

  return (
    <div className="container h-screen flex flex-col items-center justify-around text-right box-border">
      <div className="w-full flex justify-center flex-col items-center p-5 lg:pt-20">
        <div className="flex justify-center items-center flex-col">
          <img className="w-56" src={Clalit} alt="" />
          <div className="flex items-center justify-center font-bold text-lg">
            <h2>חיפוש וניווט מרפאות מחוז דרום</h2>
          </div>
        </div>
        <div>
          {!selectedClinic && (
            <div className="pt-24 relative">
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
                        key={clinic._id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleClinicClick(clinic)}
                      >
                        <p className="text-lg font-semibold">
                          {clinic.ClinicName}
                        </p>
                        {/* Add other clinic information as needed */}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {selectedClinic && (
        <div className="mt-8 w-full max-w-xl bg-white border border-gray-300 p-4 rounded z-10 rtl">
          <div className="flex justify-center items-center">
            <div className="close-Button-container"></div>
            <div className="info-container flex-col flex items-center justify-center">
              <div className="text-container pb-3">
                <p className="text-xl font-bold">
                  {selectedClinic.ClinicName}
                </p>
              </div>
              <div className="buttons-container flex justify-between w-full">
                <div className="left-side-button-container">
                  <button
                    onClick={handleCloseInfo}
                    className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                  >
                    <IoReturnUpBackOutline />
                  </button>
                </div>
                <div className="right-side-button-contiainer pl-8">
                  {" "}
                  <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    <a href={selectedClinic.WazeSite}>
                      <FaWaze />
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Add other clinic information as needed */}
        </div>
      )}
      <div className="flex items-end justify-center align-bottom max-w-lg">
        <img className="object-cover" src={blob} />
      </div>
    </div>
  );
};

export default SearchClinics;
