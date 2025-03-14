import { Plugin } from "../../../shared/Base/Plugin";
import { Panzoom } from "../../../Panzoom/Panzoom";
import { OptionsType as PanzoomOptionsType } from "../../../Panzoom/options";
import { Carousel } from "../../../Carousel/Carousel";
import { slideType } from "../../../Carousel/types";
import { Fancybox } from "../../Fancybox";
export type OptionsType = {
    /**
     * Initial image zoom level, see Panzoom documentation for more information.
     */
    initialSize: "fit" | "cover" | "full" | "max" | ((instance: Images) => "fit" | "cover" | "full" | "max");
    /**
     * Custom options for Panzoom instance, see Panzoom documentation for more information.
     */
    Panzoom: Partial<PanzoomOptionsType>;
    /**
     * If the image download needs to be prevented
     */
    protected: boolean;
    /**
     * If animate an image with zoom in/out animation when launching/closing Fancybox
     */
    zoom: boolean;
    /**
     * If zoom animation should animate the opacity when launching/closing Fancybox
     */
    zoomOpacity: "auto" | boolean;
};
export declare const defaultOptions: OptionsType;
declare module "../../../Carousel/types" {
    interface slideType {
        panzoom?: Panzoom;
        imageEl?: HTMLImageElement | null;
        srcset?: string;
        sizes?: string;
    }
}
declare module "../../../Fancybox/options" {
    interface PluginsOptionsType {
        Images: Boolean | Partial<ImagesOptionsType>;
    }
}
export type ImagesOptionsType = Partial<OptionsType>;
export declare class Images extends Plugin<Fancybox, ImagesOptionsType, ""> {
    static defaults: OptionsType;
    onCreateSlide(_fancybox: Fancybox, _carousel: Carousel, slide: slideType): void;
    onRemoveSlide(_fancybox: Fancybox, _carousel: Carousel, slide: slideType): void;
    onChange(_fancybox: Fancybox, carousel: Carousel, page: number, _prevPage: number): void;
    onClose(): void;
    setContent(slide: slideType, imageSrc: string): Promise<Panzoom>;
    zoomIn(slide: slideType): Promise<Panzoom>;
    getZoomInfo(slide: slideType): false | {
        x: number;
        y: number;
        scale: number;
        opacity: boolean;
    };
    attach(): void;
    detach(): void;
}
