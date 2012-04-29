# Simple Todo App build with rAppid.js

This example app demonstrates the features and abilities of rAppid.js

## Documentation


### The index.html

In the index.html the application is bootStrapped by defining our main application file 
(in this case Todo.xml). Because rAppid.js is a RIA framework, the whole rendering is done by javascript.

If you are now thinking 'yeah fine, but what about SEO ', don't worry, rAppid.js also support Node-Rendering, which can be used for things like SEO.

### The application file Todo.xml

The main view of the application is declarated in Todo.xml. The first tag of the Todo.xml defines the super class of our application and the namespaces used inside the application description. 

```xml
<?xml version="1.0"?>
<app:TodoClass xmlns="http://www.w3.org/1999/xhtml"
               xmlns:js="js.core" xmlns:ui="js.ui" xmlns:app="app" xmlns:view="app.view" xmlns:conf="js.conf">
   ...
</app:TodoClass>
```
As you can see, the default namespace is `"http://www.w3.org/1999/xhtml"` which allows you to use plain HTML elements to describe your view.
The other namespaces are used for custom components.

One example of a custom component is the Router configuration.
```xml
<js:Router cid="router">
        <conf:Route name="default" route="^$" onexec="showAll"/>
        <conf:Route name="active" route="^active$" onexec="showActive"/>
        <conf:Route name="completed" route="^completed$" onexec="showCompleted"/>

</js:Router>
```
Inside this declaration all routes of the application are defined. The **route** attribute expects a regular expression, which matches the route. 
The **onexec** attribute defines, the function which will be called, if the route is triggered.

### The code behind file TodoClass.js
The TodoClass.js does two things. It initializes the attributes, used in this application, and it defines the event handlers for routing and ui events.


### The Todo Model



### The Todo View

