let lastMoveTime = 0;
let moveCount = 0;

document.addEventListener("mousemove", (event) => {
  const now = Date.now();

  // If the time difference between moves is small, count it
  if (now - lastMoveTime < 150) {
    moveCount++;
  } else {
    moveCount = 0; // Reset if the movement slows down
  }

  lastMoveTime = now;

  // If mouse moves rapidly 8 times in a short period, trigger tab switch
  if (moveCount > 8) {
    console.log("Rapid mouse movement detected! Sending message to background.js");
    chrome.runtime.sendMessage({ type: "mouse_move" });
    moveCount = 0; // Reset
  }
});
