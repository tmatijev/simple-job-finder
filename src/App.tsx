import React, { useState, ChangeEvent } from 'react';
import JobTypeSelector from './components/JobTypeSelector';
import { searchJobs } from './utils/searchQueryBuilder';
import type { JobType, WorkType, Region } from './utils/searchQueryBuilder';

const App: React.FC = () => {
  const [jobType, setJobType] = useState<JobType>('frontend');
  const [workType, setWorkType] = useState<WorkType>('remote');
  const [region, setRegion] = useState<Region>('Worldwide');
  const [requireSalary, setRequireSalary] = useState<boolean>(false);

  const handleSearch = () => {
    searchJobs({
      jobType,
      workType,
      region,
      requireSalary
    });
  };

  const handleWorkTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setWorkType(e.target.value as WorkType);
  };

  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value as Region);
  };

  return (
    <div className="w-[400px] p-6 bg-white">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900">
          Simple Job Finder
        </h1>
      </div>
      
      <div className="space-y-6">
        <JobTypeSelector 
          selected={jobType} 
          onChange={setJobType} 
        />

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Work Type
          </label>
          <select
            value={workType}
            onChange={handleWorkTypeChange}
            className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 
                     text-gray-700 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent
                     shadow-sm transition-all duration-200 hover:border-gray-300
                     appearance-none bg-no-repeat bg-right"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundSize: '1.5em 1.5em'
            }}
          >
            <option value="remote">🌍 Remote</option>
            <option value="hybrid">🏢 Hybrid</option>
            <option value="onsite">📍 On-site</option>
          </select>
        </div>

        {workType !== 'remote' && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Region
            </label>
            <select
              value={region}
              onChange={handleRegionChange}
              className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 
                       text-gray-700 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent
                       shadow-sm transition-all duration-200 hover:border-gray-300
                       appearance-none bg-no-repeat bg-right"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option value="Worldwide">🌎 Worldwide</option>
              <option value="Europe">🇪🇺 Europe</option>
              <option value="USA">🇺🇸 USA</option>
              <option value="NA">🌎 North America</option>
              <option value="SA">🌎 South America</option>
              <option value="Asia">🌏 Asia</option>
            </select>
          </div>
        )}

        <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 
                         hover:border-gray-300 transition-colors cursor-pointer group">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="salary"
              checked={requireSalary}
              onChange={(e) => setRequireSalary(e.target.checked)}
              className="w-5 h-5 border-2 border-gray-300 rounded-md 
                       text-blue-600 focus:ring-blue-500 focus:ring-offset-0
                       transition-colors group-hover:border-gray-400"
            />
          </div>
          <span className="text-sm text-gray-700">
            Only show jobs with salary information
          </span>
        </label>

        <button
          onClick={handleSearch}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg 
                   font-medium shadow-sm hover:bg-blue-700 
                   transition-all duration-200 hover:shadow-md
                   focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          aria-label="Search for jobs"
        >
          Search Jobs
        </button>
      </div>
    </div>
  );
};

export default App; 