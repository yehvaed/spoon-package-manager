declare class HammerspoonLogger {
    new(this: void, loggerName: string): void;
}

interface HammerspoonSpoonsUseOptions {
    fn: (spoon: any) => any;
}

declare class HammerspoonSpoons {
    isInstalled(this: void, spoonName: string): boolean;
    use(this: void, spoonName: string,  options: HammerspoonSpoonsUseOptions): void;
}


declare class Hammerspoon {
    logger: HammerspoonLogger;
    spoons: HammerspoonSpoons;
    execute: (this: void, cmd: string) => void;
}

declare var hs: Hammerspoon; 