/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewEncapsulation, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import Cropper from 'cropperjs';
/**
 * @record
 */
export function ImageCropperSetting() { }
/** @type {?} */
ImageCropperSetting.prototype.width;
/** @type {?} */
ImageCropperSetting.prototype.height;
/**
 * @record
 */
export function ImageCropperResult() { }
/** @type {?} */
ImageCropperResult.prototype.imageData;
/** @type {?} */
ImageCropperResult.prototype.cropData;
/** @type {?|undefined} */
ImageCropperResult.prototype.blob;
/** @type {?|undefined} */
ImageCropperResult.prototype.dataUrl;
export class CropperComponent {
    constructor() {
        this.cropperOptions = {};
        this.export = new EventEmitter();
        this.ready = new EventEmitter();
        this.isLoading = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * Image loaded
     * @param {?} ev
     * @return {?}
     */
    imageLoaded(ev) {
        //
        // Unset load error state
        this.loadError = false;
        /** @type {?} */
        const image = /** @type {?} */ (ev.target);
        this.imageElement = image;
        /** @type {?} */
        const canvas = /** @type {?} */ (document.getElementById('canvas'));
        /** @type {?} */
        const width = image.offsetWidth;
        /** @type {?} */
        const height = image.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, width, height);
        //
        // Add crossOrigin?
        if (this.cropperOptions.checkCrossOrigin)
            image.crossOrigin = 'anonymous';
        //
        // Image on ready event
        image.addEventListener('ready', () => {
            //
            // Emit ready
            this.ready.emit(true);
            //
            // Unset loading state
            this.isLoading = false;
            //
            // Validate cropbox existance
            if (this.cropbox) {
                //
                // Set cropbox data
                this.cropper.setCropBoxData(this.cropbox);
            }
        });
        /** @type {?} */
        let aspectRatio = NaN;
        if (this.settings) {
            const { width, height } = this.settings;
            aspectRatio = width / height;
        }
        //
        // Set crop options
        // extend default with custom config
        this.cropperOptions = Object.assign({
            aspectRatio,
            movable: false,
            scalable: false,
            zoomable: false,
            viewMode: 1,
            checkCrossOrigin: true
        }, this.cropperOptions);
        //
        // Set cropperjs
        this.cropper = new Cropper(canvas, this.cropperOptions);
    }
    /**
     * Image load error
     * @param {?} event
     * @return {?}
     */
    imageLoadError(event) {
        //
        // Set load error state
        this.loadError = true;
        //
        // Unset loading state
        this.isLoading = false;
    }
    /**
     * Export canvas
     * @param {?=} base64
     * @return {?}
     */
    exportCanvas(base64) {
        /** @type {?} */
        const imageData = this.cropper.getImageData();
        /** @type {?} */
        const cropData = this.cropper.getCropBoxData();
        /** @type {?} */
        const canvas = this.cropper.getCroppedCanvas();
        /** @type {?} */
        const data = { imageData, cropData };
        /** @type {?} */
        const promise = new Promise(resolve => {
            //
            // Validate base64
            if (base64) {
                //
                // Resolve promise with dataUrl
                return resolve({
                    dataUrl: canvas.toDataURL('image/png')
                });
            }
            canvas.toBlob(blob => resolve({ blob }));
        });
        //
        // Emit export data when promise is ready
        promise.then(res => {
            this.export.emit(Object.assign(data, res));
        });
    }
}
CropperComponent.decorators = [
    { type: Component, args: [{
                selector: 'angular-cropper',
                template: `<!-- CROPPER WRAPPER -->
<div class="cropper-wrapper">

    <!-- LOADING -->
    <div class="loading-block" *ngIf="isLoading">
        <div class="spinner"></div>
    </div>

    <!-- LOAD ERROR -->
    <div class="alert alert-warning" *ngIf="loadError">{{ loadImageErrorText }}</div>

    <!-- CROPPER -->
    <div class="cropper">
        <img #image alt="image" style="display:none;" [src]="imageUrl" (load)="imageLoaded($event)" (error)="imageLoadError($event)" />
        <canvas id="canvas"></canvas>
    </div>
</div>
`,
                styles: [`:host{display:block}.cropper img{max-width:100%;max-height:100%;height:auto}.cropper-wrapper{position:relative;min-height:80px}.cropper-wrapper .loading-block{position:absolute;top:0;left:0;width:100%;height:100%}.cropper-wrapper .loading-block .spinner{width:31px;height:31px;margin:0 auto;border:2px solid rgba(97,100,193,.98);border-radius:50%;border-left-color:transparent;border-right-color:transparent;-webkit-animation:425ms linear infinite cssload-spin;position:absolute;top:calc(50% - 15px);left:calc(50% - 15px);animation:425ms linear infinite cssload-spin}@-webkit-keyframes cssload-spin{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes cssload-spin{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}/*!
 * Cropper.js v1.4.1
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2018-07-15T09:54:43.167Z
 */.cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-canvas,.cropper-crop-box,.cropper-drag-box,.cropper-modal,.cropper-wrap-box{bottom:0;left:0;position:absolute;right:0;top:0}.cropper-canvas,.cropper-wrap-box{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline:#39f solid 1px;overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:calc(100% / 3);left:0;top:calc(100% / 3);width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:calc(100% / 3);top:0;width:calc(100% / 3)}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center:after,.cropper-center:before{background-color:#eee;content:' ';display:block;position:absolute}.cropper-center:before{height:1px;left:-3px;top:0;width:7px}.cropper-center:after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:ew-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:ns-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:ew-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:ns-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:ew-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:ns-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:ew-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:nesw-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nwse-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:nesw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:nwse-resize;height:20px;opacity:1;right:-3px;width:20px}@media (min-width:768px){.cropper-point.point-se{height:15px;width:15px}}@media (min-width:992px){.cropper-point.point-se{height:10px;width:10px}}@media (min-width:1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}.cropper-point.point-se:before{background-color:#39f;bottom:-50%;content:' ';display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)}.cropper-hide{display:block;height:0;position:absolute;width:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}`],
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
CropperComponent.ctorParameters = () => [];
CropperComponent.propDecorators = {
    image: [{ type: ViewChild, args: ['image',] }],
    imageUrl: [{ type: Input }],
    settings: [{ type: Input }],
    cropbox: [{ type: Input }],
    loadImageErrorText: [{ type: Input }],
    cropperOptions: [{ type: Input }],
    export: [{ type: Output }],
    ready: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CropperComponent.prototype.image;
    /** @type {?} */
    CropperComponent.prototype.imageUrl;
    /** @type {?} */
    CropperComponent.prototype.settings;
    /** @type {?} */
    CropperComponent.prototype.cropbox;
    /** @type {?} */
    CropperComponent.prototype.loadImageErrorText;
    /** @type {?} */
    CropperComponent.prototype.cropperOptions;
    /** @type {?} */
    CropperComponent.prototype.export;
    /** @type {?} */
    CropperComponent.prototype.ready;
    /** @type {?} */
    CropperComponent.prototype.isLoading;
    /** @type {?} */
    CropperComponent.prototype.cropper;
    /** @type {?} */
    CropperComponent.prototype.imageElement;
    /** @type {?} */
    CropperComponent.prototype.loadError;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNyb3BwZXJqcy8iLCJzb3VyY2VzIjpbImxpYi9jcm9wcGVyL2Nyb3BwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekgsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2Q2hDLE1BQU07SUFrQkY7OEJBVitCLEVBQUU7c0JBRWQsSUFBSSxZQUFZLEVBQXNCO3FCQUN2QyxJQUFJLFlBQVksRUFBRTt5QkFFUixJQUFJO0tBS2Y7Ozs7SUFFakIsUUFBUTtLQUNQOzs7Ozs7SUFNRCxXQUFXLENBQUMsRUFBUzs7O1FBSWpCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDOztRQUl2QixNQUFNLEtBQUsscUJBQUcsRUFBRSxDQUFDLE1BQTBCLEVBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7O1FBSTFCLE1BQU0sTUFBTSxxQkFBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBc0IsRUFBQzs7UUFFdEUsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7UUFDaEMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztRQUVsQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN2QixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FDN0IsS0FBSyxFQUNMLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsYUFBYSxFQUM3QyxD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Qzc3RyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN4Qzs7Ozs7b0JBR0ksU0FBUyxTQUFDLE9BQU87dUJBRWpCLEtBQUs7dUJBQ0wsS0FBSztzQkFDTCxLQUFLO2lDQUNMLEtBQUs7NkJBQ0wsS0FBSztxQkFFTCxNQUFNO29CQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24sIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgQ3JvcHBlciBmcm9tICdjcm9wcGVyanMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEltYWdlQ3JvcHBlclNldHRpbmcge1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW1hZ2VDcm9wcGVyUmVzdWx0IHtcbiAgICBpbWFnZURhdGE6IENyb3BwZXIuSW1hZ2VEYXRhO1xuICAgIGNyb3BEYXRhOiBDcm9wcGVyLkNyb3BCb3hEYXRhO1xuICAgIGJsb2I/OiBCbG9iO1xuICAgIGRhdGFVcmw/OiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYW5ndWxhci1jcm9wcGVyJyxcbiAgICB0ZW1wbGF0ZTogYDwhLS0gQ1JPUFBFUiBXUkFQUEVSIC0tPlxuPGRpdiBjbGFzcz1cImNyb3BwZXItd3JhcHBlclwiPlxuXG4gICAgPCEtLSBMT0FESU5HIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nLWJsb2NrXCIgKm5nSWY9XCJpc0xvYWRpbmdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXJcIj48L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gTE9BRCBFUlJPUiAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtd2FybmluZ1wiICpuZ0lmPVwibG9hZEVycm9yXCI+e3sgbG9hZEltYWdlRXJyb3JUZXh0IH19PC9kaXY+XG5cbiAgICA8IS0tIENST1BQRVIgLS0+XG4gICAgPGRpdiBjbGFzcz1cImNyb3BwZXJcIj5cbiAgICAgICAgPGltZyAjaW1hZ2UgYWx0PVwiaW1hZ2VcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTtcIiBbc3JjXT1cImltYWdlVXJsXCIgKGxvYWQpPVwiaW1hZ2VMb2FkZWQoJGV2ZW50KVwiIChlcnJvcik9XCJpbWFnZUxvYWRFcnJvcigkZXZlbnQpXCIgLz5cbiAgICAgICAgPGNhbnZhcyBpZD1cImNhbnZhc1wiPjwvY2FudmFzPlxuICAgIDwvZGl2PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2A6aG9zdHtkaXNwbGF5OmJsb2NrfS5jcm9wcGVyIGltZ3ttYXgtd2lkdGg6MTAwJTttYXgtaGVpZ2h0OjEwMCU7aGVpZ2h0OmF1dG99LmNyb3BwZXItd3JhcHBlcntwb3NpdGlvbjpyZWxhdGl2ZTttaW4taGVpZ2h0OjgwcHh9LmNyb3BwZXItd3JhcHBlciAubG9hZGluZy1ibG9ja3twb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX0uY3JvcHBlci13cmFwcGVyIC5sb2FkaW5nLWJsb2NrIC5zcGlubmVye3dpZHRoOjMxcHg7aGVpZ2h0OjMxcHg7bWFyZ2luOjAgYXV0bztib3JkZXI6MnB4IHNvbGlkIHJnYmEoOTcsMTAwLDE5MywuOTgpO2JvcmRlci1yYWRpdXM6NTAlO2JvcmRlci1sZWZ0LWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlci1yaWdodC1jb2xvcjp0cmFuc3BhcmVudDstd2Via2l0LWFuaW1hdGlvbjo0MjVtcyBsaW5lYXIgaW5maW5pdGUgY3NzbG9hZC1zcGluO3Bvc2l0aW9uOmFic29sdXRlO3RvcDpjYWxjKDUwJSAtIDE1cHgpO2xlZnQ6Y2FsYyg1MCUgLSAxNXB4KTthbmltYXRpb246NDI1bXMgbGluZWFyIGluZmluaXRlIGNzc2xvYWQtc3Bpbn1ALXdlYmtpdC1rZXlmcmFtZXMgY3NzbG9hZC1zcGlue3Rvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19QGtleWZyYW1lcyBjc3Nsb2FkLXNwaW57dG97LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpfX0vKiFcbiAqIENyb3BwZXIuanMgdjEuNC4xXG4gKiBodHRwczovL2Zlbmd5dWFuY2hlbi5naXRodWIuaW8vY3JvcHBlcmpzXG4gKlxuICogQ29weXJpZ2h0IDIwMTUtcHJlc2VudCBDaGVuIEZlbmd5dWFuXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqXG4gKiBEYXRlOiAyMDE4LTA3LTE1VDA5OjU0OjQzLjE2N1pcbiAqLy5jcm9wcGVyLWNvbnRhaW5lcntkaXJlY3Rpb246bHRyO2ZvbnQtc2l6ZTowO2xpbmUtaGVpZ2h0OjA7cG9zaXRpb246cmVsYXRpdmU7dG91Y2gtYWN0aW9uOm5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5jcm9wcGVyLWNvbnRhaW5lciBpbWd7ZGlzcGxheTpibG9jaztoZWlnaHQ6MTAwJTtpbWFnZS1vcmllbnRhdGlvbjowZGVnO21heC1oZWlnaHQ6bm9uZSFpbXBvcnRhbnQ7bWF4LXdpZHRoOm5vbmUhaW1wb3J0YW50O21pbi1oZWlnaHQ6MCFpbXBvcnRhbnQ7bWluLXdpZHRoOjAhaW1wb3J0YW50O3dpZHRoOjEwMCV9LmNyb3BwZXItY2FudmFzLC5jcm9wcGVyLWNyb3AtYm94LC5jcm9wcGVyLWRyYWctYm94LC5jcm9wcGVyLW1vZGFsLC5jcm9wcGVyLXdyYXAtYm94e2JvdHRvbTowO2xlZnQ6MDtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3RvcDowfS5jcm9wcGVyLWNhbnZhcywuY3JvcHBlci13cmFwLWJveHtvdmVyZmxvdzpoaWRkZW59LmNyb3BwZXItZHJhZy1ib3h7YmFja2dyb3VuZC1jb2xvcjojZmZmO29wYWNpdHk6MH0uY3JvcHBlci1tb2RhbHtiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7b3BhY2l0eTouNX0uY3JvcHBlci12aWV3LWJveHtkaXNwbGF5OmJsb2NrO2hlaWdodDoxMDAlO291dGxpbmU6IzM5ZiBzb2xpZCAxcHg7b3ZlcmZsb3c6aGlkZGVuO3dpZHRoOjEwMCV9LmNyb3BwZXItZGFzaGVke2JvcmRlcjowIGRhc2hlZCAjZWVlO2Rpc3BsYXk6YmxvY2s7b3BhY2l0eTouNTtwb3NpdGlvbjphYnNvbHV0ZX0uY3JvcHBlci1kYXNoZWQuZGFzaGVkLWh7Ym9yZGVyLWJvdHRvbS13aWR0aDoxcHg7Ym9yZGVyLXRvcC13aWR0aDoxcHg7aGVpZ2h0OmNhbGMoMTAwJSAvIDMpO2xlZnQ6MDt0b3A6Y2FsYygxMDAlIC8gMyk7d2lkdGg6MTAwJX0uY3JvcHBlci1kYXNoZWQuZGFzaGVkLXZ7Ym9yZGVyLWxlZnQtd2lkdGg6MXB4O2JvcmRlci1yaWdodC13aWR0aDoxcHg7aGVpZ2h0OjEwMCU7bGVmdDpjYWxjKDEwMCUgLyAzKTt0b3A6MDt3aWR0aDpjYWxjKDEwMCUgLyAzKX0uY3JvcHBlci1jZW50ZXJ7ZGlzcGxheTpibG9jaztoZWlnaHQ6MDtsZWZ0OjUwJTtvcGFjaXR5Oi43NTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO3dpZHRoOjB9LmNyb3BwZXItY2VudGVyOmFmdGVyLC5jcm9wcGVyLWNlbnRlcjpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjojZWVlO2NvbnRlbnQ6JyAnO2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGV9LmNyb3BwZXItY2VudGVyOmJlZm9yZXtoZWlnaHQ6MXB4O2xlZnQ6LTNweDt0b3A6MDt3aWR0aDo3cHh9LmNyb3BwZXItY2VudGVyOmFmdGVye2hlaWdodDo3cHg7bGVmdDowO3RvcDotM3B4O3dpZHRoOjFweH0uY3JvcHBlci1mYWNlLC5jcm9wcGVyLWxpbmUsLmNyb3BwZXItcG9pbnR7ZGlzcGxheTpibG9jaztoZWlnaHQ6MTAwJTtvcGFjaXR5Oi4xO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjEwMCV9LmNyb3BwZXItZmFjZXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7bGVmdDowO3RvcDowfS5jcm9wcGVyLWxpbmV7YmFja2dyb3VuZC1jb2xvcjojMzlmfS5jcm9wcGVyLWxpbmUubGluZS1le2N1cnNvcjpldy1yZXNpemU7cmlnaHQ6LTNweDt0b3A6MDt3aWR0aDo1cHh9LmNyb3BwZXItbGluZS5saW5lLW57Y3Vyc29yOm5zLXJlc2l6ZTtoZWlnaHQ6NXB4O2xlZnQ6MDt0b3A6LTNweH0uY3JvcHBlci1saW5lLmxpbmUtd3tjdXJzb3I6ZXctcmVzaXplO2xlZnQ6LTNweDt0b3A6MDt3aWR0aDo1cHh9LmNyb3BwZXItbGluZS5saW5lLXN7Ym90dG9tOi0zcHg7Y3Vyc29yOm5zLXJlc2l6ZTtoZWlnaHQ6NXB4O2xlZnQ6MH0uY3JvcHBlci1wb2ludHtiYWNrZ3JvdW5kLWNvbG9yOiMzOWY7aGVpZ2h0OjVweDtvcGFjaXR5Oi43NTt3aWR0aDo1cHh9LmNyb3BwZXItcG9pbnQucG9pbnQtZXtjdXJzb3I6ZXctcmVzaXplO21hcmdpbi10b3A6LTNweDtyaWdodDotM3B4O3RvcDo1MCV9LmNyb3BwZXItcG9pbnQucG9pbnQtbntjdXJzb3I6bnMtcmVzaXplO2xlZnQ6NTAlO21hcmdpbi1sZWZ0Oi0zcHg7dG9wOi0zcHh9LmNyb3BwZXItcG9pbnQucG9pbnQtd3tjdXJzb3I6ZXctcmVzaXplO2xlZnQ6LTNweDttYXJnaW4tdG9wOi0zcHg7dG9wOjUwJX0uY3JvcHBlci1wb2ludC5wb2ludC1ze2JvdHRvbTotM3B4O2N1cnNvcjpzLXJlc2l6ZTtsZWZ0OjUwJTttYXJnaW4tbGVmdDotM3B4fS5jcm9wcGVyLXBvaW50LnBvaW50LW5le2N1cnNvcjpuZXN3LXJlc2l6ZTtyaWdodDotM3B4O3RvcDotM3B4fS5jcm9wcGVyLXBvaW50LnBvaW50LW53e2N1cnNvcjpud3NlLXJlc2l6ZTtsZWZ0Oi0zcHg7dG9wOi0zcHh9LmNyb3BwZXItcG9pbnQucG9pbnQtc3d7Ym90dG9tOi0zcHg7Y3Vyc29yOm5lc3ctcmVzaXplO2xlZnQ6LTNweH0uY3JvcHBlci1wb2ludC5wb2ludC1zZXtib3R0b206LTNweDtjdXJzb3I6bndzZS1yZXNpemU7aGVpZ2h0OjIwcHg7b3BhY2l0eToxO3JpZ2h0Oi0zcHg7d2lkdGg6MjBweH1AbWVkaWEgKG1pbi13aWR0aDo3NjhweCl7LmNyb3BwZXItcG9pbnQucG9pbnQtc2V7aGVpZ2h0OjE1cHg7d2lkdGg6MTVweH19QG1lZGlhIChtaW4td2lkdGg6OTkycHgpey5jcm9wcGVyLXBvaW50LnBvaW50LXNle2hlaWdodDoxMHB4O3dpZHRoOjEwcHh9fUBtZWRpYSAobWluLXdpZHRoOjEyMDBweCl7LmNyb3BwZXItcG9pbnQucG9pbnQtc2V7aGVpZ2h0OjVweDtvcGFjaXR5Oi43NTt3aWR0aDo1cHh9fS5jcm9wcGVyLXBvaW50LnBvaW50LXNlOmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiMzOWY7Ym90dG9tOi01MCU7Y29udGVudDonICc7ZGlzcGxheTpibG9jaztoZWlnaHQ6MjAwJTtvcGFjaXR5OjA7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6LTUwJTt3aWR0aDoyMDAlfS5jcm9wcGVyLWludmlzaWJsZXtvcGFjaXR5OjB9LmNyb3BwZXItYmd7YmFja2dyb3VuZC1pbWFnZTp1cmwoZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCQUFBQUFRQVFNQUFBQWxQVzBpQUFBQUEzTkNTVlFJQ0FqYjRVL2dBQUFBQmxCTVZFWE16TXovLy8vVGpSVjJBQUFBQ1hCSVdYTUFBQXJyQUFBSzZ3R0NpdzFhQUFBQUhIUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkdhWEpsZDI5eWEzTWdRMU0yNkx5eWpBQUFBQkZKUkVGVUNKbGorTS9BZ0JWaEYvMFBBSDYvRC9Ia0R4T0dBQUFBQUVsRlRrU3VRbUNDKX0uY3JvcHBlci1oaWRle2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjA7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MH0uY3JvcHBlci1oaWRkZW57ZGlzcGxheTpub25lIWltcG9ydGFudH0uY3JvcHBlci1tb3Zle2N1cnNvcjptb3ZlfS5jcm9wcGVyLWNyb3B7Y3Vyc29yOmNyb3NzaGFpcn0uY3JvcHBlci1kaXNhYmxlZCAuY3JvcHBlci1kcmFnLWJveCwuY3JvcHBlci1kaXNhYmxlZCAuY3JvcHBlci1mYWNlLC5jcm9wcGVyLWRpc2FibGVkIC5jcm9wcGVyLWxpbmUsLmNyb3BwZXItZGlzYWJsZWQgLmNyb3BwZXItcG9pbnR7Y3Vyc29yOm5vdC1hbGxvd2VkfWBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQ3JvcHBlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBAVmlld0NoaWxkKCdpbWFnZScpIGltYWdlOiBFbGVtZW50UmVmO1xuXG4gICAgQElucHV0KCkgaW1hZ2VVcmw6IGFueTtcbiAgICBASW5wdXQoKSBzZXR0aW5nczogSW1hZ2VDcm9wcGVyU2V0dGluZztcbiAgICBASW5wdXQoKSBjcm9wYm94OiBDcm9wcGVyLkNyb3BCb3hEYXRhO1xuICAgIEBJbnB1dCgpIGxvYWRJbWFnZUVycm9yVGV4dDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNyb3BwZXJPcHRpb25zOiBhbnkgPSB7fTtcblxuICAgIEBPdXRwdXQoKSBleHBvcnQgPSBuZXcgRXZlbnRFbWl0dGVyPEltYWdlQ3JvcHBlclJlc3VsdD4oKTtcbiAgICBAT3V0cHV0KCkgcmVhZHkgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgaXNMb2FkaW5nOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgY3JvcHBlcjogQ3JvcHBlcjtcbiAgICBwdWJsaWMgaW1hZ2VFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIHB1YmxpYyBsb2FkRXJyb3I6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbWFnZSBsb2FkZWRcbiAgICAgKiBAcGFyYW0gZXZcbiAgICAgKi9cbiAgICBpbWFnZUxvYWRlZChldjogRXZlbnQpIHtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBVbnNldCBsb2FkIGVycm9yIHN0YXRlXG4gICAgICAgIHRoaXMubG9hZEVycm9yID0gZmFsc2U7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2V0dXAgaW1hZ2UgZWxlbWVudFxuICAgICAgICBjb25zdCBpbWFnZSA9IGV2LnRhcmdldCBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgICB0aGlzLmltYWdlRWxlbWVudCA9IGltYWdlO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNldHVwIGNhbnZhcyBlbGVtZW50XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcblxuICAgICAgICBjb25zdCB3aWR0aCA9IGltYWdlLm9mZnNldFdpZHRoO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSBpbWFnZS5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLmRyYXdJbWFnZShcbiAgICAgICAgICAgIGltYWdlLFxuICAgICAgICAgICAgMCwgMCwgaW1hZ2UubmF0dXJhbFdpZHRoLCBpbWFnZS5uYXR1cmFsSGVpZ2h0LFxuICAgICAgICAgICAgMCwgMCwgd2lkdGgsIGhlaWdodFxuICAgICAgICApO1xuXG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gQWRkIGNyb3NzT3JpZ2luP1xuICAgICAgICBpZiAodGhpcy5jcm9wcGVyT3B0aW9ucy5jaGVja0Nyb3NzT3JpZ2luKSBpbWFnZS5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEltYWdlIG9uIHJlYWR5IGV2ZW50XG4gICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5JywgKCkgPT4ge1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIEVtaXQgcmVhZHlcbiAgICAgICAgICAgIHRoaXMucmVhZHkuZW1pdCh0cnVlKTtcblxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFVuc2V0IGxvYWRpbmcgc3RhdGVcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBWYWxpZGF0ZSBjcm9wYm94IGV4aXN0YW5jZVxuICAgICAgICAgICAgaWYgKHRoaXMuY3JvcGJveCkge1xuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBTZXQgY3JvcGJveCBkYXRhXG4gICAgICAgICAgICAgICAgdGhpcy5jcm9wcGVyLnNldENyb3BCb3hEYXRhKHRoaXMuY3JvcGJveCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNldHVwIGFzcGVjdCByYXRpbyBhY2NvcmRpbmcgdG8gc2V0dGluZ3NcbiAgICAgICAgbGV0IGFzcGVjdFJhdGlvID0gTmFOO1xuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncykge1xuICAgICAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSB0aGlzLnNldHRpbmdzO1xuICAgICAgICAgICAgYXNwZWN0UmF0aW8gPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNldCBjcm9wIG9wdGlvbnNcbiAgICAgICAgLy8gZXh0ZW5kIGRlZmF1bHQgd2l0aCBjdXN0b20gY29uZmlnXG4gICAgICAgIHRoaXMuY3JvcHBlck9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIGFzcGVjdFJhdGlvLFxuICAgICAgICAgICAgbW92YWJsZTogZmFsc2UsXG4gICAgICAgICAgICBzY2FsYWJsZTogZmFsc2UsXG4gICAgICAgICAgICB6b29tYWJsZTogZmFsc2UsXG4gICAgICAgICAgICB2aWV3TW9kZTogMSxcbiAgICAgICAgICAgIGNoZWNrQ3Jvc3NPcmlnaW46IHRydWVcbiAgICAgICAgfSwgdGhpcy5jcm9wcGVyT3B0aW9ucyk7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2V0IGNyb3BwZXJqc1xuICAgICAgICB0aGlzLmNyb3BwZXIgPSBuZXcgQ3JvcHBlcihjYW52YXMsIHRoaXMuY3JvcHBlck9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltYWdlIGxvYWQgZXJyb3JcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBpbWFnZUxvYWRFcnJvcihldmVudDogYW55KSB7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2V0IGxvYWQgZXJyb3Igc3RhdGVcbiAgICAgICAgdGhpcy5sb2FkRXJyb3IgPSB0cnVlO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFVuc2V0IGxvYWRpbmcgc3RhdGVcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHBvcnQgY2FudmFzXG4gICAgICogQHBhcmFtIGJhc2U2NFxuICAgICAqL1xuICAgIGV4cG9ydENhbnZhcyhiYXNlNjQ/OiBhbnkpIHtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBHZXQgYW5kIHNldCBpbWFnZSwgY3JvcCBhbmQgY2FudmFzIGRhdGFcbiAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gdGhpcy5jcm9wcGVyLmdldEltYWdlRGF0YSgpO1xuICAgICAgICBjb25zdCBjcm9wRGF0YSA9IHRoaXMuY3JvcHBlci5nZXRDcm9wQm94RGF0YSgpO1xuICAgICAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNyb3BwZXIuZ2V0Q3JvcHBlZENhbnZhcygpO1xuICAgICAgICBjb25zdCBkYXRhID0geyBpbWFnZURhdGEsIGNyb3BEYXRhIH07XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gQ3JlYXRlIHByb21pc2UgdG8gcmVzb2x2ZSBjYW52YXMgZGF0YVxuICAgICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBWYWxpZGF0ZSBiYXNlNjRcbiAgICAgICAgICAgIGlmIChiYXNlNjQpIHtcblxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gUmVzb2x2ZSBwcm9taXNlIHdpdGggZGF0YVVybFxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVVybDogY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbnZhcy50b0Jsb2IoYmxvYiA9PiByZXNvbHZlKHsgYmxvYiB9KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEVtaXQgZXhwb3J0IGRhdGEgd2hlbiBwcm9taXNlIGlzIHJlYWR5XG4gICAgICAgIHByb21pc2UudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5leHBvcnQuZW1pdChPYmplY3QuYXNzaWduKGRhdGEsIHJlcykpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=