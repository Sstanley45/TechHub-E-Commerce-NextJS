import React from 'react'
import AdminNav from '../components/admin/AdminNav';

export const metadata = {
  title: "techHub AdminPanel",
  description: "techHub Electronic shop AdminPanel",
};

const AdminLayout = ({ children } : {children:React.ReactNode}) => {
  return (
    <div>
      <AdminNav />
          {children}
    </div>
  )
}

export default AdminLayout;