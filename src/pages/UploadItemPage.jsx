
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