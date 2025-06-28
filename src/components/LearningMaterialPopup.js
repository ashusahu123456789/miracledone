/**
 * This file contains two React components:
 * 
 * 1. MultiSelectDropdown: A reusable multi-select dropdown component that allows users to select multiple options from a list.
 * 2. LearningMaterialPopup: A popup modal component that collects user contact info, learning material selections, and preferences.
 */

import React, { useState, useRef, useEffect } from 'react';

/**
 * MultiSelectDropdown component
 * Props:
 * - label: The label text displayed above the dropdown.
 * - options: Array of option objects with 'text' and 'value' properties.
 * - selectedOptions: Array of currently selected option values.
 * - setSelectedOptions: Function to update the selected options.
 */



const MultiSelectDropdown = ({ label, options, selectedOptions, setSelectedOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((v) => v !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="multi-select-dropdown"
      style={{ marginBottom: '20px', position: 'relative' }}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>{label}</label>

      <div
        className="dropdown-header"
        onClick={toggleDropdown}
        style={{
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '8px',
          cursor: 'pointer',
          userSelect: 'none',
          minHeight: '38px',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '5px',
          position: 'relative',
          backgroundColor: '#fff',
        }}
      >
        {selectedOptions.length === 0 ? (
          <span style={{ color: '#999' }}>{options[0].text}</span>
        ) : (
          selectedOptions.map((value) => {
            const option = options.find((opt) => opt.value === value);
            return (
              <span
                key={value}
                style={{
                  backgroundColor: '#007bff',
                  color: '#fff',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {option ? option.text : value}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOptionClick(value);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    lineHeight: '1',
                  }}
                  aria-label={`Remove ${option ? option.text : value}`}
                >
                  &times;
                </button>
              </span>
            );
          })
        )}
        <span style={{ marginLeft: 'auto', fontSize: '16px', userSelect: 'none' }}>
          {isOpen ? '▲' : '▼'}
        </span>
      </div>

      {isOpen && (
        <div
          className="dropdown-list"
          style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginTop: '4px',
            maxHeight: '150px',
            overflowY: 'auto',
            backgroundColor: '#fff',
            position: 'absolute',
            zIndex: 1301,
            width: '100%',
          }}
        >
          {options.map((option) => (
            <label
              key={option.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '6px 8px',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleOptionClick(option.value)}
                style={{ marginRight: '8px' }}
              />
              {option.text}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * LearningMaterialPopup component
 * Props:
 * - onClose: Function to call when the popup should be closed.
 * - onNext: Function to call with collected data when user clicks Next.
 */
const LearningMaterialPopup = ({ onClose, onNext }) => {
  // Options for learning materials
  const materialOptions = [
    { text: 'JavaScript', value: 'javascript' },
    { text: 'React', value: 'react' },
  ];

  // Options for learning preferences
  const preferenceOptions = [
    { text: 'Online', value: 'online' },
    { text: 'In-person', value: 'inperson' },
    { text: 'Self-paced', value: 'selfpaced' },
  ];

  // State for selected learning materials
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  // State for selected learning preferences
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  // State for user contact info input
  const [contactInfo, setContactInfo] = useState('');
  // State for validation error messages
  const [error, setError] = useState('');

  /**
   * Validate contact info input as email or phone number.
   * @param {string} info - The contact info string to validate.
   * @returns {boolean} True if valid email or phone number, else false.
   */
  const validateContactInfo = (info) => {
    const emailRegex = /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i;
    // Updated phone regex to allow spaces, dashes, parentheses, dots
    const phoneRegex = /^\+?[\d\s\-().]{7,20}$/;
    return emailRegex.test(info.trim()) || phoneRegex.test(info.trim());
  };

  // Handle Next button click: validate input and call onNext with data
  const handleNextClick = () => {
    if (!contactInfo.trim()) {
      setError('Contact info is required.');
      return;
    }
    if (!validateContactInfo(contactInfo.trim())) {
      setError('Please enter a valid phone number or email address.');
      return;
    }
    // Removed validation for selectedMaterials and selectedPreferences to avoid popup
    setError('');
    if (onNext) {
      onNext({
        contactInfo: contactInfo.trim(),
        selectedMaterials,
        selectedPreferences,
      });
    }
  };

  return (
    // Overlay background that closes popup on click
    <div
      className="learning-material-popup-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1300,
      }}
      // Removed onClick to prevent closing on outside click
    >
      {/* Popup content container */}
      <div
        className="learning-material-popup-content"
        style={{
          backgroundColor: '#fff',
          borderRadius: '10px',
          width: '90%',
          maxWidth: '400px',
          padding: '20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          position: 'relative',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: '#333',
          textAlign: 'center',
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing popup when clicking inside content
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#888',
            transition: 'color 0.3s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#000')}
          onMouseOut={(e) => (e.currentTarget.style.color = '#888')}
          aria-label="Close popup"
        >
          &times;
        </button>

        {/* Popup title */}
        <h2 style={{ marginBottom: '15px', fontWeight: '700' }}>Learning Material</h2>

        {/* Form for contact info and selections */}
        <form style={{ textAlign: 'left', marginTop: '10px' }} onSubmit={(e) => e.preventDefault()}>
          {/* Contact info input label */}
          <label htmlFor="contactInfo" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#fff' }}>
            Please enter your phone number or email address:
          </label>

          {/* Contact info input field */}
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            placeholder="Phone number or Email"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '5px',
              borderRadius: '5px',
              border: error ? '1px solid red' : '1px solid #ccc',
              fontSize: '14px',
            }}
          />

          {/* Error message display */}
          {error && (
            <div style={{ color: 'red', marginBottom: '10px', fontSize: '13px' }}>
              {error}
            </div>
          )}

          {/* Multi-select dropdown for learning materials */}
          <MultiSelectDropdown
            label="Please select the material required for learning:"
            options={materialOptions}
            selectedOptions={selectedMaterials}
            setSelectedOptions={setSelectedMaterials}
          />

          {/* Multi-select dropdown for learning preferences */}
          <MultiSelectDropdown
            label="Please select your preferences:"
            options={preferenceOptions}
            selectedOptions={selectedPreferences}
            setSelectedOptions={setSelectedPreferences}
          />

          {/* Next button */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              type="button"
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '16px',
              }}
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LearningMaterialPopup;
