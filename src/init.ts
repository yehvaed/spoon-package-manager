export const name = "SpoonsPackageManager";
export const version = "1.0";
export const author = "yehvaed <jaroslaw.walach@gmail.com>";
export const homepage = "https://github.com/yehvaed/SpoonsPackageManager.spoon";
export const license = "MIT - https://opensource.org/licenses/MIT";
export const logger = hs.logger.new("SpoonsPackageManager");

interface Options {
  fn: (spoon: any) => any;
  from?: string;
}
type PluginFetcher = (id: string, options: Options) => void;

const sources: Record<string, PluginFetcher> = {
  "@Hammerspoon": (id: string, options: Options) => {
    const url = `https://raw.githubusercontent.com/Hammerspoon/Spoons/master/${id}.spoon.zip`;
    const spoonName = id.split("/")[1];

    hs.execute(`curl -O -L ${url}`);
    hs.execute(`unzip -o ${spoonName}.spoon.zip -d Spoons/`);
    hs.execute(`rm ${spoonName}.spoon.zip`);
  },
};

export const plug = (id: string) => (options: Options) => {
  const [_, spoonName] = id.split("/");
  const source = options.from ?? "github";

  if (!hs.spoons.isInstalled(spoonName)) {
    sources[source]?.(id, options);
  }

  hs.spoons.use(spoonName, options);
};
