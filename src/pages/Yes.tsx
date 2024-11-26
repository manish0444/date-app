import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Heart, Send, Calendar, User, Flower, Star, Gift } from 'lucide-react';
import './Yes.css';

function Yes() {
  const [formData, setFormData] = useState({
    name: '',
    preferredDate: new Date().toISOString().slice(0, 10),
    dateType: '',
    otherDetails: '',
  });

  const [activeType, setActiveType] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [confettiParticles, setConfettiParticles] = useState<
    { id: number; x: number; y: number; color: string; size: number; delay: number }[]
  >([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTypeSelect = (type: string) => {
    setFormData((prevState) => ({
      ...prevState,
      dateType: type,
    }));
    setActiveType(type);
  };

  const createConfettiParticles = () => {
    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        size: Math.random() * 10 + 5,
        delay: Math.random() * 3,
      });
    }
    setConfettiParticles(particles);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serviceId = 'service_pxnl72b';
    const templateId = 'template_8ec900r';
    const publicKey = 'FTs6PN7SlpEVV9NEJ';

    const templateParams = {
      name: formData.name,
      preferredDate: formData.preferredDate,
      dateType: formData.dateType || 'Not specified',
      otherDetails: formData.otherDetails || 'No additional details',
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setShowCelebration(true);
        createConfettiParticles();

        setTimeout(() => {
          setFormData({
            name: '',
            preferredDate: new Date().toISOString().slice(0, 10),
            dateType: '',
            otherDetails: '',
          });
          setActiveType(null);
          setShowCelebration(false);
          setConfettiParticles([]);
        }, 5000);
      })
      .catch((error) => {
        console.error('Email send error:', error);
        alert('Failed to send proposal. Please try again.');
      });
  };

  const dateTypes = [
    { icon: '🍽️', label: 'Food', value: 'food' },
    { icon: '🏛️', label: 'Museum', value: 'museum' },
    { icon: '🌳', label: 'Outdoor', value: 'outdoor' },
    { icon: '🎭', label: 'Show', value: 'show' },
    { icon: '❓', label: 'Other', value: 'other' },
  ];

  return (
    <div className="love-form-wrapper">
      {showCelebration && (
        <div className="celebration-overlay">
          <div className="confetti-container">
            {confettiParticles.map((particle) => (
              <div
                key={particle.id}
                className="confetti-particle"
                style={{
                  left: `${particle.x}%`,
                  backgroundColor: particle.color,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animationDelay: `${particle.delay}s`,
                }}
              />
            ))}
          </div>
          <div className="celebration-content">
            <div className="floating-elements">
              {[...Array(15)].map((_, i) => (
                <React.Fragment key={i}>
                  <Flower
                    className="floating-icon flower-icon"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                    }}
                  />
                  <Star
                    className="floating-icon star-icon"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                    }}
                  />
                  <Gift
                    className="floating-icon gift-icon"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                    }}
                  />
                </React.Fragment>
              ))}
            </div>
            <div className="celebration-text">
              <h2 className="celebration-message">Can't Wait to See You!</h2>
              <p className="celebration-subtext">Your date proposal has been sent with love ❤️</p>
            </div>
            <div className="heart-pulse">
              <Heart className="pulse-heart" />
            </div>
          </div>
        </div>
      )}

      <div className="love-form-container">
        <form onSubmit={handleSubmit} className="love-form">
          <div className="form-header">
            <Heart className="heart-icon" />
            <h2>Date Night Proposal</h2>
          </div>

          <div className="form-group">
            <User className="input-icon" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>

          <div className="form-group">
            <Calendar className="input-icon" />
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
            />
          </div>

          <div className="date-type-selection">
            {dateTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                className={`date-type-btn ${activeType === type.value ? 'active' : ''}`}
                onClick={() => handleTypeSelect(type.value)}
              >
                <span className="type-icon">{type.icon}</span>
                <span className="type-label">{type.label}</span>
              </button>
            ))}
          </div>

          <div className="form-group">
            <input 
              type="text" 
              name="otherDetails"
              value={formData.otherDetails}
              onChange={handleChange}
              placeholder="Additional Details (Optional)"
            />
          </div>

          <button type="submit" className="submit-btn">
            <Send className="submit-icon" />
            Send Proposal
          </button>
        </form>
      </div>
    </div>
  );
}

export default Yes;
