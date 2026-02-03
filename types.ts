
export enum TargetAudience {
  BABY = 'BABY',
  ELDER = 'ELDER',
  GENERAL = 'GENERAL'
}

export interface User {
  id: string;
  name: string;
  phone: string;
}

export interface IngredientAnalysis {
  name: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  reason: string;
}

export interface HealthSensitivity {
  diabetes: { risk: 'Low' | 'Medium' | 'High'; reason: string };
  bp: { risk: 'Low' | 'Medium' | 'High'; reason: string };
  heart: { risk: 'Low' | 'Medium' | 'High'; reason: string };
}

export interface RegulatoryCheck {
  requirement: string;
  status: 'Passed' | 'Failed' | 'Missing';
  regulationId: string;
  details: string;
}

export interface UserFeedback {
  id: string;
  itemId: string;
  type: 'Incorrect Expiry' | 'Missed Allergen' | 'Wrong Regulation' | 'Other';
  comment: string;
  submittedAt: number;
}

export interface ComplianceResult {
  productName: string;
  brand: string;
  expiryDate: string;
  isExpired: boolean;
  ingredients: string[];
  riskyIngredients: IngredientAnalysis[];
  healthSensitivity: HealthSensitivity;
  safetyScore: number;
  recommendation: string;
  targetAudience: TargetAudience;
  detectedRegion: string;
  regulatoryMarkers: string[]; 
  complianceViolations: string[]; 
  isRegulatorilyCompliant: boolean;
  detailedChecklist: RegulatoryCheck[];
}

export interface InventoryItem extends ComplianceResult {
  id: string;
  addedAt: number;
  imageUrl?: string;
  isSyncing?: boolean;
  lastSyncedAt?: number;
  feedbackSubmitted?: boolean;
}

export interface DashboardStats {
  totalItems: number;
  expiredCount: number;
  riskyCount: number;
  regulatoryIssuesCount: number;
  averageSafetyScore: number;
}
