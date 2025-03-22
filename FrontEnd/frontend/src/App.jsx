import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import CollectionPage from './Components/CollectionPage'
import GameDetails from './Components/GameDetail'
import DetailsList from './Components/detailsListComponent/DetailsList'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/collection' element={<CollectionPage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path='/games' element={<DetailsList />}/>
        <Route path='/game/:id' element={<GameDetails />}/>
      </Routes>
    </Router>
  )
}

export default App
