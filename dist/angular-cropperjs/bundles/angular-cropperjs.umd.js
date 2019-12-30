(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('cropperjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-cropperjs', ['exports', '@angular/core', 'cropperjs', '@angular/common'], factory) :
    (factory((global['angular-cropperjs'] = {}),global.ng.core,null,global.ng.common));
}(this, (function (exports,i0,Cropper,common) { 'use strict';

    Cropper = Cropper && Cropper.hasOwnProperty('default') ? Cropper['default'] : Cropper;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AngularCropperjsService = (function () {
        function AngularCropperjsService() {
        }
        AngularCropperjsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        AngularCropperjsService.ctorParameters = function () { return []; };
        /** @nocollapse */ AngularCropperjsService.ngInjectableDef = i0.defineInjectable({ factory: function AngularCropperjsService_Factory() { return new AngularCropperjsService(); }, token: AngularCropperjsService, providedIn: "root" });
        return AngularCropperjsService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var CropperComponent = (function () {
        function CropperComponent() {
            this.cropperOptions = {};
            this.export = new i0.EventEmitter();
            this.ready = new i0.EventEmitter();
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
                var image = (ev.target);
                this.imageElement = image;
                /** @type {?} */
                var canvas = (document.getElementById('canvas'));
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
            { type: i0.Component, args: [{
                        selector: 'angular-cropper',
                        template: "<!-- CROPPER WRAPPER -->\n<div class=\"cropper-wrapper\">\n\n    <!-- LOADING -->\n    <div class=\"loading-block\" *ngIf=\"isLoading\">\n        <div class=\"spinner\"></div>\n    </div>\n\n    <!-- LOAD ERROR -->\n    <div class=\"alert alert-warning\" *ngIf=\"loadError\">{{ loadImageErrorText }}</div>\n\n    <!-- CROPPER -->\n    <div class=\"cropper\">\n        <img #image alt=\"image\" style=\"display:none;\" [src]=\"imageUrl\" (load)=\"imageLoaded($event)\" (error)=\"imageLoadError($event)\" />\n        <canvas id=\"canvas\"></canvas>\n    </div>\n</div>\n",
                        styles: [":host{display:block}.cropper img{max-width:100%;max-height:100%;height:auto}.cropper-wrapper{position:relative;min-height:80px}.cropper-wrapper .loading-block{position:absolute;top:0;left:0;width:100%;height:100%}.cropper-wrapper .loading-block .spinner{width:31px;height:31px;margin:0 auto;border:2px solid rgba(97,100,193,.98);border-radius:50%;border-left-color:transparent;border-right-color:transparent;-webkit-animation:425ms linear infinite cssload-spin;position:absolute;top:calc(50% - 15px);left:calc(50% - 15px);animation:425ms linear infinite cssload-spin}@-webkit-keyframes cssload-spin{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes cssload-spin{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}/*!\n * Cropper.js v1.4.1\n * https://fengyuanchen.github.io/cropperjs\n *\n * Copyright 2015-present Chen Fengyuan\n * Released under the MIT license\n *\n * Date: 2018-07-15T09:54:43.167Z\n */.cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-canvas,.cropper-crop-box,.cropper-drag-box,.cropper-modal,.cropper-wrap-box{bottom:0;left:0;position:absolute;right:0;top:0}.cropper-canvas,.cropper-wrap-box{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline:#39f solid 1px;overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:calc(100% / 3);left:0;top:calc(100% / 3);width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:calc(100% / 3);top:0;width:calc(100% / 3)}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center:after,.cropper-center:before{background-color:#eee;content:' ';display:block;position:absolute}.cropper-center:before{height:1px;left:-3px;top:0;width:7px}.cropper-center:after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:ew-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:ns-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:ew-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:ns-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:ew-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:ns-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:ew-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:nesw-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nwse-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:nesw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:nwse-resize;height:20px;opacity:1;right:-3px;width:20px}@media (min-width:768px){.cropper-point.point-se{height:15px;width:15px}}@media (min-width:992px){.cropper-point.point-se{height:10px;width:10px}}@media (min-width:1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}.cropper-point.point-se:before{background-color:#39f;bottom:-50%;content:' ';display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)}.cropper-hide{display:block;height:0;position:absolute;width:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}"],
                        encapsulation: i0.ViewEncapsulation.None
                    },] },
        ];
        /** @nocollapse */
        CropperComponent.ctorParameters = function () { return []; };
        CropperComponent.propDecorators = {
            image: [{ type: i0.ViewChild, args: ['image',] }],
            imageUrl: [{ type: i0.Input }],
            settings: [{ type: i0.Input }],
            cropbox: [{ type: i0.Input }],
            loadImageErrorText: [{ type: i0.Input }],
            cropperOptions: [{ type: i0.Input }],
            export: [{ type: i0.Output }],
            ready: [{ type: i0.Output }]
        };
        return CropperComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AngularCropperjsModule = (function () {
        function AngularCropperjsModule() {
        }
        AngularCropperjsModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule
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

    exports.AngularCropperjsService = AngularCropperjsService;
    exports.CropperComponent = CropperComponent;
    exports.AngularCropperjsModule = AngularCropperjsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1jcm9wcGVyanMudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyLWNyb3BwZXJqcy9saWIvYW5ndWxhci1jcm9wcGVyanMuc2VydmljZS50cyIsIm5nOi8vYW5ndWxhci1jcm9wcGVyanMvbGliL2Nyb3BwZXIvY3JvcHBlci5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItY3JvcHBlcmpzL2xpYi9hbmd1bGFyLWNyb3BwZXJqcy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyQ3JvcHBlcmpzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBDcm9wcGVyIGZyb20gJ2Nyb3BwZXJqcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW1hZ2VDcm9wcGVyU2V0dGluZyB7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbWFnZUNyb3BwZXJSZXN1bHQge1xuICAgIGltYWdlRGF0YTogQ3JvcHBlci5JbWFnZURhdGE7XG4gICAgY3JvcERhdGE6IENyb3BwZXIuQ3JvcEJveERhdGE7XG4gICAgYmxvYj86IEJsb2I7XG4gICAgZGF0YVVybD86IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhbmd1bGFyLWNyb3BwZXInLFxuICAgIHRlbXBsYXRlOiBgPCEtLSBDUk9QUEVSIFdSQVBQRVIgLS0+XG48ZGl2IGNsYXNzPVwiY3JvcHBlci13cmFwcGVyXCI+XG5cbiAgICA8IS0tIExPQURJTkcgLS0+XG4gICAgPGRpdiBjbGFzcz1cImxvYWRpbmctYmxvY2tcIiAqbmdJZj1cImlzTG9hZGluZ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lclwiPjwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBMT0FEIEVSUk9SIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC13YXJuaW5nXCIgKm5nSWY9XCJsb2FkRXJyb3JcIj57eyBsb2FkSW1hZ2VFcnJvclRleHQgfX08L2Rpdj5cblxuICAgIDwhLS0gQ1JPUFBFUiAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiY3JvcHBlclwiPlxuICAgICAgICA8aW1nICNpbWFnZSBhbHQ9XCJpbWFnZVwiIHN0eWxlPVwiZGlzcGxheTpub25lO1wiIFtzcmNdPVwiaW1hZ2VVcmxcIiAobG9hZCk9XCJpbWFnZUxvYWRlZCgkZXZlbnQpXCIgKGVycm9yKT1cImltYWdlTG9hZEVycm9yKCRldmVudClcIiAvPlxuICAgICAgICA8Y2FudmFzIGlkPVwiY2FudmFzXCI+PC9jYW52YXM+XG4gICAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYDpob3N0e2Rpc3BsYXk6YmxvY2t9LmNyb3BwZXIgaW1ne21heC13aWR0aDoxMDAlO21heC1oZWlnaHQ6MTAwJTtoZWlnaHQ6YXV0b30uY3JvcHBlci13cmFwcGVye3Bvc2l0aW9uOnJlbGF0aXZlO21pbi1oZWlnaHQ6ODBweH0uY3JvcHBlci13cmFwcGVyIC5sb2FkaW5nLWJsb2Nre3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5jcm9wcGVyLXdyYXBwZXIgLmxvYWRpbmctYmxvY2sgLnNwaW5uZXJ7d2lkdGg6MzFweDtoZWlnaHQ6MzFweDttYXJnaW46MCBhdXRvO2JvcmRlcjoycHggc29saWQgcmdiYSg5NywxMDAsMTkzLC45OCk7Ym9yZGVyLXJhZGl1czo1MCU7Ym9yZGVyLWxlZnQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0LWNvbG9yOnRyYW5zcGFyZW50Oy13ZWJraXQtYW5pbWF0aW9uOjQyNW1zIGxpbmVhciBpbmZpbml0ZSBjc3Nsb2FkLXNwaW47cG9zaXRpb246YWJzb2x1dGU7dG9wOmNhbGMoNTAlIC0gMTVweCk7bGVmdDpjYWxjKDUwJSAtIDE1cHgpO2FuaW1hdGlvbjo0MjVtcyBsaW5lYXIgaW5maW5pdGUgY3NzbG9hZC1zcGlufUAtd2Via2l0LWtleWZyYW1lcyBjc3Nsb2FkLXNwaW57dG97LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpfX1Aa2V5ZnJhbWVzIGNzc2xvYWQtc3Bpbnt0b3std2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyl9fS8qIVxuICogQ3JvcHBlci5qcyB2MS40LjFcbiAqIGh0dHBzOi8vZmVuZ3l1YW5jaGVuLmdpdGh1Yi5pby9jcm9wcGVyanNcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNS1wcmVzZW50IENoZW4gRmVuZ3l1YW5cbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICpcbiAqIERhdGU6IDIwMTgtMDctMTVUMDk6NTQ6NDMuMTY3WlxuICovLmNyb3BwZXItY29udGFpbmVye2RpcmVjdGlvbjpsdHI7Zm9udC1zaXplOjA7bGluZS1oZWlnaHQ6MDtwb3NpdGlvbjpyZWxhdGl2ZTt0b3VjaC1hY3Rpb246bm9uZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9LmNyb3BwZXItY29udGFpbmVyIGltZ3tkaXNwbGF5OmJsb2NrO2hlaWdodDoxMDAlO2ltYWdlLW9yaWVudGF0aW9uOjBkZWc7bWF4LWhlaWdodDpub25lIWltcG9ydGFudDttYXgtd2lkdGg6bm9uZSFpbXBvcnRhbnQ7bWluLWhlaWdodDowIWltcG9ydGFudDttaW4td2lkdGg6MCFpbXBvcnRhbnQ7d2lkdGg6MTAwJX0uY3JvcHBlci1jYW52YXMsLmNyb3BwZXItY3JvcC1ib3gsLmNyb3BwZXItZHJhZy1ib3gsLmNyb3BwZXItbW9kYWwsLmNyb3BwZXItd3JhcC1ib3h7Ym90dG9tOjA7bGVmdDowO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjB9LmNyb3BwZXItY2FudmFzLC5jcm9wcGVyLXdyYXAtYm94e292ZXJmbG93OmhpZGRlbn0uY3JvcHBlci1kcmFnLWJveHtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7b3BhY2l0eTowfS5jcm9wcGVyLW1vZGFse2JhY2tncm91bmQtY29sb3I6IzAwMDtvcGFjaXR5Oi41fS5jcm9wcGVyLXZpZXctYm94e2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjEwMCU7b3V0bGluZTojMzlmIHNvbGlkIDFweDtvdmVyZmxvdzpoaWRkZW47d2lkdGg6MTAwJX0uY3JvcHBlci1kYXNoZWR7Ym9yZGVyOjAgZGFzaGVkICNlZWU7ZGlzcGxheTpibG9jaztvcGFjaXR5Oi41O3Bvc2l0aW9uOmFic29sdXRlfS5jcm9wcGVyLWRhc2hlZC5kYXNoZWQtaHtib3JkZXItYm90dG9tLXdpZHRoOjFweDtib3JkZXItdG9wLXdpZHRoOjFweDtoZWlnaHQ6Y2FsYygxMDAlIC8gMyk7bGVmdDowO3RvcDpjYWxjKDEwMCUgLyAzKTt3aWR0aDoxMDAlfS5jcm9wcGVyLWRhc2hlZC5kYXNoZWQtdntib3JkZXItbGVmdC13aWR0aDoxcHg7Ym9yZGVyLXJpZ2h0LXdpZHRoOjFweDtoZWlnaHQ6MTAwJTtsZWZ0OmNhbGMoMTAwJSAvIDMpO3RvcDowO3dpZHRoOmNhbGMoMTAwJSAvIDMpfS5jcm9wcGVyLWNlbnRlcntkaXNwbGF5OmJsb2NrO2hlaWdodDowO2xlZnQ6NTAlO29wYWNpdHk6Ljc1O3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7d2lkdGg6MH0uY3JvcHBlci1jZW50ZXI6YWZ0ZXIsLmNyb3BwZXItY2VudGVyOmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiNlZWU7Y29udGVudDonICc7ZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZX0uY3JvcHBlci1jZW50ZXI6YmVmb3Jle2hlaWdodDoxcHg7bGVmdDotM3B4O3RvcDowO3dpZHRoOjdweH0uY3JvcHBlci1jZW50ZXI6YWZ0ZXJ7aGVpZ2h0OjdweDtsZWZ0OjA7dG9wOi0zcHg7d2lkdGg6MXB4fS5jcm9wcGVyLWZhY2UsLmNyb3BwZXItbGluZSwuY3JvcHBlci1wb2ludHtkaXNwbGF5OmJsb2NrO2hlaWdodDoxMDAlO29wYWNpdHk6LjE7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJX0uY3JvcHBlci1mYWNle2JhY2tncm91bmQtY29sb3I6I2ZmZjtsZWZ0OjA7dG9wOjB9LmNyb3BwZXItbGluZXtiYWNrZ3JvdW5kLWNvbG9yOiMzOWZ9LmNyb3BwZXItbGluZS5saW5lLWV7Y3Vyc29yOmV3LXJlc2l6ZTtyaWdodDotM3B4O3RvcDowO3dpZHRoOjVweH0uY3JvcHBlci1saW5lLmxpbmUtbntjdXJzb3I6bnMtcmVzaXplO2hlaWdodDo1cHg7bGVmdDowO3RvcDotM3B4fS5jcm9wcGVyLWxpbmUubGluZS13e2N1cnNvcjpldy1yZXNpemU7bGVmdDotM3B4O3RvcDowO3dpZHRoOjVweH0uY3JvcHBlci1saW5lLmxpbmUtc3tib3R0b206LTNweDtjdXJzb3I6bnMtcmVzaXplO2hlaWdodDo1cHg7bGVmdDowfS5jcm9wcGVyLXBvaW50e2JhY2tncm91bmQtY29sb3I6IzM5ZjtoZWlnaHQ6NXB4O29wYWNpdHk6Ljc1O3dpZHRoOjVweH0uY3JvcHBlci1wb2ludC5wb2ludC1le2N1cnNvcjpldy1yZXNpemU7bWFyZ2luLXRvcDotM3B4O3JpZ2h0Oi0zcHg7dG9wOjUwJX0uY3JvcHBlci1wb2ludC5wb2ludC1ue2N1cnNvcjpucy1yZXNpemU7bGVmdDo1MCU7bWFyZ2luLWxlZnQ6LTNweDt0b3A6LTNweH0uY3JvcHBlci1wb2ludC5wb2ludC13e2N1cnNvcjpldy1yZXNpemU7bGVmdDotM3B4O21hcmdpbi10b3A6LTNweDt0b3A6NTAlfS5jcm9wcGVyLXBvaW50LnBvaW50LXN7Ym90dG9tOi0zcHg7Y3Vyc29yOnMtcmVzaXplO2xlZnQ6NTAlO21hcmdpbi1sZWZ0Oi0zcHh9LmNyb3BwZXItcG9pbnQucG9pbnQtbmV7Y3Vyc29yOm5lc3ctcmVzaXplO3JpZ2h0Oi0zcHg7dG9wOi0zcHh9LmNyb3BwZXItcG9pbnQucG9pbnQtbnd7Y3Vyc29yOm53c2UtcmVzaXplO2xlZnQ6LTNweDt0b3A6LTNweH0uY3JvcHBlci1wb2ludC5wb2ludC1zd3tib3R0b206LTNweDtjdXJzb3I6bmVzdy1yZXNpemU7bGVmdDotM3B4fS5jcm9wcGVyLXBvaW50LnBvaW50LXNle2JvdHRvbTotM3B4O2N1cnNvcjpud3NlLXJlc2l6ZTtoZWlnaHQ6MjBweDtvcGFjaXR5OjE7cmlnaHQ6LTNweDt3aWR0aDoyMHB4fUBtZWRpYSAobWluLXdpZHRoOjc2OHB4KXsuY3JvcHBlci1wb2ludC5wb2ludC1zZXtoZWlnaHQ6MTVweDt3aWR0aDoxNXB4fX1AbWVkaWEgKG1pbi13aWR0aDo5OTJweCl7LmNyb3BwZXItcG9pbnQucG9pbnQtc2V7aGVpZ2h0OjEwcHg7d2lkdGg6MTBweH19QG1lZGlhIChtaW4td2lkdGg6MTIwMHB4KXsuY3JvcHBlci1wb2ludC5wb2ludC1zZXtoZWlnaHQ6NXB4O29wYWNpdHk6Ljc1O3dpZHRoOjVweH19LmNyb3BwZXItcG9pbnQucG9pbnQtc2U6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6IzM5Zjtib3R0b206LTUwJTtjb250ZW50OicgJztkaXNwbGF5OmJsb2NrO2hlaWdodDoyMDAlO29wYWNpdHk6MDtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDotNTAlO3dpZHRoOjIwMCV9LmNyb3BwZXItaW52aXNpYmxle29wYWNpdHk6MH0uY3JvcHBlci1iZ3tiYWNrZ3JvdW5kLWltYWdlOnVybChkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJBQUFBQVFBUU1BQUFBbFBXMGlBQUFBQTNOQ1NWUUlDQWpiNFUvZ0FBQUFCbEJNVkVYTXpNei8vLy9UalJWMkFBQUFDWEJJV1hNQUFBcnJBQUFLNndHQ2l3MWFBQUFBSEhSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCR2FYSmxkMjl5YTNNZ1ExTTI2THl5akFBQUFCRkpSRUZVQ0psaitNL0FnQlZoRi8wUEFINi9EL0hrRHhPR0FBQUFBRWxGVGtTdVFtQ0MpfS5jcm9wcGVyLWhpZGV7ZGlzcGxheTpibG9jaztoZWlnaHQ6MDtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDowfS5jcm9wcGVyLWhpZGRlbntkaXNwbGF5Om5vbmUhaW1wb3J0YW50fS5jcm9wcGVyLW1vdmV7Y3Vyc29yOm1vdmV9LmNyb3BwZXItY3JvcHtjdXJzb3I6Y3Jvc3NoYWlyfS5jcm9wcGVyLWRpc2FibGVkIC5jcm9wcGVyLWRyYWctYm94LC5jcm9wcGVyLWRpc2FibGVkIC5jcm9wcGVyLWZhY2UsLmNyb3BwZXItZGlzYWJsZWQgLmNyb3BwZXItbGluZSwuY3JvcHBlci1kaXNhYmxlZCAuY3JvcHBlci1wb2ludHtjdXJzb3I6bm90LWFsbG93ZWR9YF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBDcm9wcGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBWaWV3Q2hpbGQoJ2ltYWdlJykgaW1hZ2U6IEVsZW1lbnRSZWY7XG5cbiAgICBASW5wdXQoKSBpbWFnZVVybDogYW55O1xuICAgIEBJbnB1dCgpIHNldHRpbmdzOiBJbWFnZUNyb3BwZXJTZXR0aW5nO1xuICAgIEBJbnB1dCgpIGNyb3Bib3g6IENyb3BwZXIuQ3JvcEJveERhdGE7XG4gICAgQElucHV0KCkgbG9hZEltYWdlRXJyb3JUZXh0OiBzdHJpbmc7XG4gICAgQElucHV0KCkgY3JvcHBlck9wdGlvbnM6IGFueSA9IHt9O1xuXG4gICAgQE91dHB1dCgpIGV4cG9ydCA9IG5ldyBFdmVudEVtaXR0ZXI8SW1hZ2VDcm9wcGVyUmVzdWx0PigpO1xuICAgIEBPdXRwdXQoKSByZWFkeSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyBpc0xvYWRpbmc6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBjcm9wcGVyOiBDcm9wcGVyO1xuICAgIHB1YmxpYyBpbWFnZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgcHVibGljIGxvYWRFcnJvcjogYW55O1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltYWdlIGxvYWRlZFxuICAgICAqIEBwYXJhbSBldlxuICAgICAqL1xuICAgIGltYWdlTG9hZGVkKGV2OiBFdmVudCkge1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFVuc2V0IGxvYWQgZXJyb3Igc3RhdGVcbiAgICAgICAgdGhpcy5sb2FkRXJyb3IgPSBmYWxzZTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBTZXR1cCBpbWFnZSBlbGVtZW50XG4gICAgICAgIGNvbnN0IGltYWdlID0gZXYudGFyZ2V0IGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW1hZ2VFbGVtZW50ID0gaW1hZ2U7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2V0dXAgY2FudmFzIGVsZW1lbnRcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gaW1hZ2Uub2Zmc2V0V2lkdGg7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IGltYWdlLm9mZnNldEhlaWdodDtcblxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgY2FudmFzLmdldENvbnRleHQoJzJkJykuZHJhd0ltYWdlKFxuICAgICAgICAgICAgaW1hZ2UsXG4gICAgICAgICAgICAwLCAwLCBpbWFnZS5uYXR1cmFsV2lkdGgsIGltYWdlLm5hdHVyYWxIZWlnaHQsXG4gICAgICAgICAgICAwLCAwLCB3aWR0aCwgaGVpZ2h0XG4gICAgICAgICk7XG5cblxuICAgICAgICAvL1xuICAgICAgICAvLyBBZGQgY3Jvc3NPcmlnaW4/XG4gICAgICAgIGlmICh0aGlzLmNyb3BwZXJPcHRpb25zLmNoZWNrQ3Jvc3NPcmlnaW4pIGltYWdlLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gSW1hZ2Ugb24gcmVhZHkgZXZlbnRcbiAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHknLCAoKSA9PiB7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gRW1pdCByZWFkeVxuICAgICAgICAgICAgdGhpcy5yZWFkeS5lbWl0KHRydWUpO1xuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gVW5zZXQgbG9hZGluZyBzdGF0ZVxuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFZhbGlkYXRlIGNyb3Bib3ggZXhpc3RhbmNlXG4gICAgICAgICAgICBpZiAodGhpcy5jcm9wYm94KSB7XG5cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vIFNldCBjcm9wYm94IGRhdGFcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3BwZXIuc2V0Q3JvcEJveERhdGEodGhpcy5jcm9wYm94KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2V0dXAgYXNwZWN0IHJhdGlvIGFjY29yZGluZyB0byBzZXR0aW5nc1xuICAgICAgICBsZXQgYXNwZWN0UmF0aW8gPSBOYU47XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzKSB7XG4gICAgICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMuc2V0dGluZ3M7XG4gICAgICAgICAgICBhc3BlY3RSYXRpbyA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2V0IGNyb3Agb3B0aW9uc1xuICAgICAgICAvLyBleHRlbmQgZGVmYXVsdCB3aXRoIGN1c3RvbSBjb25maWdcbiAgICAgICAgdGhpcy5jcm9wcGVyT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgYXNwZWN0UmF0aW8sXG4gICAgICAgICAgICBtb3ZhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHNjYWxhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHpvb21hYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdNb2RlOiAxLFxuICAgICAgICAgICAgY2hlY2tDcm9zc09yaWdpbjogdHJ1ZVxuICAgICAgICB9LCB0aGlzLmNyb3BwZXJPcHRpb25zKTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBTZXQgY3JvcHBlcmpzXG4gICAgICAgIHRoaXMuY3JvcHBlciA9IG5ldyBDcm9wcGVyKGNhbnZhcywgdGhpcy5jcm9wcGVyT3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1hZ2UgbG9hZCBlcnJvclxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqL1xuICAgIGltYWdlTG9hZEVycm9yKGV2ZW50OiBhbnkpIHtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBTZXQgbG9hZCBlcnJvciBzdGF0ZVxuICAgICAgICB0aGlzLmxvYWRFcnJvciA9IHRydWU7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gVW5zZXQgbG9hZGluZyBzdGF0ZVxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4cG9ydCBjYW52YXNcbiAgICAgKiBAcGFyYW0gYmFzZTY0XG4gICAgICovXG4gICAgZXhwb3J0Q2FudmFzKGJhc2U2ND86IGFueSkge1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEdldCBhbmQgc2V0IGltYWdlLCBjcm9wIGFuZCBjYW52YXMgZGF0YVxuICAgICAgICBjb25zdCBpbWFnZURhdGEgPSB0aGlzLmNyb3BwZXIuZ2V0SW1hZ2VEYXRhKCk7XG4gICAgICAgIGNvbnN0IGNyb3BEYXRhID0gdGhpcy5jcm9wcGVyLmdldENyb3BCb3hEYXRhKCk7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY3JvcHBlci5nZXRDcm9wcGVkQ2FudmFzKCk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7IGltYWdlRGF0YSwgY3JvcERhdGEgfTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBDcmVhdGUgcHJvbWlzZSB0byByZXNvbHZlIGNhbnZhcyBkYXRhXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcblxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFZhbGlkYXRlIGJhc2U2NFxuICAgICAgICAgICAgaWYgKGJhc2U2NCkge1xuXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBSZXNvbHZlIHByb21pc2Ugd2l0aCBkYXRhVXJsXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhVXJsOiBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FudmFzLnRvQmxvYihibG9iID0+IHJlc29sdmUoeyBibG9iIH0pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gRW1pdCBleHBvcnQgZGF0YSB3aGVuIHByb21pc2UgaXMgcmVhZHlcbiAgICAgICAgcHJvbWlzZS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLmV4cG9ydC5lbWl0KE9iamVjdC5hc3NpZ24oZGF0YSwgcmVzKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDcm9wcGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jcm9wcGVyL2Nyb3BwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW0Nyb3BwZXJDb21wb25lbnRdLFxuICAgIGV4cG9ydHM6IFtDcm9wcGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyQ3JvcHBlcmpzTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJWaWV3RW5jYXBzdWxhdGlvbiIsIlZpZXdDaGlsZCIsIklucHV0IiwiT3V0cHV0IiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO1FBT0U7U0FBaUI7O29CQUxsQkEsYUFBVSxTQUFDO3dCQUNWLFVBQVUsRUFBRSxNQUFNO3FCQUNuQjs7Ozs7c0NBSkQ7Ozs7Ozs7QUNBQTtRQWdFSTtrQ0FWK0IsRUFBRTswQkFFZCxJQUFJQyxlQUFZLEVBQXNCO3lCQUN2QyxJQUFJQSxlQUFZLEVBQUU7NkJBRVIsSUFBSTtTQUtmOzs7O1FBRWpCLG1DQUFROzs7WUFBUjthQUNDOzs7Ozs7Ozs7O1FBTUQsc0NBQVc7Ozs7O1lBQVgsVUFBWSxFQUFTO2dCQUFyQixpQkEyRUM7OztnQkF2RUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7O2dCQUl2QixJQUFNLEtBQUssSUFBRyxFQUFFLENBQUMsTUFBMEIsRUFBQztnQkFDNUMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7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