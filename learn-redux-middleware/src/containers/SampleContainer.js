import {connect} from 'react-redux';
import Sample from '../components/Sample';
import { getPost, getUsers } from '../modules/sample';
import React from 'react';
import loading from '../modules/loading';

const {useEffect} = React;
const SampleContainer = ({
    getPost,
    getUsers,
    post,
    users,
    loadingPost,
    loadingUsers
}) => {
    useEffect(() => {
    // useEffect에 파라미터로 넣는 함수는 async로 할 수 없기 때문에
    // 그 내부에서 async 함수를 선언하고 호출해 줍니다.
    const fn = async () =>{
        try{
            await getPost(1);
            await getUsers(1);
        } catch (e) {
            console.log(e);
        }
    };
    fn();
    }, [getPost, getUsers]
    );
    <Sample
        post={post}
        users={users}
        loadingPost={loadingPost}
        loadingUsers={loadingUsers}
        />
};

export default connect(
    ({sample}) => ({
        post: sample.post,
        users: sample.users,
        loadingPost: loading['sample/GET_POST'],
        loadingUsers: loading('sample/GET_USERS')
    }),
    {
        getPost,
        getUsers
    }
)(SampleContainer);