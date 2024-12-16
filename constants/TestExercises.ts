import { PerformanceType, Exercise } from "./Exercise";

export const TestExercises: Exercise[] = [
  {
    name: "Bankdrücken",
    trainings: [
      {
        time: new Date("2024-12-01T10:00:00"),
        sets: [
          { reps: 10, weight: 50 },
          { reps: 8, weight: 55 },
          { reps: 6, weight: 60 },
        ],
        maxPerfomance: 65 // 1RM basierend auf 10x50kg
      },
      {
        time: new Date("2024-12-08T10:30:00"),
        sets: [
          { reps: 12, weight: 45 },
          { reps: 8, weight: 50 },
          { reps: 5, weight: 62.5 },
        ],
        maxPerfomance: 67.5 // 1RM basierend auf 5x62.5kg
      },
    ],
    performanceType: PerformanceType.RM
  },
  {
    name: "Klimmzüge breiter Griff neutral",
    trainings: [
      {
        time: new Date("2024-12-02T09:00:00"),
        sets: [
          { reps: 8, weight: 0 },
          { reps: 7, weight: 0 },
          { reps: 6, weight: 0 },
          { reps: 5, weight: 0 },
          { reps: 4, weight: 0 },
        ],
        maxPerfomance: 8 // PR: Höchste Wiederholungszahl im besten Satz
      },
      {
        time: new Date("2024-12-09T08:45:00"),
        sets: [
          { reps: 10, weight: 0 },
          { reps: 7, weight: 0 },
          { reps: 6, weight: 0 },
        ],
        maxPerfomance: 10 // PR
      },
    ],
    performanceType: PerformanceType.PR
  },
  {
    name: "Kniebeugen",
    trainings: [
      {
        time: new Date("2024-12-03T11:00:00"),
        sets: [
          { reps: 12, weight: 60 },
          { reps: 10, weight: 70 },
          { reps: 8, weight: 80 },
        ],
        maxPerfomance: 95 // 1RM basierend auf 8x80kg
      },
      {
        time: new Date("2024-12-10T10:15:00"),
        sets: [
          { reps: 10, weight: 65 },
          { reps: 8, weight: 75 },
          { reps: 6, weight: 85 },
        ],
        maxPerfomance: 100 // 1RM basierend auf 6x85kg
      },
    ],
    performanceType: PerformanceType.RM
  },
  {
    name: "Bizeps Curls",
    trainings: [
      {
        time: new Date("2024-12-04T14:00:00"),
        sets: [
          { reps: 15, weight: 10 },
          { reps: 12, weight: 12.5 },
          { reps: 10, weight: 15 },
        ],
        maxPerfomance: 17.5 // 1RM basierend auf 10x15kg
      },
      {
        time: new Date("2024-12-11T13:30:00"),
        sets: [
          { reps: 12, weight: 12 },
          { reps: 10, weight: 15 },
          { reps: 8, weight: 17.5 },
        ],
        maxPerfomance: 20 // 1RM basierend auf 8x17.5kg
      },
    ],
    performanceType: PerformanceType.RM
  },
  {
    name: "Liegestütze",
    trainings: [
      {
        time: new Date("2024-12-05T15:00:00"),
        sets: [
          { reps: 20, weight: 0 },
          { reps: 18, weight: 0 },
          { reps: 15, weight: 0 },
        ],
        maxPerfomance: 20 // PR: Höchste Wiederholungszahl im besten Satz
      },
      {
        time: new Date("2024-12-12T15:30:00"),
        sets: [
          { reps: 25, weight: 0 },
          { reps: 22, weight: 0 },
          { reps: 20, weight: 0 },
        ],
        maxPerfomance: 25 // PR
      },
    ],
    performanceType: PerformanceType.PR
  },
];

