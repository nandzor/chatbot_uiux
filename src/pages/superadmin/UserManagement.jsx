import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui';

const UserManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600">Manage user accounts and permissions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            This page will contain user management functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            User management features will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
