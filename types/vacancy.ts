export interface VacancyPublicDto {
  publicId: string;
  title: string;
  vacancyDescription: string;
  publishedAt: string;
  expiresAt: string;
  salary: number;
  provinceName: string;
  mode: number;
  categoryName: string;
}

export interface VacancyUserDto extends VacancyPublicDto {
  status: number;
  createdAt: string;
}

export interface VacancyListProps {
  vacancies: VacancyPublicDto[];
}
