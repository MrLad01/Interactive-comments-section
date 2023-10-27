import React, { useState, useContext } from 'react';
import { CommentContext } from '../../App';
import data from '../../assets/data.json';
import { Reply1 } from './Comment';
import addReply from '../../helpers';


const userImage = data.currentUser.image;



interface CommentFormProps {
  replyingTo: string;
}

const CommentForm:React.FC<CommentFormProps> = ( { replyingTo } ) => {
  
  // const user = useContext(CommentContext);

  
  
  const [ content, setContent ] = useState<string>(" ")
  
  const handleSubmit = (  ) => {
      addReply( content, replyingTo  ).then(data => console.log(data)
      )
  }

  
  return (
    <form className = 'w-full h-fit bg-white p-5 rounded-lg flex gap-4 my-3 justify-around'  >
      <img src = { `../../src/assets/${ userImage.png }` }  alt = ""  className = 'w-12 h-12' />
      <textarea name = "" id = "" className = 'w-full h-28 py-3 px-6 outline-1 border-2 rounded-lg' value = { content }  onChange = { (e) => setContent( e.target.value ) }  ></textarea>
      <button 
        className = 'py-1 px-8 bg-slate-400 h-11 rounded-lg ' 
        onClick = { handleSubmit } 
        > REPLY </button>
    </form>
  )
}

export default CommentForm
