import { useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import ModuleFile from './ModuleFile';
import ModuleLink from './ModuleLink';
import { SortableContext } from '@dnd-kit/sortable';

const ModuleComponent = ({ item, data, setData, setEditid, setEditName, setFileDialog, setmyItem, setLinkItem, setLinkDialog }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: item.id,
        data: {
            title: item,
        },
    });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className="bg-gray-200 hover:bg-gray-300 rounded-md shadow-md p-4 mb-4"
        >
            <div className="flex justify-between  items-center mb-2">
                <h2 className="text-xl font-bold">{item.title}</h2> {/* Module title */}
                <div className="flex space-x-2">
                    <button
                        onClick={() => {
                            setEditName(true);
                            setEditid(item.id);
                        }}
                        className="px-3 py-1 text-sm font-medium text-center text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none"
                    >
                        Edit Name
                    </button>
                    <button
                        onClick={() => {
                            const modules = data.modules.filter((i) => i.id !== item.id);
                            setData({ ...data, modules });
                        }}
                        className="px-3 py-1 text-sm font-medium text-center text-white bg-red-500 rounded-md hover:bg-red-700 focus:outline-none"
                    >
                        Delete Module
                    </button>
                </div>
            </div>
            <div className="flex flex-col">
                <SortableContext items={item.content} strategy={verticalListSortingStrategy}>
                    {item.content.map((i) => (
                        <div key={i.id}>
                            {i.type === 'mfile' ? (
                                <ModuleFile
                                    key={i.id}
                                    item={i}
                                    data={data}
                                    setData={setData}
                                    setFileDialog={setFileDialog}
                                    setmyItem={setmyItem}
                                />
                            ) : (
                                <ModuleLink
                                    key={i.id}
                                    item={i}
                                    data={data}
                                    setData={setData}
                                    setLinkDialog={setLinkDialog}
                                    setLinkItem={setLinkItem}
                                />
                            )}
                        </div>
                    ))}
                </SortableContext>
            </div>
        </div>
    );
};

export default ModuleComponent;
