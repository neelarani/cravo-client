'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IUser } from '@/types/user.types';
import { userApi } from '@/redux/api/user.api';

const Users = () => {
  const { data, isLoading } = userApi.useAllUserQuery();
  const users = data?.data || [];

  if (isLoading) return <div className="p-4 text-primary">Loading...</div>;
  if (!data?.data)
    return <div className="p-4 text-destructive">No users found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead className="font-bold text-lg">Name</TableHead>
              <TableHead className="font-bold text-lg">Email</TableHead>
              <TableHead className="font-bold text-lg">Role</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users?.map((user: IUser, index: number) => (
              <TableRow key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{user.full_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
