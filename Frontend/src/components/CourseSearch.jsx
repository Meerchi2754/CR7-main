import React from 'react';
import { Search } from 'lucide-react';

export const CourseSearch = ({ filters, onFiltersChange, onSearch }) => {
  const handleTopicChange = (e) => {
    onFiltersChange({
      ...filters,
      topic: e.target.value
    });
  };

  const handleLevelChange = (e) => {
    onFiltersChange({
      ...filters,
      level: e.target.value
    });
  };

  const handleSearchClick = () => {
    onSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Topic Input */}
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-foreground mb-2">
              What do you want to learn?
            </label>
            <input
              type="text"
              id="topic"
              value={filters.topic}
              onChange={handleTopicChange}
              onKeyPress={handleKeyPress}
              placeholder="e.g., React, Python, Machine Learning"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
            />
          </div>

          {/* Skill Level Dropdown */}
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-foreground mb-2">
              Your skill level
            </label>
            <select
              id="level"
              value={filters.level}
              onChange={handleLevelChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground appearance-none cursor-pointer"
            >
              <option value="all">All levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={handleSearchClick}
            disabled={!filters.topic.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Find Courses
          </button>
        </div>
      </div>
    </div>
  );
};