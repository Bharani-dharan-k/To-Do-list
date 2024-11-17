import React from 'react';
import ItemsList from './ItemsList';

const Content = ({ items, handleCheck, handleDelete }) => {
  return (
    <main>
      {items.length ? (
        <ItemsList items={items} handleCheck={handleCheck} handleDelete={handleDelete} />
      ) : (
        <p className="emptyMessage"><b>Your list is empty</b></p>
      )}
    </main>
  );
};

export default Content;
