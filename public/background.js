let floatingWindowId = null;
 
console.log("Team meeting timer chrome extension has been installed");

// Create a floating window when the extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  if (floatingWindowId === null) {

    // Create the floating window with the timer
    chrome.windows.create({
      url: "ext.html",  // The page to display inside the floating window
      type: "popup",      // Type set to 'popup' for a small, non-tab window
      width: 150,         // Window width
      height: 260,        // Window height
      focused: true,      // Focus the window when it opens
      left: 0,  // Position it to the right of the screen
      top: 0, // Position it to the bottom of the screen
      // alwaysOnTop: true   // Keep the window on top
    }, (window) => {
      floatingWindowId = window.id; // Store the window ID
    });
  } else {
    // If the window already exists, bring it to the foreground
    chrome.windows.update(floatingWindowId, { focused: true });
  }
});

// Close the floating window when the extension is disabled or uninstalled
chrome.runtime.onSuspend.addListener(() => {
  if (floatingWindowId !== null) {
    chrome.windows.remove(floatingWindowId);
    floatingWindowId = null;
  }
});