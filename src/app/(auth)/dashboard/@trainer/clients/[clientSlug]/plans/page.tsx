import ClientPlans from "@/components/trainer-components/clients/plans/ClientPlans";
import { getClientPlans } from "@/utils/data/getClientPlans";
export default async function ClientPlansPage({
  params,
}: {
  params: Promise<{ clientSlug: string }>;
}) {
  const clientId = (await params).clientSlug;
  const plans = await getClientPlans(clientId);
  console.log(plans);
  return (
    <ClientPlans clientId={clientId} clientPlans={JSON.stringify(plans)} />
  );
}

// const clientData: ClientInfo = {
//   username: "JaneDoe123",
//   email: "jane.doe@example.com",
//   bio: "Fitness enthusiast, yoga lover, and aspiring marathon runner. Always striving to be the best version of myself!",
//   measurements: {
//     height: "5'7\"",
//     weight: "140 lbs",
//     bodyFat: "22%",
//   },
//   workoutPlans: [
//     {
//       planId: 1,
//       planName: "Summer Shred",
//       days: [
//         {
//           id: 1,
//           day: "Monday",
//           exercises: [
//             {
//               number: 1,
//               name: "Bench Press",
//               tempo: "2-1-2",
//               weekData: [{ week: 1, coachData: "3x10 20kg" }],
//             },
//           ],
//         },
//       ],
//       weekCount: 1,
//     },
//   ],
//   fitnessStats: {
//     avgHeartRate: 140,
//     caloriesBurned: 2500,
//     achievements: 15,
//   },
// };
