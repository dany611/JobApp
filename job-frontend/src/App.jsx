import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Jobs from './pages/Jobs';

export default function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route exact path="/jobs" element={<Jobs/>} />
      <Route exact path="/" element={<Jobs />}
 />
    </Routes>
  </BrowserRouter>
  );
}
