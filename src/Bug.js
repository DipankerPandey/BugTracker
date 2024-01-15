import React from 'react';
import './Bug.css';

const Bug = (props) => {
    const {title, description, priority, id} = props
    return (
        <div className='bug-container'>
            <bug className='bug'>
            <div className='bug-group'>
                <label>Title</label>
                <label>{title}</label>
            </div>
            <div className='bug-group'>
                <label>Description</label>
                <label>{description}</label>            
            </div>
            <div className='bug-group'>
                <label>Priority</label>
                <label>{priority}</label>
            </div>
            <button className='bug-submit-btn' type='submit'>Solved</button>
            </bug>
        </div>
    );
}

export default Bug;
