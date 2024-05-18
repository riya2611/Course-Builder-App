import React, { useState, useRef } from 'react';
import AddLinks from './AddLinks';
import AddModule from './AddModule';
import { v4 as uuidv4 } from 'uuid';

const Header = ({ data, setData }) => {
    const [module, setModule] = useState(false);
    const [link, setLink] = useState(false);
    const fileRef = useRef(null);

    const convertAndStore = () => {
        const file = fileRef.current.files[0];
        if (file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                var base64String = reader.result.split(',')[1];
                const obj = {
                    id: uuidv4(),
                    title: fileRef.current.files[0].name,
                    type: "file",
                    content: base64String
                };
                const resources = data.resources;
                resources.push(obj);
                setData({ ...data, resources });
                alert("Successfully uploaded the file.");
            };
            reader.onerror = function (error) {
                console.error('Error:', error);
                alert('Error occurred while converting file to Base64.');
            };
        } else {
            alert('Please select a file.');
        }
    };

    return (
        <header className="flex flex-col p-4 transition-all"> {/* Tailwind classes */}
            <div className='flex justify-between p-4 m-2s text-2xl items-center rounded-md'> {/* Tailwind classes */}
                
                <div className='text-3xl font-bold w-[30%] flex flex-col'>
                <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8XSwRcPlG2NcFHQKCSveShD17VW1O3XvrNxQrBMldOA&s" height="auto" width="50px" alt='logo'></img>
                <h1 className='font-bold'> Course Builder</h1>
                </div>
                
                <div className='text-lg font-bold  w-[40%] flex justify-between items-center '> {/* Tailwind classes */}
                    <button onClick={() => {
                        setLink(false);
                        setModule(!module);
                    }} className="px-4 py-2 bg-black  font-semibold hover:bg-slate-200 hover:text-black rounded-md text-white"> {/* Tailwind classes */}
                        Add Module
                    </button>

                    <button onClick={() => {
                        setLink(!link);
                        setModule(false);
                    }} className="px-4 py-2 bg-black font-semibold hover:bg-slate-200 hover:text-black rounded-md text-white"> {/* Tailwind classes */}
                        Add Link
                    </button>

                    <label htmlFor="fileInput" className="px-4 py-2 bg-black font-semibold hover:bg-slate-200 hover:text-black rounded-md text-white cursor-pointer"> {/* Tailwind classes */}
                        Add File
                    </label>

                    <input type="file" id='fileInput' hidden onChange={convertAndStore} ref={fileRef} />
                </div>
            </div>
            <div className=' h-[20%] bg-gray-200 rounded-md p-1.5'> {/* Tailwind classes */}
                {
                    link && <AddLinks data={data} setData={setData} />
                }
                {
                    module && <AddModule data={data} setData={setData} />
                }
            </div>
        </header>
    );
};

export default Header;
