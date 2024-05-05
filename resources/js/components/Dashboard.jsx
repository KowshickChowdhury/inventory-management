import React, { useContext, useEffect, useState } from 'react'
import CategoryApis from '../apis/CategoryApis';
import ItemApis from '../apis/ItemApis';
import NoteContext from '../context/NoteContext';

function Dashboard() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryCount, setCategoryCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const example = useContext(NoteContext);

  // console.log('example', example)

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    example.update();
  }, [])
  

  const fetchData = async () => {
    try {
      const categoryRes = await CategoryApis.index();
      const itemRes = await ItemApis.index();
      setCategory(categoryRes.data);
      setCategoryCount(categoryRes.data.length);
      setItems(itemRes.data);
      setItemCount(itemRes.data.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
  <>
    <div className='text-xl p-4 font-medium'>Inventory Management System</div>
    <div className='grid md:grid-cols-2 gap-32 p-4'>
      <div className='bg-[#d1f4ff] p-4'>
        <div className='grid grid-cols-2'>
          <h2 className='text-2xl font-bold mb-2'>Categories</h2>
          <p className='mt-[5px] ml-[18px] md:ml-[92px]'>Total Categories: {categoryCount}</p>
        </div>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Category Name</th>
            </tr>
          </thead>
          <tbody>
            {category.map(category => (
              <tr key={category.id}>
                <td className='border px-4 py-2'>{category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='bg-[#d1f4ff] p-4'>
        <div className='grid grid-cols-2'>
          <h2 className='text-2xl font-bold mb-2'>Items</h2>
          <p className='mt-[5px] ml-[70px] md:ml-[125px]'>Total Items: {itemCount}</p>
        </div>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Item Name</th>
              <th className='px-4 py-2'>Category</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td className='border px-4 py-2'>{item.name}</td>
                <td className='border px-4 py-2'>{item.inventory.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
  )
}

export default Dashboard