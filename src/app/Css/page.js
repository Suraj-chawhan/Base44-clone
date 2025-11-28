"use client"


import {gsap} from "gsap"
import {useRef,useEffect} from "react"
export default function A(){
  const ref=useRef();
  useEffect(()=>{
    gsap.to(ref.current,{duration:1,yoyo:true,repeat:-1,scale:1.5})
    
  },[])
return(
<div className="w-[100%] py-2 h-[100vh]  bg-white-500">
<div  ref={ref}  className="w-[100px] h-[100px] bg-purple-500 max-blend-multiply filter blur-xl">
  
  
  
</div>


<div className="w-[100px] h-[100px] bg-red-500  rounded-xl filter blue-xl bg-gradient-to-r  from-pink-600 to-purple-500">
  
</div>
</div>
);

}
