"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Phone, HelpCircle, FileText, ChevronDown, Check, Info } from 'lucide-react';
import Breadcrumbs from "@/components/Breadcrumbs";
import AnimatePage from "@/components/guided/AnimatePage";
import { useAccessibility } from "@/context/AccessibilityContext";
import EmergencyBanner from "@/components/ui/EmergencyBanner";
import InterpreterVideo from "@/components/guided/InterpreterVideo";

interface Clinic {
  id: string;
  name: string;
  category: 'counselling' | 'psychology' | 'youth' | 'family';
  region: 'south' | 'north' | 'northwest' | 'statewide';
  phone: string;
  sms?: string;
  email: string;
  auslan: boolean;
  ndis: boolean;
  telehealth: boolean;
  address: string;
  description: string;
}

const CLINICS: Clinic[] = [
  {
    id: 'tas-mind-south',
    name: 'Tas Sign Counselling Services',
    category: 'counselling',
    region: 'south',
    phone: '03 6231 1234',
    sms: '0477 98 12 34',
    email: 'south@tassigncounsel.org.au',
    auslan: true,
    ndis: true,
    telehealth: true,
    address: '152 Macquarie St, Hobart TAS 7000',
    description: 'Fully qualified counsellors fluent in Auslan. Specialising in anxiety, depression, and NDIS therapeutic support.'
  },
  {
    id: 'north-deaf-psych',
    name: 'Northern Deaf Psychology Hub',
    category: 'psychology',
    region: 'north',
    phone: '03 6334 5678',
    email: 'launceston@deafpsychhub.org.au',
    auslan: true,
    ndis: true,
    telehealth: true,
    address: '89 George St, Launceston TAS 7250',
    description: 'Clinical psychologists offering cognitive behavioural therapy (CBT) and diagnostic evaluations for Deaf adults.'
  },
  {
    id: 'northwest-sign-health',
    name: 'North-West Sign Health',
    category: 'family',
    region: 'northwest',
    phone: '03 6424 9911',
    sms: '0488 12 34 56',
    email: 'burnie@signhealthnw.com.au',
    auslan: false,
    ndis: true,
    telehealth: true,
    address: '42 Rooke St, Devonport TAS 7310',
    description: 'Deaf-aware family therapy and counseling. Certified Auslan interpreters can be booked free of charge for sessions.'
  },
  {
    id: 'state-deaf-youth',
    name: 'Tas Youth Signs Connect',
    category: 'youth',
    region: 'statewide',
    phone: '1800 55 1800',
    sms: '0477 13 11 14',
    email: 'youth@deaftasmania.org',
    auslan: true,
    ndis: false,
    telehealth: true,
    address: 'Statewide Telehealth & Digital Hub',
    description: 'Dedicated youth peer groups and counseling programs for Deaf teenagers and young adults across Tasmania.'
  },
  {
    id: 'hobart-wellbeing',
    name: 'Derwent Signing Wellbeing Clinic',
    category: 'counselling',
    region: 'south',
    phone: '03 6211 4321',
    email: 'derwent@signingwellbeing.com.au',
    auslan: false,
    ndis: true,
    telehealth: true,
    address: '22 Elizabeth St, Hobart TAS 7000',
    description: 'General support counseling and NDIS mental health recovery coaches. Staff trained in Deaf-aware social practices.'
  }
];

