import { useState } from 'react';
import { SetupScreen } from './features/SetupScreen';
import { InterviewScreen } from './features/InterviewScreen';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [interviewData, setInterviewData] = useState<any>(null);

  const handleStart = (data: any) => {
    setInterviewData(data);
    setHasStarted(true);
  };

  if (!hasStarted) {
    return <SetupScreen onStart={handleStart} />;
  }

  // Se podría pasar interviewData a InterviewScreen en el futuro
  return <InterviewScreen />;
}

export default App;
