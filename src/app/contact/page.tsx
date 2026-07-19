"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, Globe, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAccessibility } from "@/context/AccessibilityContext";
import AnimatePage from "@/components/guided/AnimatePage";

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contact: z.string().min(5, { message: "Please provide a valid phone number, FaceTime ID or email." }),
  message: z.string().min(10, { message: "Please tell us how we can help you (minimum 10 characters)." })
});

type ContactFormInput = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { accessibilityMode } = useAccessibility();
  const isEasyRead = accessibilityMode === 'easyRead';
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactFormInput) => {
    setFormSubmitted(true);
    reset();
  };

  return (
    <>
      <Navbar />
      
      <main className="flex-1 w-full bg-white" id="main-content">
        <AnimatePage>
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 py-12 md:py-16">
            
            {/* Header titles */}
            <div className="text-center md:text-left mb-10 border-b border-brand-navy/10 pb-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Direct Support Channels</span>
              <h1 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl mt-1">
                Contact Us
              </h1>
              <p className="text-sm font-semibold text-brand-navy/60 leading-relaxed mt-2">
                Reach out to Deaf Connect Tasmania through your preferred communication channel.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Form Inquiry */}
              <div className="lg:col-span-7 rounded-[24px] border border-brand-navy/10 p-6 sm:p-8 bg-white shadow-sm flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-extrabold text-brand-navy tracking-tight">Send an Inquiry</h2>
                  <p className="text-xs font-medium text-brand-navy/60 mt-1">
                    Fill out this form and our support coordinators will get back to you.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="flex flex-col items-center text-center gap-4 py-8 border border-brand-teal/20 bg-brand-teal/[0.02] rounded-2xl p-6 animate-in zoom-in-95">
                    <div className="h-16 w-16 rounded-full bg-brand-teal/15 text-brand-teal flex items-center justify-center" aria-hidden="true">
                      <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
                    </div>
                    <h3 className="font-extrabold text-lg">Message Sent Successfully!</h3>
                    <p className="text-xs font-semibold text-brand-navy/70 leading-relaxed max-w-[340px]">
                      Thank you for reaching out. We will respond using your preferred contact method within 24 business hours.
                    </p>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="mt-2 text-xs font-extrabold text-brand-primary hover:underline focus:outline-none cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-name" className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/60">
                        Your Name
                      </label>
                      <input 
                        id="contact-name"
                        type="text"
                        {...register("name")}
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                        className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50 ${
                          errors.name ? 'border-brand-coral bg-brand-coral/5 focus:ring-brand-coral/50' : 'border-brand-navy/15 focus:border-brand-teal'
                        }`}
                        placeholder="Robin"
                      />
                      {errors.name && (
                        <span id="contact-name-error" role="alert" className="text-xs font-bold text-brand-coral flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-method" className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/60">
                        Your preferred contact method
                      </label>
                      <input 
                        id="contact-method"
                        type="text"
                        {...register("contact")}
                        aria-invalid={errors.contact ? "true" : "false"}
                        aria-describedby={errors.contact ? "contact-method-error" : undefined}
                        className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50 ${
                          errors.contact ? 'border-brand-coral bg-brand-coral/5 focus:ring-brand-coral/50' : 'border-brand-navy/15 focus:border-brand-teal'
                        }`}
                        placeholder="e.g. 0400 000 000 or email@domain.com"
                      />
                      {errors.contact && (
                        <span id="contact-method-error" role="alert" className="text-xs font-bold text-brand-coral flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {errors.contact.message}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-msg" className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/60">
                        How can we support you?
                      </label>
                      <textarea 
                        id="contact-msg"
                        rows={4}
                        {...register("message")}
                        aria-invalid={errors.message ? "true" : "false"}
                        aria-describedby={errors.message ? "contact-msg-error" : undefined}
                        className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50 ${
                          errors.message ? 'border-brand-coral bg-brand-coral/5 focus:ring-brand-coral/50' : 'border-brand-navy/15 focus:border-brand-teal'
                        }`}
                        placeholder="Enter your message details..."
                      />
                      {errors.message && (
                        <span id="contact-msg-error" role="alert" className="text-xs font-bold text-brand-coral flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {errors.message.message}
                        </span>
                      )}
                    </div>

                    <button 
                      type="submit"
                      className="w-full mt-2 flex items-center justify-center gap-2 rounded-full bg-brand-primary text-white hover:opacity-90 py-3.5 text-sm font-bold shadow-md cursor-pointer transition-all hover:scale-[1.02] focus:outline-none active:scale-[0.98]"
                    >
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column: NRS & Hotlines */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Visual info card */}
                <div className="rounded-[24px] border border-brand-navy/10 p-6 bg-white flex flex-col gap-4">
                  <h3 className="text-lg font-extrabold text-brand-navy tracking-tight">Direct Support</h3>
                  
                  <div className="flex flex-col gap-3 font-semibold text-xs text-brand-navy/85">
                    <p className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-extrabold text-brand-navy/40 uppercase">SMS Text Hotline</span>
                      <a href="sms:0477131114" className="text-sm font-bold hover:text-brand-teal transition-colors">0477 13 11 14</a>
                    </p>
                    <p className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-extrabold text-brand-navy/40 uppercase">Email Inbox</span>
                      <a href="mailto:support@deafconnecttas.org" className="text-sm font-bold hover:text-brand-teal transition-colors">support@deafconnecttas.org</a>
                    </p>
                    <p className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-extrabold text-brand-navy/40 uppercase">Operating Hours</span>
                      <span className="text-sm font-bold">Monday - Friday, 9:00 AM - 5:00 PM</span>
                    </p>
                  </div>
                </div>

                {/* NRS Card */}
                <div className="rounded-[24px] border-[2px] border-brand-teal/20 bg-brand-blue-light/10 p-6 flex flex-col gap-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-teal">Accessibility Channels</span>
                  <h3 className="text-lg font-extrabold text-brand-navy tracking-tight">National Relay Service</h3>
                  <p className="text-xs font-semibold text-brand-navy/70 leading-relaxed">
                    If you are Deaf or hard of hearing, you can contact the NRS using FaceTime relay, TTY, or SMS helper channels to route your call to us.
                  </p>
                  <a 
                    href="https://www.accesshub.gov.au/about-the-nrs" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-2 text-xs font-extrabold uppercase tracking-wider text-brand-teal hover:underline flex items-center gap-1 focus:outline-none"
                  >
                    <span>Open NRS Portal</span>
                    <Globe className="h-4 w-4" />
                  </a>
                </div>

              </div>

            </div>

          </div>
        </AnimatePage>
      </main>

      <Footer />
    </>
  );
}
