"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  href: string;
  isUrgent?: boolean;
}

export function ServiceCard({ imageSrc, imageAlt, title, description, href, isUrgent = false }: ServiceCardProps) {
  return (
    <Link 
      href={href}
      className={`group relative flex flex-col justify-between rounded-[24px] border border-brand-navy/10 bg-white p-6 transition-all duration-300 hover:border-brand-teal/30 hover:shadow-lg focus:outline-none h-full ${
        isUrgent ? 'ring-2 ring-brand-coral/20 hover:ring-brand-coral/40' : ''
      }`}
      aria-label={`${title}: ${description}. Click to navigate.`}
    >
      {/* Urgent indicator badge */}
      {isUrgent && (
        <span className="absolute top-4 right-4 z-10 rounded-full bg-brand-coral px-3.5 py-1 text-xs font-extrabold tracking-wide text-white shadow-sm uppercase animate-pulse">
          Immediate Help
        </span>
      )}

      {/* Top Half: Illustration and Text */}
      <div className="flex flex-col gap-6">
        
        {/* Illustration Container */}
        <div className="relative w-full aspect-[4/3] rounded-2xl bg-brand-blue-light/30 flex items-center justify-center overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Text Details */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h3 className="text-xl font-bold tracking-tight text-brand-navy group-hover:text-brand-teal transition-colors">
            {title}
          </h3>
          <p className="text-[14px] font-medium leading-relaxed text-brand-navy/70">
            {description}
          </p>
        </div>
      </div>

      {/* Bottom Half: Orange/Coral Animated Arrow */}
      <div className="flex justify-center md:justify-start mt-6 pt-4 border-t border-brand-navy/5">
        <div 
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-coral/20 bg-brand-coral/5 text-brand-coral transition-all duration-300 group-hover:bg-brand-coral-hover group-hover:text-white"
          aria-hidden="true"
        >
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export default function ServicesGrid() {
  const services = [
    {
      title: "Mental Health Support",
      imageSrc: "/illustrations/service_mental_health.png",
      imageAlt: "Minimalist line drawing of a person with a heart bubble, representing wellbeing counseling support",
      description: "Find counselling, psychology and wellbeing services tailored for Deaf Tasmanians.",
      href: "/services/mental-health",
      isUrgent: false,
    },
    {
      title: "Talk to Someone",
      imageSrc: "/illustrations/service_talk.png",
      imageAlt: "Minimalist line drawing of two people talking with a conversation bubble, representing consultation options",
      description: "Get help understanding your options, discuss navigation details, or book an initial consultation.",
      href: "/support/talk",
      isUrgent: false,
    },
    {
      title: "Urgent Support",
      imageSrc: "/illustrations/service_urgent.png",
      imageAlt: "Minimalist line drawing of a hand holding a phone displaying a heart icon, representing crisis services",
      description: "Find accessible crisis assistance and immediate emergency communication support.",
      href: "/support/crisis",
      isUrgent: true,
    },
    {
      title: "Community Connection",
      imageSrc: "/illustrations/service_community.png",
      imageAlt: "Minimalist line drawing of three gesturing people, representing Deaf social communities",
      description: "Find local Deaf organisations, social meetups, peer support, and active community events.",
      href: "/community",
      isUrgent: false,
    }
  ];

  return (
    <section className="mx-auto max-w-[1440px] px-6 sm:px-8 py-12" id="support">
      <div className="flex flex-col gap-4 mb-10 text-center md:text-left">
        <h2 className="text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
          Support tailored for your lifestyle
        </h2>
        <p className="text-[16px] font-semibold text-brand-teal max-w-[600px] leading-relaxed">
          Select a service card below to browse accessible pathways, book sessions, or view localized resource hubs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, idx) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <ServiceCard {...service} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
