'use client';

import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  FileTextIcon, 
  VideoIcon, 
  ChatBubbleIcon,
  EnvelopeClosedIcon,
  ExclamationTriangleIcon,
  CheckCircledIcon,
  ExternalLinkIcon,
  PlusIcon,
  MinusIcon,
  PaperPlaneIcon,
  InfoCircledIcon,
  QuestionMarkCircledIcon
} from '@radix-ui/react-icons';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const FAQS = [
  {
    q: "How do I resolve a match in the Match Queue?",
    a: "Navigate to the Match Queue, review the comparison table identifying overlapping traits, and select 'Confirm Match' if confident, or 'Reject' if they are distinct individuals."
  },
  {
    q: "Why did a facility sync fail?",
    a: "Syncs typically fail due to network timeouts, invalid FHIR payload structures, or authentication credential expiration. Review the specific trace in the Sync History view."
  },
  {
    q: "How is the Match Confidence Score calculated?",
    a: "The score is a weighted composite of Deterministic exact matches (e.g. National ID) and Probabilistic fuzzy matches (e.g. Levenshtein distance on Names and DOB)."
  },
  {
    q: "Can I undo a confirmed match?",
    a: "Currently, un-merging an MPI requires Administrative privileges. Please file a Support Ticket with the MPI ID involved to process an un-merge."
  }
];

const GLOSSARY = [
  { term: "MPI", def: "Master Patient Index. A system that unifies patient records across disparate healthcare facilities." },
  { term: "Source Record", def: "The raw patient demographic data originally transmitted by a specific facility (e.g. KNH)." },
  { term: "Deterministic Match", def: "A linkage made with 100% certainty based on unique identifiers like a National ID." },
  { term: "FHIR", def: "Fast Healthcare Interoperability Resources. The standard protocol used for transmitting health data." }
];

