import { Routes, Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import ItemDetailPage from './ItemDetailPage';

export default function MainContainer() {
  return (
    <div className=" flex-row">
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route 
          path="/item/:id" 
          element={<ItemDetailPage />} 
        />
      </Routes>
    </div>
  );
}