export default function ProfileStats() {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-[#252220] rounded-xl shadow-lg p-6 flex flex-col items-center">
        <div className="rounded-full bg-[#1d3a5f] p-3 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-[#2673e8]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">Workouts</h3>
        <p className="text-3xl font-bold text-[#2673e8]">24</p>
        <p className="text-gray-400 text-sm">This month</p>
      </div>

      <div className="bg-[#252220] rounded-xl shadow-lg p-6 flex flex-col items-center">
        <div className="rounded-full bg-[#1d3a5f] p-3 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-[#2673e8]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">Hours</h3>
        <p className="text-3xl font-bold text-[#2673e8]">42</p>
        <p className="text-gray-400 text-sm">Training time</p>
      </div>

      <div className="bg-[#252220] rounded-xl shadow-lg p-6 flex flex-col items-center">
        <div className="rounded-full bg-[#1d3a5f] p-3 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-[#2673e8]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">Trainers</h3>
        <p className="text-3xl font-bold text-[#2673e8]">2</p>
        <p className="text-gray-400 text-sm">Active trainers</p>
      </div>
    </div>
  );
}
