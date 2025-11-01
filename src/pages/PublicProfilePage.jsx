// rentsmart_frontend/src/pages/PublicProfilePage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../components/common/StarRating'; // Aapke paas StarRating component hai
import ProductCard from '../components/item/ProductCard'; // Aapke paas ProductCard component hai


const PublicProfilePage = () => {
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/users/public-profile/${userId}`);
                setProfile(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch profile", error);
                setLoading(false);
            }
        };
        fetchProfileData();
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (!profile) return <p>User not found.</p>;

    const { user, items } = profile;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <img src={user.profilePicture || '/default-avatar.png'} alt={user.name} className="profile-avatar" />
                    <h2>{user.name}</h2>
                    <p>Joined on {new Date(user.createdAt).toLocaleDateString()}</p>
                    {/* Yahan aap average rating dikha sakte hain */}
                </div>
                <div className="profile-body">
                    <h3>Items listed by {user.name} ({items.length})</h3>
                    <div className="items-grid">
                        {items.length > 0 ? (
                            items.map(item => (
                                <ProductCard key={item._id} product={item} />
                            ))
                        ) : (
                            <p>This user has not listed any items yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicProfilePage;