document.getElementById("find-music-tab").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "switch_to_music_tab" });
  });

document.getElementById("close-all-music-tabs").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "close_all_music_tabs" });
  });
  