export default function TrainerProfileAdditionalForm() {
  return (
    <form>
      <div>
        <label htmlFor="certifications">Certifications</label>
        <input type="text" id="certifications" name="certifications" />
      </div>
      <div>
        <label htmlFor="specialties">Specialties</label>
        <input type="text" id="specialties" name="specialties" />
      </div>
      <div>
        <label htmlFor="experience">Experience</label>
        <input type="text" id="experience" name="experience" />
      </div>
      <div>
        <label htmlFor="education">Education</label>
        <input type="text" id="education" name="education" />
      </div>
      <div>
        <label htmlFor="trainingStyle">Training Style</label>
        <input type="text" id="trainingStyle" name="trainingStyle" />
      </div>
      <div>
        <label htmlFor="trainingLocations">Training Locations</label>
        <input type="text" id="trainingLocations" name="trainingLocations" />
      </div>
      <div>
        <label htmlFor="trainingEquipment">Training Equipment</label>
        <input type="text" id="trainingEquipment" name="trainingEquipment" />
      </div>
      <div>
        <label htmlFor="trainingPrograms">Training Programs</label>
        <input type="text" id="trainingPrograms" name="trainingPrograms" />
      </div>
      <div>
        <label htmlFor="trainingAvailability">Training Availability</label>
        <input
          type="text"
          id="trainingAvailability"
          name="trainingAvailability"
        />
      </div>
      <div>
        <label htmlFor="trainingRates">Training Rates</label>
        <input type="text" id="trainingRates" name="trainingRates" />
      </div>
      <div>
        <label htmlFor="trainingWebsite">Training Website</label>
        <input type="text" id="trainingWebsite" name="trainingWebsite" />
      </div>
      <div>
        <label htmlFor="trainingSocialMedia">Training Social Media</label>
        <input
          type="text"
          id="trainingSocialMedia"
          name="trainingSocialMedia"
        />
      </div>
      <div>
        <label htmlFor="trainingBio">Training Bio</label>
        <input type="text" id="trainingBio" name="trainingBio" />
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
