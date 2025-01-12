import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Student from './student/Student';
import CreateStudent from './student/CreateStudent';
import UpdateStudent from './student/UpdateStudent';
import ViewStudent from './student/ViewStudent.';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Student/>}></Route>
            <Route path='/student' element={<Student/>}></Route>
            <Route path='/createStudent' element={<CreateStudent/>}></Route>
            <Route path='/updateStudent/:id' element={<UpdateStudent/>}></Route>
            <Route path='/viewStudent/:id' element={<ViewStudent/>}></Route>
            <Route path='/deleteStudent/:id' element={<Student/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
