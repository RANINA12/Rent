// // import React, { useState } from 'react';

// // // Ek alag component image upload ke liye
// // const ImageUploader = ({ images, setImages }) => {
// //     const handleImageChange = (e) => {
// //         if (e.target.files) {
// //             const filesArray = Array.from(e.target.files).slice(0, 4); // Sirf 4 images
// //             setImages(filesArray);
// //         }
// //     };

// //     return (
// //         <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Product Images (Upload up to 4)
// //             </label>
// //             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
// //                 <div className="space-y-1 text-center">
// //                     <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
// //                         <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
// //                     </svg>
// //                     <div className="flex text-sm text-gray-600">
// //                         <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none">
// //                             <span>Upload files</span>
// //                             <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handleImageChange} />
// //                         </label>
// //                         <p className="pl-1">or drag and drop</p>
// //                     </div>
// //                     <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
// //                 </div>
// //             </div>
// //             <div className="mt-2 flex flex-wrap gap-2">
// //                 {images.map((file, index) => (
// //                     <img key={index} src={URL.createObjectURL(file)} alt={`preview ${index}`} className="h-20 w-20 object-cover rounded" />
// //                 ))}
// //             </div>
// //         </div>
// //     );
// // };


// // const UploadItemPage = () => {
// //     const [step, setStep] = useState(1); // 1: Aadhaar, 2: OTP, 3: Form
// //     const [aadhaar, setAadhaar] = useState('');
// //     const [mobile, setMobile] = useState('');
// //     const [otp, setOtp] = useState('');
// //     const [isVerified, setIsVerified] = useState(false);
// //     const [error, setError] = useState('');
// //     const [isLoading, setIsLoading] = useState(false);

// //     // Form state
// //     const [productName, setProductName] = useState('');
// //     const [description, setDescription] = useState('');
// //     const [category, setCategory] = useState('');
// //     const [price, setPrice] = useState('');
// //     const [images, setImages] = useState([]);

// //     const handleAadhaarSubmit = (e) => {
// //         e.preventDefault();
// //         setError('');
// //         if (!/^\d{12}$/.test(aadhaar)) {
// //             setError('Please enter a valid 12-digit Aadhaar number.');
// //             return;
// //         }
// //         setStep(2); // Move to OTP step
// //     };

// //     const handleOtpSubmit = (e) => {
// //         e.preventDefault();
// //         setError('');
// //         setIsLoading(true);

// //         // Yahan par backend ko call karke real OTP bheja jaayega
// //         // Abhi ke liye hum "123456" ko sahi OTP maan rahe hain
// //         setTimeout(() => {
// //             if (otp === '123456') {
// //                 setIsVerified(true);
// //                 setStep(3);
// //             } else {
// //                 setError('Invalid OTP. Please try again.');
// //             }
// //             setIsLoading(false);
// //         }, 1500);
// //     };

// //     const handleProductSubmit = (e) => {
// //         e.preventDefault();
// //         console.log({ productName, description, category, price, images });
// //         alert('Product submitted for review!');
// //     };

// //     const renderStep = () => {
// //         switch (step) {
// //             case 1: // Aadhaar Input
// //                 return (
// //                     <form onSubmit={handleAadhaarSubmit} className="bg-white p-8 rounded-lg shadow-md">
// //                         <h1 className="text-2xl font-bold text-center mb-2">Verify Your Identity</h1>
// //                         <p className="text-gray-600 text-center mb-6">Enter your Aadhaar to begin.</p>
// //                         <div className="mb-4">
// //                             <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
// //                             <input type="text" id="aadhaar" value={aadhaar} onChange={(e) => setAadhaar(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" placeholder="Enter 12-digit number" maxLength="12" />
// //                             {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
// //                         </div>
// //                         <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-md">Next</button>
// //                     </form>
// //                 );
// //             case 2: // OTP Input
// //                 return (
// //                     <form onSubmit={handleOtpSubmit} className="bg-white p-8 rounded-lg shadow-md">
// //                         <h1 className="text-2xl font-bold text-center mb-2">Mobile Verification</h1>
// //                         <p className="text-gray-600 text-center mb-6">We'll send an OTP to your mobile number.</p>
// //                         <div className="mb-4">
// //                             <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
// //                             <input type="text" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" placeholder="Enter 10-digit number" maxLength="10" />
// //                         </div>
// //                         <div className="mb-4">
// //                             <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
// //                             <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" placeholder="Enter 6-digit OTP" maxLength="6" />
// //                             {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
// //                         </div>
// //                         <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-md" disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify & Proceed'}</button>
// //                     </form>
// //                 );
// //             case 3: // Product Form
// //                 return (
// //                     <form onSubmit={handleProductSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
// //                         <h1 className="text-2xl font-bold text-center mb-6">List Your Item</h1>
// //                         <ImageUploader images={images} setImages={setImages} />
// //                         <div><label htmlFor="productName">Product Name</label><input type="text" id="productName" value={productName} onChange={e => setProductName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required /></div>
// //                         <div><label htmlFor="description">Description</label><textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required></textarea></div>
// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                             <div><label htmlFor="category">Category</label><select id="category" value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required><option value="">Select...</option><option>Furniture</option><option>Electronics</option><option>Appliances</option><option>Bikes</option></select></div>
// //                             <div><label htmlFor="price">Rent Price (per day)</label><input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="₹" required /></div>
// //                         </div>
// //                         <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-md font-semibold text-lg">Submit for Listing</button>
// //                     </form>
// //                 );
// //             default:
// //                 return null;
// //         }
// //     };

// //     return (
// //         <div className="container mx-auto max-w-lg py-12">
// //             {renderStep()}
// //         </div>
// //     );
// // };

// // export default UploadItemPage;


// // import React, { useState, useEffect } from 'react';
// // import { useAuth } from '../contexts/AuthContext';
// // import Spinner from '../components/common/Spinner';

// // // Har step ke liye alag component
// // const Step1_UploadDocs = ({ setVerificationStatus }) => {
// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         // Yahan par images Cloudinary par upload hongi aur unke URL backend ko bheje jaayenge.
// //         // Backend user ka status 'pending' set kar dega.
// //         // Abhi ke liye, hum ise simulate kar rahe hain.
// //         alert("Documents submitted for verification!");
// //         setVerificationStatus('pending');
// //     };

// //     return (
// //         <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md text-center">
// //             <h2 className="text-2xl font-bold mb-4">Step 1: Upload Documents</h2>
// //             <p className="text-gray-600 mb-6">Please upload your Aadhaar Card, a clear selfie, and your College ID (if you are a student).</p>
// //             <div className="space-y-4 text-left">
// //                 <div>
// //                     <label className="block text-sm font-medium text-gray-700">Aadhaar Card (Front & Back)</label>
// //                     <input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
// //                 </div>
// //                 <div>
// //                     <label className="block text-sm font-medium text-gray-700">Your Selfie</label>
// //                     <input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
// //                 </div>
// //                 <div>
// //                     <label className="block text-sm font-medium text-gray-700">College ID (Optional)</label>
// //                     <input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
// //                 </div>
// //             </div>
// //             <button type="submit" className="w-full mt-6 bg-teal-600 text-white py-2 rounded-md">Submit for Verification</button>
// //         </form>
// //     );
// // };

// // const Step2_PendingVerification = () => {
// //     return (
// //         <div className="bg-white p-8 rounded-lg shadow-md text-center">
// //             <h2 className="text-2xl font-bold text-yellow-500 mb-4">Verification Pending</h2>
// //             <p className="text-gray-600">Your documents are under review. You will receive an email once the verification is complete. This usually takes 24-48 hours.</p>
// //         </div>
// //     );
// // };

// // const Step3_OtpVerification = ({ setIsPhoneVerified }) => {
// //     const [otp, setOtp] = useState('');
// //     const [isLoading, setIsLoading] = useState(false);

// //     const handleOtpSubmit = (e) => {
// //         e.preventDefault();
// //         setIsLoading(true);
// //         // Yahan backend ko call karke OTP verify hoga
// //         setTimeout(() => {
// //             if (otp === '123456') { // Demo OTP
// //                 setIsPhoneVerified(true);
// //             } else {
// //                 alert('Invalid OTP');
// //             }
// //             setIsLoading(false);
// //         }, 1500);
// //     };
    
// //     return (
// //         <form onSubmit={handleOtpSubmit} className="bg-white p-8 rounded-lg shadow-md text-center">
// //             <h2 className="text-2xl font-bold mb-4">Step 2: Verify Mobile Number</h2>
// //             <p className="text-gray-600 mb-6">An OTP has been sent to your registered mobile number.</p>
// //             <div className="mb-4">
// //                 <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="mt-1 text-center tracking-widest text-2xl block w-full p-2 border rounded-md" placeholder="_ _ _ _ _ _" maxLength="6" />
// //             </div>
// //             <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-md" disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify & Proceed'}</button>
// //         </form>
// //     );
// // };

// // const Step4_ProductForm = () => {
// //     // ... (Product form ka poora code yahan aayega, jaisa humne pehle banaya tha) ...
// //     return (
// //         <div className="bg-white p-8 rounded-lg shadow-md">
// //             <h2 className="text-2xl font-bold text-center mb-6">Step 3: List Your Item</h2>
// //             {/* Yahan poora product form aayega */}
// //             <p className="text-center mb-4">Your full product listing form will appear here.</p>
// //             <div className="mt-6">
// //                 <label className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-md">
// //                     <input type="checkbox" className="form-checkbox h-5 w-5 text-teal-600" />
// //                     <span className="ml-3 text-yellow-800">Feature this item on the homepage (Additional charges apply)</span>
// //                 </label>
// //             </div>
// //             <button className="w-full mt-6 bg-red-600 text-white py-3 rounded-md font-semibold text-lg">Submit for Listing</button>
// //         </div>
// //     );
// // };


// // const UploadItemPage = () => {
// //     const { user } = useAuth();
// //     // Asli app mein, yeh status aur phone verification user object se aayega
// //     // const verificationStatus = user?.verification?.status || 'unverified';
// //     // const isPhoneVerified = user?.isPhoneVerified || false;

// //     // Abhi ke liye, hum inko manually control karenge taaki har step dekh sakein
// //     const [verificationStatus, setVerificationStatus] = useState('verified'); // 'unverified', 'pending', 'verified'
// //     const [isPhoneVerified, setIsPhoneVerified] = useState(false);

// //     const renderCurrentStep = () => {
// //         if (!user) return <p className="text-center">Please log in to upload an item.</p>;

// //         switch (verificationStatus) {
// //             case 'unverified':
// //                 return <Step1_UploadDocs setVerificationStatus={setVerificationStatus} />;
// //             case 'pending':
// //                 return <Step2_PendingVerification />;
// //             case 'verified':
// //                 return isPhoneVerified ? <Step4_ProductForm /> : <Step3_OtpVerification setIsPhoneVerified={setIsPhoneVerified} />;
// //             case 'rejected':
// //                 return <p className="text-center text-red-500">Your verification was rejected. Please check your email for details.</p>;
// //             default:
// //                 return <Spinner />;
// //         }
// //     };

// //     return (
// //         <div className="container mx-auto max-w-2xl py-12">
// //             {renderCurrentStep()}
// //         </div>
// //     );
// // };

// // export default UploadItemPage;

// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../contexts/AuthContext';
// // import itemService from '../services/itemService'; // Service ko import karein
// // import Spinner from '../components/common/Spinner';

