import React,{useState,useCallback} from "react";
import Button from "./Button";
import Text from "./Text";

const App = ()=>{
  const[message,updatemessage] = useState(" hello user , good morning");
   const revanth = useCallback( () =>{
    updatemessage("hello user , good afternoon ");
   },[])
    return (
      <>
       <div>{message}</div>
       <Button revanth={revanth}>Change Message ..!</Button>
      </>
    );
    
}
export default App;
// named export s : export {App};