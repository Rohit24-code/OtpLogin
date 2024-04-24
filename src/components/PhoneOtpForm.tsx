import { useState } from 'react'
import OtpInput from './OtpInput';

const PhoneOtpForm = () => {
  const [phoneNumber,setPhoneNumber]=useState("");
  const [showOtpInput,setShowOtpInput]=useState(false);

  const handlePhoneNumber=(e:any)=>{
  
    setPhoneNumber(e.target.value)
  }

  const handlePhoneSubmit=(e:any)=>{
    e.preventDefault();
    const regex = /[^0-9]/g;

    if(phoneNumber?.length<10 || regex.test(phoneNumber)){
      alert("Invalid Phone Number")
    }
    else{
     setShowOtpInput(true)
    }
  }

  const onOtpSubmit=(otp:any)=>{
     if(otp){
      alert("Logged in successfully ")
     }
  }
  return (
    <div>
     {!showOtpInput ? <form action="" onSubmit={()=>{}}>
         <input type="text" placeholder='Enter Phone Number' value={phoneNumber} onChange={(e:any)=>handlePhoneNumber(e)}/>

         <button type='submit' onClick={handlePhoneSubmit}>Submit</button>
      </form> : <div>
        <p>Enter OTP sent to {phoneNumber}</p>

        <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
        </div>}
    </div>
  )
}

export default PhoneOtpForm
