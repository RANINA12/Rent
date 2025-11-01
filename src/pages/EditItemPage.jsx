import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import itemService from '../services/itemService';
import Spinner from '../components/common/Spinner';
import { toast } from 'react-toastify';

const EditItemPage = () => {
    const { id: itemId } = useParams(); // URL se item ki ID nikalein
    const navigate = useNavigate();
    const { user } = useAuth();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        listingType: 'rent',
    });

    // Step 1: Item ka current data fetch karein
    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const data = await itemService.getItemById(itemId);
                setItem(data);
                setFormData({
                    name: data.name,
                    description: data.description,
                    category: data.category,
                    price: data.price,
                    listingType: data.listingType,
                });
            } catch (error) {
                console.error("Failed to fetch item details", error);
                toast.error("Could not load item details.");
            } finally {
                setLoading(false);
            }
        };
        fetchItemDetails();
    }, [itemId]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Step 2: Form submit hone par item ko update karein
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await itemService.updateItem(itemId, formData, user.token);
            toast.success("Item updated successfully!");
            navigate('/profile/items'); // Waapas "My Items" page par bhej dein
        } catch (error) {
            console.error("Failed to update item", error);
            toast.error("Failed to update item.");
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="container mx-auto max-w-2xl py-8">
            <h1 className="text-3xl font-bold mb-6">Edit Your Item</h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
                <div>
                    <label htmlFor="name">Product Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" rows="4" value={formData.description} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="category">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md">
                            <option value="">Select...</option>
                            <option>Furniture</option>
                            <option>Electronics</option>
                            <option>Appliances</option>
                            <option>Bikes</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="price">Price (per day)</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-teal-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-600">
                        Update Item
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditItemPage;