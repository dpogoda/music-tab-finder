document.getElementById("find-music-tab").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "mouse_move" });
  });
  