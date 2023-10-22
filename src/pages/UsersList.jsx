import React, { useEffect } from 'react'
import { DashboardLayout } from '../components/Layout/dashboardLayout'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardDataAction } from '../features/auth/authSlice'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
} from '@mui/material'
import moment from 'moment'

const UsersList = () => {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.auth.dashboardData)
  console.log(users, 'dashboardData.users')

  useEffect(() => {
    console.log('useEffect triggered')
    dispatch(dashboardDataAction())
  }, [dispatch])

  return (
    <DashboardLayout>
      <Container sx={{ mt: 3 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users.length > 0 &&
                users?.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>{user.isAdmin ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      {moment(user.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      {moment(user.updatedAt).format('DD/MM/YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </DashboardLayout>
  )
}

export default UsersList
