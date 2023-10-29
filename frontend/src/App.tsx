
import { createContext } from 'react';
import data from './assets/data.json'

import Comments from './components/comments/Comments.tsx';



export const CommentContext = createContext<string>("");


function App() {
  
  const currentUsername = data.currentUser.username


  return (
    <CommentContext.Provider value = { currentUsername }>
      <main className = 'h-fit w-full flex justify-center bg-vlight-gray   ' >
       
        <div className = 'md:max-2xl:w-7/12 xs:max-md:w-full py-10 xs:max-md:px-4 xs:max-sm:scale-95 xs:max-md:py-5'>
          <Comments  />
        </div>
      
      </main>
    </CommentContext.Provider>
  )
}

export default App
