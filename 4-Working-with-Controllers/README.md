# Working with Controllers
_Note: We will be started off in this section with what we created in the previous section [Setting Up the Project](../1-Setting-up-Project/). If you are starting at this section you can get the project (so far) from the previous section by downloading and navigating to the "GraFx Integration Course" folder in that section._

_Please refer to the [Getting up and running](../README.md#getting-up-and-running) section to get the integration webserver up and running._

---

### What is a Controller?
Controllers are the primary method of interfacing with GraFx Studio, the Studio SDK exposes multiple different controllers for you to utilize in your integration. These controllers expose certain behaviors of GraFx Studio and provide you with an easy to use interface to control these behaviors.

![image of studio SDK controllers](../assets/4-Working-with-Controllers/controllers.png)

Currently there are 19 controllers in the SDK, but you see the list of them on the Studio SDK documentation [here](https://chili-publish.github.io/studio-sdk/#controllers)

Controllers follow a simple naming convention so normally you can determine where the functions to do something might be. This is incredibly helpful when exploring the SDK in our browsers ["Developer Console"](https://balsamiq.com/support/faqs/browserconsole/) when we are on our integrations page http://localhost:1234

![exploring the autocomplete of controllers](../assets/4-Working-with-Controllers/controllers-console.png)

As you can see there are many options there, and normally you can assume what they might be related to. For example, if we wanted to manipulate a frame on page, chances are we could find functions for that in the FrameController which we can access by typing `window.SDK.frame.` and then we can see what functions are available.

![exploring the autocomplete of the frame controller](../assets/4-Working-with-Controllers/frame-controller.png)

This method of exploring makes it really easy to try controllers and their functions out live in our integration and test them out. You can also read about the functions of the FrameController on the [github documentation](https://chili-publish.github.io/studio-sdk/classes/controllers_FrameController.FrameController.html) for the Studio SDK. You can find the expected parameters for each function and what the function does on our source documentation.
![frame controller method documentation website](../assets/4-Working-with-Controllers/method-documentation.png)

Now that we touched on what the Studio SDK controllers can do for you, lets start using them in our integration :D

### Loading a document in to the editor
Our first controller will be the DocumentController. This is for, you guessed it, controlling the document loaded in to our Studio editor.