// // // --- Image Uploader Component ---
// // const ImageUploader = ({ images, setImages }) => {
// //     const handleImageChange = (e) => {
// //         if (e.target.files) {
// //             const filesArray = Array.from(e.target.files).slice(0, 4);
// //             setImages(filesArray);
// //         }
// //     };
// //     return (
// //         <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">Product Images (Upload up to 4)</label>
// //             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
// //                 <div className="space-y-1 text-center">
// //                     <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
// //                     <div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500"><span>Upload files</span><input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handleImageChange} /></label><p className="pl-1">or drag and drop</p></div>
// //                     <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
// //                 </div>
// //             </div>
// //             <div className="mt-4 flex flex-wrap gap-4">
// //                 {images.map((file, index) => (<img key={index} src={URL.createObjectURL(file)} alt={`preview ${index}`} className="h-24 w-24 object-cover rounded-md shadow-sm" />))}
// //             </div>
// //         </div>
// //     );
// // };

// // const Step4_ProductForm = () => {
// //     const [listingType, setListingType] = useState('rent');
// //     const [images, setImages] = useState([]);
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [error, setError] = useState('');
// //     const { user } = useAuth();
// //     const navigate = useNavigate();

// //     const handleProductSubmit = async (e) => {
// //         e.preventDefault();
// //         if (images.length === 0) {
// //             setError('Please upload at least one image.');
// //             return;
// //         }
// //         setIsLoading(true);
// //         setError('');

// //         const formData = new FormData();
// //         formData.append('name', e.target.productName.value);
// //         formData.append('description', e.target.description.value);
// //         formData.append('category', e.target.category.value);
// //         formData.append('price', e.target.price.value); // 'pricePerDay' ke bajaye 'price'
// //         formData.append('listingType', listingType);
// //         formData.append('isFeatured', e.target.isFeatured.checked);
        
// //         for (let i = 0; i < images.length; i++) {
// //             formData.append('images', images[i]);
// //         }

// //         try {
// //             await itemService.createItem(formData, user.token);
// //             alert('Product submitted successfully!');
// //             navigate('/');
// //         } catch (err) {
// //             setError('Failed to submit product. Please check your backend server for errors.');
// //             console.error(err);
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };

// //     return (
// //         <form onSubmit={handleProductSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
// //             <h2 className="text-3xl font-bold text-center mb-6">List Your Item</h2>
// //             <ImageUploader images={images} setImages={setImages} />
            
// //             <div><label htmlFor="productName">Product Name</label><input type="text" name="productName" id="productName" className="mt-1 block w-full p-2 border rounded-md" required /></div>
// //             <div><label htmlFor="description">Description</label><textarea name="description" id="description" rows="4" className="mt-1 block w-full p-2 border rounded-md" required></textarea></div>
// //             <div><label>Listing Type</label><div className="mt-2 flex rounded-md"><button type="button" onClick={() => setListingType('rent')} className={`flex-1 p-2 rounded-l-md border ${listingType === 'rent' ? 'bg-teal-600 text-white' : ''}`}>For Rent</button><button type="button" onClick={() => setListingType('sell')} className={`flex-1 p-2 rounded-r-md border ${listingType === 'sell' ? 'bg-teal-600 text-white' : ''}`}>For Sale</button></div></div>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <div><label htmlFor="category">Category</label><select name="category" id="category" className="mt-1 block w-full p-2 border rounded-md" required><option value="">Select...</option><option>Furniture</option><option>Electronics</option><option>Appliances</option><option>Bikes</option></select></div>
// //                 <div><label htmlFor="price">{listingType === 'rent' ? 'Rent Price (per day)' : 'Selling Price'}</label><input type="number" name="price" id="price" className="mt-1 block w-full p-2 border rounded-md" placeholder="₹" required /></div>
// //             </div>
// //             <div><label className="flex items-center"><input type="checkbox" name="isFeatured" className="h-5 w-5" /><span className="ml-2">Feature this item on the homepage</span></label></div>

// //             <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-md font-semibold" disabled={isLoading}>
// //                 {isLoading ? 'Submitting...' : 'Submit for Listing'}
// //             </button>
// //             {error && <p className="text-red-500 text-center mt-4">{error}</p>}
// //         </form>
// //     );
// // };


// // const UploadItemPage = () => {
// //     const { user } = useAuth();
    
// //     // DEVELOPMENT: User ko verified maankar seedha form dikhayein
// //     const verificationStatus = 'unverified';
// //     const isPhoneVerified = true;

// //     const renderCurrentStep = () => {
// //         if (!user) return <p className="text-center">Please log in to upload an item.</p>;

// //         if (verificationStatus === 'verified' && isPhoneVerified) {
// //             return <Step4_ProductForm />;
// //         }
        
// //         // Yahan par baaki ke verification steps ka logic aayega
// //         // Abhi ke liye, hum ise comment kar rahe hain
        
// //         switch (verificationStatus) {
// //             case 'unverified':
// //                 return <Step1_UploadDocs setVerificationStatus={setVerification-status} />;
// //             case 'pending':
// //                 return <Step2_PendingVerification />;
// //             case 'verified':
// //                 return isPhoneVerified ? <Step4_ProductForm /> : <Step3_OtpVerification setIsPhoneVerified={setIsPhoneVerified} />;
// //             case 'rejected':
// //                 return <p>Your verification was rejected.</p>;
// //             default:
// //                 return <Spinner />;
// //         }
        
// //        return <p>Please complete verification first.</p>;
// //     };

// //     return (
// //         <div className="container mx-auto max-w-2xl py-12">
// //             {renderCurrentStep()}
// //         </div>
// //     );
// // };

// // export default UploadItemPage;

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import Spinner from '../components/common/Spinner';
// import { useNavigate } from 'react-router-dom';
// import itemService from '../services/itemService';

// // --- Image Uploader Component ---
// const ImageUploader = ({ images, setImages, title }) => {
//     const handleImageChange = (e) => {
//         if (e.target.files) {
//             const filesArray = Array.from(e.target.files).slice(0, 4);
//             setImages(filesArray);
//         }
//     };
//     return (
//         <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                 <div className="space-y-1 text-center">
//                     <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
//                     <div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500"><span>Upload files</span><input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handleImageChange} /></label><p className="pl-1">or drag and drop</p></div>
//                     <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
//                 </div>
//             </div>
//             <div className="mt-4 flex flex-wrap gap-4">
//                 {images.map((file, index) => (<img key={index} src={URL.createObjectURL(file)} alt={`preview ${index}`} className="h-24 w-24 object-cover rounded-md shadow-sm" />))}
//             </div>
//         </div>
//     );
// };


// // --- Step Components ---

// const Step1_UploadDocs = ({ setVerificationStatus }) => {
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         alert("Documents submitted for verification!");
//         setVerificationStatus('pending');
//     };

//     return (
//         <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-bold mb-4">Step 1: Upload Documents</h2>
//             <p className="text-gray-600 mb-6">Please upload your Aadhaar Card, a clear selfie, and your College ID (if you are a student).</p>
//             <div className="space-y-4 text-left">
//                 <div><label className="block text-sm font-medium text-gray-700">Aadhaar Card (Front & Back)</label><input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/></div>
//                 <div><label className="block text-sm font-medium text-gray-700">Your Selfie</label><input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/></div>
//                 <div><label className="block text-sm font-medium text-gray-700">College ID (Optional)</label><input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/></div>
//             </div>
//             <button type="submit" className="w-full mt-6 bg-teal-600 text-white py-2 rounded-md">Submit for Verification</button>
//         </form>
//     );
// };

// const Step2_PendingVerification = () => (
//     <div className="bg-white p-8 rounded-lg shadow-md text-center">
//         <h2 className="text-2xl font-bold text-yellow-500 mb-4">Verification Pending</h2>
//         <p className="text-gray-600">Your documents are under review. You will receive an email once the verification is complete. This usually takes 24-48 hours.</p>
//     </div>
// );

// const Step3_OtpVerification = ({ setIsPhoneVerified }) => {
//     const [otp, setOtp] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const handleOtpSubmit = (e) => {
//         e.preventDefault(); setIsLoading(true);
//         setTimeout(() => {
//             if (otp === '123456') { setIsPhoneVerified(true); } else { alert('Invalid OTP'); }
//             setIsLoading(false);
//         }, 1500);
//     };
//     return (
//         <form onSubmit={handleOtpSubmit} className="bg-white p-8 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-bold mb-4">Step 2: Verify Mobile Number</h2>
//             <p className="text-gray-600 mb-6">An OTP has been sent to your registered mobile number.</p>
//             <div className="mb-4"><input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="mt-1 text-center tracking-widest text-2xl block w-full p-2 border rounded-md" placeholder="_ _ _ _ _ _" maxLength="6" /></div>
//             <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-md" disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify & Proceed'}</button>
//         </form>
//     );
// };

// const Step4_ProductForm = () => {
//     const [listingType, setListingType] = useState('rent');
//     const [images, setImages] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');
//     const { user } = useAuth();
//     const navigate = useNavigate();

//     const handleProductSubmit = async (e) => {
//         e.preventDefault();
//         if (images.length === 0) { setError('Please upload at least one image.'); return; }
//         setIsLoading(true); setError('');
//         const formData = new FormData();
//         formData.append('name', e.target.productName.value);
//         formData.append('description', e.target.description.value);
//         formData.append('category', e.target.category.value);
//         formData.append('price', e.target.price.value);
//         formData.append('listingType', listingType);
//         formData.append('isFeatured', e.target.isFeatured.checked);
//         for (let i = 0; i < images.length; i++) { formData.append('images', images[i]); }
//         try {
//             await itemService.createItem(formData, user.token);
//             alert('Product submitted successfully!');
//             // navigate('/');
//         } catch (err) {
//             setError('Failed to submit product. Please check your backend server for errors.');
//             console.log(err);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleProductSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
//             <h2 className="text-3xl font-bold text-center mb-6">Step 3: List Your Item</h2>
//             <ImageUploader images={images} setImages={setImages} title="Product Images (Upload up to 4)" />
//             <div><label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label><input type="text" name="productName" id="productName" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required /></div>
//             <div><label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label><textarea name="description" id="description" rows="4" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required></textarea></div>
//             <div><label className="block text-sm font-medium text-gray-700">Listing Type</label><div className="mt-2 flex rounded-md shadow-sm"><button type="button" onClick={() => setListingType('rent')} className={`flex-1 p-2 rounded-l-md border ${listingType === 'rent' ? 'bg-teal-600 text-white border-teal-600' : 'bg-white'}`}>For Rent</button><button type="button" onClick={() => setListingType('sell')} className={`flex-1 p-2 rounded-r-md border ${listingType === 'sell' ? 'bg-teal-600 text-white border-teal-600' : 'bg-white'}`}>For Sale</button></div></div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div><label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label><select name="category" id="category" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required><option value="">Select...</option><option>Furniture</option><option>Electronics</option><option>Appliances</option><option>Bikes</option></select></div>
//                 <div><label htmlFor="price" className="block text-sm font-medium text-gray-700">{listingType === 'rent' ? 'Rent Price (per day)' : 'Selling Price'}</label><input type="number" name="price" id="price" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" placeholder="₹" required /></div>
//             </div>
//             <div className="pt-4"><label className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-md"><input type="checkbox" name="isFeatured" className="form-checkbox h-5 w-5 text-teal-600" /><span className="ml-3 text-yellow-800">Feature this item on the homepage (Additional charges apply)</span></label></div>
//             <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-red-700 transition-colors" disabled={isLoading}>{isLoading ? 'Submitting...' : 'Submit for Listing'}</button>
//             {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//         </form>
//     );
// };


