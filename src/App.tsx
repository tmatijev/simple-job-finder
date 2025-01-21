import React, { useState, ChangeEvent } from 'react';
import JobTypeSelector from './components/JobTypeSelector';
import { searchJobs } from './utils/searchQueryBuilder';
import { JobTypes, WorkTypes, Regions, type JobType, type WorkType, type Region } from './utils/searchQueryBuilder';

const App: React.FC = () => {
  const [jobType, setJobType] = useState<JobType>(JobTypes.FRONTEND);
  const [workType, setWorkType] = useState<WorkType>(WorkTypes.REMOTE);
  const [region, setRegion] = useState<Region>(Regions.WORLDWIDE);
  const [requireSalary, setRequireSalary] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSearch = () => {
    setIsSearching(true);
    searchJobs({
      jobType,
      workType,
      region,
      requireSalary
    }).finally(() => {
      setIsSearching(false);
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
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            {/* Briefcase */}
            <path 
              d="M7 9C7 8.44772 7.44772 8 8 8H16C16.5523 8 17 8.44772 17 9V15C17 15.5523 16.5523 16 16 16H8C7.44772 16 7 15.5523 7 15V9Z" 
              fill="#2563EB" 
            />
            {/* Handle */}
            <path 
              d="M10.5 8V7C10.5 6.44772 10.9477 6 11.5 6H12.5C13.0523 6 13.5 6.44772 13.5 7V8" 
              stroke="#2563EB" 
              strokeWidth="1.2" 
              strokeLinecap="round"
            />
            {/* Magnifying Glass */}
            <circle 
              cx="15.5" 
              cy="15.5" 
              r="3.5" 
              fill="white"
              stroke="#2563EB"
              strokeWidth="1.2"
            />
            <path 
              d="M18 18L20 20" 
              stroke="#2563EB" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
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
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          tabIndex={0}
          disabled={isSearching}
          className={`w-full py-3 px-4 rounded-lg transition-all duration-200
                     font-semibold text-white uppercase tracking-wide
                     focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
                     ${isSearching 
                       ? 'bg-blue-400 cursor-not-allowed' 
                       : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'}`}
          aria-label="Search for jobs"
        >
          {isSearching ? 'Searching...' : 'SEARCH JOBS'}
        </button>
      </div>
    </div>
  );
};

export default App; 