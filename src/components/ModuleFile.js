import React from 'react'

const ModuleFile = ({ item, data, setData }) => {


    const handleDownload = (item) => {
        const link = document.createElement('a');
        link.href = `data:application/octet-stream;base64,${item.content}`;
        link.download = item.title;
        link.click();
        link.remove();
    };


    return (
        <div
            className="flex items-center gap-2"> {/* Tailwind classes */}
            <h3 className="text-lg font-medium">{item.title}</h3> {/* Resource title */}
            <button
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none"
                onClick={() => handleDownload(item)}
            >
                Download
            </button>
        </div>
    )
}

export default ModuleFile