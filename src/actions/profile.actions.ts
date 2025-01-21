export async function saveProfileData(
  prevState: unknown,
  formData: FormData,
  id: string
) {
  const userName = formData.get("fullName") as string;
  const bio = formData.get("bio") as string;
}
