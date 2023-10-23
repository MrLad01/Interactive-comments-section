import React from 'react'
import data from '../../assets/data.json'


const userImage = data.currentUser.image

const CommentForm:React.FC = (  ) => {
  return (
    <form className = 'w-full h-fit bg-white p-5 rounded-lg flex gap-4 my-3 justify-around'>
      <img src = { `../../src/assets/${ userImage.png }` }  alt = ""  className = 'w-12 h-12' />
      <textarea name = "" id = "" className = 'w-full h-28 py-3 px-6 outline-1 border-2 rounded-lg' ></textarea>
      <button className = 'py-1 px-8 bg-slate-400 h-11 rounded-lg ' > REPLY </button>
    </form>
  )
}

export default CommentForm
