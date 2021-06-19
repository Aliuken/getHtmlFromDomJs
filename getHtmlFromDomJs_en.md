#Get the HTML code of a web page from the DOM

##Problem
If we want to see the HTML code of a web page we can do it through the web browser, however the code shown is the one of the web page as it was written. That is to say:
- frames that contain other pages are not traversed
- the code is not formatted so that it is well tabulated
- the current changes on the web page after user interaction are not displayed

All this can be seen, however, with the code inspection tools offered by web browsers or through third-party extensions for browsers. These tools show the DOM of the web page traversing the frames it contains.

However, with these tools, you have to click on each node to see their child nodes. Therefore if you want to see the full code of a loaded web page with all its frames you have to waste a lot of time expanding each of the nodes.

##Solution
To solve this, I have created a javascript code that can be executed from the javascript console included in the code inspection tools of the browsers.

The function that acts as the interface with the user is **getHTMLFromDOM(depth, tabString)**, which does the following:
- receives as input the depth (to which you want to traverse nodes in the DOM) and a string that will be used to tabulate (for example, `‘  ’` for two spaces).
- traverses the DOM starting from the node corresponding to the html tag of the initial web page.
- if a node is of type element, its tag with its attributes and values will be shown and its child nodes will be traversed. If this element is a frame or iframe, instead of traversing its child nodes, the node of the html tag of the page it points to will be traversed.
- if a node is not of type element, its value will simply be displayed and its child nodes will be traversed.
- the result of all this is shown in a textarea on a new popup web page that opens, so that it can be copied to a text file (you must allow the popup tab to be opened to view it).

##Example of use
Follow these steps:
- Open a web page in a browser (for example, open facebook web page with Firefox)
- Go to the javascript console in the developer tools of the web browser
- Paste all the javascript code in the file getHtmlFromDomJs.js in the javascript console
- Press Intro key

A new popup tab will be opened. The new tab will contain the source code of the loaded web page traversing its nodes up to the indicated depth (50 by default), entering in its frames and tabulating it in the indicated way (with two spaces by default).