// const UploadItemPage = () => {
//     const { user } = useAuth();
//     const [verificationStatus, setVerificationStatus] = useState('verified'); // yaha change karna he
//     const [isPhoneVerified, setIsPhoneVerified] = useState(false);

//     const renderCurrentStep = () => {
//         if (!user) return <p className="text-center">Please log in to upload an item.</p>;
//         switch (verificationStatus) {
//             case 'unverified':
//                 return <Step1_UploadDocs setVerificationStatus={setVerificationStatus} />;
//             case 'pending':
//                 return <Step2_PendingVerification />;
//             case 'verified':
//                 return isPhoneVerified ? <Step4_ProductForm /> : <Step3_OtpVerification setIsPhoneVerified={setIsPhoneVerified} />;
//             case 'rejected':
//                 return <p className="text-center text-red-500">Your verification was rejected. Please check your email for details.</p>;
//             default:
//                 return <Spinner />;
//         }
//     };

//     return (
//         <div className="container mx-auto max-w-2xl py-12">
//             {renderCurrentStep()}
//         </div>
//     );
// };

// export default UploadItemPage;

// import React, { useState } from 'react';

// // Ek alag component image upload ke liye
// const ImageUploader = ({ images, setImages }) => {
//     const handleImageChange = (e) => {
//         if (e.target.files) {
//             const filesArray = Array.from(e.target.files).slice(0, 4); // Sirf 4 images
//             setImages(filesArray);
//         }
//     };

//     return (
//         <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Product Images (Upload up to 4)
//             </label>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                 <div className="space-y-1 text-center">
//                     <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
//                         <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                     <div className="flex text-sm text-gray-600">
//                         <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none">
//                             <span>Upload files</span>
//                             <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handleImageChange} />
//                         </label>
//                         <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//                 </div>
//             </div>
//             <div className="mt-2 flex flex-wrap gap-2">
//                 {images.map((file, index) => (
//                     <img key={index} src={URL.createObjectURL(file)} alt={`preview ${index}`} className="h-20 w-20 object-cover rounded" />
//                 ))}
//             </div>
//         </div>
//     );
// };


// const UploadItemPage = () => {
//     const [step, setStep] = useState(1); // 1: Aadhaar, 2: OTP, 3: Form
//     const [aadhaar, setAadhaar] = useState('');
//     const [mobile, setMobile] = useState('');
//     const [otp, setOtp] = useState('');
//     const [isVerified, setIsVerified] = useState(false);
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     // Form state
//     const [productName, setProductName] = useState('');
//     const [description, setDescription] = useState('');
//     const [category, setCategory] = useState('');
//     const [price, setPrice] = useState('');
//     const [images, setImages] = useState([]);

//     const handleAadhaarSubmit = (e) => {
//         e.preventDefault();
//         setError('');
//         if (!/^\d{12}$/.test(aadhaar)) {
//             setError('Please enter a valid 12-digit Aadhaar number.');
//             return;
//         }
//         setStep(2); // Move to OTP step
//     };

//     const handleOtpSubmit = (e) => {
//         e.preventDefault();
//         setError('');
//         setIsLoading(true);

//         // Yahan par backend ko call karke real OTP bheja jaayega
//         // Abhi ke liye hum "123456" ko sahi OTP maan rahe hain
//         setTimeout(() => {
//             if (otp === '123456') {
//                 setIsVerified(true);
//                 setStep(3);
//             } else {
//                 setError('Invalid OTP. Please try again.');
//             }
//             setIsLoading(false);
//         }, 1500);
//     };

//     const handleProductSubmit = (e) => {
//         e.preventDefault();
//         console.log({ productName, description, category, price, images });
//         alert('Product submitted for review!');
//     };

//     const renderStep = () => {
//         switch (step) {
//             case 1: // Aadhaar Input
//                 return (
//                     <form onSubmit={handleAadhaarSubmit} className="bg-white p-8 rounded-lg shadow-md">
//                         <h1 className="text-2xl font-bold text-center mb-2">Verify Your Identity</h1>
//                         <p className="text-gray-600 text-center mb-6">Enter your Aadhaar to begin.</p>
//                         <div className="mb-4">
//                             <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
//                             <input type="text" id="aadhaar" value={aadhaar} onChange={(e) => setAadhaar(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" placeholder="Enter 12-digit number" maxLength="12" />
//                             {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//                         </div>
//                         <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-md">Next</button>
//                     </form>
//                 );
//             case 2: // OTP Input
//                 return (
//                     <form onSubmit={handleOtpSubmit} className="bg-white p-8 rounded-lg shadow-md">
//                         <h1 className="text-2xl font-bold text-center mb-2">Mobile Verification</h1>
//                         <p className="text-gray-600 text-center mb-6">We'll send an OTP to your mobile number.</p>
//                         <div className="mb-4">
//                             <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
//                             <input type="text" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" placeholder="Enter 10-digit number" maxLength="10" />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
//                             <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" placeholder="Enter 6-digit OTP" maxLength="6" />
//                             {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//                         </div>
//                         <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-md" disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify & Proceed'}</button>
//                     </form>
//                 );
//             case 3: // Product Form
//                 return (
//                     <form onSubmit={handleProductSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
//                         <h1 className="text-2xl font-bold text-center mb-6">List Your Item</h1>
//                         <ImageUploader images={images} setImages={setImages} />
//                         <div><label htmlFor="productName">Product Name</label><input type="text" id="productName" value={productName} onChange={e => setProductName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required /></div>
//                         <div><label htmlFor="description">Description</label><textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required></textarea></div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div><label htmlFor="category">Category</label><select id="category" value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required><option value="">Select...</option><option>Furniture</option><option>Electronics</option><option>Appliances</option><option>Bikes</option></select></div>
//                             <div><label htmlFor="price">Rent Price (per day)</label><input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="₹" required /></div>
//                         </div>
//                         <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-md font-semibold text-lg">Submit for Listing</button>
//                     </form>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="container mx-auto max-w-lg py-12">
//             {renderStep()}
//         </div>
//     );
// };

// export default UploadItemPage;


// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import Spinner from '../components/common/Spinner';

// // Har step ke liye alag component
// const Step1_UploadDocs = ({ setVerificationStatus }) => {
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Yahan par images Cloudinary par upload hongi aur unke URL backend ko bheje jaayenge.
//         // Backend user ka status 'pending' set kar dega.
//         // Abhi ke liye, hum ise simulate kar rahe hain.
//         alert("Documents submitted for verification!");
//         setVerificationStatus('pending');
//     };

//     return (
//         <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-bold mb-4">Step 1: Upload Documents</h2>
//             <p className="text-gray-600 mb-6">Please upload your Aadhaar Card, a clear selfie, and your College ID (if you are a student).</p>
//             <div className="space-y-4 text-left">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Aadhaar Card (Front & Back)</label>
//                     <input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Your Selfie</label>
//                     <input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">College ID (Optional)</label>
//                     <input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
//                 </div>
//             </div>
//             <button type="submit" className="w-full mt-6 bg-teal-600 text-white py-2 rounded-md">Submit for Verification</button>
//         </form>
//     );
// };

// const Step2_PendingVerification = () => {
//     return (
//         <div className="bg-white p-8 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-bold text-yellow-500 mb-4">Verification Pending</h2>
//             <p className="text-gray-600">Your documents are under review. You will receive an email once the verification is complete. This usually takes 24-48 hours.</p>
//         </div>
//     );
// };

// const Step3_OtpVerification = ({ setIsPhoneVerified }) => {
//     const [otp, setOtp] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const handleOtpSubmit = (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         // Yahan backend ko call karke OTP verify hoga
//         setTimeout(() => {
//             if (otp === '123456') { // Demo OTP
//                 setIsPhoneVerified(true);
//             } else {
//                 alert('Invalid OTP');
//             }
//             setIsLoading(false);
//         }, 1500);
//     };
    
//     return (
//         <form onSubmit={handleOtpSubmit} className="bg-white p-8 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-bold mb-4">Step 2: Verify Mobile Number</h2>
//             <p className="text-gray-600 mb-6">An OTP has been sent to your registered mobile number.</p>
//             <div className="mb-4">
//                 <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="mt-1 text-center tracking-widest text-2xl block w-full p-2 border rounded-md" placeholder="_ _ _ _ _ _" maxLength="6" />
//             </div>
//             <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-md" disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify & Proceed'}</button>
//         </form>
//     );
// };

// const Step4_ProductForm = () => {
//     // ... (Product form ka poora code yahan aayega, jaisa humne pehle banaya tha) ...
//     return (
//         <div className="bg-white p-8 rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold text-center mb-6">Step 3: List Your Item</h2>
//             {/* Yahan poora product form aayega */}
//             <p className="text-center mb-4">Your full product listing form will appear here.</p>
//             <div className="mt-6">
//                 <label className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-md">
//                     <input type="checkbox" className="form-checkbox h-5 w-5 text-teal-600" />
//                     <span className="ml-3 text-yellow-800">Feature this item on the homepage (Additional charges apply)</span>
//                 </label>
//             </div>
//             <button className="w-full mt-6 bg-red-600 text-white py-3 rounded-md font-semibold text-lg">Submit for Listing</button>
//         </div>
//     );
// };


// const UploadItemPage = () => {
//     const { user } = useAuth();
//     // Asli app mein, yeh status aur phone verification user object se aayega
//     // const verificationStatus = user?.verification?.status || 'unverified';
//     // const isPhoneVerified = user?.isPhoneVerified || false;

//     // Abhi ke liye, hum inko manually control karenge taaki har step dekh sakein
//     const [verificationStatus, setVerificationStatus] = useState('verified'); // 'unverified', 'pending', 'verified'
//     const [isPhoneVerified, setIsPhoneVerified] = useState(false);

//     const renderCurrentStep = () => {
//         if (!user) return <p className="text-center">Please log in to upload an item.</p>;

//         switch (verificationStatus) {
//             case 'unverified':
//                 return <Step1_UploadDocs setVerificationStatus={setVerificationStatus} />;
//             case 'pending':
//                 return <Step2_PendingVerification />;
//             case 'verified':
//                 return isPhoneVerified ? <Step4_ProductForm /> : <Step3_OtpVerification setIsPhoneVerified={setIsPhoneVerified} />;
//             case 'rejected':
//                 return <p className="text-center text-red-500">Your verification was rejected. Please check your email for details.</p>;
//             default:
//                 return <Spinner />;
//         }
//     };

//     return (
//         <div className="container mx-auto max-w-2xl py-12">
//             {renderCurrentStep()}
//         </div>
//     );
// };

// export default UploadItemPage;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import itemService from '../services/itemService'; // Service ko import karein
// import Spinner from '../components/common/Spinner';

// // --- Image Uploader Component ---
// const ImageUploader = ({ images, setImages }) => {
//     const handleImageChange = (e) => {
//         if (e.target.files) {
//             const filesArray = Array.from(e.target.files).slice(0, 4);
//             setImages(filesArray);
//         }
//     };
//     return (
//         <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Product Images (Upload up to 4)</label>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                 <div className="space-y-1 text-center">
//                     <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
//                     <div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500"><span>Upload files</span><input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handleImageChange} /></label><p className="pl-1">or drag and drop</p></div>
//                     <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
//                 </div>
//             </div>
//             <div className="mt-4 flex flex-wrap gap-4">
//                 {images.map((file, index) => (<img key={index} src={URL.createObjectURL(file)} alt={`preview ${index}`} className="h-24 w-24 object-cover rounded-md shadow-sm" />))}
//             </div>
//         </div>
//     );
// };

