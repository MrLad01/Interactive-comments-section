
import data from './assets/data.json'

import Comments from './components/comments/Comments.tsx';


function App() {
  const currentUsername = data.currentUser.username

  return (
    <main className = 'h-fit w-screen flex justify-center bg-vlight-gray ' >
      <div className = 'md:max-2xl:w-3/5 xs:max-md:w-screen py-10'>
        <Comments  currentUser = { currentUsername }  />
      </div>
    </main>
  )
}

export default App
