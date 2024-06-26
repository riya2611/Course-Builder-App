import React, { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

const ModuleFile = ({ item, data, setData, setFileDialog, setEditModuleFileName, editModuleFileName, setmyItem }) => {
    const sortable = useSortable({
        id: item.id, data: {
            title: item
        }
    });


    const style1 = {
        transition: sortable.transition,
        transform: CSS.Translate.toString(sortable.transform)
    }
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: item.id,
        data: {
            title: item
        }
    })

    const style = {
        transform: CSS.Translate.toString(transform)
    }


    const handleDownload = (item) => {
        const link = document.createElement('a');
        link.href = `data:application/octet-stream;base64,${item.content}`;
        link.download = item.title;
        link.click();
        link.remove();
    };

    // File States



    return (
        <div ref={sortable.setNodeRef} {...sortable.attributes} {...sortable.listeners} style={style1}>

            <div
                className="flex items-center gap-2 bg-gray-100 mt-3 p-1 rounded-md" ref={setNodeRef} {...attributes} {...listeners} style={style}> {/* Tailwind classes */}
                <h3 className="text-lg font-medium">{item.title}</h3> {/* Resource title */}
                <button
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none"
                    onClick={() => handleDownload(item)}
                >
                    Download
                </button>

                <button
                className="px-3 py-1 text-sm font-medium text-center text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none" 
                onClick={() => { setFileDialog(true); setmyItem(item) }}>Edit</button>

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

export default ModuleFile