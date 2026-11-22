// ==UserScript==
// @name         Wikipedia Reading Checkpoint
// @namespace    https://example.com/wikipedia-reading-checkpoint
// @version      1.0
// @match        https://en.wikipedia.org/wiki/*
// @grant        none
// ==/UserScript==

(() => {
    "use strict";

    if (!document.querySelector("#mw-content-text"))
        return;
    const key="reading-checkpoint" + location.pathname;
    const style = document.createElement("style");
    style.textContent=`
        #reading-checkpoint {
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 9999;
        box-sizing: border-box;
        width: min(260px, calc(100vw - 32px));
        padding: 12px;
        border: 1px solid #a2e9b1;
        border-radius: 8px;
        background: #fff;
        color: #202122;
        box-shadow: 0 3px 12px #0003;
        font: 14px/1.4 Arial, sans-serif;
}
 #reading-checkpoint progress { width: 100%; margin: 8px 0; }
#reading-checkpoint .buttons { display: flex; flex-wrap: wrap; gap: 6px; }
#reading-checkpoint button { cursor: pointer; padding: 5px 8px; }
#reading-checkpoint button:disabled { cursor: default; }
#reading-checkpoint .status { display: block; margin-top: 6px;
}
`;
    document.head.appendChild(style);

    const widget = document.createElement("aside");
    widget.id = "reading-checkpoint";
    widget.setAttribute("aria-label", "Reading checkpoint");
    widget.innerHTML = `
       <strong>Reading checkpoint </strong>
       <span class="percent">0% read</span>
       <progress max="100" value="0"></progress>
    <div class="buttons">
      <button type="button" class="save">Save place</button>
      <button type="button" class="resume">Resume</button>
      <button type="button" class="clear">Clear</button>
    </div>
    <small class="status" aria-live="polite"></small>
    `;

document.body.append(widget);

const percent = 
widget.querySelector(".percent");
const progress = 
widget.querySelector("progress");
const status = widget.querySelector(".status");
const resume = widget.querySelector(".resume");
const clear = widget.querySelector(".clear");

function updateButtons(){
    const hasSavedPlace = 
    localStorage.getItem(key) !== null;
    resume.disabled = !hasSavedPlace;
    clear.disabled = !hasSavedPlace;
}

function updateProgress () {
    const scrollable = 
    document.documentElement.scrollHeight - 
    innerHeight;
    const value = scrollable > 0 ?
    Math.round((scrollY / scrollable)* 100): 100;
    const safeValue = Math.max(0, Math.min(100, value));
    percent.textContent=`${safeValue}% read`;
    progress.value = safeValue;
}
widget.querySelector(".save").addEventListener("click", () => {
  localStorage.setItem(key, String(Math.round(scrollY)));
  status.textContent = "Place saved on this article.";
  updateButtons();
});
 resume.addEventListener("click", () => {
    const savedPlace = localStorage.getItem(key);
    if (savedPlace !== null) {
      scrollTo({ top: Number(savedPlace), behavior: "smooth" });
      status.textContent = "Returning to your saved place.";
    }
  });

  clear.addEventListener("click", () => {
    localStorage.removeItem(key);
    status.textContent = "Saved place cleared.";
    updateButtons();
  });

  addEventListener("scroll", updateProgress, { passive: true });
  addEventListener("resize", updateProgress);
  updateButtons();
  updateProgress();
})();