// const Step4_ProductForm = () => {
//     const [listingType, setListingType] = useState('rent');
//     const [images, setImages] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');
//     const { user } = useAuth();
//     const navigate = useNavigate();

//     const handleProductSubmit = async (e) => {
//         e.preventDefault();
//         if (images.length === 0) {
//             setError('Please upload at least one image.');
//             return;
//         }
//         setIsLoading(true);
//         setError('');

//         const formData = new FormData();
//         formData.append('name', e.target.productName.value);
//         formData.append('description', e.target.description.value);
//         formData.append('category', e.target.category.value);
//         formData.append('price', e.target.price.value); // 'pricePerDay' ke bajaye 'price'
//         formData.append('listingType', listingType);
//         formData.append('isFeatured', e.target.isFeatured.checked);
        
//         for (let i = 0; i < images.length; i++) {
//             formData.append('images', images[i]);
//         }

//         try {
//             await itemService.createItem(formData, user.token);
//             alert('Product submitted successfully!');
//             navigate('/');
//         } catch (err) {
//             setError('Failed to submit product. Please check your backend server for errors.');
//             console.error(err);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleProductSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
//             <h2 className="text-3xl font-bold text-center mb-6">List Your Item</h2>
//             <ImageUploader images={images} setImages={setImages} />
            
//             <div><label htmlFor="productName">Product Name</label><input type="text" name="productName" id="productName" className="mt-1 block w-full p-2 border rounded-md" required /></div>
//             <div><label htmlFor="description">Description</label><textarea name="description" id="description" rows="4" className="mt-1 block w-full p-2 border rounded-md" required></textarea></div>
//             <div><label>Listing Type</label><div className="mt-2 flex rounded-md"><button type="button" onClick={() => setListingType('rent')} className={`flex-1 p-2 rounded-l-md border ${listingType === 'rent' ? 'bg-teal-600 text-white' : ''}`}>For Rent</button><button type="button" onClick={() => setListingType('sell')} className={`flex-1 p-2 rounded-r-md border ${listingType === 'sell' ? 'bg-teal-600 text-white' : ''}`}>For Sale</button></div></div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div><label htmlFor="category">Category</label><select name="category" id="category" className="mt-1 block w-full p-2 border rounded-md" required><option value="">Select...</option><option>Furniture</option><option>Electronics</option><option>Appliances</option><option>Bikes</option></select></div>
//                 <div><label htmlFor="price">{listingType === 'rent' ? 'Rent Price (per day)' : 'Selling Price'}</label><input type="number" name="price" id="price" className="mt-1 block w-full p-2 border rounded-md" placeholder="₹" required /></div>
//             </div>
//             <div><label className="flex items-center"><input type="checkbox" name="isFeatured" className="h-5 w-5" /><span className="ml-2">Feature this item on the homepage</span></label></div>

//             <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-md font-semibold" disabled={isLoading}>
//                 {isLoading ? 'Submitting...' : 'Submit for Listing'}
//             </button>
//             {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//         </form>
//     );
// };


// const UploadItemPage = () => {
//     const { user } = useAuth();
    
//     // DEVELOPMENT: User ko verified maankar seedha form dikhayein
//     const verificationStatus = 'unverified';
//     const isPhoneVerified = true;

//     const renderCurrentStep = () => {
//         if (!user) return <p className="text-center">Please log in to upload an item.</p>;

//         if (verificationStatus === 'verified' && isPhoneVerified) {
//             return <Step4_ProductForm />;
//         }
        
//         // Yahan par baaki ke verification steps ka logic aayega
//         // Abhi ke liye, hum ise comment kar rahe hain
        
//         switch (verificationStatus) {
//             case 'unverified':
//                 return <Step1_UploadDocs setVerificationStatus={setVerification-status} />;
//             case 'pending':
//                 return <Step2_PendingVerification />;
//             case 'verified':
//                 return isPhoneVerified ? <Step4_ProductForm /> : <Step3_OtpVerification setIsPhoneVerified={setIsPhoneVerified} />;
//             case 'rejected':
//                 return <p>Your verification was rejected.</p>;
//             default:
//                 return <Spinner />;
//         }
        
//        return <p>Please complete verification first.</p>;
//     };

//     return (
//         <div className="container mx-auto max-w-2xl py-12">
//             {renderCurrentStep()}
//         </div>
//     );
// };

// export default UploadItemPage;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import itemService from '../services/itemService';
// import Spinner from '../components/common/Spinner';

// // --- Reusable Image Uploader ---
// const ImageUploader = ({ title, images, setImages, maxFiles = 4 }) => {
//     const handleImageChange = (e) => {
//         if (e.target.files) {
//             const filesArray = Array.from(e.target.files).slice(0, maxFiles);
//             setImages(filesArray);
//         }
//     };
//     return (
//         <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                 <div className="space-y-1 text-center">
//                     <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
//                     <div className="flex text-sm text-gray-600"><label htmlFor={title} className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500"><span>Upload file(s)</span><input id={title} name={title} type="file" className="sr-only" multiple={maxFiles > 1} accept="image/*" onChange={handleImageChange} /></label><p className="pl-1">or drag and drop</p></div>
//                 </div>
//             </div>
//             <div className="mt-4 flex flex-wrap gap-4">
//                 {images.map((file, index) => (<img key={index} src={URL.createObjectURL(file)} alt={`preview ${index}`} className="h-24 w-24 object-cover rounded-md shadow-sm" />))}
//             </div>
//         </div>
//     );
// };

// // --- Step 1: Document Upload Component ---
// const Step1_UploadDocs = ({ setVerificationStatus }) => {
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // NOTE: Yahan par actual API call hogi documents upload karne ke liye.
//         // Abhi ke liye, hum aage badhne ka simulation kar rahe hain.
//         alert("Documents submitted for verification!");
//         setVerificationStatus('pending');
//     };

//     return (
//         <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-bold mb-4">Step 1: Upload Documents</h2>
//             <p className="text-gray-600 mb-6">Please upload your Aadhaar Card, a clear selfie, and your College ID (if you are a student).</p>
//             <div className="space-y-4 text-left">
//                 <div><label className="block text-sm font-medium text-gray-700">Aadhaar Card (Front & Back)</label><input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" required /></div>
//                 <div><label className="block text-sm font-medium text-gray-700">Your Selfie</label><input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" required /></div>
//                 <div><label className="block text-sm font-medium text-gray-700">College ID (Optional)</label><input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" /></div>
//             </div>
//             <button type="submit" className="w-full mt-6 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700">Submit for Verification</button>
//         </form>
//     );
// };

// // --- Step 2: Pending Verification Component ---
// const Step2_PendingVerification = () => (
//     <div className="bg-white p-8 rounded-lg shadow-md text-center">
//         <h2 className="text-2xl font-bold text-yellow-500 mb-4">Verification Pending</h2>
//         <p className="text-gray-600">Your documents are under review. You will receive an email once the verification is complete. This usually takes 24-48 hours.</p>
//     </div>
// );

// // --- Step 3: OTP Verification Component ---
// const Step3_OtpVerification = ({ setIsPhoneVerified }) => {
//     const [otp, setOtp] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const handleOtpSubmit = (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         // NOTE: Yahan backend ko call karke real OTP verify hoga.
//         // Abhi ke liye hum '123456' ko sahi maan rahe hain.
//         setTimeout(() => {
//             if (otp === '123456') {
//                 setIsPhoneVerified(true);
//             } else {
//                 alert('Invalid OTP. Please try again.');
//             }
//             setIsLoading(false);
//         }, 1500);
//     };

//     return (
//         <form onSubmit={handleOtpSubmit} className="bg-white p-8 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-bold mb-4">Step 2: Verify Mobile Number</h2>
//             <p className="text-gray-600 mb-6">An OTP has been sent to your registered mobile number.</p>
//             <div className="mb-4"><input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="mt-1 text-center tracking-widest text-2xl block w-full p-2 border rounded-md" placeholder="_ _ _ _ _ _" maxLength="6" required /></div>
//             <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700" disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify & Proceed'}</button>
//         </form>
//     );
// };


// // --- Step 4: Product Form Component ---
// const Step4_ProductForm = () => {
//     const { user } = useAuth();
//     const navigate = useNavigate();

//     const [listingType, setListingType] = useState('rent');
//     const [category, setCategory] = useState('');
//     const [images, setImages] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [availableFrom, setAvailableFrom] = useState('');
//     const [availableTo, setAvailableTo] = useState('');
//     const [duration, setDuration] = useState(1);
//     const [durationType, setDurationType] = useState('months');

//     useEffect(() => {
//         if (availableFrom && duration > 0) {
//             const startDate = new Date(availableFrom);
//             if (isNaN(startDate.getTime())) return;
//             let endDate = new Date(startDate);
//             if (durationType === 'days') {
//                 endDate.setDate(startDate.getDate() + parseInt(duration));
//             } else if (durationType === 'months') {
//                 endDate.setMonth(startDate.getMonth() + parseInt(duration));
//             } else if (durationType === 'years') {
//                 endDate.setFullYear(startDate.getFullYear() + parseInt(duration));
//             }
//             setAvailableTo(endDate.toISOString().split('T')[0]);
//         }
//     }, [availableFrom, duration, durationType]);

//     const handleProductSubmit = async (e) => {
//         e.preventDefault();
//         if (images.length === 0) { setError('Please upload at least one product image.'); return; }
//         setIsLoading(true);
//         setError('');

//         try {
//             const formData = new FormData();
//             formData.append("name", e.target.name.value);
//             formData.append("description", e.target.description.value);
//             formData.append('listingType', listingType);
//             formData.append('category', category);
//             formData.append('price', e.target.price.value);
//             formData.append('ownerName', e.target.ownerName.value);
//             formData.append('itemAge', e.target.itemAge.value);
//             formData.append('anyDefects', e.target.anyDefects.value);
//             formData.append('isFeatured', e.target.isFeatured.checked);

//             if (listingType === 'rent') {
//                 formData.append('duration', duration);
//                 formData.append('durationType', durationType);
//                 formData.append('availableFrom', availableFrom);
//                 formData.append('availableTo', availableTo);
//             }

//             images.forEach((file) => formData.append('images', file));
            
//             const createdItem = await itemService.createItem(formData, user.token);
//             alert('Product submitted successfully!');
//             navigate(`/category/${createdItem.category.toLowerCase()}`);
//         } catch (err) {
//             console.error("Submission Error:", err.response?.data?.message || err.message);
//             setError(err.response?.data?.message || 'Failed to submit product. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleProductSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
//             <h2 className="text-3xl font-bold text-center mb-6">Step 3: List Your Item</h2>
//             <ImageUploader title="Product Images (Upload up to 4)" images={images} setImages={setImages} />
            
//             <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label><input type="text" name="name" id="name" className="mt-1 block w-full p-2 border rounded-md" required /></div>
//             <div><label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label><textarea name="description" id="description" rows="3" className="mt-1 block w-full p-2 border rounded-md" required></textarea></div>
            
