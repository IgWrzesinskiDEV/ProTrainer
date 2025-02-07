"use server";

export default async function saveExercisesUserData(
  prevState: unknown,
  formData: FormData
) {
  const cleanedData: { [key: string]: FormDataEntryValue } = {};

  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("$ACTION_")) {
      cleanedData[key] = value;
    }
  }
  console.log(cleanedData);
  if (!formData) return { error: "No data to save" };
}
