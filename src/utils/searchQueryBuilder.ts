export const JobTypes = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  QA: 'qa',
  DESIGNER: 'designer'
} as const;

export const WorkTypes = {
  REMOTE: 'remote',
  HYBRID: 'hybrid',
  ONSITE: 'onsite'
} as const;

export const Regions = {
  EUROPE: 'Europe',
  USA: 'USA',
  NA: 'NA',
  SA: 'SA',
  ASIA: 'Asia',
  WORLDWIDE: 'Worldwide'
} as const;

export type JobType = typeof JobTypes[keyof typeof JobTypes];
export type WorkType = typeof WorkTypes[keyof typeof WorkTypes];
export type Region = typeof Regions[keyof typeof Regions];

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
  'app.dover.com',
  'jobs.jobvite.com',
  'jobs.eu.lever.co',
  'jobs.ashbyhq.com',
  'jobs.personio.com',
  'jobs.eu.lever.co',
  'wellfound.com/jobs',
  'angel.co/jobs'
];

export const buildSearchQuery = (params: SearchParams): string => {
  const siteQuery = JOB_BOARDS.map(site => `site:${site}`).join(' OR ');
  
  const locationTerms = params.workType === 'remote' 
    ? 'entirely OR fully OR worldwide OR "from anywhere"'
    : params.region;
    
  const jobTypeMap: Record<JobType, string> = {
    frontend: 'frontend OR "front-end" OR "front end" OR "frontend developer" OR "react" OR "javascript"',
    backend: 'backend OR "back-end" OR "back end" OR "backend developer" OR "nodejs" OR "python" OR "java"',
    qa: 'QA OR "quality assurance" OR "test engineer" OR "QA engineer" OR "automation engineer"',
    designer: 'designer OR "UI/UX" OR "product designer" OR "UX designer" OR "UI designer" OR "web designer"'
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

export const searchJobs = (params: SearchParams): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Validate input parameters
      if (!Object.values(JobTypes).includes(params.jobType) ||
          !Object.values(WorkTypes).includes(params.workType) ||
          !Object.values(Regions).includes(params.region)) {
        throw new Error('Invalid parameters');
      }
      const query = buildSearchQuery(params);
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      const newWindow = window.open(searchUrl, '_blank');
      if (newWindow) {
        resolve();
      } else {
        reject(new Error('Popup was blocked. Please allow popups for this site.'));
      }
    } catch (error) {
      reject(error);
    }
  });
}; 