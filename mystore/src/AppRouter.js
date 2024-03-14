import {BrowserRouter,Routes,Route} from 'react-router-dom';
import CreateProduct from './components/CreateProduct.jsx';
import Login from './components/Login.jsx';

function AppRouter() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' />     
      <Route path='/createproduct' element={<CreateProduct/>} />
      <Route path='/login' element={<Login/>}/>     
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default AppRouter;
