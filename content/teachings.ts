/**
 * Teaching archive. These are starter entries — replace them with the real
 * episodes from YouTube @tlh2026. Set `url` to each video's link.
 * `passage` links a teaching to a passage in content/scripture.ts (or null).
 */
export type Series = { id: string; name: string; blurb: string; tone: "ink" | "sage" | "stone" };

export type Teaching = {
  id: number;
  title: string;
  series: string;
  topic: string;
  ref: string;
  passage: string | null;
  mins: number;
  date: string; // YYYY-MM-DD
  format: "Video" | "Audio";
  url?: string;
  summary: string;
  points: string[];
  questions: string[];
};

export const SERIES: Series[] = [
  { id: "kingdom", name: "The Kingdom Explained", blurb: "Foundations: what the Kingdom is, where it is and how we enter.", tone: "ink" },
  { id: "pray", name: "Pray Like This", blurb: "Walking line by line through the prayer Jesus taught.", tone: "sage" },
  { id: "seek", name: "Seek First", blurb: "Priorities, provision and peace under the King.", tone: "stone" },
  { id: "kor", name: "Winning Every Day", blurb: "The Principle of KOR: Knowing, Own, Repeat.", tone: "ink" },
  { id: "light", name: "Light of the World", blurb: "Living visibly as citizens of the Kingdom.", tone: "sage" },
];

export const TOPICS = ["Kingdom", "Prayer", "Faith", "Identity", "Purpose", "Scripture"];

