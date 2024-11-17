import React, { useRef } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
  const inputRef = useRef();

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem" className="addItemLabel">Add Item:</label>
      <input
        autoFocus
        ref={inputRef}
        id="addItem"
        type="text"
        placeholder="Add New Item..."
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        className="addItemInput"
      />
      <button
        type="submit"
        aria-label="Add Item"
        onClick={() => inputRef.current.focus()}
        className="addItemButton"
      >
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItem;
