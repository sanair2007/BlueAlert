// ==UserScript==
// @name         BlueAlert for X.com
// @namespace    none
// @version      1.2
// @description  Clearly highlight any content from verified (blue tick) accounts on Twitter/X — tweets, replies, QRTs, suggestions, etc. — with a solid red background on their outer container only.
// @author       You
// @match        https://x.com/*
// @match        https://mobile.x.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// @license      MIT
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
                container.style.backgroundColor = 'rgba(255, 0, 0, 0.6)';
                container.style.transition = 'background-color 0.2s ease';
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
