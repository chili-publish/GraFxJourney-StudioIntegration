# Working with Events
_Note: We will be started off in this section with what we created in the previous section [Setting Up the Project](../1-Setting-up-Project/). If you are starting at this section you can get the project (so far) from the previous section by downloading and navigating to the "GraFx Integration Course" folder in that section._

_Please refer to the [Getting up and running](../README.md#getting-up-and-running) section to get the integration webserver up and running._

---

## ???
Everything we have done up to this point has been imperative where we tell Studio to do something via the SDK and it does what we tell it. With events, we will turn this process around and instead ask Studio to to tell us when it does something so we can react.

This is how this section will differ from pervious sections:

| Previously | Working With Events|
|----------|----------|
|   You tell Studio what to do via SDK executes instructions.  |   Studio informs you about its actions via event callbacks, and we react to those events.   |

Why would you want to work this way?

Well sometimes you want to know when something happens so your application can react. A good example is if someone selects a frame. When that happens, your customer user interface may want to show or hide specific options if the frame is an image frame or the frame is a text frame.

Let us learn how to react to events.

## Reacting to Events
All events that are fired off in Studio can be listen to via the creation of the `StudioSDK` class.

In our `index.js` file we create the class via the function `initEditor()`.

The function reads:
```js
async function initEditor() {
  const SDK = new StudioSDK({
    editorId: "studio-editor"
  });

  SDK.loadEditor();
  window.SDK = SDK;

  await loadDocument(defaultJSON);
}
```

When we create the `StudioSDK` we pass in a [ConfigType](https://chili-publish.github.io/studio-sdk/types/index.ConfigType.html) object. In our original implementation of the function we are only setting the `editorId` property which is the ID of an element where the Studio editor will appended to in the live site.

If you go an look at the documentation of [ConfigType](https://chili-publish.github.io/studio-sdk/types/index.ConfigType.html), you will find that the [ConfigType](https://chili-publish.github.io/studio-sdk/types/index.ConfigType.html) object allows a number of optional properties.

All the properties that start with "on" are properties that expect a function to be set, which the SDK will call when a specific event is fired.

For example, on the [ConfigType](https://chili-publish.github.io/studio-sdk/types/index.ConfigType.html) object there is a property called `onDocumentLoaded`.

The "on" lets us know this is a callback for an event. The "DocumentLoaded" is the event.

Unfortunately at this moment there is not a comprehensive list of when each event is fired. However, the naming of the event should give you a good hint of when the even event is fired.

Once we know the event property on the [ConfigType](https://chili-publish.github.io/studio-sdk/types/index.ConfigType.html) that we want to react to, we can assign and callback function.

For example, if we want to have a callback function fired when the document is loaded we can add a function to the `onDocumentLoaded` property.

We create a new function called `documentLoaded` and add that function on the `onDocumentLoaded` property.
```js
async function initEditor() {
  const SDK = new StudioSDK({
    editorId: "studio-editor",
    onDocumentLoaded: documentLoaded
  });

  SDK.loadEditor();
  window.SDK = SDK;

  await loadDocument(defaultJSON);
}

function documentLoaded() {
  console.log("Document Loaded)
}
```

If you now test your integration, you will find the console in the browser
