import React, { useState } from 'react';
import './LearningSearchFilters.css';
import './LearningSearchFilternew.css';
import FilterSidebar from './FilterSidebar';

function LearningSearchFilters() {
  const [language, setLanguage] = useState('All Languages');
  const [ratings, setRatings] = useState('All Ratings');
  const [level, setLevel] = useState('All Levels');
  const [mostRelevant, setMostRelevant] = useState('Most Relevant');

  // New filter states for sidebar
  const [sortOption, setSortOption] = useState('featured');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: 0,
    deliveryTime: '',
    availability: '',
  });

  // Sidebar visibility state
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Sample options for sidebar filters
  const categories = ['Category 1', 'Category 2', 'Category 3'];
  const priceRanges = ['Under $25', '$25 to $50', '$50 to $100', 'Over $100'];
  const ratingsOptions = [4, 3, 2, 1];
  const deliveryTimes = ['Within 24 hours', 'Within 3 days', 'Within a week'];
  const availabilityOptions = ['Available Now', 'Coming Soon'];

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={`learning-search-filters-new${sidebarVisible ? ' sidebar-visible' : ''}`}>
      <div className="filter-buttons">
        <button 
          className="filter-button active"
          onClick={toggleSidebar}
          aria-label="Toggle Filters Sidebar"
          style={{ display: sidebarVisible ? 'none' : 'flex' }}
        >
          <span className="hamburger-menu">&#9776;</span> All filters
        </button>
      </div>

      {!sidebarVisible && (
        <>
          <div className="filter-dropdowns">
            <div className="animate-roll-left smoke-container">
              <select
                className="filter-dropdown"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Select Language"
              >
                <option>All Languages</option>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Chinese</option>
              </select>
              <div className="smoke"></div>
            </div>
            <div className="animate-roll-left smoke-container">
              <select
                className="filter-dropdown"
                value={ratings}
                onChange={(e) => setRatings(e.target.value)}
                aria-label="Select Ratings"
              >
                <option>All Ratings</option>
                <option>5 Stars</option>
                <option>4 Stars & Up</option>
                <option>3 Stars & Up</option>
                <option>2 Stars & Up</option>
                <option>1 Star & Up</option>
              </select>
              <div className="smoke"></div>
            </div>
            <div className="animate-roll-right smoke-container">
              <select
                className="filter-dropdown"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                aria-label="Select Level"
              >
                <option>All Levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <div className="smoke"></div>
            </div>
            <div className="animate-roll-right smoke-container">
              <select
                className="filter-dropdown"
                value={mostRelevant}
                onChange={(e) => setMostRelevant(e.target.value)}
                aria-label="Sort by"
              >
                <option>Most Relevant</option>
                <option>Highest Rated</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <div className="smoke"></div>
            </div>
          </div>
        </>
      )}

      {sidebarVisible && (
        <>
          <div
            className="filter-overlay"
            onClick={toggleSidebar}
            aria-label="Close Filters Overlay"
          />
          <div onClick={(e) => e.stopPropagation()}>
            <FilterSidebar
              sortOption={sortOption}
              handleSortChange={handleSortChange}
              filters={filters}
              handleFilterChange={handleFilterChange}
              categories={categories}
              priceRanges={priceRanges}
              ratings={ratingsOptions}
              deliveryTimes={deliveryTimes}
              availabilityOptions={availabilityOptions}
              onClose={toggleSidebar}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default LearningSearchFilters;
