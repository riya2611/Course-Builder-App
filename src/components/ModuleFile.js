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
                className="flex items-center gap-2" ref={setNodeRef} {...attributes} {...listeners} style={style}> {/* Tailwind classes */}
                <h3 className="text-lg font-medium">{item.title}</h3> {/* Resource title */}
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none"
                    onClick={() => handleDownload(item)}
                >
                    Download
                </button>
                <button onClick={
                    () => {
                        const modules = data.modules((i) => {
                            if (item.pid === i.id) {
                                const content = i.content.filter((it) => it.id !== item.id);
                                item.content = content;
                            }
                            return i;
                        })
                        setData({ ...data, modules });
                    }
                }>
                    Delete
                </button>
                <button onClick={() => { setFileDialog(true); setmyItem(item) }}>Edit Name</button>
            </div>
        </div>
    )
}

export default ModuleFile