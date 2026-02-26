import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import DeviceVerification from './components/DeviceVerification';
import LectureEntry from './components/LectureEntry';
import Done from './components/Done';
import GoogleSuccess from './components/GoogleSuccess';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/success" element={<GoogleSuccess />} />
        <Route path="/verify-device" element={<DeviceVerification />} />
        <Route path="/lecture" element={<LectureEntry />} />
        <Route path="/done" element={<Done />} />
      </Routes>
    </div>
  );
}

export default App;