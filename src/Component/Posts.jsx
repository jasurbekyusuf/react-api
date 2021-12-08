import React, {useEffect, useState} from 'react';
import {doGet, doPost} from "../Service";
import SelectUser from "./SelectUser";
import PostModal from "./PostModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Posts(props) {
    const [posts, setPosts] = useState([])
    const [data, setData] = useState([])
    const [modalVisible,setModalVisible]=useState(false)
    const [loading,setLoading]=useState(false)
    const [user,setUser]=useState(false)

    async function postService() {
        const res = await doGet('posts')
        setPosts(res)
        setData(res)
    }

    function selectPosts(id) {
        props.history.push('/posts/' + id)
    }

    useEffect(() => {
        postService()
    }, [])

    function filter(userId) {
        return  data.filter(item => item.userId == userId || userId === '')
    }


    function onchangeUserSelect(userId){
        let res = filter(userId)
        setPosts(res)
    }
    function toggleModal(){
        setModalVisible(prev=>!prev)
    }
    async function savePost(data){
        const  res=await doPost('posts',data)
        setData(prev=>{
            prev.unshift(res)
            setData(prev)
            return prev
        })
        toast("Ma'lumot saqlandi")
        setLoading(false)
    }
    const saveFunc=(data)=>{
       data.user=user
        savePost(data)
        toggleModal()
        setLoading(true)
    }
    function changeUser(id){
        setUser(id)
    }

    return (
        <div>
            <ToastContainer/>
            <div className="row">
               
                <div className="col-md-3 mt-4">
                    <SelectUser onChange={onchangeUserSelect} />
                </div>
                <div className="col-md-3 mt-4"><button className={'btn float-end btn-success'} onClick={toggleModal}>Add users</button></div>
            </div>
            <div className={'row mt-5'}>
                {
                    posts.map((item, index) => {
                        return <div className={'col-md-3'} key={item.id}>
                            <div className="card post-card" onClick={() => selectPosts(item.id)}>
                                <div className="card-header bg-dark text-white">
                                    {item.title}
                                </div>
                                <div className="card-body">
                                    {item.body}
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
            <PostModal loading={loading} changeUser={changeUser} isOpen={modalVisible} save={saveFunc} toggle={toggleModal} />
        </div>
    );
}

export default Posts;