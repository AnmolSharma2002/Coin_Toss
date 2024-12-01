const tossButton = document.getElementById("toss-button");
const resultText = document.getElementById("result-text");

const tailsFill = document.querySelector(".tails-fill"); // Only red fill is used now
const totalTossesElem = document.getElementById("total-tosses");
const headsCountElem = document.getElementById("heads-count");
const tailsCountElem = document.getElementById("tails-count");

let headsCount = 0;
let tailsCount = 0;

tossButton.addEventListener("click", () => {
  const isHeads = Math.random() < 0.5; // 50% chance for heads or tails
  const result = isHeads ? "Heads" : "Tails";

  // Update the result display
  resultText.textContent = result;
  resultText.className = isHeads ? "win" : "lose"; // Green for heads, red for tails

  // Update counts
  if (isHeads) {
    headsCount++;
  } else {
    tailsCount++;
  }

  // Update totals
  const totalTosses = headsCount + tailsCount;
  totalTossesElem.textContent = totalTosses;
  headsCountElem.textContent = headsCount;
  tailsCountElem.textContent = tailsCount;

  // Calculate the difference
  const difference = Math.abs(totalTosses - headsCount);
  const differencePercentage = (difference / totalTosses) * 100;

  // Adjust the red fill based on the difference
  tailsFill.style.height = `${differencePercentage}%`;
});
