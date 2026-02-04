import { PasswordGenerator } from './components/PasswordGenerator';

export function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FF4D4D] p-4 md:p-8">
      {/* Decorative Grid/Pattern background */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', 
             backgroundSize: '20px 20px' 
           }}>
      </div>
      
      <div className="z-10 w-full flex justify-center">
        <PasswordGenerator />
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-4 right-4 bg-black text-white px-2 py-1 font-mono text-xs font-bold border-2 border-white">
        PROJECT_PASSWORD_V1
      </div>
    </div>
  );
}
