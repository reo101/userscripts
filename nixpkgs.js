// ==UserScript==
// @name        nixpk.gs integration in Github
// @description Create a button to directly open a NixOS/nixpkgs PR in nixpk.gs
//
// @version     0.0.1
// @license     MIT
// @author      reo101
//
// @source      https://github.com/reo101/userscripts/blob/master/nixpkgs.js
// @supportURL  https://github.com/reo101/userscripts/issues
// @homepage    https://github.com/reo101/userscripts/
// @icon        https://raw.githubusercontent.com/NixOS/nixos-artwork/refs/heads/master/logo/nix-snowflake-colours.svg
//
// @namespace   reo101
// @match       *://*.github.com/NixOS/nixpkgs/pull/*
// @run-at      document-start
// ==/UserScript==

(function() {
    "use strict";

    // Function to extract PR ID from the URL
    function getPRID() {
        const pathArray = window.location.pathname.split("/");
        const prIndex = pathArray.findIndex(segment => segment === "pull");
        return prIndex !== -1 && pathArray[prIndex + 1];
    }

    // Function to redirect to the PR tracker page
    function redirectToTracker(prID) {
        const trackerURL = `https://nixpk.gs/pr-tracker.html?pr=${prID}`;
        window.location.href = trackerURL;
    }

    // Create the button
    function createButton() {
        const prID = getPRID();
        if (!prID) return;

        const buttonContainer = document.querySelector(".gh-header-actions");
        if (!buttonContainer) return;

        const button = document.createElement("a");
        button.className = "btn btn-sm";
        button.textContent = "Track PR";
        button.style.marginRight = "10px";
        button.href = "#";
        button.onclick = function(event) {
            event.preventDefault();
            redirectToTracker(prID);
        };
        buttonContainer.appendChild(button);
    }

    // Execute the script
    createButton();
})();
