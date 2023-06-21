# Working with Connectors
_Note: We will be started off in this section with what we created in the previous section [Setting Up the Project](../1-Setting-up-Project/). If you are starting at this section you can get the project (so far) from the previous section by downloading and navigating to the "GraFx Integration Course" folder in that section._

_Please refer to the [Getting up and running](../README.md#getting-up-and-running) section to get the integration webserver up and running._

---

### What is a Connector?
GraFx Studio has the ability to pull in data from various sources. Most commonly you will pull in data from you GraFx environment but our studio actually provides you with an easy framework to pull in data from your sources. This framework is known as the GraFx Connector framework.

A connector in the literal sense is an implementation of a set of capabilities and methods needed by GraFx Studio to interact with an external resource management system. If you define how your system can provide those capabilities in the connector, then GraFx Studio can talk to your system to get resources as well. For now, we are going to configure out integration to talk to the GraFx Environment API using the built-in `Grafx-Media` connector to load images from our GraFx environment and the `GraFx-Fonts` connector to load fonts from our GraFx environment.

### Authentication
The first thing we need to do is actually generate an authentication token. We need to do this because the GraFx Environment API that actually has the fonts and assets requires requests to be authenticated and authorized via a token. Therefore, we need to provide our GraFx-Media and GraFx-Fonts connector with our token so they can pull the required fonts and assets.

First, we will need to generate a machine on our GraFx environment. You can do that following [this guide](#good-luck). Please note the `client id` and `client secret` you are provided when doing this, we will use them to generate our token.

We are going to be generating the token on the front-end of our integration, please note that this is not how you should handle this for a production application. You do not want to expose the `client secret` in the JavaScript of your website, if you are going to maintain a secure integration, you should have your front-end integration reach out to a back-end for the token we will generate, or pre-process the page to provide the token. Nonetheless, for educational purposes we will be generating our token via a [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) request when our page loads to use for our GraFx Connectors.

### Connecting the Connectors
Now that we have our token, we can actually initialize our media and font connector when we load a document. To do this we will need to add some more logic to our `loadDocument()` function.

```javascript
async function loadDocument(docJSON, authToken) {
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
```

We are now optionally adding an `authToken` parameter to our `loadDocument` function, if we pass the function a token it will register the `grafx-media` connector and then `grafx-font` connector.

