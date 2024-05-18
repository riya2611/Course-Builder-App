import React from 'react'

const ModuleLink = ({ item, data, setData }) => {
    return (
        <div className='bg-slate-400 m-2 p-2 text-2xl'>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                onClick={() => {
                    if (!item.url.startsWith('https://')) {
                        window.location.href = `https://${item.url}`;
                    } else {
                        window.location.href = item.url;
                    }
                }}
            >
                {item.title}
            </button>

        </div>
    )
}

export default ModuleLink