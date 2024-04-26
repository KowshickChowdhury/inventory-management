import React, { useEffect, useState } from 'react'
import AddCategory from './AddCategory'
import CategoryApis from '../apis/CategoryApis';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Category() {
    const [message, setMessage] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const res = await CategoryApis.index();
        if (res.success) {
          setCategories(res)
        }
      }

    let categoryRows = '';
    if (categories.data && categories.data.length > 0) {
        categoryRows = categories.data.map((category) => (
            <tr key={category.id}>
                <td className='table-name'>{category.name}</td>
                <td>{category.description}</td>
                <td className='flex pt-3'>
                    <FaEdit className='mr-4 cursor-pointer' onClick={() => handleEditCategory(category)} />
                    <FaTrashAlt className='cursor-pointer' onClick={() => handleDeleteCategory(category.id)} />
                </td>
            </tr>
        ));
    }

  return (
    <>
        <div className='mx-4 my-4'>
            <div className='flex justify-between'>
                <h1>Category</h1>
                <AddCategory setMessage={setMessage} message={message} />
            </div>
            {message && (
                <div className='border px-4 py-3 mt-5 rounded relative bg-green-100 border-green-400 text-green-700' role="alert">
                    <span className="block sm:inline">{message}</span>
                </div>
            )}
            <div className='table-responsive-md'>
                <table className='table table-hover details'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{categoryRows}</tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default Category