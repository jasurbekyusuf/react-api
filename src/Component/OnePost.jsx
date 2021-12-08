import React, {useEffect, useState} from 'react';
import {doGet} from "../Service";


function OnePost({match}) {
    const [onePost, setOnePost] = useState('')
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState('')
    useEffect(() => {
        const id = match.params.id
        PostSelect(id)
    }, [])

    async function PostSelect(id) {
        const one = await doGet('posts/' + id)
        setOnePost(one)
        setLoading(true)
        const oneUser = await doGet('users/' + one.userId)
        setUsers(oneUser)
        console.log(oneUser)
    }

    return (
        <div>
            {
                loading ? <div className={'row mt-5'}>
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-header">
                                <h5>{users.name}</h5>
                            </div>
                            <div className="card-body">
                                {users.phone}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-header">{onePost.title}</div>
                            <div className="card-body">
                                {onePost.body}
                            </div>
                        </div>
                    </div>
                </div> : "loading"
            }
        </div>
    );
}

export default OnePost;