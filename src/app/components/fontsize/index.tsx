"use client";

export function fontswitch(task: string) {
    const root = document.documentElement;
    const currentFontSize = parseInt(
        getComputedStyle(root).getPropertyValue("font-size")
    );
  
    switch (task) {
        case "smaller":
            const smallerSize = Math.max(currentFontSize - 1, 12); // Minimum 12px
            root.style.fontSize = smallerSize + "px";
            localStorage.setItem("fontsize", smallerSize + "px");
            break;
        case "bigger":
            const biggerSize = Math.min(currentFontSize + 1, 24); // Maximum 24px
            root.style.fontSize = biggerSize + "px";
            localStorage.setItem("fontsize", biggerSize + "px");
            break;
        case "reset":
            root.style.fontSize = "16px"; // Reset to default
            localStorage.removeItem("fontsize");
            break;
        default:
            root.style.fontSize = "16px";
            localStorage.removeItem("fontsize");
    }
}

// Function to load saved font size on page load
export function loadSavedFontSize() {
    if (typeof window !== 'undefined') {
        const savedFontSize = localStorage.getItem("fontsize");
        if (savedFontSize) {
            const root = document.documentElement;
            root.style.fontSize = savedFontSize;
        }
    }
}