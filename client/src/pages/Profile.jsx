import React from 'react'
import { useAuthContext } from '../utils/AuthContext'

export default function Profile() {
    const {userData} = useAuthContext();
  return (
    <div>{JSON.stringify(userData)}</div>
  )
}
