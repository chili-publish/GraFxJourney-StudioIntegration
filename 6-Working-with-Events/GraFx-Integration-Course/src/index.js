import StudioSDK from "@chili-publish/studio-sdk";
import { defaultJSON } from "./default-doc.js"

async function initEditor(authToken) {
  const SDK = new StudioSDK({
    editorId: "studio-editor",
    onDocumentLoaded: function() {
      console.log("DocumentLoaded event called this function");
    },
    onSelectedToolChanged: function(tool) {
      const buttonElements = [
        document.getElementById("selectButton"),
        document.getElementById("handButton"),
        document.getElementById("textFrameButton"),
      ]

      for (const element of buttonElements) {
        console.log(element);
        if (element.id.includes(tool)) {
          element.disabled = true;
        }
        else {
          element.disabled = false;
        }
      }
    }
  });

  SDK.loadEditor();
  window.SDK = SDK;

  await loadDocument(defaultJSON, authToken);
}

async function loadDocument(docJSON, authToken) {

  const environmentAPI = window.SDK.utils.createEnvironmentBaseURL({type: "production", environment: "training-create-us23"})
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

window.addTextFrame = async function() {
  await window.SDK.frame.create("text", 10, 10, 100, 100);
}

window.setTool = async function(tool) {
  await window.SDK.tool.setTool(tool);
}

window.updateImage = async function(frameName, assetID) {
  const frameID = (await window.SDK.frame.getByName(frameName)).parsedData.id
  await window.SDK.frame.setImageFromConnector(frameID, 'grafx-media', assetID);
}

const authToken = "<INSERT TOKEN HERE>"
initEditor(authToken);
