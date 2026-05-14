import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'Learn Agentic Working',
  description: 'A practical, open-source playbook for getting real work done with AI agents.',
  base: '/learn-agentic-working/',
  lang: 'en-US',
  cleanUrls: true,
  ignoreDeadLinks: true,

  head: [
    ['meta', { name: 'theme-color', content: '#1f2937' }],
    ['meta', { property: 'og:title', content: 'Learn Agentic Working' }],
    ['meta', { property: 'og:description', content: 'For engineers, designers, analysts, PMs, marketers, operations — anyone whose work touches a computer.' }],
    ['meta', { property: 'og:type', content: 'website' }],
  ],

  themeConfig: {
    siteTitle: 'Learn Agentic Working',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Start here', link: '/en/part-1-foundations/chapter-01-what-changes-when-ai-can-act/' },
      { text: '10-min first win', link: '/en/part-1-foundations/chapter-04-a-10-minute-first-win/' },
      {
        text: 'Parts',
        items: [
          { text: 'I — Foundations', link: '/en/part-1-foundations/chapter-01-what-changes-when-ai-can-act/' },
          { text: 'II — Setup once', link: '/en/part-2-setup-once/chapter-06-installing-your-agent/' },
          { text: 'III — Working with an agent', link: '/en/part-3-working-with-an-agent/chapter-10-equip-first-then-brief/' },
          { text: 'IV — Skills', link: '/en/part-4-skills/chapter-17-skills-slash-mcp/' },
          { text: 'V — Workflows by audience', link: '/en/part-5-workflows-by-audience/chapter-20-for-software-engineers/' },
          { text: 'VI — Going further', link: '/en/part-6-going-further/chapter-25-voice-and-vision-as-input/' },
          { text: 'Appendix', link: '/en/appendix/appendix-a-glossary/' },
        ],
      },
      { text: 'GitHub', link: 'https://github.com/the-good-pixel/learn-agentic-working' },
    ],

    sidebar: {
      '/en/': [
        {
          text: 'Part I — Foundations',
          collapsed: false,
          items: [
            { text: '1. What changes when AI can act', link: '/en/part-1-foundations/chapter-01-what-changes-when-ai-can-act/' },
            { text: '2. How does an agent actually work', link: '/en/part-1-foundations/chapter-02-how-does-an-agent-actually-work/' },
            { text: "3. What's out there right now", link: '/en/part-1-foundations/chapter-03-whats-out-there-right-now/' },
            { text: '4. A 10-minute first win', link: '/en/part-1-foundations/chapter-04-a-10-minute-first-win/' },
            { text: '5. Do you still need that AI tool', link: '/en/part-1-foundations/chapter-05-do-you-still-need-that-ai-tool/' },
          ],
        },
        {
          text: 'Part II — Setup once',
          collapsed: false,
          items: [
            { text: '6. Installing your agent', link: '/en/part-2-setup-once/chapter-06-installing-your-agent/' },
            { text: '7. How much should you trust the agent', link: '/en/part-2-setup-once/chapter-07-how-much-should-you-trust-the-agent/' },
            { text: '8. Teaching the agent who you are', link: '/en/part-2-setup-once/chapter-08-teaching-the-agent-who-you-are/' },
            { text: '9. What is MCP', link: '/en/part-2-setup-once/chapter-09-what-is-mcp/' },
          ],
        },
        {
          text: 'Part III — Working with an agent',
          collapsed: false,
          items: [
            { text: '10. Equip first, then brief', link: '/en/part-3-working-with-an-agent/chapter-10-equip-first-then-brief/' },
            { text: '11. Why is context everything', link: '/en/part-3-working-with-an-agent/chapter-11-why-is-context-everything/' },
            { text: '12. What should the agent produce', link: '/en/part-3-working-with-an-agent/chapter-12-what-should-the-agent-actually-produce/' },
            { text: '13. Reviewing and recovering', link: '/en/part-3-working-with-an-agent/chapter-13-reviewing-and-recovering/' },
            { text: "14. Don't micromanage", link: '/en/part-3-working-with-an-agent/chapter-14-dont-micromanage/' },
            { text: '15. Letting it cook', link: '/en/part-3-working-with-an-agent/chapter-15-letting-it-cook/' },
            { text: '16. Managing context', link: '/en/part-3-working-with-an-agent/chapter-16-managing-context/' },
          ],
        },
        {
          text: 'Part IV — Skills',
          collapsed: false,
          items: [
            { text: '17. Skills / slash commands / MCPs', link: '/en/part-4-skills/chapter-17-skills-slash-mcp/' },
            { text: '18. When to stop re-prompting', link: '/en/part-4-skills/chapter-18-when-to-stop-re-prompting/' },
            { text: '19. Writing a good skill', link: '/en/part-4-skills/chapter-19-writing-a-good-skill/' },
          ],
        },
        {
          text: 'Part V — Workflows by audience',
          collapsed: false,
          items: [
            { text: '20. For software engineers', link: '/en/part-5-workflows-by-audience/chapter-20-for-software-engineers/' },
            { text: '21. For data and analytics', link: '/en/part-5-workflows-by-audience/chapter-21-for-data-and-analytics/' },
            { text: '22. For PMs and designers', link: '/en/part-5-workflows-by-audience/chapter-22-for-pms-and-designers/' },
            { text: '23. For business / ops', link: '/en/part-5-workflows-by-audience/chapter-23-for-business-ops/' },
            { text: '24. For everyone — personal', link: '/en/part-5-workflows-by-audience/chapter-24-for-everyone-personal-workflows/' },
          ],
        },
        {
          text: 'Part VI — Going further',
          collapsed: false,
          items: [
            { text: '25. Voice and vision as input', link: '/en/part-6-going-further/chapter-25-voice-and-vision-as-input/' },
            { text: '26. Letting the agent drive your browser', link: '/en/part-6-going-further/chapter-26-letting-the-agent-drive-your-browser/' },
            { text: '27. Running agents responsibly', link: '/en/part-6-going-further/chapter-27-running-agents-responsibly/' },
            { text: "28. What we got wrong, and what's next", link: '/en/part-6-going-further/chapter-28-what-we-got-wrong-and-whats-next/' },
          ],
        },
        {
          text: 'Appendix',
          collapsed: true,
          items: [
            { text: 'A. Glossary', link: '/en/appendix/appendix-a-glossary/' },
            { text: 'B. CLAUDE.md templates', link: '/en/appendix/appendix-b-claude-md-templates/' },
            { text: 'C. Skills examples', link: '/en/appendix/appendix-c-skills-examples/' },
            { text: 'D. Further reading', link: '/en/appendix/appendix-d-further-reading/' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/the-good-pixel/learn-agentic-working' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'An open-source project. Contributions welcome.',
    },

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
    },
  },
}))
