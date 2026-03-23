'use client';

import React, { useState } from 'react';
import { 
  BellIcon,
  GearIcon,
  CodeIcon,
  UpdateIcon,
  PlusIcon
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function PreferencesSettingsPage() {
  const [apikeys] = useState([
    { id: 'key_1', name: 'OpenMRS Dev Instance', key: 'sk_live_...4f9a', created: '2026-01-10', lastUsed: '5 mins ago' }
  ]);

  return (
    <div className="p-8 flex flex-col gap-8 h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold tracking-tight">System Preferences & Setup</h2>
           <p className="text-muted-foreground text-sm mt-1">Manage global email notifications, visual preferences, and generate API keys.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <UpdateIcon className="w-4 h-4" /> Save System Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         {/* Notifications & SMTP */}
         <div className="space-y-6">
            <div>
               <h3 className="text-lg font-bold flex items-center gap-2">
                  <BellIcon className="w-5 h-5 text-amber-500" />
                  Email Notifications
               </h3>
               <p className="text-sm text-muted-foreground mt-1">Configure automated alert dispatch mechanisms.</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-6">
               <div className="space-y-4">
                  <h4 className="font-bold text-sm">SMTP Server Configuration</h4>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">SMTP Host</Label>
                        <Input defaultValue="smtp.mailgun.org" className="bg-secondary/30 text-sm h-9 font-mono" />
                     </div>
                     <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Port</Label>
                        <Input defaultValue="587" className="bg-secondary/30 text-sm h-9 font-mono" />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Username</Label>
                        <Input defaultValue="postmaster@unimpi.kenya" className="bg-secondary/30 text-sm h-9 font-mono" />
                     </div>
                     <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Password</Label>
                        <Input type="password" defaultValue="secret_smpt_pass" className="bg-secondary/30 text-sm h-9 font-mono" />
                     </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-xs">Test Connection</Button>
               </div>

               <Separator />

               <div className="space-y-4">
                  <h4 className="font-bold text-sm">Event Triggers</h4>
                  <div className="space-y-3">
                     <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Critical Sync Failures</Label>
                        <Switch defaultChecked />
                     </div>
                     <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Daily Match Queue Digest</Label>
                        <Switch defaultChecked />
                     </div>
                     <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">System Down Alerts</Label>
                        <Switch defaultChecked />
                     </div>
                  </div>
               </div>
               
               <div className="space-y-2">
                  <Label className="font-bold text-sm">Alert Recipients</Label>
                  <Input defaultValue="admin@unimpi.kenya, sysops@moh.go.ke" className="bg-secondary/30 text-sm" />
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Comma Separated</p>
               </div>
            </div>
         </div>

         <div className="space-y-6">
            {/* Preferences */}
            <div>
               <h3 className="text-lg font-bold flex items-center gap-2">
                  <GearIcon className="w-5 h-5 text-emerald-500" />
                  Localization
               </h3>
               <p className="text-sm text-muted-foreground mt-1">Set the default operational standards for data display.</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
               <div className="space-y-2">
                  <Label className="font-bold">System Timezone</Label>
                  <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-secondary/30 px-3 py-2 text-sm">
                     <option value="EAT" selected>Africa/Nairobi (EAT)</option>
                     <option value="UTC">Coordinated Universal Time (UTC)</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <Label className="font-bold">Date Format</Label>
                  <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-secondary/30 px-3 py-2 text-sm">
                     <option value="DD/MM/YYYY" selected>DD/MM/YYYY (e.g. 13/03/2026)</option>
                     <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 03/13/2026)</option>
                     <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2026-03-13)</option>
                  </select>
               </div>
            </div>

            {/* API Access */}
            <div className="pt-2">
               <h3 className="text-lg font-bold flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CodeIcon className="w-5 h-5 text-indigo-500" />
                    API Access & Webhooks
                  </div>
                  <Button variant="outline" size="sm" className="h-8 gap-1"><PlusIcon /> Generate Key</Button>
               </h3>
               <p className="text-sm text-muted-foreground mt-1">Manage external authentication tokens for advanced server-to-server integration.</p>
            </div>

            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
               <table className="w-full text-left border-collapse text-sm">
                 <thead>
                   <tr className="bg-muted/30 border-b border-border">
                     <th className="p-3 font-semibold text-muted-foreground">Key Name</th>
                     <th className="p-3 font-semibold text-muted-foreground">Token</th>
                     <th className="p-3 font-semibold text-muted-foreground">Created</th>
                     <th className="p-3 font-semibold text-muted-foreground text-right">Last Used</th>
                   </tr>
                 </thead>
                 <tbody>
                   {apikeys.map(key => (
                     <tr key={key.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                        <td className="p-3 font-medium">{key.name}</td>
                        <td className="p-3 font-mono text-xs text-muted-foreground">{key.key}</td>
                        <td className="p-3 text-muted-foreground text-xs">{key.created}</td>
                        <td className="p-3 text-right text-xs text-muted-foreground">{key.lastUsed}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>

         </div>
      </div>
    </div>
  );
}
