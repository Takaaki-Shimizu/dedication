export interface PersonalInfo {
  name: string;
  nameKana: string;
  birthDate: string;
  gender: 'male' | 'female' | '';
  address: string;
  phone: string;
  email: string;
  photo?: string;
}

export interface EducationEntry {
  id: string;
  date: string;
  institution: string;
  department?: string;
  status: 'graduated' | 'enrolled' | 'dropped_out';
}

export interface WorkExperienceEntry {
  id: string;
  startDate: string;
  endDate?: string;
  company: string;
  position: string;
  description: string;
  status: 'current' | 'resigned';
}

export interface QualificationEntry {
  id: string;
  date: string;
  name: string;
  organization?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: EducationEntry[];
  workExperience: WorkExperienceEntry[];
  qualifications: QualificationEntry[];
  motivation: string;
  selfPR: string;
  createdAt: string;
  updatedAt: string;
}

export const createEmptyResumeData = (): ResumeData => ({
  personalInfo: {
    name: '',
    nameKana: '',
    birthDate: '',
    gender: '',
    address: '',
    phone: '',
    email: '',
  },
  education: [],
  workExperience: [],
  qualifications: [],
  motivation: '',
  selfPR: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
