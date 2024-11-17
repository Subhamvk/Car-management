import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { Link } from 'react-router-dom';
import './CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');

  const fetchCars = async () => {
    try {
      const { data } = await axiosInstance.get('/cars');
      setCars(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) =>
    [car.title, car.description, ...car.tags].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="car-list-container">
      <h2>Your Cars</h2>
      <Link to="/cars/create" className="add-car-button">
        Add a New Car
      </Link>
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="car-card-list">
        {filteredCars.map((car) => (
          <div key={car._id} className="car-card">
            <Link to={`/cars/${car._id}`} className="car-card-link">
               {/* Display the first image */}
               {car.images && car.images.length > 0 ? (
                <img
                  src={`https://car-management-108y.onrender.com/${car.images[0]}`}
                  alt={`Car thumbnail`}
                  className="car-card-image"
                />
              ) : (
                <div className="car-card-placeholder">No Image</div>
              )}
              <div className="car-card-title">{car.title}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
