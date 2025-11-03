
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css'; // Aapki original CSS file

const truncateText = (text, wordLimit = 15) => {
    if (!text || typeof text !== 'string') return '';
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
};

const ProductCard = ({ product }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (isFlipped) {
            timer = setTimeout(() => setIsFlipped(false), 5000);
        }
        return () => clearTimeout(timer);
    }, [isFlipped]);

    if (!product || !product.user || !product.images || !product.images.length) {
        return null;
    }

    const handleFlip = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsFlipped(prev => !prev);
    };

    const handleNavigate = () => {
        if (!isFlipped) {
            navigate(`/item/${product._id}`);
        } else {
            setIsFlipped(false);
        }
    };

    // =================================================================
    //                  [YAHAN PAR FINAL FIX HAI]
    // =================================================================
    // Yeh logic ab purane (product.price) aur naye (product.pricePerDay),
    // dono tarah ke products ko handle karegi.
    const displayPrice = product.pricePerDay || product.sellingPrice || product.price;
    const priceLabel = (product.pricePerDay || product.price) ? '/day' : '';
    // =================================================================

    const userName = product.user.name || 'Anonymous User';
    const formattedAddress = [product.user.address?.city, product.user.address?.state].filter(Boolean).join(', ');
    const avatarName = typeof userName === 'string' ? userName.replace(/\s/g, '+') : 'User';
    const avatarUrl = product.user.avatar?.url || `https://ui-avatars.com/api/?name=${avatarName}&background=0D9488&color=fff`;

    return (
        <div className="flip-card-container" onClick={handleNavigate} role="button" tabIndex={0}>
            <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>

                {/* --- FRONT SIDE --- */}
                <div className="flip-card-front">
                    <img src={product.images[0].url} alt={product.name} className="product-image" />
                    <div className="product-details">
                        <p className="product-category">{product.category || 'General'}</p>
                        <h3 className="product-name">{product.name || 'Untitled Item'}</h3>
                        <p className="product-description">{truncateText(product.description)}</p>
                        <div className="price-section">
                            {/* Price dikhane ke liye naye variables ka istemal */}
                            <p className="product-price">
                                ₹{displayPrice ? displayPrice.toLocaleString() : 'N/A'}
                                {displayPrice && <span className="price-type">{priceLabel}</span>}
                            </p>
                            <button onClick={handleFlip} className="flip-button">View Owner</button>
                        </div>
                    </div>
                </div>

                {/* --- BACK SIDE --- */}
                <div className="flip-card-back">
                    <img src={avatarUrl} alt={userName} className="owner-avatar" />
                    <h4 className="owner-name">{userName}</h4>
                    {formattedAddress && <p className="owner-location">{formattedAddress}</p>}
                    <p className="owner-bio">"{product.user.bio || 'No bio available.'}"</p>
                    <a href={`/public-profile/${product.user._id}`} onClick={(e) => e.stopPropagation()} className="profile-button">
                        View Profile
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
