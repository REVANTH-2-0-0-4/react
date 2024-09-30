import React,{useState} from "react";
import Button from "./Button";
import Text from "./Text";
const App = ()=>{
  const [impdata,setimpdata] = useState([
    {id : 'a', text  : "text1"},
    {id : 'b', text  : "text2"},
    {id : 'c', text  : "text3"},
    {id : 'd', text  : "text4"},
    {id : 'e', text  : "text5"}
  ])
 
    const revanth = () => {
      setimpdata((prevdata) =>{
        return [...prevdata,{id : 'f', text  : "text6"}]
      })
    }

  
    return (
      <>
        {impdata.map((item, idx) => {
          return <Text key={idx}>{item.text}</Text>;
        })}
        <Button revanth={revanth}>add more text</Button>
      </>
    );
    
}
export default App;
// named export s : export {App};