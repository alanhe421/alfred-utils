declare global {
    namespace NodeJS {
        interface ProcessEnv {
            remote_info_list_url: string;
            remote_workflow_url: string;
            /**
             * 更新检测开关
             */
            check_update: string;
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            /**
             * 以下Alfred内置环境变量
             */
            alfred_workflow_version: string;
            alfred_theme_background: string;
            SHELL: string;
            TMPDIR: string;
            alfred_preferences_localhash: string;
            alfred_version_build: string;
            USER: string;
            http_proxy: string;
            COMMAND_MODE: string;
            HTTP_API: string;
            alfred_version: string;
            SSH_AUTH_SOCK: string;
            __CF_USER_TEXT_ENCODING: string;
            alfred_preferences: string;
            alfred_theme_selection_background: string;
            alfred_theme_subtext: string;
            PATH: string;
            /**
             * ~/Library/Caches/com.runningwithcrayons.Alfred/Workflow Data/[bundle id]
             */
            alfred_workflow_cache: string;
            LaunchInstanceID: string;
            alfred_debug: string;
            /**
             * 当前workflow安装路径，结尾不带/
             */
            PWD: string;
            XPC_FLAGS: string;
            /**
             * 比如 pic.alanhe.me
             */
            alfred_workflow_bundleid: string;
            https_proxy: string;
            XPC_SERVICE_NAME: string;
            SHLVL: string;
            HOME: string;
            no_proxy: string;
            LOGNAME: string;
            LC_CTYPE: string;
            /**
             * 比如 user.workflow.FE0253CA-60AA-46B0-95AA-E0C280C774F0
             */
            alfred_workflow_uid: string;
            alfred_workflow_name: string;
            SECURITYSESSIONID: string;
            alfred_theme: string;
            alfred_workflow_data: string;
        }
    }
}

export {}
