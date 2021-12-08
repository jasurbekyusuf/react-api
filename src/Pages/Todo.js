import React, {useState} from 'react';

function Todo({item}) {
    const changeBoolean = (event) => {

    }
    return (
        <div className={'row mt-3'}>
            <div className="col-md-1">
                <input className={'todo-check'} checked={item.completed} onChange={changeBoolean}
                       id={'checked/' + item.id} type="checkbox"/>
            </div>
            <div className="col-md-4">
                <label htmlFor={'checked/' + item.id}><h5>{item.title}</h5></label>
            </div>
        </div>
    );
}

export default Todo;