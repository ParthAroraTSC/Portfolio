import React, { Component, useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { project_list, cyber_project_list, tag_colors } from '../../data/projects';

export class AboutParth extends Component {
    constructor() {
        super();
        this.screens = {};
        this.state = {
            screen: () => { },
            active_screen: "about",
            navbar: false,
        }
    }

    componentDidMount() {
        this.screens = {
            "about": <About />,
            "education": <Education />,
            "skills": <Skills />,
            "projects": <Projects />,
            "resume": <Resume />,
        }

        let lastVisitedScreen = localStorage.getItem("about-section") || "about";
        this.changeScreen(document.getElementById(lastVisitedScreen));
    }

    changeScreen = (e) => {
        const screen = e.id || e.target.id;
        localStorage.setItem("about-section", screen);
        ReactGA.send({ hitType: "pageview", page: `/${screen}`, title: "Custom Title" });

        this.setState({
            screen: this.screens[screen],
            active_screen: screen
        });
    }

    showNavBar = () => {
        this.setState({ navbar: !this.state.navbar });
    }

    renderNavLinks = () => {
        const sections = [
            { id: "about", icon: "about", label: "About Me" },
            { id: "education", icon: "education", label: "Education" },
            { id: "skills", icon: "skills", label: "Skills" },
            { id: "projects", icon: "projects", label: "Projects" },
            { id: "resume", icon: "download", label: "Resume" },
        ];

        return sections.map((section) => (
            <div 
                key={section.id}
                id={section.id} 
                tabIndex="0" 
                onFocus={this.changeScreen} 
                className={`${this.state.active_screen === section.id ? "bg-ub-orange" : "hover:bg-gray-50 hover:bg-opacity-5"} w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5`}
            >
                <img className="w-3 md:w-4" alt={`parth's ${section.id}`} src={`./themes/Yaru/status/${section.icon}.svg`} />
                <span className="ml-1 md:ml-2 text-gray-50">{section.label}</span>
            </div>
        ));
    }

    render() {
        return (
            <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative">
                <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black">
                    {this.renderNavLinks()}
                </div>
                <div onClick={this.showNavBar} className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey rounded w-6 h-6 top-1 left-1 z-50">
                    <div className="w-3.5 border-t border-white"></div>
                    <div className="w-3.5 border-t border-white mt-1 mb-1"></div>
                    <div className="w-3.5 border-t border-white"></div>
                    <div className={`${this.state.navbar ? "visible animateShow" : "invisible"} md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20`}>
                        {this.renderNavLinks()}
                    </div>
                </div>
                <div className="flex flex-col w-3/4 md:w-4/5 justify-start items-center flex-grow bg-ub-grey overflow-y-auto windowMainScreen">
                    {this.state.screen}
                </div>
            </div>
        );
    }
}

export default AboutParth;

export const displayAboutParth = () => <AboutParth />;

function About() {
    return (
        <>
            <div className="mt-4 md:mt-8 text-lg md:text-2xl text-center px-1">
                <div>my name is <span className="font-bold">Parth Arora</span> ,</div>
                <div className="font-normal ml-1">I'm a <span className="text-pink-600 font-bold">SOC Analyst!</span></div>
            </div>
            <div className="mt-4 relative md:my-8 pt-px bg-white w-32 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>
            <ul className="mt-4 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list">
                <li className="list-pc">I am a <span className="font-medium">cybersecurity professional</span> working as a <span className="font-medium">SOC Analyst</span>, focused on monitoring, detecting, and responding to security incidents.</li>
                <li className="mt-3 list-building">I have completed a one-year diploma in <span className="font-medium">Cybersecurity and Ethical Hacking</span> from Shobhit University.</li>
                <li className="mt-3 list-time">I am currently expanding my skills in <span className="font-medium">VAPT, DevOps, and DevSecOps</span>, with a strong interest in building secure and scalable systems.</li>
                <li className="mt-8 text-xs text-gray-500 font-bold italic tracking-widest text-center uppercase">Developed and maintained by Parth Arora</li>
            </ul>
        </>
    );
}

function Education() {
    return (
        <>
            <SectionHeader title="Education" />
            <ul className="w-10/12 mt-4 ml-4 px-0 md:px-1">
                <EducationItem institution="Shobhit University" date="2026" degree="BCA in Cyber Security" status="Pursuing" />
                <EducationItem institution="Class 12th" date="2025" degree="Commerce Stream" status="Overall Percentage &nbsp; 72%" />
            </ul>
        </>
    );
}

const EducationItem = ({ institution, date, degree, status }) => (
    <li className="list-disc mt-5 first:mt-0">
        <div className="text-lg md:text-xl text-left font-bold leading-tight">{institution}</div>
        <div className="text-sm text-gray-400 mt-0.5">{date}</div>
        <div className="text-sm md:text-base">{degree}</div>
        <div className="text-sm text-gray-300 font-bold mt-1">{status}</div>
    </li>
);

function Skills() {
    return (
        <>
            <SectionHeader title="Technical Skills" />
            <ul className="tracking-tight text-sm md:text-base w-10/12 emoji-list">
                <li className="list-arrow mt-4">I specialize in monitoring, detecting, and responding to security threats.</li>
                <li className="list-arrow mt-4">My areas of expertise are <strong className="text-ubt-gedit-orange">SOC Operations, Incident Response & VAPT!</strong></li>
                <li className="list-arrow mt-4">Here are my most frequently used tools</li>
            </ul>
            <div className="w-full md:w-10/12 flex mt-4 font-bold text-center">
                <div className="w-1/2">Security Tools</div>
                <div className="w-1/2">DevSecOps & Systems</div>
            </div>
            <div className="w-full md:w-10/12 flex justify-center items-start font-bold text-center">
                <SkillGroup tools={[
                    { name: "Wireshark", color: "1679A7", logo: "wireshark" },
                    { name: "Nmap", color: "4F5D95", logo: "nmap" },
                    { name: "Splunk", color: "000000", logo: "splunk" },
                    { name: "Metasploit", color: "000000", logo: "metasploit" },
                    { name: "Burp_Suite", color: "FF6633", logo: "burpsuite" },
                    { name: "Git", color: "F05032", logo: "git" }
                ]} />
                <SkillGroup tools={[
                    { name: "Docker", color: "2496ED", logo: "docker" },
                    { name: "Kubernetes", color: "326CE5", logo: "kubernetes" },
                    { name: "Ansible", color: "EE0000", logo: "ansible" },
                    { name: "Python", color: "3776AB", logo: "python" },
                    { name: "Linux", color: "FCC624", logo: "linux", logoColor: "black" },
                    { name: "Bash", color: "4EAA25", logo: "gnubash" }
                ]} />
            </div>
            <ul className="tracking-tight text-sm md:text-base w-10/12 emoji-list mt-4">
                <li className="list-arrow mt-4">
                    <span>Constantly hardening systems and </span> <strong className="text-ubt-gedit-orange">automating security workflows.</strong>
                </li>
            </ul>
        </>
    );
}

const SkillGroup = ({ tools }) => (
    <div className="px-2 w-1/2 flex flex-wrap justify-center mt-2">
        {tools.map(tool => (
            <img 
                key={tool.name}
                className="m-1" 
                src={`https://img.shields.io/badge/-${tool.name}-${tool.color}?style=flat&logo=${tool.logo}&logoColor=${tool.logoColor || 'white'}`} 
                alt={`parth ${tool.name}`} 
            />
        ))}
    </div>
);

function Projects() {
    const [preview_project, setPreviewProject] = useState(null);

    if (preview_project !== null) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center p-4 animateShow">
                <div className="bg-ub-drk-abrgn p-6 rounded-lg shadow-2xl flex flex-col items-center border border-gray-600 w-full md:w-4/5">
                    <div className="flex justify-between w-full mb-4">
                        <button onClick={() => setPreviewProject(null)} className="text-gray-400 hover:text-white flex items-center transition-colors">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            Back
                        </button>
                        <span className="text-gray-400 text-sm">{preview_project.date}</span>
                    </div>
                    <div className="text-3xl font-bold mb-4 text-center">{preview_project.name}</div>
                    <ul className="text-gray-200 mb-6 text-center italic">
                        {preview_project.description.map((desc, i) => <li key={i}>{desc}</li>)}
                    </ul>
                    <div className="flex flex-wrap justify-center mb-8">
                        {preview_project.domains.map((domain, i) => (
                            <span key={i} className={`px-2 py-1 border border-${tag_colors[domain]} text-${tag_colors[domain]} m-1 rounded-full text-xs`}>{domain}</span>
                        ))}
                    </div>
                    {preview_project.link !== "#" && (
                        <a 
                            href={preview_project.link} 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-10 py-3 bg-ub-orange hover:bg-opacity-90 rounded-full font-bold transition duration-200 transform hover:scale-105"
                        >
                            Visit Live Site
                        </a>
                    )}
                </div>
            </div>
        );
    }

    const ProjectList = ({ title, list }) => (
        <>
            <SectionHeader title={title} className="mt-12 first:mt-2" />
            {list.map((project, index) => (
                <div key={index} onClick={() => setPreviewProject(project)} className="flex w-full flex-col px-4">
                    <div className="w-full py-1 px-2 my-2 border border-gray-50 border-opacity-10 rounded hover:bg-gray-50 hover:bg-opacity-5 cursor-pointer">
                        <div className="flex flex-wrap justify-between items-center">
                            <div className="text-base md:text-lg mr-2 font-medium">{project.name.toLowerCase()}</div>
                            <div className="text-gray-300 font-light text-sm">{project.date}</div>
                        </div>
                        <ul className="tracking-normal leading-tight text-sm font-light ml-4 mt-1">
                            {project.description.map((desc, i) => (
                                <li key={i} className="list-disc mt-1 text-gray-400">{desc}</li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap ml-4 my-2">
                            {project.domains.map((domain, i) => (
                                <span key={i} className={`px-1.5 py-0.5 border border-${tag_colors[domain]} text-${tag_colors[domain]} m-1 rounded-full text-[10px]`}>{domain}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );

    return (
        <>
            <ProjectList title="Cybersecurity Projects" list={cyber_project_list} />
            <ProjectList title="Web Development Projects" list={project_list} />
        </>
    );
}

function Resume() {
    return (
        <iframe className="h-full w-full" src="./files/Parth-Arora-Resume.pdf" title="parth arora resume" frameBorder="0"></iframe>
    );
}

const SectionHeader = ({ title, className = "" }) => (
    <div className={`font-medium relative text-2xl mb-4 ${className}`}>
        {title}
        <div className="absolute pt-px bg-white mt-px top-full w-full">
            <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
            <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
        </div>
    </div>
);