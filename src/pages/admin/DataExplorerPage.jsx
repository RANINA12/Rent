// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import adminService from '../../services/adminService.jsx';
// import Spinner from '../../components/common/Spinner.jsx';

// // --- Query Builder ke liye Configuration ---
// const queryOptions = {
//     users: [
//         { label: 'KYC Status', value: 'verification.status' },
//         { label: 'Is Admin', value: 'isAdmin' },
//         { label: 'City', value: 'address.city' },
//     ],
//     items: [
//         { label: 'Category', value: 'category' },
//         { label: 'Listing Type', value: 'listingType' },
//         { label: 'Is Available', value: 'isAvailable' },
//     ],
//     rentals: [
//         { label: 'Status', value: 'status' },
//     ]
// };

// const operatorOptions = {
//     'verification.status': [ { label: 'Equals', value: 'equals' }, { label: 'Contains', value: 'contains' } ],
//     'isAdmin': [ { label: 'Is True', value: 'is_true' }, { label: 'Is False', value: 'is_false' } ],
//     'address.city': [ { label: 'Contains', value: 'contains' } ],
//     'category': [ { label: 'Equals', value: 'equals' }, { label: 'Contains', value: 'contains' } ],
//     'listingType': [ { label: 'Equals', value: 'equals' } ],
//     'isAvailable': [ { label: 'Is True', value: 'is_true' }, { label: 'Is False', value: 'is_false' } ],
//     'status': [ { label: 'Equals', value: 'equals' } ],
// };


// const DataExplorerPage = () => {
//     // --- State Management ---
//     const [collection, setCollection] = useState('users');
//     const [field, setField] = useState('verification.status');
//     const [operator, setOperator] = useState('equals');
//     const [value, setValue] = useState('pending');
    
//     const [results, setResults] = useState(null);
//     const [loading, setLoading] = useState(false);

//     // --- Dynamic Dropdown Options ---
//     const fieldOptions = queryOptions[collection];
//     const currentOperatorOptions = operatorOptions[field] || [];

//     // [FIX] Check karein ki value field disable hona chahiye ya nahi
//     const isValueDisabled = operator === 'is_true' || operator === 'is_false';

//     // Jab collection ya field badle, to state ko reset karein
//     useEffect(() => {
//         const newField = queryOptions[collection][0].value;
//         const newOperator = operatorOptions[newField][0].value;
//         setField(newField);
//         setOperator(newOperator);
//     }, [collection]);

//     useEffect(() => {
//         const newOperator = operatorOptions[field][0].value;
//         setOperator(newOperator);
//     }, [field]);
    
//     const handleRunQuery = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setResults(null);
//         try {
//             // Agar operator is_true/is_false hai, to value ko 'true'/'false' set karein
//             const queryValue = isValueDisabled ? (operator === 'is_true' ? 'true' : 'false') : value;
//             const params = { collection, field, operator, value: queryValue };

//             const data = await adminService.runDataExplorer(params);
//             setResults(data);
//             toast.success(`Query successful! Found ${data.count} results.`);
//         } catch (err) {
//             toast.error(err.toString());
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="space-y-6">
//             <h1 className="text-3xl font-bold text-gray-800">Data Explorer</h1>
            
//             <form onSubmit={handleRunQuery} className="bg-gray-50 p-6 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
//                 {/* Collection */}
//                 <div className="col-span-1">
//                     <label className="block text-sm font-medium text-gray-700">Show me</label>
//                     <select value={collection} onChange={(e) => setCollection(e.target.value)} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm">
//                         <option value="users">Users</option>
//                         <option value="items">Items</option>
//                         <option value="rentals">Rentals</option>
//                     </select>
//                 </div>
//                 {/* Field */}
//                 <div className="col-span-1">
//                     <label className="block text-sm font-medium text-gray-700">where</label>
//                     <select value={field} onChange={(e) => setField(e.target.value)} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm">
//                         {fieldOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
//                     </select>
//                 </div>
//                 {/* Operator */}
//                 <div className="col-span-1">
//                     <label className="block text-sm font-medium text-gray-700">is</label>
//                     <select value={operator} onChange={(e) => setOperator(e.target.value)} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm">
//                         {currentOperatorOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
//                     </select>
//                 </div>
//                 {/* Value */}
//                 <div className="col-span-1">
//                     <label className="block text-sm font-medium text-gray-700">Value</label>
//                     <input 
//                         type="text" 
//                         value={isValueDisabled ? '' : value} // Agar disable hai to value khaali dikhayein
//                         onChange={(e) => setValue(e.target.value)} 
//                         placeholder={isValueDisabled ? 'N/A' : "Enter value..."}
//                         className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm disabled:bg-gray-200"
//                         disabled={isValueDisabled} // [FIX] Input ko disable kiya
//                     />
//                 </div>
//                 {/* Submit Button */}
//                 <div className="col-span-1">
//                     <button type="submit" disabled={loading} className="w-full bg-teal-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-teal-700 disabled:bg-teal-400">
//                         {loading ? 'Running...' : 'Run Query'}
//                     </button>
//                 </div>
//             </form>

//             <div className="bg-white p-6 rounded-lg shadow-md min-h-[300px]">
//                 <h2 className="text-xl font-bold text-gray-700 mb-4">Results</h2>
//                 {loading && <Spinner />}
//                 {results && (
//                     <>
//                         <p className="mb-4 text-gray-600">Found <span className="font-bold">{results.count}</span> records.</p>
//                         <pre className="bg-gray-800 text-white text-sm p-4 rounded-md overflow-x-auto">
//                             {JSON.stringify(results.data, null, 2)}
//                         </pre>
//                     </>
//                 )}
//                 {!loading && !results && <p className="text-center text-gray-500 py-10">Run a query to see the results here.</p>}
//             </div>
//         </div>
//     );
// };

