import MaintenanceClientPage from "@/components/maintenance/MaintenanceClientPage";
import getMaintenanceData from "@/utils/data/getMaintenanceData";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Site Maintenance | We'll Be Back Soon",
  description:
    "Our website is currently undergoing scheduled maintenance. We'll be back shortly.",
};

export default async function MaintenancePage() {
  const maintenanceInfo = await getMaintenanceData();
  return <MaintenanceClientPage maintenanceInfo={maintenanceInfo} />;
}