export const TEACHINGS: Teaching[] = [
  {
    id: 13, title: "Transferred: From Darkness to His Kingdom", series: "kingdom", topic: "Identity",
    ref: "Colossians 1:12–14", passage: "col1", mins: 44, date: "2026-11-01", format: "Video",
    summary: "Salvation is not only forgiveness; it is a change of citizenship. Paul says we have been delivered and translated into the Kingdom of God's Son.",
    points: [
      "Delivered: the power of darkness no longer holds legal claim on you.",
      "Translated: you have been moved, not merely improved.",
      "Inheritance: citizens of the Kingdom share in the inheritance of the saints in light.",
    ],
    questions: [
      "What does it change to think of salvation as a transfer of citizenship?",
      "Where do you still live as if the old kingdom has authority?",
    ],
  },
  {
    id: 12, title: "You Are the Light of the World", series: "light", topic: "Purpose",
    ref: "Matthew 5:13–16", passage: "mat5", mins: 38, date: "2026-10-25", format: "Video",
    summary: "Jesus does not tell His disciples to become light. He tells them they are. The question is whether the light is hidden or placed on the stand.",
    points: [
      "Identity before activity: \"Ye are\" comes before \"let your light shine\".",
      "A city on a hill cannot be hidden: Kingdom life is visible by nature.",
      "The goal is the Father's glory, not our reputation.",
    ],
    questions: [
      "What 'bushel' covers your light at work, at home or online?",
      "Which good work could point someone to the Father this week?",
    ],
  },
  {
    id: 11, title: "Repeat: The Power of Daily Faithfulness", series: "kor", topic: "Faith",
    ref: "Galatians 6:9", passage: null, mins: 41, date: "2026-10-18", format: "Audio",
    summary: "The third principle of KOR. Kingdom fruit grows through daily repetition: well doing that does not grow weary.",
    points: [
      "Seasons are real: due season follows faithful sowing.",
      "Repetition is how truth becomes character.",
      "Small daily obedience outlasts occasional intensity.",
    ],
    questions: [
      "What one practice will you repeat daily for the next 30 days?",
      "Where have you fainted before the harvest?",
    ],
  },
  {
    id: 10, title: "Own It: Responsibility in the Kingdom", series: "kor", topic: "Purpose",
    ref: "Matthew 25:14–30", passage: null, mins: 47, date: "2026-10-11", format: "Video",
    summary: "The second principle of KOR. In the parable of the talents, the Master entrusts and expects. Ownership is stewardship lived out.",
    points: [
      "Everything entrusted to you is measured by faithfulness, not size.",
      "Fear buries; faith multiplies.",
      "Owning your part is an act of worship.",
    ],
    questions: [
      "What has God entrusted to you that you have been burying?",
      "What would faithful ownership look like this month?",
    ],
  },
  {
    id: 9, title: "Knowing: The First Principle of KOR", series: "kor", topic: "Scripture",
    ref: "Proverbs 4:7; Hosea 4:6", passage: null, mins: 39, date: "2026-10-04", format: "Video",
    summary: "Winning starts with knowing. Without knowledge of God and His ways, people perish. With it, they walk in wisdom.",
    points: [
      "Knowing God is the root of all other knowing.",
      "Wisdom is the principal thing: get understanding.",
      "Knowledge must move from the head into daily choices.",
    ],
    questions: [
      "What do you know about God that you are not yet living?",
      "How will you make room for Scripture each day?",
    ],
  },
  {
    id: 8, title: "Daily Bread and Daily Trust", series: "pray", topic: "Prayer",
    ref: "Matthew 6:11", passage: "mat6a", mins: 33, date: "2026-09-27", format: "Audio",
    summary: "\"Give us this day our daily bread.\" Jesus teaches us to depend on the Father one day at a time.",
    points: [
      "Daily bread means daily dependence.",
      "Asking is part of relationship, not a lack of faith.",
      "Contentment grows where trust is practiced.",
    ],
    questions: [
      "What are you carrying for tomorrow that belongs to today's prayer?",
      "What would daily dependence change in your routine?",
    ],
  },
  {
    id: 7, title: "Your Kingdom Come", series: "pray", topic: "Kingdom",
    ref: "Matthew 6:10", passage: "mat6a", mins: 36, date: "2026-09-20", format: "Video",
    summary: "The centre of the Lord's Prayer is a request that heaven's rule be done on earth: in us first, and then through us.",
    points: [
      "Prayer aligns our will with the King's will.",
      "\"In earth as it is in heaven\" is a pattern for every area of life.",
      "Kingdom prayer turns into Kingdom obedience.",
    ],
    questions: [
      "Where do you most need God's will to be done this week?",
      "How does praying 'Thy kingdom come' change your own plans?",
    ],
  },
  {
    id: 6, title: "Our Father: Prayer as Relationship", series: "pray", topic: "Prayer",
    ref: "Matthew 6:9", passage: "mat6a", mins: 35, date: "2026-09-13", format: "Video",
    summary: "Jesus opens prayer with family language. Before we ask for anything, we remember who we are speaking to.",
    points: [
      "\"Our\": prayer joins us to a family.",
      "\"Father\": prayer begins in relationship, not performance.",
      "\"Hallowed be thy name\": worship sets the tone.",
    ],
    questions: [
      "How does calling God 'Father' change how you pray?",
      "What would it look like to begin each prayer with worship?",
    ],
  },
  {
    id: 5, title: "Righteousness, Peace and Joy", series: "seek", topic: "Kingdom",
    ref: "Romans 14:17", passage: "rom14", mins: 40, date: "2026-09-06", format: "Video",
    summary: "The Kingdom is not food and drink. It is righteousness, peace and joy in the Holy Ghost: the atmosphere of the King's rule.",
    points: [
      "Righteousness: right standing and right living.",
      "Peace: the settled order of God's rule.",
      "Joy: strength that does not depend on circumstance.",
    ],
    questions: [
      "Which of the three is most missing in your life right now?",
      "How can you carry the Kingdom's atmosphere into your home?",
    ],
  },
  {
    id: 4, title: "Seek First the Kingdom", series: "seek", topic: "Faith",
    ref: "Matthew 6:31–34", passage: "mat6b", mins: 43, date: "2026-08-30", format: "Video",
    summary: "Worry is replaced, not by trying harder, but by seeking first. When the Kingdom is first, everything else finds its place.",
    points: [
      "The Father knows what you need.",
      "Seeking first is a daily ordering of priorities.",
      "Tomorrow belongs to God; today belongs to obedience.",
    ],
    questions: [
      "What tends to come first in your mornings?",
      "What would 'seeking first' look like in your finances or schedule?",
    ],
  },
  {
    id: 3, title: "Born Again to See", series: "kingdom", topic: "Identity",
    ref: "John 3:3–5", passage: "john3", mins: 37, date: "2026-08-23", format: "Audio",
    summary: "Nicodemus came at night with questions. Jesus told him that no one can see or enter the Kingdom without a new birth.",
    points: [
      "Seeing the Kingdom requires new birth.",
      "Entering the Kingdom is by water and the Spirit.",
      "Religious knowledge is not the same as Kingdom life.",
    ],
    questions: [
      "What is the difference between seeing and entering the Kingdom?",
      "Where are you still trying to enter by effort?",
    ],
  },
  {
    id: 2, title: "The Gospel Jesus Preached", series: "kingdom", topic: "Kingdom",
    ref: "Mark 1:14–15", passage: "mark1", mins: 39, date: "2026-08-16", format: "Video",
    summary: "Jesus came preaching the gospel of the Kingdom of God. Before we can share the good news, we must hear it as He announced it.",
    points: [
      "The time is fulfilled: God's appointed moment has come.",
      "The Kingdom is at hand: near, accessible, present.",
      "Repent and believe: change your mind and trust the King.",
    ],
    questions: [
      "How would you explain the gospel of the Kingdom in two sentences?",
      "What does repentance mean in Kingdom terms?",
    ],
  },
  {
    id: 1, title: "What Is the Kingdom of God?", series: "kingdom", topic: "Kingdom",
    ref: "Luke 17:20–21", passage: "luke17", mins: 42, date: "2026-08-09", format: "Video",
    summary: "The first teaching of The Lighthouse. The Kingdom does not come with observation. It is the rule of God, present wherever He is King.",
    points: [
      "The Kingdom is the King's rule, not a place on a map.",
      "It comes without observation: it starts within.",
      "Every believer is called to know it, live it and reveal it.",
    ],
    questions: [
      "How would you have defined the Kingdom before today?",
      "Where do you see God's rule in your life already?",
    ],
  },
];

export const seriesById = (id: string) => SERIES.find((s) => s.id === id) ?? SERIES[0];
export const teachingById = (id: number) => TEACHINGS.find((t) => t.id === id);
