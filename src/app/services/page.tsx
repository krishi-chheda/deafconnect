"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, Globe, MapPin, DollarSign } from 'lucide-react';

import { servicesData } from "@/data/services";
import { useAccessibility } from "@/context/AccessibilityContext";
import AnimatePage from "@/components/guided/AnimatePage";

export default function ServicesIndexPage() {
  const { accessibilityMode } = useAccessibility();
  const isEasyRead = accessibilityMode === 'easyRead';
  const services = Object.values(servicesData);

  return (
    <AnimatePage>
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 py-12 md:py-16" id="main-content">
        
        <div className="text-center md:text-left mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Resource Directory</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl mt-1">
            Deaf Support Directory
          </h1>
          <p className="text-sm font-semibold text-brand-navy/60 max-w-[600px] leading-relaxed mt-2">
            Browse professional mental health, counseling, and social connection groups supporting the Tasmanian Deaf community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="group flex flex-col justify-between rounded-[24px] border border-brand-navy/10 bg-white p-6 shadow-sm hover:border-brand-teal/30 hover:shadow-lg transition-all focus:outline-none"
              aria-label={`${service.title}: ${service.tagline}`}
            >
              <div className="flex flex-col gap-6">
                <div className="relative w-full aspect-[16/10] rounded-xl bg-brand-blue-light/30 flex items-center justify-center overflow-hidden">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    className="object-contain p-4 group-hover:scale-103 transition-transform"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold tracking-tight text-brand-navy group-hover:text-brand-teal transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-xs font-medium text-brand-navy/70 leading-relaxed">
                    {service.tagline}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-navy/5 flex justify-between items-center text-xs font-bold text-brand-navy/60">
                <span className="bg-brand-blue-light/50 px-2.5 py-1 rounded-md border border-brand-blue-light/35">{service.delivery}</span>
                <span className="flex items-center gap-1 text-brand-teal group-hover:translate-x-0.5 transition-transform">
                  Read Details
                  <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </AnimatePage>
  );
}
