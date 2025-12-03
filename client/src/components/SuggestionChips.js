import React from 'react';
import './SuggestionChips.css';

function SuggestionChips({ suggestions, onSuggestionClick }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="suggestions-container">
      <div className="suggestions-label">추천 질문:</div>
      <div className="suggestions-chips">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="suggestion-chip"
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SuggestionChips;
