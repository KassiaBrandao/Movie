import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import Layout from './components/layout/layout';
import Search from './pages/Search/search';
import MovieDetails from './pages/MovieDetails/MovieDetails';


function RoutesApp(){
    return(
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path="/movie/:id" element={<MovieDetails />} /> 
                    
                    <Route path='/' element={<Search />} />
                </Routes>
            </Layout> 
        </BrowserRouter>
    )
}

export default RoutesApp;