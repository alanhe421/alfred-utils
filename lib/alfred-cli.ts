import {WorkflowUpdater} from "./workflow-updater";

const updater = new WorkflowUpdater(process.argv[2], process.argv[3], process.argv[4]);
updater.download();
