import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import userService from '../../services/userService';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

const Settings = () => {
    const { user, setUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        address: { city: '', state: '' }
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                bio: user.bio || '',
                address: {
                    city: user.address?.city || '',
                    state: user.address?.state || ''
                }
            });
            setPreview(user.avatar?.url || '');
            setLoading(false);
        }
    }, [user]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleAvatarUpload = async () => {
        if (!avatarFile) {
            toast.error("Please select an image first.");
            return;
        }
        const formData = new FormData();
        formData.append('avatar', avatarFile);

        try {
            const data = await userService.updateMyAvatar(formData, user.token);
            setUser(prev => ({ ...prev, avatar: data.avatar }));
            toast.success('Avatar updated successfully!');
        } catch (error) {
            toast.error('Failed to upload avatar.');
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            address: { ...prev.address, [name]: value }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await userService.updateMyProfile(formData, user.token);
            setUser(prev => ({ ...prev, ...updatedUser }));
            toast.success('Profile details updated successfully!');
        } catch (error) {
            toast.error('Failed to update profile.');
            console.error(error);
        }
    };

    if (loading) return <Spinner />;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

            {/* --- Avatar Update Section --- */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex items-center gap-6">
                <img
                    src={preview || `https://ui-avatars.com/api/?name=${formData.name.replace(' ', '+')}`}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                />
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />
                <div>
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300"
                    >
                        Change Picture
                    </button>
                    {avatarFile && (
                        <button
                            onClick={handleAvatarUpload}
                            className="ml-4 bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600"
                        >
                            Upload & Save
                        </button>
                    )}
                </div>
            </div>

            {/* --- Profile Details Form --- */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md bg-gray-100" readOnly />
                </div>
                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Your Bio</label>
                    <textarea name="bio" id="bio" rows="3" value={formData.bio} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" placeholder="Tell us a little about yourself..."></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                        <input type="text" name="city" id="city" value={formData.address.city} onChange={handleAddressChange} className="mt-1 block w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                        <input type="text" name="state" id="state" value={formData.address.state} onChange={handleAddressChange} className="mt-1 block w-full p-2 border rounded-md" />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-teal-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-600">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Settings;
