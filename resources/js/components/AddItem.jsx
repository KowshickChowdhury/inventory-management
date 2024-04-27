import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import CategoryApis from '../apis/CategoryApis';
import ItemApis from '../apis/ItemApis';

function AddItem({ setMessage, editFormData, editing, onCancelEdit, getItems }) {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState('');
  const [nameError, setNameError] = useState('');
  const [formData, setFormData] = useState({
    item_id: '',
    category_id: '',
    item_name: '',
    description: '',
    quantity: '',
    image: ''
  });

  useEffect(() => {
    getCategory();
  }, [])
  
  useEffect(() => {
    if (editing && editFormData) {
        setFormData({
            item_id: editFormData.id,
            category_id: editFormData.inventory_id,
            item_name: editFormData.name,
            description: editFormData.description,
            quantity: editFormData.quantity,
            image: editFormData.image_url
        });
        setShowModal(true);
    } else {
        setFormData({
            item_id: '',
            category_id: '',
            item_name: '',
            description: '',
            quantity: '',
            image: ''
        });
    }
}, [editing, editFormData]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getCategory = async() => {
    const res = await CategoryApis.index();
    setCategories(res.data);
  }

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.item_name.trim() === '') {
        setNameError('Item name cannot be empty');
        return;
    }
    if (formData.category_id === '') {
        setCategoryError('Please select a Category');
        return;
    }
    const quantity = formData.quantity !== '' ? formData.quantity : 1;
    const formDataToSend = new FormData();
    formDataToSend.append('item_id', formData.item_id);
    formDataToSend.append('category_id', formData.category_id);
    formDataToSend.append('item_name', formData.item_name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('quantity', quantity);
    // Check if image is uploaded
    if (formData.image) {
        formDataToSend.append('image', formData.image);
        sendFormData(formDataToSend);
    }
    sendFormData(formDataToSend);
    };

    const sendFormData = async(formDataToSend) => {
        if (editing) {
            // Update category
            const res = await ItemApis.update(formDataToSend);
            if (res.success) {
                setFormData({
                category_id: '',
                item_name: '',
                description: '',
                quantity: '',
                image: '',
                });
                setMessage(res.data.message);
                setTimeout(() => {
                    setMessage('');
                }, 2000);
                toggleModal();
                getItems();
            }
        } else {
            const res = await ItemApis.save(formDataToSend);
            if (res.success) {
                setFormData({
                category_id: '',
                item_name: '',
                description: '',
                quantity: '',
                image: '',
                });
                setMessage(res.data.message);
                setTimeout(() => {
                    setMessage('');
                }, 2000);
                toggleModal();
                getItems();
            }
        }
  };

  return (
    <>
      <div className='card border p-0 rounded-lg overflow-hidden cursor-pointer h-3/5 bg-[#04c342]' onClick={toggleModal}>
            <div className='bg-green-700 p-0'>
                <div className='flex gap-1 items-center px-3 p-0'>
                    <span className=' text-[2rem] font-black text-white'>+</span>
                    <div className='mb-[5px] pt-2 font-bold text-white text-center'>Add Item</div>
                </div>
            </div>
        </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed z-[9999] inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="relative bg-white rounded-lg left-12">
              {/* Your form content here */}
              <div  className='flex justify-between border-b-[1px] border-[#e5e5e5] p-8'>
                <h2 className="text-3xl font-black">Add Item</h2>
                <button onClick={toggleModal} className=" text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
              </div>
              <form className='grid grid-cols-2 gap-12 mx-16 my-4'>
                <div>
                    <div className='mb-4'>
                        <label className='block'>Category</label>
                        <select
                            className='w-[21.5rem] h-[3.3rem] border border-[#dfdfdf] p-2 rounded-[7px] mt-[6px]'
                            name='category_id'
                            value={formData.category_id}
                            onChange={(e) => handleChange('category_id', e.target.value)}
                            >
                            <option value=''>Select Category...</option>
                            {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                        {categoryError && <span className='text-red-500'>{categoryError}</span>}
                    <div className="mb-4">
                    <label htmlFor="item_name" className="block">
                        Item Name
                    </label>
                    <input type="text" name="item_name" value={formData.item_name} id="item_name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-4  border-gray-300 rounded-md border h-14" onChange={(e) => handleChange('item_name', e.target.value)} required />
                    {nameError && <span className='text-red-500'>{nameError}</span>}
                    </div>
                    
                    <div className="mb-4">
                    <label htmlFor="description" className="block">
                        Description
                    </label>
                    <textarea id="description" name="description" value={formData.description} rows="4" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-4  border-gray-300 rounded-md border h-40" onChange={(e) => handleChange('description', e.target.value)} ></textarea>
                    </div>
                </div>
                <div>
                    <div className="mb-4">
                    <label htmlFor="quantity" className="block">
                        Quantity
                    </label>
                    <input type="number" name="quantity" value={formData.quantity} id="quantity" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-4  border-gray-300 rounded-md border h-[3.4rem]" onChange={(e) => handleChange('quantity', e.target.value)} />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="image" className="block">
                        image
                    </label>
                    <input type="file" name="image" id="image" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-4  border-gray-300 rounded-md" onChange={(e) => handleChange('image', e.target.files[0])} />
                    </div>
                    
                </div>
              </form>
              <div className="flex justify-end border-t-[1px] p-8">
                <button type="button" onClick={toggleModal} className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md mr-2 focus:outline-none hover:bg-gray-400 transition duration-150 ease-in-out drop-shadow-md">Cancel</button>
                <button type="submit" onClick={handleSubmit} className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none hover:bg-indigo-600 transition duration-150 ease-in-out drop-shadow-md">Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddItem;
