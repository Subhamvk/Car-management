import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import './CarDetail.css';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    images: [],
  });
  const [newImages, setNewImages] = useState([]);

  const fetchCar = async () => {
    try {
      const { data } = await axiosInstance.get(`/cars/${id}`);
      setCar(data);
      setFormData({
        title: data.title,
        description: data.description,
        tags: data.tags.join(', '),
        images: data.images,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/cars/${id}`);
      navigate('/cars');
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewImages(e.target.files);
  };

  const handleSave = async () => {
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('title', formData.title);
      formDataToSubmit.append('description', formData.description);
      formDataToSubmit.append('tags', formData.tags);

      Array.from(newImages).forEach((file) => {
        formDataToSubmit.append('images', file);
      });

      const { data } = await axiosInstance.put(`/cars/${id}`, formDataToSubmit, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setCar(data);
      setIsEditing(false);
      setNewImages([]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCar();
  }, [id]);

  if (!car) return <div className="loading">Loading...</div>;

  return (
    <div className="car-detail-container">
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="edit-input"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="edit-textarea"
          />
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="Tags (comma-separated)"
            className="edit-input"
          />
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="file-input"
          />
          <div className="edit-actions">
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-button" onClick={handleEditToggle}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="car-title">{car.title}</h2>
          <p className="car-description">{car.description}</p>
          <p className="car-tags">Tags: {car.tags.join(', ')}</p>
          <div className="car-images">
            {car.images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:5000/${img}`}
                alt={`Car ${index}`}
                className="car-image"
              />
            ))}
          </div>
          <div className="car-actions">
            <button className="edit-button" onClick={handleEditToggle}>
              Edit
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CarDetail;
