declare type Howl = import('howler').Howl;
declare type HowlOptions = import('howler').HowlOptions;

interface Window {
    Howl: new (options: HowlOptions) => import('howler').Howl;
    Howler: import('howler').Howler & { _autoSuspend: () => void };
}
