import { useEffect, useRef, useState } from 'react'

type AppProps={
    length: number;
    onOtpSubmit:(data:any)=>void;
}

const OtpInput = ({length,onOtpSubmit}:AppProps) => {
    const [otp,setOtp]=useState(new Array(length).fill(""));
    const inputRefs:any=useRef([])

    useEffect(()=>{
     if(inputRefs.current[0]){
        inputRefs.current[0].focus()
     }
    },[])

    const handleChange=(index:number,e:any)=>{
      const value=e.target.value;
      if(isNaN(value))return ;

      const newOtp=[...otp];

    //   allow only one input 

    newOtp[index]=value.substring(value.length-1)
    setOtp(newOtp)



    // submit 
    const combinedOtp=newOtp.join("");
    if(combinedOtp?.length===length){
      onOtpSubmit(combinedOtp)
    }

    // Move to next input if current field is filled 

    if(value && index<length-1 && inputRefs.current[index+1]){
      console.log(newOtp,newOtp.indexOf(""),"newOtp")
      inputRefs.current[newOtp.indexOf("")].focus()
    }

    }

    const handleClick=(index:number)=>{
     inputRefs.current[index].setSelectionRange(1,1)

     if(index>0 && !otp[index-1]){
       inputRefs.current[otp.indexOf("")].focus()
     }
    }

    const handleKeyDown=(index:number,e:any)=>{
      //Move focus to the previous input field on backspace
       if(e.key=="Backspace" && !otp[index] && index>0 && inputRefs.current[index-1]){
        inputRefs.current[index-1].focus()
       }
       
    }
  return (
    <div>
      {
        otp.map((value:string,index:number)=>{
            return <input
            ref={(input:any)=>(inputRefs.current[index] = input)}
            key={index}
            type='text'
            value={value}
            onChange={(e:any)=>handleChange(index,e)}
            onClick={()=>handleClick(index)}
            onKeyDown={(e:any)=>handleKeyDown(index,e)}
            className='otpInput'
            />
        })
      }
    </div>
  )
}

export default OtpInput
