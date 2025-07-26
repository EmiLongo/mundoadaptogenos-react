type ImageSource = string | { default: string };

export interface IBenefit {
  icon: ImageSource;
  description: string;
}

export interface IHealthEffect {
  title: string;
  subtitle: string;
  description: string[];
}

export interface IMushroomDetails {
  imgTitle: ImageSource;
  title: string;
  subtitle: string;
  basicDescription: string;
  benefits: IBenefit[];
  productCardById: number[];
  bioactive: string[];
  healthEffects: IHealthEffect[];
  imgDescription: ImageSource;
  description: string[];
  imgHarvest: ImageSource;
  harvest: string[];
}