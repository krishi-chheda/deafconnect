"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, Globe, DollarSign, ArrowRight, MessageSquare, Video, Mail, Star, Languages, HandMetal } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

export interface RecommendationCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  communication: ('auslan' | 'interpreter' | 'chat' | 'email' | 'video' | 'in_person')[];
  delivery: string;
  location: string;
  cost: 'Free' | '$' | '$$';
  bestMatch?: boolean;
  buttonText: string;
  detailsLink: string;
  onBookClick?: () => void;
}

import Button from '@/components/ui/Button';

export default function RecommendationCard({
  title,
  description,
  imageSrc,
  imageAlt,
  communication,
  delivery,
  location,
  cost,
  bestMatch = false,
  buttonText,
  detailsLink,
  onBookClick
}: RecommendationCardProps) {
  const { accessibilityMode } = useAccessibility();
  const isEasyRead = accessibilityMode === 'easyRead';
  const isPlainLanguage = accessibilityMode === 'plainLanguage';

  // Map communication strings to visual icons + titles
  const getCommIcon = (type: string) => {
    switch (type) {
      case 'auslan':
        return { 
          icon: <HandMetal className="h-4.5 w-4.5" />, 
          label: "Directly in Auslan" 
        };
      case 'interpreter':
        return { 
          icon: <Languages className="h-4.5 w-4.5" />, 
          label: "With an Auslan interpreter" 
        };
      case 'chat':
        return { 
          icon: <MessageSquare className="h-4.5 w-4.5" />, 
          label: "Text/Live Chat" 
        };
      case 'email':
        return { 
          icon: <Mail className="h-4.5 w-4.5" />, 
          label: "Email" 
        };
      case 'video':
        return { 
          icon: <Video className="h-4.5 w-4.5" />, 
          label: "Video appointment" 
        };
      case 'in_person':
        return { 
          icon: <MapPin className="h-4.5 w-4.5" />, 
          label: "In person" 
        };
      default:
        return null;
    }
  };

  return (
    <article 
      className={`relative flex flex-col justify-between rounded-[24px] border-[2px] bg-white p-6 sm:p-8 transition-all duration-300 ${
        bestMatch 
          ? 'border-brand-coral bg-brand-peach-light/20 shadow-md ring-2 ring-brand-coral/10' 
          : 'border-primaryText/10 hover:border-brand-teal/30 hover:shadow-lg'
      }`}
    >
      
      {/* Best Match Floating badge */}
      {bestMatch && !isPlainLanguage && (
        <span className="absolute -top-3.5 left-6 z-10 flex items-center gap-1.5 rounded-full bg-brand-coral px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-sm hide-in-plain-language">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span>Best Match</span>
        </span>
      )}

      {/* Main Details Block */}
      <div className="flex flex-col gap-6">
        
        {/* Service Illustration container (hidden in Plain Language mode) */}
        {!isPlainLanguage && (
          <div className="relative w-full aspect-[16/10] rounded-2xl bg-brand-blue-light/35 border border-brand-blue-light/20 flex items-center justify-center overflow-hidden hide-in-plain-language">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain p-4"
            />
          </div>
        )}

        {/* Text descriptions */}
        <div className="flex flex-col gap-2.5">
          <h3 className={`font-extrabold text-primaryText tracking-tight ${
            isEasyRead ? 'text-2xl' : 'text-xl'
          }`}>
            {title}
          </h3>
          <p className={`font-medium text-primaryText/70 leading-relaxed ${
            isEasyRead ? 'text-[16px]' : 'text-[14px]'
          }`}>
            {description}
          </p>
        </div>

        {/* Dynamic Communication Channels */}
        {isPlainLanguage ? (
          <div className="flex flex-col gap-1.5 text-xs font-bold text-primaryText/85">
            <span className="text-xs font-extrabold text-primaryText uppercase tracking-wider">Available communication:</span>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              {communication.map((comm) => (
                <li key={comm}>
                  {comm === 'in_person' ? 'In Person' : comm === 'auslan' ? 'Auslan' : comm === 'chat' ? 'SMS / Chat' : comm.charAt(0).toUpperCase() + comm.slice(1)}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-primaryText/55">Communication Channels</span>
            <div className="flex flex-wrap gap-2">
              {communication.map((comm) => {
                const item = getCommIcon(comm);
                if (!item) return null;
                return (
                  <div 
                    key={comm} 
                    className="flex items-center gap-1.5 rounded-lg bg-brand-blue-light/40 border border-brand-blue-light/30 px-3 py-1.5 text-primaryText cursor-help"
                    title={item.label}
                    aria-label={item.label}
                  >
                    <span className="text-brand-teal" aria-hidden="true">{item.icon}</span>
                    <span className="text-xs font-bold">{comm === 'in_person' ? 'In Person' : comm === 'auslan' ? 'Auslan' : comm.charAt(0).toUpperCase() + comm.slice(1)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Delivery / Location / Cost Meta rows */}
        <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-primaryText/5 text-xs font-bold text-primaryText/75">
          {/* Delivery */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-primaryText/40">Delivery</span>
            <div className="flex items-center gap-1">
              {!isPlainLanguage && <Globe className="h-3.5 w-3.5 text-brand-teal" />}
              <span>{delivery}</span>
            </div>
          </div>
          
          {/* Location */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-primaryText/40">Location</span>
            <div className="flex items-center gap-1 truncate">
              {!isPlainLanguage && <MapPin className="h-3.5 w-3.5 text-brand-teal" />}
              <span className="truncate">{location}</span>
            </div>
          </div>

          {/* Cost */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-primaryText/40">Cost</span>
            <div className="flex items-center gap-0.5">
              {!isPlainLanguage && <DollarSign className="h-3.5 w-3.5 text-brand-teal" />}
              <span>{cost}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Booking Actions Row */}
      <div className="mt-8 flex flex-col gap-3">
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={onBookClick}
        >
          <span>{buttonText}</span>
          {!isPlainLanguage && <ArrowRight className="h-4 w-4" />}
        </Button>

        <Button
          variant="secondary"
          size="md"
          fullWidth
          href={detailsLink}
        >
          View Details
        </Button>
      </div>

    </article>
  );
}
