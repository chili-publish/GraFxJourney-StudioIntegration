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
    await window.SDK.connector.configure('grafx-media', async function(configurator) {
      await configurator.setChiliToken(authToken);
    });
    await window.SDK.connector.configure('grafx-font', async function(configurator) {
      await configurator.setChiliToken(authToken);
    });
  }
}
```

We are now optionally adding an `authToken` parameter to our `loadDocument` function, if we pass the function a token it will register the `grafx-media` connector and then `grafx-font` connector. The way you initialize a connector within the StudioSDK is with the ConnectorController `configure` method. You can find the SDK documentation for this method [here] (https://chili-publish.github.io/studio-sdk/classes/controllers_ConnectorController.ConnectorController.html#configure)

Essentially, we are calling the `configure` method and the first argument is what connector we want to configure. For example to use the `GraFx Media` connector we specify `grafx-media` as the first argument. The second argument is a little more tricky, because we don't actually configure the GraFx Media connector right away, we install need to tell it "how to configure itself" when it is ready. To do this we provide something called a "callback function" which is a function that the GraFx Media connector will use to configure itself when it is ready. So we provide a function as the second parameter that attaches the `authToken` to the connector when it is ready.

We then proceed with the same steps for the GraFx Fonts connector, except that connector is called `grafx-fonts`.

There is one last step we need to setup before our connectors work, we need to tell the editor where our GraFx Environment API is located. We do this using the ConfigurationController. This controller allows you to store metadata on the editor session at runtime. This metadata is intended to be accessed from Studio Actions and Studio Connectors. So we will tell the editor where the GraFx Environment API is located, and the editor will store that information, then anytime the GraFx Media connector or GraFx Font connector needs to know where the the Environment API is located it can simply just ask the ConfigurationController.

We will add this line at the top of our `loadDocument` function.
```javascript
  const environmentAPI = createEnvironmentBaseURL({type: "production", environment: "ft-nostress"})
  window.SDK.configuration.setValue("ENVIRONMENT_API", environmentAPI);
```

Before we can set the GraFx Environment API Base URL that our connectors will use to talk to the environment. We thankfully have a helper function called "createEnvironmentBaseURL" that can generate this base API url for us. We will call this function with our environment type, `sandbox` or `production` and then the environment name. (ex: cp-gjd-940).

Then we can set the `"ENVIRONMENT_API"` value in our configuration store to be that GraFx Environment Base URL, now our connectors know how to talk to your GraFx Environment.

### Actually loading an image frame

Now, for this course we are going to simply find an asset on our environment and load it in to an image frame. So first we will need to find an image on our environment that we can use. Navigate to your environment at [https://chiligrafx.com/](https://chiligrafx.com/)

Click on the GraFx Media icon on the left hand panel to load up the available assets on your environment. If your environment has assets, you should see some folders you can browse through to find assets.

![grafx media browser webpage](../assets/5-Working-with-Connectors/grafx-media.png)

Once you have found an asset you want to display in an image frame, you can click the `...` button to bring up the option to view asset details.

![grafx media asset icon](../assets/5-Working-with-Connectors/grafx-asset.png)

In the asset details panel, you will see the ID for the asset. Copy this ID, we will use it to tell our GraFx Media connector which asset we want to use for our image frame.
![grafx asset info panel](../assets/5-Working-with-Connectors/media-info.png)
