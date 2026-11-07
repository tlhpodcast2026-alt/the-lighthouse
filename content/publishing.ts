/** News & commentary, library and free resources. */

export type Article = {
  id: number;
  category: string;
  title: string;
  deck: string;
  date: string;
  mins: number;
  body: string[];
};

export const ARTICLES: Article[] = [
  {
    id: 1, category: "Commentary", title: "Peace in an Anxious Age",
    deck: "Reading the headlines through Romans 14:17, and why the Kingdom's peace is not the absence of news.",
    date: "2026-11-03", mins: 6,
    body: [
      "Every week brings a new reason to be anxious. Markets move, nations argue, and our phones make sure we hear about all of it. The temptation is to let the news set the temperature of our hearts.",
      "Paul tells the Romans that the Kingdom of God is righteousness, peace and joy in the Holy Ghost. That peace is not a mood we manufacture when things are calm. It is the settled order of God's rule, present even when everything around us is unsettled.",
      "A Kingdom lens on the news does not mean ignoring it. It means reading it from a different place: as citizens of a Kingdom that cannot be shaken (Hebrews 12:28). We stay informed, we pray specifically, and we refuse to let fear become our governor.",
    ],
  },
  {
    id: 2, category: "Kingdom Lens", title: "When the Nations Rage",
    deck: "Psalm 2 is three thousand years old and reads like this morning's front page. What does it teach about power?",
    date: "2026-10-27", mins: 7,
    body: [
      "\"Why do the heathen rage, and the people imagine a vain thing?\" The second psalm opens with a picture we recognise: rulers taking counsel together against the Lord and His anointed.",
      "The surprise is God's response. He is not anxious. He sits in the heavens and laughs, not out of cruelty, but because no human power can overturn His King.",
      "For believers, this is an invitation to hold political news with both seriousness and calm. We pray for those in authority (1 Timothy 2:1–2), we act justly, and we remember who is actually on the throne.",
    ],
  },
  {
    id: 3, category: "Culture", title: "Work, Machines and the Worth of a Person",
    deck: "As technology changes how we work, Genesis still tells us why we work.",
    date: "2026-10-19", mins: 8,
    body: [
      "New tools are changing many kinds of work. Some people feel excited, others feel replaceable. Both reactions ask the same question: what is a person worth?",
      "Scripture answers before any technology arrives. We are made in the image of God (Genesis 1:27) and given work as stewardship, not as the source of our value.",
      "Kingdom people can approach new tools with curiosity and wisdom, because their identity is not up for automation. The question is not whether we will be useful, but whether we will be faithful with what we have been given.",
    ],
  },
  {
    id: 4, category: "Kingdom Lens", title: "The Quiet Influence of Salt",
    deck: "Jesus called His followers salt before He called them light. Influence often starts unseen.",
    date: "2026-10-12", mins: 5,
    body: [
      "Salt works quietly. It preserves, it flavours, and it is noticed most when it is missing.",
      "Jesus said, \"Ye are the salt of the earth.\" Before believers shine publicly, they often serve unseen: in families, workplaces and communities that are better because they are there.",
      "Not every Kingdom assignment is a platform. Many are a presence. Both matter to the King.",
    ],
  },
  {
    id: 5, category: "Commentary", title: "Generosity When Money Is Tight",
    deck: "What the widow's two mites teach about giving in uncertain economies.",
    date: "2026-10-05", mins: 6,
    body: [
      "When costs rise, generosity is often the first thing we cut. It feels responsible.",
      "Jesus watched people giving at the temple and pointed to a widow who gave two small coins. She gave more than all of them, He said, because she gave out of her need (Mark 12:41–44).",
      "Kingdom generosity is not measured by amount but by trust. It is a declaration that the Father, not our savings, is our source.",
    ],
  },
];

export type Book = {
  title: string;
  subtitle?: string;
  author: string;
  bg: string;
  fg: string;
  accent: string;
  note: string;
  own?: boolean;
};

export const BOOKS: Book[] = [
  { title: "Winning Every Day", subtitle: "The Principle of KOR", author: "Johnson Jayeola", bg: "#24272B", fg: "#FBFAF6", accent: "#C9853A", own: true,
    note: "Pastor Johnson's book on Knowing, Owning and Repeating the truths that make daily victory possible." },
  { title: "The Gospel of the Kingdom", author: "George Eldon Ladd", bg: "#E4ECE7", fg: "#24272B", accent: "#46695F",
    note: "A clear, classic study of what Jesus meant by the Kingdom of God." },
  { title: "Rediscovering the Kingdom", author: "Myles Munroe", bg: "#F4F0E8", fg: "#24272B", accent: "#C9853A",
    note: "An accessible introduction to Kingdom citizenship and purpose." },
  { title: "The Divine Conspiracy", author: "Dallas Willard", bg: "#3A3833", fg: "#FBFAF6", accent: "#E9E1D3",
    note: "A deep reflection on living in the Kingdom here and now, through the Sermon on the Mount." },
  { title: "With Christ in the School of Prayer", author: "Andrew Murray", bg: "#DAE6EF", fg: "#24272B", accent: "#46695F",
    note: "Thirty-one short lessons on prayer, still fresh after more than a century." },
  { title: "Knowing God", author: "J. I. Packer", bg: "#2F4A43", fg: "#FBFAF6", accent: "#C9853A",
    note: "On the character of God and why knowing Him is the purpose of life." },
];

