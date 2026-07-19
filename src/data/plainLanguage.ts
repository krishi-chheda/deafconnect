import { TranslationSchema } from "./types";

export const plainLanguageData: TranslationSchema = {
  chipLabel: "Plain Language",
  step1: {
    title: "Let's find support that works for you",
    subtitle: "Choose the option that feels closest to your experience.",
    question: "What has been happening for you?",
    options: [
      {
        id: "worried",
        title: "I'm feeling worried or overwhelmed",
        description: "Feeling stressed, anxious, or unable to cope with daily tasks.",
        imageSrc: "/illustrations/service_mental_health.png",
        imageAlt: "Drawing of a person with a heart bubble"
      },
      {
        id: "lonely",
        title: "I'm feeling low, lonely or disconnected",
        description: "Feeling isolated from friends, family, or the Deaf community.",
        imageSrc: "/illustrations/step1_thinking.png",
        imageAlt: "Drawing of a person thinking with hand on chin"
      },
      {
        id: "barriers",
        title: "Communication barriers are affecting me",
        description: "Finding it difficult to access healthcare or community services due to language barriers.",
        imageSrc: "/illustrations/step2_communicate.png",
        imageAlt: "Drawing of a hand pointing to communication channel cards"
      },
      {
        id: "someone_else",
        title: "I'm concerned about someone else",
        description: "Worried about the safety or mental health of a family member or friend.",
        imageSrc: "/illustrations/service_talk.png",
        imageAlt: "Drawing of two people talking with speech bubble"
      },
      {
        id: "urgent",
        title: "I need help urgently",
        description: "In immediate distress or needing urgent crisis support.",
        imageSrc: "/illustrations/service_urgent.png",
        imageAlt: "Drawing of a hand holding a phone displaying a heart icon"
      },
      {
        id: "unsure",
        title: "I'm not sure",
        description: "Looking for general options or exploring what services are available.",
        imageSrc: "/illustrations/step3_support.png",
        imageAlt: "Drawing of a laptop showing checkmarks"
      }
    ]
  },
  step2: {
    title: "What kind of support are you looking for?",
    subtitle: "Choose what you would like help with.",
    question: "What kind of support are you looking for?",
    options: [
      {
        id: "professional",
        title: "Talk to a mental health professional",
        description: "Counselling or therapy with deaf-aware psychologists.",
        imageSrc: "/illustrations/service_mental_health.png",
        imageAlt: "Drawing of a person with a heart bubble"
      },
      {
        id: "counselling",
        title: "Find counselling or ongoing support",
        description: "Longer-term psychological care and group support.",
        imageSrc: "/illustrations/service_talk.png",
        imageAlt: "Drawing of two people talking with speech bubble"
      },
      {
        id: "advice",
        title: "Get advice about my options",
        description: "Understand NDIS packages and communication resources.",
        imageSrc: "/illustrations/step3_support.png",
        imageAlt: "Drawing of a laptop showing checkmarks"
      },
      {
        id: "community",
        title: "Connect with Deaf peers and community",
        description: "Join Deaf social groups, classes, and activities.",
        imageSrc: "/illustrations/service_community.png",
        imageAlt: "Drawing of three gesturing people representing community connection"
      },
      {
        id: "family",
        title: "Find information for family or carers",
        description: "Resources for family members learning Auslan or supporting Deaf relatives.",
        imageSrc: "/illustrations/hero_signing.png",
        imageAlt: "Drawing of four diverse people communicating using Auslan"
      },
      {
        id: "urgent_support",
        title: "Get urgent support",
        description: "Immediate access to safety or crisis intervention.",
        imageSrc: "/illustrations/service_urgent.png",
        imageAlt: "Drawing of a hand holding a phone displaying a heart icon"
      },
      {
        id: "unsure",
        title: "I'm not sure",
        description: "Explore general support and guidance services.",
        imageSrc: "/illustrations/step1_thinking.png",
        imageAlt: "Drawing of a person thinking with hand on chin"
      }
    ]
  },
  step3: {
    title: "How would you prefer to communicate?",
    subtitle: "Choose all that apply.",
    question: "How would you prefer to communicate?",
    options: [
      {
        id: "auslan",
        title: "Directly in Auslan",
        description: "Signed communication with a fluent signer.",
        imageSrc: "/illustrations/hero_signing.png",
        imageAlt: "Drawing of sign language hands"
      },
      {
        id: "interpreter",
        title: "With an Auslan interpreter",
        description: "Signed communication via a certified interpreter.",
        imageSrc: "/illustrations/step2_communicate.png",
        imageAlt: "Drawing of communication options"
      },
      {
        id: "chat",
        title: "Text or online chat",
        description: "Written communication via live chat or SMS.",
        imageSrc: "/illustrations/service_talk.png",
        imageAlt: "Drawing of talk bubble"
      },
      {
        id: "email",
        title: "Email",
        description: "Asynchronous written correspondence.",
        imageSrc: "/illustrations/step3_support.png",
        imageAlt: "Drawing of laptop"
      },
      {
        id: "in_person",
        title: "In person",
        description: "Face-to-face appointments in Tasmania.",
        imageSrc: "/illustrations/service_community.png",
        imageAlt: "Drawing of community members"
      },
      {
        id: "video",
        title: "Video appointment",
        description: "Online video consultations.",
        imageSrc: "/illustrations/service_urgent.png",
        imageAlt: "Drawing of phone screen"
      },
      {
        id: "no_preference",
        title: "No preference",
        description: "Any communication method is fine.",
        imageSrc: "/illustrations/step1_thinking.png",
        imageAlt: "Drawing of thinking person"
      }
    ]
  },
  results: {
    title: "Support options for you",
    subtitle: "Based on what you selected, these services may be suitable.",
    backBtn: "Back",
    continueBtn: "Continue",
    submitBtn: "See support options",
    bookBtn: "Book or contact",
    detailsBtn: "View service details",
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
        buttonText: "Book or contact",
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
