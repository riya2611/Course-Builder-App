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
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} className='bg-slate-400 m-2 p-2 text-2xl'>
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
            <button onClick={() => { setEditLinkDialog(true); setEditLinkid(item.id) }}>Edit</button>
            <button onClick={() => {
                const links = data.links.filter((i) => i.id !== item.id);
                setData({ ...data, links })
            }}>
                Delete
            </button>
        </div>
    )
}

export default LinkComponent