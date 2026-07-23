export const issues = [
  {
    number: "001",
    slug: "001-illusion-of-choice",
    title: "The Illusion of Choice",
    thesis: "The goal is a choice. What the goal requires is not.",
    summary:
      "Ambitious outcomes narrow the range of behaviors compatible with achieving them. The objective remains firm; the methods must remain adaptable.",
    readingTime: "7 min read",
    publicationDate: "July 2026",
    sections: [
      {
        id: "concept",
        eyebrow: "The Concept",
        title: "Requirements are not open questions.",
        body: [
          "At the highest levels, people rarely fail because they don’t know what to do. They fail because they continue treating required behaviors as open questions.",
          "Once an individual or organization commits to an ambitious goal, the range of behaviors compatible with that goal becomes much narrower. Other choices remain technically available—but they are not equally compatible with the desired outcome."
        ]
      },
      {
        id: "story",
        eyebrow: "The Story",
        title: "Longevity demanded adaptation.",
        media: {
          src: "/assets/vince-carter-2013.jpg",
          alt: "Portrait of Vince Carter in March 2013.",
          caption: "Vince Carter, March 2013. The objective stayed fixed; his role, methods and game continued to evolve.",
          credit: "Photo: Danny Bollinger",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Vince_Carter_2013-03-25_(1).jpg",
          license: "CC BY 2.0",
          licenseUrl: "https://creativecommons.org/licenses/by/2.0/"
        },
        body: [
          "In 2015, mental-performance expert Trevor Moawad was working with the Memphis Grizzlies and Vince Carter, then in his 17th NBA season.",
          "During a conversation about talented college athletes whose off-field behavior conflicted with their professional aspirations, Carter questioned how players could say they wanted to reach the NFL while repeatedly behaving in ways that undermined that goal.",
          "Moawad asked Carter, “Is choice an illusion?”",
          "“Of course,” Carter responded. He explained that there was no way he would still be playing professional basketball in his late thirties if he had always done whatever he felt like doing.",
          "Carter had a clear objective: remain capable of playing NBA basketball for as long as possible. That objective established his standards.",
          "He improved his nutrition, hydration, recovery and postgame conditioning. He reduced unnecessary dunks to protect his knees. As his athleticism changed, he expanded his shooting, accepted fewer minutes and transitioned from superstar to role player and veteran leader.",
          "He didn’t preserve his career by stubbornly remaining the same. He preserved it by remaining committed to the objective while continually adapting his methods.",
          "Carter ultimately played an NBA-record 22 seasons."
        ]
      },
      {
        id: "leadership",
        eyebrow: "The Leadership Lesson",
        title: "Every declaration carries requirements.",
        body: [
          "The illusion is not that alternatives exist. The illusion is believing we can choose any alternative and remain entitled to the same result.",
          "A team can say it wants to win a championship. A business can say it wants to lead its industry. A leader can say culture and accountability matter.",
          "But each declaration carries behavioral requirements.",
          "If a team chooses championship expectations, preparation, conditioning, defense, rebounding, unselfishness and accountability cannot remain matters of convenience.",
          "If a company chooses industry leadership, speed, execution, innovation, customer focus and organizational alignment cannot depend on how people feel that day.",
          "Strong leadership makes the connection between aspiration and behavior unmistakably clear:"
        ],
        prompts: [
          "What do we want?",
          "What does achieving it require?",
          "Which required behaviors are we still treating as optional?"
        ]
      },
      {
        id: "distinction",
        eyebrow: "The Important Distinction",
        title: "Firm objective. Adaptable methods.",
        body: [
          "This does not mean there is only one path to success—or that leaders should confuse their personal preferences with genuine performance requirements.",
          "The objective should remain firm. The methods must remain adaptable.",
          "Carter’s non-negotiable was longevity. His role, playing style and training methods evolved in service of it.",
          "That is disciplined adaptability: uncompromising about the destination, but intelligent and flexible about the route."
        ]
      }
    ],
    pullQuotes: [
      {
        after: "concept",
        text: "The illusion is believing we can choose any alternative and remain entitled to the same result."
      },
      {
        after: "distinction",
        text: "Uncompromising about the destination, but intelligent and flexible about the route."
      }
    ],
    applicationPoints: [
      "Define the outcome clearly.",
      "Identify the few behaviors that materially drive it.",
      "Separate true requirements from traditions and preferences.",
      "Turn the requirements into visible standards and operating habits.",
      "Review the formula as conditions change."
    ],
    closingQuestion:
      "Where are we currently declaring an important goal while continuing to treat one of its required behaviors as optional?",
    closingStandard: "Choose the standard before the feeling arrives.",
    sources: [
      "Trevor Moawad and Andy Staples, “It Takes What It Takes”",
      "Vince Carter’s reflections on adaptation and longevity"
    ]
  }
];

export function getIssue(slug) {
  return issues.find((issue) => issue.slug === slug);
}
