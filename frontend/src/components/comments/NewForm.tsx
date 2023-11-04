import React, { useState, FormEvent, SetStateAction } from 'react';

import data from '../../assets/data.json';
import { addComment } from '../../helpers';
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
  const [ id, setId ] = useState<number>( number )
  
  
  const handleSubmit = ( e:FormEvent ) => {
    e.preventDefault();
    addComment( id, content )
        .then( data => {
                          setBackendReplies( [ ...replies, data ] )
                          // Save the updated comments to local storage
                          localStorage.setItem('comments', JSON.stringify(replies));
                          const hi = id + 1
                          setContent("");
                          setId(hi);
                          setReply(true);  
                       })
                       .catch(error => {
                        // Display an error message to the user.
                        console.log(error);
                      });
        
      }
      



  return (
    <>
        <form 
            className = 'w-full h-fit bg-white p-5 rounded-lg flex gap-4 my-3 justify-around xs:max-md:hidden ' 
            id = 'comment-form' 
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
            onChange = { (e) => setContent( e.target.value ) }
            placeholder = 'Add Comment...'  
          ></textarea>

          <button 
            className = 'h-12 text-white bg-moderate-blue py-3 px-6  rounded-lg ' 
            onClick = { handleSubmit } 
          >
            SEND 
          </button>
          
      </form>
      <form 
          className = 'w-full h-fit bg-white p-5 rounded-lg flex flex-col gap-4 my-3 justify-around md:max-2xl:hidden text-sm ' 
          id = 'comments-form' 
          name = 'comments-form'  
        >
          <textarea 
            name = "" 
            id = "" 
            className = 'w-full h-28 py-3 px-6 outline-1 border-2 rounded-lg' 
            value = { content }  
            onChange = { ( e ) => setContent( e.target.value ) }
            placeholder = 'Add Comment...'  
          ></textarea>
          <div className = 'flex justify-between' >
            <img 
              src = { `../../src/assets/${ userImage.png }` }  
              alt = ""  
              className = 'w-12 h-12' 
            />
            <button 
              className = 'text-white bg-moderate-blue py-3 px-6  h-12 rounded-lg ' 
              onClick = { handleSubmit } 
            > SEND </button>
          </div>
      </form>
    </>
  )
}

export default NewForm