export type Resource = {
  id: string;
  type: string;
  title: string;
  size: string;
  blurb: string;
  /** In-site destination, e.g. "/study?plan=foundations" or "/prayer" */
  open?: { href: string; label: string };
  /** Optional downloadable file placed in /public/resources/ */
  file?: string;
  text: string;
};

export const RESOURCES: Resource[] = [
  {
    id: "guide", type: "Study guide", title: "Kingdom Foundations Study Guide", size: "8 sessions",
    blurb: "For personal or small-group study. Each session has a reading, key ideas and discussion questions.",
    open: { href: "/study?plan=foundations", label: "Start in Bible Study" },
    text: "KINGDOM FOUNDATIONS — STUDY GUIDE\nThe Lighthouse\n\nSession 1 — The gospel Jesus preached (Mark 1:14–15)\nSession 2 — Not with observation (Luke 17:20–21)\nSession 3 — Born again to see (John 3:3–5)\nSession 4 — Transferred (Colossians 1:12–14)\nSession 5 — Pray like this (Matthew 6:9–13)\nSession 6 — Seek first (Matthew 6:31–34)\nSession 7 — Righteousness, peace and joy (Romans 14:17)\nSession 8 — Salt and light (Matthew 5:13–16)\n\nFor each session:\n1. Read the passage twice, once aloud.\n2. Write one sentence: what does this show about the Kingdom?\n3. Discuss: where is this true in my life? Where is it not yet?\n4. Pray the passage back to God.",
  },
  {
    id: "plan", type: "Reading plan", title: "Pray Like This — 5 days", size: "5 readings",
    blurb: "A slow walk through the Lord's Prayer, built into the study reader with progress tracking.",
    open: { href: "/study?plan=praylikethis", label: "Start in Bible Study" },
    text: "PRAY LIKE THIS — 5-DAY READING PLAN\nDay 1 — Matthew 6:9 · Our Father\nDay 2 — Matthew 6:10 · Thy kingdom come\nDay 3 — Matthew 6:11 · Daily bread\nDay 4 — Matthew 6:12 · Forgive us\nDay 5 — Matthew 6:13 · Thine is the kingdom",
  },
  {
    id: "journal", type: "Prayer journal", title: "The Lighthouse Prayer Journal", size: "Built in",
    blurb: "Keep requests, mark answers and look back on God's faithfulness. Private to your device.",
    open: { href: "/prayer#journal", label: "Open prayer journal" },
    text: "PRAYER JOURNAL PAGE\nDate:\nScripture I'm praying:\nPraise (who God is):\nThanks (what He has done):\nRequests (for me / for others):\nWhat I sense God saying:\nAnswered on:",
  },
  {
    id: "notes", type: "Note sheet", title: "Teaching Note Sheet", size: "1 page",
    blurb: "A simple structure for taking notes during a teaching or live session.",
    text: "TEACHING NOTES — THE LIGHTHOUSE\nTeaching:\nDate:\nKey scripture:\n\nThe big idea (one sentence):\n\nThree points:\n1.\n2.\n3.\n\nWhat this shows about the Kingdom:\n\nOne thing I will do this week:\n\nPrayer response:",
  },
  {
    id: "devo", type: "Devotional", title: "Seven Mornings of Light", size: "7 days",
    blurb: "Short morning readings on Jesus as the light of the world, with a line of prayer for each day.",
    text: "SEVEN MORNINGS OF LIGHT\nDay 1 — Genesis 1:3 · Let there be light\nDay 2 — Psalm 27:1 · The Lord is my light\nDay 3 — Psalm 119:105 · A lamp unto my feet\nDay 4 — Isaiah 60:1 · Arise, shine\nDay 5 — John 8:12 · I am the light of the world\nDay 6 — Matthew 5:14 · Ye are the light of the world\nDay 7 — 1 John 1:7 · Walk in the light\n\nEach morning: read slowly, write one line of what you notice, and pray it back to God.",
  },
  {
    id: "kor", type: "Study guide", title: "KOR Companion Guide", size: "3 sessions",
    blurb: "A companion to Winning Every Day: one session each for Knowing, Own and Repeat.",
    text: "KOR COMPANION GUIDE\nWinning Every Day: The Principle of KOR — Johnson Jayeola\n\nSession 1 — KNOWING (Proverbs 4:7; Hosea 4:6)\nWhat do I know about God that I am not yet living?\n\nSession 2 — OWN (Matthew 25:14–30)\nWhat has been entrusted to me? Where have I buried it?\n\nSession 3 — REPEAT (Galatians 6:9)\nWhat one practice will I repeat daily for 30 days?",
  },
];
