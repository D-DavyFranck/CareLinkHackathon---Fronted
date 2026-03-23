'use client';

import React, { useState } from 'react';
import {
  LockClosedIcon,
  UpdateIcon,
  DownloadIcon,
  MagnifyingGlassIcon
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const mockAuditLogs = [
  { id: 'log_1', time: '2026-03-13 10:45:00', user: 'Dr. Sarah Kamau', action: 'Login', details: 'Successful interactive login', ip: '192.168.1.105' },
  { id: 'log_2', time: '2026-03-13 11:20:15', user: 'Mercy Wanjiku', action: 'Match Decision', details: 'Confirmed manual match: PT-891 -> MPI-124', ip: '196.201.0.44' },
  { id: 'log_3', time: '2026-03-13 14:05:33', user: 'System (Sync)', action: 'Data Ingestion', details: 'Ingested 45 bundles from KNH_HMIS', ip: 'internal' },
  { id: 'log_4', time: '2026-03-12 16:30:00', user: 'James Ochieng', action: 'Failed Login', details: 'Invalid credentials provided', ip: '41.80.2.110' },
  { id: 'log_5', time: '2026-03-12 16:35:10', user: 'System Administrator', action: 'Password Reset', details: 'Triggered password reset for user ID: usr_2', ip: '192.168.1.105' }
];

export default function SecuritySettingsPage() {
  const [search, setSearch] = useState('');

  const filteredLogs = mockAuditLogs.filter(log => 
    log.user.toLowerCase().includes(search.toLowerCase()) || 
    log.action.toLowerCase().includes(search.toLowerCase()) ||
    log.details.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 flex flex-col gap-8 h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold tracking-tight">Security & Audit Logs</h2>
           <p className="text-muted-foreground text-sm mt-1">Configure global authentication policies and review the immutable system audit trail.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <UpdateIcon className="w-4 h-4" /> Save Security Policies
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Global Security Policies */}
         <div className="lg:col-span-1 space-y-6">
            <div>
               <h3 className="text-lg font-bold flex items-center gap-2">
                  <LockClosedIcon className="w-5 h-5 text-indigo-500" />
                  Authentication Policies
               </h3>
               <p className="text-sm text-muted-foreground mt-1">Globally enforced rules for all registered user accounts.</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-6">
               <div className="space-y-3">
                  <div className="flex items-center justify-between">
                     <Label className="font-bold">Require 2FA</Label>
                     <Switch defaultChecked />
                  </div>
                  <p className="text-xs text-muted-foreground">Force all administrative accounts to use Time-based One-Time Passwords (TOTP).</p>
               </div>

               <Separator />

               <div className="space-y-4">
                  <Label className="font-bold">Password Complexity</Label>
                  <div className="space-y-2 pl-2">
                     <label className="flex items-center gap-2 text-sm">
                       <input type="checkbox" defaultChecked className="rounded border-border text-primary focus:ring-primary" />
                       Minimum 12 characters
                     </label>
                     <label className="flex items-center gap-2 text-sm">
                       <input type="checkbox" defaultChecked className="rounded border-border text-primary focus:ring-primary" />
                       Require numbers & symbols
                     </label>
                     <label className="flex items-center gap-2 text-sm">
                       <input type="checkbox" defaultChecked className="rounded border-border text-primary focus:ring-primary" />
                       Expire every 90 days
                     </label>
                  </div>
               </div>

               <Separator />

               <div className="space-y-2">
                  <Label className="font-bold">Session Timeout (Minutes)</Label>
                  <Input type="number" defaultValue="30" min="5" max="1440" className="w-24 bg-secondary/30" />
                  <p className="text-xs text-muted-foreground">Users will be automatically logged out after this duration of inactivity.</p>
               </div>
            </div>
         </div>

         {/* System Audit Trail */}
         <div className="lg:col-span-2 space-y-6 flex flex-col h-full">
            <div className="flex items-center justify-between">
               <div>
                  <h3 className="text-lg font-bold flex items-center gap-2">
                     <LockClosedIcon className="w-5 h-5 text-foreground" />
                     System Audit Trail
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">Immutable ledger of all administrative and data-altering actions.</p>
               </div>
               <Button variant="outline" size="sm" className="gap-2">
                  <DownloadIcon className="w-3.5 h-3.5" /> Export Logs
               </Button>
            </div>

            <div className="border border-border rounded-xl flex flex-col flex-1 overflow-hidden bg-card shadow-sm">
               <div className="p-4 border-b border-border bg-muted/10">
                  <div className="relative w-full max-w-sm">
                     <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                     <Input 
                       placeholder="Search by user, action, or IP..." 
                       className="pl-9 h-9 bg-card text-sm"
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                     />
                  </div>
               </div>
               
               <div className="overflow-x-auto flex-1">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-muted/30 border-b border-border">
                        <th className="p-3 font-semibold text-muted-foreground whitespace-nowrap">Timestamp</th>
                        <th className="p-3 font-semibold text-muted-foreground">User / Actor</th>
                        <th className="p-3 font-semibold text-muted-foreground">Action</th>
                        <th className="p-3 font-semibold text-muted-foreground w-1/2">Details</th>
                        <th className="p-3 font-semibold text-muted-foreground text-right">IP Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogs.length === 0 ? (
                         <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No logs found matching query.</td></tr>
                      ) : (
                         filteredLogs.map(log => (
                           <tr key={log.id} className="border-b border-border last:border-0 hover:bg-muted/10">
                              <td className="p-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{log.time}</td>
                              <td className="p-3 font-medium">{log.user}</td>
                              <td className="p-3">
                                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${
                                  log.action.includes('Failed') ? 'bg-destructive/10 text-destructive' :
                                  log.action.includes('Match') ? 'bg-emerald-50 text-emerald-700' :
                                  'bg-secondary text-foreground'
                                }`}>
                                  {log.action}
                                </span>
                              </td>
                              <td className="p-3 text-muted-foreground text-xs leading-relaxed">{log.details}</td>
                              <td className="p-3 text-right font-mono text-xs text-muted-foreground whitespace-nowrap">{log.ip}</td>
                           </tr>
                         ))
                      )}
                    </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
