import React, { useState, useContext } from 'react';
import { CommentContext } from '../../App';
import data from '../../assets/data.json';
import { Reply1 } from './Comment';
import addReply from '../../helpers';
import { Form } from 'react-router-dom';


const userImage = data.currentUser.image;



interface CommentFormProps {
  replyingTo: string;
}

const CommentForm:React.FC<CommentFormProps> = ( { replyingTo } ) => {
  
  const user = useContext(CommentContext);

  
  
  const [ content, setContent ] = useState<string>(" ")
  
  const hello = [ "hi", 'hey', "yoo" ]
  console.log(hello.length);
  
  const handleSubmit = ( event:FormDataEvent ) => {
      event.preventDefault();
      addReply({ content, replyingTo  }).then
  }

  
  return (
    <Form className = 'w-full h-fit bg-white p-5 rounded-lg flex gap-4 my-3 justify-around' onSubmit = { handleSubmit } >
      <img src = { `../../src/assets/${ userImage.png }` }  alt = ""  className = 'w-12 h-12' />
      <textarea name = "" id = "" className = 'w-full h-28 py-3 px-6 outline-1 border-2 rounded-lg' value = { content }  onChange = { (e) => setContent( e.target.value ) }  ></textarea>
      <button className = 'py-1 px-8 bg-slate-400 h-11 rounded-lg ' > REPLY </button>
    </Form>
  )
}

export default CommentForm
