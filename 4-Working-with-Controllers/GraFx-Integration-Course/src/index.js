import StudioSDK from "@chili-publish/studio-sdk";
import { defaultJSON } from "./default-doc.js"

async function initEditor() {
  const SDK = new StudioSDK({
    editorId: "studio-editor"
  });

  SDK.loadEditor();
  window.SDK = SDK;

  await loadDocument(defaultJSON);
}

async function loadDocument(docJSON) {
  if (docJSON) {
    await window.SDK.document.loadDocument(docJSON);
  } else {
    await window.SDK.document.loadDocument("{}");
  }
}

async function getDocumentJSON() {
  const documentJSON = (await SDK.document.getCurrentDocumentState()).data
  return JSON.stringify(documentJSON)
}

window.downloadDocument = async function() {
  const documentJSON = await getDocumentJSON();
  const documentData = "data:text/json;charset=utf-8," + encodeURIComponent(documentJSON);
  const downloadAnchor = document.getElementById('downloadAnchor');
  downloadAnchor.setAttribute("href", documentData);
  downloadAnchor.setAttribute("download", "document.json");
  downloadAnchor.click();
}


window.selectTool = async function() {
  await window.SDK.tool.setSelectTool();
}

window.textTool = async function() {
  await window.SDK.tool.setTextFrameTool();
}

window.handTool = async function() {
  await window.SDK.tool.setHandTool();
}

initEditor();