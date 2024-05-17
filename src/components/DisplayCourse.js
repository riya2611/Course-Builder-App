import React, { useState } from 'react';

const DisplayCourse = ({ data, setData }) => {
    // for editing name
    const [editName, setEditName] = useState(false)
    const [editid, setEditid] = useState(-1);
    const [newName, setNewName] = useState("");

    // for editing url
    const [editLinkDialog, setEditLinkDialog] = useState(false);
    const [editLinkid, setEditLinkid] = useState(-1);
    const [editLinkUrl, setEditLinkUrl] = useState("");
    const [editLinkName, setEditLinkName] = useState("");

    // For Resources
    const [editFileDialog, setEditFileDialog] = useState(false);
    const [editFileid, setEditFileid] = useState(-1);
    const [editFileName, setEditFileName] = useState("");

    const SubmitEditName = (e) => {
        e.preventDefault();
        const modules = data.modules.map((item, ind) => {
            if (ind === editid) {
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
        const links = data.links.map((item, ind) => {
            if (ind === editLinkid) {
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
        const resources = data.resources.map((item, ind) => {
            if (ind === editFileid) {
                item.title = editFileName;
            }
            return item;
        })
        setData({ ...data, resources })
        setEditFileDialog(false);
        setEditFileName("");
        setEditFileid(-1);
    }

    return (
        <div className="container mx-auto px-4 py-8"> {/* Tailwind classes */}
            <h1 className="text-2xl font-bold mb-4">My Course</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Tailwind classes */}
                <dialog open={editName}>
                    <div>
                        <form onSubmit={SubmitEditName}>
                            <input type="text" placeholder='New name for module ' value={newName} onChange={(e) => { setNewName(e.target.value) }} />
                            <button type='submit'>Submit</button>
                            <button onClick={() => { setEditName(false); setEditid(-1); setNewName(""); }}>Cancel</button>
                        </form>
                    </div>
                </dialog>
                {
                    data.modules.map((item, ind) => (
                        <div key={ind} className="bg-white rounded-lg p-4 shadow-md"> {/* Tailwind classes */}
                            <h2 className="text-xl font-bold mb-2">{item.title}</h2> {/* Module title */}
                            <button onClick={() => {
                                setEditName(true);
                                setEditid(ind);
                            }}>Edit module name</button>
                            <button onClick={() => {
                                const modules = data.modules.filter((item, i) => i !== ind);
                                setData({ ...data, modules })
                            }}>Delete module</button>
                        </div>
                    ))
                }
            </div >


            <h2 className="text-xl font-bold mt-8">Links</h2> {/* Section header for links */}
            <div className="flex flex-wrap gap-2"> {/* Tailwind classes */}
                {data.links.map((item, ind) => (
                    <div key={ind}>
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
                                    setEditLinkid(-1);
                                }}>Cancel</button>
                                <button type='submit'>Submit</button>
                            </form>
                        </dialog>
                        <button
                            key={ind}
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
                        <button onClick={() => { setEditLinkDialog(true); setEditLinkid(ind) }}>Edit</button>
                        <button onClick={() => {
                            const links = data.links.filter((item, i) => i !== ind);
                            setData({ ...data, links })
                        }}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            <h2 className="text-xl font-bold mt-8">Resources</h2> {/* Section header for resources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Tailwind classes */}
                <dialog open={editFileDialog}>
                    <form onSubmit={handleEditFileName}>
                        <label htmlFor="FileName">New file name</label>
                        <input type="text" placeholder='Enter the name of file' value={editFileName} onChange={(e) => setEditFileName(e.target.value)} />
                        <button type='submit'>Submit</button>
                        <button onClick={() => {
                            setEditFileDialog(false);
                            setEditFileName("");
                            setEditFileid(-1);
                        }}>Cancel</button>
                    </form>
                </dialog>
                {data.resources.map((item, ind) => (
                    <div key={ind} className="flex items-center gap-2"> {/* Tailwind classes */}
                        <h3 className="text-lg font-medium">{item.title}</h3> {/* Resource title */}
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none"
                            onClick={() => handleDownload(item)}
                        >
                            Download
                        </button>
                        <button onClick={() => {
                            const resources = data.resources.filter((item, i) =>
                                i !== ind
                            )
                            setData({ ...data, resources })
                        }}>
                            delete
                        </button>
                        <button onClick={() => {
                            setEditFileDialog(true);
                            setEditFileid(ind);
                        }}>
                            Edit Name
                        </button>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default DisplayCourse;