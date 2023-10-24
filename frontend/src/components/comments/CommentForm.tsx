import React, { useState, useContext } from 'react'
import data from '../../assets/data.json'
import { CommentContext } from '../../App'


const userImage = data.currentUser.image
const png = userImage.png
const webp = userImage.webp



interface CommentFormProps {
  replyingTo: string,
}

const CommentForm:React.FC<CommentFormProps> = ( { replyingTo } ) => {

  const user = useContext(CommentContext)

  const [ content, setContent ] = useState<string>(" ")
  
  const data1 = {
                  "id": 3,
                  "content": { content },
                  "createdAt": "1 week ago",
                  "score": 0,
                  "replyingTo": "maxblagun",
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
