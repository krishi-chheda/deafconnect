"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Clock, Languages, Search, Users, Gift, HelpCircle, FileText, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnimatePage from "@/components/guided/AnimatePage";
import { useAccessibility } from "@/context/AccessibilityContext";

const volunteerSchema = z.object({
  fullName: z.string().min(2, 'Please enter your name'),
  emailAddress: z.string().email('Please enter a valid email address'),
  auslanSkill: z.string().min(1, 'Please select your Auslan skill level')
});

type VolunteerFormValues = z.infer<typeof volunteerSchema>;

interface CommEvent {
  title: string;
  desc: string;
  category: 'social' | 'workshop' | 'group' | 'volunteer';
  date: string;
  time: string;
  location: string;
  interpreter: boolean;
  tag: string;
}

const EVENTS: CommEvent[] = [
  {
    title: "Hobart Deaf Coffee Catch-up",
    desc: "A relaxed weekly meetup for Deaf, hard-of-hearing signers, and learners to socialise and sign over coffee.",
    category: 'social',
    date: "Every Saturday",
    time: "10:00 AM - 12:00 PM",
    location: "Cascade Gardens Cafe, Hobart",
    interpreter: true,
    tag: "Social Meetup"
  },
  {
    title: "Auslan Sign Language Course (Level 1)",
    desc: "Learn introductory Auslan vocabulary, grammar, and Deaf culture guidelines from native deaf signers.",
    category: 'workshop',
    date: "Starts August 5, 2026",
    time: "6:00 PM - 7:30 PM",
    location: "Launceston Community Hub",
    interpreter: true,
    tag: "Workshop"
  },
  {
    title: "Deaf-Aware NDIS Planning Forum",
    desc: "Get practical guidance on managing your mental health support packages and funding guidelines.",
    category: 'workshop',
    date: "August 18, 2026",
    time: "2:00 PM - 4:00 PM",
    location: "Online (Statewide Telehealth)",
    interpreter: true,
    tag: "Information Session"
  },
  {
    title: "Peer Support Circle: Mental Wellbeing",
    desc: "A safe, monthly peer support group for Deaf adults to share experiences and build coping strategies.",
    category: 'group',
    date: "August 28, 2026",
    time: "1:00 PM - 3:00 PM",
    location: "Hobart City Library Room 2",
    interpreter: true,
    tag: "Support Group"
  },
  {
    title: "Auslan Conversation Partner",
    desc: "Volunteer to practice Auslan signing with children and new learners. Requires intermediate Auslan level.",
    category: 'volunteer',
    date: "Flexible Hours",
    time: "1-2 Hours/Week",
    location: "Statewide (In-Person or Video)",
    interpreter: false,
    tag: "Volunteer Opportunity"
  }
];

