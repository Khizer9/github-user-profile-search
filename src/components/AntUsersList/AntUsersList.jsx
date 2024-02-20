import React, { useEffect, useState } from 'react';
import { Avatar, List, Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGithubUsers } from '../../redux/reducers/githubUserReducer';
import SingleProfileModal from '../SingleProfileModal/SingleProfileModal';

const count = 3;

const AntUsersList = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(state => state.user);
        
    const userObject = users ? Object.fromEntries(Object.entries(users)) : {};
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [singleProfileData, setSingleProfileData] = useState([])

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        dispatch(fetchGithubUsers());
    }, [dispatch]);

    const handleSingleProfileData = (singleProfData) => {
        setSingleProfileData(singleProfData);
        setIsModalOpen(true);
    }


    const loadMore =
        !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
            </div>
        ) : null;

    return (
        <div>
        <List
            className="demo-loadmore-list"
            loading={loading} 
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={users ? !Array.isArray(users) ? [users] : users : []} 
            renderItem={user => (
                <List.Item
                    actions={[<a key="list-loadmore-edit" onClick={() => handleSingleProfileData(user)}>View Profile</a>]}
                >
                    <Skeleton avatar title={false} loading={loading} active>
                        <List.Item.Meta
                            avatar={<Avatar src={user?.avatar_url || userObject?.avatar_url} />}
                            title={<span className='titleName' onClick={() => handleSingleProfileData(user)}>{user?.login || userObject?.name}</span>} 
                            description={<a target='_blank' href={`https://github.com/${user?.login}`}>{user.url}</a>}
                        />
                    </Skeleton>
                </List.Item>
            )}
        />

      <SingleProfileModal singleProfileData={singleProfileData} isModalOpen={isModalOpen} handleCancel={handleCancel} handleOk={handleOk}/>
      </div>
    );
};

export default AntUsersList;
