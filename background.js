let lastAudibleTabId = null;
let previousTabId = null;

// Function to check which tab is playing audio
function checkForAudioTabs() {
  chrome.tabs.query({ audible: true }, (tabs) => {
    if (tabs.length > 0) {
      lastAudibleTabId = tabs[0].id;
      console.log("🎵 Music is playing in tab:", lastAudibleTabId);
    } else {
      lastAudibleTabId = null;
    }
  });
}

// Run this check every second
setInterval(checkForAudioTabs, 1000);

// Create two separate context menu items on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "switch_to_music_tab",
    title: "🔊 Switch to Music Tab",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    id: "jump_back_to_previous_tab",
    title: "⬅ Jump Back to Previous Tab",
    contexts: ["all"]
  });
});

// Handle right-click menu actions
chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const activeTabId = tabs[0].id;

      if (info.menuItemId === "switch_to_music_tab" && lastAudibleTabId) {
        previousTabId = activeTabId; // Store the previous tab
        chrome.tabs.update(lastAudibleTabId, { active: true });
        console.log("🔄 Switched to music tab:", lastAudibleTabId);
      } 
      else if (info.menuItemId === "jump_back_to_previous_tab" && previousTabId) {
        chrome.tabs.update(previousTabId, { active: true });
        console.log("⬅ Jumped back to previous tab:", previousTabId);
      }
    }
  });
});
