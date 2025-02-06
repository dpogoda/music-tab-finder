let lastAudibleTabId = null;

// Function to check which tab is playing audio
function checkForAudioTabs() {
  chrome.tabs.query({ audible: true }, (tabs) => {
    if (tabs.length > 0) {
      lastAudibleTabId = tabs[0].id;
      console.log("🎵 Music is playing in tab:", lastAudibleTabId);
    } else {
      lastAudibleTabId = null;
      console.log("🚫 No tab playing audio.");
    }
  });
}

// Run this check every second
setInterval(checkForAudioTabs, 1000);

// Create a context menu when the extension loads
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "switch_to_music_tab",
    title: "🔊 Switch to Music Tab",
    contexts: ["all"]
  });
});

// Listen for right-click menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "switch_to_music_tab") {
    if (lastAudibleTabId) {
      console.log("🔄 Switching to music tab:", lastAudibleTabId);
      chrome.tabs.update(lastAudibleTabId, { active: true }, () => {
        if (chrome.runtime.lastError) {
          console.error("❌ Error switching tab:", chrome.runtime.lastError.message);
        }
      });
    } else {
      console.log("⚠️ No active audio tab found.");
    }
  }
});
