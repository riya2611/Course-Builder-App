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
            <div className='bg-slate-400 m-2 p-2 text-2xl' ref={setNodeRef} style={style} {...attributes} {...listeners}>
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
                <button onClick={
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
                } className='m-2 p-2 bg-red-300'>
                    Delete
                </button>

                <button onClick={() => {
                    setLinkDialog(true);
                    setLinkItem(item);
                }}>
                    Edit
                </button>
            </div>
        </div>
    )
}

export default ModuleLink