import StudioSDK from "@chili-publish/studio-sdk";

function initEditor() {
  const SDK = new StudioSDK({
    editorId: "studio-editor"
  });

  SDK.loadEditor();
  window.SDK = SDK;
}

initEditor();

const baseURL = createEnvironmentBaseURL({
  type: "sandbox",
  environment: "ft-nostress"
})

import { createEnvironmentBaseURL } from "./utils.js";




