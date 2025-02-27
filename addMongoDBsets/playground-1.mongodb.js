// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("ProTrainer");

// Drop the existing collection to replace all exercises.
db.getCollection("exercises").drop();

// Define new exercises
const exercises = [
  {
    _id: ObjectId().toString(),
    name: "Deadlift",
    instructions:
      "Stand with feet hip-width apart. Grip the barbell and lift by extending your hips and knees.",
    equipment: "Barbell",
    category: "Back",
    muscleGroup: ["lower-back", "trapezius", "forearm"],
    videoUrl: "op9kVnSso6Q",
  },
  {
    _id: ObjectId().toString(),
    name: "Pull-Up",
    instructions:
      "Grip the pull-up bar with palms facing away. Pull yourself up until your chin is above the bar.",
    equipment: "Pull-up bar",
    category: "Back",
    muscleGroup: ["upper-back", "biceps", "back-deltoids"],
    videoUrl: "eGo4IYlbE5g",
  },
  {
    _id: ObjectId().toString(),
    name: "Bench Press",
    instructions:
      "Lie on a flat bench, grip the barbell, and lower it to your chest before pressing upward.",
    equipment: "Barbell, Bench",
    category: "Chest",
    muscleGroup: ["chest", "front-deltoids", "triceps"],
    videoUrl: "4Y2ZdHCOXok",
  },
  {
    _id: ObjectId().toString(),
    name: "Bicep Curl",
    instructions:
      "Hold dumbbells with palms facing forward and curl them up towards your shoulders.",
    equipment: "Dumbbells",
    category: "Arms",
    muscleGroup: ["biceps", "forearm"],
    videoUrl: "ykJmrZ5v0Oo",
  },
  {
    _id: ObjectId().toString(),
    name: "Triceps Dips",
    instructions:
      "Grip parallel bars and lower your body by bending elbows, then push back up.",
    equipment: "Dip bars",
    category: "Arms",
    muscleGroup: ["triceps", "back-deltoids"],
    videoUrl: "0326dy_-CzM",
  },
  {
    _id: ObjectId().toString(),
    name: "Plank",
    instructions:
      "Hold a push-up position with elbows bent and weight on forearms.",
    equipment: "Bodyweight",
    category: "Core",
    muscleGroup: ["abs", "lower-back"],
    videoUrl: "pSHjTRCQxIw",
  },
  {
    _id: ObjectId().toString(),
    name: "Russian Twist",
    instructions:
      "Sit with feet elevated, rotate torso side to side holding a weight or bodyweight.",
    equipment: "Bodyweight, Medicine Ball",
    category: "Core",
    muscleGroup: ["obliques", "abs"],
    videoUrl: "wkD8rjkodUI",
  },
  {
    _id: ObjectId().toString(),
    name: "Squat",
    instructions:
      "Stand with feet shoulder-width apart, bend knees, and lower into a squat before standing back up.",
    equipment: "Barbell, Bodyweight",
    category: "Legs",
    muscleGroup: ["quadriceps", "hamstring", "gluteal"],
    videoUrl: "YaXPRqUwItQ",
  },
  {
    _id: ObjectId().toString(),
    name: "Calf Raise",
    instructions:
      "Stand on toes, lift heels off the ground, then lower back down.",
    equipment: "Bodyweight, Dumbbells",
    category: "Legs",
    muscleGroup: ["calves"],
    videoUrl: "wv-6bJcu3hw",
  },
  {
    _id: ObjectId().toString(),
    name: "Neck Flexion",
    instructions: "Sit upright and slowly nod your head forward and back.",
    equipment: "Bodyweight, Resistance Band",
    category: "Head",
    muscleGroup: ["neck", "head"],
    videoUrl: "Z-j3aYP9Oqw",
  },
  {
    _id: ObjectId().toString(),
    name: "Lunges",
    instructions:
      "Step forward with one leg, lower your hips until both knees are bent at a 90-degree angle.",
    equipment: "Bodyweight, Dumbbells",
    category: "Legs",
    muscleGroup: ["quadriceps", "hamstring", "gluteal"],
    videoUrl: "QOVaHwm-Q6U",
  },
  {
    _id: ObjectId().toString(),
    name: "Lat Pulldown",
    instructions:
      "Pull the lat bar down to your chest while keeping your back straight.",
    equipment: "Lat Pulldown Machine",
    category: "Back",
    muscleGroup: ["upper-back", "biceps"],
    videoUrl: "CAwf7n6Luuc",
  },
  {
    _id: ObjectId().toString(),
    name: "Shoulder Press",
    instructions: "Press dumbbells overhead while keeping your core engaged.",
    equipment: "Dumbbells, Barbell",
    category: "Arms",
    muscleGroup: ["front-deltoids", "triceps"],
    videoUrl: "qEwKCR5JCog",
  },
  {
    _id: ObjectId().toString(),
    name: "Leg Press",
    instructions:
      "Push the weight away using your legs while keeping knees aligned.",
    equipment: "Leg Press Machine",
    category: "Legs",
    muscleGroup: ["quadriceps", "hamstring", "gluteal"],
    videoUrl: "IZxyjW7MPJQ",
  },
  {
    _id: ObjectId().toString(),
    name: "Seated Calf Raise",
    instructions:
      "Push up onto your toes while seated to work the calf muscles.",
    equipment: "Calf Raise Machine",
    category: "Legs",
    muscleGroup: ["calves"],
    videoUrl: "M4vJh2sXbW4",
  },
];

// Insert new exercises
db.getCollection("exercises").insertMany(exercises);

// Confirm insertion
db.getCollection("exercises").find().pretty();
