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

async function startIntegration() {
  const response = await fetch("https://m2mlogin.chiligrafx-dev.com/oauth/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "no-cors",
    body: JSON.stringify({
      "grant_type": "client_credentials",
      "audience": "https://chiligrafx.com",
      "client_id": "NHaayW6Pu6BSZAAPNSO104MfufwlV7Z4",
      "client_secret": "v3gW1YsrKzvlU-LSNMCcr8aP5kXVvEn0NydGvYhp9nB8fhnX6qh2DxEFfIwySm4c"
    })
  })
  console.log(await response.json())
  initEditor();
}

startIntegration();
