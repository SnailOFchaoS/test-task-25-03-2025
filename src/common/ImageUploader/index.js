import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { ReactComponent as ImagePlaceholder } from '../../assets/image-placeholder.svg';
import "./index.scss"

const ImageUploader = ({
  selectedImage, 
  setSelectedImage, 
  imageUrl, 
  setImageUrl, 
  setLoading,
  uploadImage,
  currentImageUrl,
}) => {
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handlePlaceholderClick = () => {
    fileInputRef.current.click(); 
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setError('Пожалуйста, выберите изображение');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', selectedImage);

    const apiKey = 'b88e726cf6785f5110d906c093d4cbd8';

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        setImageUrl(response.data.data.url);
      } else {
        setError(`Ошибка при загрузке: ${response.data.error.message}`);
      }
    } catch (error) {
      setError(`Произошла ошибка: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(uploadImage){
      handleUpload();
    }
  }, [uploadImage])

  return (
    <div className='image-uploader-wrapper'>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      {(!selectedImage && !imageUrl) && (
        <>
          {currentImageUrl ? (
            <div onClick={handlePlaceholderClick}>
              <img
                src={currentImageUrl}
                alt="Предпросмотр"
                className="photo-image"
              />
            </div>
          ) : (
            <ImagePlaceholder
              className="photo-image"
              onClick={handlePlaceholderClick}
            />
          )}
        </>
        
      )}
      
      {(selectedImage && !imageUrl) && (
        <div onClick={handlePlaceholderClick}>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Предпросмотр"
            className="photo-image"
          />
        </div>
      )}

      {(imageUrl) && (
        <div onClick={handlePlaceholderClick}>
          <img
            src={imageUrl}
            alt="Предпросмотр"
            className="photo-image"
          />
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default ImageUploader;