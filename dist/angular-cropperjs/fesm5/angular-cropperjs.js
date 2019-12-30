import { Injectable, NgModule, Component, ViewEncapsulation, ViewChild, Input, EventEmitter, Output, defineInjectable } from '@angular/core';
import Cropper from 'cropperjs';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AngularCropperjsService = /** @class */ (function () {
    function AngularCropperjsService() {
    }
    AngularCropperjsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    AngularCropperjsService.ctorParameters = function () { return []; };
    /** @nocollapse */ AngularCropperjsService.ngInjectableDef = defineInjectable({ factory: function AngularCropperjsService_Factory() { return new AngularCropperjsService(); }, token: AngularCropperjsService, providedIn: "root" });
    return AngularCropperjsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CropperComponent = /** @class */ (function () {
    function CropperComponent() {
        this.cropperOptions = {};
        this.export = new EventEmitter();
        this.ready = new EventEmitter();
        this.isLoading = true;
    }
    /**
     * @return {?}
     */
    CropperComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * Image loaded
     * @param ev
     */
    /**
     * Image loaded
     * @param {?} ev
     * @return {?}
     */
    CropperComponent.prototype.imageLoaded = /**
     * Image loaded
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        var _this = this;
        //
        // Unset load error state
        this.loadError = false;
        /** @type {?} */
        var image = /** @type {?} */ (ev.target);
        this.imageElement = image;
        /** @type {?} */
        var canvas = /** @type {?} */ (document.getElementById('canvas'));
        /** @type {?} */
        var width = image.offsetWidth;
        /** @type {?} */
        var height = image.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, width, height);
        //
        // Add crossOrigin?
        if (this.cropperOptions.checkCrossOrigin)
            image.crossOrigin = 'anonymous';
        //
        // Image on ready event
        image.addEventListener('ready', function () {
            //
            // Emit ready
            //
            // Emit ready
            _this.ready.emit(true);
            //
            // Unset loading state
            //
            // Unset loading state
            _this.isLoading = false;
            //
            // Validate cropbox existance
            if (_this.cropbox) {
                //
                // Set cropbox data
                //
                // Set cropbox data
                _this.cropper.setCropBoxData(_this.cropbox);
            }
        });
        /** @type {?} */
        var aspectRatio = NaN;
        if (this.settings) {
            var _a = this.settings, width_1 = _a.width, height_1 = _a.height;
            aspectRatio = width_1 / height_1;
        }
        //
        // Set crop options
        // extend default with custom config
        this.cropperOptions = Object.assign({
            aspectRatio: aspectRatio,
            movable: false,
            scalable: false,
            zoomable: false,
            viewMode: 1,
            checkCrossOrigin: true
        }, this.cropperOptions);
        //
        // Set cropperjs
        this.cropper = new Cropper(canvas, this.cropperOptions);
    };
    /**
     * Image load error
     * @param event
     */
    /**
     * Image load error
     * @param {?} event
     * @return {?}
     */
    CropperComponent.prototype.imageLoadError = /**
     * Image load error
     * @param {?} event
     * @return {?}
     */
    function (event) {
        //
        // Set load error state
        this.loadError = true;
        //
        // Unset loading state
        this.isLoading = false;
    };
    /**
     * Export canvas
     * @param base64
     */
    /**
     * Export canvas
     * @param {?=} base64
     * @return {?}
     */
    CropperComponent.prototype.exportCanvas = /**
     * Export canvas
     * @param {?=} base64
     * @return {?}
     */
    function (base64) {
        var _this = this;
        /** @type {?} */
        var imageData = this.cropper.getImageData();
        /** @type {?} */
        var cropData = this.cropper.getCropBoxData();
        /** @type {?} */
        var canvas = this.cropper.getCroppedCanvas();
        /** @type {?} */
        var data = { imageData: imageData, cropData: cropData };
        /** @type {?} */
        var promise = new Promise(function (resolve) {
            //
            // Validate base64
            if (base64) {
                //
                // Resolve promise with dataUrl
                return resolve({
                    dataUrl: canvas.toDataURL('image/png')
                });
            }
            canvas.toBlob(function (blob) { return resolve({ blob: blob }); });
        });
        //
        // Emit export data when promise is ready
        promise.then(function (res) {
            _this.export.emit(Object.assign(data, res));
        });
    };
    CropperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'angular-cropper',
                    template: "<!-- CROPPER WRAPPER -->\n<div class=\"cropper-wrapper\">\n\n    <!-- LOADING -->\n    <div class=\"loading-block\" *ngIf=\"isLoading\">\n        <div class=\"spinner\"></div>\n    </div>\n\n    <!-- LOAD ERROR -->\n    <div class=\"alert alert-warning\" *ngIf=\"loadError\">{{ loadImageErrorText }}</div>\n\n    <!-- CROPPER -->\n    <div class=\"cropper\">\n        <img #image alt=\"image\" style=\"display:none;\" [src]=\"imageUrl\" (load)=\"imageLoaded($event)\" (error)=\"imageLoadError($event)\" />\n        <canvas id=\"canvas\"></canvas>\n    </div>\n</div>\n",
                    styles: [":host{display:block}.cropper img{max-width:100%;max-height:100%;height:auto}.cropper-wrapper{position:relative;min-height:80px}.cropper-wrapper .loading-block{position:absolute;top:0;left:0;width:100%;height:100%}.cropper-wrapper .loading-block .spinner{width:31px;height:31px;margin:0 auto;border:2px solid rgba(97,100,193,.98);border-radius:50%;border-left-color:transparent;border-right-color:transparent;-webkit-animation:425ms linear infinite cssload-spin;position:absolute;top:calc(50% - 15px);left:calc(50% - 15px);animation:425ms linear infinite cssload-spin}@-webkit-keyframes cssload-spin{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes cssload-spin{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}/*!\n * Cropper.js v1.4.1\n * https://fengyuanchen.github.io/cropperjs\n *\n * Copyright 2015-present Chen Fengyuan\n * Released under the MIT license\n *\n * Date: 2018-07-15T09:54:43.167Z\n */.cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-canvas,.cropper-crop-box,.cropper-drag-box,.cropper-modal,.cropper-wrap-box{bottom:0;left:0;position:absolute;right:0;top:0}.cropper-canvas,.cropper-wrap-box{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline:#39f solid 1px;overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:calc(100% / 3);left:0;top:calc(100% / 3);width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:calc(100% / 3);top:0;width:calc(100% / 3)}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center:after,.cropper-center:before{background-color:#eee;content:' ';display:block;position:absolute}.cropper-center:before{height:1px;left:-3px;top:0;width:7px}.cropper-center:after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:ew-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:ns-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:ew-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:ns-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:ew-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:ns-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:ew-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:nesw-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nwse-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:nesw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:nwse-resize;height:20px;opacity:1;right:-3px;width:20px}@media (min-width:768px){.cropper-point.point-se{height:15px;width:15px}}@media (min-width:992px){.cropper-point.point-se{height:10px;width:10px}}@media (min-width:1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}.cropper-point.point-se:before{background-color:#39f;bottom:-50%;content:' ';display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)}.cropper-hide{display:block;height:0;position:absolute;width:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}"],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    CropperComponent.ctorParameters = function () { return []; };
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
    return CropperComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AngularCropperjsModule = /** @class */ (function () {
    function AngularCropperjsModule() {
    }
    AngularCropperjsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [CropperComponent],
                    exports: [CropperComponent]
                },] },
    ];
    return AngularCropperjsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { AngularCropperjsService, CropperComponent, AngularCropperjsModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1jcm9wcGVyanMuanMubWFwIiwic291cmNlcyI6WyJuZzovL2FuZ3VsYXItY3JvcHBlcmpzL2xpYi9hbmd1bGFyLWNyb3BwZXJqcy5zZXJ2aWNlLnRzIiwibmc6Ly9hbmd1bGFyLWNyb3BwZXJqcy9saWIvY3JvcHBlci9jcm9wcGVyLmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci1jcm9wcGVyanMvbGliL2FuZ3VsYXItY3JvcHBlcmpzLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJDcm9wcGVyanNTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IENyb3BwZXIgZnJvbSAnY3JvcHBlcmpzJztcblxuZXhwb3J0IGludGVyZmFjZSBJbWFnZUNyb3BwZXJTZXR0aW5nIHtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEltYWdlQ3JvcHBlclJlc3VsdCB7XG4gICAgaW1hZ2VEYXRhOiBDcm9wcGVyLkltYWdlRGF0YTtcbiAgICBjcm9wRGF0YTogQ3JvcHBlci5Dcm9wQm94RGF0YTtcbiAgICBibG9iPzogQmxvYjtcbiAgICBkYXRhVXJsPzogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FuZ3VsYXItY3JvcHBlcicsXG4gICAgdGVtcGxhdGU6IGA8IS0tIENST1BQRVIgV1JBUFBFUiAtLT5cbjxkaXYgY2xhc3M9XCJjcm9wcGVyLXdyYXBwZXJcIj5cblxuICAgIDwhLS0gTE9BRElORyAtLT5cbiAgICA8ZGl2IGNsYXNzPVwibG9hZGluZy1ibG9ja1wiICpuZ0lmPVwiaXNMb2FkaW5nXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyXCI+PC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIExPQUQgRVJST1IgLS0+XG4gICAgPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXdhcm5pbmdcIiAqbmdJZj1cImxvYWRFcnJvclwiPnt7IGxvYWRJbWFnZUVycm9yVGV4dCB9fTwvZGl2PlxuXG4gICAgPCEtLSBDUk9QUEVSIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJjcm9wcGVyXCI+XG4gICAgICAgIDxpbWcgI2ltYWdlIGFsdD1cImltYWdlXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7XCIgW3NyY109XCJpbWFnZVVybFwiIChsb2FkKT1cImltYWdlTG9hZGVkKCRldmVudClcIiAoZXJyb3IpPVwiaW1hZ2VMb2FkRXJyb3IoJGV2ZW50KVwiIC8+XG4gICAgICAgIDxjYW52YXMgaWQ9XCJjYW52YXNcIj48L2NhbnZhcz5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgOmhvc3R7ZGlzcGxheTpibG9ja30uY3JvcHBlciBpbWd7bWF4LXdpZHRoOjEwMCU7bWF4LWhlaWdodDoxMDAlO2hlaWdodDphdXRvfS5jcm9wcGVyLXdyYXBwZXJ7cG9zaXRpb246cmVsYXRpdmU7bWluLWhlaWdodDo4MHB4fS5jcm9wcGVyLXdyYXBwZXIgLmxvYWRpbmctYmxvY2t7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9LmNyb3BwZXItd3JhcHBlciAubG9hZGluZy1ibG9jayAuc3Bpbm5lcnt3aWR0aDozMXB4O2hlaWdodDozMXB4O21hcmdpbjowIGF1dG87Ym9yZGVyOjJweCBzb2xpZCByZ2JhKDk3LDEwMCwxOTMsLjk4KTtib3JkZXItcmFkaXVzOjUwJTtib3JkZXItbGVmdC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItcmlnaHQtY29sb3I6dHJhbnNwYXJlbnQ7LXdlYmtpdC1hbmltYXRpb246NDI1bXMgbGluZWFyIGluZmluaXRlIGNzc2xvYWQtc3Bpbjtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6Y2FsYyg1MCUgLSAxNXB4KTtsZWZ0OmNhbGMoNTAlIC0gMTVweCk7YW5pbWF0aW9uOjQyNW1zIGxpbmVhciBpbmZpbml0ZSBjc3Nsb2FkLXNwaW59QC13ZWJraXQta2V5ZnJhbWVzIGNzc2xvYWQtc3Bpbnt0b3std2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyl9fUBrZXlmcmFtZXMgY3NzbG9hZC1zcGlue3Rvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19LyohXG4gKiBDcm9wcGVyLmpzIHYxLjQuMVxuICogaHR0cHM6Ly9mZW5neXVhbmNoZW4uZ2l0aHViLmlvL2Nyb3BwZXJqc1xuICpcbiAqIENvcHlyaWdodCAyMDE1LXByZXNlbnQgQ2hlbiBGZW5neXVhblxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKlxuICogRGF0ZTogMjAxOC0wNy0xNVQwOTo1NDo0My4xNjdaXG4gKi8uY3JvcHBlci1jb250YWluZXJ7ZGlyZWN0aW9uOmx0cjtmb250LXNpemU6MDtsaW5lLWhlaWdodDowO3Bvc2l0aW9uOnJlbGF0aXZlO3RvdWNoLWFjdGlvbjpub25lOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0uY3JvcHBlci1jb250YWluZXIgaW1ne2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjEwMCU7aW1hZ2Utb3JpZW50YXRpb246MGRlZzttYXgtaGVpZ2h0Om5vbmUhaW1wb3J0YW50O21heC13aWR0aDpub25lIWltcG9ydGFudDttaW4taGVpZ2h0OjAhaW1wb3J0YW50O21pbi13aWR0aDowIWltcG9ydGFudDt3aWR0aDoxMDAlfS5jcm9wcGVyLWNhbnZhcywuY3JvcHBlci1jcm9wLWJveCwuY3JvcHBlci1kcmFnLWJveCwuY3JvcHBlci1tb2RhbCwuY3JvcHBlci13cmFwLWJveHtib3R0b206MDtsZWZ0OjA7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDt0b3A6MH0uY3JvcHBlci1jYW52YXMsLmNyb3BwZXItd3JhcC1ib3h7b3ZlcmZsb3c6aGlkZGVufS5jcm9wcGVyLWRyYWctYm94e2JhY2tncm91bmQtY29sb3I6I2ZmZjtvcGFjaXR5OjB9LmNyb3BwZXItbW9kYWx7YmFja2dyb3VuZC1jb2xvcjojMDAwO29wYWNpdHk6LjV9LmNyb3BwZXItdmlldy1ib3h7ZGlzcGxheTpibG9jaztoZWlnaHQ6MTAwJTtvdXRsaW5lOiMzOWYgc29saWQgMXB4O292ZXJmbG93OmhpZGRlbjt3aWR0aDoxMDAlfS5jcm9wcGVyLWRhc2hlZHtib3JkZXI6MCBkYXNoZWQgI2VlZTtkaXNwbGF5OmJsb2NrO29wYWNpdHk6LjU7cG9zaXRpb246YWJzb2x1dGV9LmNyb3BwZXItZGFzaGVkLmRhc2hlZC1oe2JvcmRlci1ib3R0b20td2lkdGg6MXB4O2JvcmRlci10b3Atd2lkdGg6MXB4O2hlaWdodDpjYWxjKDEwMCUgLyAzKTtsZWZ0OjA7dG9wOmNhbGMoMTAwJSAvIDMpO3dpZHRoOjEwMCV9LmNyb3BwZXItZGFzaGVkLmRhc2hlZC12e2JvcmRlci1sZWZ0LXdpZHRoOjFweDtib3JkZXItcmlnaHQtd2lkdGg6MXB4O2hlaWdodDoxMDAlO2xlZnQ6Y2FsYygxMDAlIC8gMyk7dG9wOjA7d2lkdGg6Y2FsYygxMDAlIC8gMyl9LmNyb3BwZXItY2VudGVye2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjA7bGVmdDo1MCU7b3BhY2l0eTouNzU7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTt3aWR0aDowfS5jcm9wcGVyLWNlbnRlcjphZnRlciwuY3JvcHBlci1jZW50ZXI6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6I2VlZTtjb250ZW50OicgJztkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlfS5jcm9wcGVyLWNlbnRlcjpiZWZvcmV7aGVpZ2h0OjFweDtsZWZ0Oi0zcHg7dG9wOjA7d2lkdGg6N3B4fS5jcm9wcGVyLWNlbnRlcjphZnRlcntoZWlnaHQ6N3B4O2xlZnQ6MDt0b3A6LTNweDt3aWR0aDoxcHh9LmNyb3BwZXItZmFjZSwuY3JvcHBlci1saW5lLC5jcm9wcGVyLXBvaW50e2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjEwMCU7b3BhY2l0eTouMTtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxMDAlfS5jcm9wcGVyLWZhY2V7YmFja2dyb3VuZC1jb2xvcjojZmZmO2xlZnQ6MDt0b3A6MH0uY3JvcHBlci1saW5le2JhY2tncm91bmQtY29sb3I6IzM5Zn0uY3JvcHBlci1saW5lLmxpbmUtZXtjdXJzb3I6ZXctcmVzaXplO3JpZ2h0Oi0zcHg7dG9wOjA7d2lkdGg6NXB4fS5jcm9wcGVyLWxpbmUubGluZS1ue2N1cnNvcjpucy1yZXNpemU7aGVpZ2h0OjVweDtsZWZ0OjA7dG9wOi0zcHh9LmNyb3BwZXItbGluZS5saW5lLXd7Y3Vyc29yOmV3LXJlc2l6ZTtsZWZ0Oi0zcHg7dG9wOjA7d2lkdGg6NXB4fS5jcm9wcGVyLWxpbmUubGluZS1ze2JvdHRvbTotM3B4O2N1cnNvcjpucy1yZXNpemU7aGVpZ2h0OjVweDtsZWZ0OjB9LmNyb3BwZXItcG9pbnR7YmFja2dyb3VuZC1jb2xvcjojMzlmO2hlaWdodDo1cHg7b3BhY2l0eTouNzU7d2lkdGg6NXB4fS5jcm9wcGVyLXBvaW50LnBvaW50LWV7Y3Vyc29yOmV3LXJlc2l6ZTttYXJnaW4tdG9wOi0zcHg7cmlnaHQ6LTNweDt0b3A6NTAlfS5jcm9wcGVyLXBvaW50LnBvaW50LW57Y3Vyc29yOm5zLXJlc2l6ZTtsZWZ0OjUwJTttYXJnaW4tbGVmdDotM3B4O3RvcDotM3B4fS5jcm9wcGVyLXBvaW50LnBvaW50LXd7Y3Vyc29yOmV3LXJlc2l6ZTtsZWZ0Oi0zcHg7bWFyZ2luLXRvcDotM3B4O3RvcDo1MCV9LmNyb3BwZXItcG9pbnQucG9pbnQtc3tib3R0b206LTNweDtjdXJzb3I6cy1yZXNpemU7bGVmdDo1MCU7bWFyZ2luLWxlZnQ6LTNweH0uY3JvcHBlci1wb2ludC5wb2ludC1uZXtjdXJzb3I6bmVzdy1yZXNpemU7cmlnaHQ6LTNweDt0b3A6LTNweH0uY3JvcHBlci1wb2ludC5wb2ludC1ud3tjdXJzb3I6bndzZS1yZXNpemU7bGVmdDotM3B4O3RvcDotM3B4fS5jcm9wcGVyLXBvaW50LnBvaW50LXN3e2JvdHRvbTotM3B4O2N1cnNvcjpuZXN3LXJlc2l6ZTtsZWZ0Oi0zcHh9LmNyb3BwZXItcG9pbnQucG9pbnQtc2V7Ym90dG9tOi0zcHg7Y3Vyc29yOm53c2UtcmVzaXplO2hlaWdodDoyMHB4O29wYWNpdHk6MTtyaWdodDotM3B4O3dpZHRoOjIwcHh9QG1lZGlhIChtaW4td2lkdGg6NzY4cHgpey5jcm9wcGVyLXBvaW50LnBvaW50LXNle2hlaWdodDoxNXB4O3dpZHRoOjE1cHh9fUBtZWRpYSAobWluLXdpZHRoOjk5MnB4KXsuY3JvcHBlci1wb2ludC5wb2ludC1zZXtoZWlnaHQ6MTBweDt3aWR0aDoxMHB4fX1AbWVkaWEgKG1pbi13aWR0aDoxMjAwcHgpey5jcm9wcGVyLXBvaW50LnBvaW50LXNle2hlaWdodDo1cHg7b3BhY2l0eTouNzU7d2lkdGg6NXB4fX0uY3JvcHBlci1wb2ludC5wb2ludC1zZTpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjojMzlmO2JvdHRvbTotNTAlO2NvbnRlbnQ6JyAnO2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjIwMCU7b3BhY2l0eTowO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0Oi01MCU7d2lkdGg6MjAwJX0uY3JvcHBlci1pbnZpc2libGV7b3BhY2l0eTowfS5jcm9wcGVyLWJne2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQkFBQUFBUUFRTUFBQUFsUFcwaUFBQUFBM05DU1ZRSUNBamI0VS9nQUFBQUJsQk1WRVhNek16Ly8vL1RqUlYyQUFBQUNYQklXWE1BQUFyckFBQUs2d0dDaXcxYUFBQUFISFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JHYVhKbGQyOXlhM01nUTFNMjZMeXlqQUFBQUJGSlJFRlVDSmxqK00vQWdCVmhGLzBQQUg2L0QvSGtEeE9HQUFBQUFFbEZUa1N1UW1DQyl9LmNyb3BwZXItaGlkZXtkaXNwbGF5OmJsb2NrO2hlaWdodDowO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjB9LmNyb3BwZXItaGlkZGVue2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9LmNyb3BwZXItbW92ZXtjdXJzb3I6bW92ZX0uY3JvcHBlci1jcm9we2N1cnNvcjpjcm9zc2hhaXJ9LmNyb3BwZXItZGlzYWJsZWQgLmNyb3BwZXItZHJhZy1ib3gsLmNyb3BwZXItZGlzYWJsZWQgLmNyb3BwZXItZmFjZSwuY3JvcHBlci1kaXNhYmxlZCAuY3JvcHBlci1saW5lLC5jcm9wcGVyLWRpc2FibGVkIC5jcm9wcGVyLXBvaW50e2N1cnNvcjpub3QtYWxsb3dlZH1gXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIENyb3BwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQFZpZXdDaGlsZCgnaW1hZ2UnKSBpbWFnZTogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpIGltYWdlVXJsOiBhbnk7XG4gICAgQElucHV0KCkgc2V0dGluZ3M6IEltYWdlQ3JvcHBlclNldHRpbmc7XG4gICAgQElucHV0KCkgY3JvcGJveDogQ3JvcHBlci5Dcm9wQm94RGF0YTtcbiAgICBASW5wdXQoKSBsb2FkSW1hZ2VFcnJvclRleHQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBjcm9wcGVyT3B0aW9uczogYW55ID0ge307XG5cbiAgICBAT3V0cHV0KCkgZXhwb3J0ID0gbmV3IEV2ZW50RW1pdHRlcjxJbWFnZUNyb3BwZXJSZXN1bHQ+KCk7XG4gICAgQE91dHB1dCgpIHJlYWR5ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGlzTG9hZGluZzogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGNyb3BwZXI6IENyb3BwZXI7XG4gICAgcHVibGljIGltYWdlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudDtcbiAgICBwdWJsaWMgbG9hZEVycm9yOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1hZ2UgbG9hZGVkXG4gICAgICogQHBhcmFtIGV2XG4gICAgICovXG4gICAgaW1hZ2VMb2FkZWQoZXY6IEV2ZW50KSB7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gVW5zZXQgbG9hZCBlcnJvciBzdGF0ZVxuICAgICAgICB0aGlzLmxvYWRFcnJvciA9IGZhbHNlO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNldHVwIGltYWdlIGVsZW1lbnRcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBldi50YXJnZXQgYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbWFnZUVsZW1lbnQgPSBpbWFnZTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBTZXR1cCBjYW52YXMgZWxlbWVudFxuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSBpbWFnZS5vZmZzZXRXaWR0aDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gaW1hZ2Uub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKS5kcmF3SW1hZ2UoXG4gICAgICAgICAgICBpbWFnZSxcbiAgICAgICAgICAgIDAsIDAsIGltYWdlLm5hdHVyYWxXaWR0aCwgaW1hZ2UubmF0dXJhbEhlaWdodCxcbiAgICAgICAgICAgIDAsIDAsIHdpZHRoLCBoZWlnaHRcbiAgICAgICAgKTtcblxuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEFkZCBjcm9zc09yaWdpbj9cbiAgICAgICAgaWYgKHRoaXMuY3JvcHBlck9wdGlvbnMuY2hlY2tDcm9zc09yaWdpbikgaW1hZ2UuY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcblxuICAgICAgICAvL1xuICAgICAgICAvLyBJbWFnZSBvbiByZWFkeSBldmVudFxuICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdyZWFkeScsICgpID0+IHtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBFbWl0IHJlYWR5XG4gICAgICAgICAgICB0aGlzLnJlYWR5LmVtaXQodHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBVbnNldCBsb2FkaW5nIHN0YXRlXG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gVmFsaWRhdGUgY3JvcGJveCBleGlzdGFuY2VcbiAgICAgICAgICAgIGlmICh0aGlzLmNyb3Bib3gpIHtcblxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gU2V0IGNyb3Bib3ggZGF0YVxuICAgICAgICAgICAgICAgIHRoaXMuY3JvcHBlci5zZXRDcm9wQm94RGF0YSh0aGlzLmNyb3Bib3gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBTZXR1cCBhc3BlY3QgcmF0aW8gYWNjb3JkaW5nIHRvIHNldHRpbmdzXG4gICAgICAgIGxldCBhc3BlY3RSYXRpbyA9IE5hTjtcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5zZXR0aW5ncztcbiAgICAgICAgICAgIGFzcGVjdFJhdGlvID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL1xuICAgICAgICAvLyBTZXQgY3JvcCBvcHRpb25zXG4gICAgICAgIC8vIGV4dGVuZCBkZWZhdWx0IHdpdGggY3VzdG9tIGNvbmZpZ1xuICAgICAgICB0aGlzLmNyb3BwZXJPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICBhc3BlY3RSYXRpbyxcbiAgICAgICAgICAgIG1vdmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgc2NhbGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgem9vbWFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdmlld01vZGU6IDEsXG4gICAgICAgICAgICBjaGVja0Nyb3NzT3JpZ2luOiB0cnVlXG4gICAgICAgIH0sIHRoaXMuY3JvcHBlck9wdGlvbnMpO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNldCBjcm9wcGVyanNcbiAgICAgICAgdGhpcy5jcm9wcGVyID0gbmV3IENyb3BwZXIoY2FudmFzLCB0aGlzLmNyb3BwZXJPcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbWFnZSBsb2FkIGVycm9yXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgaW1hZ2VMb2FkRXJyb3IoZXZlbnQ6IGFueSkge1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNldCBsb2FkIGVycm9yIHN0YXRlXG4gICAgICAgIHRoaXMubG9hZEVycm9yID0gdHJ1ZTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBVbnNldCBsb2FkaW5nIHN0YXRlXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhwb3J0IGNhbnZhc1xuICAgICAqIEBwYXJhbSBiYXNlNjRcbiAgICAgKi9cbiAgICBleHBvcnRDYW52YXMoYmFzZTY0PzogYW55KSB7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gR2V0IGFuZCBzZXQgaW1hZ2UsIGNyb3AgYW5kIGNhbnZhcyBkYXRhXG4gICAgICAgIGNvbnN0IGltYWdlRGF0YSA9IHRoaXMuY3JvcHBlci5nZXRJbWFnZURhdGEoKTtcbiAgICAgICAgY29uc3QgY3JvcERhdGEgPSB0aGlzLmNyb3BwZXIuZ2V0Q3JvcEJveERhdGEoKTtcbiAgICAgICAgY29uc3QgY2FudmFzID0gdGhpcy5jcm9wcGVyLmdldENyb3BwZWRDYW52YXMoKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IHsgaW1hZ2VEYXRhLCBjcm9wRGF0YSB9O1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIENyZWF0ZSBwcm9taXNlIHRvIHJlc29sdmUgY2FudmFzIGRhdGFcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gVmFsaWRhdGUgYmFzZTY0XG4gICAgICAgICAgICBpZiAoYmFzZTY0KSB7XG5cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vIFJlc29sdmUgcHJvbWlzZSB3aXRoIGRhdGFVcmxcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFVcmw6IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYW52YXMudG9CbG9iKGJsb2IgPT4gcmVzb2x2ZSh7IGJsb2IgfSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBFbWl0IGV4cG9ydCBkYXRhIHdoZW4gcHJvbWlzZSBpcyByZWFkeVxuICAgICAgICBwcm9taXNlLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXhwb3J0LmVtaXQoT2JqZWN0LmFzc2lnbihkYXRhLCByZXMpKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENyb3BwZXJDb21wb25lbnQgfSBmcm9tICcuL2Nyb3BwZXIvY3JvcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbQ3JvcHBlckNvbXBvbmVudF0sXG4gICAgZXhwb3J0czogW0Nyb3BwZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJDcm9wcGVyanNNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtJQU9FO0tBQWlCOztnQkFMbEIsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7a0NBSkQ7Ozs7Ozs7QUNBQTtJQWdFSTs4QkFWK0IsRUFBRTtzQkFFZCxJQUFJLFlBQVksRUFBc0I7cUJBQ3ZDLElBQUksWUFBWSxFQUFFO3lCQUVSLElBQUk7S0FLZjs7OztJQUVqQixtQ0FBUTs7O0lBQVI7S0FDQzs7Ozs7Ozs7OztJQU1ELHNDQUFXOzs7OztJQUFYLFVBQVksRUFBUztRQUFyQixpQkEyRUM7OztRQXZFRyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzs7UUFJdkIsSUFBTSxLQUFLLHFCQUFHLEVBQUUsQ0FBQyxNQUEwQixFQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDOztRQUkxQixJQUFNLE1BQU0scUJBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQXNCLEVBQUM7O1FBRXRFLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7O1FBQ2hDLElBQU0sTUFBTSxHQUFHLEtBQUss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