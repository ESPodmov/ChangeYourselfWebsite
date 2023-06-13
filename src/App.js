import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Specialists from './pages/specialists';
import DashboardMain from './components/Dashboard/DashboardMain'
import DashboardArticles from './components/Dashboard/DashboardArticles';
import DashboardSpecialists from './components/Dashboard/DashboardSpecialists';
import DashboardLayout from './components/Dashboard/DashboardLayout'
import DashboardServices from './components/Dashboard/DashboardServices';
import Services from './pages/services';
import ArticleEditor from './components/ArticleEditor/index';
import ServicesEditor from './components/Dashboard/components/ServicesEditor';
import SpecialistsEditor from './components/Dashboard/components/SpecialistsEditor';
import { getDeviceType } from "./utils"
import ImageCrop from './components/Dashboard/components/ImageCrop';


function App() {
  // const deviceType = getDeviceType();
  const deviceType = 'mobile';
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home deviceType={deviceType} />} />
        <Route path="/about" element={<About deviceType={deviceType} />} />
        <Route path="/specialists" element={<Specialists deviceType={deviceType} />} />
        <Route path="/services" element={<Services deviceType={deviceType} />} />
        <Route path="/dashboard" element={<DashboardLayout deviceType={deviceType} />}>
          <Route index element={<DashboardMain deviceType={deviceType} />} />
          <Route path='articles' element={<DashboardArticles />} />
          <Route path='services' element={<DashboardServices />} />
          <Route path='specialists' element={<DashboardSpecialists deviceType={deviceType} />} />
          <Route path="articles/:id/edit" element={<ArticleEditor deviceType={deviceType} />} />
          <Route path="services/:id/edit" element={<ServicesEditor deviceType={deviceType} />} />
          <Route path="specialists/:id/edit" element={<SpecialistsEditor deviceType={deviceType} />} />
          <Route path="image" element={<ImageCrop />}/>
        </Route>
        <Route path='*' element={<div style={{ fontSize: 56, top: 80, position: 'relative' }}>Not found</div>} />
      </Routes>
    </Router>
  )
}

export default App;