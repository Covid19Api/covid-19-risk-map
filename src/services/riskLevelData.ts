export interface RiskLevelByGeoPosResponse {
  city: string,
  currentCasesByCity: number
  detailedRiskByCity: RiskLevel
  percent: number
}

export enum RiskLevel {
  VeryHigh = "VERY HIGH",
  High = "MEDIUM",
  Medium = "MEDIUM",
  Low = "LOW",
  VeryLow = "VERY LOW",
  None = "NONE",
  Unknown = "Unknown"
}