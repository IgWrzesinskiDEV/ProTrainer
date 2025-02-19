export default function ClientMeasurements() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Body Measurements</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-600 p-4 rounded-lg">
          <p className="text-sm text-gray-300">Height</p>
          <p className="text-lg font-semibold text-white">5.2</p>
        </div>
        <div className="bg-gray-600 p-4 rounded-lg">
          <p className="text-sm text-gray-300">Weight</p>
          <p className="text-lg font-semibold text-white">412kg</p>
        </div>
        <div className="bg-gray-600 p-4 rounded-lg">
          <p className="text-sm text-gray-300">Body Fat</p>
          <p className="text-lg font-semibold text-white">12%</p>
        </div>
      </div>
    </div>
  );
}
