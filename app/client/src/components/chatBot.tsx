
import { Button } from "@/components/ui/button"
import {Form, useForm} from 'react-hook-form'
import { FaArrowUp } from "react-icons/fa";

type FormData = {
  prompt:string;
}
const ChatBot = () => {
const {register, handleSubmit, reset, formState } = useForm<FormData>()

const onSubmit = (data:FormData) => {
  console.log(data)
 reset()
}

const onKeyDown = (e: KeyboardEvent<HTMLFormElement>)=>{
     if(e.key == 'Enter' && !e.shiftKey ){
        handleSubmit(onSubmit)();
      }
}

  return (
    <form  
    onSubmit={handleSubmit(onSubmit)}
    onKeyDown={onKeyDown}
    className="flex flex-col gap-2 p-4 border rounded-3xl items-end ">
      <textarea
      {...register('prompt', {required:true,
        validate: (data)=> data.trim().length > 0
      })}
        className="w-full p-2 border-0 rounded outline-none resize-none"
        placeholder="Type your message..."
        maxLength={1000}  />
      <Button 
      disabled ={!formState.isValid}
      variant="outline" className= "rounded-full w-9 h-9">
        <FaArrowUp />
      </Button>
    
    </form >
  )
}

export default ChatBot
