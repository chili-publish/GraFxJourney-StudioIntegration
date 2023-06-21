import StudioSDK from "@chili-publish/studio-sdk";
import { defaultJSON } from "./default-doc.js"
import { createEnvironmentBaseURL } from "./utils.js";

async function initEditor(authToken) {
  const SDK = new StudioSDK({
    editorId: "studio-editor"
  });

  SDK.loadEditor();
  window.SDK = SDK;

  await loadDocument(defaultJSON, authToken);
}

async function loadDocument(docJSON, authToken) {

  const environmentAPI = createEnvironmentBaseURL({type: "production", environment: "ft-nostress"})
  window.SDK.configuration.setValue("ENVIRONMENT_API", environmentAPI);

  if (docJSON) {
    await window.SDK.document.loadDocument(docJSON);
  } else {
    await window.SDK.document.loadDocument("{}");
  }

  if (authToken) {
    await window.SDK.connector.configure('grafx-media', async (configurator) => {
      await configurator.setChiliToken(authToken);
    });
    await window.SDK.connector.configure('grafx-font', async (configurator) => {
      await configurator.setChiliToken(authToken);
    });
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

const authToken = "<INSERT TOKEN HERE>"
initEditor(authToken);
