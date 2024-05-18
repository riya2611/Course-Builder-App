import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

const ResourceComponent = ({ item, setData, data, setEditFileDialog, setEditFileid, handleDownload }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: item.id,
        data: {
            title: item,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className="bg-gray-100 p-4 hover:bg-gray-300 rounded-md shadow-md flex items-center justify-between"
        >
            <h3 className="text-lg font-medium text-gray-700">{item.title}</h3> {/* Resource title */}
            <div className="flex space-x-2">
                <button
                    className="px-3 py-1 text-sm font-medium text-center text-white bg-green-500 rounded-md hover:bg-green-700 focus:outline-none"
                    onClick={() => handleDownload(item)}
                >
                    Download
                </button>
                <button
                    onClick={() => {
                        const resources = data.resources.filter((i) => i.id !== item.id);
                        setData({ ...data, resources });
                    }}
                    className="px-3 py-1 text-sm font-medium text-center text-white bg-red-500 rounded-md hover:bg-red-700 focus:outline-none"
                >
                    Delete
                </button>
                <button
                    onClick={() => {
                        setEditFileDialog(true);
                        setEditFileid(item.id);
                    }}
                    className="px-3 py-1 text-sm font-medium text-center text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none"
                >
                    Edit Name
                </button>
            </div>
        </div>
    );
};

export default ResourceComponent;
