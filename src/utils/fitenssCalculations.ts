import { unitsInterface, userSex } from "@/interfaces/user/IUser";

/**
 * Converts height to meters based on the units
 * @param height - Height value
 * @param units - Units configuration object
 * @returns Height in meters
 */
export const heightToMeters = (
  height: number,
  units: unitsInterface
): number => {
  if (!height) return 0;

  if (units.height === "cm") {
    return height / 100; // Convert cm to meters
  } else if (units.height === "ft") {
    return height * 0.3048; // Convert feet to meters
  }

  return 0;
};

/**
 * Converts weight to kilograms based on the units
 * @param weight - Weight value
 * @param units - Units configuration object
 * @returns Weight in kilograms
 */
export const weightToKg = (weight: number, units: unitsInterface): number => {
  if (!weight) return 0;

  if (units.weight === "kg") {
    return weight;
  } else if (units.weight === "lbs") {
    return weight * 0.453592; // Convert lbs to kg
  }

  return 0;
};

/**
 * Calculates BMI based on weight and height
 * @param weight - Weight value
 * @param height - Height value
 * @param units - Units configuration object
 * @returns BMI value
 */
export const calculateBMI = (
  units: unitsInterface,
  weight?: number,
  height?: number
): number => {
  if (!height || !weight) return 0;

  const heightInMeters = heightToMeters(height, units);
  const weightInKg = weightToKg(weight, units);

  if (!heightInMeters) return 0;

  return +(weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
};

/**
 * Calculates body fat percentage based on BMI, sex, and age
 * @param bmi - BMI value
 * @param sex - 'male' or 'female'
 * @param age - Age in years (defaults to 30)
 * @returns Body fat percentage
 */
export const calculateBodyFat = (
  bmi: number,

  age: number = 30,
  sex?: userSex
): number => {
  if (!bmi) return 0;

  // This is an estimation formula
  if (sex === "male") {
    return +(1.2 * bmi + 0.23 * age - 16.2).toFixed(1);
  } else {
    return +(1.2 * bmi + 0.23 * age - 5.4).toFixed(1);
  }
};

/**
 * Returns BMI category based on BMI value
 * @param bmi - BMI value
 * @returns BMI category string
 */
export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

/**
 * Returns Tailwind CSS classes for BMI category
 * @param bmi - BMI value
 * @returns CSS class string
 */
export const getBMIColor = (bmi: number): string => {
  if (bmi < 18.5) return "text-blue-400 bg-blue-500/10";
  if (bmi < 25) return "text-green-400 bg-green-500/10";
  if (bmi < 30) return "text-yellow-400 bg-yellow-500/10";
  return "text-red-400 bg-red-500/10";
};
