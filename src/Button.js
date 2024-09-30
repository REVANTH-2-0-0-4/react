import React,{memo} from 'react'

const Button = memo((props) => {
  const {children,revanth} = props;
  console.log(" the button is rerendered");
  function handleclick(){
       revanth?.() // called as optional chaining and is used  as a safety to avoid  the errors 
      // console.log(data?.a?.b?.c?)
  }
  return (
    <>
    <button onClick={handleclick}>{children}</button> 
    </>
  )
})

export default Button
