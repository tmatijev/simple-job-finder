import React from 'react';
import type { JobType } from '../utils/searchQueryBuilder';

interface JobTypeSelectorProps {
  selected: JobType;
  onChange: (value: JobType) => void;
}

const JobTypeSelector: React.FC<JobTypeSelectorProps> = ({ selected, onChange }) => {
  const jobTypes = [
    { value: 'frontend', label: 'Frontend', icon: '🎨' },
    { value: 'backend', label: 'Backend', icon: '⚙️' },
    { value: 'qa', label: 'QA', icon: '🔍' },
    { value: 'designer', label: 'Designer', icon: '✨' }
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Job Type
      </label>
      <div className="grid grid-cols-2 gap-3">
        {jobTypes.map(({ value, label, icon }) => (
          <button
            key={value}
            onClick={() => onChange(value as JobType)}
            className={`
              flex items-center justify-center gap-2 px-4 py-3 
              rounded-lg text-sm font-medium transition-all duration-200
              shadow-sm hover:shadow-md
              ${selected === value 
                ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }
            `}
            aria-label={`Select ${label} job type`}
          >
            <span className="text-lg">{icon}</span>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobTypeSelector; 