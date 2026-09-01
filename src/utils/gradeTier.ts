import { GradeLevel, PlayerProfile } from '../types';

export function getEffectiveGrade(profile: PlayerProfile, isRidheya: boolean): GradeLevel {
  return profile.selectedGrade || (isRidheya ? 'group_4_5' : 'group_6_7_8');
}

export function pickByGrade<T>(grade: GradeLevel, group45: T, group68: T): T {
  return grade === 'group_4_5' ? group45 : group68;
}
