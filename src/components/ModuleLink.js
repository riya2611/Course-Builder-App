import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

const ModuleLink = ({ item, data, setData, setLinkDialog, setLinkItem }) => {

    const sortable = useSortable({
        id: item.id, data: {
            title: item
        }
    });


    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: item.id,
        data: {
            title: item
        }
    })

    const style = {
        transform: CSS.Translate.toString(transform)
    }
    const style1 = {
        transition: sortable.transition,
        transform: CSS.Translate.toString(sortable.transform)
    }


    return (
        <div ref={sortable.setNodeRef} {...sortable.attributes} {...sortable.listeners} style={style1}>
            <div 
            className='flex items-center gap-2 bg-gray-100 mt-2 rounded-md' ref={setNodeRef} style={style} {...attributes} {...listeners}>
                <button
                    className="text-left focus:outline-none px-4 py-2 text-lg font-medium hover:text-blue-500"
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

                <button 
                className="px-3 py-1 text-sm font-medium text-center text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none" 
                onClick={() => {
                    setLinkDialog(true);
                    setLinkItem(item);
                }}>
                    Edit
                </button>
                
                <button 
                className="px-3 py-1 text-sm font-medium text-center text-white bg-red-500 rounded-md hover:bg-red-700 focus:outline-none"
                onClick={
                    () => {
                        const modules = data.modules.map((i) => {
                            if (item.pid === i.id) {
                                const content = i.content.filter((it) => it.id !== item.id);
                                i.content = content;
                            }
                            return i;
                        })
                        setData({ ...data, modules });
                    }
                }>
                    Delete
                </button>

                
            </div>
        </div>
    )
}

export default ModuleLink