//             <div className="space-y-4 p-4 border rounded-md bg-gray-50">
//                 <h3 className="font-semibold text-lg text-gray-800">Item Details</h3>
//                 <div><label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">Owner Name</label><input type="text" name="ownerName" id="ownerName" defaultValue={user?.name || ''} className="mt-1 block w-full p-2 border rounded-md" required /></div>
//                 <div><label htmlFor="itemAge" className="block text-sm font-medium text-gray-700">How old is the item?</label><select name="itemAge" id="itemAge" className="mt-1 block w-full p-2 border rounded-md" required><option value="">Select age</option><option>0-6 Months</option><option>6-12 Months</option><option>1-2 Years</option><option>More than 2 Years</option></select></div>
//                 <div><label htmlFor="anyDefects" className="block text-sm font-medium text-gray-700">Any defects or comments?</label><textarea name="anyDefects" id="anyDefects" rows="2" className="mt-1 block w-full p-2 border rounded-md" placeholder="e.g., Minor scratch on the side"></textarea></div>
//             </div>

//             <div><label className="block text-sm font-medium text-gray-700">Listing Type</label><div className="mt-2 flex rounded-md"><button type="button" onClick={() => setListingType('rent')} className={`flex-1 p-2 rounded-l-md border ${listingType === 'rent' ? 'bg-teal-600 text-white' : ''}`}>For Rent</button><button type="button" onClick={() => setListingType('sell')} className={`flex-1 p-2 rounded-r-md border ${listingType === 'sell' ? 'bg-teal-600 text-white' : ''}`}>For Sale</button></div></div>
            
//             {listingType === 'rent' && (
//                 <div className="p-4 border rounded-md bg-gray-50 space-y-4">
//                     <h3 className="font-semibold text-lg text-gray-800">Rental Availability</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label htmlFor="duration" className="block text-sm font-medium text-gray-700">For how long?</label>
//                             <div className="flex mt-1">
//                                 <input type="number" name="duration" id="duration" value={duration} onChange={e => setDuration(e.target.value)} className="w-1/2 p-2 border rounded-l-md" min="1" />
//                                 <select name="durationType" value={durationType} onChange={e => setDurationType(e.target.value)} className="w-1/2 p-2 border-t border-b border-r rounded-r-md bg-gray-100"><option value="days">Days</option><option value="months">Months</option><option value="years">Years</option></select>
//                             </div>
//                         </div>
//                         <div><label htmlFor="availableFrom" className="block text-sm font-medium text-gray-700">Available From</label><input type="date" name="availableFrom" id="availableFrom" value={availableFrom} onChange={e => setAvailableFrom(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required /></div>
//                     </div>
//                     <div><label htmlFor="availableTo" className="block text-sm font-medium text-gray-700">Available To (Auto-calculated)</label><input type="date" name="availableTo" id="availableTo" value={availableTo} className="mt-1 block w-full p-2 border rounded-md bg-gray-200" readOnly /></div>
//                 </div>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div><label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label><select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required><option value="">Select...</option><option>Furniture</option><option>Electronics</option><option>Appliances</option><option>Bikes</option></select></div>
//                 <div><label htmlFor="price" className="block text-sm font-medium text-gray-700">{listingType === 'rent' ? 'Rent Price (per day)' : 'Selling Price'}</label><input type="number" name="price" id="price" className="mt-1 block w-full p-2 border rounded-md" placeholder="₹" required /></div>
//             </div>
            
//             <div><label className="flex items-center"><input type="checkbox" name="isFeatured" className="h-5 w-5" /><span className="ml-2">Feature this item on the homepage</span></label></div>
            
//             <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700" disabled={isLoading}>{isLoading ? 'Submitting...' : 'Submit for Listing'}</button>
//             {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//         </form>
//     );
// };


// // --- Main Upload Item Page Component ---
// const UploadItemPage = () => {
//     const { user } = useAuth();
    
//     // In states ko manually change karke aap har step test kar sakte hain
//     // Asli app mein, yeh data user object se aayega: `user?.verificationStatus`
//     const [verificationStatus, setVerificationStatus] = useState('verified'); // 'unverified', 'pending', 'verified', 'rejected'
//     const [isPhoneVerified, setIsPhoneVerified] = useState(false);

//     // Yeh function decide karta hai ki user ko kaunsa step dikhana hai
//     const renderCurrentStep = () => {
//         if (!user) {
//             return <p className="text-center text-gray-700">Please log in to upload an item.</p>;
//         }

//         switch (verificationStatus) {
//             case 'unverified':
//                 return <Step1_UploadDocs setVerificationStatus={setVerificationStatus} />;
//             case 'pending':
//                 return <Step2_PendingVerification />;
//             case 'verified':
//                 // Agar KYC verified hai, toh phone verification check karo
//                 return isPhoneVerified 
//                     ? <Step4_ProductForm /> 
//                     : <Step3_OtpVerification setIsPhoneVerified={setIsPhoneVerified} />;
//             case 'rejected':
//                 return <p className="text-center text-red-500">Your verification was rejected. Please check your email for details.</p>;
//             default:
//                 return <Spinner />;
//         }
//     };

//     return (
//         <div className="container mx-auto max-w-2xl py-12 px-4">
//             {renderCurrentStep()}
//         </div>
//     );
// };

// export default UploadItemPage;

//chnage 

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext.jsx';
// import itemService from '../services/itemService.jsx';
// import Spinner from '../components/common/Spinner.jsx';
// import { toast } from 'react-toastify';

// // --- Reusable Image Uploader ---
// const ImageUploader = ({ title, images, setImages, maxFiles = 4 }) => {
//     const handleImageChange = (e) => {
//         if (e.target.files) {
//             const filesArray = Array.from(e.target.files).slice(0, maxFiles);
//             setImages(filesArray);
//         }
//     };
//     return (
//         <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                 <div className="space-y-1 text-center">
//                     <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
//                     <div className="flex text-sm text-gray-600"><label htmlFor={title} className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500"><span>Upload file(s)</span><input id={title} name={title} type="file" className="sr-only" multiple={maxFiles > 1} accept="image/*" onChange={handleImageChange} /></label><p className="pl-1">or drag and drop</p></div>
//                 </div>
//             </div>
//             <div className="mt-4 flex flex-wrap gap-4">
//                 {images.map((file, index) => (<img key={index} src={URL.createObjectURL(file)} alt={`preview ${index}`} className="h-24 w-24 object-cover rounded-md shadow-sm" />))}
//             </div>
//         </div>
//     );
// };

// // --- Step 1: Document Upload Component ---
// const Step1_UploadDocs = ({ setVerificationStatus }) => {
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         toast.success("Documents submitted for verification!");
//         setVerificationStatus('pending');
//     };

//     return (
//         <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-bold mb-4">Step 1: Upload Documents</h2>
//             <p className="text-gray-600 mb-6">Please upload your Aadhaar Card, a clear selfie, and your College ID (if you are a student).</p>
//             <div className="space-y-4 text-left">
//                 <div><label className="block text-sm font-medium text-gray-700">Aadhaar Card (Front & Back)</label><input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" required /></div>
//                 <div><label className="block text-sm font-medium text-gray-700">Your Selfie</label><input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" required /></div>
//                 <div><label className="block text-sm font-medium text-gray-700">College ID (Optional)</label><input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" /></div>
//             </div>
//             <button type="submit" className="w-full mt-6 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700">Submit for Verification</button>
//         </form>
//     );
// };

// // --- Step 2: Pending Verification Component ---
// const Step2_PendingVerification = () => (
//     <div className="bg-white p-8 rounded-lg shadow-md text-center">
//         <h2 className="text-2xl font-bold text-yellow-500 mb-4">Verification Pending</h2>
//         <p className="text-gray-600">Your documents are under review. You will receive an email once the verification is complete. This usually takes 24-48 hours.</p>
//     </div>
// );

// // --- Step 3: OTP Verification Component ---
// const Step3_OtpVerification = ({ setIsPhoneVerified }) => {
//     const [otp, setOtp] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const handleOtpSubmit = (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setTimeout(() => {
//             if (otp === '123456') {
//                 setIsPhoneVerified(true);
//             } else {
//                 toast.error('Invalid OTP. Please try again.');
//             }
//             setIsLoading(false);
//         }, 1500);
//     };

//     return (
//         <form onSubmit={handleOtpSubmit} className="bg-white p-8 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-bold mb-4">Step 2: Verify Mobile Number</h2>
//             <p className="text-gray-600 mb-6">An OTP has been sent to your registered mobile number.</p>
//             <div className="mb-4"><input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="mt-1 text-center tracking-widest text-2xl block w-full p-2 border rounded-md" placeholder="_ _ _ _ _ _" maxLength="6" required /></div>
//             <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700" disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify & Proceed'}</button>
//         </form>
//     );
// };


// // --- Step 4: Product Form Component ---
// const Step4_ProductForm = () => {
//     const { user } = useAuth();
//     const navigate = useNavigate();

//     const [listingType, setListingType] = useState('rent');
//     const [images, setImages] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');

//     // Controlled states for form fields
//     const [category, setCategory] = useState('');
//     const [itemAge, setItemAge] = useState('');
//     const [price, setPrice] = useState('');
    
//     // States for Price Suggestion
//     const [suggestion, setSuggestion] = useState('');
//     const [isSuggesting, setIsSuggesting] = useState(false);

//     const handleSuggestPrice = async () => {
//         if (!category || !itemAge) {
//             toast.error("Please select a category and item age first.");
//             return;
//         }
//         setIsSuggesting(true);
//         setSuggestion('');
//         try {
//             const data = await itemService.getPriceSuggestion(
//                 { category, itemAge },
//                 user.token
//             );
//             setSuggestion(data.suggestion);
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Could not get a price suggestion.");
//         } finally {
//             setIsSuggesting(false);
//         }
//     };

//     const handleProductSubmit = async (e) => {
//         e.preventDefault();
//         if (images.length === 0) { setError('Please upload at least one product image.'); return; }
//         setIsLoading(true);
//         setError('');

//         try {
//             const formData = new FormData();
//             formData.append("name", e.target.name.value);
//             formData.append("description", e.target.description.value);
//             formData.append('listingType', listingType);
//             formData.append('category', category); // From state
//             formData.append('price', price); // From state
//             formData.append('ownerName', e.target.ownerName.value);
//             formData.append('itemAge', itemAge); // From state
//             formData.append('anyDefects', e.target.anyDefects.value);
//             formData.append('isFeatured', e.target.isFeatured.checked);
//             images.forEach((file) => formData.append('images', file));
            
//             const createdItem = await itemService.createItem(formData, user.token);
//             toast.success('Product submitted successfully!');
//             navigate(`/item/${createdItem._id}`);
//         } catch (err) {
//             console.error("Submission Error:", err.response?.data?.message || err.message);
//             setError(err.response?.data?.message || 'Failed to submit product. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleProductSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
//             <h2 className="text-3xl font-bold text-center mb-6">Step 3: List Your Item</h2>
//             <ImageUploader title="Product Images (Upload up to 4)" images={images} setImages={setImages} />
            
//             <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label><input type="text" name="name" id="name" className="mt-1 block w-full p-2 border rounded-md" required /></div>
//             <div><label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label><textarea name="description" id="description" rows="3" className="mt-1 block w-full p-2 border rounded-md" required></textarea></div>
            
