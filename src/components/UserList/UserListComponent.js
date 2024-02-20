import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGithubUsers } from '../../redux/reducers/githubUserReducer'

const UserListComponent = () => {
    const dispatch = useDispatch()
    const {users, loading, error} = useSelector(state => state.user)

useEffect(() => {
    dispatch(fetchGithubUsers())
}, [])


  return (
    <div>
      heloo
    </div>
  )
}

export default UserListComponent
