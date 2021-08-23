import {WorkflowUpdater} from "../lib/workflow-updater";
import {ScriptFilterItem} from "../lib/interface";

test('should version check', async () => {
    const updater = new WorkflowUpdater("https://raw.githubusercontent.com/alanhg/alfred-workflows/master/compress-gif/info.plist",
        "https://github.com/alanhg/alfred-workflows/blob/master/compress-gif/Compress%20GIF.alfredworkflow?raw=true", "1.0");
    await updater.checkVersion();
    expect(updater.latestVersion).not.toEqual('1.0');
    expect(updater.shouldUpdate).toBeTruthy();

    if (updater.shouldUpdate) {
        let scriptFilterItem: ScriptFilterItem = {title: "A new version is available", subtitle: "Press ⏎ to upgrade"};
        console.log(scriptFilterItem);
    }

    expect(JSON.stringify(updater.createUpdateScriptFilterItem()))
        .toEqual('{"title":"🎉 A new version is available!","subtitle":"press ⏎ to install update","arg":"update_workflow","icon":{"path":"icon_update.png"}}');
});

// test('should download', async () => {
//     const updater = new WorkflowUpdater("https://raw.githubusercontent.com/alanhg/alfred-workflows/master/compress-gif/info.plist", "https://raw.githubusercontent.com/alanhg/alfred-workflows/master/compress-gif/Compress%20GIF.alfredworkflow", "1.0");
//     await updater.checkVersion();
//     if (updater.shouldUpdate) {
//         await updater.download();
//     }
// });
