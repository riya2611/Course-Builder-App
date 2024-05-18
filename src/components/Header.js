import React, { useState, useRef } from 'react'
import AddLinks from './AddLinks';
import AddModule from './AddModule';
import { v4 as uuidv4 } from 'uuid';

const Header = ({ data, setData }) => {
    const [module, setModule] = useState(false);
    const [link, setLink] = useState(false);
    const fileRef = useRef(null)


    const convertAndStore = () => {
        const file = fileRef.current.files[0]
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
                }
                const resources = data.resources;
                resources.push(obj);
                setData({ ...data, resources })
                alert("Successfully uploaded the file.")
            };
            reader.onerror = function (error) {
                console.error('Error:', error);
                alert('Error occurred while converting file to Base64.');
            };
        } else {
            alert('Please select a file.');
        }
    }

    return (
        <header className="flex flex-col p-4  transition-all">
            <div className='flex justify-between p-4 m-2s text-2xl items-center bg-slate-500 rounded-md'>
                <div className='text-3xl font-bold w-[30%]'>
                    <h1>Course Hero</h1>
                </div>
                <div className='text-xl font-bold  w-[40%] flex justify-between items-center '>
                    <button onClick={() => {
                        setLink(false);
                        setModule(!module);
                    }}>Add Module</button>
                    <button onClick={() => {
                        setLink(!link);
                        setModule(false);
                    }}>Add Link</button>
                    <label htmlFor="fileInput" >Add File</label>
                    <input type="file" id='fileInput' hidden onChange={convertAndStore} ref={fileRef} />
                </div>
            </div >
            <div className=' h-[20%] bg-slate-200 m-2 rounded-md p-3'>
                {
                    link && <AddLinks data={data} setData={setData} />
                }
                {
                    module && <AddModule data={data} setData={setData} />
                }
            </div>
        </header>
    )
}

export default Header