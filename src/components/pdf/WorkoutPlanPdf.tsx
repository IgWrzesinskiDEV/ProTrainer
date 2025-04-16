// components/pdf/WorkoutPlanPDF.tsx
"use client";
import { WorkoutPlan } from "@/interfaces/workout/IWorkout";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Optional: Customize font
Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxM.woff2",
});

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: "Roboto" },
  section: { marginBottom: 10 },
  title: { fontSize: 16, marginBottom: 10, fontWeight: "bold" },
  entry: { marginBottom: 5 },
  bold: { fontWeight: "bold" },
});

export default function WorkoutPlanPDF({ plan }: { plan: WorkoutPlan }) {
  console.log("Rendering PDF for plan:", plan.planName); // 👈 will appear in terminal

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>{plan.planName}</Text>
        {plan.days.map((day, dayIndex) => (
          <View key={dayIndex} style={styles.section}>
            <Text style={styles.bold}>{day.weekDay}</Text>
            {day.exercises.map((exercise, exIdx) => (
              <View key={exIdx} style={styles.section}>
                <Text>
                  #{exercise.number} - {exercise.name} ({exercise.tempo})
                </Text>
                {exercise.weekData.map((week, wIdx) => (
                  <Text key={wIdx} style={styles.entry}>
                    Week {week.weekNumber} - 🧑‍🏫 {week.trainerData || "—"} | 🧍{" "}
                    {week.clientData || "—"}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
}
