import axios from "axios";
import plist from "plist";
import * as fs from "fs";
import * as child_process from "child_process";
import {ScriptFilterItem} from "./interface";

export class WorkflowUpdater {
    // 远程infoList地址
    private readonly remoteInfoListURL: string;

    // 远程workflow下载地址
    private readonly remoteWorkflowURL: string;

    // 本地workflow版本
    private readonly localVersion: string;

    latestVersion: string;
    shouldUpdate = false;

    // 下载完成后，自动打开
    private readonly autoOpen: boolean;

    constructor(remoteInfoListURL: string, remoteWorkflowURL: string, localVersion: string, autoOpen: boolean = true) {
        this.remoteInfoListURL = remoteInfoListURL;
        this.remoteWorkflowURL = remoteWorkflowURL;
        this.localVersion = localVersion;
        this.latestVersion = localVersion;
        this.autoOpen = autoOpen;
    }

    /**
     * 检查远程与本地版本差异
     */
    async checkVersion(): Promise<void> {
        const res = await axios.get(this.remoteInfoListURL);
        const plistObj = plist.parse(res.data) as { version: string; };
        this.latestVersion = plistObj.version;
        this.shouldUpdate = this.latestVersion !== this.localVersion;
    }

    /**
     * 下载并安装workflow
     * @param targetDir
     */
    async download(targetDir = process.env.HOME + '/Downloads/'): Promise<boolean> {
        const res = await axios.get(this.remoteWorkflowURL, {responseType: "arraybuffer"});
        const filename = (this.remoteWorkflowURL.match(/[^/]+\.alfredworkflow/) ?. [0]) || `${new Date().getTime()}.alfredworkflow`;
        fs.writeFileSync(targetDir + filename, res.data);
        if (this.autoOpen) {
            child_process.execSync(`open ${targetDir + filename}`)
        }
        return true;
    }

    /**
     * 创建升级项-结果行
     */
    createUpdateScriptFilterItem(): ScriptFilterItem | undefined {
        if (this.shouldUpdate) {
            return {
                subtitle: "press ⏎ to install update",
                title: "A new version is available!",
                arg: 'update_workflow'
            }
        }
    }
}
