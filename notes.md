# React Notes (Till Module 7)

## When to Use Curly Braces

In React, curly braces `{}` are used inside JSX to indicate that the content within is JavaScript code. JSX is a syntax extension that looks like HTML but allows you to embed JavaScript expressions using curly braces.

### Understanding the Context

**When to Use Curly Braces in JSX:**

- Curly braces are used to embed JavaScript expressions inside JSX. These expressions can be variables, function calls, or any valid JavaScript code that returns a value.

Example:

```js
const name = "Vedanth";
return <div>Hello, {name}</div>; // Output: Hello, Vedanth
```

Here, the curly braces tell React to interpret `name` as a JavaScript variable and insert its value into the JSX.

**When Not to Use Curly Braces:**

- Curly braces are not needed when assigning JSX directly to a variable.

Incorrect:

```js
const element = {<div>Hello</div>}; // Creates an object, which is not valid
```

Correct:

```js
const element = <div>Hello</div>; // Valid JSX assignment
```

### Example Case

In your original code, you tried to assign JSX with a conditional expression, but mistakenly wrapped it in curly braces, making it an object instead of JSX:

```js
const greetingelement = { ismorning ? morningelement : afternoonelement };
```

This creates an object because `{}` is used for object literals in JavaScript. Instead, you should directly assign the result of the conditional expression to `greetingelement` without additional curly braces:

```js
const greetingelement = ismorning ? morningelement : afternoonelement;
```

### Conclusion

- Use curly braces in JSX to embed JavaScript expressions.
- They should not be used when directly assigning a JSX element to a variable.

---

## Functional Components

Functional components always start with a capital letter.

---

## Difference Between Two Code Snippets

### Code 1:

```js
const revanth = () => {
  setImpData((prevData) => {
    return [...prevData, { id: "f", text: "text6" }];
  });
};
```

### Code 2:

```js
const revanth2 = () => {
  setImpData((prevData) => {
    return prevData, { id: "f", text: "text6" };
  });
};
```

**Explanation:**

- In the 1st case, we are creating a new array where all the elements from the previous array are spread (using the spread operator `...`), and a new object is added.
- In the 2nd case, we are creating an array with two elements: the previous array and the new object. This results in a nested array.

---

## Asynchronous State Updates

Any state variable updates in React are considered asynchronous by JavaScript.

---

## What is the Use of `memo`?

`memo` is a part of the React library that optimizes performance by preventing unnecessary re-renders of functional components. It memoizes the component so that it only re-renders when its props change.

Example:

```js
import React, { useState } from "react";

const ChildComponent = React.memo(({ count }) => {
  console.log("ChildComponent re-rendered");
  return <div>Count: {count}</div>;
});

const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  return (
    <div>
      <ChildComponent count={count} />
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setOtherState(otherState + 1)}>
        Change Other State
      </button>
    </div>
  );
};

export default ParentComponent;
```

### Explanation:

- In this example, `ChildComponent` is wrapped with `React.memo()`. It will only re-render when its `count` prop changes.
- Clicking the "Increment Count" button increments the count and re-renders `ChildComponent`.
- Clicking the "Change Other State" button does **not** cause `ChildComponent` to re-render, as its props haven't changed.

---

### Why Not Use `memo` Everywhere?

Using `React.memo` for every component right from the start might seem like a good idea for optimizing performance, but there are a few reasons not to:

1. **Overhead of Memoization:**

   - Performance Cost: While `memo` helps prevent unnecessary re-renders, it also introduces a slight performance overhead due to the memoization process itself. Each time a component receives new props, React performs a shallow comparison to decide whether to re-render or not.
   - For lightweight components, this added overhead can outweigh the benefits of memoization.

2. **Unnecessary Complexity:**
   - Using `memo` everywhere can make the code more complex and harder to read. It might obscure the component structure and how data flows through the application.

---

## Introducing the `useCallback` Hook

Here’s an example from your `App.js`:

```js
const App = () => {
  const [message, updatemessage] = useState(" hello user , good morning");
  const revanth = () => {
    updatemessage("hello user , good afternoon ");
  };
  return (
    <>
      <div>{message}</div>
      <Button revanth={revanth}>Change Message ..!</Button>
    </>
  );
};
```

- when this state variable message , gets updated , then the function revanth is getting created again , even though the function is same , and one line hasnt changed, the function reference , has changed , meaning that the same function is now created in different memory location
  since the reference is changed : it is considered as a change in the reference and hence , that got rerendered , even when the memo is used with the Button component
  so to avoid this we use the react hook "usecallback"
  doing it like this avoids rerendering of the button :
  ```js

  const revanth = useCallback( () =>{
    updatemessage("hello user , good afternoon ");
   },[])
```

