declare global {
    namespace NodeJS {
        interface ProcessEnv {
            remote_info_list_url: string;
            remote_workflow_url: string;
            /**
             * 更新检测开关
             */
            check_update: string;
            /**
             * Alfred内置环境变量
             */
            alfred_workflow_version: string;

            NODE_ENV: 'development' | 'production';
            PORT?: string;
            PWD: string;
        }
    }
}

export {}
