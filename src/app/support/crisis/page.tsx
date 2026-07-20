"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, ShieldAlert, MapPin, ExternalLink } from 'lucide-react';
import Breadcrumbs from "@/components/Breadcrumbs";
import AnimatePage from "@/components/guided/AnimatePage";
import { useAccessibility } from "@/context/AccessibilityContext";
import Button from "@/components/ui/Button";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import InterpreterVideo from "@/components/guided/InterpreterVideo";

interface Hospital {
  name: string;
  region: string;
  address: string;
  phone: string;
  wait: string;
  nrsGuide: string;
}

const HOSPITALS: Hospital[] = [
  {
    name: "Royal Hobart Hospital (RHH)",
    region: "Hobart & Southern Tasmania",
    address: "48 Liverpool St, Hobart TAS 7000",
    phone: "03 6166 8308",
    wait: "Normal Wait Times",
    nrsGuide: "To dial RHH emergency triage via NRS, request connection to (03) 6166 8308."
  },
  {
    name: "Launceston General Hospital (LGH)",
    region: "Launceston & Northern Tasmania",
    address: "274-280 Charles St, Launceston TAS 7250",
    phone: "03 6777 6777",
    wait: "Normal Wait Times",
    nrsGuide: "To dial LGH emergency triage via NRS, request connection to (03) 6777 6777."
  },
  {
    name: "Mersey Community Hospital",
    region: "Devonport & North-West",
    address: "Bass Highway, Latrobe TAS 7307",
    phone: "03 6478 5500",
    wait: "Low Wait Times",
    nrsGuide: "To dial Mersey emergency triage via NRS, request connection to (03) 6478 5500."
  },
  {
    name: "North West Regional Hospital",
    region: "Burnie & North-West",
    address: "23 Brickport Rd, Burnie TAS 7320",
    phone: "03 6493 6000",
    wait: "Normal Wait Times",
    nrsGuide: "To dial North West triage via NRS, request connection to (03) 6493 6000."
  }
];

