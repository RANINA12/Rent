import React from 'react';
import { useNavigate } from 'react-router-dom';

// Helper data for cities
const cities = [
    { name: 'Bangalore', icon: '🏙️' }, { name: 'Mumbai', icon: '🌊' },
    { name: 'Pune', icon: '🎓' }, { name: 'Delhi', icon: '🏛️' },
    { name: 'Noida', icon: '🏢' }, { name: 'Gurgaon', icon: '🏗️' },
    { name: 'Hyderabad', icon: '🕌' }, { name: 'Chennai', icon: '🏖️' },
    { name: 'Indore', icon: '🍲' }, { name: 'Kolkata', icon: '🌉' },
];

const CitySelectorModal = ({ setSelectedCity, closeModal }) => {
    const navigate = useNavigate();

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        closeModal();
        if (city.toLowerCase() === 'indore') {
            navigate('/map/indore'); // Navigate to map page on Indore selection
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal} // Close modal on outside click
        >
            <div 
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <input 
                    type="text" 
                    placeholder="Search city here" 
                    className="w-full p-3 border rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                    {cities.map(city => (
                        <div 
                            key={city.name} 
                            onClick={() => handleCitySelect(city.name)}
                            className="flex flex-col items-center p-2 border rounded-md hover:bg-teal-50 hover:border-teal-500 cursor-pointer transition-colors"
                        >
                            <span className="text-3xl mb-2">{city.icon}</span>
                            <span className="text-sm text-gray-700">{city.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CitySelectorModal;