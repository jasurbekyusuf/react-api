import React from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import SelectUser from "./SelectUser";
import {useForm} from 'react-hook-form'


function PostModal({isOpen,toggle,save,changeUser,loading}) {
    const { register, handleSubmit } = useForm();

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader>
                    Add users
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(save)}  id={'form-post'}>
                        <input  placeholder={'title'} className={'form-control my-2'} type="text" {...register('title')} />
                        <SelectUser onChange={changeUser}  name={'user'} />
                        <textarea  placeholder={'body'} className={'form-control my-2'} {...register('body')} type="text"/>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button form={'form-post'} disabled={loading} className={'btn btn-success'}>Save</button>
                    <button onClick={toggle} className={'btn btn-danger'}>Cancel</button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default PostModal;