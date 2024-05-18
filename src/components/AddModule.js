import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddModule = ({ data, setData }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title !== '') {
            const obj = {
                id: uuidv4(),
                title,
                type: 'module',
                content: [],
            };
            const modules = data.modules;
            modules.push(obj);
            setData({ ...data, modules });
        }
    };

    return (
        <div className="flex flex-col items-center p-4 rounded-lg shadow-md bg-gray-100 text-black"> {/* Tailwind classes */}
            <h1 className="text-2xl font-bold text-center">Create New Module</h1> {/* Centered heading */}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full"> {/* Tailwind classes */}
                <div className="flex items-center space-x-4"> {/* Tailwind classes */}
                    <label htmlFor="module" className="text-xl font-bold">Module Name:</label>
                    <input
                        type="text"
                        id="module"
                        placeholder="Enter the name of the module"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-md p-2 text-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="flex space-x-2 justify-end"> {/* Justify buttons to the end */}
                    <button type="submit" className="px-4 py-2 border border-gray-300 rounded-md font-normal hover:bg-blue-500 hover:border-gray-800">
                        Create
                    </button>
                    <button type="button" className="px-4 py-2 border border-gray-300 rounded-md font-normal hover:bg-red-500  hover:border-gray-800">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};
export default AddModule;
