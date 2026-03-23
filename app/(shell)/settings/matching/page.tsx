'use client';

import React, { useState } from 'react';
import { 
  UpdateIcon,
  MixerVerticalIcon,
  CounterClockwiseClockIcon
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function MatchingSettingsPage() {
  const [autoMatchThreshold, setAutoMatchThreshold] = useState(0.95);
  const [reviewLowerBound, setReviewLowerBound] = useState(0.75);
  const [reviewUpperBound, setReviewUpperBound] = useState(0.94);

  const [weights, setWeights] = useState({
    name: 0.35,
    dob: 0.25,
    nationalId: 0.20,
    phone: 0.10,
    gender: 0.10
  });

  return (
    <div className="p-8 flex flex-col gap-8 h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold tracking-tight">Matching Engine</h2>
           <p className="text-muted-foreground text-sm mt-1">Configure probabilistic confidence thresholds and demographic weights.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="gap-2 text-muted-foreground">
             <CounterClockwiseClockIcon className="w-4 h-4" /> Reset to Defaults
           </Button>
           <Button className="bg-primary hover:bg-primary/90 gap-2">
             <UpdateIcon className="w-4 h-4" /> Save Configuration
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         {/* Confidence Thresholds */}
         <div className="space-y-6">
            <div>
               <h3 className="text-lg font-bold flex items-center gap-2">
                  <MixerVerticalIcon className="w-5 h-5 text-primary" />
                  Confidence Thresholds
               </h3>
               <p className="text-sm text-muted-foreground mt-1">Define the score boundaries that dictate identity merging automation.</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 space-y-6 shadow-sm">
               <div className="space-y-3">
                  <div className="flex items-center justify-between">
                     <Label className="font-bold">Auto-Match Threshold</Label>
                     <span className="font-mono text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-bold">≥ {autoMatchThreshold.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Any match scoring above this threshold is merged instantly without human review.</p>
                  <input 
                    type="range" 
                    min="0.80" 
                    max="1.00" 
                    step="0.01" 
                    value={autoMatchThreshold} 
                    onChange={(e) => setAutoMatchThreshold(parseFloat(e.target.value))}
                    className="w-full accent-primary mt-2"
                  />
               </div>

               <Separator />

               <div className="space-y-3">
                  <div className="flex items-center justify-between">
                     <Label className="font-bold">Manual Review Range</Label>
                     <span className="font-mono text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded font-bold">{reviewLowerBound.toFixed(2)} - {reviewUpperBound.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Matches falling within this band are routed to the Match Queue for Identity Reviewers.</p>
                  <div className="flex items-center gap-4 mt-2">
                     <Input 
                       type="number" 
                       min="0.50" 
                       max="0.89" 
                       step="0.01" 
                       value={reviewLowerBound} 
                       onChange={(e) => setReviewLowerBound(parseFloat(e.target.value))}
                       className="w-24 text-center font-mono"
                     />
                     <span className="text-muted-foreground">to</span>
                     <Input 
                       type="number" 
                       min="0.90" 
                       max="0.99" 
                       step="0.01" 
                       value={reviewUpperBound} 
                       onChange={(e) => setReviewUpperBound(parseFloat(e.target.value))}
                       className="w-24 text-center font-mono"
                     />
                  </div>
               </div>
            </div>

            <div>
               <h3 className="text-lg font-bold mt-8">Matching Rules</h3>
               <div className="bg-card border border-border rounded-xl p-5 mt-4 space-y-5 shadow-sm">
                  <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                        <Label className="text-base">Deterministic Exact Match</Label>
                        <p className="text-xs text-muted-foreground">Bypass probabilistic scoring if exact National ID matches.</p>
                     </div>
                     <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                        <Label className="text-base">Fuzzy Name Search</Label>
                        <p className="text-xs text-muted-foreground">Utilize Levenshtein distance on Last Name and First Name fields.</p>
                     </div>
                     <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                        <Label className="text-base">Cross-Facility Override</Label>
                        <p className="text-xs text-muted-foreground">Allow distinct facilities to inherit global rules automatically.</p>
                     </div>
                     <Switch />
                  </div>
               </div>
            </div>
         </div>

         {/* Field Weights */}
         <div className="space-y-6">
            <div>
               <h3 className="text-lg font-bold">Attribute Weights</h3>
               <p className="text-sm text-muted-foreground mt-1">Adjust how much each demographic field contributes to the overall probabilistic score. Must sum to 1.0.</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
               {Object.entries(weights).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-4">
                     <Label className="w-28 capitalize font-semibold">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                     <input 
                       type="range" 
                       min="0.00" 
                       max="1.00" 
                       step="0.05" 
                       value={val}
                       onChange={(e) => setWeights({ ...weights, [key]: parseFloat(e.target.value) })}
                       className="flex-1 accent-accent" 
                     />
                     <div className="w-16">
                        <Input 
                          type="number" 
                          min="0.00" 
                          max="1.00" 
                          step="0.05" 
                          className="h-8 font-mono text-sm text-right px-2" 
                          value={val.toFixed(2)}
                          onChange={(e) => setWeights({ ...weights, [key]: parseFloat(e.target.value) })}
                        />
                     </div>
                  </div>
               ))}
               
               <div className="pt-4 border-t border-border mt-4 flex items-center justify-between">
                  <span className="font-bold text-sm">Total Weight Sum</span>
                  <Badge variant="secondary" className={`font-mono font-bold text-sm ${Object.values(weights).reduce((a, b) => a + b, 0) === 1.00 ? 'bg-emerald-50 text-emerald-700' : 'bg-destructive/10 text-destructive'}`}>
                     {Object.values(weights).reduce((a, b) => a + b, 0).toFixed(2)}
                  </Badge>
               </div>
               {Object.values(weights).reduce((a, b) => a + b, 0) !== 1.00 && (
                 <p className="text-xs text-destructive text-right font-medium">Weights must equal exactly 1.00 before saving.</p>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
