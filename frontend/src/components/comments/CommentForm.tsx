import React, { useState, useContext } from 'react';
import { CommentContext } from '../../App';
import data from '../../assets/data.json';
import { Reply1 } from './Comment';


const userImage = data.currentUser.image;
const png = userImage.png;
const webp = userImage.webp;
const comments = data.comments;



interface CommentFormProps {
  replyingTo: string;
}

const CommentForm:React.FC<CommentFormProps> = ( { replyingTo } ) => {
  
  const user = useContext(CommentContext)
  
  // const [rep, setRep] = useState<Reply1[]>([]);
  // comments.map((comment) => setRep(comment.replies))
  // const repliesNumber = rep.length;
  // const commentsNumber = comments.length;

  // console.log(commentsNumber);

  const [ content, setContent ] = useState<string>(" ")

  const hello = [ "hi", 'hey', "yoo" ]
  console.log(hello.length);
  
  
  const data1 = {
                  "id": 3,
                  "content": { content },
                  "createdAt": "1 week ago",
                  "score": 0,
                  "replyingTo": { replyingTo } ,
                  "user": {
                    "image": { 
                      "png": { png },
                      "webp": { webp }
                    },
                    "username": { user }
                  }
                }

  
  return (
    <form className = 'w-full h-fit bg-white p-5 rounded-lg flex gap-4 my-3 justify-around'>
      <img src = { `../../src/assets/${ userImage.png }` }  alt = ""  className = 'w-12 h-12' />
      <textarea name = "" id = "" className = 'w-full h-28 py-3 px-6 outline-1 border-2 rounded-lg' ></textarea>
      <button className = 'py-1 px-8 bg-slate-400 h-11 rounded-lg ' > REPLY </button>
    </form>
  )
}

export default CommentForm
