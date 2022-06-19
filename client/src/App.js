import React from 'react';
import './App.css';
import CreateForm from './components/Create';
import Shops from './components/AllShops';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <div>
     
     <BrowserRouter>
     <Routes>
     <Route path="/" exact element={<Shops/>} />
      <Route path="/addshop" exact element={<CreateForm/>} />
     </Routes>
     </BrowserRouter>
     </div>
  );
}

export default App;