export default function CrisisSupportPage() {
  const { accessibilityMode } = useAccessibility();
  const isEasyRead = accessibilityMode === 'easyRead';

  // State
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  const emergencyContacts = [
    {
      name: "Lifeline Crisis Hotline",
      desc: "For general distress, self-harm concerns, or suicide prevention counselling.",
      phone: "13 11 14",
      sms: "0477 13 11 14",
      url: "https://www.lifeline.org.au",
      nrsText: "Call 13 11 14 via NRS",
      type: "primary"
    },
    {
      name: "Suicide Call Back Service",
      desc: "Free nationwide video or phone counseling for people affected by suicide.",
      phone: "1300 659 467",
      url: "https://www.suicidecallbackservice.org.au",
      nrsText: "Call 1300 659 467 via NRS",
      type: "secondary"
    },
    {
      name: "National Relay Service (Emergency Only)",
      desc: "NRS Text-to-Speech and Video translation for dialling 000.",
      phone: "1800 555 727",
      url: "https://www.accesshub.gov.au/about-the-nrs",
      type: "secondary"
    }
  ];

  return (
    <AnimatePage>
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 py-12" id="main-content">
            
            {/* Breadcrumbs */}
            <Breadcrumbs items={[
              { name: "Find Support", href: "/support" },
              { name: "Crisis Support" }
            ]} />

            {/* Emergency Warning Banner Card */}
            <Card variant="highlight" className="p-8 sm:p-10 mb-12 flex flex-col md:flex-row gap-8 items-center justify-between border-4 border-brand-coral">
              {/* Pulsing red side badge */}
              <div className="absolute top-0 left-0 bottom-0 w-2.5 bg-brand-coral" />
              
              <div className="flex flex-col gap-4 max-w-[680px]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-coral animate-ping shrink-0" />
                  <span className="text-xs font-extrabold uppercase tracking-widest text-brand-coral">Immediate Help Portal</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primaryText leading-tight">
                  Urgent & Crisis Support
                </h1>
                <p className="text-base font-semibold text-primaryText/70 leading-relaxed">
                  If you are in immediate danger or need urgent help, access these direct contacts. These services are free and available 24/7.
                </p>
              </div>
              <div className="relative w-40 h-40 shrink-0 hidden md:block">
                <Image
                  src="/illustrations/service_urgent.png"
                  alt="Illustration representing urgent support"
                  fill
                  className="object-contain animate-pulse"
                />
              </div>
            </Card>

            {/* Auslan Interpreter Video Header in Auslan Mode */}
            {accessibilityMode === 'auslan' && (
              <div className="flex justify-center mb-12">
                <InterpreterVideo stepKey="crisis" questionText="Urgent & Crisis Support" />
              </div>
            )}

            {/* NRS Instructions Card */}
            <Card variant="outlined" className="p-6 mb-12 flex flex-col md:flex-row items-center gap-6">
              <div className="h-12 w-12 rounded-full bg-brand-teal/15 flex items-center justify-center shrink-0">
                <ShieldAlert className="h-6 w-6 text-brand-teal" />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-xs font-extrabold text-brand-teal uppercase tracking-wider">How to Call 000 using the National Relay Service</span>
                <p className="text-xs font-semibold text-primaryText/70 leading-relaxed">
                  If you need Police, Ambulance, or Fire: Open the National Relay Service (NRS), request a connection to <strong>"000"</strong>, and tell the operator your location and needs immediately.
                </p>
              </div>
              <Button
                variant="teal"
                size="md"
                href="https://www.accesshub.gov.au/about-the-nrs"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <span>NRS Relay Portal</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </Card>

            {/* Core Helpline Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {emergencyContacts.map((contact, index) => {
                const isPrimary = contact.type === 'primary';
                return (
                  <Card
                    key={index}
                    variant={isPrimary ? "highlight" : "default"}
                    className="p-6 flex flex-col justify-between gap-6"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        {isPrimary && <span className="h-2 w-2 rounded-full bg-brand-coral animate-pulse shrink-0" />}
                        <h3 className="text-base font-extrabold text-primaryText">{contact.name}</h3>
                      </div>
                      <p className="text-xs font-semibold text-primaryText/60 leading-relaxed">
                        {contact.desc}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      {contact.phone && (
                        <Button
                          variant={isPrimary ? "primary" : "secondary"}
                          size="md"
                          fullWidth
                          href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                        >
                          <Phone className="h-4 w-4 fill-current" />
                          <span>Call: {contact.phone}</span>
                        </Button>
                      )}
                      
                      {contact.sms && (
                        <Button
                          variant="primary"
                          size="md"
                          fullWidth
                          href={`sms:${contact.sms.replace(/\s+/g, '')}`}
                        >
                          <span>📱 Text: {contact.sms}</span>
                        </Button>
                      )}

                      {contact.url && (
                        <Button
                          variant="outline"
                          size="md"
                          fullWidth
                          href={contact.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>Online Access</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Emergency Department Locator */}
            <Card variant="ghost" className="p-8 sm:p-10 mb-16">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Info and selector */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Emergency Department Locator</span>
                    <h2 className="text-2xl font-extrabold text-primaryText">Find a Hospital Triage</h2>
                    <p className="text-xs font-semibold text-primaryText/60 leading-relaxed pr-2">
                      Select a Tasmanian hospital emergency department below to view address guidelines, triage phone numbers, and NRS dialing instructions.
                    </p>
                  </div>

                  {/* Hospital Selector List */}
                  <div className="flex flex-col gap-2.5" role="list">
                    {HOSPITALS.map((hosp, index) => {
                      const isSelected = selectedHospital?.name === hosp.name;
                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedHospital(hosp)}
                          className={`w-full p-4 rounded-xl border-2 text-left flex items-center justify-between gap-4 transition-all focus:outline-none cursor-pointer ${
                            isSelected 
                              ? 'border-brand-coral bg-brand-coral/[0.05] ring-1 ring-brand-coral' 
                              : 'border-primaryText/10 bg-white hover:border-brand-teal/40'
                          }`}
                          role="listitem"
                        >
                          <div className="flex flex-col">
                            <span className="text-xs font-extrabold text-primaryText">{hosp.name}</span>
                            <span className="text-[10px] font-semibold text-primaryText/55">{hosp.region}</span>
                          </div>
                          <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">
                            {hosp.wait}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Facility Details card */}
                <div className="lg:col-span-6">
                  {selectedHospital ? (
                    <Card variant="default" className="p-6 border-2 border-brand-coral/25 flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-2">
                      <div className="flex flex-col gap-1 pb-3 border-b border-primaryText/5">
                        <span className="text-[9px] font-extrabold text-brand-coral uppercase tracking-wider">Selected Facility Details</span>
                        <h3 className="text-base font-extrabold text-primaryText">{selectedHospital.name}</h3>
                      </div>

                      {/* Map coordinates details */}
                      <div className="flex flex-col gap-3 text-xs font-semibold text-primaryText/85">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4.5 w-4.5 text-brand-teal shrink-0" />
                          <span>{selectedHospital.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4.5 w-4.5 text-brand-teal shrink-0" />
                          <span>Phone: {selectedHospital.phone}</span>
                        </div>
                      </div>

                      {/* NRS relay instruction badge */}
                      <div className="rounded-xl bg-brand-blue-light/35 border border-brand-teal/20 p-4">
                        <span className="text-[9px] font-extrabold text-brand-teal uppercase tracking-widest block mb-1">
                          NRS Dialing Guide
                        </span>
                        <p className="text-xs font-semibold text-primaryText/70 leading-relaxed">
                          {selectedHospital.nrsGuide}
                        </p>
                      </div>

                      <div className="flex gap-3 mt-1">
                        <Button
                          variant="secondary"
                          size="md"
                          fullWidth
                          href={`tel:${selectedHospital.phone.replace(/\s+/g, '')}`}
                        >
                          <Phone className="h-4 w-4 fill-current" />
                          <span>Call Triage</span>
                        </Button>
                        <Button
                          variant="secondary"
                          size="md"
                          fullWidth
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedHospital.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>Get Directions</span>
                        </Button>
                      </div>

                    </Card>
                  ) : (
                    <Card variant="default" className="border-2 border-dashed border-primaryText/20 bg-brand-blue-light/5 p-12 text-center flex flex-col items-center gap-3">
                      <span className="text-3xl">🏥</span>
                      <span className="text-sm font-bold text-primaryText">Select a Hospital Facility</span>
                      <span className="text-xs text-primaryText/55 max-w-[280px]">Click on any hospital on the left to view phone lines, maps directions, and triage instructions.</span>
                    </Card>
                  )}
                </div>

              </div>

            </Card>

          </div>
        </AnimatePage>
  );
}
