import StudioSDK from "@chili-publish/studio-sdk";
import { defaultJSON } from "./default-doc.js"

async function initEditor(authToken) {
  const SDK = new StudioSDK({
    editorId: "studio-editor"
  });

  SDK.loadEditor();
  window.SDK = SDK;

  await loadDocument(defaultJSON, authToken);
}

async function loadDocument(docJSON, authToken) {

  const environmentAPI = window.SDK.utils.createEnvironmentBaseURL({type: "production", environment: "ft-nostress"})
  window.SDK.configuration.setValue("ENVIRONMENT_API", environmentAPI);

  if (docJSON) {
    await window.SDK.document.load(docJSON);
  } else {
    await window.SDK.document.load("{}");
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
  const documentJSON = (await SDK.document.getCurrentState()).data
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

window.setTool = async function(tool) {
  await window.SDK.tool.setTool(tool);
}

const authToken = "<INSERT TOKEN HERE>"
initEditor(authToken);
