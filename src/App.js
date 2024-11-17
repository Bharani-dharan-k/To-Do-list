import React, { useState } from 'react';
import Header from './Header';
import Content from './Content';
import { useEffect } from 'react';
import Footer from './Footer';
import AddItem from './AddItem';
import SearchItem from './searchItem';
import apiRequest from './apiRequest';
function App() {
  const [isLoading,setIsLoading]=useState(true);
  const [newItem,setNewItem] = useState('');
  const [search,setSearch] = useState('');
  const [fetchError,setFetchError] =useState(null);
  const API_URL = 'http://localhost:3500/items';
  useEffect(()=>
  {
      const fetchItems = async () =>
      {
        try {
          const response  = await fetch(API_URL);
          if(!response.ok ) throw Error("Data not recievied ")
          console.log(response);
          const listItems = await response.json();
          console.log(listItems);
          setItems(listItems);
          setFetchError(null);
        } catch (error) {
          setFetchError(error.message);
        }
      finally
        {
          setIsLoading(false);
        }
    }
    setTimeout(()=>
    {
      ( async () => await fetchItems())()
    },1000)
    },[])
    const [items, setItems] = useState(JSON.parse(localStorage.getItem('To-Do list')) || []);
    const addItem = async (item)=>
    {
      const id = items.length ? items[items.length -1].id +1 : 1 ;
      const addNewItem = {id,checked:false,item}
      const listItems = [...items,addNewItem];
      setItems(listItems)
      const postOptions = {
        method:'POST',
        headers:
        {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(addNewItem)
      }
      const result = await apiRequest(API_URL,postOptions)
      if(result) setFetchError(result)
     }
    
    const handleCheck = async (id) => {
      const listItems = items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      setItems(listItems);
      const myItem = listItems.filter(item => item.id === id)
      const updateOptions = {
        method:'PATCH',
        headers:
        {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({checked:myItem[0].checked})
      }
      const requrl= `${API_URL}/${id}`
      const result = await apiRequest(requrl,updateOptions)
      if(result) setFetchError(result)
      localStorage.setItem("To-Do list", JSON.stringify(listItems));
    };

    const handleDelete = async (id) => {
      const listItems = items.filter((item) => item.id !== id);
      setItems(listItems);
      const deleteOptions = {method : 'DELETE'}
      const reqesturl=`${API_URL}/${id}`
      const result = await apiRequest(reqesturl,deleteOptions)
      if(result) setFetchError(result)
      localStorage.setItem("To-Do list", JSON.stringify(listItems));
    };
    const handleSubmit = (e)=>
    {
      e.preventDefault();
      if(!newItem) return
      console.log("Submitted");
      addItem(newItem);
      setNewItem('');
    }
    useEffect(()=>
    {
      console.log("Bharani");
    },[items])
    return (
      <div className='App'>
        <Header title="To - Do List" />
        <AddItem 
        newItem= {newItem}
        setNewItem={setNewItem}
        handleSubmit= {handleSubmit}
        />
        <SearchItem 
        search = {search}
        setSearch = {setSearch}

        />
        <main>
          {isLoading && <p>{`Loading items....`}</p>}
          {fetchError && <p>{`Error: ${fetchError}`}</p>}
        { !isLoading && <Content 
        items={items.filter(item =>((item.item).toLowerCase()).includes(search.toLowerCase()))} 
        handleCheck={handleCheck}
        handleDelete={handleDelete} />}
        </main>
        <Footer length={items.length} />
      </div>
    );
  }

  export default App;