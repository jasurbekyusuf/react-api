import React, {useEffect, useState} from 'react';
import {doGet} from "../Service";


function Users(props) {
    const [users, setUsers] = useState([])

    async function userService() {
        const res = await doGet('users')
        setUsers(res)

    }

    useEffect(() => {
        userService()
    }, [])
    return (
        <div className={'row mt-5'}>
        <div className="col-md-12">
            <table className={'table table-bordered table-striped table-active table-hover'}>
                <thead>
                <tr>
                    <th>T/r</th>
                    <th>Name</th>
                    <th>userName</th>
                    <th>email</th>
                    <th>address</th>
                    <th>city</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map(item=>{
                        return <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.address.street}</td>
                            <td>{item.address.city}</td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default Users;