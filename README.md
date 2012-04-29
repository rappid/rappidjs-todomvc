# Simple Todo App build with rAppid.js

This example app demonstrates the features and abilities of rAppid.js

## Documentation

rAppid.js is a RIA javascript framework, where the whole view is rendered by javascript.

### The index.html

In the index.html the application is bootStrapped by defining our main application file 
(in this case Todo.xml). Because rAppid.js is a RIA framework, the whole rendering is done by javascript.

If you are now thinking 'yeah fine, but what about SEO ', don't worry, rAppid.js also support Node-Rendering, which can be used for things like SEO.

### The application file Todo.xml

The main view of the application is declarated in Todo.xml. The first tag of the Todo.xml defines the super class of our application and the namespaces used inside the view description. 

```xml
<?xml version="1.0"?>
<app:TodoClass xmlns="http://www.w3.org/1999/xhtml"
               xmlns:js="js.core" xmlns:ui="js.ui" xmlns:app="app" xmlns:view="app.view" xmlns:conf="js.conf">
                 ...
               </app:TodoClass>
              ```
As you can see, the default namespace is `"http://www.w3.org/1999/xhtml"` which allows you to use plain HTML elements to describe your view.
The other namespaces are used for custom components as I will describe later.

### The code behind file TodoClass.js
The code for the main view is defined in TodoClass.js.



### The Todo Model


### The Todo View

