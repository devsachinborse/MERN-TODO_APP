
import Home from './pages/Home'
import Edit from './pages/Edit'
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/edit/:id' element={<Edit /> } />
      </Routes>
    </>
  );
}

export default App;
