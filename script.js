// Initialize counters
let totalTosses = 0;
let headsCount = 0;
let tailsCount = 0;
let currentBet = "";

// Elements
const tossButton = document.getElementById("toss-button");
const betHeadsRadio = document.getElementById("heads");
const betTailsRadio = document.getElementById("tails");
const resultText = document.getElementById("result-text");
const betStatus = document.getElementById("bet-status");
const totalTossesText = document.getElementById("total-tosses");
const headsCountText = document.getElementById("heads-count");
const tailsCountText = document.getElementById("tails-count");
const fillElement = document.getElementById("fill");

// Set event listeners for the betting radio buttons
betHeadsRadio.addEventListener("change", () => {
  if (betHeadsRadio.checked) {
    currentBet = "heads";
    betStatus.textContent = "You bet on Heads!";
    betStatus.style.color = "#007bff"; // Blue for heads bet
  }
});

betTailsRadio.addEventListener("change", () => {
  if (betTailsRadio.checked) {
    currentBet = "tails";
    betStatus.textContent = "You bet on Tails!";
    betStatus.style.color = "#007bff"; // Blue for tails bet
  }
});

// Set event listener for the toss button
tossButton.addEventListener("click", () => {
  if (!currentBet) {
    resultText.textContent = "Please place your bet first!";
    resultText.style.color = "#dc3545"; // Red for error
    return;
  }

  // Simulate the coin toss (random choice between 'heads' and 'tails')
  const tossResult = Math.random() < 0.5 ? "heads" : "tails";

  // Update counts and total tosses
  totalTosses++;
  if (tossResult === "heads") {
    headsCount++;
  } else {
    tailsCount++;
  }

  // Update the cylinder chart fill percentage dynamically
  updateCylinderChart();

  // Update the UI with the result of the toss
  if (tossResult === "heads") {
    resultText.textContent = "It's Heads!";
    resultText.style.color = "#28a745"; // Green for heads
  } else {
    resultText.textContent = "It's Tails!";
    resultText.style.color = "#dc3545"; // Red for tails
  }

  // Check if the user's bet is correct
  if (tossResult === currentBet) {
    betStatus.textContent = "You won the bet!";
    betStatus.style.color = "#28a745"; // Green for win
  } else {
    betStatus.textContent = "You lost the bet.";
    betStatus.style.color = "#dc3545"; // Red for loss
  }

  // Update the displayed counts and total tosses
  totalTossesText.textContent = totalTosses;
  headsCountText.textContent = headsCount;
  tailsCountText.textContent = tailsCount;
});

// Function to update the cylinder chart
function updateCylinderChart() {
  const headsPercentage = (headsCount / totalTosses) * 100;
  const tailsPercentage = (tailsCount / totalTosses) * 100;

  // Set the fill height for heads (green area)
  const headsFillHeight = (headsPercentage / 100) * 100; // in percentage of the cylinder height
  const tailsFillHeight = (tailsPercentage / 100) * 100; // in percentage of the cylinder height

  // The red area (for tails) starts from the bottom and is adjusted to the remaining percentage
  fillElement.style.height = `${tailsFillHeight}%`;
  fillElement.classList.remove("tails-fill");
  fillElement.classList.add("tails-fill"); // Ensure red color for tails

  // If the cylinder is empty and needs to display green color for heads, reset fill height
  if (headsFillHeight > 0) {
    fillElement.style.height = `${tailsFillHeight}%`;
  }
}
