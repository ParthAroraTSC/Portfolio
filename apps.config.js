import { displaySpotify } from './components/apps/spotify';
import { displayVsCode } from './components/apps/vscode';
import { displayTerminal } from './components/apps/terminal';
import { displaySettings } from './components/apps/settings';
import { displayChrome } from './components/apps/chrome';
import { displayTrash } from './components/apps/trash';
import { displayGedit } from './components/apps/gedit';
import { displayAboutParth } from './components/apps/parth';
import { displayTerminalCalc } from './components/apps/calc';
import { displayGithub } from './components/apps/github';
import { displayReports } from './components/apps/reports';

const apps = [
  {
    id: "reports",
    title: "Project Reports",
    icon: "https://img.icons8.com/color/96/microsoft-word-2019.png",
    disabled: false,
    favourite: true,
    desktop_shortcut: true,
    screen: displayReports,
  },
  {
    id: "chrome",
    title: "Google Chrome",
    icon: './themes/Yaru/apps/chrome.png',
    disabled: false,
    favourite: true,
    desktop_shortcut: true,
    screen: displayChrome,
  },
  {
    id: "calc",
    title: "Calc",
    icon: './themes/Yaru/apps/calc.png',
    disabled: false,
    favourite: true,
    desktop_shortcut: false,
    screen: displayTerminalCalc,
  },
  {
    id: "about-parth",
    title: "About Parth Arora",
    icon: './images/pa-logo.svg',
    disabled: false,
    favourite: true,
    desktop_shortcut: true,
    screen: displayAboutParth,
  },
  {
    id: "vscode",
    title: "Visual Studio Code",
    icon: './themes/Yaru/apps/vscode.png',
    disabled: false,
    favourite: true,
    desktop_shortcut: false,
    screen: displayVsCode,
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: './themes/Yaru/apps/bash.png',
    disabled: false,
    favourite: true,
    desktop_shortcut: false,
    screen: displayTerminal,
  },
  {
    id: "spotify",
    title: "Spotify",
    icon: './themes/Yaru/apps/spotify.png',
    disabled: false,
    favourite: true,
    desktop_shortcut: false,
    screen: displaySpotify,
  },
  {
    id: "settings",
    title: "Settings",
    icon: './themes/Yaru/apps/gnome-control-center.png',
    disabled: false,
    favourite: true,
    desktop_shortcut: false,
    screen: displaySettings,
  },
  {
    id: "trash",
    title: "Trash",
    icon: './themes/Yaru/system/user-trash-full.png',
    disabled: false,
    favourite: false,
    desktop_shortcut: true,
    screen: displayTrash,
  },
  {
    id: "gedit",
    title: "Contact Me",
    icon: './themes/Yaru/apps/gedit.png',
    disabled: false,
    favourite: false,
    desktop_shortcut: true,
    screen: displayGedit,
  },
  {
    id: "github",
    title: "GitHub",
    icon: "./themes/Yaru/apps/github.png",
    disabled: false,
    favourite: true,
    desktop_shortcut: true,
    screen: displayGithub,
  },
  {
    id: "youtube",
    title: "YouTube",
    icon: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
    disabled: false,
    favourite: true,
    desktop_shortcut: true,
    screen: () => { },
    url: "https://www.youtube.com/",
    isExternalApp: true
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
    disabled: false,
    favourite: true,
    desktop_shortcut: true,
    screen: () => { },
    url: "https://www.linkedin.com/in/parth-arora-1343b5368/",
    isExternalApp: true
  },
];

export default apps;