"use client";

import React, { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  MapPin, 
  Globe, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  Mail, 
  Phone, 
  ChevronRight, 
  ArrowLeft, 
  Send,
  Languages, 
  HandMetal,
  MessageSquare,
  Video,
  FileText
} from 'lucide-react';

import { useAccessibility } from '@/context/AccessibilityContext';
import { servicesData, ServiceDetails } from '@/data/services';
import AnimatePage from '@/components/guided/AnimatePage';
import InterpreterVideo from '@/components/guided/InterpreterVideo';

// Zod schema for form validation
const bookingSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contact: z.string().min(5, { message: "Please provide a valid contact number, FaceTime ID or email." }),
  time: z.string().min(3, { message: "Please enter a preferred day or time." }),
  message: z.string().optional()
});

type BookingFormInput = z.infer<typeof bookingSchema>;

interface ServicePageProps {
  params: Promise<{ id: string }>;
}

export default function ServicePage({ params }: ServicePageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { accessibilityMode } = useAccessibility();
  const isAuslanMode = accessibilityMode === 'auslan';
  const isEasyRead = accessibilityMode === 'easyRead';

  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [showInterpreter, setShowInterpreter] = useState(false);

  const service: ServiceDetails | undefined = servicesData[id];

  // React Hook Form initialization
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<BookingFormInput>({
    resolver: zodResolver(bookingSchema)
  });

  if (!service) {
    return (
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 py-20 text-center text-brand-navy">
        <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
        <p className="mb-6">The requested service could not be located in our database.</p>
        <Link href="/" className="rounded-full bg-brand-primary text-white px-6 py-2 text-sm font-bold">
          Return Home
        </Link>
      </div>
    );
  }

  const handleBookingSubmit = (data: BookingFormInput) => {
    setBookingSubmitted(true);
    reset();
  };

  const getCommIcon = (type: string) => {
    switch (type) {
      case 'auslan':
        return <HandMetal className="h-5 w-5 text-brand-teal" />;
      case 'interpreter':
        return <Languages className="h-5 w-5 text-brand-teal" />;
      case 'chat':
        return <MessageSquare className="h-5 w-5 text-brand-teal" />;
      case 'email':
        return <Mail className="h-5 w-5 text-brand-teal" />;
      case 'video':
        return <Video className="h-5 w-5 text-brand-teal" />;
      case 'in_person':
        return <MapPin className="h-5 w-5 text-brand-teal" />;
      default:
        return null;
    }
  };

  return (
    <AnimatePage>
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 py-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-extrabold text-brand-navy/60 hover:text-brand-primary focus:outline-none cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Dynamic header mode banner */}
        {isAuslanMode && (
          <div className="flex items-center justify-between gap-4 rounded-xl bg-brand-teal/10 border border-brand-teal/30 p-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤟</span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">
                Auslan Mode active. Click the button to watch this page in sign language.
              </span>
            </div>
            <button 
              onClick={() => setShowInterpreter(!showInterpreter)}
              className="rounded-full bg-brand-teal text-white hover:bg-brand-teal/90 px-4 py-2 text-xs font-bold shadow-sm cursor-pointer focus:outline-none"
            >
              {showInterpreter ? "Hide Interpreter" : "Watch in Auslan"}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Sign language visual sidebar (if toggled in Auslan Mode) */}
          {isAuslanMode && showInterpreter && (
            <div className="lg:col-span-3">
              <InterpreterVideo 
                stepKey="results" 
                questionText={`This is the service details page for ${service.title}.`}
              />
            </div>
          )}

          {/* Left Column: Service Details */}
          <div className={`flex flex-col gap-8 ${
            isAuslanMode && showInterpreter ? 'lg:col-span-5' : 'lg:col-span-8'
          }`}>
            
            {/* Service Banner Block */}
            <div className="rounded-[24px] border border-brand-navy/10 overflow-hidden bg-white shadow-sm flex flex-col md:flex-row items-center gap-6 p-6">
              <div className="relative w-full md:w-[240px] aspect-[4/3] rounded-xl bg-brand-blue-light/30 flex items-center justify-center shrink-0">
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <div className="flex flex-col gap-3 text-center md:text-left">
                <h1 className={`font-extrabold text-brand-navy tracking-tight leading-none ${
                  isEasyRead ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
                }`}>
                  {service.title}
                </h1>
                <p className={`font-bold text-brand-teal ${isEasyRead ? 'text-lg' : 'text-sm'}`}>
                  {service.tagline}
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-bold text-brand-navy/70 mt-2 justify-center md:justify-start">
                  <span className="flex items-center gap-1 bg-brand-blue-light/50 px-3 py-1.5 rounded-lg border border-brand-blue-light/40">
                    <Globe className="h-4 w-4 text-brand-teal" />
                    {service.delivery}
                  </span>
                  <span className="flex items-center gap-1 bg-brand-blue-light/50 px-3 py-1.5 rounded-lg border border-brand-blue-light/40">
                    <MapPin className="h-4 w-4 text-brand-teal" />
                    {service.location}
                  </span>
                  <span className="flex items-center gap-1 bg-brand-blue-light/50 px-3 py-1.5 rounded-lg border border-brand-blue-light/40">
                    <DollarSign className="h-4 w-4 text-brand-teal" />
                    {service.cost === 'Free' ? 'No cost' : `${service.cost} NDIS plan`}
                  </span>
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <div className="flex flex-col gap-4">
              <h2 className={`font-extrabold text-brand-navy border-b border-brand-navy/10 pb-2 ${
                isEasyRead ? 'text-2xl' : 'text-xl'
              }`}>
                Overview
              </h2>
              <p className={`font-medium text-brand-navy/75 leading-relaxed ${
                isEasyRead ? 'text-lg' : 'text-[15px]'
              }`}>
                {service.longDescription}
              </p>
            </div>

            {/* Accessibility Features */}
            <div className="flex flex-col gap-4">
              <h2 className={`font-extrabold text-brand-navy border-b border-brand-navy/10 pb-2 ${
                isEasyRead ? 'text-2xl' : 'text-xl'
              }`}>
                Accessibility Features
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
                {service.accessibilityFeatures.map((feat, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <CheckCircle className="h-5 w-5 text-brand-teal shrink-0 mt-0.5" aria-hidden="true" />
                    <span className={`font-medium text-brand-navy/80 ${isEasyRead ? 'text-[16px]' : 'text-sm'}`}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Communication channels */}
            <div className="flex flex-col gap-4">
              <h2 className={`font-extrabold text-brand-navy border-b border-brand-navy/10 pb-2 ${
                isEasyRead ? 'text-2xl' : 'text-xl'
              }`}>
                Supported Communication Methods
              </h2>
              <div className="flex flex-wrap gap-3">
                {service.communication.map((comm) => (
                  <div 
                    key={comm} 
                    className="flex items-center gap-2 rounded-xl bg-brand-blue-light/35 border border-brand-teal/20 px-4 py-2 text-brand-navy"
                  >
                    {getCommIcon(comm)}
                    <span className={`font-bold capitalize ${isEasyRead ? 'text-sm' : 'text-xs'}`}>
                      {comm === 'in_person' ? 'In Person' : comm === 'auslan' ? 'Auslan' : comm}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Contact Panel Card */}
            <div className="rounded-[24px] border-[2px] border-brand-teal/20 bg-brand-blue-light/10 p-6 md:p-8 shadow-sm flex flex-col gap-6">
              
              <div>
                <h2 className="text-xl font-extrabold text-brand-navy tracking-tight">Book or Contact</h2>
                <p className="text-xs font-medium text-brand-navy/60 mt-1">
                  Submit a request and we will connect you using your preferred format.
                </p>
              </div>

              {bookingSubmitted ? (
                <div className="flex flex-col items-center text-center gap-3 py-6 bg-white rounded-2xl border border-brand-teal/15 p-4 animate-in zoom-in-95">
                  <div className="h-12 w-12 rounded-full bg-brand-teal/15 text-brand-teal flex items-center justify-center" aria-hidden="true">
                    <CheckCircle className="h-7 w-7" />
                  </div>
                  <h4 className="font-extrabold text-[16px]">Request Submitted!</h4>
                  <p className="text-xs font-semibold text-brand-navy/70 leading-relaxed">
                    We will get back to you using your preferred contact details shortly.
                  </p>
                  <button 
                    onClick={() => setBookingSubmitted(false)}
                    className="mt-3 text-xs font-extrabold text-brand-teal hover:underline focus:outline-none cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(handleBookingSubmit)} className="flex flex-col gap-4">
                  
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="details-name" className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/60">
                      Your Name
                    </label>
                    <input
                      id="details-name"
                      type="text"
                      {...register("name")}
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50 ${
                        errors.name ? 'border-brand-coral bg-brand-coral/5 focus:ring-brand-coral/50' : 'border-brand-navy/15 focus:border-brand-teal'
                      }`}
                      placeholder="Robin"
                    />
                    {errors.name && (
                      <span id="name-error" role="alert" className="text-xs font-bold text-brand-coral flex items-center gap-1 mt-1">
                        <AlertCircleIcon />
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Contact field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="details-contact" className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/60">
                      How should we reach you?
                    </label>
                    <input
                      id="details-contact"
                      type="text"
                      {...register("contact")}
                      aria-invalid={errors.contact ? "true" : "false"}
                      aria-describedby={errors.contact ? "contact-error" : undefined}
                      className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50 ${
                        errors.contact ? 'border-brand-coral bg-brand-coral/5 focus:ring-brand-coral/50' : 'border-brand-navy/15 focus:border-brand-teal'
                      }`}
                      placeholder="e.g. FaceTime ID, SMS, or Email"
                    />
                    {errors.contact && (
                      <span id="contact-error" role="alert" className="text-xs font-bold text-brand-coral flex items-center gap-1 mt-1">
                        <AlertCircleIcon />
                        {errors.contact.message}
                      </span>
                    )}
                  </div>

                  {/* Time field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="details-time" className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/60">
                      Preferred Day or Time
                    </label>
                    <input
                      id="details-time"
                      type="text"
                      {...register("time")}
                      aria-invalid={errors.time ? "true" : "false"}
                      aria-describedby={errors.time ? "time-error" : undefined}
                      className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50 ${
                        errors.time ? 'border-brand-coral bg-brand-coral/5 focus:ring-brand-coral/50' : 'border-brand-navy/15 focus:border-brand-teal'
                      }`}
                      placeholder="e.g. Wednesday morning"
                    />
                    {errors.time && (
                      <span id="time-error" role="alert" className="text-xs font-bold text-brand-coral flex items-center gap-1 mt-1">
                        <AlertCircleIcon />
                        {errors.time.message}
                      </span>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="details-msg" className="text-xs font-extrabold uppercase tracking-wider text-brand-navy/60">
                      Message (Optional)
                    </label>
                    <textarea
                      id="details-msg"
                      rows={3}
                      {...register("message")}
                      className="w-full rounded-xl border border-brand-navy/15 px-4 py-3 text-sm focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/50"
                      placeholder="Any information about interpreter preference..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-2 flex items-center justify-center gap-2 rounded-full bg-brand-primary text-white hover:opacity-90 py-3.5 text-sm font-bold shadow-md cursor-pointer transition-all hover:scale-[1.02] focus:outline-none active:scale-[0.98]"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Request</span>
                  </button>

                </form>
              )}

              {/* Service contact indicators */}
              <div className="pt-4 border-t border-brand-navy/15 flex flex-col gap-2.5 text-xs font-semibold text-brand-navy/70">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-teal" />
                  <span>{service.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-brand-teal" />
                  <a href={`mailto:${service.contactEmail}`} className="hover:underline">{service.contactEmail}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand-teal" />
                  <span>SMS: {service.contactSMS}</span>
                </div>
              </div>

            </div>

            {/* Related Services */}
            <div className="rounded-[24px] border border-brand-navy/10 bg-white p-6 shadow-sm flex flex-col gap-4">
              <h3 className="text-[15px] font-extrabold text-brand-navy">Related Services</h3>
              <div className="flex flex-col gap-3">
                {service.relatedIds.map((relId) => {
                  const relServ = servicesData[relId];
                  if (!relServ) return null;
                  return (
                    <Link 
                      key={relId} 
                      href={`/services/${relId}`}
                      className="group flex items-center justify-between p-3 rounded-xl border border-brand-navy/5 hover:border-brand-teal bg-brand-blue-light/10 hover:bg-brand-blue-light/20 transition-all focus:outline-none"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-extrabold text-brand-navy group-hover:text-brand-teal transition-colors">
                          {relServ.title}
                        </span>
                        <span className="text-[10px] text-brand-navy/50 font-medium">
                          {relServ.delivery} • {relServ.location}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-brand-navy/40 group-hover:text-brand-teal transition-all group-hover:translate-x-0.5" />
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </AnimatePage>
  );
}

// Inline alert icon helper
function AlertCircleIcon() {
  return (
    <svg 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="shrink-0"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
