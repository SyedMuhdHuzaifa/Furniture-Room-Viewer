// src/FurnitureCatalog.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './FurnitureCatalog.css'; // Link your stylesheet here

const furnitureItems = [
  {
    name: 'Modern Chair',
    url: '/chair.glb',
    thumbnail: '/chair.jpg',
    price: '2500',
    description: 'A stylish modern chair with wooden legs and ergonomic comfort.',
  },
  {
    name: 'Black Wooden Chair',
    url: '/Blackchair.glb',
    thumbnail: '/Blackchair.jpg',
    price: '3000',
    description:
      'A stylish chair inspired by iconic designs. Comfortable and aesthetic.',
  },
  {
    name: 'Wooden Table',
    url: '/wooden_table.glb',
    thumbnail: '/wooden_table.jpg',
    price: '6000',
    description: 'A sleek wooden table that fits in any modern living space.',
  },
  {
    name: 'Garden Table',
    url: '/garden_table.glb',
    thumbnail: '/garden_table.jpg',
    price: '9000',
    description: 'Durable outdoor garden table for open-air settings.',
  },
  {
    name: 'Bunk Bed',
    url: '/bunk_bed.glb',
    thumbnail: '/bunk_bed.jpg',
    price: '14000',
    description: 'Space-saving bunk bed ideal for kids and small rooms.',
  },
  {
    name: 'Sofa',
    url: '/sofa.glb',
    thumbnail: '/sofa.jpg',
    price: '8000',
    description: 'Space-saving bunk bed ideal for kids and small rooms.',
  },
  {
    name: 'Royal Sofa Set',
    url: '/royal_sofa_set.glb',
    thumbnail: '/royal_sofa_set.jpg',
    price: '10000',
    description: 'Space-saving bunk bed ideal for kids and small rooms.',
  },
];

function FurnitureCatalog() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleView = (item) => {
    navigate('/viewer', { state: { selectedFurniture: item } });
  };

  return (
    <div className="catalog-container">
      {/* Sliding Header */}
      <div className="catalog-heading-wrapper">
        <h2 className="catalog-heading-slide">
          🪑 Explore Our Furniture Collection — Discover · Visualize · Shop · Repeat 🛒
        </h2>
      </div>

      {/* Furniture Cards */}
      <div className="furniture-grid">
        {furnitureItems.map((item, index) => (
          <div className="furniture-card" key={index}>
            <img
              src={item.thumbnail}
              alt={item.name}
              className="furniture-image"
            />
            <h3>{item.name}</h3>
            <p className="price">Rs {item.price}</p>
            <p className="description">{item.description}</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={() => handleView(item)}>View in Room</button>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FurnitureCatalog;
