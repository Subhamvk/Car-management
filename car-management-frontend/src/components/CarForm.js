import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import './CarForm.css';

const CarForm = () => {
  const [formData, setFormData] = useState({ title: '', description: '', tags: '' });
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    
    // Validate that no more than 10 images are selected
    if (selectedFiles.length + images.length > 10) {
      setError('You can only upload up to 10 images');
      return;
    }

    // Update the images state with the new files
    setImages((prevImages) => [...prevImages, ...Array.from(selectedFiles)]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithFiles = new FormData();
    Object.keys(formData).forEach((key) => formDataWithFiles.append(key, formData[key]));
    images.forEach((file) => formDataWithFiles.append('images', file));

    try {
      await axiosInstance.post('/cars', formDataWithFiles, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/cars');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Add a New Car</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={formData.tags}
          onChange={handleChange}
        />
        
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        {error && <div className="error-message">{error}</div>}
        
        <div className="image-previews">
          {images.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Preview ${index}`}
              className="image-preview"
            />
          ))}
        </div>
        
        <button type="submit">Create Car</button>
      </form>
    </div>
  );
};

export default CarForm;
