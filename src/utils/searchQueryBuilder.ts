export type JobType = 'frontend' | 'backend' | 'qa' | 'designer';
export type WorkType = 'remote' | 'hybrid' | 'onsite';
export type Region = 'Europe' | 'USA' | 'NA' | 'SA' | 'Asia' | 'Worldwide';

interface SearchParams {
  jobType: JobType;
  workType: WorkType;
  region: Region;
  requireSalary: boolean;
}

const JOB_BOARDS = [
  'jobs.lever.co',
  'apply.workable.com',
  'bamboohr.com',
  'crew.work',
  'boards.greenhouse.io',
  'gr8people.com',
  'homreun.co',
  'jobs.ashbyhq.com',
  'myworkdayjobs.com',
  'pinpointhq.com',
  'careers.smartrecruiters.com',
  'hire.trakstar.com',
  'turbohire.co',
  'recruit.juucy.io',
  'app.dover.com'
];

export const buildSearchQuery = (params: SearchParams): string => {
  const siteQuery = JOB_BOARDS.map(site => `site:${site}`).join(' OR ');
  
  const locationTerms = params.workType === 'remote' 
    ? 'entirely OR fully OR worldwide OR "from anywhere"'
    : params.region;
    
  const jobTypeMap: Record<JobType, string> = {
    frontend: 'frontend OR "front-end" OR "front end"',
    backend: 'backend OR "back-end" OR "back end"',
    qa: 'QA OR "quality assurance" OR tester',
    designer: 'designer OR "UI/UX" OR "product designer"'
  };

  const workTypeTerms = params.workType === 'remote' 
    ? 'remote OR remotely'
    : params.workType;

  const query = `${siteQuery} ${locationTerms} ${jobTypeMap[params.jobType]} ${workTypeTerms}`;
  
  if (params.requireSalary) {
    return `${query} salary OR compensation`;
  }

  return query;
}

export const searchJobs = (params: SearchParams): void => {
  const query = buildSearchQuery(params);
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  window.open(searchUrl, '_blank');
}; 