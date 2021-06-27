/**
 * @see https://www.alfredapp.com/help/workflows/inputs/script-filter/json/
 */
export interface ScriptFilterItem {
    uid?: string;
    type?: string;
    title: string;
    subtitle: string;
    arg?: string;
    autocomplete?: string;
    "icon"?: {
        type?: 'fileicon';
        path: string;
    };
    quicklookurl?: string;
    text?: {
        copy?: string;
        largetype?: string;
    };
}
export interface ScriptFilter {
    items: ScriptFilterItem[];
    variables?: {
        [index: string]: string;
    };
    rerun?: number;
}
