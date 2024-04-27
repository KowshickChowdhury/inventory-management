import React, { useEffect, useState } from 'react';
import AddCategory from '../components/AddCategory';
import CategoryApis from '../apis/CategoryApis';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Category() {
    const [message, setMessage] = useState('');
    const [categories, setCategories] = useState([]);
    const [editFormData, setEditFormData] = useState(null); // State to store data for editing
    const [editing, setEditing] = useState(false); // State to track if editing mode is active

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const res = await CategoryApis.index();
        if (res.success) {
            setCategories(res);
        }
    };

    const handleEditCategory = (category) => {
        setEditFormData(category);
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditFormData(null);
        setEditing(false);
    };

    const handleDeleteCategory = async (categoryId) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this attendance?");

        if (shouldDelete) {
            const res = await CategoryApis.delete(categoryId);
            if (res.success) {
                setMessage(res.data.message);
                setTimeout(() => {
                    setMessage('');
                }, 2000);
                getCategories();
            }
        } else {
            // User clicked "Cancel" or closed the dialog
            console.log("Delete canceled");
        }
    };

    let categoryRows = '';
    if (categories.data && categories.data.length > 0) {
        categoryRows = categories.data.map((category) => (
            <tr key={category.id}>
                <td className='table-name'>{category.name}</td>
                <td>{category.description}</td>
                <td className='flex pt-3'>
                    <FaEdit
                        className='mr-4 cursor-pointer'
                        onClick={() => handleEditCategory(category)}
                    />
                    <FaTrashAlt
                        className='cursor-pointer'
                        onClick={() => handleDeleteCategory(category.id)}
                    />
                </td>
            </tr>
        ));
    }

    return (
        <>
            <div className='mx-4 my-4'>
                <div className='flex justify-between'>
                    <h1>Category</h1>
                    <AddCategory
                        setMessage={setMessage}
                        message={message}
                        getCategories={getCategories}
                        editFormData={editFormData}
                        editing={editing}
                        onCancelEdit={handleCancelEdit}
                    />
                </div>
                {message && (
                    <div className='border px-4 py-3 mt-5 rounded relative bg-green-100 border-green-400 text-green-700' role='alert'>
                        <span className='block sm:inline'>{message}</span>
                    </div>
                )}
                <div className='table-responsive-md mt-4'>
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
    );
}

export default Category;
