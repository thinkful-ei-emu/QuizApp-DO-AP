## Thinkful - Quiz App OOP Starter with Webpack

### Installation

Simply run `npm install` after cloning the repo and `npm start` to kickoff the dev server

### Instructions

Follow the instructions from the curriculum to build out the necessary classes for your OOP Quiz application.

### Superclass: Model

By extending your class with `Model`, you declare all its instantiations to be bindable to one or more "views" (instances of `Renderer`). All models have the public method `update()`, which should be called to confirm any changes to your model's properties and initiate a new render cycle.

### Superclass: Renderer

Classes that extend `Renderer` define a template and reactive behavior for all instances. A renderer instance is constructed with the following required parameters:

1. `model` - a model instance
2. `el` - DOM selector string for a permanent DOM element

Renderer instances have the following reserved public method names that can be defined to provide special functionality:

##### template() - REQUIRED

This function *must* return an HTML string. The template will typically use `this.model` to guide varied output.

##### getEvents()

This function *must* return an object. Each property defines the event listener bindings, where the key is a DOM event name and delegate DOM selector (space separated), and the value is the name of an event handler function existing on the same class.  For example:

```
getEvents() {
  return {
    'click .add-item': 'handleAddItem'
  }
}
```

The definition will add a `click` listener to all children elements with the `add-item` class, and invoke the `handleAddItem()` function defined on the same class.

##### render()

By default, the return value of `template()` will be placed in the root element on every model update. You can override this method if you want to finetune for the rendering cycle.
