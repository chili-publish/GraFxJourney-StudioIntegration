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

window.setTool = async function(tool) {
  await window.SDK.tool.setTool(tool);
}

const authToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIzTzViUFFqV2pBWjNsd1pLd1FSaSJ9.eyJodHRwczovL2NoaWxpLXB1Ymxpc2guY29tL3JvbGVzIjpbIkZBIl0sImlzcyI6Imh0dHBzOi8vbG9naW4uY2hpbGlncmFmeC5jb20vIiwic3ViIjoiYXV0aDB8NjM2YTM0MGZhZTY5ZmM2ZjgwYzIzZTUwIiwiYXVkIjoiaHR0cHM6Ly9jaGlsaWdyYWZ4LmNvbSIsImlhdCI6MTY4Nzc4NjExMiwiZXhwIjoxNjg3ODcyNTEyLCJhenAiOiJIU1JWMGg4SUlwMTN0QzBvM0lmOEpQVGFQT2F3RUdVWiIsInNjb3BlIjoiZm9udDpsaXN0IG1lZGlhOmxpc3QgbXlwcm9qZWN0Omxpc3QgdGVtcGxhdGVfY29sbGVjdGlvbjpsaXN0IHRlbXBsYXRlOmxpc3Qgb3V0cHV0OnN0YXRpYyBvdXRwdXQ6YW5pbWF0ZWQgZm9udDpyZWFkIG1lZGlhOnJlYWQgbXlwcm9qZWN0OnJlYWQgdGVtcGxhdGVfY29sbGVjdGlvbjpyZWFkIHRlbXBsYXRlOnJlYWQgZm9udDp3cml0ZSBtZWRpYTp3cml0ZSBteXByb2plY3Q6d3JpdGUgdGVtcGxhdGVfY29sbGVjdGlvbjp3cml0ZSB0ZW1wbGF0ZTp3cml0ZSIsImd0eSI6InBhc3N3b3JkIn0.SXXGfOkL_OuyFgcb0kMdtaZp84eirGM_z_CLhvhYENHUnn7awigsABo1N2j-CeCPRBh5e5QErSANPEaCr6g-MGwygLsLLsrBENaM5r7zLGVODgTA7iCsKbIhI-C6rOkM7z7otyGPu2Nuz4fL3hZMZJtP8TIPbKizXeG84hLPOHlh0dGvY0RGu2SwhkoSzV49Cfb7N5Px7A2nH0WWgmS8UW6pjTdlOVy6Tj8At1PZzkbjrC5EXEkQ3Ff6Czkqnc1X54fYyfd7HgAib67IOHu7PAWAD2F04lEiZgoXB7ueN9kctt-yFrg4vSNLNRpdxmYPjuPFZaYO2hmq8iavJsLnWw"
initEditor(authToken);