//             <div className="space-y-4 p-4 border rounded-md bg-gray-50">
//                 <h3 className="font-semibold text-lg text-gray-800">Item Details</h3>
//                 <div><label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">Owner Name</label><input type="text" name="ownerName" id="ownerName" defaultValue={user?.name || ''} className="mt-1 block w-full p-2 border rounded-md" required /></div>
//                 <div>
//                     <label htmlFor="itemAge" className="block text-sm font-medium text-gray-700">How old is the item?</label>
//                     <select name="itemAge" id="itemAge" value={itemAge} onChange={e => setItemAge(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required>
//                         <option value="">Select age</option>
//                         <option value="0-1 year">0-1 Year</option>
//                         <option value="1-3 years">1-3 Years</option>
//                         <option value="3+ years">3+ Years</option>
//                     </select>
//                 </div>
//                 <div><label htmlFor="anyDefects" className="block text-sm font-medium text-gray-700">Any defects or comments?</label><textarea name="anyDefects" id="anyDefects" rows="2" className="mt-1 block w-full p-2 border rounded-md" placeholder="e.g., Minor scratch on the side"></textarea></div>
//             </div>

//             <div><label className="block text-sm font-medium text-gray-700">Listing Type</label><div className="mt-2 flex rounded-md"><button type="button" onClick={() => setListingType('rent')} className={`flex-1 p-2 rounded-l-md border ${listingType === 'rent' ? 'bg-teal-600 text-white' : ''}`}>For Rent</button><button type="button" onClick={() => setListingType('sell')} className={`flex-1 p-2 rounded-r-md border ${listingType === 'sell' ? 'bg-teal-600 text-white' : ''}`}>For Sale</button></div></div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                     <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
//                     <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required>
//                         <option value="">Select...</option>
//                         <option>Furniture</option>
//                         <option>Electronics</option>
//                         <option>Vehicles</option>
//                         <option>Clothing</option>
//                         <option>Sports Equipment</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label htmlFor="price" className="block text-sm font-medium text-gray-700">{listingType === 'rent' ? 'Rent Price (per day)' : 'Selling Price'}</label>
//                     <div className="flex items-center gap-2 mt-1">
//                         <input type="number" name="price" id="price" value={price} onChange={e => setPrice(e.target.value)} className="flex-grow p-2 border rounded-md" placeholder="₹" required />
//                         {listingType === 'rent' && (
//                             <button type="button" onClick={handleSuggestPrice} disabled={isSuggesting} className="bg-teal-100 text-teal-700 px-3 py-2 rounded-md text-sm font-semibold hover:bg-teal-200 disabled:opacity-50 whitespace-nowrap">
//                                 {isSuggesting ? 'Thinking...' : 'Suggest Price ✨'}
//                             </button>
//                         )}
//                     </div>
//                     {suggestion && (
//                         <p className="mt-2 text-sm text-green-600 bg-green-50 p-2 rounded-md">
//                             {suggestion}
//                         </p>
//                     )}
//                 </div>
//             </div>
            
//             <div><label className="flex items-center"><input type="checkbox" name="isFeatured" className="h-5 w-5" /><span className="ml-2">Feature this item on the homepage</span></label></div>
            
//             <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700" disabled={isLoading}>{isLoading ? 'Submitting...' : 'Submit for Listing'}</button>
//             {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//         </form>
//     );
// };


// // --- Main Upload Item Page Component ---
// const UploadItemPage = () => {
//     const { user } = useAuth();
//     const [verificationStatus, setVerificationStatus] = useState('verified'); 
//     const [isPhoneVerified, setIsPhoneVerified] = useState(true); 

//     const renderCurrentStep = () => {
//         if (!user) {
//             return <p className="text-center text-gray-700">Please log in to upload an item.</p>;
//         }

//         switch (verificationStatus) {
//             case 'unverified':
//                 return <Step1_UploadDocs setVerificationStatus={setVerificationStatus} />;
//             case 'pending':
//                 return <Step2_PendingVerification />;
//             case 'verified':
//                 return isPhoneVerified 
//                     ? <Step4_ProductForm /> 
//                     : <Step3_OtpVerification setIsPhoneVerified={setIsPhoneVerified} />;
//             case 'rejected':
//                 return <p className="text-center text-red-500">Your verification was rejected. Please check your email for details.</p>;
//             default:
//                 return <Spinner />;
//         }
//     };

//     return (
//         <div className="container mx-auto max-w-2xl py-12 px-4">
//             {renderCurrentStep()}
//         </div>
//     );
// };

// export default UploadItemPage;


//fix he 

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext.jsx';
// import itemService from '../services/itemService.jsx';
// import Spinner from '../components/common/Spinner.jsx';
// import { toast } from 'react-toastify';

// // --- Reusable Image Uploader Component ---
// const ImageUploader = ({ title, images, setImages, maxFiles = 4 }) => {
//     const handleImageChange = (e) => {
//         if (e.target.files) {
//             const filesArray = Array.from(e.target.files).slice(0, maxFiles);
//             setImages(filesArray);
//         }
//     };
//     return (
//         <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                 <div className="space-y-1 text-center">
//                     <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
//                     <div className="flex text-sm text-gray-600"><label htmlFor={title} className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500"><span>Upload file(s)</span><input id={title} name={title} type="file" className="sr-only" multiple={maxFiles > 1} accept="image/*" onChange={handleImageChange} /></label><p className="pl-1">or drag and drop</p></div>
//                 </div>
//             </div>
//             <div className="mt-4 flex flex-wrap gap-4">
//                 {images.map((file, index) => (<img key={index} src={URL.createObjectURL(file)} alt={`preview ${index}`} className="h-24 w-24 object-cover rounded-md shadow-sm" />))}
//             </div>
//         </div>
//     );
// };

// // --- Step 1: Document Upload Component ---
// const Step1_UploadDocs = ({ setVerificationStatus }) => {
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         toast.success("Documents submitted for verification!");
//         setVerificationStatus('pending');
//     };
//     return (
//         <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-bold mb-4">Step 1: Upload Documents</h2>
//             <p className="text-gray-600 mb-6">Please upload your documents for KYC verification.</p>
//             <div className="space-y-4 text-left">
//                 <div><label className="block text-sm font-medium text-gray-700">Aadhaar Card</label><input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" required /></div>
//                 <div><label className="block text-sm font-medium text-gray-700">Your Selfie</label><input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" required /></div>
//             </div>
//             <button type="submit" className="w-full mt-6 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700">Submit for Verification</button>
//         </form>
//     );
// };

// // --- Step 2: Pending Verification Component ---
// const Step2_PendingVerification = () => (
//     <div className="bg-white p-8 rounded-lg shadow-md text-center">
//         <h2 className="text-2xl font-bold text-yellow-500 mb-4">Verification Pending</h2>
//         <p className="text-gray-600">Your documents are under review. This usually takes 24-48 hours.</p>
//     </div>
// );

// // --- Step 3: OTP Verification Component ---
// const Step3_OtpVerification = ({ setIsPhoneVerified }) => {
//     const [otp, setOtp] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const handleOtpSubmit = (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setTimeout(() => {
//             if (otp === '123456') {
//                 setIsPhoneVerified(true);
//                 toast.success("Phone number verified!");
//             } else {
//                 toast.error('Invalid OTP. Please try again.');
//             }
//             setIsLoading(false);
//         }, 1500);
//     };
//     return (
//         <form onSubmit={handleOtpSubmit} className="bg-white p-8 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-bold mb-4">Step 2: Verify Mobile Number</h2>
//             <p className="text-gray-600 mb-6">An OTP has been sent to your registered mobile number.</p>
//             <div className="mb-4"><input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="mt-1 text-center tracking-widest text-2xl block w-full p-2 border rounded-md" placeholder="_ _ _ _ _ _" maxLength="6" required /></div>
//             <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700" disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify & Proceed'}</button>
//         </form>
//     );
// };


// // --- Step 4: Product Form Component ---
// const ProductForm = () => {
//     const { user } = useAuth();
//     const navigate = useNavigate();
//     const [listingType, setListingType] = useState('rent');
//     const [images, setImages] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [category, setCategory] = useState('');
//     const [itemAge, setItemAge] = useState('');
//     const [price, setPrice] = useState('');
//     const [suggestion, setSuggestion] = useState('');
//     const [isSuggesting, setIsSuggesting] = useState(false);

//     const handleSuggestPrice = async () => {
//         if (!category || !itemAge) { return toast.error("Please select a category and item age first."); }
//         setIsSuggesting(true);
//         setSuggestion('');
//         try {
//             const data = await itemService.getPriceSuggestion({ category, itemAge }, user.token);
//             setSuggestion(data.suggestion);
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Could not get a price suggestion.");
//         } finally {
//             setIsSuggesting(false);
//         }
//     };

//     const handleProductSubmit = async (e) => {
//         e.preventDefault();
//         if (images.length === 0) { setError('Please upload at least one product image.'); return; }
//         setIsLoading(true);
//         setError('');
//         try {
//             const form = e.target;
//             const formData = new FormData();
//             formData.append("name", form.name.value);
//             formData.append("description", form.description.value);
//             formData.append('listingType', listingType);
//             formData.append('category', category);
//             formData.append('price', price);
//             formData.append('ownerName', form.ownerName.value);
//             formData.append('itemAge', itemAge);
//             formData.append('anyDefects', form.anyDefects.value);
//             formData.append('isFeatured', form.isFeatured.checked);
//             images.forEach((file) => formData.append('images', file));
            
//             const createdItem = await itemService.createItem(formData, user.token);
//             toast.success('Product submitted successfully!');
//             navigate(`/item/${createdItem._id}`);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to submit product.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleProductSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
//             <h2 className="text-3xl font-bold text-center mb-6">Step 3: List Your Item</h2>
//             <ImageUploader title="Product Images (Upload up to 4)" images={images} setImages={setImages} />
            
//             <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label><input type="text" name="name" id="name" className="mt-1 block w-full p-2 border rounded-md" required /></div>
//             <div><label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label><textarea name="description" id="description" rows="3" className="mt-1 block w-full p-2 border rounded-md" required></textarea></div>
            
//             <div className="space-y-4 p-4 border rounded-md bg-gray-50">
//                 <h3 className="font-semibold text-lg text-gray-800">Item Details</h3>
//                 <div><label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">Owner Name</label><input type="text" name="ownerName" id="ownerName" defaultValue={user?.name || ''} className="mt-1 block w-full p-2 border rounded-md" required /></div>
//                 <div>
//                     <label htmlFor="itemAge" className="block text-sm font-medium text-gray-700">How old is the item?</label>
//                     <select name="itemAge" id="itemAge" value={itemAge} onChange={e => setItemAge(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required>
//                         <option value="">Select age</option>
//                         <option value="0-1 year">0-1 Year</option>
//                         <option value="1-3 years">1-3 Years</option>
//                         <option value="3+ years">3+ Years</option>
//                     </select>
//                 </div>
//                 <div><label htmlFor="anyDefects" className="block text-sm font-medium text-gray-700">Any defects or comments?</label><textarea name="anyDefects" id="anyDefects" rows="2" className="mt-1 block w-full p-2 border rounded-md" placeholder="e.g., Minor scratch on the side"></textarea></div>
//             </div>

