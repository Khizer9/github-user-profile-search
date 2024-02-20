import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGithubUsers } from '../../redux/reducers/githubUserReducer';
import { debounce } from 'lodash';
import { Button } from 'antd';

const SearchUser = () => {
    const dispatch = useDispatch()
    const {users, loading, error} = useSelector(state => state.user)
    const [inputUser, setInputUser] = useState('')

    const debouncedDispatch = debounce((username) => {
        dispatch(fetchGithubUsers(username));
    }, 1000);

    useEffect(() => {
      debouncedDispatch(inputUser)
    }, [inputUser])

    const handleClick = () => {
        debouncedDispatch(inputUser)
    }

    const handleChange = (e) => {
        setInputUser(e.target.value)
    }

  return (
    <div className='searchParent'>
      <TextField id="standard-basic" label="Search github profile" variant="standard" onChange={handleChange}/>
      <Button className='searchBtn' type="primary" onClick={handleClick}>Search</Button>
    </div>
  );
}

export default SearchUser;
