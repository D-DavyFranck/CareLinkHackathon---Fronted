'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  PersonIcon,
  CheckCircledIcon,
  IdCardIcon,
  HomeIcon
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function PatientRegistrationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
     firstName: '',
     lastName: '',
     nationalId: '',
     dateOfBirth: '',
     gender: 'M',
     phone: '',
     facilityId: 'KNH',
     mrn: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setLoading(true);

     try {
       const res = await fetch('/api/patients/register', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData)
       });

       const data = await res.json();

       if (!res.ok) throw new Error(data.error);

       toast.success('Patient Registration Emitted', {
         description: `Decision: ${data.resolutionDecision.replace(/_/g, ' ')}`
       });

       if (data.resolutionDecision === 'REVIEW_QUEUED') {
          router.push('/match-queue');
       } else {
          router.push('/patients');
       }
     } catch (err: any) {
       toast.error('Registration Failed', { description: err.message });
     } finally {
       setLoading(false);
     }
  };

  return (
    <div className="p-8 flex flex-col gap-8 max-w-4xl mx-auto w-full">
      <div className="flex flex-col gap-2">
         <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-3">
            <PersonIcon className="w-8 h-8 text-primary" />
            Patient Registration Intake
         </h1>
         <p className="text-muted-foreground">Mocking a facility application sending a new patient record into the MPI for resolution.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border shadow-sm rounded-xl p-8 space-y-8">
         <div className="space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border pb-2">
               <IdCardIcon className="w-5 h-5 text-indigo-500" /> Administrative Identity
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <Label>First Name <span className="text-destructive">*</span></Label>
                  <Input name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="e.g. Sarah" className="bg-secondary/30" />
               </div>
               <div className="space-y-2">
                  <Label>Last Name <span className="text-destructive">*</span></Label>
                  <Input name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="e.g. Otieno" className="bg-secondary/30" />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <Label>Date of Birth <span className="text-destructive">*</span></Label>
                  <Input type="date" name="dateOfBirth" required value={formData.dateOfBirth} onChange={handleChange} className="bg-secondary/30" />
               </div>
               <div className="space-y-2">
                  <Label>Gender <span className="text-destructive">*</span></Label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-secondary/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                     <option value="M">Male</option>
                     <option value="F">Female</option>
                     <option value="O">Other</option>
                  </select>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <Label>National ID Number</Label>
                  <Input name="nationalId" value={formData.nationalId} onChange={handleChange} placeholder="e.g. 29384756" className="bg-secondary/30 font-mono" />
               </div>
               <div className="space-y-2">
                  <Label>Mobile Phone</Label>
                  <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. +254712345678" className="bg-secondary/30 font-mono" />
               </div>
            </div>
         </div>

         <div className="space-y-6 pt-4 mt-6">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border pb-2">
               <HomeIcon className="w-5 h-5 text-emerald-500" /> Facility Context
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <Label>Source Facility <span className="text-destructive">*</span></Label>
                  <select name="facilityId" value={formData.facilityId} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-secondary/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                     <option value="KNH">Kenyatta National Hospital (KNH)</option>
                     <option value="MTRH">Moi Teaching Referral (MTRH)</option>
                     <option value="AMREF">AMREF Clinic</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <Label>Source Medical Record Number (MRN)</Label>
                  <Input name="mrn" value={formData.mrn} onChange={handleChange} placeholder="Auto-generated if blank" className="bg-secondary/30 font-mono placeholder:text-muted-foreground/50" />
               </div>
            </div>
         </div>

         <div className="flex justify-end pt-6">
            <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 gap-2 h-12 px-8 text-base">
               {loading ? 'Processing Identity Resolution...' : <> <CheckCircledIcon className="w-5 h-5" /> Submit & Resolve Patient </>}
            </Button>
         </div>
      </form>
    </div>
  );
}