//             <div><label className="block text-sm font-medium text-gray-700">Listing Type</label><div className="mt-2 flex rounded-md"><button type="button" onClick={() => setListingType('rent')} className={`flex-1 p-2 rounded-l-md border ${listingType === 'rent' ? 'bg-teal-600 text-white' : ''}`}>For Rent</button><button type="button" onClick={() => setListingType('sell')} className={`flex-1 p-2 rounded-r-md border ${listingType === 'sell' ? 'bg-teal-600 text-white' : ''}`}>For Sale</button></div></div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                     <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
//                     <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required>
//                         <option value="">Select...</option>
//                         <option>Furniture</option>
//                         <option>Electronics</option>
//                         <option>Vehicles</option>
//                         <option>Clothing</option>
//                         <option>Sports Equipment</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label htmlFor="price" className="block text-sm font-medium text-gray-700">{listingType === 'rent' ? 'Rent Price (per day)' : 'Selling Price'}</label>
//                     <div className="flex items-center gap-2 mt-1">
//                         <input type="number" name="price" id="price" value={price} onChange={e => setPrice(e.target.value)} className="flex-grow p-2 border rounded-md" placeholder="₹" required />
//                         {listingType === 'rent' && (
//                             <button type="button" onClick={handleSuggestPrice} disabled={isSuggesting} className="bg-teal-100 text-teal-700 px-3 py-2 rounded-md text-sm font-semibold hover:bg-teal-200 disabled:opacity-50 whitespace-nowrap">
//                                 {isSuggesting ? 'Thinking...' : 'Suggest Price ✨'}
//                             </button>
//                         )}
//                     </div>
//                     {suggestion && <p className="mt-2 text-sm text-green-600 bg-green-50 p-2 rounded-md">{suggestion}</p>}
//                 </div>
//             </div>
            
//             <div><label className="flex items-center"><input type="checkbox" name="isFeatured" className="h-5 w-5" /><span className="ml-2">Feature this item on the homepage</span></label></div>
            
//             <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700" disabled={isLoading}>{isLoading ? 'Submitting...' : 'Submit for Listing'}</button>
//             {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//         </form>
//     );
// };


// // --- Main Upload Item Page Component ---
// const UploadItemPage = () => {
//     const { user } = useAuth();
//     // In states ko manually change karke aap har step test kar sakte hain
//     const [verificationStatus, setVerificationStatus] = useState('verified'); // 'unverified', 'pending', 'verified'
//     const [isPhoneVerified, setIsPhoneVerified] = useState(true); // true ya false

//     const renderCurrentStep = () => {
//         if (!user) {
//             return <p className="text-center text-gray-700">Please log in to upload an item.</p>;
//         }

//         // Asli app mein, yeh data `user` object se aayega
//         // const userVerificationStatus = user.verification.status;
//         // const userPhoneVerified = user.isPhoneVerified;

//         switch (verificationStatus) {
//             case 'unverified':
//                 return <Step1_UploadDocs setVerificationStatus={setVerificationStatus} />;
//             case 'pending':
//                 return <Step2_PendingVerification />;
//             case 'verified':
//                 return isPhoneVerified 
//                     ? <ProductForm /> 
//                     : <Step3_OtpVerification setIsPhoneVerified={setIsPhoneVerified} />;
//             default:
//                 return <Spinner />;
//         }
//     };

//     return (
//         <div className="container mx-auto max-w-2xl py-12 px-4">
//             {renderCurrentStep()}
//         </div>
//     );
// };

// export default UploadItemPage;



//************************************ */

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext.jsx';
// import itemService from '../services/itemService.jsx';
// import Spinner from '../components/common/Spinner.jsx';
// import { toast } from 'react-toastify';

// // =================================================================
// // NOTE FOR SUBMISSION:
// // Ek real-world project me, neeche diye gaye har component 
// // (ImageUploader, Step1_UploadDocs, etc.) ko unki apni alag file me 
// // (e.g., /components/upload/ImageUploader.jsx) rakha jaana chahiye.
// // Isse code clean aur maintainable rehta hai.
// // Abhi ke liye, sabhi ek hi file me hain.
// // =================================================================


// // --- Reusable Image Uploader Component ---
// const ImageUploader = ({ title, images, setImages, maxFiles = 4 }) => {
//     const handleImageChange = (e) => {
//         if (e.target.files) {
//             const filesArray = Array.from(e.target.files).slice(0, maxFiles);
//             setImages(filesArray);
//         }
//     };
//     return (
//         <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                 <div className="space-y-1 text-center">
//                     <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
//                     <div className="flex text-sm text-gray-600"><label htmlFor={title} className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500"><span>Upload file(s)</span><input id={title} name={title} type="file" className="sr-only" multiple={maxFiles > 1} accept="image/*" onChange={handleImageChange} /></label><p className="pl-1">or drag and drop</p></div>
//                 </div>
//             </div>
//             <div className="mt-4 flex flex-wrap gap-4">
//                 {images.map((file, index) => (<img key={index} src={URL.createObjectURL(file)} alt={`preview ${index}`} className="h-24 w-24 object-cover rounded-md shadow-sm" />))}
//             </div>
//         </div>
//     );
// };

// // --- Step 1: Document Upload Component ---
// const Step1_UploadDocs = ({ setVerificationStatus }) => {
//     // NOTE: Yeh ek mock function hai. Asli app me yahan par document
//     // upload karne ke liye API call ki jaayegi.
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         toast.success("Documents submitted for verification!");
//         setVerificationStatus('pending');
//     };
//     return (
//         <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-bold mb-4">Step 1: Upload Documents</h2>
//             <p className="text-gray-600 mb-6">Please upload your documents for KYC verification.</p>
//             <div className="space-y-4 text-left">
//                 <div><label className="block text-sm font-medium text-gray-700">Aadhaar Card</label><input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" required /></div>
//                 <div><label className="block text-sm font-medium text-gray-700">Your Selfie</label><input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" required /></div>
//             </div>
//             <button type="submit" className="w-full mt-6 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700">Submit for Verification</button>
//         </form>
//     );
// };

// // --- Step 2: Pending Verification Component ---
// const Step2_PendingVerification = () => (
//     <div className="bg-white p-8 rounded-lg shadow-md text-center">
//         <h2 className="text-2xl font-bold text-yellow-500 mb-4">Verification Pending</h2>
//         <p className="text-gray-600">Your documents are under review. This usually takes 24-48 hours.</p>
//     </div>
// );

// // --- Step 3: OTP Verification Component ---
// const Step3_OtpVerification = ({ setIsPhoneVerified }) => {
//     const [otp, setOtp] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     // NOTE: Yeh ek mock function hai. Asli app me yahan par
//     // OTP verify karne ke liye API call ki jaayegi.
//     const handleOtpSubmit = (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setTimeout(() => {
//             if (otp === '123456') {
//                 setIsPhoneVerified(true);
//                 toast.success("Phone number verified!");
//             } else {
//                 toast.error('Invalid OTP. Please try again.');
//             }
//             setIsLoading(false);
//         }, 1500);
//     };
//     return (
//         <form onSubmit={handleOtpSubmit} className="bg-white p-8 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-bold mb-4">Step 2: Verify Mobile Number</h2>
//             <p className="text-gray-600 mb-6">An OTP has been sent to your registered mobile number.</p>
//             <div className="mb-4"><input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="mt-1 text-center tracking-widest text-2xl block w-full p-2 border rounded-md" placeholder="_ _ _ _ _ _" maxLength="6" required /></div>
//             <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700" disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify & Proceed'}</button>
//         </form>
//     );
// };


// // --- Step 4: Product Form Component ---
// const ProductForm = () => {
//     const { user } = useAuth();
//     const navigate = useNavigate();
    
//     // Form States
//     const [listingType, setListingType] = useState('rent');
//     const [images, setImages] = useState([]);
//     const [category, setCategory] = useState('');
//     const [itemAge, setItemAge] = useState('');
//     const [price, setPrice] = useState('');
//     // [FIX] Address ke liye state add ki gayi
//     const [address, setAddress] = useState(user?.address ? `${user.address.street}, ${user.address.city}` : '');

//     // UI/Helper States
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [suggestion, setSuggestion] = useState('');
//     const [isSuggesting, setIsSuggesting] = useState(false);

//     const handleSuggestPrice = async () => {
//         if (!category || !itemAge) { return toast.error("Please select a category and item age first."); }
//         setIsSuggesting(true);
//         setSuggestion('');
//         try {
//             const data = await itemService.getPriceSuggestion({ category, itemAge }, user.token);
//             setSuggestion(data.suggestion);
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Could not get a price suggestion.");
//         } finally {
//             setIsSuggesting(false);
//         }
//     };

//     const handleProductSubmit = async (e) => {
//         e.preventDefault();
//         if (images.length === 0) { return toast.error('Please upload at least one product image.'); }
//         setIsLoading(true);
//         setError('');
//         try {
//             const form = e.target;
//             const formData = new FormData();

//             // Form se data ko FormData object me daala jaa raha hai
//             formData.append("name", form.name.value);
//             formData.append("description", form.description.value);
//             formData.append('listingType', listingType);
//             formData.append('category', category);
//             formData.append('price', price); // Backend isko handle karega (pricePerDay ya sellingPrice)
//             formData.append('itemAge', itemAge);
//             formData.append('anyDefects', form.anyDefects.value);
//             formData.append('address', address); // [FIX] Address ko FormData me add kiya
//             formData.append('isFeatured', form.isFeatured.checked);
//             images.forEach((file) => formData.append('images', file));
            
//             // [CLEANUP] 'ownerName' ki zaroorat nahi, backend token se user ID nikal lega.

//             const createdItem = await itemService.createItem(formData, user.token);
//             toast.success('Product submitted successfully!');
//             navigate(`/item/${createdItem._id}`);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to submit product.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleProductSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
//             <h2 className="text-3xl font-bold text-center mb-6">Step 3: List Your Item</h2>
//             <ImageUploader title="Product Images (Upload up to 4)" images={images} setImages={setImages} />
            
//             <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label><input type="text" name="name" id="name" className="mt-1 block w-full p-2 border rounded-md" required /></div>
//             <div><label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label><textarea name="description" id="description" rows="3" className="mt-1 block w-full p-2 border rounded-md" required></textarea></div>
            
//             <div className="space-y-4 p-4 border rounded-md bg-gray-50">
//                 <h3 className="font-semibold text-lg text-gray-800">Item Details</h3>
//                 {/* [CLEANUP] Owner Name field hata diya gaya */}
//                 <div>
//                     <label htmlFor="itemAge" className="block text-sm font-medium text-gray-700">How old is the item?</label>
//                     <select name="itemAge" id="itemAge" value={itemAge} onChange={e => setItemAge(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required>
//                         <option value="">Select age</option>
//                         <option value="0-1 year">0-1 Year</option>
//                         <option value="1-3 years">1-3 Years</option>
//                         <option value="3+ years">3+ Years</option>
//                     </select>
//                 </div>
//                 <div><label htmlFor="anyDefects" className="block text-sm font-medium text-gray-700">Any defects or comments?</label><textarea name="anyDefects" id="anyDefects" rows="2" className="mt-1 block w-full p-2 border rounded-md" placeholder="e.g., Minor scratch on the side"></textarea></div>

//                 {/* [FIX] Address field add kiya gaya */}
//                 <div>
//                     <label htmlFor="address" className="block text-sm font-medium text-gray-700">Pickup Address</label>
//                     <textarea name="address" id="address" rows="2" value={address} onChange={e => setAddress(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" placeholder="e.g., 123 Main St, Indore" required></textarea>
//                 </div>
//             </div>

