
# Reconciliation in React

## 1. Definition of Reconciliation
Reconciliation is the algorithm React uses to diff one tree of nodes against another to determine which parts need to be updated in the DOM (or other rendering environments). This process ensures that the UI reflects the current state of the application without the need for costly full re-renders. so reconciliation is diffing algorithm 

### Analogy
Imagine you have a big art project that you're working on. Instead of painting directly on the canvas every time you want to make a change, you create a sketch on paper first. This sketch is a lot easier to modify and helps you plan how the final artwork will look. This is similar to how React works with something called the virtual DOM.

## 2. Two Virtual DOMs
When you use React, it creates two virtual DOMs (or sketches) to help manage changes to your web application:

- **Old Virtual DOM**: Represents what the application currently looks like.
- **New Virtual DOM**: Created when you make changes, showing how you want your application to look after the changes.

## 3. Comparing the Two Virtual DOMs
React needs to figure out what actually changed between the old and the new sketches. This process is called reconciliation. Here’s how it works:

- **Creating the Old Sketch**: React starts with the old virtual DOM, which shows the current state of your application.
- **Making Changes**: When you update something in your app (like clicking a button), React creates a new virtual DOM that reflects those changes.
- **Diffing the Sketches**: React compares the old virtual DOM with the new virtual DOM to identify:
  - Which parts are the same.
  - Which parts need to be changed, added, or removed.

## 4. Updating the Real DOM
After React figures out the differences, it only updates the real DOM (the actual web page) with the necessary changes. This approach is much more efficient than redrawing the whole canvas (or entire application) every time something changes.

In React, when components re-render, the framework needs to determine what has changed in the UI and what remains the same. This process is called reconciliation, and **Fiber** is a rewrite of how React handles this efficiently.

---

# High-Level Algorithm for Reconciliation
React’s reconciliation algorithm is designed to update the UI as efficiently as possible. When changes occur in state or props, React compares the old tree of UI elements (before the update) with the new tree (after the update) and tries to determine the minimal set of changes needed.

### 1. Different Component Types Generate Different Trees
When React sees that a component has changed its type (e.g., switching from a `<div>` to a `<span>`), it assumes these different types are fundamentally different. As a result, React replaces the entire subtree of the old component with the new one because:

- Different component types usually have different structures, and it's more efficient to build the new one from scratch.

### 2. Diffing of Lists Uses Keys
When React encounters a list of items (e.g., multiple child components rendered inside a parent component), it needs a way to identify each item in the list across updates.

**Keys** are used for this purpose. When you assign each item a unique key, React can track each item between renders, making the process more efficient.

#### What Makes a Good Key?
- **Stable**: Keys should remain the same between renders if the underlying data hasn’t changed.
- **Predictable**: Keys should be based on something that won’t change unexpectedly (e.g., a unique ID).
- **Unique**: Each key must be unique among siblings in a list.That is the reason being to avoid  indexes as keys , they change  if the order of elements change 

---

# Understanding the Re-rendering Process in React

In React, the re-rendering process is divided into two main phases: **Reconciliation** and **Rendering**.

## 1. Reconciliation Phase
**Reconciliation** is the process through which React determines what changes need to be made to the user interface, handled by the **reconciler**.
- **React Fiber**: . It enhances the rendering process by allowing React to pause and resume work, enabling better performance and smoother updates. Fiber provides features like prioritizing updates and handling complex animations more efficiently.
-  for example if the user is interacting with the ui ( lets say scrolling )then its really important to update the screen , than processing the api fetch which can also happen later
- How this is done  , so basically before the introduction of react fiber,  all the changes was talking place at the same time , all the rerendering tasks are hanled by the  BROWSERS STACK , but  we need the prioritising of the tasks  right ? so we  react came up with its own staack , since  we cant change the working of the browser's stack , the new stack introuced by the stack is called as a virtual stack frame.
- this virtual stack frame consists of a priority wise levles , and  each level is called a frame
 ## 2. Rendering Phase
**Rendering** is the phase where the reconciler’s findings are used to update the actual user interface, handled by the **renderer**.
This separation of rerendering and reconciliation phase is  to make it accessible via multiple platforms lie web and app applications , the reconciliation logic is same  for the web and the app applications but the rerenderer is different for the native , ios and the web applicatios 

### Key Aspects of Rendering:
- **Actual DOM Updates**: The renderer updates the real DOM based on the reconciliation results.
- **React Fiber**: React Fiber is a reimplementation of the stack that allows React to pause and resume work, enhancing performance and enabling smoother updates. It provides features like prioritizing updates and managing complex animations efficiently.
- so react fiber is a re implementation of the browsers stack , it is  not the re implementation of the reconciliation algorithm , both are different things

