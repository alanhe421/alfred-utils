import {WorkflowUpdater} from "./workflow-updater";

const updater = new WorkflowUpdater(process.env.remote_info_list_url,
    process.env.remote_workflow_url, process.env.alfred_workflow_version);
updater.download();
