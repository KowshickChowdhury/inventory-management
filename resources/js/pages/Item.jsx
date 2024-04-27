import React, { useEffect, useState } from 'react';
import AddCategory from '../components/AddCategory';
import CategoryApis from '../apis/CategoryApis';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import AddItem from '../components/AddItem';
import ItemApis from '../apis/ItemApis';

function Item() {
    const [message, setMessage] = useState('');
    const [items, setItems] = useState([]);
    const [editFormData, setEditFormData] = useState(null); // State to store data for editing
    const [editing, setEditing] = useState(false); // State to track if editing mode is active

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        const res = await ItemApis.index();
        if (res.success) {
            setItems(res);
        }
    };

    const handleEditItem = (item) => {
        setEditFormData(item);
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditFormData(null);
        setEditing(false);
    };

    const handleDeleteItem = async (itemId) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this item?");

        if (shouldDelete) {
            const res = await ItemApis.delete(itemId);
            if (res.success) {
                setMessage(res.data.message);
                setTimeout(() => {
                    setMessage('');
                }, 2000);
                getItems();
            }
        } else {
            // User clicked "Cancel" or closed the dialog
            console.log("Delete canceled");
        }
    };

    let ItemRows = '';
    if (items.data && items.data.length > 0) {
        ItemRows = items.data.map((item) => (
            <tr key={item.id}>
                <td className='table-name'>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.inventory.name}</td>
                <td>{item.image_url && (
                    <img src={item.image_url} alt={item.name} style={{ maxWidth: '23px' }} />
                )}</td>
                <td className='flex pt-3'>
                    <FaEdit
                        className='mr-4 cursor-pointer'
                        onClick={() => handleEditItem(item)}
                    />
                    <FaTrashAlt
                        className='cursor-pointer'
                        onClick={() => handleDeleteItem(item.id)}
                    />
                </td>
            </tr>
        ));
    }

    return (
        <>
            <div className='mx-4 my-4'>
                <div className='flex justify-between'>
                    <h1>Item</h1>
                    <AddItem
                        setMessage={setMessage}
                        message={message}
                        getItems={getItems}
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
                                <th>Quantity</th>
                                <th>Category</th>
                                <th>Image</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>{ItemRows}</tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Item;
