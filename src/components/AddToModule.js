import { useDroppable } from '@dnd-kit/core'
import React from 'react'

const AddToModule = () => {
    const { setNodeRef } = useDroppable({ id: "drop" })
    return (
        <div ref={setNodeRef}>
            <div className='m-2 p-2 bg-red-400'>
                Add Here
            </div>
        </div>
    )
}

export default AddToModule