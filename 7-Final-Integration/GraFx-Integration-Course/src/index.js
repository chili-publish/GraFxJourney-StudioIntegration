import { doc } from "./document.json.js"
import { SDK } from "@chili-publish/studio-sdk"
import { createEnvironmentBaseURL } from "../../../2-Loading-the-Editor/GraFx-Integration-Course/src/utils.js";

/* filthy globals */
const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InIzTzViUFFqV2pBWjNsd1pLd1FSaSJ9.eyJodHRwczovL2NoaWxpLXB1Ymxpc2guY29tL3JvbGVzIjpbIkZBIl0sImlzcyI6Imh0dHBzOi8vbG9naW4uY2hpbGlncmFmeC5jb20vIiwic3ViIjoiYXV0aDB8NjM2YTM0MGZhZTY5ZmM2ZjgwYzIzZTUwIiwiYXVkIjpbImh0dHBzOi8vY2hpbGlncmFmeC5jb20iLCJodHRwczovL2dyYWZ4LXByby5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjg2MTUzNDA2LCJleHAiOjE2ODYyMzk4MDYsImF6cCI6IjVWNlg2anp0VkdZcjJKc3pQNnp1M3cwMkpMcVhGdUJ1Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSJ9.g5nK3wtrAjNnt3w9JCg-Kpo25OqYClwLfBLtu7l4n2LRCjsy-kt8L-kfbMtaOTHC83mMCpQ2-zHZ6X_aHngn6dJfcJ-TvmWTjzwmWrufwNhAPvP69M3VHOqrdwYvsdNFgOMw9ExvnJyNsJ63iMAj6nymu-phsFTQ_1On_9JYJqyl9NTJ-3x0oTQwFVq_nbbRqZiiWcX5HONQXcWltdYqrGkSh3mkq2oYoTQaqbIRXM6-7_KqKiqei_AgUIZMTHMwkm68lmFYR548hNUjgLqS0mdzbi0s_X7n9ajgKpDoekEGHHVqUCdLYE2Ow2Mq0aTUP2aJjzrutqAJjZdCgj72Lg`;
const baseURL = createEnvironmentBaseURL({})

const init = () => {
  const sdk = new SDK({
    editorId: "editor",
    onStateChanged: function (state) {
      console.log("hi")
      return;
    },
    onSelectedFrameContentChanged: function (frame) {
      if (!frame) {
        document.querySelector(".cat-button").style.display = "none";
        document.querySelector("#frame-id").textContent = "";
        document.querySelector("#frame-name").textContent = "";
        document.querySelector("#frame-type").textContent = "";

      }

      document.querySelector("#frame-id").textContent = frame.frameId;
      document.querySelector("#frame-name").textContent = frame.frameName;
      document.querySelector("#frame-type").textContent = frame.frameType;

      /* Check if the frame is an image */
      if (frame.frameType == "image") {
        document.querySelector(".cat-button").style.display = "block";
      } else {
        document.querySelector(".cat-button").style.display = "none";
      }

      return;
    },
    onDocumentLoaded: function () {
      console.log("The document has loaded");
      return;
    },
  });

  sdk.loadEditor()
  window.SDK = sdk;
}

const loadDocument = async (doc, authToken, baseURL) => {
  if (doc) {
    await window.SDK.document.load(doc);

    window.SDK.configuration.setValue(
      "ENVIRONMENT_API",
      baseURL ?? '',
  );

    if (authToken) {
      await window.SDK.connector.configure('grafx-media', async (configurator) => {
        await configurator.setChiliToken(authToken);
      });
      await window.SDK.connector.configure('grafx-font', async (configurator) => {
          await configurator.setChiliToken(authToken);
      });
    }
  }
};

window.downloadDocument = async () => {
  const documentJSON = (await SDK.document.getCurrentState()).data
  const documentData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(documentJSON));
  const downloadAnchor = document.getElementById('downloadAnchor');
  downloadAnchor.setAttribute("href", documentData);
  downloadAnchor.setAttribute("download", "document.json");
  downloadAnchor.click();
}

window.selectDocument = async () => {
  const input = document.createElement('input');
  input.type = 'file';

  input.onchange = (event) => {
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (readerEvent) => {
        const content = JSON.parse(readerEvent.target.result);
        load(content, token, baseURL);
    }
  }

  input.click();
}

window.randomCat = async () => {
  /* Check if there is a selected image frame */
  const selectedFrame = (await window.SDK.frame.getSelectedFrames()).parsedData[0];
  if (!selectedFrame) return;

  if (selectedFrame.frameType == "image") {
    /* Get frame dimensions */
    const index = Number(selectedFrame.frameId) - 1;
    const dimensions = (await window.SDK.document.getCurrentState()).parsedData.layouts[0].frameProperties[index];
    console.log(dimensions);

    window.SDK.frame.setImageFromUrl(selectedFrame.frameId, `https://placekitten.com/${dimensions.width}/${dimensions.height}`);
  }
}

const createImageURL = async (mediaID, mimeType = 'image/png') => {
  const imgData = await window.SDK.mediaConnector.download('grafx-media', mediaID, 'lowresWeb', {});
  const imgBlob = new Blob([imgData], {type: mimeType});
  return URL.createObjectURL(imgBlob);
}

async function run() {
  init();
  await load(doc, token, baseURL);
}

run();
