const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
let remainingGuess = document.querySelector(".remaining");
let previousNums = document.querySelector(".previousNums");
//Object that stores values of minimum and maximum angle for a value
//let remainingChances = prompt(
//"Please enter how many times do you want to spin",
//3
//);
let remainingChances = 7;
const rotationValues = [
  { minDegree: 0, maxDegree: 70, value: "Goa" },
  { minDegree: 71, maxDegree: 150, value: "Pondicherry" },
  { minDegree: 151, maxDegree: 220, value: "Amritsar" },
  { minDegree: 221, maxDegree: 290, value: "Andaman" },
  { minDegree: 291, maxDegree: 360, value: "Kashmir" },
  //{ minDegree: 301, maxDegree: 360, value: 3 },
  //{ minDegree: 331, maxDegree: 360, value: 2 },
];
//Size of each piece
const data = [20, 20, 20, 20, 20];
//background color for each piece
var pieColors = [
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#8b35bc",
  "#b163da",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: ["Goa", "kashmir", "Andaman", "Amritsar", "Pondicherry"],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 11 },
      },
    },
  },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>You are visiting: ${i.value}</p>`;
      /*lastGuess.push(i.value);
      previousNums.textContent = `Your last 7 Choices were: [${lastGuess}]`;*/
      spinBtn.disabled = false;
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//added by me
let lastGuess = [];

//remainingGuess.innerHTML = "Remaining chances : " + remainingChances;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree;
  //setting random
  if (remainingChances == 7) {
    randomDegree = 140;
  } else if (remainingChances == 6) {
    randomDegree = 280;
  } else if (remainingChances == 5) {
    randomDegree = 140;
  } else if (remainingChances == 4) {
    randomDegree = 60;
  } else if (remainingChances == 3) {
    randomDegree = 60;
  } else if (remainingChances == 2) {
    randomDegree = 140;
  } else if (remainingChances == 1) {
    randomDegree = 350;
  }
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (
      count > 15 &&
      myChart.options.rotation == randomDegree &&
      remainingChances > 0
    ) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
      remainingChances -= 1;
    }
  }, 10);
});
