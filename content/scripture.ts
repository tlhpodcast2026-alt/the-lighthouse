/**
 * Scripture for the study reader: King James Version (public domain).
 * Add a passage by giving it a key, a reference, a title and its verses.
 */
export type Passage = { ref: string; title: string; verses: [number, string][] };

export const PASSAGES: Record<string, Passage> = {
  mark1: {
    ref: "Mark 1:14–15", title: "The Kingdom is at hand",
    verses: [
      [14, "Now after that John was put in prison, Jesus came into Galilee, preaching the gospel of the kingdom of God,"],
      [15, "And saying, The time is fulfilled, and the kingdom of God is at hand: repent ye, and believe the gospel."],
    ],
  },
  luke17: {
    ref: "Luke 17:20–21", title: "Not with observation",
    verses: [
      [20, "And when he was demanded of the Pharisees, when the kingdom of God should come, he answered them and said, The kingdom of God cometh not with observation:"],
      [21, "Neither shall they say, Lo here! or, lo there! for, behold, the kingdom of God is within you."],
    ],
  },
  john3: {
    ref: "John 3:3–5", title: "Born again",
    verses: [
      [3, "Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God."],
      [4, "Nicodemus saith unto him, How can a man be born when he is old? can he enter the second time into his mother's womb, and be born?"],
      [5, "Jesus answered, Verily, verily, I say unto thee, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God."],
    ],
  },
  mat6a: {
    ref: "Matthew 6:9–13", title: "After this manner pray",
    verses: [
      [9, "After this manner therefore pray ye: Our Father which art in heaven, Hallowed be thy name."],
      [10, "Thy kingdom come. Thy will be done in earth, as it is in heaven."],
      [11, "Give us this day our daily bread."],
      [12, "And forgive us our debts, as we forgive our debtors."],
      [13, "And lead us not into temptation, but deliver us from evil: For thine is the kingdom, and the power, and the glory, for ever. Amen."],
    ],
  },
  mat6b: {
    ref: "Matthew 6:31–34", title: "Seek ye first",
    verses: [
      [31, "Therefore take no thought, saying, What shall we eat? or, What shall we drink? or, Wherewithal shall we be clothed?"],
      [32, "(For after all these things do the Gentiles seek:) for your heavenly Father knoweth that ye have need of all these things."],
      [33, "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you."],
      [34, "Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof."],
    ],
  },
  rom14: {
    ref: "Romans 14:17–19", title: "Righteousness, peace and joy",
    verses: [
      [17, "For the kingdom of God is not meat and drink; but righteousness, and peace, and joy in the Holy Ghost."],
      [18, "For he that in these things serveth Christ is acceptable to God, and approved of men."],
      [19, "Let us therefore follow after the things which make for peace, and things wherewith one may edify another."],
    ],
  },
  col1: {
    ref: "Colossians 1:12–14", title: "Translated into His kingdom",
    verses: [
      [12, "Giving thanks unto the Father, which hath made us meet to be partakers of the inheritance of the saints in light:"],
      [13, "Who hath delivered us from the power of darkness, and hath translated us into the kingdom of his dear Son:"],
      [14, "In whom we have redemption through his blood, even the forgiveness of sins:"],
    ],
  },
  mat5: {
    ref: "Matthew 5:13–16", title: "Salt and light",
    verses: [
      [13, "Ye are the salt of the earth: but if the salt have lost his savour, wherewith shall it be salted? it is thenceforth good for nothing, but to be cast out, and to be trodden under foot of men."],
      [14, "Ye are the light of the world. A city that is set on an hill cannot be hid."],
      [15, "Neither do men light a candle, and put it under a bushel, but on a candlestick; and it giveth light unto all that are in the house."],
      [16, "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven."],
    ],
  },
};

export type PlanDay = { passage: string; focus?: number; question: string; prayer: string };
export type Plan = { id: string; name: string; length: string; blurb: string; days: PlanDay[] };

