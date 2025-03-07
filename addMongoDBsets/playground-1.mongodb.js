// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("ProTrainerProd");

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
    videoUrl: "2Q-HQ3mnePg",
  },
  {
    _id: ObjectId().toString(),
    name: "T-Bar Row",
    instructions:
      "Stand bent over with a neutral grip, and row the bar towards your chest.",
    equipment: "T-Bar Row Machine",
    category: "Back",
    muscleGroup: ["upper-back", "trapezius", "biceps"],
    videoUrl: "hYo72r8Ivso",
  },
  {
    _id: ObjectId().toString(),
    name: "Chest Fly",
    instructions:
      "Lie on a bench, hold dumbbells, and open arms wide before bringing them together.",
    equipment: "Dumbbells, Bench",
    category: "Chest",
    muscleGroup: ["chest"],
    videoUrl: "Nhvz9EzdJ4U",
  },
  {
    _id: ObjectId().toString(),
    name: "Chest Dips",
    instructions:
      "Lower your body on parallel bars, keeping your torso upright, and press back up.",
    equipment: "Dip Bars",
    category: "Chest",
    muscleGroup: ["chest", "triceps"],
    videoUrl: "yN6Q1UI_xkE",
  },
  {
    _id: ObjectId().toString(),
    name: "Concentration Curl",
    instructions:
      "Sit on a bench, rest your arm on your inner thigh, and curl the dumbbell toward your shoulder.",
    equipment: "Dumbbell",
    category: "Arms",
    muscleGroup: ["biceps"],
    videoUrl: "VMbDQ8PZazY",
  },
  {
    _id: ObjectId().toString(),
    name: "Overhead Tricep Extension",
    instructions:
      "Hold a dumbbell overhead with both hands and lower it behind your head, then extend back up.",
    equipment: "Dumbbell",
    category: "Arms",
    muscleGroup: ["triceps"],
    videoUrl: "LqtouEPPjaA",
  },
  {
    _id: ObjectId().toString(),
    name: "Barbell Shrug",
    instructions:
      "Hold a barbell with both hands, shrug your shoulders as high as you can, then lower them back.",
    equipment: "Barbell",
    category: "Back",
    muscleGroup: ["trapezius"],
    videoUrl: "M_MjF5Nm_h4",
  },
  {
    _id: ObjectId().toString(),
    name: "Side Plank",
    instructions:
      "Lie on your side, supporting your body with one arm, and hold the position while engaging your core.",
    equipment: "Bodyweight",
    category: "Core",
    muscleGroup: ["obliques", "abs"],
    videoUrl: "_R389Jk0tIo",
  },
  {
    _id: ObjectId().toString(),
    name: "Reverse Crunch",
    instructions:
      "Lie on your back, bring your knees toward your chest, and curl your hips upward.",
    equipment: "Bodyweight",
    category: "Core",
    muscleGroup: ["abs"],
    videoUrl: "XY8KzdDcMFg",
  },
  {
    _id: ObjectId().toString(),
    name: "Incline Dumbbell Press",
    instructions:
      "Lie on an incline bench, press dumbbells up until arms are fully extended, then lower slowly.",
    equipment: "Dumbbells, Incline Bench",
    category: "Chest",
    muscleGroup: ["chest", "front-deltoids", "triceps"],
    videoUrl: "8iPEnn-ltC8",
  },
  {
    _id: ObjectId().toString(),
    name: "One Arm Cable Row",
    instructions:
      "Grip the cable handle with one hand, pull towards your torso while keeping your back straight.",
    equipment: "Cable Machine",
    category: "Back",
    muscleGroup: ["upper-back", "biceps", "back-deltoids"],
    videoUrl: "1jN6qeXdvWA",
  },
  {
    _id: ObjectId().toString(),
    name: "One Arm Rope Tricep Extension",
    instructions:
      "Grip a rope attachment with one hand, extend your arm down while keeping your elbow stable.",
    equipment: "Cable Machine",
    category: "Arms",
    muscleGroup: ["triceps"],
    videoUrl: "vjOefY0qd1Y",
  },
  {
    _id: ObjectId().toString(),
    name: "Dumbbell Lateral Raise",
    instructions:
      "Raise dumbbells to the side until shoulder height, then lower slowly.",
    equipment: "Dumbbells",
    category: "Arms",
    muscleGroup: ["front-deltoids"],
    videoUrl: "3VcKaXpzqRo",
  },
  {
    _id: ObjectId().toString(),
    name: "Seated Dumbbell Shoulder Press",
    instructions:
      "Press dumbbells overhead while seated, keeping your core engaged.",
    equipment: "Dumbbells, Bench",
    category: "Arms",
    muscleGroup: ["front-deltoids", "triceps"],
    videoUrl: "qEwKCR5JCog",
  },
  {
    _id: ObjectId().toString(),
    name: "Barbell Bent-Over Row",
    instructions:
      "Bend forward at the hips, pull the barbell towards your torso, then slowly lower.",
    equipment: "Barbell",
    category: "Back",
    muscleGroup: ["upper-back", "biceps"],
    videoUrl: "vT2GjY_Umpw",
  },
  {
    _id: ObjectId().toString(),
    name: "Cable Face Pull",
    instructions:
      "Pull the rope attachment towards your face while keeping elbows high.",
    equipment: "Cable Machine",
    category: "Back",
    muscleGroup: ["trapezius", "back-deltoids"],
    videoUrl: "0Po47vvj9g4",
  },
  {
    _id: ObjectId().toString(),
    name: "Dumbbell Hammer Curl",
    instructions:
      "Hold dumbbells with a neutral grip and curl them up towards your shoulders.",
    equipment: "Dumbbells",
    category: "Arms",
    muscleGroup: ["biceps", "forearm"],
    videoUrl: "TwD-YGVP4Bk",
  },
  {
    _id: ObjectId().toString(),
    name: "Cable Lateral Raise",
    instructions:
      "Use a single cable attachment to lift your arm laterally to shoulder height.",
    equipment: "Cable Machine",
    category: "Arms",
    muscleGroup: ["front-deltoids"],
    videoUrl: "Z5FA9aq3L6A",
  },
  {
    _id: ObjectId().toString(),
    name: "Dumbbell Romanian Deadlift",
    instructions:
      "Hold dumbbells in front, hinge at the hips, and lower them while keeping a straight back.",
    equipment: "Dumbbells",
    category: "Legs",
    muscleGroup: ["hamstring", "gluteal", "lower-back"],
    videoUrl: "hQgFixeXdZo",
  },
  {
    _id: ObjectId().toString(),
    name: "Cable Glute Kickback",
    instructions:
      "Attach an ankle strap to the cable and kick back while keeping your leg straight.",
    equipment: "Cable Machine",
    category: "Legs",
    muscleGroup: ["gluteal"],
    videoUrl: "SqO-VUEak2M",
  },
  {
    _id: ObjectId().toString(),
    name: "Leg Curl Machine",
    instructions:
      "Sit on the machine and curl your legs towards your body to engage the hamstrings.",
    equipment: "Leg Curl Machine",
    category: "Legs",
    muscleGroup: ["hamstring"],
    videoUrl: "ELOCsoDSmrg",
  },
  {
    _id: ObjectId().toString(),
    name: "Leg Extension Machine",
    instructions:
      "Extend your legs fully while sitting in the machine, then lower back down slowly.",
    equipment: "Leg Extension Machine",
    category: "Legs",
    muscleGroup: ["quadriceps"],
    videoUrl: "YyvSfVjQeL0",
  },
  {
    _id: ObjectId().toString(),
    name: "Standing Calf Raise Machine",
    instructions:
      "Stand on the platform, push up onto your toes, then lower slowly.",
    equipment: "Calf Raise Machine",
    category: "Legs",
    muscleGroup: ["calves"],
    videoUrl: "g_E7_q1z2bo",
  },
  {
    _id: ObjectId().toString(),
    name: "Cable Ab Crunch",
    instructions:
      "Hold a cable attachment behind your head and crunch down to engage your abs.",
    equipment: "Cable Machine",
    category: "Core",
    muscleGroup: ["abs"],
    videoUrl: "ToJeyhydUxU",
  },
  {
    _id: ObjectId().toString(),
    name: "Dumbbell Side Bend",
    instructions:
      "Hold a dumbbell in one hand and bend sideways to work the obliques.",
    equipment: "Dumbbells",
    category: "Core",
    muscleGroup: ["obliques"],
    videoUrl: "M0KGYdsKVPM",
  },

  {
    _id: ObjectId().toString(),
    name: "Cable Chest Fly",
    instructions:
      "Pull the cable handles together in front of your chest while keeping arms slightly bent.",
    equipment: "Cable Machine",
    category: "Chest",
    muscleGroup: ["chest", "front-deltoids"],
    videoUrl: "4mfLHnFL0Uw",
  },
  {
    _id: ObjectId().toString(),
    name: "Close Grip Bench Press",
    instructions:
      "Grip the barbell with hands closer together and press upward to engage triceps.",
    equipment: "Barbell, Bench",
    category: "Arms",
    muscleGroup: ["triceps", "chest"],
    videoUrl: "XEFDMwmrLAM",
  },
];

// Insert new exercises
db.getCollection("exercises").insertMany(exercises);

// Confirm insertion
db.getCollection("exercises").find().pretty();
