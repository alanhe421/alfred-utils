import {WorkflowUpdater} from "./workflow-updater";

export async function checkUpdate() {
    if (process.env.check_update === 'true') {
        const updater = new WorkflowUpdater(process.env.remote_info_list_url,
            process.env.remote_workflow_url, process.env.alfred_workflow_version);
        await updater.checkVersion();
        if (updater.shouldUpdate) {
            return updater.createUpdateScriptFilterItem();
        }
    }
}


