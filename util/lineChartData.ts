import { ExerciseTraining } from "@/constants/Exercise";

export function transformDataForLineChart(exercises: ExerciseTraining[]) {
    const data = {
      labels: [] as string[],
      datasets: [
        {
          data: [] as number[],
          color: (opacity = 1) => `rgba(0, 200, 200, ${opacity})`,
        },
      ],
    };
  
    let lastMonth = -1;
  
    exercises.forEach((exercise) => {
      const date = new Date(exercise.time);
      const currentMonth = date.getMonth(); // Monat von 0-11
      const currentMonthName = date.toLocaleString('de-DE', { month: 'long' });
  
      if (currentMonth !== lastMonth) {
        data.labels.push(currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1)); // Monat mit erstem Buchstaben groß
        lastMonth = currentMonth;
      } else {
        data.labels.push(''); // Leer, wenn es nicht das erste Training im Monat ist
      }
  
      data.datasets[0].data.push(exercise.maxPerfomance);
    });
  
    return data;
}

export const createChartConfig = () => ({
    backgroundGradientFrom: "rgb(144, 218, 255)",
    backgroundGradientFromOpacity: 0.4,
    backgroundGradientTo: "rgb(144, 218, 255)",
    backgroundGradientToOpacity: 0.2,
    fillShadowGradientFrom: "#00A6F9",
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientTo: "#00A6F9",
    fillShadowGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(33, 33, 33, ${opacity})`,
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    barRadius: 1,
    strokeWidth: 1,
    propsForDots: {
        r: "3",
        strokeWidth: "1",
        stroke: "#00A6F9"
    }

});