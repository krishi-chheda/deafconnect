"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone, Mail, Video, MapPin, CheckCircle, ChevronRight, HelpCircle, FileText } from 'lucide-react';
import Breadcrumbs from "@/components/Breadcrumbs";
import AnimatePage from "@/components/guided/AnimatePage";
import { useAccessibility } from "@/context/AccessibilityContext";

const contactFormSchema = z.object({
  name: z.string().min(2, 'Please enter your name (at least 2 letters)'),
  contactDetail: z.string().min(5, 'Please enter your phone number, SMS number, or email'),
  communicationNotes: z.string().optional()
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type CommMethod = 'auslan' | 'chat' | 'sms' | 'email' | 'video' | 'inperson';

interface Organisation {
  name: string;
  channel: string;
  phone?: string;
  sms?: string;
  email?: string;
  url?: string;
  desc: string;
}

const ORGANISATIONS: Record<CommMethod, Organisation[]> = {
  auslan: [
    {
      name: "National Relay Service (NRS) Video Relay",
      channel: "Auslan Video Relay",
      url: "https://www.accesshub.gov.au/about-the-nrs",
      desc: "Connects you with an Auslan interpreter online who speaks to the receiver on your behalf."
    },
    {
      name: "Deaf Connect Tasmania Auslan Registry",
      channel: "Auslan Interpreting",
      phone: "1300 773 777",
      email: "interpreting@deafconnect.org.au",
      url: "https://deafconnect.org.au",
      desc: "Book physical or video Auslan interpreters for appointments and consultations."
    }
  ],
  chat: [
    {
      name: "Deaf Connect Support Services",
      channel: "Live Chat & Contact",
      url: "https://deafconnect.org.au",
      desc: "Local, peer-supported counseling and contact services for Deaf Tasmanians."
    },
    {
      name: "Lifeline WebChat Service",
      channel: "Crisis Chat",
      url: "https://www.lifeline.org.au/chat",
      desc: "Statewide and national crisis support chat available 24/7."
    }
  ],
  sms: [
    {
      name: "Tasmania Deaf Support SMS Hotline",
      channel: "SMS Support",
      sms: "0477 13 11 14",
      desc: "Local Tasmanian SMS hotline staffed by deaf-aware community supporters."
    },
    {
      name: "Lifeline Crisis Text",
      channel: "SMS Support",
      sms: "0477 13 11 14",
      desc: "National 24/7 crisis support text messaging line."
    }
  ],
  email: [
    {
      name: "Deaf Connect Tasmania Support Desk",
      channel: "Email Support",
      email: "support@deafconnecttas.org",
      desc: "Direct support coordinate queries and advice. Responds within 24 hours."
    }
  ],
  video: [
    {
      name: "Tasmanian Deaf-Aware Telehealth",
      channel: "Video Consultation",
      email: "telehealth@deafconnecttas.org",
      desc: "Join a video chat session directly with a sign-relay therapist."
    }
  ],
  inperson: [
    {
      name: "Hobart Community Hub (Deaf Connect)",
      channel: "In-Person Consultation",
      phone: "03 6211 4321",
      desc: "Visit our physical offices at 152 Macquarie St, Hobart. Wheelchair and interpreter accessible."
    },
    {
      name: "Launceston Signing Center",
      channel: "In-Person Consultation",
      phone: "03 6334 5678",
      desc: "Physical peer-connect offices located in Launceston Central."
    }
  ]
};

export default function TalkToSomeonePage() {
  const { accessibilityMode } = useAccessibility();
  const isEasyRead = accessibilityMode === 'easyRead';

  // State
  const [selectedMethod, setSelectedMethod] = useState<CommMethod | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange'
  });

  const onSubmit = (data: ContactFormValues) => {
    // Process submission
    setFormSubmitted(true);
  };

  const methods = [
    { id: 'auslan' as CommMethod, label: 'Auslan Sign', icon: '🤟', desc: 'Communicating via Auslan video relays or registry signers.' },
    { id: 'chat' as CommMethod, label: 'Live Web Chat', icon: '💬', desc: 'Online chat text directly in your web browser.' },
    { id: 'sms' as CommMethod, label: 'SMS Text', icon: '📱', desc: 'Send and receive text messages via mobile phone.' },
    { id: 'email' as CommMethod, label: 'Email Support', icon: '✉', desc: 'Send emails to discuss support coordinates.' },
    { id: 'video' as CommMethod, label: 'Video Call', icon: '📹', desc: 'Online face-to-face video consultation session.' },
    { id: 'inperson' as CommMethod, label: 'In Person', icon: '👥', desc: 'Meet face-to-face at local Tasmanian offices.' }
  ];

  return (
    <AnimatePage>
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 py-12" id="main-content">
            
            {/* Breadcrumbs */}
            <Breadcrumbs items={[
              { name: "Find Support", href: "/support" },
              { name: "Talk to Someone" }
            ]} />

            {/* Hero Section */}
            <div className="rounded-[24px] bg-brand-blue-light/40 border border-brand-blue-light/35 p-8 sm:p-12 mb-12 flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex flex-col gap-4 max-w-[640px]">
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Direct Consultations</span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primaryText leading-tight">
                  Talk to Someone
                </h1>
                <p className="text-base font-semibold text-primaryText/70 leading-relaxed">
                  Choose the communication channel that works best for you. We will recommend organizations and let you request callbacks.
                </p>
              </div>
              <div className="relative w-48 h-48 shrink-0 hidden md:block">
                <Image
                  src="/illustrations/service_talk.png"
                  alt="Illustration representing conversational support"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Conversational Methods Selector Container */}
            <div className="mb-12">
              <div className="text-center md:text-left mb-6">
                <h2 className="text-xl font-extrabold text-primaryText">
                  Step 1: Choose how you want to communicate
                </h2>
                <p className="text-xs font-semibold text-primaryText/55 mt-1">
                  Select one option to see recommended organizations and callback support.
                </p>
              </div>

              {/* Grid of options */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {methods.map((method) => {
                  const isSelected = selectedMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      onClick={() => {
                        setSelectedMethod(method.id);
                        setFormSubmitted(false);
                      }}
                      className={`p-5 rounded-2xl border-2 text-center flex flex-col items-center justify-center gap-3 transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand-coral/30 ${
                        isSelected 
                          ? 'border-brand-coral bg-brand-coral/[0.06] ring-1 ring-brand-coral shadow-sm scale-102' 
                          : 'border-primaryText/10 bg-white hover:border-brand-teal/40'
                      }`}
                    >
                      <span className="text-3xl" role="img" aria-hidden="true">{method.icon}</span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-extrabold text-primaryText leading-tight">{method.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Recommendations & Callback Form */}
            <AnimatePresence mode="wait">
              {selectedMethod && (
                <motion.div
                  key={selectedMethod}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16"
                >
                  
                  {/* Left Column: Recommendations */}
                  <div className="lg:col-span-6 flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-extrabold text-primaryText">Recommended Services</h3>
                      <p className="text-xs text-primaryText/60 font-semibold">Specialised contacts supporting your chosen communication channel.</p>
                    </div>

                    <div className="flex flex-col gap-4" role="list">
                      {ORGANISATIONS[selectedMethod].map((org, index) => (
                        <div key={index} className="rounded-xl border border-primaryText/10 bg-white p-5 flex flex-col gap-3 shadow-sm" role="listitem">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-extrabold text-primaryText">{org.name}</h4>
                            <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded">
                              {org.channel}
                            </span>
                          </div>
                          
                          <p className="text-xs font-medium text-primaryText/70 leading-relaxed">
                            {org.desc}
                          </p>

                          <div className="flex flex-wrap gap-4 text-xs font-semibold text-primaryText/80 pt-2 border-t border-primaryText/5">
                            {org.phone && (
                              <a href={`tel:${org.phone}`} className="flex items-center gap-1.5 hover:text-brand-coral">
                                <Phone className="h-3.5 w-3.5" />
                                <span>Call: {org.phone}</span>
                              </a>
                            )}
                            {org.sms && (
                              <a href={`sms:${org.sms}`} className="flex items-center gap-1.5 hover:text-brand-coral">
                                <span>📱 SMS Text: {org.sms}</span>
                              </a>
                            )}
                            {org.email && (
                              <a href={`mailto:${org.email}`} className="flex items-center gap-1.5 hover:text-brand-coral">
                                <Mail className="h-3.5 w-3.5" />
                                <span>Email: {org.email}</span>
                              </a>
                            )}
                            {org.url && (
                              <a href={org.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-brand-teal hover:underline font-bold">
                                <span>Visit Online</span>
                                <ChevronRight className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Callback Request Form */}
                  <div className="lg:col-span-6">
                    <div className="rounded-2xl border-2 border-brand-teal/20 bg-brand-blue-light/10 p-6 sm:p-8 shadow-sm">
                      
                      <AnimatePresence mode="wait">
                        {!formSubmitted ? (
                          <motion.form
                            key="form"
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-5"
                          >
                            <div className="flex flex-col gap-1">
                              <h3 className="text-lg font-extrabold text-primaryText">Request a Callback session</h3>
                              <p className="text-xs text-primaryText/60 font-semibold">We will coordinate with a deaf-aware support planner to contact you.</p>
                            </div>

                            {/* Name Input */}
                            <div className="flex flex-col gap-1.5">
                              <label htmlFor="name" className="text-[10px] font-extrabold uppercase tracking-wider text-brand-teal">Your Name</label>
                              <input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                {...register('name')}
                                className={`w-full h-11 px-4 rounded-lg border bg-white text-xs font-bold text-primaryText focus:border-brand-teal focus:outline-none transition-colors ${
                                  errors.name ? 'border-red-500' : 'border-primaryText/10'
                                }`}
                              />
                              {errors.name && (
                                <span className="text-[10px] font-bold text-red-500">{errors.name.message}</span>
                              )}
                            </div>

                            {/* Contact Details Input */}
                            <div className="flex flex-col gap-1.5">
                              <label htmlFor="contactDetail" className="text-[10px] font-extrabold uppercase tracking-wider text-brand-teal">
                                Contact Information (SMS, Phone or Email)
                              </label>
                              <input
                                id="contactDetail"
                                type="text"
                                placeholder="Enter SMS, mobile number or email address"
                                {...register('contactDetail')}
                                className={`w-full h-11 px-4 rounded-lg border bg-white text-xs font-bold text-primaryText focus:border-brand-teal focus:outline-none transition-colors ${
                                  errors.contactDetail ? 'border-red-500' : 'border-primaryText/10'
                                }`}
                              />
                              {errors.contactDetail && (
                                <span className="text-[10px] font-bold text-red-500">{errors.contactDetail.message}</span>
                              )}
                            </div>

                            {/* Preferred Options / Notes */}
                            <div className="flex flex-col gap-1.5">
                              <label htmlFor="communicationNotes" className="text-[10px] font-extrabold uppercase tracking-wider text-brand-teal">
                                Preferred timing or extra details (Optional)
                              </label>
                              <textarea
                                id="communicationNotes"
                                placeholder="E.g., contact me in afternoon. I prefer Auslan video."
                                rows={3}
                                {...register('communicationNotes')}
                                className="w-full p-4 rounded-lg border border-primaryText/10 bg-white text-xs font-semibold text-primaryText focus:border-brand-teal focus:outline-none transition-colors"
                              />
                            </div>

                            {/* Submit Button */}
                            <button
                              type="submit"
                              disabled={!isValid}
                              className={`w-full h-12 flex items-center justify-center rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                                isValid 
                                  ? 'bg-brand-coral text-white hover:bg-brand-coral-hover shadow-md hover:scale-101' 
                                  : 'bg-primaryText/10 text-primaryText/35 cursor-not-allowed'
                              }`}
                            >
                              Request Contact
                            </button>
                          </motion.form>
                        ) : (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center text-center gap-4 py-8"
                          >
                            <CheckCircle className="h-16 w-16 text-emerald-500 animate-bounce" />
                            <div className="flex flex-col gap-1.5">
                              <h3 className="text-xl font-extrabold text-primaryText">Request Received!</h3>
                              <p className="text-xs text-primaryText/60 font-semibold max-w-[340px] leading-relaxed">
                                Thank you. A Deaf Connect support officer will reach out to you using your preferred channel within 24 hours.
                              </p>
                            </div>
                              <button
                                onClick={() => setFormSubmitted(false)}
                                className="mt-2 h-10 px-6 rounded-full border border-primaryText/20 text-xs font-bold text-primaryText hover:bg-white transition-colors"
                              >
                                Send Another Request
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </AnimatePage>
  );
}
