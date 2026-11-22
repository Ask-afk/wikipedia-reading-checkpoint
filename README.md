Wikipedia Reading Checkpoint

This userscript adds a reading progress meter and a checkpoint to English Wikipedia articles. It is for anyone who reads a long article and wants to come back to the same place later. **Save place** remembers your position, **Resume** takes you back to it, and **Clear** removes it.

The saved position stays in your browser's local storage. The script does not send it anywhere.

## Install

1. Install [Violentmonkey](https://violentmonkey.github.io/) or [Tampermonkey](https://www.tampermonkey.net/) in your browser.
2. In Chrome or Edge, right-click the userscript manager's icon, choose **Manage extension**, and turn on **Allow user scripts**. On older versions, turn on **Developer mode** at `chrome://extensions` instead. Firefox does not need this step.
3. In this repository, open `wikipedia-reading-checkpoint.user.js` and click **Raw**. Your userscript manager should offer to install it. Accept the prompt.
4. Open or refresh [Wikipedia's JavaScript article](https://en.wikipedia.org/wiki/JavaScript). Look for **Reading checkpoint** in the bottom-right corner.

## Try it

Scroll partway down the article and click **Save place**. Scroll back to the top and click **Resume**; the page should move to your saved position. You can also reload first, scroll to the top, and click **Resume**. Click **Clear** to delete the saved position. Each article has its own saved position.

## How it works

The script runs on `https://en.wikipedia.org/wiki/*`. It adds a small widget to pages with article content, measures reading progress from the page's scroll position, and stores a position under that article's path with `localStorage`. It does not run on other language versions of Wikipedia.

## Rebuild

There is no build step. The complete readable source is `wikipedia-reading-checkpoint.user.js`; install it directly in a userscript manager.
