import React from 'react'

const Button = (props) => {
  const {children,revanth} = props;
  function handleclick(){
       revanth?.() // called as optional chaining and is used  as a safety to avoid  the errors 
      // console.log(data.a.b.c)
  }
  return (
    <>
    <button onClick={handleclick}>{children}</button> 
    </>
  )
}

export default Button
