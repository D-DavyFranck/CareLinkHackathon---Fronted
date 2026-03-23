'use client';

import React, { useState } from 'react';
import { 
  UpdateIcon,
  GlobeIcon,
  Link2Icon,
  EyeClosedIcon,
  EyeOpenIcon
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function IntegrationSettingsPage() {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div className="p-8 flex flex-col gap-8 h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold tracking-tight">Integration & Sync</h2>
           <p className="text-muted-foreground text-sm mt-1">Manage external API connections, global sync schedules, and retry policies.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <UpdateIcon className="w-4 h-4" /> Save Integration Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         {/* Sync Configuration */}
         <div className="space-y-6">
            <div>
               <h3 className="text-lg font-bold flex items-center gap-2">
                  <GlobeIcon className="w-5 h-5 text-primary" />
                  Global Sync Schedule
               </h3>
               <p className="text-sm text-muted-foreground mt-1">Configure the default polling frequency for all connected facilities.</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-6">
               <div className="space-y-2">
                  <Label className="font-bold">CRON Expression</Label>
                  <div className="flex gap-2">
                     <Input defaultValue="0 */4 * * *" className="font-mono bg-secondary/30" />
                     <Button variant="outline">Validate</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Current schedule: Every 4 hours.</p>
               </div>

               <div className="space-y-2">
                  <Label className="font-bold">Max Concurrent Syncs</Label>
                  <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-secondary/30 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                     <option value="2">2 Threads</option>
                     <option value="5" selected>5 Threads</option>
                     <option value="10">10 Threads</option>
                     <option value="unlimited">Unlimited (Risk of API Rate Limit)</option>
                  </select>
               </div>
            </div>

            <div>
               <h3 className="text-lg font-bold mt-8">Retry Policy</h3>
               <div className="bg-card border border-border rounded-xl p-5 mt-4 space-y-5 shadow-sm">
                  <div className="space-y-2">
                     <div className="flex justify-between">
                         <Label>Max Retries on Failure</Label>
                         <span className="text-muted-foreground text-sm font-bold">3</span>
                     </div>
                     <input type="range" min="0" max="10" defaultValue="3" className="w-full accent-primary" />
                  </div>
                  <div className="space-y-2">
                     <Label>Exponential Backoff Interval</Label>
                     <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-secondary/30 px-3 py-2 text-sm ring-offset-background">
                        <option value="1m">1 Minute</option>
                        <option value="5m" selected>5 Minutes</option>
                        <option value="15m">15 Minutes</option>
                        <option value="1h">1 Hour</option>
                     </select>
                  </div>
               </div>
            </div>
         </div>

         {/* IPRS Integration */}
         <div className="space-y-6">
            <div>
               <h3 className="text-lg font-bold flex items-center gap-2">
                  <Link2Icon className="w-5 h-5 text-indigo-500" />
                  IPRS Verification Service
               </h3>
               <p className="text-sm text-muted-foreground mt-1">Credentials for connecting to the national Integrated Population Registration System.</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-5">
               <div className="flex items-center justify-between">
                  <Label className="font-bold text-base">Enable IPRS Lookups</Label>
                  <Switch defaultChecked />
               </div>
               
               <div className="space-y-4 pt-4 border-t border-border">
                  <div className="space-y-2">
                     <Label>IPRS REST Endpoint</Label>
                     <Input defaultValue="https://api.iprs.go.ke/v2/verify" className="bg-secondary/30" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label>Client ID</Label>
                        <Input defaultValue="IPRS-MOH-MPI-PROD" className="bg-secondary/30 font-mono text-sm" />
                     </div>
                     <div className="space-y-2">
                        <Label>Client Secret</Label>
                        <div className="relative">
                           <Input 
                             type={showSecret ? "text" : "password"} 
                             defaultValue="sk_live_9a8b7c6d5e4f3g2h1i0j" 
                             className="bg-secondary/30 font-mono text-sm pr-10" 
                           />
                           <button 
                             type="button" 
                             className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                             onClick={() => setShowSecret(!showSecret)}
                           >
                              {showSecret ? <EyeOpenIcon /> : <EyeClosedIcon />}
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div>
               <h3 className="text-lg font-bold mt-8">Data Quality Settings</h3>
               <div className="bg-card border border-border rounded-xl p-5 mt-4 space-y-5 shadow-sm">
                  <div className="flex items-center justify-between">
                     <div className="space-y-0.5 max-w-[80%]">
                        <Label className="text-base">Strict FHIR Validation</Label>
                        <p className="text-xs text-muted-foreground">Reject source records that do not strictly comply with the Kenya EMR FHIR IG constraints.</p>
                     </div>
                     <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                     <div className="space-y-0.5 max-w-[80%]">
                        <Label className="text-base">Auto-Verify National IDs</Label>
                        <p className="text-xs text-muted-foreground">Automatically trigger an IPRS lookup when a new distinct National ID enters the system.</p>
                     </div>
                     <Switch defaultChecked />
                  </div>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}
