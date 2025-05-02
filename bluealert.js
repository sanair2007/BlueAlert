// ==UserScript==
// @name         BlueAlert for X.com
// @namespace    https://github.com/sanair2007/BlueAlert/
// @version      1.6
// @description  Script to mark verified X.com users (blue ticks) and to blur their posts to save your sanity. 
// @author       sanair2007
// @match        https://x.com/*
// @match        https://mobile.x.com/*
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// @license      GPL-3.0-only
// @downloadURL https://update.greasyfork.org/scripts/534596/BlueAlert%20for%20Xcom.user.js
// @updateURL https://update.greasyfork.org/scripts/534596/BlueAlert%20for%20Xcom.meta.js
// ==/UserScript==

function markVerifiedContainers() {
    const verifiedIcons = document.querySelectorAll('svg[data-testid="icon-verified"]:not([data-processed="true"])');

    verifiedIcons.forEach((icon) => {
        let container = icon;

        // Traverse up until we find a tweet/user cell/suggestion level block
        while (container && container !== document.body) {
            const isTargetContainer =
                container.getAttribute('data-testid')?.match(/^(tweet|cellInnerDiv|UserCell|UserAvatar|TypeaheadUser|UserProfileHeader_Items|reply|QuoteTweet)$/i);

            if (isTargetContainer) {
                container.style.backgroundColor = 'rgba(29, 155, 240, 0.4)';
                container.style.filter = 'blur(1px)';
                container.style.transition = 'background-color 0.2s ease, filter 0.2s ease';
                break;
            }

            container = container.parentElement;
        }

        icon.setAttribute('data-processed', 'true');
    });
}

(function () {
    'use strict';
    setInterval(markVerifiedContainers, 500);
})();
