// types/vacancy.ts
export interface Vacancy {
    publicId: string;
    title: string;
    vacancyDescription: string;
    publishDate: string;
    closeDate: string;
    salary: number;
    location: string;
    mode: number;
    categoryName: string;
  }

  export interface VacancyListProps {
    vacancies: Vacancy[]; // Lista de vacantes
  }
  