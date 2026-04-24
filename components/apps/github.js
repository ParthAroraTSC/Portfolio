import React, { useState, useEffect } from 'react';

export default function Github() {
    const [stats, setStats] = useState(null);
    const [repos, setRepos] = useState([]);
    const [readme, setReadme] = useState("");

    useEffect(() => {
        // Fetch User Stats
        fetch('https://api.github.com/users/NOTREGRETO')
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error(err));

        // Fetch Top Repos
        fetch('https://api.github.com/users/NOTREGRETO/repos?sort=updated&per_page=6')
            .then(res => res.json())
            .then(data => setRepos(data))
            .catch(err => console.error(err));

        // Fetch Profile README
        fetch('https://raw.githubusercontent.com/NOTREGRETO/NOTREGRETO/main/README.md')
            .then(res => res.text())
            .then(data => {
                let sanitizedData = data.replace(/vivek9patel/g, "NOTREGRETO");
                if (data.includes("404")) {
                     return fetch('https://raw.githubusercontent.com/NOTREGRETO/NOTREGRETO/master/README.md')
                        .then(res => res.text())
                        .then(d => setReadme(d.replace(/vivek9patel/g, "NOTREGRETO")));
                }
                setReadme(sanitizedData);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-start bg-[#0d1117] text-[#c9d1d9] p-4 overflow-y-auto" style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif' }}>
            <div className="w-full max-w-5xl animateShow mt-4 px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Sidebar */}
                    <div className="md:w-1/4 flex flex-col items-center md:items-start text-center md:text-left">
                        <img 
                            src={stats ? stats.avatar_url : "https://github.com/NOTREGRETO.png"} 
                            alt="NOTREGRETO" 
                            className="w-48 h-48 md:w-full rounded-full border border-[#30363d] mb-4 shadow-sm"
                        />
                        <h2 className="text-2xl font-semibold text-[#e6edf3]">{stats ? stats.name : "Parth Arora"}</h2>
                        <p className="text-xl font-light text-[#8b949e]">NOTREGRETO</p>
                        <button className="w-full mt-4 py-1.5 bg-[#21262d] border border-[#30363d] rounded-md text-sm font-medium text-[#c9d1d9] hover:bg-[#30363d] transition">
                            Follow
                        </button>
                        <p className="mt-4 text-[#e6edf3] text-sm leading-snug">
                            {stats ? stats.bio : "SOC Analyst | Cyber Security Enthusiast | VAPT Expertise"}
                        </p>
                        <div className="flex items-center mt-4 text-xs text-[#8b949e]">
                            <span className="font-semibold text-[#e6edf3] mr-1">{stats ? stats.followers : "--"}</span> followers 
                            <span className="mx-1">·</span> 
                            <span className="font-semibold text-[#e6edf3] mr-1">{stats ? stats.following : "--"}</span> following
                        </div>
                        
                        <div className="mt-6 w-full text-sm text-[#e6edf3] space-y-2">
                            {stats && stats.company && (
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-[#8b949e]" fill="currentColor" viewBox="0 0 16 16"><path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2Zm0 1.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25H1.75Z"></path><path d="M5.25 3.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm0 4a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm0 4a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm5.5-8a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm0 4a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm0 4a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Z"></path></svg>
                                    {stats.company}
                                </div>
                            )}
                            {stats && stats.location && (
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-[#8b949e]" fill="currentColor" viewBox="0 0 16 16"><path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.192 6.5 6.5 0 0 1 0 9.192Zm-1.06-8.132a5 5 0 1 0-7.071 7.071L8 14.07l3.535-3.535a5 5 0 0 0 0-7.071Z"></path><path d="M8 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm0-1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"></path></svg>
                                    {stats.location}
                                </div>
                            )}
                            {stats && stats.blog && (
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-[#8b949e]" fill="currentColor" viewBox="0 0 16 16"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg>
                                    <a href={stats.blog} target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:underline truncate">{stats.blog}</a>
                                </div>
                            )}
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2 text-[#8b949e]" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H3.337v7.225h1.606zm-1.56-8.212c.537 0 .867-.359.867-.806C4.232 3.918 3.91 3.58 3.376 3.58c-.533 0-.88.338-.88.794 0 .447.337.806.85.806h.02zM13.148 13.394V9.3c0-2.193-1.173-3.214-2.733-3.214-1.258 0-1.823.693-2.138 1.182h.014V6.169H6.685c.02.453 0 7.225 0 7.225h1.606V9.36c0-.216.016-.432.08-.586.173-.432.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h1.606z"/></svg>
                                <a href="https://www.linkedin.com/in/parth-arora-1343b5368/" target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:underline truncate">LinkedIn Profile</a>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="md:w-3/4">
                        <div className="flex border-b border-[#30363d] mb-6 text-sm">
                            <span className="border-b-2 border-[#f78166] pb-3 px-4 font-semibold text-[#e6edf3] flex items-center cursor-default">
                                <svg className="w-4 h-4 mr-2 text-[#8b949e]" viewBox="0 0 16 16" version="1.1" fill="currentColor"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25Z"></path><path d="M6 3.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 6 3.75Zm-2.25 4a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75Zm0 4a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75Z"></path></svg>
                                Overview
                            </span>
                        </div>

                        {/* README Section */}
                        <div className="border border-[#30363d] rounded-md p-6 mb-8 bg-[#0d1117]">
                            <div className="flex items-center text-xs text-[#8b949e] mb-4">
                                <span>NOTREGRETO / README.md</span>
                            </div>
                            <div className="prose prose-invert max-w-none text-sm">
                                {readme && !readme.includes("404") ? (
                                    <pre className="whitespace-pre-wrap font-sans text-[#e6edf3]">
                                        {readme}
                                    </pre>
                                ) : (
                                    <div className="italic text-[#8b949e]">Loading profile README...</div>
                                )}
                            </div>
                        </div>

                        <h3 className="text-base font-normal mb-4 text-[#e6edf3]">Top Repositories</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {repos.length > 0 ? (
                                repos.map((repo, i) => (
                                    <div key={i} className="p-4 border border-[#30363d] rounded-md bg-[#0d1117] hover:bg-[#161b22] transition">
                                        <div className="flex justify-between items-start">
                                            <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-[#58a6ff] font-semibold hover:underline">
                                                {repo.name}
                                            </a>
                                            <span className="text-[10px] px-1.5 py-0.5 rounded-full border border-[#30363d] text-[#8b949e]">
                                                {repo.visibility}
                                            </span>
                                        </div>
                                        <p className="text-xs text-[#8b949e] mt-2 h-8 line-clamp-2">
                                            {repo.description}
                                        </p>
                                        <div className="flex items-center mt-4 text-[11px] text-[#8b949e]">
                                            <span className="flex items-center mr-4">
                                                <div className="w-3 h-3 rounded-full bg-[#f1e05a] mr-1"></div>
                                                {repo.language || "Other"}
                                            </span>
                                            <span className="flex items-center mr-4">
                                                ★ {repo.stargazers_count}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : null}
                        </div>

                        <h3 className="text-base font-normal mb-4 text-[#e6edf3]">Contribution History</h3>
                        <div className="p-4 border border-[#30363d] rounded-md bg-[#0d1117] flex flex-col">
                            <img 
                                src="https://ghchart.rshah.org/40c463/NOTREGRETO" 
                                alt="GitHub Contribution Chart" 
                                className="w-full opacity-90 my-2"
                            />
                            <div className="flex justify-between items-center mt-2 text-[10px] text-[#8b949e]">
                                <a href="https://github.com/NOTREGRETO" target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:underline">View full activity</a>
                                <div className="flex items-center gap-1">
                                    <span>Less</span>
                                    <div className="w-2.5 h-2.5 bg-[#161b22] border border-[#30363d]"></div>
                                    <div className="w-2.5 h-2.5 bg-[#0e4429]"></div>
                                    <div className="w-2.5 h-2.5 bg-[#006d32]"></div>
                                    <div className="w-2.5 h-2.5 bg-[#26a641]"></div>
                                    <div className="w-2.5 h-2.5 bg-[#39d353]"></div>
                                    <span>More</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <p className="mt-10 mb-10 text-[10px] text-[#484f58] uppercase tracking-widest font-mono">
                System Interface : GitHub API v3
            </p>
        </div>
    );
}

export const displayGithub = () => {
    return <Github />;
}
