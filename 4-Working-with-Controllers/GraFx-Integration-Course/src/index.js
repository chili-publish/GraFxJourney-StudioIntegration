import StudioSDK from "@chili-publish/studio-sdk";
import { docJSON } from "./default-doc.js"

function initEditor() {
  const SDK = new StudioSDK({
    editorId: "studio-editor"
  });

  SDK.loadEditor();
  window.SDK = SDK;
}

async function loadDocument() {
  await window.SDK.document.loadDocument(docJSON);
}

async function startIntegration() {
  initEditor();
  await loadDocument();
}

startIntegration();