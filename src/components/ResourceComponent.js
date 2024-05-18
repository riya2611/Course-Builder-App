import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

const ResourceComponent = ({ item, setData, data, setEditFileDialog, setEditFileid, handleDownload }) => {
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
            ref={setNodeRef} {...attributes} {...listeners} style={style}
            className="flex items-center gap-2"> {/* Tailwind classes */}
            <h3 className="text-lg font-medium">{item.title}</h3> {/* Resource title */}
            <button
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none"
                onClick={() => handleDownload(item)}
            >
                Download
            </button>
            <button onClick={() => {
                const resources = data.resources.filter((i) =>
                    i.id !== item.id
                )
                setData({ ...data, resources })
            }}>
                delete
            </button>
            <button onClick={() => {
                setEditFileDialog(true);
                setEditFileid(item.id);
            }}>
                Edit Name
            </button>
        </div>
    )
}

export default ResourceComponent