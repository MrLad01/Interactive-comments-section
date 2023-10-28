import React, { useState, FormEvent, SetStateAction } from 'react';

import data from '../../assets/data.json';
import addReply from '../../helpers';
import { Reply1 } from './Comment';


const userImage = data.currentUser.image;


interface CommentFormProps {
  replyingTo: string;
  replies: Reply1[];
  setBackendReplies: React.Dispatch<SetStateAction<Reply1[]>>;
  setReply: React.Dispatch<SetStateAction<boolean>>;
  comment: boolean
}

const CommentForm:React.FC<CommentFormProps> = ( { replyingTo, replies, setBackendReplies, setReply, comment } ) => {
      
  const [ content, setContent ] = useState<string>(" ")
  const number = 5;
  const [ id, setId ] = useState<number>( number )
  
  
  const handleSubmit = ( e:FormEvent ) => {
      e.preventDefault();
  
      if( !comment ) {
        addReply( id, content, replyingTo  )
            .then( data => setBackendReplies( [...replies, data ] ) )
        
        const hi = id + 1

        setContent("");
        setId( hi );
        setReply( false );
      }
  }

  
  return (
    <form 
        className = 'w-full h-fit bg-white p-5 rounded-lg flex gap-4 my-3 justify-around' 
        id = 'comments-form' 
        name = 'comments-form'  
      >
        <img 
          src = { `../../src/assets/${ userImage.png }` }  
          alt = ""  
          className = 'w-12 h-12' 
        />
        <textarea 
          name = "" 
          id = "" 
          className = 'w-full h-28 py-3 px-6 outline-1 border-2 rounded-lg' 
          value = { content }  
          onChange = { ( e ) => setContent( e.target.value ) }  
        ></textarea>
        <button 
          className = 'py-1 px-8 bg-slate-400 h-11 rounded-lg ' 
          onClick = { handleSubmit } 
        > REPLY </button>
    </form>
  )
}

export default CommentForm
