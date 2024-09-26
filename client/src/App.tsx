import { useEffect, useState } from 'react';
import SignUp from './components/SignUp.tsx';
import SignIn from './components/signin.tsx';

export default function App() {
  const [currentView, setCurrentView] = useState('signup');
  const [posts, setPosts] = useState([]);

    const loadPostHandler = ()=>{

    const loadPosts = async()=>{
      const token = localStorage.getItem('access');
      console.log(token)
      const response = await fetch('http://localhost:8000/posts',{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      })
      const data = await response.json()
      console.log(data,"posts set successfully");
      //@ts-ignore 
      setPosts[data];
    }
    loadPosts();
    }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <nav className="mb-4">
        <button onClick={() => setCurrentView('signup')} className="mr-4 underline">
          Sign Up
        </button>
        <button onClick={() => setCurrentView('signin')} className="underline">
          Sign In
        </button>
      </nav>

      <div className="w-96">
        {currentView === 'signup' && <SignUp />}
        {currentView === 'signin' && <SignIn />}
      </div>
    <button onClick={loadPostHandler}>load posts</button>
    </div>
  );
}
