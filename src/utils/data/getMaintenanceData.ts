export default function getMaintenanceData() {
  return {
    maintenance: process.env.MAINTENANCE_MODE === "true",
    estimatedCompletionTime:
      process.env.MAINTENANCE_COMPLETION_TIME || "Unknown",
    message:
      process.env.MAINTENANCE_MESSAGE ||
      "Our website is currently undergoing scheduled maintenance.",
  };
}
