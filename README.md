# GraFx Studio Integration Training

Welcome to the introductory course of GraFx Studio integration training. The goal of this course is to provide all the information needed to get a custom integration of GraFx studio up and running. This course will provide both code samples you can reference for every step of the process as well as discussion in each section to provide insight on how we will build each part of our integration.

Please feel free to skip ahead to any section of this course if you are looking to reference a specific item.


### The Course
This course is broken up in to sections. In each section we will add some additional functionality to our integration until we reach the [end result](#the-end-result). Each section is represented in this repository as a folder. You can also use the table of contents below to navigate to the various sections.

1. [Setting up the project](./1-Setting-Up-Project/README.md)
1. [Loading the Editor](./2-Loading-The-Editor/README.md)
	- Installing the Studio-SDK
	- Configure the SDK (initialize media/font connector)
	- Load the GraFx Studio editor
1. [Async/await with JavaScript](./3-Async-Javascript/README.md)
	- Why we use async
1. [Working with Controllers](./4-Working-with-Controllers/README.md)
	- Overview
	- DocumentController
	- VariableController
	- FrameController
1. [Working with Connectors](./5-Working-with-Connectors/README.md)
	- The GraFx Media connector
1. [Working with Events](./6-Working-with-Events/README.md)
	- OnDocumentLoad
	- OnSelectedFrameContentChanged
		- Detecting if the selected frame is an image

### The end result
![A picture of the final integration](./assets/final-integration.png)
The final integration of this course will have the following features