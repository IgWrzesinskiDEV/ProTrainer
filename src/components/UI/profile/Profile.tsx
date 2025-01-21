import Input from "../Input";
import AuthButton from "../auth/AuthButton";
export default function Profile() {
  return (
    <div className="z-10 bg-stone-800 p-8 rounded-lg shadow-lg mx-auto ">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Profile
      </h2>
      <div className="flex  w-full items-center justify-around">
        <div className="w-1/3">
          <div className="flex items-center justify-center flex-col gap-3">
            <div className="w-14 h-14 rounded-full bg-stone-300"></div>
            <p className="text-center">Change avatar</p>
          </div>
          <form
            action=""
            className="flex items-center justify-center flex-col gap-6"
          >
            <Input label="full Name" name="fullName" type="text" />
            <Input label="Bio" name="bio" type="text" />

            <AuthButton type="submit" className="w-1/4">
              Save
            </AuthButton>
          </form>
        </div>
        <div className="w-[1px] opacity-20 h-80 bg-stone-300" />
        <div className="w-1/3">
          <h3 className="text-xl font-semibold text-white mb-4 text-center">
            Units
          </h3>
          <form className="flex items-center justify-center flex-col gap-4">
            <div className="flex  w-1/2 justify-center  flex-col gap-2">
              <label className="text-white">Weight Unit</label>
              <select className="p-2 rounded bg-stone-700  text-white">
                <option value="kg">Kilograms (kg)</option>
                <option value="lbs">Pounds (lbs)</option>
              </select>
            </div>
            <div className="flex  w-1/2 justify-center  flex-col gap-2">
              <label className="text-white">Body Measurement Unit</label>
              <select className="p-2 rounded bg-stone-700 text-white">
                <option value="cm">Centimeters (cm)</option>
                <option value="in">Inches (in)</option>
              </select>
            </div>
            <div className="flex  w-1/2 justify-center  flex-col gap-2">
              <label className="text-white">Height Unit</label>
              <select className="p-2 rounded bg-stone-700 text-white">
                <option value="cm">Meters (m)</option>
                <option value="ft">Feet (ft)</option>
              </select>
            </div>
            <AuthButton type="submit" className="w-1/4">
              Save
            </AuthButton>
          </form>
        </div>
      </div>
    </div>
  );
}
