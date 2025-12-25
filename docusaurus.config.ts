import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Neural Dynamics',
  tagline: 'Synthesizing Motion and Intelligence for the Next Generation of Robots 🦾',
  favicon: 'img/favicon.ico',

  // ✅ Important for localized routing
  url: 'http://localhost:3000', 
  baseUrl: '/',
  trailingSlash: false, // Is se URL paths zyada predictable ho jatay hain
  
  organizationName: 'your-username', 
  projectName: 'neural-dynamics-portal',
  onBrokenLinks: 'warn', // 'throw' ki wajah se server bar bar ruk jata hai
  onBrokenMarkdownLinks: 'warn',

  future: {
    v4: true,
  },

  // 🌍 Urdu Setup
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ur'],
    localeConfigs: {
      en: { 
        label: 'English', 
        direction: 'ltr' 
      },
      ur: { 
        label: 'اردو', 
        direction: 'rtl' 
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // ✅ Path lazmi define karein
          path: 'docs',
          routeBasePath: 'docs',
          editUrl: ({locale, docPath}) => {
            if (locale === 'en') {
              return `https://github.com/your-repo/edit/main/docs/${docPath}`;
            }
            return `https://github.com/your-repo/edit/main/i18n/ur/docusaurus-plugin-content-docs/current/${docPath}`;
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Neural Dynamics',
      logo: {
        alt: 'Neural Dynamics Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Textbook',
        },
        
        // ✅ Official Locale Dropdown
        {
          type: 'localeDropdown',
          position: 'right',
        },

        {
          to: '/signup',
          label: 'Sign Up',
          position: 'right',
          className: 'signup-ani',
        },
        
        {
          type: 'html',
          position: 'right',
          value: `
            <div class="user-profile-tag" style="display: flex; align-items: center; gap: 8px;">
              <div id="user-email-display"></div>
              <a id="logout-link" style="display: none; cursor: pointer; color: #ff4d4d; margin-left: 10px;">Sign Out</a>
            </div>
          `,
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;