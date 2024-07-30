import { Setting } from "../types";

export const config = {
  read: async (basePath: string): Promise<Setting> => {
    const path = `${basePath}/comitter.config.ts`
    const isSettingFileExisting = await Bun.file(path).exists()

    if(!isSettingFileExisting) throw new Error("No comitter config found !")

    const { config: conf } = await import(path)

    return conf as Setting
  }
}