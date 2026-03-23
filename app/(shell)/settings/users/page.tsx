'use client';

import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  DotsHorizontalIcon,
  PlusIcon
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const mockUsers = [
  { id: 'usr_1', name: 'Dr. Sarah Kamau', email: 'sarah.k@moh.go.ke', role: 'System Administrator', lastLogin: '10 mins ago', status: 'Active' },
  { id: 'usr_2', name: 'James Ochieng', email: 'j.ochieng@knh.or.ke', role: 'Facility User', lastLogin: '2 hours ago', status: 'Active' },
  { id: 'usr_3', name: 'Mercy Wanjiku', email: 'm.wanjiku@moh.go.ke', role: 'Identity Reviewer', lastLogin: '1 day ago', status: 'Active' },
  { id: 'usr_4', name: 'Elijah Kipkorir', email: 'ek@cdc.go.ke', role: 'Surveillance Officer', lastLogin: '5 days ago', status: 'Inactive' },
  { id: 'usr_5', name: 'Alice Muthoni', email: 'amuthoni@who.int', role: 'Auditor', lastLogin: 'Never', status: 'Pending' },
];

export default function UsersSettingsPage() {
  const [search, setSearch] = useState('');

  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 flex flex-col gap-8 h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
           <p className="text-muted-foreground text-sm mt-1">Manage system access, roles, and facility assignments.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <PlusIcon className="w-4 h-4" /> Add New User
        </Button>
      </div>

      <div className="flex items-center gap-4">
         <div className="relative w-full max-w-sm">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search users or roles..." 
              className="pl-9 bg-secondary/30 border-border"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
         </div>
      </div>

      <div className="border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/30 border-b border-border">
              <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">User</th>
              <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Role</th>
              <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Last Login</th>
              <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Status</th>
              <th className="p-4 text-xs text-right"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
               <tr>
                 <td colSpan={5} className="p-8 text-center text-muted-foreground text-sm">No users found.</td>
               </tr>
            ) : (
               filteredUsers.map((user) => (
                 <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                   <td className="p-4">
                      <div className="font-semibold text-foreground text-sm">{user.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{user.email}</div>
                   </td>
                   <td className="p-4">
                      <Badge variant="outline" className={`font-medium ${
                        user.role === 'System Administrator' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 
                        user.role === 'Identity Reviewer' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                        'bg-secondary text-muted-foreground'
                      }`}>
                         {user.role}
                      </Badge>
                   </td>
                   <td className="p-4 text-sm text-muted-foreground">
                      {user.lastLogin}
                   </td>
                   <td className="p-4">
                      <div className="flex items-center gap-2">
                         <div className={`w-2 h-2 rounded-full ${
                           user.status === 'Active' ? 'bg-emerald-500' : 
                           user.status === 'Pending' ? 'bg-amber-500' : 
                           'bg-slate-300'
                         }`} />
                         <span className="text-sm font-medium text-foreground">{user.status}</span>
                      </div>
                   </td>
                   <td className="p-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                         <DotsHorizontalIcon className="w-4 h-4" />
                      </Button>
                   </td>
                 </tr>
               ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