//             <div><label className="block text-sm font-medium text-gray-700">Listing Type</label><div className="mt-2 flex rounded-md"><button type="button" onClick={() => setListingType('rent')} className={`flex-1 p-2 rounded-l-md border ${listingType === 'rent' ? 'bg-teal-600 text-white' : ''}`}>For Rent</button><button type="button" onClick={() => setListingType('sell')} className={`flex-1 p-2 rounded-r-md border ${listingType === 'sell' ? 'bg-teal-600 text-white' : ''}`}>For Sale</button></div></div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                     <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
//                     <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required>
//                         <option value="">Select...</option>
//                         <option>Furniture</option>
//                         <option>Electronics</option>
//                         <option>Vehicles</option>
//                         <option>Clothing</option>
//                         <option>Sports Equipment</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label htmlFor="price" className="block text-sm font-medium text-gray-700">{listingType === 'rent' ? 'Rent Price (per day)' : 'Selling Price'}</label>
//                     <div className="flex items-center gap-2 mt-1">
//                         <input type="number" name="price" id="price" value={price} onChange={e => setPrice(e.target.value)} className="flex-grow p-2 border rounded-md" placeholder="₹" required />
//                         {listingType === 'rent' && (
//                             <button type="button" onClick={handleSuggestPrice} disabled={isSuggesting} className="bg-teal-100 text-teal-700 px-3 py-2 rounded-md text-sm font-semibold hover:bg-teal-200 disabled:opacity-50 whitespace-nowrap">
//                                 {isSuggesting ? 'Thinking...' : 'Suggest Price ✨'}
//                             </button>
//                         )}
//                     </div>
//                     {suggestion && <p className="mt-2 text-sm text-green-600 bg-green-50 p-2 rounded-md">{suggestion}</p>}
//                 </div>
//             </div>
            
//             <div><label className="flex items-center"><input type="checkbox" name="isFeatured" className="h-5 w-5" /><span className="ml-2">Feature this item on the homepage</span></label></div>
            
//             <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700" disabled={isLoading}>{isLoading ? 'Submitting...' : 'Submit for Listing'}</button>
//             {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//         </form>
//     );
// };


// // --- Main Upload Item Page Component ---
// const UploadItemPage = () => {
//     const { user } = useAuth();
    
//     // [FIX] Ab yeh state AuthContext se aane wale real user data par depend karegi.
//     // NOTE: Yeh assume kar raha hai ki aapke 'user' object me yeh details hain.
//     // Apne AuthContext ko zaroor update karein taaki woh login par yeh data provide kare.
//     const verificationStatus = user?.verification?.status || 'verified';
//     const isPhoneVerified = user?.isPhoneVerified || false;

//     // NOTE: Neeche ke do 'useState' hooks sirf mock functions ke liye hain.
//     // Asli app me yeh state user object ke hisaab se update hogi.
//     const [mockVerificationStatus, setMockVerificationStatus] = useState(verificationStatus);
//     const [mockIsPhoneVerified, setMockIsPhoneVerified] = useState(isPhoneVerified);


//     const renderCurrentStep = () => {
//         if (!user) {
//             return <p className="text-center text-gray-700">Please log in to upload an item.</p>;
//         }

//         switch (mockVerificationStatus) {
//             case 'unverified':
//                 return <Step1_UploadDocs setVerificationStatus={setMockVerificationStatus} />;
//             case 'pending':
//                 return <Step2_PendingVerification />;
//             case 'verified':
//                 return mockIsPhoneVerified 
//                     ? <ProductForm /> 
//                     : <Step3_OtpVerification setIsPhoneVerified={setMockIsPhoneVerified} />;
//             default:
//                 return <Spinner />;
//         }
//     };

//     return (
//         <div className="container mx-auto max-w-2xl py-12 px-4">
//             {renderCurrentStep()}
//         </div>
//     );
// };

// export default UploadItemPage;


//final change

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import itemService from '../services/itemService.jsx';
import Spinner from '../components/common/Spinner.jsx';
import { toast } from 'react-toastify';

// --- Reusable Image Uploader Component ---
const ImageUploader = ({ title, images, setImages, maxFiles = 4 }) => {
    // ... is component me koi badlaav nahi ...
    const handleImageChange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).slice(0, maxFiles);
            setImages(filesArray);
        }
    };
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <div className="flex text-sm text-gray-600"><label htmlFor={title} className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500"><span>Upload file(s)</span><input id={title} name={title} type="file" className="sr-only" multiple={maxFiles > 1} accept="image/*" onChange={handleImageChange} /></label><p className="pl-1">or drag and drop</p></div>
                </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
                {images.map((file, index) => (<img key={index} src={URL.createObjectURL(file)} alt={`preview ${index}`} className="h-24 w-24 object-cover rounded-md shadow-sm" />))}
            </div>
        </div>
    );
};

// --- Step 1: Document Upload Component ---
const Step1_UploadDocs = ({ setVerificationStatus }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Documents submitted for verification!");
        setVerificationStatus('pending'); // Local state ko update karega
    };
    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Step 1: Upload Documents</h2>
            <p className="text-gray-600 mb-6">Please upload your documents for KYC verification.</p>
            <div className="space-y-4 text-left">
                <div><label className="block text-sm font-medium text-gray-700">Aadhaar Card</label><input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" required /></div>
                <div><label className="block text-sm font-medium text-gray-700">Your Selfie</label><input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" required /></div>
            </div>
            <button type="submit" className="w-full mt-6 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700">Submit for Verification</button>
        </form>
    );
};

// --- Step 2: Pending Verification Component ---
const Step2_PendingVerification = () => (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4">Verification Pending</h2>
        <p className="text-gray-600">Your documents are under review. This usually takes 24-48 hours.</p>
    </div>
);

// --- Step 3: OTP Verification Component ---
const Step3_OtpVerification = ({ setIsPhoneVerified }) => {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleOtpSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            if (otp === '123456') {
                toast.success("Phone number verified!");
                setIsPhoneVerified(true); // Local state ko update karega
            } else {
                toast.error('Invalid OTP. Please try again.');
            }
            setIsLoading(false);
        }, 1500);
    };

    return (
        <form onSubmit={handleOtpSubmit} className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Step 2: Verify Mobile Number</h2>
            <p className="text-gray-600 mb-6">An OTP has been sent to your registered mobile number.</p>
            <div className="mb-4"><input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="mt-1 text-center tracking-widest text-2xl block w-full p-2 border rounded-md" placeholder="_ _ _ _ _ _" maxLength="6" required /></div>
            <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700" disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify & Proceed'}</button>
        </form>
    );
};

// --- Step 4: Product Form Component ---
const ProductForm = () => {
    // ... is component me koi badlaav nahi ...
    const { user } = useAuth();
    const navigate = useNavigate();
    const [listingType, setListingType] = useState('rent');
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState('');
    const [itemAge, setItemAge] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState(user?.address ? `${user.address.street || ''}, ${user.address.city || ''}`.trim().replace(/^,|,$/g, '') : '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        if (images.length === 0) { return toast.error('Please upload at least one product image.'); }
        setIsLoading(true);
        setError('');
        try {
            const form = e.target;
            const formData = new FormData();

            formData.append("name", form.name.value);
            formData.append("description", form.description.value);
            formData.append('listingType', listingType);
            formData.append('category', category);
            formData.append('price', price);
            formData.append('itemAge', itemAge);
            formData.append('anyDefects', form.anyDefects.value);
            formData.append('address', address);
            formData.append('isFeatured', form.isFeatured.checked);
            images.forEach((file) => formData.append('images', file));
            
            const createdItem = await itemService.createItem(formData, user.token);
            toast.success('Product submitted successfully!');
            navigate(`/item/${createdItem._id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit product.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleProductSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
            <h2 className="text-3xl font-bold text-center mb-6">List Your Item</h2>
            <ImageUploader title="Product Images (Upload up to 4)" images={images} setImages={setImages} />
            <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label><input type="text" name="name" id="name" className="mt-1 block w-full p-2 border rounded-md" required /></div>
            <div><label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label><textarea name="description" id="description" rows="3" className="mt-1 block w-full p-2 border rounded-md" required></textarea></div>
            <div className="space-y-4 p-4 border rounded-md bg-gray-50">
                <h3 className="font-semibold text-lg text-gray-800">Item Details</h3>
                <div>
                    <label htmlFor="itemAge" className="block text-sm font-medium text-gray-700">How old is the item?</label>
                    <select name="itemAge" id="itemAge" value={itemAge} onChange={e => setItemAge(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required>
                        <option value="">Select age</option>
                        <option value="0-1 year">0-1 Year</option>
                        <option value="1-3 years">1-3 Years</option>
                        <option value="3+ years">3+ Years</option>
                    </select>
                </div>
                <div><label htmlFor="anyDefects" className="block text-sm font-medium text-gray-700">Any defects or comments?</label><textarea name="anyDefects" id="anyDefects" rows="2" className="mt-1 block w-full p-2 border rounded-md" placeholder="e.g., Minor scratch on the side"></textarea></div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Pickup Address</label>
                    <textarea name="address" id="address" rows="2" value={address} onChange={e => setAddress(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" placeholder="e.g., 123 Main St, Indore" required></textarea>
                </div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700">Listing Type</label><div className="mt-2 flex rounded-md"><button type="button" onClick={() => setListingType('rent')} className={`flex-1 p-2 rounded-l-md border ${listingType === 'rent' ? 'bg-teal-600 text-white' : ''}`}>For Rent</button><button type="button" onClick={() => setListingType('sell')} className={`flex-1 p-2 rounded-r-md border ${listingType === 'sell' ? 'bg-teal-600 text-white' : ''}`}>For Sale</button></div></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required>
                        <option value="">Select...</option>
                        <option>Furniture</option>
                        <option>Electronics</option>
                        <option>Vehicles</option>
                        <option>Clothing</option>
                        <option>Sports Equipment</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">{listingType === 'rent' ? 'Rent Price (per day)' : 'Selling Price'}</label>
                    <div className="flex items-center gap-2 mt-1">
                        <input type="number" name="price" id="price" value={price} onChange={e => setPrice(e.target.value)} className="flex-grow p-2 border rounded-md" placeholder="₹" required />
                    </div>
                </div>
            </div>
            <div><label className="flex items-center"><input type="checkbox" name="isFeatured" className="h-5 w-5" /><span className="ml-2">Feature this item on the homepage</span></label></div>
            <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700" disabled={isLoading}>{isLoading ? 'Submitting...' : 'Submit for Listing'}</button>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
    );
};


// --- Main Upload Item Page Component ---
const UploadItemPage = () => {
    const { user } = useAuth();
    
    // YAHAN SE AAP PRESENTATION KE LIYE FLOW CONTROL KAR SAKTE HAIN
    const [verificationStatus, setVerificationStatus] = useState('verified'); // 'unverified', 'pending', 'verified'
    const [isPhoneVerified, setIsPhoneVerified] = useState(false); // true ya false

    const renderCurrentStep = () => {
        if (!user) {
            return <div className="text-center p-8 bg-white rounded-lg shadow-md"><p className="text-gray-700">Please log in to upload an item.</p></div>;
        }

        switch (verificationStatus) {
            case 'unverified':
                return <Step1_UploadDocs setVerificationStatus={setVerificationStatus} />;
            case 'pending':
                return <Step2_PendingVerification />;
            case 'verified':
                return isPhoneVerified 
                    ? <ProductForm /> 
                    : <Step3_OtpVerification setIsPhoneVerified={setIsPhoneVerified} />;
            default:
                return <Spinner />;
        }
    };

    return (
        <div className="container mx-auto max-w-2xl py-12 px-4">
            {renderCurrentStep()}
        </div>
    );
};

export default UploadItemPage;