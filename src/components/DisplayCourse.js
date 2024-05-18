import { DndContext, closestCenter, closestCorners } from '@dnd-kit/core';
import React, { useState } from 'react';
import ModuleComponent from './ModuleComponent';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import LinkComponent from './LinkComponent';
import ResourceComponent from './ResourceComponent';

const DisplayCourse = ({ data, setData }) => {
    // for editing name
    const [editName, setEditName] = useState(false)
    const [editid, setEditid] = useState("");
    const [newName, setNewName] = useState("");

    // for editing url
    const [editLinkDialog, setEditLinkDialog] = useState(false);
    const [editLinkid, setEditLinkid] = useState("");
    const [editLinkUrl, setEditLinkUrl] = useState("");
    const [editLinkName, setEditLinkName] = useState("");

    // For Resources
    const [editFileDialog, setEditFileDialog] = useState(false);
    const [editFileid, setEditFileid] = useState("");
    const [editFileName, setEditFileName] = useState("");

    const SubmitEditName = (e) => {
        e.preventDefault();
        const modules = data.modules.map((item) => {
            if (item.id === editid) {
                item.title = newName;
            }
            return item;
        });
        setData({ ...data, modules });
        setNewName("");
        setEditName(false);
        setEditid(-1);
    }

    const handleDownload = (item) => {
        const link = document.createElement('a');
        link.href = `data:application/octet-stream;base64,${item.content}`;
        link.download = item.title;
        link.click();
        link.remove();
    };

    const HandleEditLinkName = (e) => {
        e.preventDefault();
        const links = data.links.map((item) => {
            if (item.id === editLinkid) {
                item.title = editLinkName;
                item.url = editLinkUrl
            }
            return item;
        });
        setData({ ...data, links });
        setEditLinkDialog(false);
        setEditLinkName("");
        setEditLinkUrl("");
        setEditLinkid(-1);
    }

    const handleEditFileName = (e) => {
        e.preventDefault();
        const resources = data.resources.map((item) => {
            if (item.id === editFileid) {
                item.title = editFileName;
            }
            return item;
        })
        setData({ ...data, resources })
        setEditFileDialog(false);
        setEditFileName("");
        setEditFileid(-1);
    }

    const onDragEnd = (event) => {
        console.log(event);
        const { active, over } = event;
        const myactive = active?.data?.current?.title;
        const myover = over?.data?.current?.title;
        if (active === null || over === null || myactive === null || myover === null) return;

        if (myactive.type === "module" && myover.type === "module") {
            if (active.id === over.id) return;

            const oldIndex = data.modules.findIndex((item) => item.id === active.id);
            const newIndex = data.modules.findIndex((item) => item.id === over.id);
            const modules = arrayMove(data.modules, oldIndex, newIndex);
            setData({ ...data, modules })
            return
        }
        if (myactive.type === "file" && (myover.type === "module")) {
            myactive.type = "mfile";
            myactive.pid = myover.id
            const modules = data.modules.map((item) => {
                if (item.id === myover.id) {
                    item.content.push(myactive);
                }
                return item;
            })

            const resources = data.resources.filter((item) => item.id !== myactive.id);
            setData({ ...data, modules, resources })
            return;
        }

        if (myactive.type === "link" && myover.type === "module") {
            myactive.type = "mlink";
            myactive.pid = myover.id;
            const modules = data.modules.map((item) => {
                if (item.id === myover.id) {
                    item.content.push(myactive);
                }
                return item;
            })

            const links = data.links.filter((item) => item.id !== myactive.id);
            setData({ ...data, modules, links })
            return;
        }


        if ((myactive.type === "mfile" || myactive.type === 'mlink') && (myover.type === "mfile" || myover.type === "mlink")) {
            if (myactive.pid !== myover.pid) {
                alert("Cannot be swapped outside modules");
                return;
            }
            console.log("Swapping in progress")
            const modules = data.modules.map((item) => {
                if (item.id === myactive.pid) {
                    const oldIndex = item.content.findIndex((item) => item.id === active.id);
                    const newIndex = item.content.findIndex((item) => item.id === over.id);
                    const content = arrayMove(item.content, oldIndex, newIndex);
                    item.content = content;
                }
                return item;
            });
            setData({ ...data, modules })

        }

    }

    // module file name edit
    const [fileDialog, setFileDialog] = useState(false);
    const [editModuleFileName, setEditModuleFileName] = useState("");
    const [myItem, setmyItem] = useState({});

    // module link edit
    const [linkDialog, setLinkDialog] = useState(false);
    const [moduleUrl, setModuleUrl] = useState("");
    const [moduleUrlName, setModuleUrlName] = useState("");
    const [linkItem, setLinkItem] = useState({})



    const handleEditModuleFileName = (e) => {

        e.preventDefault();
        const modules = data.modules.map((i) => {
            if (i.id === myItem.pid) {
                const content = i.content.map((it) => {
                    if (it.id === myItem.id) {
                        it.title = editModuleFileName;
                    }
                    return it;
                })
                i.content = content;
            }
            return i;
        })
        setData({ ...data, modules })
        setFileDialog(false);
        setEditModuleFileName("");
        setmyItem({});
    }

    const HandleEditModuleLink = (e) => {
        e.preventDefault();
        const modules = data.modules.map((i) => {
            if (i.id === linkItem.pid) {
                const content = i.content.map((it) => {
                    if (it.id === linkItem.id) {
                        it.title = moduleUrlName;
                        it.url = moduleUrl;
                    }
                    return it;
                })
                i.content = content;
            }
            return i;
        })
        setData({ ...data, modules })
        setLinkDialog(false);
        setModuleUrl("");
        setLinkItem({});
        setModuleUrlName("")
    }
    return (
        <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
            <div className="container mx-auto px-4 py-8"> {/* Tailwind classes */}
                <h1 className="text-2xl font-bold mb-4">My Course</h1>
                <div className="flex flex-col w-full min-h-[50vh]"> {/* Tailwind classes */}
                    <dialog open={editName}>
                        <div>
                            <form onSubmit={SubmitEditName}>
                                <input type="text" placeholder='New name for module ' value={newName} onChange={(e) => { setNewName(e.target.value) }} />
                                <button type='submit'>Submit</button>
                                <button onClick={() => { setEditName(false); setEditid(""); setNewName(""); }}>Cancel</button>
                            </form>
                        </div>
                    </dialog>

                    <dialog open={fileDialog} className=''>
                        <form onSubmit={handleEditModuleFileName}>
                            <label htmlFor="FileName">New file name</label>
                            <input type="text" placeholder='Enter the name of file' value={editModuleFileName} onChange={(e) => setEditModuleFileName(e.target.value)} />
                            <button type='submit'>Submit</button>
                            <button onClick={() => {
                                setFileDialog(false);
                                setEditModuleFileName("");
                            }}>Cancel</button>
                        </form>
                    </dialog>

                    <dialog open={linkDialog}>
                        <form onSubmit={HandleEditModuleLink}>
                            <label htmlFor="url">Enter url</label>
                            <input type="text" id='url' value={moduleUrl} onChange={(e) => setModuleUrl(e.target.value)} />
                            <label htmlFor="name">Enter link name : </label>
                            <input type="text" id='name' value={moduleUrlName} onChange={(e) => setModuleUrlName(e.target.value)} />
                            <button onClick={() => {
                                setLinkDialog(false);
                                setModuleUrl("");
                                setModuleUrlName("");
                                setLinkItem({});
                            }}>Cancel</button>
                            <button type='submit'>Submit</button>
                        </form>
                    </dialog>

                    <SortableContext items={data.modules} strategy={verticalListSortingStrategy} className="flex flex-col items-center min-h-[50vh]">
                        {data.modules.map((item) => (
                            <ModuleComponent key={item.id} item={item} data={data} setData={setData} setEditid={setEditid} setEditName={setEditName} setFileDialog={setFileDialog} setmyItem={setmyItem}
                                setLinkDialog={setLinkDialog} setLinkItem={setLinkItem}
                            />
                        ))}
                    </SortableContext>

                </div >


                <h2 className="text-xl font-bold mt-8">Links</h2> {/* Section header for links */}
                <div className="flex flex-wrap gap-2 flex-col min-h-[50vh]"> {/* Tailwind classes */}
                    <dialog open={editLinkDialog}>
                        <form onSubmit={HandleEditLinkName}>
                            <label htmlFor="name">Enter link name : </label>
                            <input type="text" id='name' value={editLinkName} onChange={(e) => setEditLinkName(e.target.value)} />
                            <label htmlFor="url">Enter url</label>
                            <input type="text" id='url' value={editLinkUrl} onChange={(e) => setEditLinkUrl(e.target.value)} />
                            <button onClick={() => {
                                setEditLinkDialog(false);
                                setEditLinkName("");
                                setEditLinkUrl("");
                                setEditLinkid("");
                            }}>Cancel</button>
                            <button type='submit'>Submit</button>
                        </form>
                    </dialog>
                    {data.links.map((item) => (
                        <LinkComponent key={item.id}
                            item={item} data={data} setData={setData} setEditLinkDialog={setEditLinkDialog} setEditLinkid={setEditLinkid} />
                    ))}
                </div>

                <h2 className="text-xl font-bold mt-8">Resources</h2> {/* Section header for resources */}
                <div className="flex flex-col "> {/* Tailwind classes */}
                    <dialog open={editFileDialog}>
                        <form onSubmit={handleEditFileName}>
                            <label htmlFor="FileName">New file name</label>
                            <input type="text" placeholder='Enter the name of file' value={editFileName} onChange={(e) => setEditFileName(e.target.value)} />
                            <button type='submit'>Submit</button>
                            <button onClick={() => {
                                setEditFileDialog(false);
                                setEditFileName("");
                                setEditFileid("");
                            }}>Cancel</button>
                        </form>
                    </dialog>
                    {data.resources.map((item) => (
                        <ResourceComponent key={item.id} item={item} data={data} setData={setData} handleDownload={handleDownload} setEditFileDialog={setEditFileDialog} setEditFileid={setEditFileid} />
                    ))}
                </div>
            </div >
        </DndContext>
    );
};


export default DisplayCourse;