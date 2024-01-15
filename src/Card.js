import React from 'react';
import './Card.css';

const Card = () => {
    return (
        <div className='form-container'>
            <form className='form'>
            <div className='form-group'>
                <label>Title</label>
                <input type='text' id='title' name='title' required='yes'></input>
            </div>
            <div className='form-group'>
                <label>Description</label>
                <textarea name='textarea' id='textarea' rows='10' cols='50' required=''></textarea>
            </div>
            <div className='form-group'>
                <label>Priority</label>
                <input type='text' id='Priority' name='Priority' required='yes'></input>
            </div>
            <button className='form-submit-btn' type='submit'>Add</button>
            </form>
        </div>
    );
}

export default Card;
