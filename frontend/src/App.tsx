import { useState } from 'react';

import data from './assets/data.json'

import CommentBox from './components/commentBox.tsx';
import Comments from './components/comments/Comments.tsx';

function App() {

  const currentUsername = data.currentUser.username

  return (
    <main className = 'h-screen w-screen flex justify-center bg-vlight-gray ' >
      <div className = 'md:max-2xl:w-3/5 xs:max-md:w-screen py-10'>
        {/* <CommentBox  data = { data } /> */}
        <Comments  currentUser = { currentUsername }  />
      </div>
    </main>
  )
}

export default App