export default function MentalHealthSupportPage() {
  const { accessibilityMode } = useAccessibility();
  const isEasyRead = accessibilityMode === 'easyRead';

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [filterAuslan, setFilterAuslan] = useState(false);
  const [filterNdis, setFilterNdis] = useState(false);
  const [filterTelehealth, setFilterTelehealth] = useState(false);
  const [bookedClinicId, setBookedClinicId] = useState<string | null>(null);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  // FAQ Accordion states
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Filter logic
  const filteredClinics = useMemo(() => {
    return CLINICS.filter(clinic => {
      const matchesSearch = clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            clinic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            clinic.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || clinic.category === selectedCategory;
      const matchesRegion = selectedRegion === 'all' || clinic.region === selectedRegion || clinic.region === 'statewide';
      
      const matchesAuslan = !filterAuslan || clinic.auslan;
      const matchesNdis = !filterNdis || clinic.ndis;
      const matchesTelehealth = !filterTelehealth || clinic.telehealth;

      return matchesSearch && matchesCategory && matchesRegion && matchesAuslan && matchesNdis && matchesTelehealth;
    });
  }, [searchQuery, selectedCategory, selectedRegion, filterAuslan, filterNdis, filterTelehealth]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: isEasyRead ? "Can I get a sign interpreter for my doctor visit?" : "Are Auslan interpreters provided for therapy sessions?",
      a: isEasyRead 
        ? "Yes. It is free. The clinic will book an Auslan interpreter for your session." 
        : "Yes. Under the NDIS or through free community translation programs, clinical health centers are legally required or funded to provide registered Auslan interpreters for appointments. Ensure you request one when booking."
    },
    {
      q: isEasyRead ? "Does NDIS pay for my mental health support?" : "Can I use my NDIS plan to cover mental health counseling?",
      a: isEasyRead 
        ? "Yes. If your NDIS plan has 'Improved Daily Living' or therapy budgets, it pays for counselling." 
        : "Yes, if you have therapeutic support funds in your NDIS plan (under 'Capacity Building: Improved Daily Living'). Self-managed or plan-managed packages can be directly claimed at registered clinics."
    },
    {
      q: isEasyRead ? "What is Telehealth?" : "How does video/telehealth therapy work?",
      a: isEasyRead 
        ? "You talk to your therapist using a video camera on your phone or laptop. It works anywhere in Tasmania." 
        : "Telehealth allows you to join video therapy sessions online from home. For Deaf clients, this is often integrated with video relay services or direct signing therapy providers, removing travel barriers."
    }
  ];

  return (
    <AnimatePage>
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 py-12" id="main-content">
            
            {/* Breadcrumbs */}
            <Breadcrumbs items={[
              { name: "Services", href: "/services" },
              { name: "Mental Health Support" }
            ]} />

            {/* Hero Section */}
            <div className="rounded-[24px] bg-brand-blue-light/40 border border-brand-blue-light/35 p-8 sm:p-12 mb-12 flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex flex-col gap-4 max-w-[640px]">
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Clinical & Community Care</span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primaryText leading-tight">
                  Deaf Mental Health Support
                </h1>
                <p className="text-base font-semibold text-primaryText/70 leading-relaxed">
                  Tasmanian database of deaf-aware, signing, and NDIS-certified therapists. Find support that understands your communication needs.
                </p>
              </div>
              <div className="relative w-48 h-48 shrink-0 hidden md:block">
                <Image
                  src="/illustrations/service_mental_health.png"
                  alt="Illustration representing wellness and therapy"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Auslan Interpreter Video Header in Auslan Mode */}
            {accessibilityMode === 'auslan' && (
              <div className="flex justify-center mb-12">
                <InterpreterVideo stepKey="mental-health" questionText="Deaf Mental Health Support" />
              </div>
            )}

            {/* Quick Emergency Banner */}
            <EmergencyBanner className="mb-12" />

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
              
              {/* Left Column: Interactive Map & Filters */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                
                {/* Search Bar Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="search" className="text-xs font-extrabold uppercase tracking-wider text-brand-teal">Search Services</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primaryText/30" />
                    <input
                      id="search"
                      type="text"
                      placeholder="Search clinic names, locations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-primaryText/10 bg-white text-xs font-bold text-primaryText focus:border-brand-teal focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Region Filter with Interactive Map */}
                <div className="rounded-2xl border border-primaryText/10 bg-brand-blue-light/10 p-6 flex flex-col gap-6">
                  <div className="flex flex-col">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-brand-teal">Tasmania Region Filter</span>
                    <span className="text-[11px] font-semibold text-primaryText/55">Click a marker on the map to filter clinics by location.</span>
                  </div>

                  {/* SVG Map of Tasmania */}
                  <div className="relative aspect-[16/14] w-full max-w-[280px] mx-auto bg-brand-blue-light/20 rounded-xl border border-primaryText/5 p-4 flex items-center justify-center">
                    
                    {/* Simplified SVG Outline of Tasmania */}
                    <svg viewBox="0 0 100 90" className="w-full h-full text-brand-teal/15" fill="currentColor" aria-hidden="true">
                      <path d="M12 18 L68 12 L85 45 L72 78 L45 82 L18 64 L12 18 Z" />
                    </svg>

                    {/* Interactive Absolute Markers Overlay */}
                    {/* Northwest Pin */}
                    <button
                      onClick={() => setSelectedRegion(selectedRegion === 'northwest' ? 'all' : 'northwest')}
                      className={`absolute top-[28%] left-[28%] -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-[9px] font-extrabold flex items-center gap-1 shadow-sm transition-all focus:outline-none border-2 ${
                        selectedRegion === 'northwest' 
                          ? 'bg-brand-coral border-brand-coral text-white scale-105' 
                          : 'bg-white border-primaryText/10 text-primaryText hover:border-brand-teal'
                      }`}
                      aria-label="Filter Devonport and North-West region"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${selectedRegion === 'northwest' ? 'bg-white' : 'bg-brand-teal animate-ping'}`} />
                      <span>NW / Devonport</span>
                    </button>

                    {/* Launceston Pin */}
                    <button
                      onClick={() => setSelectedRegion(selectedRegion === 'north' ? 'all' : 'north')}
                      className={`absolute top-[34%] left-[62%] -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-[9px] font-extrabold flex items-center gap-1 shadow-sm transition-all focus:outline-none border-2 ${
                        selectedRegion === 'north' 
                          ? 'bg-brand-coral border-brand-coral text-white scale-105' 
                          : 'bg-white border-primaryText/10 text-primaryText hover:border-brand-teal'
                      }`}
                      aria-label="Filter Launceston and Northern region"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${selectedRegion === 'north' ? 'bg-white' : 'bg-brand-teal animate-ping'}`} />
                      <span>North / Laun</span>
                    </button>

                    {/* Hobart Pin */}
                    <button
                      onClick={() => setSelectedRegion(selectedRegion === 'south' ? 'all' : 'south')}
                      className={`absolute top-[72%] left-[58%] -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-[9px] font-extrabold flex items-center gap-1 shadow-sm transition-all focus:outline-none border-2 ${
                        selectedRegion === 'south' 
                          ? 'bg-brand-coral border-brand-coral text-white scale-105' 
                          : 'bg-white border-primaryText/10 text-primaryText hover:border-brand-teal'
                      }`}
                      aria-label="Filter Hobart and Southern region"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${selectedRegion === 'south' ? 'bg-white' : 'bg-brand-teal animate-ping'}`} />
                      <span>South / Hobart</span>
                    </button>

                  </div>

                  {/* Manual region selection select dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="region-select" className="text-[10px] font-extrabold uppercase tracking-wider text-primaryText/40">Select Region Manually</label>
                    <select
                      id="region-select"
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="h-10 px-3 rounded-lg border-2 border-primaryText/10 text-xs font-bold text-primaryText focus:border-brand-teal bg-white"
                    >
                      <option value="all">Show All Regions (Statewide)</option>
                      <option value="south">Hobart & South</option>
                      <option value="north">Launceston & North</option>
                      <option value="northwest">Devonport & North-West</option>
                    </select>
                  </div>
                </div>

                {/* Accessibility filters checklist */}
                <div className="rounded-2xl border border-primaryText/10 bg-white p-6 flex flex-col gap-4">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-brand-teal">Accessibility Filters</span>
                  
                  <div className="flex flex-col gap-2.5 text-xs font-bold text-primaryText">
                    
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filterAuslan}
                        onChange={(e) => setFilterAuslan(e.target.checked)}
                        className="rounded h-4 w-4 text-brand-coral focus:ring-brand-coral border-primaryText/20"
                      />
                      <span>🤟 Auslan Fluent Therapists Only</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filterNdis}
                        onChange={(e) => setFilterNdis(e.target.checked)}
                        className="rounded h-4 w-4 text-brand-coral focus:ring-brand-coral border-primaryText/20"
                      />
                      <span>✓ Registered NDIS Providers</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filterTelehealth}
                        onChange={(e) => setFilterTelehealth(e.target.checked)}
                        className="rounded h-4 w-4 text-brand-coral focus:ring-brand-coral border-primaryText/20"
                      />
                      <span>📹 Video Telehealth Available</span>
                    </label>

                  </div>
                </div>

              </div>

              {/* Right Column: Search Results */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Category tabs */}
                <div className="flex flex-wrap gap-2 border-b border-primaryText/10 pb-4">
                  {[
                    { id: 'all', label: 'All Services' },
                    { id: 'counselling', label: 'Counselling' },
                    { id: 'psychology', label: 'Psychology' },
                    { id: 'youth', label: 'Youth Programs' },
                    { id: 'family', label: 'Family Therapy' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedCategory(tab.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        selectedCategory === tab.id 
                          ? 'bg-brand-teal text-white shadow-sm'
                          : 'bg-brand-blue-light/40 border border-primaryText/5 text-primaryText/70 hover:bg-brand-blue-light/70'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Filter indicators */}
                <div className="text-xs font-semibold text-primaryText/50 flex justify-between items-center">
                  <span>Showing {filteredClinics.length} clinical support pathways</span>
                  {(searchQuery || selectedCategory !== 'all' || selectedRegion !== 'all' || filterAuslan || filterNdis || filterTelehealth) && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setSelectedRegion('all');
                        setFilterAuslan(false);
                        setFilterNdis(false);
                        setFilterTelehealth(false);
                      }}
                      className="text-brand-coral hover:text-brand-coral-hover font-bold hover:underline"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>

                {/* Clinic Cards List */}
                <div className="flex flex-col gap-6" role="list">
                  {filteredClinics.length > 0 ? (
                    filteredClinics.map((clinic) => (
                      <div 
                        key={clinic.id} 
                        className="rounded-2xl border-2 border-primaryText/5 bg-white p-6 shadow-sm flex flex-col justify-between gap-6 hover:shadow-md hover:border-brand-teal/20 transition-all duration-300 relative overflow-hidden"
                        role="listitem"
                      >
                        
                        <div className="flex flex-col gap-3">
                          {/* Heading */}
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="text-lg font-bold text-primaryText">{clinic.name}</h3>
                            <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-teal bg-brand-teal/15 px-2.5 py-1 rounded">
                              {clinic.region === 'statewide' ? 'Statewide' : clinic.region === 'south' ? 'South / Hobart' : clinic.region === 'north' ? 'North / Laun' : 'NW / Devonport'}
                            </span>
                          </div>

                          <p className="text-xs font-medium text-primaryText/70 leading-relaxed pr-2">
                            {clinic.description}
                          </p>

                          {/* Address details */}
                          <div className="flex items-center gap-2 text-xs font-bold text-primaryText/60">
                            <MapPin className="h-4 w-4 text-brand-teal shrink-0" />
                            <span>{clinic.address}</span>
                          </div>
                        </div>

                        {/* Specs Pills */}
                        <div className="flex flex-wrap gap-2.5">
                          {clinic.auslan && (
                            <span className="text-[10px] font-bold text-brand-coral bg-brand-coral/10 px-2 py-0.5 rounded">
                              🤟 Auslan Fluent
                            </span>
                          )}
                          {clinic.ndis && (
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                              ✓ NDIS Provider
                            </span>
                          )}
                          {clinic.telehealth && (
                            <span className="text-[10px] font-bold text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded">
                              📹 Video Telehealth
                            </span>
                          )}
                        </div>

                        {/* Divider Line */}
                        <div className="border-t border-primaryText/5 pt-4 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex flex-wrap gap-4 text-xs font-semibold text-primaryText/80">
                            <a href={`tel:${clinic.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 hover:text-brand-coral">
                              <Phone className="h-3.5 w-3.5" />
                              <span>{clinic.phone}</span>
                            </a>
                            {clinic.sms && (
                              <a href={`sms:${clinic.sms.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 hover:text-brand-coral">
                                <span>📱 Text: {clinic.sms}</span>
                              </a>
                            )}
                            <a href={`mailto:${clinic.email}`} className="flex items-center gap-1.5 hover:text-brand-coral">
                              <span>✉ {clinic.email}</span>
                            </a>
                          </div>

                          <button 
                            onClick={() => {
                              setBookedClinicId(clinic.id);
                              setTimeout(() => setBookedClinicId(null), 4000);
                            }}
                            className="h-9 px-4 rounded-full bg-brand-coral text-white hover:bg-brand-coral-hover text-xs font-bold transition-all cursor-pointer focus:outline-none"
                            aria-label={`Book session with ${clinic.name}`}
                          >
                            {bookedClinicId === clinic.id ? "✓ Session Requested" : "Book Session"}
                          </button>
                        </div>

                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-primaryText/20 bg-brand-blue-light/5 p-12 text-center flex flex-col items-center gap-3">
                      <span className="text-3xl">🔍</span>
                      <span className="text-sm font-bold text-primaryText">No Clinical Supports Found</span>
                      <span className="text-xs text-primaryText/55 max-w-[340px]">Try adjusting your region selections, enabling Telehealth alternatives, or resetting filters.</span>
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Collapsible Accordion FAQs */}
            <div className="max-w-[760px] mx-auto mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-primaryText sm:text-3xl">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs font-semibold text-primaryText/60 mt-1.5">
                  Understand how to access, fund, and coordinate clinical services in Tasmania.
                </p>
              </div>

              <div className="flex flex-col gap-3" role="list">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div 
                      key={index}
                      className="rounded-2xl border border-primaryText/10 bg-white overflow-hidden transition-all duration-200"
                      role="listitem"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-5 text-left text-primaryText hover:text-brand-teal focus:outline-none transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span className="text-sm font-extrabold flex items-center gap-2.5">
                          <HelpCircle className="h-4.5 w-4.5 text-brand-teal shrink-0" />
                          <span>{faq.q}</span>
                        </span>
                        <ChevronDown className={`h-4.5 w-4.5 text-primaryText/40 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-0 border-t border-primaryText/5">
                          <p className="text-xs font-semibold leading-relaxed text-primaryText/70 mt-3 pl-7">
                            {faq.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Related Resources Downloads Section */}
            <div className="rounded-[24px] border border-brand-teal/20 bg-brand-blue-light/20 p-8 sm:p-10 text-center flex flex-col items-center gap-6 max-w-[880px] mx-auto">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Documents & Guides</span>
                <h3 className="text-xl font-bold text-brand-navy">Mental Health Support Toolkit</h3>
                <p className="text-xs font-semibold text-brand-navy/60 max-w-[500px] leading-relaxed">
                  Download printable Easy Read guides and booklets to help navigate NDIS planning and local telehealth applications.
                </p>
              </div>

              {downloadSuccessMsg && (
                <div className="rounded-xl bg-brand-teal/15 border border-brand-teal/30 p-3 text-xs font-bold text-brand-teal animate-in fade-in">
                  {downloadSuccessMsg}
                </div>
              )}

              <div className="flex flex-wrap gap-4 justify-center w-full">
                <button 
                  onClick={() => {
                    setDownloadSuccessMsg("Easy Read Guide (PDF) download initiated!");
                    setTimeout(() => setDownloadSuccessMsg(null), 4000);
                  }}
                  className="h-12 px-6 flex items-center gap-2 rounded-full border-2 border-brand-teal/25 bg-white hover:border-brand-teal text-xs font-extrabold text-brand-teal transition-all cursor-pointer focus:outline-none"
                  aria-label="Download Easy Read Guide PDF"
                >
                  <FileText className="h-4.5 w-4.5 text-brand-teal" />
                  <span>Download Easy Read Guide (PDF)</span>
                </button>
                <button 
                  onClick={() => {
                    setDownloadSuccessMsg("Auslan Video Guide link opened!");
                    setTimeout(() => setDownloadSuccessMsg(null), 4000);
                  }}
                  className="h-12 px-6 flex items-center gap-2 rounded-full border-2 border-brand-coral/25 bg-white hover:border-brand-coral text-xs font-extrabold text-brand-coral transition-all cursor-pointer focus:outline-none"
                  aria-label="Access Auslan Video Guide"
                >
                  <span>🤟 Auslan Video Guide (Link)</span>
                </button>
              </div>
            </div>

          </div>
        </AnimatePage>
  );
}
