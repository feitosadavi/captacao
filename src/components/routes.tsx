import SearchPage from '../pages/search.page';
import { Route, Routes } from 'react-router-dom';

export default function () {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />}>
      </Route>
      {/* <Route path="about" element={<AboutPage />} /> */}
    </Routes>
  )
}