export const PLANS: Plan[] = [
  {
    id: "foundations", name: "Kingdom Foundations", length: "8 days",
    blurb: "Eight short readings on what the Kingdom is and how we live in it.",
    days: [
      { passage: "mark1", question: "Jesus' first message was the Kingdom. How does that shape what the gospel means to you?", prayer: "Father, open my eyes to the gospel Jesus preached." },
      { passage: "luke17", question: "If the Kingdom does not come with observation, where should you look for it today?", prayer: "Lord, rule in me first." },
      { passage: "john3", question: "What is the difference between seeing the Kingdom and entering it?", prayer: "Holy Spirit, make me new and keep me new." },
      { passage: "col1", question: "You have been transferred. What old allegiance do you need to let go of?", prayer: "Thank You for delivering me and bringing me into Your Son's kingdom." },
      { passage: "mat6a", question: "Pray the prayer slowly. Which line holds you the longest?", prayer: "Thy kingdom come, thy will be done, in my life today." },
      { passage: "mat6b", question: "What would change if the Kingdom truly came first this week?", prayer: "Father, You know what I need. I choose to seek You first." },
      { passage: "rom14", question: "Which is most present in your life right now: righteousness, peace or joy? Which is most missing?", prayer: "Fill me with righteousness, peace and joy in the Holy Ghost." },
      { passage: "mat5", question: "Where has God placed you as a light? Who will see it this week?", prayer: "Let my light shine so that people glorify You." },
    ],
  },
  {
    id: "praylikethis", name: "Pray Like This", length: "5 days",
    blurb: "A slow walk through the Lord's Prayer, one movement a day.",
    days: [
      { passage: "mat6a", focus: 9, question: "Begin with 'Our Father'. What does it mean to come to God as a child?", prayer: "Our Father, hallowed be Your name." },
      { passage: "mat6a", focus: 10, question: "Write down three areas where you want God's will done as in heaven.", prayer: "Your kingdom come, Your will be done." },
      { passage: "mat6a", focus: 11, question: "What do you need today, just today?", prayer: "Give me this day my daily bread." },
      { passage: "mat6a", focus: 12, question: "Who do you need to forgive? Name them before God.", prayer: "Forgive me as I forgive." },
      { passage: "mat6a", focus: 13, question: "Close by returning everything to Him: the kingdom, the power, the glory.", prayer: "Yours is the kingdom, the power and the glory, for ever." },
    ],
  },
];

/** Verse of the day rotates through this list by day of year. */
export const DAILY_VERSES: { text: string; ref: string; version: string }[] = [
  { text: "You are the light of the world. A city set on a hill cannot be hidden.", ref: "Matthew 5:14", version: "ESV" },
  { text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.", ref: "Matthew 6:33", version: "KJV" },
  { text: "For the kingdom of God is not meat and drink; but righteousness, and peace, and joy in the Holy Ghost.", ref: "Romans 14:17", version: "KJV" },
  { text: "Thy kingdom come. Thy will be done in earth, as it is in heaven.", ref: "Matthew 6:10", version: "KJV" },
  { text: "Behold, the kingdom of God is within you.", ref: "Luke 17:21", version: "KJV" },
  { text: "And let us not be weary in well doing: for in due season we shall reap, if we faint not.", ref: "Galatians 6:9", version: "KJV" },
  { text: "Thy word is a lamp unto my feet, and a light unto my path.", ref: "Psalm 119:105", version: "KJV" },
];

export const GUIDED_PRAYER: { line: string; prompt: string }[] = [
  { line: "Our Father which art in heaven, hallowed be thy name.", prompt: "Begin with who He is. Thank Him that you come as a child, not a stranger. Name one thing about His character you are grateful for." },
  { line: "Thy kingdom come. Thy will be done in earth, as it is in heaven.", prompt: "Invite His rule into your day. Bring your plans, your family, your work. Where do you need His will instead of yours?" },
  { line: "Give us this day our daily bread.", prompt: "Ask simply for what you need today. Provision, strength, wisdom. He already knows. Trust Him for today." },
  { line: "And forgive us our debts, as we forgive our debtors.", prompt: "Receive forgiveness. Then name anyone you need to release. Forgiveness is how Kingdom people stay free." },
  { line: "And lead us not into temptation, but deliver us from evil.", prompt: "Ask for protection and clarity. Where are you vulnerable this week? Ask Him to lead you on a clear path." },
  { line: "For thine is the kingdom, and the power, and the glory, for ever. Amen.", prompt: "Close in worship. Everything returns to Him. Rest in the fact that the Kingdom is His, and He is good." },
];

export const PRAYER_CATEGORIES: [string, string][] = [
  ["Guidance", "Decisions, direction"],
  ["Healing", "Body, mind, heart"],
  ["Family", "Marriage, children, home"],
  ["Provision", "Work, finances, needs"],
  ["Salvation", "Someone to know Jesus"],
  ["Thanksgiving", "Praise for an answer"],
  ["Strength", "Faith in a hard season"],
  ["Other", "Anything on your heart"],
];

/** "Matthew 6:9–13" + 10 -> "Matthew 6:10" */
export function verseRef(passageKey: string, verse: number): string {
  const p = PASSAGES[passageKey];
  return p ? p.ref.replace(/:.*/, ":" + verse) : "";
}
export function verseText(passageKey: string, verse: number): string {
  return PASSAGES[passageKey]?.verses.find((v) => v[0] === verse)?.[1] ?? "";
}