export default function HelpDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const filteredFaqs = FAQS.filter(f => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-8 flex flex-col gap-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">Find answers, report issues, and monitor system health.</p>
      </div>

      <Tabs defaultValue="knowledge" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-3 mb-8 h-12">
          <TabsTrigger value="knowledge" className="flex items-center gap-2">
             <QuestionMarkCircledIcon className="w-4 h-4" />
             Knowledge Base
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
             <ChatBubbleIcon className="w-4 h-4" />
             Contact Support
          </TabsTrigger>
          <TabsTrigger value="status" className="flex items-center gap-2">
             <InfoCircledIcon className="w-4 h-4" />
             System Status
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Knowledge Base */}
        <TabsContent value="knowledge" className="space-y-12 outline-none">
          {/* FAQ Section */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Frequently Asked Questions</h3>
                <p className="text-sm text-muted-foreground mt-1">Browse our most common queries or search for a specific topic.</p>
              </div>
              <div className="relative w-full max-w-xs">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Ask a question..." 
                  className="pl-9 bg-card" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl divide-y divide-border">
              {filteredFaqs.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">No FAQs match your search.</div>
              ) : (
                filteredFaqs.map((faq, idx) => (
                  <div key={idx} className="p-4">
                    <button 
                      className="w-full flex items-center justify-between text-left font-semibold text-foreground hover:text-primary transition-colors"
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    >
                      {faq.q}
                      {activeFaq === idx ? <MinusIcon className="text-muted-foreground shrink-0" /> : <PlusIcon className="text-muted-foreground shrink-0" />}
                    </button>
                    {activeFaq === idx && (
                      <div className="mt-3 text-sm text-muted-foreground leading-relaxed pr-8">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Manuals */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">User Manuals</h3>
              <div className="grid gap-3">
                <ResourceCard 
                  icon={<FileTextIcon className="w-5 h-5" />} 
                  title="MPI Administrator Guide" 
                  desc="System configuration and facility management." 
                />
                <ResourceCard 
                  icon={<FileTextIcon className="w-5 h-5" />} 
                  title="Data Reviewer Handbook" 
                  desc="Best practices for resolving match queues." 
                />
                <ResourceCard 
                  icon={<FileTextIcon className="w-5 h-5" />} 
                  title="Surveillance Officer Manual" 
                  desc="Exporting and analyzing coverage data." 
                />
              </div>
            </div>

            {/* Videos */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Video Tutorials</h3>
              <div className="grid gap-3">
                <ResourceCard 
                  icon={<VideoIcon className="w-5 h-5 text-accent" />} 
                  title="Navigating the Match Queue" 
                  desc="3 min walkthrough of merging records." 
                />
                <ResourceCard 
                  icon={<VideoIcon className="w-5 h-5 text-accent" />} 
                  title="Understanding Analytics" 
                  desc="5 min overview of performance metrics." 
                />
              </div>
            </div>
          </div>

          {/* Glossary */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold">Terminology Glossary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {GLOSSARY.map((item, idx) => (
                 <div key={idx} className="bg-muted/30 p-4 rounded-lg border border-border">
                    <h4 className="font-bold text-sm text-foreground">{item.term}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.def}</p>
                 </div>
               ))}
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Contact Support */}
        <TabsContent value="support" className="space-y-8 outline-none mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-2 space-y-6">
               <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-xl font-bold">Submit a Support Request</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-6">Our standard SLA for medium-priority issues is 24 hours.</p>

                  <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Mock support ticket submitted!"); }}>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label>Full Name</Label>
                           <Input placeholder="Jane Doe" className="bg-secondary/50" />
                        </div>
                        <div className="space-y-2">
                           <Label>Email Address</Label>
                           <Input type="email" placeholder="jane@facility.go.ke" className="bg-secondary/50" />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label>Facility (Optional)</Label>
                           <Input placeholder="e.g. Kenyatta National Hospital" className="bg-secondary/50" />
                        </div>
                        <div className="space-y-2">
                           <Label>Priority</Label>
                           <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-secondary/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                             <option value="low">Low - General Question</option>
                             <option value="medium">Medium - Non-critical bug</option>
                             <option value="high">High - Feature broken</option>
                             <option value="critical">Critical - System down</option>
                           </select>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label>Subject</Label>
                        <Input placeholder="Brief summary of issue..." className="bg-secondary/50" />
                     </div>
                     <div className="space-y-2">
                        <Label>Description</Label>
                        <textarea 
                          className="flex w-full rounded-md border border-input bg-secondary/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px]" 
                          placeholder="Please provide detailed steps, expected vs actual behavior..."
                        ></textarea>
                     </div>
                     <Button type="submit" className="gap-2 bg-primary">
                        <PaperPlaneIcon className="w-4 h-4" /> Send Message
                     </Button>
                  </form>
               </div>
            </div>

            <div className="col-span-1 space-y-4">
               <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                     <ChatBubbleIcon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg">Live Chat</h4>
                  <p className="text-sm text-muted-foreground">Chat with an agent for immediate help during business hours.</p>
                  <Button variant="outline" className="w-full mt-2 border-primary/20 text-primary hover:bg-primary/5">Start Chat</Button>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground mt-2">Mon-Fri, 08:00 - 18:00 EAT</span>
               </div>

               <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground mb-2">
                     <EnvelopeClosedIcon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg">Email Support</h4>
                  <p className="text-sm text-muted-foreground">Prefer to email us directly? Send your queries anytime.</p>
                  <a href="mailto:support@unimpi.kenya" className="font-mono text-sm font-bold text-primary mt-2">support@unimpi.kenya</a>
               </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: System Status */}
        <TabsContent value="status" className="space-y-8 outline-none mt-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* System Health */}
              <div className="md:col-span-2 space-y-6">
                 <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                    <div>
                       <h3 className="text-xl font-bold flex items-center gap-2">
                          <CheckCircledIcon className="w-6 h-6 text-emerald-500" />
                          All Systems Operational
                       </h3>
                       <p className="text-sm text-muted-foreground mt-1">Last updated: Just now</p>
                    </div>

                    <div className="space-y-4">
                       <StatusRow name="Core Identity API" status="Operational" isUp />
                       <StatusRow name="PostgreSQL Database cluster" status="Operational" isUp />
                       <StatusRow name="FHIR Ingestion Engine" status="Degraded Performance" isUp={false} />
                       <StatusRow name="IPRS Verification Service" status="Operational" isUp />
                    </div>
                 </div>

                 <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">Maintenance Notices</h3>
                    <div className="p-4 border border-amber-500/20 bg-amber-500/5 rounded-lg flex items-start gap-3">
                       <ExclamationTriangleIcon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                       <div>
                          <h4 className="font-bold text-amber-700 text-sm">Scheduled Database Maintenance</h4>
                          <p className="text-xs text-amber-600/80 mt-1">Saturday, March 18th from 01:00 to 03:00 EAT. The MPI resolution queue will be temporarily locked.</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Release Notes & Community */}
              <div className="space-y-6">
                 <div className="bg-muted/30 border border-border rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">Release Notes</h3>
                    <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                       <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group border-b border-border/50 pb-3 last:border-0">
                          <div className="flex flex-col w-full text-left">
                             <div className="flex items-center justify-between">
                               <span className="text-xs font-bold text-primary">v2.1.0</span>
                               <span className="text-[10px] text-muted-foreground">Mar 10, 2026</span>
                             </div>
                             <p className="text-sm font-medium mt-1">New Analytics Dashboards & Match Workflows</p>
                          </div>
                       </div>
                       <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group border-b border-border/50 pb-3 last:border-0">
                          <div className="flex flex-col w-full text-left">
                             <div className="flex items-center justify-between">
                               <span className="text-xs font-bold text-foreground">v2.0.4</span>
                               <span className="text-[10px] text-muted-foreground">Feb 28, 2026</span>
                             </div>
                             <p className="text-sm text-muted-foreground mt-1">IPRS Verification Hotfix</p>
                          </div>
                       </div>
                       <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                          <div className="flex flex-col w-full text-left">
                             <div className="flex items-center justify-between">
                               <span className="text-xs font-bold text-foreground">v2.0.0</span>
                               <span className="text-[10px] text-muted-foreground">Jan 15, 2026</span>
                             </div>
                             <p className="text-sm text-muted-foreground mt-1">Major Rules Engine Overhaul</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-between hover:border-primary/50 group">
                       Community Forum <ExternalLinkIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between hover:border-primary/50 group">
                       Request a Feature <ExternalLinkIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between hover:border-primary/50 group border-dashed">
                       Report a Bug <ExternalLinkIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                    </Button>
                 </div>
              </div>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ResourceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <button className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-sm transition-all text-left w-full group">
       <div className="w-10 h-10 rounded-lg bg-secondary/80 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
         {icon}
       </div>
       <div>
         <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{title}</h4>
         <p className="text-xs text-muted-foreground mt-1">{desc}</p>
       </div>
    </button>
  );
}

function StatusRow({ name, status, isUp }: { name: string, status: string, isUp: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-secondary/20">
       <span className="font-medium text-sm">{name}</span>
       <div className="flex items-center gap-2">
          <span className={`text-xs font-bold ${isUp ? 'text-emerald-600' : 'text-amber-600'}`}>{status}</span>
          <div className={`w-2 h-2 rounded-full ${isUp ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>
       </div>
    </div>
  );
}