---

# Scheduling APIs in Modern Browsers

Modern browsers provide APIs that help manage when updates occur, allowing developers to create smoother and more efficient animations and interactions.

### 1. `requestIdleCallback`
- **Purpose**: Allows developers to schedule tasks during idle periods when the main thread is not busy, useful for performing background tasks without interrupting the UI.
- **Usage**: Defers non-urgent work until the browser is idle, improving overall responsiveness.

### 2. `requestAnimationFrame`
- **Purpose**: Designed for creating smooth animations by requesting that the browser call a specified function to update an animation before the next repaint.
- **Usage**: Ensures animations run smoothly and are in sync with the browser’s refresh rate (usually 60 frames per second), avoiding dropped frames or jank.60hz refresh rate does mean that your frame is getting refreshed 60 times a second , irrespective of the updates  

---
# Key Points on UI Updates and Scheduling

- In a UI, it's not necessary for every update to be applied immediately; in fact, doing so can be wasteful, causing frames to drop and degrading the user experience.

- Different types of updates have different priorities — an animation update needs to complete more quickly than, say, an update from a data store.

- A push-based approach requires the app (you, the programmer) to decide how to schedule work. A pull-based approach allows the framework (React) to be smart and make those decisions for you.


# Conclusion
Understanding the two phases of re-rendering in React—reconciliation and rendering—helps developers create efficient and responsive applications. React Fiber improves the reconciliation process, while modern scheduling APIs like `requestIdleCallback` and `requestAnimationFrame` enhance task execution management, improving performance and user experience.
#  removing the confusions : 
# Understanding Rerendering, Reconciliation, and DOM Updates in React

In React, it's important to distinguish between **rerendering**, **reconciliation**, and **updating the DOM**. Let's break down these concepts step by step to avoid confusion.

## 1. Rerendering: What Does It Mean?

- **Rerendering** happens when a component's state or props change.
- During a rerender, React **recalculates** the component’s virtual DOM by re-running the **render function**.
- This process **does not directly update the actual DOM**. It's just React creating a new virtual DOM to represent what the UI should look like based on the new state/props.
- it is  purely a calculative step 
### Key Point:
- **Rerendering** means recalculating the virtual DOM, **not updating the visible UI**.

## 2. Reconciliation: How Changes Are Determined

- After React recalculates the virtual DOM (rerendering), it compares the **new virtual DOM** with the **previous virtual DOM**.
- This comparison process is called **reconciliation** or **diffing**.
- The diffing algorithm figures out **what has changed** between the two virtual DOM trees (new and old).
  
### Key Point:
- **Reconciliation** is the process where React determines the minimal set of changes to apply to the actual DOM.

## 3. Updating the DOM: When the UI Actually Changes

- Once React identifies the changes through the diffing algorithm, it **updates the real DOM** with only the necessary changes.
- This step is what we typically refer to as the **UI update**, which is when users visually see the changes on the screen.

### Key Point:
- **The actual DOM update (UI change) happens after React finishes rerendering and reconciliation.**

## 4. Why Do Components Rerender if Only a Part Changes?

Even though React uses the diffing algorithm to update only the **changed parts of the DOM**, the **entire component rerenders** because:

- Rerendering is the process where React recalculates the virtual DOM tree for the component.
- Only after rerendering, React can run the **diffing algorithm** to figure out what parts of the virtual DOM have actually changed.
  
Thus, **rerendering is a necessary step** before React can decide what parts of the DOM need to be updated.

### Key Points:
- **Rerendering** comes first, where React recalculates the virtual DOM.
- Then, **reconciliation** (diffing) compares the old and new virtual DOMs to find changes.
- Finally, **only the differences** are applied to the real DOM, ensuring efficient updates.

## Summary of Steps:

1. **Rerendering**: The component re-runs its render function to generate a new virtual DOM.
2. **Reconciliation**: React compares the old virtual DOM with the new one (diffing algorithm).
3. **DOM Update**: React updates only the parts of the real DOM that have changed, ensuring optimal performance.

## Conclusion:

- **Rerendering** ≠ **UI Update**: Rerendering is just React recalculating the virtual DOM, not changing the actual UI.
- **Reconciliation** (diffing) ensures that only the minimal necessary changes are applied to the real DOM.
- Even though only parts of the DOM are updated, **the whole component rerenders** first to generate the new virtual DOM.

