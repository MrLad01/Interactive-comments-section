import { useState } from 'react';

import CommentBox from './components/commentBox.tsx';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <main className = 'h-screen w-screen flex justify-center bg-vlight-gray ' >
      <div className = 'md:max-2xl:w-3/5 xs:max-md:w-screen py-10'>
        <CommentBox />
      </div>
    </main>
  )
}

export default App
