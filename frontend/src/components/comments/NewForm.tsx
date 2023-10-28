import React, { useState, useContext, FormEvent, SetStateAction } from 'react';
import data from '../../assets/data.json';
import { addComment } from '../../helpers';
// import { CommentContext } from '../../App';s
import { Comment1 } from './Comments';


const userImage = data.currentUser.image;

interface FormProps {
  replies: Comment1[];
  setBackendReplies: React.Dispatch<SetStateAction<Comment1[]>>;
  setReply: React.Dispatch<SetStateAction<boolean>>;
}


const NewForm:React.FC<FormProps> = ( { replies, setBackendReplies, setReply } ) => {
  
  
  const [ content, setContent ] = useState<string>("");
  const number = 10;
  const [ id, setId ] = useState<number>(number)
  
  const handleSubmit = ( e:FormEvent ) => {
    e.preventDefault();
        addComment( id, content ).then(data => setBackendReplies([...replies, data])
        )
        console.log(content);
        console.log(id);
        
        const hi = id + 1
        setContent("");
        setId(hi);
        setReply(true);
      
  }

  return (
    <form className = 'w-full h-fit bg-white p-5 rounded-lg flex gap-4 my-3 justify-around' id = 'comments-form' name = 'comments-form'  >
    <img src = { `../../src/assets/${ userImage.png }` }  alt = ""  className = 'w-12 h-12' />
    <textarea name = "" id = "" className = 'w-full h-28 py-3 px-6 outline-1 border-2 rounded-lg' value = { content }  onChange = { (e) => setContent( e.target.value ) }  ></textarea>
    <button 
      className = 'py-1 px-8 bg-slate-400 h-11 rounded-lg ' 
      onClick = { handleSubmit } 
      > REPLY </button>
  </form>
  )
}

export default NewForm




