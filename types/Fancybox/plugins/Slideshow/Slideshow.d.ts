import { Plugin } from "../../../shared/Base/Plugin";
import type { AutoplayOptionsType } from "../../../Carousel/plugins/Autoplay/Autoplay";
import { Fancybox } from "../../Fancybox";
export type OptionsType = {
    /**
     * Custom options for Carousel Autoplay plugin instance, see relevant documentation for more information
     */
    Autoplay?: Partial<AutoplayOptionsType>;
    /**
     * Keyboard shortcut to toggle Slideshow
     */
    key: string;
    /**
     * If the slideshow should automatically activate after Fancybox is launched
     */
    playOnStart: boolean;
    /**
     * Delay (in milliseconds) before the slide change
     */
    timeout: number;
};
export declare const defaultOptions: OptionsType;
export type SlideshowOptionsType = Partial<OptionsType>;
declare module "../../../Fancybox/options" {
    interface PluginsOptionsType {
        Slideshow: Boolean | Partial<SlideshowOptionsType>;
    }
}
export declare class Slideshow extends Plugin<Fancybox, SlideshowOptionsType, ""> {
    static defaults: OptionsType;
    private ref;
    private onPrepare;
    private onReady;
    private onDone;
    private onKeydown;
    attach(): void;
    detach(): void;
}
