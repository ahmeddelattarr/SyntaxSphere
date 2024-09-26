import { useState } from 'react';
import SignUp from './components/SignUp.tsx';
import SignIn from './components/signin.tsx';

export default function App() {
  const [currentView, setCurrentView] = useState('signup');

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
    </div>
  );
}
