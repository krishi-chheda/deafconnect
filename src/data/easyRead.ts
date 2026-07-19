import { TranslationSchema } from "./types";

export const easyReadData: TranslationSchema = {
  chipLabel: "Easy Read",
  step1: {
    title: "We can help you find support",
    subtitle: "Select the option that matches how you feel.",
    question: "What is happening for you?",
    options: [
      {
        id: "worried",
        title: "I feel worried or stressed",
        description: "I feel overwhelmed and find it hard to do my daily tasks.",
        imageSrc: "/illustrations/service_mental_health.png",
        imageAlt: "Drawing of a person with a heart bubble"
      },
      {
        id: "lonely",
        title: "I feel sad or lonely",
        description: "I feel alone and want to connect with other people.",
        imageSrc: "/illustrations/step1_thinking.png",
        imageAlt: "Drawing of a person thinking"
      },
      {
        id: "barriers",
        title: "It is hard for me to talk with people",
        description: "It is hard to access doctors or services because of communication.",
        imageSrc: "/illustrations/step2_communicate.png",
        imageAlt: "Drawing of communication options"
      },
      {
        id: "someone_else",
        title: "I am worried about someone else",
        description: "I am worried about the safety or feelings of my friend or family.",
        imageSrc: "/illustrations/service_talk.png",
        imageAlt: "Drawing of two people talking"
      },
      {
        id: "urgent",
        title: "I need help right now",
        description: "I am in danger or need immediate help.",
        imageSrc: "/illustrations/service_urgent.png",
        imageAlt: "Drawing of emergency phone screen"
      },
      {
        id: "unsure",
        title: "I am not sure",
        description: "I want to see what services you have.",
        imageSrc: "/illustrations/step3_support.png",
        imageAlt: "Drawing of laptop checklists"
      }
    ]
  },
  step2: {
    title: "What help do you want?",
    subtitle: "Select what you would like help with today.",
    question: "What kind of support are you looking for?",
    options: [
      {
        id: "professional",
        title: "Talk to someone trained to help",
        description: "Talk to psychologists who understand Deaf people.",
        imageSrc: "/illustrations/service_mental_health.png",
        imageAlt: "Drawing of a person with a heart bubble"
      },
      {
        id: "counselling",
        title: "Find counseling support",
        description: "Get regular counseling sessions and meet support groups.",
        imageSrc: "/illustrations/service_talk.png",
        imageAlt: "Drawing of two people talking"
      },
      {
        id: "advice",
        title: "Get advice about my choices",
        description: "Get help with NDIS funding and communication tools.",
        imageSrc: "/illustrations/step3_support.png",
        imageAlt: "Drawing of laptop checklists"
      },
      {
        id: "community",
        title: "Connect with other Deaf people",
        description: "Join social meetings, groups, and fun activities.",
        imageSrc: "/illustrations/service_community.png",
        imageAlt: "Drawing of gesturing community members"
      },
      {
        id: "family",
        title: "Find help for my family or carer",
        description: "Find guide books and lessons for my family.",
        imageSrc: "/illustrations/hero_signing.png",
        imageAlt: "Drawing of four signing people"
      },
      {
        id: "urgent_support",
        title: "Get help right now",
        description: "Get quick support if you are in trouble.",
        imageSrc: "/illustrations/service_urgent.png",
        imageAlt: "Drawing of emergency phone screen"
      },
      {
        id: "unsure",
        title: "I am not sure",
        description: "Look at all general services to find a match.",
        imageSrc: "/illustrations/step1_thinking.png",
        imageAlt: "Drawing of thinking person"
      }
    ]
  },
  step3: {
    title: "How do you want to talk with us?",
    subtitle: "Select all the ways you like to communicate.",
    question: "How do you want to communicate?",
    options: [
      {
        id: "auslan",
        title: "Use Auslan sign language",
        description: "I want to sign directly with a fluent Deaf person.",
        imageSrc: "/illustrations/hero_signing.png",
        imageAlt: "Drawing of signing hands"
      },
      {
        id: "interpreter",
        title: "Use an Auslan interpreter",
        description: "I want an interpreter to translate for me.",
        imageSrc: "/illustrations/step2_communicate.png",
        imageAlt: "Drawing of communication options"
      },
      {
        id: "chat",
        title: "Use text or live chat",
        description: "I want to type messages on my computer or phone.",
        imageSrc: "/illustrations/service_talk.png",
        imageAlt: "Drawing of talk bubble"
      },
      {
        id: "email",
        title: "Use email",
        description: "I want to write emails and get replies.",
        imageSrc: "/illustrations/step3_support.png",
        imageAlt: "Drawing of laptop"
      },
      {
        id: "in_person",
        title: "Meet in person",
        description: "I want to meet a helper face-to-face in Tasmania.",
        imageSrc: "/illustrations/service_community.png",
        imageAlt: "Drawing of community members"
      },
      {
        id: "video",
        title: "Use video call",
        description: "I want to do a video meeting online.",
        imageSrc: "/illustrations/service_urgent.png",
        imageAlt: "Drawing of phone screen"
      },
      {
        id: "no_preference",
        title: "No preference",
        description: "Any way of talking is fine with me.",
        imageSrc: "/illustrations/step1_thinking.png",
        imageAlt: "Drawing of thinking person"
      }
    ]
  },
  results: {
    title: "Services for you",
    subtitle: "These support choices match what you selected.",
    backBtn: "Go Back",
    continueBtn: "Next",
    submitBtn: "Find Services",
    bookBtn: "Book or Contact",
    detailsBtn: "Read Details",
    recommendations: [
      {
        id: "counselling",
        title: "Deaf Wellness Counseling",
        description: "Counselling support run by fluent Deaf helpers.",
        imageSrc: "/illustrations/hero_signing.png",
        imageAlt: "Two people signing in Auslan",
        communication: ["auslan", "interpreter", "chat"],
        delivery: "Online",
        location: "Tasmania-wide",
        cost: "Free",
        bestMatch: true,
        buttonText: "Book or Contact",
        detailsLink: "/services/counselling"
      },
      {
        id: "clearmind",
        title: "Clear Mind Support",
        description: "Access experienced psychologists and mental health advice.",
        imageSrc: "/illustrations/step3_support.png",
        imageAlt: "Drawing of checklist success on a laptop screen representing Clear Mind Support",
        communication: ["interpreter", "chat", "video"],
        delivery: "Online",
        location: "Tasmania-wide",
        cost: "$",
        bestMatch: false,
        detailsLink: "/services/clearmind"
      },
      {
        id: "groups",
        title: "Deaf Connect Groups",
        description: "Peer support groups and community events for Deaf people.",
        imageSrc: "/illustrations/service_community.png",
        imageAlt: "Drawing of happy gesturing community members representing Deaf Connect Groups",
        communication: ["auslan", "interpreter"],
        delivery: "In person",
        location: "Tasmania",
        cost: "Free",
        bestMatch: false,
        detailsLink: "/services/groups"
      }
    ]
  }
};