export default function CommunityPage() {
  const { accessibilityMode } = useAccessibility();
  const isEasyRead = accessibilityMode === 'easyRead';

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    mode: 'onChange'
  });

  const onVolunteerSubmit = (data: VolunteerFormValues) => {
    setVolunteerSubmitted(true);
  };

  // Filter events
  const filteredEvents = useMemo(() => {
    return EVENTS.filter(ev => {
      const matchesSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            ev.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            ev.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = selectedFilter === 'all' || ev.category === selectedFilter;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, selectedFilter]);

  return (
    <>
      <Navbar />
      
      <main className="flex-1 w-full bg-white animate-in" id="main-content">
        <AnimatePage>
          <div className="mx-auto max-w-[1440px] px-6 sm:px-8 py-12">
            
            {/* Breadcrumbs */}
            <Breadcrumbs items={[
              { name: "Community Connection" }
            ]} />

            {/* Hero Section */}
            <div className="rounded-[24px] bg-brand-blue-light/40 border border-brand-blue-light/35 p-8 sm:p-12 mb-12 flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex flex-col gap-4 max-w-[640px]">
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Tasmanian Connection Hub</span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-navy leading-tight">
                  Community Connection
                </h1>
                <p className="text-base font-semibold text-brand-navy/70 leading-relaxed">
                  Find peer support groups, upcoming social meetups, educational workshops, local Deaf organisations, and active volunteer opportunities.
                </p>
              </div>
              <div className="relative w-48 h-48 shrink-0 hidden md:block">
                <Image
                  src="/illustrations/service_community.png"
                  alt="Illustration representing community gatherings"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
              
              {/* Left Column: Filter and Volunteer Form */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                
                {/* Search Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="event-search" className="text-xs font-extrabold uppercase tracking-wider text-brand-teal">Search Calendar</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-navy/30" />
                    <input
                      id="event-search"
                      type="text"
                      placeholder="Search meetups, workshops..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-brand-navy/10 bg-white text-xs font-bold text-brand-navy focus:border-brand-teal focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Volunteer Registration card */}
                <div className="rounded-2xl border-2 border-brand-teal/20 bg-brand-blue-light/10 p-6 sm:p-8 shadow-sm">
                  {volunteerSubmitted ? (
                    <div className="flex flex-col items-center text-center gap-4 py-6">
                      <CheckCircle className="h-14 w-14 text-emerald-500 animate-bounce" />
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-extrabold text-brand-navy">Registration Successful</h3>
                        <p className="text-xs text-brand-navy/60 font-semibold max-w-[280px]">
                          Thank you for registering! A coordinator will email you soon to discuss active volunteer roles.
                        </p>
                      </div>
                      <button
                        onClick={() => setVolunteerSubmitted(false)}
                        className="mt-2 h-10 px-5 rounded-full border border-brand-navy/20 text-xs font-bold text-brand-navy hover:bg-white transition-colors"
                      >
                        Register Another Account
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onVolunteerSubmit)} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-base font-extrabold text-brand-navy">Become a Community Volunteer</h3>
                        <p className="text-[11px] text-brand-navy/60 font-semibold leading-relaxed">
                          Help practice Auslan, assist in meetups, or support coordinate local events. Fill out details to apply.
                        </p>
                      </div>

                      {/* Name */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="text-[10px] font-extrabold uppercase tracking-wider text-brand-teal">Full Name</label>
                        <input
                          id="fullName"
                          type="text"
                          placeholder="Your Name"
                          {...register('fullName')}
                          className={`w-full h-10 px-3 rounded-lg border text-xs font-bold text-brand-navy focus:border-brand-teal focus:outline-none bg-white ${
                            errors.fullName ? 'border-red-500' : 'border-brand-navy/10'
                          }`}
                        />
                        {errors.fullName && <span className="text-[10px] text-red-500">{errors.fullName.message}</span>}
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="emailAddress" className="text-[10px] font-extrabold uppercase tracking-wider text-brand-teal">Email Address</label>
                        <input
                          id="emailAddress"
                          type="email"
                          placeholder="name@example.com"
                          {...register('emailAddress')}
                          className={`w-full h-10 px-3 rounded-lg border text-xs font-bold text-brand-navy focus:border-brand-teal focus:outline-none bg-white ${
                            errors.emailAddress ? 'border-red-500' : 'border-brand-navy/10'
                          }`}
                        />
                        {errors.emailAddress && <span className="text-[10px] text-red-500">{errors.emailAddress.message}</span>}
                      </div>

                      {/* Skill Level Selection */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="auslanSkill" className="text-[10px] font-extrabold uppercase tracking-wider text-brand-teal">Auslan Skill Level</label>
                        <select
                          id="auslanSkill"
                          {...register('auslanSkill')}
                          className={`h-10 px-3 rounded-lg border text-xs font-bold text-brand-navy focus:border-brand-teal bg-white ${
                            errors.auslanSkill ? 'border-red-500' : 'border-brand-navy/10'
                          }`}
                        >
                          <option value="">Select skill level...</option>
                          <option value="none">No signing skills (Learner)</option>
                          <option value="basic">Basic Auslan (Level 1/2)</option>
                          <option value="fluent">Fluent Signer / Native</option>
                        </select>
                        {errors.auslanSkill && <span className="text-[10px] text-red-500">{errors.auslanSkill.message}</span>}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={!isValid}
                        className={`w-full h-11 flex items-center justify-center rounded-full text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${
                          isValid 
                            ? 'bg-brand-coral text-white hover:bg-brand-coral-hover shadow-sm' 
                            : 'bg-brand-navy/10 text-brand-navy/35 cursor-not-allowed'
                        }`}
                      >
                        Submit Application
                      </button>

                    </form>
                  )}
                </div>

              </div>

              {/* Right Column: Events & Peer Groups lists */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Category tab chips */}
                <div className="flex flex-wrap gap-2 border-b border-brand-navy/10 pb-4">
                  {[
                    { id: 'all', label: 'All Calendar' },
                    { id: 'social', label: 'Social Meetups' },
                    { id: 'workshop', label: 'Workshops & Forums' },
                    { id: 'group', label: 'Peer Groups' },
                    { id: 'volunteer', label: 'Volunteer Roles' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedFilter(tab.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all focus:outline-none ${
                        selectedFilter === tab.id
                          ? 'bg-brand-teal text-white shadow-sm'
                          : 'bg-brand-blue-light/40 border border-brand-navy/5 text-brand-navy/70 hover:bg-brand-blue-light/70'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="text-xs font-semibold text-brand-navy/50">
                  Showing {filteredEvents.length} active connection pathways
                </div>

                {/* Event listings grid */}
                <div className="flex flex-col gap-6" role="list">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((ev, index) => (
                      <div 
                        key={index} 
                        className="rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-sm flex flex-col justify-between gap-4 hover:shadow-md hover:border-brand-teal/20 transition-all duration-300"
                        role="listitem"
                      >
                        
                        <div className="flex flex-col gap-3">
                          {/* Heading badges */}
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded">
                              {ev.tag}
                            </span>
                            {ev.interpreter && (
                              <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-coral bg-brand-coral/10 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                                <span>🤟 Signed</span>
                              </span>
                            )}
                          </div>

                          <h3 className="text-base font-extrabold text-brand-navy">{ev.title}</h3>
                          <p className="text-xs font-semibold text-brand-navy/60 leading-relaxed pr-2">
                            {ev.desc}
                          </p>
                        </div>

                        {/* Calendar details */}
                        <div className="flex flex-wrap gap-4 text-[11px] font-bold text-brand-navy/75 pt-3 border-t border-brand-navy/5">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-brand-teal shrink-0" />
                            <span>{ev.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-brand-teal shrink-0" />
                            <span>{ev.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-brand-teal shrink-0" />
                            <span>{ev.location}</span>
                          </div>
                        </div>

                        {/* Register Action button */}
                        <div className="flex justify-end mt-2">
                          <button className="h-9 px-4 rounded-full bg-brand-coral text-white hover:bg-brand-coral-hover text-xs font-bold transition-colors">
                            Register Interest
                          </button>
                        </div>

                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-brand-navy/20 bg-brand-blue-light/5 p-12 text-center flex flex-col items-center gap-3">
                      <span className="text-3xl">📅</span>
                      <span className="text-sm font-bold text-brand-navy">No Events Scheduled</span>
                      <span className="text-xs text-brand-navy/55 max-w-[280px]">Try searching other filters or checking back next week.</span>
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Related resources downloads */}
            <div className="rounded-[24px] border border-brand-teal/20 bg-brand-blue-light/20 p-8 sm:p-10 text-center flex flex-col items-center gap-6 max-w-[880px] mx-auto">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Tasmanian Organisations</span>
                <h3 className="text-xl font-bold text-brand-navy">Deaf Community Associations</h3>
                <p className="text-xs font-semibold text-brand-navy/60 max-w-[500px] leading-relaxed">
                  Get in touch with local Tasmanian clubs for social gatherings, sports, and Deaf history catalog guides.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center w-full text-xs font-extrabold text-brand-navy/80">
                <a 
                  href="https://www.tasdeaf.org.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-5 rounded-full bg-white border border-brand-navy/10 hover:border-brand-teal flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <span>Deaf Tasmania Association</span>
                  <span className="text-brand-teal text-xs">→</span>
                </a>
                <a 
                  href="https://www.deafsportstas.org.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-5 rounded-full bg-white border border-brand-navy/10 hover:border-brand-teal flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <span>Deaf Sports Tasmania</span>
                  <span className="text-brand-teal text-xs">→</span>
                </a>
              </div>
            </div>

          </div>
        </AnimatePage>
      </main>

      <Footer />
    </>
  );
}
