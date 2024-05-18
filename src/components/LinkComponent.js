import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

const LinkComponent = ({ item, data, setData, setEditLinkDialog, setEditLinkid }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: item.id,
        data: {
            title: item
        }
    })

    const style = {
        transform: CSS.Translate.toString(transform)
    }

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className='flex justify-between items-center p-2 rounded-md bg-gray-200 shadow-md hover:bg-gray-300'
        >
            <button
                className="text-left focus:outline-none px-4 py-2 text-lg font-medium text-gray-700 hover:text-blue-500"
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
            <div className="flex space-x-2">
                <button onClick={() => { setEditLinkDialog(true); setEditLinkid(item.id) }} className="px-3 py-1 text-sm font-medium text-center text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none">Edit</button>
                <button onClick={() => {
                    const links = data.links.filter((i) => i.id !== item.id);
                    setData({ ...data, links })
                }} className="px-3 py-1 text-sm font-medium text-center text-white bg-red-500 rounded-md hover:bg-red-700 focus:outline-none">Delete</button>
            </div>
        </div>
    )
}

export default LinkComponent;
