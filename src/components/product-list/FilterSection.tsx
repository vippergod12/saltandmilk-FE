import React from 'react';

interface FilterSectionProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onFilterChange: (option: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, options, selectedOptions, onFilterChange }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white mt-6">
      <h3 className="text-lg font-bold mb-3">{title}</h3>
      <ul>
        {options.map((option) => (
          <li key={option} className="flex items-center my-2">
            <input
              type="checkbox"
              id={`${title}-${option}`}
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => onFilterChange(option)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor={`${title}-${option}`} className="ml-3 min-w-0 flex-1 text-gray-700">
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSection;