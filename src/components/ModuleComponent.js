import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react'
import ModuleFile from './ModuleFile';
import ModuleLink from './ModuleLink';


const ModuleComponent = ({ item, data, setData, setEditid, setEditName }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: item.id, data: {
            title: item
        }
    });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} > {/* Tailwind classes */}
            <div className='bg-slate-200 m-2'>
                <h2 className="text-xl font-bold mb-2">{item.title}</h2> {/* Module title */}
                <button onClick={() => {
                    setEditName(true);
                    setEditid(item.id);
                }}>Edit module name</button>
                <button onClick={() => {
                    const modules = data.modules.filter((i) => i.id !== item.id);
                    setData({ ...data, modules })
                }} className='h-20 bg-red-400 w-50'>Delete module</button>
            </div>
            <div className='w-[50%] flex flex-col'>
                <p>Hey</p>
                {item.content.map((item) => {
                    if (item.type === "mfile") {
                        return <ModuleFile key={item.id} item={item} data={data} setData={setData} />
                    } else if (item.type === "mlink") {
                        return <ModuleLink key={item.id} item={item} data={data} setData={setData} />
                    }
                })}
            </div>
        </div>
    )
}

export default ModuleComponent