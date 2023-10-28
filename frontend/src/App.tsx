
import { createContext } from 'react';
import data from './assets/data.json'

import Comments from './components/comments/Comments.tsx';



export const CommentContext = createContext<string>("");


function App() {
  
  const currentUsername = data.currentUser.username


  return (
    <CommentContext.Provider value = { currentUsername }>
      <main className = 'h-fit w-full flex justify-center bg-vlight-gray ' >
        <div className = 'md:max-2xl:w-3/5 xs:max-md:w-screen py-10'>
          <Comments  />
        </div>
      </main>
    </CommentContext.Provider>
  )
}

export default App
