'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PersonIcon, 
  IdCardIcon, 
  CalendarIcon, 
  MobileIcon, 
  EnvelopeClosedIcon,
  HomeIcon,
  CheckCircledIcon,
  ArrowRightIcon
} from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export default function PatientRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Patient registered successfully in KNH system!');
      setStep(1);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Patient Registration</h1>
          <p className="text-muted-foreground mt-1">Register a new patient into the Kenyatta National Hospital management system.</p>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 
                step > s ? 'bg-emerald-500/20 text-emerald-600' : 'bg-muted text-muted-foreground'
              }`}
            >
              {step > s ? <CheckCircledIcon className="w-5 h-5" /> : s}
            </div>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden shadow-sm">
        <form onSubmit={handleSubmit}>
          <CardContent className="p-8 space-y-8">
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 text-emerald-600 border-b border-border pb-4">
                  <PersonIcon className="w-5 h-5" />
                  <h3 className="font-bold uppercase tracking-widest text-xs">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Full Name</Label>
                    <Input 
                      id="fullName"
                      type="text" 
                      placeholder="e.g. John Doe"
                      className="h-12 rounded-xl bg-muted/30"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idNumber" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">National ID / Passport</Label>
                    <div className="relative">
                      <IdCardIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
                      <Input 
                        id="idNumber"
                        type="text" 
                        placeholder="e.g. 12345678"
                        className="h-12 pl-12 rounded-xl bg-muted/30"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Date of Birth</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
                      <Input 
                        id="dob"
                        type="date" 
                        className="h-12 pl-12 rounded-xl bg-muted/30"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Gender</Label>
                    <Select defaultValue="male">
                      <SelectTrigger className="h-12 rounded-xl bg-muted/30">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 text-emerald-600 border-b border-border pb-4">
                  <MobileIcon className="w-5 h-5" />
                  <h3 className="font-bold uppercase tracking-widest text-xs">Contact Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Phone Number</Label>
                    <div className="relative">
                      <MobileIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
                      <Input 
                        id="phone"
                        type="tel" 
                        placeholder="+254 700 000 000"
                        className="h-12 pl-12 rounded-xl bg-muted/30"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</Label>
                    <div className="relative">
                      <EnvelopeClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
                      <Input 
                        id="email"
                        type="email" 
                        placeholder="john@example.com"
                        className="h-12 pl-12 rounded-xl bg-muted/30"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="address" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Residential Address</Label>
                    <div className="relative">
                      <HomeIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
                      <Input 
                        id="address"
                        type="text" 
                        placeholder="e.g. Apartment 4B, Nairobi"
                        className="h-12 pl-12 rounded-xl bg-muted/30"
                        required
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 text-emerald-600 border-b border-border pb-4">
                  <CheckCircledIcon className="w-5 h-5" />
                  <h3 className="font-bold uppercase tracking-widest text-xs">Review & Submit</h3>
                </div>
                
                <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl space-y-4">
                  <p className="text-sm text-muted-foreground italic text-center">
                    Please confirm all information is correct before submitting to the Kenyatta National Hospital database.
                    This record will be automatically synchronized with the Master Patient Index (MPI).
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <Card className="p-3 bg-card border-border">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Patient Type</span>
                      <p className="font-bold text-foreground">Standard Registration</p>
                    </Card>
                    <Card className="p-3 bg-card border-border">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Facility</span>
                      <p className="font-bold text-foreground">Kenyatta National Hospital</p>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>

          <CardFooter className="p-6 bg-muted/30 border-t border-border flex items-center justify-between">
            <Button 
              type="button"
              variant="ghost"
              onClick={() => step > 1 && setStep(step - 1)}
              className={cn(
                "px-6 font-bold transition-all",
                step === 1 && "opacity-0 pointer-events-none"
              )}
            >
              Back
            </Button>
            
            {step < 3 ? (
              <Button 
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-8 h-12 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 flex items-center gap-2"
              >
                Next Step
                <ArrowRightIcon className="w-5 h-5" />
              </Button>
            ) : (
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="px-8 h-12 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? 'Registering...' : 'Complete Registration'}
                {!isSubmitting && <CheckCircledIcon className="w-5 h-5" />}
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
