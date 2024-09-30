import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
// importing the named import  : import {App}  from "./App";
// //! using javascript : 
// // const  root = document.getElementById('root');
// // const p = document.createElement('p');
// // p.innerText = " Hello from vedanth part 2"
// // root.appendChild(p);
// // ! using the react;
// //? creating element in react : harder way 
// const child1 =React.createElement('p',{},"i am a child1");
// const child2 =React.createElement('p',{},"i am a child2");
// //? other way  is to create it using the jsx : 
// const div2 = <div  className ="text" > hello i am vedanth , i am inside , the div , created using the jsx </div>
//  const div = React.createElement('div' , {className : 'text'}, [div2]);
//   // ? creating a functional component 
//   const morning = "Good morning";
//   const ismorning = true;
//   function handleclick(){
//    console.log(" i was clicked");
//   }
//   const morningelement = <div onClick={handleclick}>{morning} it is 8 : 00 AM now</div>
//   const afternoonelement = <div>good afternoon sir it is 12 : 00 noon</div> 
//   const greetingelement = ismorning  ? morningelement : afternoonelement;
//   const Greetingfunction = function()
//   {

//      return<>
//      {greetingelement}
//     </>
//   }
// //  console.log(div);
 const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(<App></App>);