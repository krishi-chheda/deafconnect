export interface ServiceDetails {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  imageSrc: string;
  imageAlt: string;
  communication: ('auslan' | 'interpreter' | 'chat' | 'email' | 'video' | 'in_person')[];
  delivery: string;
  location: string;
  cost: 'Free' | '$' | '$$';
  accessibilityFeatures: string[];
  contactEmail: string;
  contactSMS: string;
  contactNRS?: string;
  hours: string;
  relatedIds: string[];
}

export const servicesData: Record<string, ServiceDetails> = {
  counselling: {
    id: "counselling",
    title: "Deaf Wellness Counselling",
    tagline: "Counselling and wellbeing support by Deaf professionals.",
    description: "Professional counseling and wellbeing support led by Deaf specialists.",
    longDescription: "Deaf Wellness Counselling provides one-on-one counseling, psychological therapy, and emotional support services specifically designed for Deaf, Deafblind, and hard-of-hearing Tasmanians. Our team consists of qualified psychologists and counselors who are fluent signers and native members of the Deaf community, offering a culturally safe space without language barriers.",
    imageSrc: "/illustrations/hero_signing.png",
    imageAlt: "Two people signing in Auslan",
    communication: ["auslan", "interpreter", "chat"],
    delivery: "Online",
    location: "Tasmania-wide",
    cost: "Free",
    accessibilityFeatures: [
      "Native Auslan speaking psychologists",
      "Deaf-aware cultural safety and advocacy",
      "No GP referral needed for initial visits",
      "Option to bring external interpreters",
      "Full video relay and chat capability"
    ],
    contactEmail: "counselling@deafconnecttas.org",
    contactSMS: "0477 13 11 14",
    hours: "Monday - Friday, 9:00 AM - 5:00 PM",
    relatedIds: ["clearmind", "groups"]
  },
  clearmind: {
    id: "clearmind",
    title: "Clear Mind Support",
    tagline: "Access psychologists and counsellors who are Deaf-aware.",
    description: "Access experienced psychologists and mental health advice.",
    longDescription: "Clear Mind Support offers clinical psychology, diagnostic assessments, and custom coping plans for individuals experiencing anxiety, depression, or distress. Our professional therapists work regularly with professional Auslan interpreters and NRS calling channels to provide clear, caption-enabled counseling sessions tailored to individual NDIS plans.",
    imageSrc: "/illustrations/step3_support.png",
    imageAlt: "Laptop with checkmark list",
    communication: ["auslan", "interpreter", "chat", "video"],
    delivery: "Online",
    location: "Tasmania-wide",
    cost: "$",
    accessibilityFeatures: [
      "Interpreting costs fully covered under NDIS",
      "Caption-enabled telehealth platforms",
      "Easy Read guides and checklists provided",
      "SMS text booking system",
      "Staff trained in Deaf culture and communication adjustments"
    ],
    contactEmail: "clearmind@tashealth.org",
    contactSMS: "0488 123 456",
    hours: "Tuesday - Thursday, 8:30 AM - 4:30 PM",
    relatedIds: ["counselling", "groups"]
  },
  groups: {
    id: "groups",
    title: "Deaf Tasmania Groups",
    tagline: "Meet other Deaf people at peer support sessions.",
    description: "Peer support groups and community events for Deaf people.",
    longDescription: "Deaf Tasmania Groups are peer-led social gatherings, peer counseling circles, and community meetups held across Tasmania. These groups are run by Deaf community leaders and offer Tasmanians a chance to meet peers, share advice on NDIS navigation, participate in Auslan sign workshops, and reduce social isolation in a friendly, informal environment.",
    imageSrc: "/illustrations/service_community.png",
    imageAlt: "Three community members talking",
    communication: ["auslan", "interpreter"],
    delivery: "In person",
    location: "Tasmania",
    cost: "Free",
    accessibilityFeatures: [
      "Fully led by native Auslan signers",
      "Wheelchair-accessible community centers",
      "Visual displays, projectors, and interpreters on-site",
      "Family and carers welcome to attend",
      "Social outings and outdoor events"
    ],
    contactEmail: "groups@deafconnecttas.org",
    contactSMS: "0499 987 654",
    hours: "Saturdays, 10:00 AM - 2:00 PM (Weekly)",
    relatedIds: ["counselling", "clearmind"]
  }
};
