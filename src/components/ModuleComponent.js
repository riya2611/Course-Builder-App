import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react'

const ModuleComponent = ({ item, data, setData, setEditid, setEditName }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} > {/* Tailwind classes */}
            <div>
                <h2 className="text-xl font-bold mb-2">{item.title}</h2> {/* Module title */}
                <button onClick={() => {
                    setEditName(true);
                    setEditid(item.id);
                }}>Edit module name</button>
                <button onClick={() => {
                    const modules = data.modules.filter((i) => i.id !== item.id);
                    setData({ ...data, modules })
                }}>Delete module</button>
            </div>
            <div>
                {item.content.map((item) => {
                    return item;
                })}
            </div>
        </div>
    )
}

export default ModuleComponent