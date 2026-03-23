'use client';

import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Globe, 
  FileText, 
  User,
  Info,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Facility, ConnectionType, AuthType, SyncMode } from '@/types/facility';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface FacilityConfigModalProps {
  facility: Partial<Facility> | null;
  onClose: () => void;
  onSave: (facility: Partial<Facility>) => void;
}

export function FacilityConfigModal({ facility, onClose, onSave }: FacilityConfigModalProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState<Partial<Facility>>(facility || {
    connectionType: 'FHIR R4',
    syncMode: 'Incremental',
    status: 'Active',
    fieldMapping: {
      facilityPatientId: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      nationalId: '',
      phone: '',
      county: '',
      subCounty: ''
    },
    advancedSettings: {
      timeout: 30,
      retryPolicy: { maxRetries: 3, backoff: 2 },
      dataQualityRules: { rejectMissingDob: true, rejectMissingGender: true, rejectMissingName: true }
    }
  });

  const isNew = !facility?.id;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl h-[85vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground tracking-tight">
                  {isNew ? 'Add New Facility' : `Configure ${facility.name}`}
                </h2>
                <p className="text-xs text-muted-foreground">Manage connection settings and data ingestion rules.</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Tabs */}
          <div className="px-6 pt-4 border-b border-border bg-muted/10">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-transparent gap-6 h-10 p-0">
                <TabsTrigger value="basic" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 text-xs font-bold uppercase tracking-widest">Basic Info</TabsTrigger>
                <TabsTrigger value="connection" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 text-xs font-bold uppercase tracking-widest">Connection</TabsTrigger>
                <TabsTrigger value="mapping" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 text-xs font-bold uppercase tracking-widest">Field Mapping</TabsTrigger>
                <TabsTrigger value="advanced" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 text-xs font-bold uppercase tracking-widest">Advanced</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <Tabs value={activeTab} className="w-full h-full">
              <TabsContent value="basic" className="m-0 space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Facility Name</label>
                    <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Kenyatta National Hospital" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Facility Code</label>
                    <Input value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} placeholder="e.g. KNH" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Facility Type</label>
                    <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value as any})}>
                      <option>Public Hospital</option>
                      <option>Private Clinic</option>
                      <option>Lab</option>
                      <option>Faith Based</option>
                      <option>NGO</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">County</label>
                    <Input value={formData.county} onChange={(e) => setFormData({...formData, county: e.target.value})} placeholder="e.g. Nairobi" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Contact Person
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Name</label>
                      <Input value={formData.contact?.name} onChange={(e) => setFormData({...formData, contact: {...formData.contact!, name: e.target.value}})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Email</label>
                      <Input value={formData.contact?.email} onChange={(e) => setFormData({...formData, contact: {...formData.contact!, email: e.target.value}})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Phone</label>
                      <Input value={formData.contact?.phone} onChange={(e) => setFormData({...formData, contact: {...formData.contact!, phone: e.target.value}})} />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="connection" className="m-0 space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Connection Type</label>
                  <div className="grid grid-cols-3 gap-4">
                    {(['FHIR R4', 'CSV Upload', 'Manual Entry'] as ConnectionType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setFormData({...formData, connectionType: type})}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all text-left flex flex-col gap-2",
                          formData.connectionType === type 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        {type === 'FHIR R4' && <Globe className="w-5 h-5" />}
                        {type === 'CSV Upload' && <FileText className="w-5 h-5" />}
                        {type === 'Manual Entry' && <User className="w-5 h-5" />}
                        <span className="text-sm font-bold">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {formData.connectionType === 'FHIR R4' && (
                  <div className="space-y-6 p-6 rounded-2xl bg-muted/30 border border-border">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Base URL</label>
                      <Input value={formData.fhirSettings?.baseUrl} onChange={(e) => setFormData({...formData, fhirSettings: {...formData.fhirSettings!, baseUrl: e.target.value, version: 'R4'}})} placeholder="https://example.com/fhir" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Authentication</label>
                        <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm" value={formData.fhirSettings?.authType} onChange={(e) => setFormData({...formData, fhirSettings: {...formData.fhirSettings!, authType: e.target.value as any}})}>
                          <option>None</option>
                          <option>Basic Auth</option>
                          <option>API Key</option>
                          <option>OAuth2</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Credentials / Secret</label>
                        <Input type="password" placeholder="••••••••••••" />
                      </div>
                    </div>
                  </div>
                )}

                {formData.connectionType === 'CSV Upload' && (
                  <div className="space-y-6 p-6 rounded-2xl bg-muted/30 border border-border">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Upload Endpoint (SFTP/HTTPS)</label>
                      <Input value={formData.csvSettings?.uploadEndpoint} onChange={(e) => setFormData({...formData, csvSettings: {...formData.csvSettings!, uploadEndpoint: e.target.value}})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">File Naming Convention</label>
                      <Input value={formData.csvSettings?.fileNamingConvention} onChange={(e) => setFormData({...formData, csvSettings: {...formData.csvSettings!, fileNamingConvention: e.target.value}})} placeholder="e.g. PATIENT_{YYYYMMDD}.csv" />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Sync Schedule (Cron)</label>
                    <Input value={formData.syncSchedule} onChange={(e) => setFormData({...formData, syncSchedule: e.target.value})} placeholder="0 */6 * * *" />
                    <p className="text-[10px] text-muted-foreground">Example: 0 */6 * * * (Every 6 hours)</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Sync Mode</label>
                    <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm" value={formData.syncMode} onChange={(e) => setFormData({...formData, syncMode: e.target.value as any})}>
                      <option>Incremental</option>
                      <option>Full</option>
                    </select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mapping" className="m-0 space-y-6">
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex gap-3">
                  <Info className="w-5 h-5 text-amber-500 shrink-0" />
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Map the source system fields to the MPI standard fields. For FHIR, use FHIRPath expressions. For CSV, use column headers.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {Object.keys(formData.fieldMapping || {}).map((field) => (
                    <div key={field} className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                      <Input 
                        value={(formData.fieldMapping as any)?.[field]} 
                        onChange={(e) => setFormData({
                          ...formData, 
                          fieldMapping: { ...formData.fieldMapping!, [field]: e.target.value }
                        })}
                        className="h-8 text-xs font-mono"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="m-0 space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold">Retry Policy</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Max Retries</label>
                        <Input type="number" value={formData.advancedSettings?.retryPolicy.maxRetries} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Backoff (seconds)</label>
                        <Input type="number" value={formData.advancedSettings?.retryPolicy.backoff} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold">Data Quality Rules</h3>
                    <div className="space-y-3">
                      {[
                        { id: 'rejectMissingDob', label: 'Reject records missing Date of Birth' },
                        { id: 'rejectMissingGender', label: 'Reject records missing Gender' },
                        { id: 'rejectMissingName', label: 'Reject records missing Name' },
                      ].map((rule) => (
                        <label key={rule.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 cursor-pointer transition-colors">
                          <input 
                            type="checkbox" 
                            checked={(formData.advancedSettings?.dataQualityRules as any)?.[rule.id]} 
                            onChange={(e) => setFormData({
                              ...formData,
                              advancedSettings: {
                                ...formData.advancedSettings!,
                                dataQualityRules: {
                                  ...formData.advancedSettings!.dataQualityRules,
                                  [rule.id]: e.target.checked
                                }
                              }
                            })}
                            className="rounded border-border" 
                          />
                          <span className="text-xs font-medium">{rule.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border bg-muted/30 flex items-center justify-between">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Test Connection
              </Button>
              <Button className="px-8" onClick={() => onSave(formData)}>
                {isNew ? 'Create Facility' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
