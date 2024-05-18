import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddLinks = ({ data, setData }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title !== '' && url !== '') {
      const obj = {
        id: uuidv4(),
        title,
        type: 'link',
        url,
      };
      const links = data.links;
      links.push(obj);
      setData({ ...data, links });
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-xl font-bold">Add a Link</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <label htmlFor="linkName" className="text-sm font-medium">
          Enter the name of the link:
        </label>
        <input
          type="text"
          id="linkName"
          placeholder="Enter the name of the link"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <label htmlFor="LinkUrl" className="text-sm font-medium">
          Enter the URL:
        </label>
        <input
          type="text"
          id="LinkUrl"
          value={url}
          placeholder="Enter the Url of the link"
          onChange={(e) => setUrl(e.target.value)}
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <div className="flex space-x-2">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
            Create
          </button>
          <button type="button" className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLinks;