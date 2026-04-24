import React, { Component } from 'react';
import BackgroundImage from '../util components/background-image';
import SideBar from './side_bar';
import apps from '../../apps.config';
import Window from '../base/window';
import UbuntuApp from '../base/ubuntu_app';
import AllApplications from '../screen/all-applications'
import DesktopMenu from '../context menus/desktop-menu';
import DefaultMenu from '../context menus/default';
import $ from 'jquery';
import ReactGA from 'react-ga4';

export class Desktop extends Component {
    constructor() {
        super();
        this.app_stack = [];
        this.initFavourite = {};
        this.allWindowClosed = false;
        this.state = {
            focused_windows: {},
            closed_windows: {},
            allAppsView: false,
            overlapped_windows: {},
            disabled_apps: {},
            favourite_apps: {},
            hideSideBar: false,
            minimized_windows: {},
            desktop_apps: [],
            context_menus: {
                desktop: false,
                default: false,
            },
            showNameBar: false,
        }
    }

    componentDidMount() {
        ReactGA.send({ hitType: "pageview", page: "/desktop", title: "Custom Title" });

        this.fetchAppsData();
        this.setContextListeners();
        this.setEventListeners();
        this.checkForNewFolders();
    }

    componentWillUnmount() {
        this.removeContextListeners();
    }

    // --- Data Management ---

    checkForNewFolders = () => {
        let new_folders = localStorage.getItem('new_folders');
        if (new_folders === null && new_folders !== undefined) {
            localStorage.setItem("new_folders", JSON.stringify([]));
        } else {
            new_folders = JSON.parse(new_folders);
            new_folders.forEach(folder => {
                apps.push({
                    id: `new-folder-${folder.id}`,
                    title: folder.name,
                    icon: './themes/Yaru/system/folder.png',
                    disabled: true,
                    favourite: false,
                    desktop_shortcut: true,
                    screen: () => { },
                });
            });
            this.updateAppsData();
        }
    }

    fetchAppsData = () => {
        let focused_windows = {}, closed_windows = {}, disabled_apps = {}, favourite_apps = {}, overlapped_windows = {}, minimized_windows = {};
        let desktop_apps = [];

        apps.forEach((app) => {
            focused_windows[app.id] = false;
            closed_windows[app.id] = true;
            disabled_apps[app.id] = app.disabled;
            favourite_apps[app.id] = app.favourite;
            overlapped_windows[app.id] = false;
            minimized_windows[app.id] = false;
            if (app.desktop_shortcut) desktop_apps.push(app.id);
        });

        this.setState({
            focused_windows,
            closed_windows,
            disabled_apps,
            favourite_apps,
            overlapped_windows,
            minimized_windows,
            desktop_apps
        });
        this.initFavourite = { ...favourite_apps };
    }

    updateAppsData = () => {
        let focused_windows = {}, closed_windows = {}, favourite_apps = {}, minimized_windows = {}, disabled_apps = {};
        let desktop_apps = [];

        apps.forEach((app) => {
            focused_windows[app.id] = this.state.focused_windows[app.id] || false;
            minimized_windows[app.id] = this.state.minimized_windows[app.id] || false;
            disabled_apps[app.id] = app.disabled;
            closed_windows[app.id] = (this.state.closed_windows[app.id] !== undefined) ? this.state.closed_windows[app.id] : true;
            favourite_apps[app.id] = app.favourite;
            if (app.desktop_shortcut) desktop_apps.push(app.id);
        });

        this.setState({
            focused_windows,
            closed_windows,
            disabled_apps,
            minimized_windows,
            favourite_apps,
            desktop_apps
        });
        this.initFavourite = { ...favourite_apps };
    }

    // --- Listeners & Events ---

    setEventListeners = () => {
        document.getElementById("open-settings").addEventListener("click", () => {
            this.openApp("settings");
        });
    }

    setContextListeners = () => {
        document.addEventListener('contextmenu', this.checkContextMenu);
        document.addEventListener('click', this.hideAllContextMenu);
    }

    removeContextListeners = () => {
        document.removeEventListener("contextmenu", this.checkContextMenu);
        document.removeEventListener("click", this.hideAllContextMenu);
    }

    // --- Context Menus ---

    checkContextMenu = (e) => {
        e.preventDefault();
        this.hideAllContextMenu();
        switch (e.target.dataset.context) {
            case "desktop-area":
                ReactGA.event({ category: `Context Menu`, action: `Opened Desktop Context Menu` });
                this.showContextMenu(e, "desktop");
                break;
            default:
                ReactGA.event({ category: `Context Menu`, action: `Opened Default Context Menu` });
                this.showContextMenu(e, "default");
        }
    }

    showContextMenu = (e, menuName) => {
        let { posx, posy } = this.getMenuPosition(e);
        let contextMenu = document.getElementById(`${menuName}-menu`);

        if (posx + $(contextMenu).width() > window.innerWidth) posx -= $(contextMenu).width();
        if (posy + $(contextMenu).height() > window.innerHeight) posy -= $(contextMenu).height();

        contextMenu.style.left = posx + "px";
        contextMenu.style.top = posy + "px";

        this.setState({ context_menus: { ...this.state.context_menus, [menuName]: true } });
    }

    hideAllContextMenu = () => {
        let menus = { ...this.state.context_menus };
        Object.keys(menus).forEach(key => menus[key] = false);
        this.setState({ context_menus: menus });
    }

    getMenuPosition = (e) => {
        let posx = 0, posy = 0;
        if (!e) e = window.event;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return { posx, posy };
    }

    // --- Window Management ---

    openApp = (objId) => {
        ReactGA.event({ category: `Open App`, action: `Opened ${objId} window` });

        if (this.state.disabled_apps[objId]) return;

        if (this.state.minimized_windows[objId]) {
            this.focus(objId);
            let r = document.querySelector("#" + objId);
            r.style.transform = `translate(${r.style.getPropertyValue("--window-transform-x")},${r.style.getPropertyValue("--window-transform-y")}) scale(1)`;
            
            let minimized_windows = { ...this.state.minimized_windows };
            minimized_windows[objId] = false;
            this.setState({ minimized_windows });
            return;
        }

        if (this.app_stack.includes(objId)) {
            this.focus(objId);
        } else {
            this.updateFrequentApps(objId);
            setTimeout(() => {
                let closed_windows = { ...this.state.closed_windows };
                let favourite_apps = { ...this.state.favourite_apps };
                favourite_apps[objId] = true;
                closed_windows[objId] = false;
                this.setState({ closed_windows, favourite_apps, allAppsView: false }, () => this.focus(objId));
                this.app_stack.push(objId);
            }, 200);
        }
    }

    updateFrequentApps = (objId) => {
        let frequentApps = localStorage.getItem('frequentApps') ? JSON.parse(localStorage.getItem('frequentApps')) : [];
        let currentApp = frequentApps.find(app => app.id === objId);
        if (currentApp) {
            currentApp.frequency += 1;
        } else {
            frequentApps.push({ id: objId, frequency: 1 });
        }
        frequentApps.sort((a, b) => b.frequency - a.frequency);
        localStorage.setItem("frequentApps", JSON.stringify(frequentApps));
    }

    closeApp = (objId) => {
        this.app_stack.splice(this.app_stack.indexOf(objId), 1);
        this.giveFocusToLastApp();
        this.hideSideBar(null, false);

        let closed_windows = { ...this.state.closed_windows };
        let favourite_apps = { ...this.state.favourite_apps };

        if (this.initFavourite[objId] === false) favourite_apps[objId] = false;
        closed_windows[objId] = true;

        this.setState({ closed_windows, favourite_apps });
    }

    focus = (objId) => {
        let focused_windows = { ...this.state.focused_windows };
        Object.keys(focused_windows).forEach(key => focused_windows[key] = (key === objId));
        this.setState({ focused_windows });
    }

    hasMinimised = (objId) => {
        let minimized_windows = { ...this.state.minimized_windows };
        let focused_windows = { ...this.state.focused_windows };

        minimized_windows[objId] = true;
        focused_windows[objId] = false;
        this.setState({ minimized_windows, focused_windows });

        this.hideSideBar(null, false);
        this.giveFocusToLastApp();
    }

    giveFocusToLastApp = () => {
        if (!this.checkAllMinimised()) {
            for (let index in this.app_stack) {
                if (!this.state.minimized_windows[this.app_stack[index]]) {
                    this.focus(this.app_stack[index]);
                    break;
                }
            }
        }
    }

    checkAllMinimised = () => {
        let result = true;
        for (let key in this.state.minimized_windows) {
            if (!this.state.closed_windows[key]) {
                result = result && this.state.minimized_windows[key];
            }
        }
        return result;
    }

    hideSideBar = (objId, hide) => {
        if (hide === this.state.hideSideBar) return;

        if (objId === null) {
            if (hide === false) {
                this.setState({ hideSideBar: false });
            } else {
                for (let key in this.state.overlapped_windows) {
                    if (this.state.overlapped_windows[key]) {
                        this.setState({ hideSideBar: true });
                        return;
                    }
                }
            }
            return;
        }

        if (hide === false) {
            for (let key in this.state.overlapped_windows) {
                if (this.state.overlapped_windows[key] && key !== objId) return;
            }
        }

        let overlapped_windows = { ...this.state.overlapped_windows };
        overlapped_windows[objId] = hide;
        this.setState({ hideSideBar: hide, overlapped_windows });
    }

    // --- Folder Management ---

    addNewFolder = () => this.setState({ showNameBar: true });

    addToDesktop = (folder_name) => {
        folder_name = folder_name.trim();
        let folder_id = folder_name.replace(/\s+/g, '-').toLowerCase();
        apps.push({
            id: `new-folder-${folder_id}`,
            title: folder_name,
            icon: './themes/Yaru/system/folder.png',
            disabled: true,
            favourite: false,
            desktop_shortcut: true,
            screen: () => { },
        });
        
        let new_folders = JSON.parse(localStorage.getItem('new_folders'));
        new_folders.push({ id: `new-folder-${folder_id}`, name: folder_name });
        localStorage.setItem("new_folders", JSON.stringify(new_folders));

        this.setState({ showNameBar: false }, this.updateAppsData);
    }

    showAllApps = () => this.setState({ allAppsView: !this.state.allAppsView });

    // --- Render Methods ---

    renderDesktopApps = () => {
        if (Object.keys(this.state.closed_windows).length === 0) return;
        return apps.map((app, index) => {
            if (this.state.desktop_apps.includes(app.id)) {
                return (
                    <UbuntuApp 
                        key={index} 
                        name={app.title} 
                        id={app.id} 
                        icon={app.icon} 
                        openApp={this.openApp} 
                        isExternalApp={app.isExternalApp} 
                        url={app.url} 
                    />
                );
            }
            return null;
        });
    }

    renderWindows = () => {
        return apps.map((app, index) => {
            if (this.state.closed_windows[app.id] === false) {
                return (
                    <Window 
                        key={index} 
                        title={app.title} 
                        id={app.id} 
                        screen={app.screen} 
                        addFolder={this.addToDesktop} 
                        closed={this.closeApp} 
                        openApp={this.openApp} 
                        focus={this.focus} 
                        isFocused={this.state.focused_windows[app.id]} 
                        hideSideBar={this.hideSideBar} 
                        hasMinimised={this.hasMinimised} 
                        minimized={this.state.minimized_windows[app.id]} 
                        changeBackgroundImage={this.props.changeBackgroundImage} 
                        bg_image_name={this.props.bg_image_name} 
                    />
                );
            }
            return null;
        });
    }

    renderNameBar = () => {
        const addFolder = () => {
            let folder_name = document.getElementById("folder-name-input").value;
            this.addToDesktop(folder_name);
        }
        const removeCard = () => this.setState({ showNameBar: false });

        return (
            <div className="absolute rounded-md top-1/2 left-1/2 text-center text-white font-light text-sm bg-ub-cool-grey transform -translate-y-1/2 -translate-x-1/2 sm:w-96 w-3/4 z-50 shadow-xl border border-black border-opacity-30">
                <div className="w-full flex flex-col justify-around items-start pl-6 pb-8 pt-6">
                    <span className="mb-4">New folder name</span>
                    <input className="outline-none px-2 w-10/12 bg-[#2a2a2a] border-2 border-yellow-700 rounded py-1" id="folder-name-input" type="text" autoComplete="off" spellCheck="false" autoFocus={true} />
                </div>
                <div className="flex border-t border-black border-opacity-20">
                    <div onClick={addFolder} className="w-1/2 px-4 py-3 border-r border-black border-opacity-20 hover:bg-ub-warm-grey hover:bg-opacity-10 cursor-pointer transition-colors">Create</div>
                    <div onClick={removeCard} className="w-1/2 px-4 py-3 hover:bg-ub-warm-grey hover:bg-opacity-10 cursor-pointer transition-colors">Cancel</div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="h-full w-full flex flex-col items-end justify-start content-start flex-wrap-reverse pt-8 bg-transparent relative overflow-hidden overscroll-none window-parent">
                <div className="absolute h-full w-full bg-transparent" data-context="desktop-area">
                    {this.renderWindows()}
                </div>

                <BackgroundImage img={this.props.bg_image_name} />

                <SideBar 
                    apps={apps}
                    hide={this.state.hideSideBar}
                    hideSideBar={this.hideSideBar}
                    favourite_apps={this.state.favourite_apps}
                    showAllApps={this.showAllApps}
                    allAppsView={this.state.allAppsView}
                    closed_windows={this.state.closed_windows}
                    focused_windows={this.state.focused_windows}
                    isMinimized={this.state.minimized_windows}
                    openAppByAppId={this.openApp} 
                />

                {this.renderDesktopApps()}

                <DesktopMenu active={this.state.context_menus.desktop} openApp={this.openApp} addNewFolder={this.addNewFolder} />
                <DefaultMenu active={this.state.context_menus.default} />

                {this.state.showNameBar && this.renderNameBar()}

                {this.state.allAppsView && (
                    <AllApplications 
                        apps={apps}
                        recentApps={this.app_stack}
                        openApp={this.openApp} 
                    />
                )}
            </div>
        );
    }
}

export default Desktop;