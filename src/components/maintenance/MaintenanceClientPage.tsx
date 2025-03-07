"use client";
import { LuClock, LuMail, LuArrowLeft } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";

interface MaintenanceInfo {
  maintenance: boolean;
  estimatedCompletionTime: string;
  message: string;
}
export default function MaintenanceClientPage({
  maintenanceInfo,
}: {
  maintenanceInfo: MaintenanceInfo;
}) {
  const contactEmail = "support@protrainer.pro";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-yellow-100 flex items-center justify-center">
            <FiAlertTriangle className="h-12 w-12 text-yellow-600" />
          </div>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
          We&apos;re Down for Maintenance
        </h1>

        <p className="mt-2 text-md text-gray-600">{maintenanceInfo?.message}</p>

        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-center space-x-2 text-gray-700">
            <LuClock className="h-5 w-5 text-primary" />
            <span>
              Estimated completion: {maintenanceInfo?.estimatedCompletionTime}
            </span>
          </div>

          <div className="flex items-center justify-center space-x-2 text-gray-700">
            <LuMail className="h-5 w-5 text-primary" />
            <span>
              Questions? Contact us at{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="text-primary hover:underline"
              >
                {contactEmail}
              </a>
            </span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Thank you for your patience as we work to improve our services.
          </p>

          <div className="mt-4">
            <button
              onClick={() => window.location.pathname.replace("/", "")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <LuArrowLeft className="mr-2 h-4 w-4" />
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
