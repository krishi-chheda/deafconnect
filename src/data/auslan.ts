import { TranslationSchema } from "./types";

export const auslanData: TranslationSchema = {
  chipLabel: "Auslan Mode",
  step1: {
    title: "Find Support",
    subtitle: "Select one option below.",
    question: "What is happening?",
    options: [
      {
        id: "worried",
        title: "Worried / Overwhelmed",
        description: "Feeling stressed, anxious, or unable to cope.",
        imageSrc: "/illustrations/service_mental_health.png",
        imageAlt: "Drawing of a person with a heart bubble"
      },
      {
        id: "lonely",
        title: "Low / Lonely / Disconnected",
        description: "Feeling isolated from the Deaf community.",
        imageSrc: "/illustrations/step1_thinking.png",
        imageAlt: "Drawing of a person thinking"
      },
      {
        id: "barriers",
        title: "Communication Barriers",
        description: "Difficult to access health or public services.",
        imageSrc: "/illustrations/step2_communicate.png",
        imageAlt: "Drawing of communication options"
      },
      {
        id: "someone_else",
        title: "Concerned for Someone Else",
        description: "Worried about the safety of a Deaf friend/family.",
        imageSrc: "/illustrations/service_talk.png",
        imageAlt: "Drawing of two people talking"
      },
      {
        id: "urgent",
        title: "Urgent Help Needed",
        description: "In immediate danger or crisis distress.",
        imageSrc: "/illustrations/service_urgent.png",
        imageAlt: "Drawing of emergency phone screen"
      },
      {
        id: "unsure",
        title: "I am Not Sure",
        description: "Show general services and options.",
        imageSrc: "/illustrations/step3_support.png",
        imageAlt: "Drawing of laptop checklists"
      }
    ]
  },
  step2: {
    title: "Select Support",
    subtitle: "Select one option below.",
    question: "What support do you want?",
    options: [
      {
        id: "professional",
        title: "Talk to Specialist",
        description: "Counselling with Deaf-aware psychologist.",
        imageSrc: "/illustrations/service_mental_health.png",
        imageAlt: "Drawing of a person with a heart bubble"
      },
      {
        id: "counselling",
        title: "Counselling Support",
        description: "Regular sessions and group therapies.",
        imageSrc: "/illustrations/service_talk.png",
        imageAlt: "Drawing of two people talking"
      },
      {
        id: "advice",
        title: "NDIS & Options Advice",
        description: "Help with NDIS packages and communication.",
        imageSrc: "/illustrations/step3_support.png",
        imageAlt: "Drawing of laptop checklists"
      },
      {
        id: "community",
        title: "Deaf Community Connection",
        description: "Social groups, Auslan meetups, and events.",
        imageSrc: "/illustrations/service_community.png",
        imageAlt: "Drawing of gesturing community members"
      },
      {
        id: "family",
        title: "Support for Family / Carer",
        description: "Resources for learning sign language.",
        imageSrc: "/illustrations/hero_signing.png",
        imageAlt: "Drawing of four signing people"
      },
      {
        id: "urgent_support",
        title: "Get Urgent Help",
        description: "Quick crisis support link.",
        imageSrc: "/illustrations/service_urgent.png",
        imageAlt: "Drawing of emergency phone screen"
      },
      {
        id: "unsure",
        title: "I am Not Sure",
        description: "Show general services.",
        imageSrc: "/illustrations/step1_thinking.png",
        imageAlt: "Drawing of thinking person"
      }
    ]
  },
  step3: {
    title: "Communication Method",
    subtitle: "Select all that apply.",
    question: "How do you want to communicate?",
    options: [
      {
        id: "auslan",
        title: "Directly in Auslan",
        description: "Sign with a fluent interpreter or provider.",
        imageSrc: "/illustrations/hero_signing.png",
        imageAlt: "Drawing of signing hands"
      },
      {
        id: "interpreter",
        title: "With Auslan Interpreter",
        description: "Provider uses a registered sign interpreter.",
        imageSrc: "/illustrations/step2_communicate.png",
        imageAlt: "Drawing of communication options"
      },
      {
        id: "chat",
        title: "Text / Live Chat",
        description: "Type messages via phone or computer.",
        imageSrc: "/illustrations/service_talk.png",
        imageAlt: "Drawing of talk bubble"
      },
      {
        id: "email",
        title: "Email Support",
        description: "Write emails for advice.",
        imageSrc: "/illustrations/step3_support.png",
        imageAlt: "Drawing of laptop"
      },
      {
        id: "in_person",
        title: "In Person Support",
        description: "Meet face-to-face in Tasmania.",
        imageSrc: "/illustrations/service_community.png",
        imageAlt: "Drawing of community members"
      },
      {
        id: "video",
        title: "Online Video Call",
        description: "Connect via online video link.",
        imageSrc: "/illustrations/service_urgent.png",
        imageAlt: "Drawing of phone screen"
      },
      {
        id: "no_preference",
        title: "No Preference",
        description: "Any communication method is fine.",
        imageSrc: "/illustrations/step1_thinking.png",
        imageAlt: "Drawing of thinking person"
      }
    ]
  },
  results: {
    title: "Suitable Support",
    subtitle: "Match results below.",
    backBtn: "Back",
    continueBtn: "Next",
    submitBtn: "See Support",
    bookBtn: "Book / Contact",
    detailsBtn: "Read Details",
    recommendations: [
      {
        id: "counselling",
        title: "Deaf Wellness Counselling",
        description: "Counselling and wellbeing support by Deaf professionals.",
        imageSrc: "/illustrations/hero_signing.png",
        imageAlt: "Two people signing in Auslan",
        communication: ["auslan", "interpreter", "chat"],
        delivery: "Online",
        location: "Tasmania-wide",
        cost: "Free",
        bestMatch: true,
        buttonText: "Book / Contact",
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
        title: "Deaf Tasmania Groups",
        description: "Peer support groups and community events for Deaf people.",
        imageSrc: "/illustrations/service_community.png",
        imageAlt: "Drawing of happy gesturing community members representing Deaf Tasmania Groups",
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
