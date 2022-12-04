import { Routes, Route } from 'react-router-dom';

import CategoriesPrivew from '../categories-preview/categories-preview.component';

import './shop.styles.scss';

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPrivew />} />
    </Routes>
  );
};

export default Shop;
