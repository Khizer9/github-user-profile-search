import { Button, Card, Modal, Typography } from 'antd';
import React from 'react';

const SingleProfileModal = ({singleProfileData, handleOk, isModalOpen, handleCancel}) => {

    const handleRoute = () => {
      const url = singleProfileData?.html_url;
      url && window.open(url, '_blank');
    
  }
  return (
    <Modal centered footer={null} title={`${singleProfileData?.name || singleProfileData?.login} Profile`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className='center-div p-3'>
        <Card
      hoverable
      style={{
        width: 370,
      }}
      cover={<img width={370} height={300} alt="example" src={singleProfileData?.avatar_url} />}
    >
      {!singleProfileData?.followers  && (
        <>
      <Card.Meta
        title={singleProfileData?.name || singleProfileData?.login} 
        description={<a href={singleProfileData?.followers_url}>{singleProfileData?.followers_url}</a>}
      />
      <Typography> Repos Url : <a href={singleProfileData?.repos_url}>{singleProfileData?.repos_url}</a></Typography>
      </>
      )}

      {(singleProfileData?.followers && singleProfileData?.public_repos) && <div className='parentDiv'>
        <div className='innerDiv'>
          <h3>Followers</h3>
          <p>{singleProfileData?.followers}</p>
        </div>
        <div className='innerDiv'>
          <h3>Following</h3>
          <p>{singleProfileData?.following}</p>
        </div>
        <div className='innerDiv'>
          <h3>Public Repos</h3>
          <p>{singleProfileData?.public_repos}</p>
        </div>
      </div>}
    </Card>
        </div>


        <div className='footerParent'>
          <Button onClick={handleRoute}>View github profile</Button>
          <Button type="primary" onClick={handleCancel}>OK</Button>
        </div>
    </Modal>
  );
}

export default SingleProfileModal;
