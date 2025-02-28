export enum VacancyMode {
  ON_SITE = 0,
  HYBRID = 1,
  REMOTE = 2,
}

export const VacancyModeLabels: Record<VacancyMode, string> = {
  [VacancyMode.ON_SITE]: "Presencial",
  [VacancyMode.HYBRID]: "Híbrido",
  [VacancyMode.REMOTE]: "Remoto",
};