// export default DataExplorerPage;

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import adminService from '../../services/adminService.jsx';
import Spinner from '../../components/common/Spinner.jsx';

// --- Query Builder ke liye Configuration ---
const queryOptions = {
    users: [
        { label: 'KYC Status', value: 'verification.status' },
        { label: 'Is Admin', value: 'isAdmin' },
        { label: 'City', value: 'address.city' },
    ],
    items: [
        { label: 'Category', value: 'category' },
        { label: 'Listing Type', value: 'listingType' },
        { label: 'Is Available', value: 'isAvailable' },
    ],
    rentals: [
        { label: 'Status', value: 'status' },
    ]
};

const operatorOptions = {
    'verification.status': [ { label: 'Equals', value: 'equals' }, { label: 'Contains', value: 'contains' } ],
    'isAdmin': [ { label: 'Is True', value: 'is_true' }, { label: 'Is False', value: 'is_false' } ],
    'address.city': [ { label: 'Contains', value: 'contains' } ],
    'category': [ { label: 'Equals', value: 'equals' }, { label: 'Contains', value: 'contains' } ],
    'listingType': [ { label: 'Equals', value: 'equals' } ],
    'isAvailable': [ { label: 'Is True', value: 'is_true' }, { label: 'Is False', value: 'is_false' } ],
    'status': [ { label: 'Equals', value: 'equals' } ],
};


const DataExplorerPage = () => {
    // --- State Management ---
    const [collection, setCollection] = useState('users');
    const [field, setField] = useState('verification.status');
    const [operator, setOperator] = useState('equals');
    const [value, setValue] = useState('pending');
    
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    // --- Dynamic Dropdown Options ---
    const fieldOptions = queryOptions[collection];
    const currentOperatorOptions = operatorOptions[field] || [];

    const isValueDisabled = operator === 'is_true' || operator === 'is_false';

    // Jab collection ya field badle, to state ko reset karein
    useEffect(() => {
        const newField = queryOptions[collection][0].value;
        setField(newField);
    }, [collection]);

    useEffect(() => {
        const newOperator = operatorOptions[field][0].value;
        setOperator(newOperator);
    }, [field]);
    
    const handleRunQuery = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResults(null);
        try {
            const isValueDisabled = operator === 'is_true' || operator === 'is_false';
            const queryValue = isValueDisabled ? (operator === 'is_true' ? 'true' : 'false') : value;

            // ✅ FIX: Agar operator 'is_true' ya 'is_false' hai, to backend ko 'equals' bhejein.
            const finalOperator = isValueDisabled ? 'equals' : operator;

            const params = {
                collection,
                field,
                operator: finalOperator, // Yahan 'finalOperator' ka istemal kiya gaya hai
                value: queryValue
            };

            const data = await adminService.runDataExplorer(params);
            
            let formattedData;
            if (Array.isArray(data)) {
                formattedData = { count: data.length, data: data };
            } else if (data && typeof data.data !== 'undefined' && typeof data.count !== 'undefined') {
                formattedData = data;
            } else {
                toast.error("Server se unexpected data format mila hai.");
                setResults({ count: 0, data: [] });
                return;
            }

            setResults(formattedData);
            if (formattedData.count > 0) {
               toast.success(`Query successful! Found ${formattedData.count} results.`);
            } else {
               toast.info("Query successful, but no results were found.");
            }
            
        } catch (err) {
            toast.error(err.toString());
            console.error("Query failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Data Explorer</h1>
            
            <form onSubmit={handleRunQuery} className="bg-gray-50 p-6 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                {/* Collection */}
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Show me</label>
                    <select value={collection} onChange={(e) => setCollection(e.target.value)} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm">
                        <option value="users">Users</option>
                        <option value="items">Items</option>
                        <option value="rentals">Rentals</option>
                    </select>
                </div>
                {/* Field */}
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">where</label>
                    <select value={field} onChange={(e) => setField(e.target.value)} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm">
                        {fieldOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                </div>
                {/* Operator */}
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">is</label>
                    <select value={operator} onChange={(e) => setOperator(e.target.value)} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm">
                        {currentOperatorOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                </div>
                {/* Value */}
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Value</label>
                    <input 
                        type="text" 
                        value={isValueDisabled ? '' : value}
                        onChange={(e) => setValue(e.target.value)} 
                        placeholder={isValueDisabled ? 'N/A' : "Enter value..."}
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm disabled:bg-gray-200"
                        disabled={isValueDisabled}
                    />
                </div>
                {/* Submit Button */}
                <div className="col-span-1">
                    <button type="submit" disabled={loading} className="w-full bg-teal-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-teal-700 disabled:bg-teal-400">
                        {loading ? 'Running...' : 'Run Query'}
                    </button>
                </div>
            </form>

            <div className="bg-white p-6 rounded-lg shadow-md min-h-[300px]">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Results</h2>
                {loading && <Spinner />}
                {results && (
                    <>
                        <p className="mb-4 text-gray-600">Found <span className="font-bold">{results.count}</span> records.</p>
                       <pre className="bg-gray-800 text-white text-sm p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
    {JSON.stringify(results.data, null, 2)}
</pre>
                    </>
                )}
                {!loading && !results && <p className="text-center text-gray-500 py-10">Run a query to see the results here.</p>}
            </div>
        </div>
    );
};

export default DataExplorerPage;