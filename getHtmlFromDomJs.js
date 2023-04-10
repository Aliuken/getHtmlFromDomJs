function trim(str) {
  return str.replace(/^\s+|\s+$/g,"");
}

function replaceAll(string, find, replace) {
  return string.replace(new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), replace);
}

function getHTMLFromDOMNodeList(nodelist, depth, tabString, tabNumber) {
  let output = "";
  let tab = '';
  for (let i = 0; i < tabNumber; i++) {
    tab += tabString;
  }
  let newlineTab = "\r\n" + tab;

  for (let i = 0; i < nodelist.length; i++) {
    let childsString = "";
    let nodeName = nodelist[i].nodeName.toLowerCase();
    if(depth > 0 && (nodeName === 'frame' || nodeName === 'iframe' || nodelist[i].hasChildNodes())) {
      let childs;
      if(nodeName === 'frame' || nodeName === 'iframe') {
        try {
          let frameDocument = (nodelist[i].contentDocument || nodelist[i].contentWindow.document);
          childs = [ frameDocument.documentElement ];
        } catch(err) {
          childsString = newlineTab + tabString + err;
        }
      } else {
        childs = nodelist[i].childNodes;
      }
      if(childsString === "") {
        childsString = getHTMLFromDOMNodeList(childs, depth - 1, tabString, tabNumber + 1);
      }
    };
    if(nodelist[i].nodeType === 1) {
      output += newlineTab + "<" + nodeName;
      let attrs = nodelist[i].attributes;
      if(attrs != null) {
        for (let j = 0; j < attrs.length; j++) {
          output += " " + attrs[j].name + "=\"" + attrs[j].value + "\"";
        }
      }
      output += ">";
      output += ((childsString.length >= 2 && childsString.substring(0,2) === '\r\n') ? (childsString + newlineTab) : childsString);
      output += "</" + nodeName + ">";
    } else {
      if(nodelist[i].nodeValue === null) {
        output += newlineTab + nodelist[i].nodeValue;
      } else {
        let nodeValue = trim(nodelist[i].nodeValue);
        if(nodeValue !== "") {
          let auxNodeValue = replaceAll(nodeValue, '\n','\n' + tab);
          output += (nodelist[i].nodeType === 8 ? (newlineTab + "<!-- " + auxNodeValue + " -->") : (auxNodeValue));	
        }
      }
      output += childsString;
    }
  } 
  return output;
}

function getHTMLFromDOM(depth, tabString) {
  return '<!DOCTYPE html><html><body><textarea rows="40" cols="150">' + replaceAll(getHTMLFromDOMNodeList([document.documentElement], depth, tabString, 0), "</textarea>", "&lt;/textarea>") + '</textarea></body></html>';
}

var htmlFromDOM = getHTMLFromDOM(50, "  ");
window.open("javascript:opener.htmlFromDOM");
