import { Level, BiomeType } from '../types';
import { FARM_LEVELS_68, SAVANNA_LEVELS_68 } from './biomeLevels68_part1';
import { OCEAN_LEVELS_68, RAINFOREST_LEVELS_68 } from './biomeLevels68_part2';
import { ARCTIC_LEVELS_68, DINOSAUR_LEVELS_68, ENCHANTED_FOREST_LEVELS_68 } from './biomeLevels68_part3';

export const BIOME_LEVELS_GROEP_6_8: Record<BiomeType, Level[]> = {
  farm: FARM_LEVELS_68,
  safari: SAVANNA_LEVELS_68,
  sea: OCEAN_LEVELS_68,
  jungle: RAINFOREST_LEVELS_68,
  snow: ARCTIC_LEVELS_68,
  outback: DINOSAUR_LEVELS_68,
  mountain: ENCHANTED_FOREST_LEVELS_68
};
