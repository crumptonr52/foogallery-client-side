(function ($, _, _utils, _is, _fn) {

	_.debug = new _utils.Debugger("__FooGallery__");

	/**
	 * @summary The url of an empty 1x1 pixel image used as the default value for the `placeholder` and `error` {@link FooGallery.defaults|options}.
	 * @memberof FooGallery
	 * @name emptyImage
	 * @type {string}
	 * @default "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
	 */
	_.emptyImage = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

	/**
	 * @summary The name to use when getting or setting an instance of a {@link FooGallery.Template|template} on an element using jQuery's `.data()` method.
	 * @memberof FooGallery
	 * @name dataTemplate
	 * @type {string}
	 * @default "__FooGallery__"
	 */
	_.dataTemplate = "__FooGallery__";

	/**
	 * @summary The name to use when getting or setting an instance of a {@link FooGallery.Item|item} on an element using jQuery's `.data()` method.
	 * @memberof FooGallery
	 * @name dataItem
	 * @type {string}
	 * @default "__FooGalleryItem__"
	 */
	_.dataItem = "__FooGalleryItem__";

	_.init = function (options, element) {
		return _.template.make(options, element).initialize();
	};

	_.initAll = function (options) {
		return _fn.when($(".foogallery").map(function (i, element) {
			return _.init(options, element);
		}).get());
	};

	/**
	 * @summary Expose FooGallery as a jQuery plugin.
	 * @memberof external:"jQuery.fn"#
	 * @function foogallery
	 * @param {(object|string)} [options] - The options to supply to FooGallery or one of the supported method names.
	 * @param {external:"jQuery.fn"~readyCallback} [ready] - A callback executed once each template initialized is ready.
	 * @returns {jQuery}
	 * @example {@caption The below shows using this method in its simplest form, initializing a template on pre-existing elements.}{@lang html}
	 * <!-- The container element for the template -->
	 * <div id="gallery-1" class="foogallery">
	 *   <!-- A single item -->
	 *   <div class="fg-item" data-id="[item.id]">
	 *     <div class="fg-item-inner">
	 *       <a class="fg-thumb" href="[item.href]">
	 *         <img class="fg-image" width="[item.width]" height="[item.height]"
	 *          title="[item.title]" alt="[item.description]"
	 *          data-src="[item.src]"
	 *          data-srcset="[item.srcset]" />
	 *         <!-- Optional caption markup -->
	 *         <div class="fg-caption">
	 *          <div class="fg-caption-inner">
	 *           <div class="fg-caption-title">[item.title]</div>
	 *           <div class="fg-caption-desc">[item.description]</div>
	 *          </div>
	 *         </div>
	 *       </a>
	 *     </div>
	 *   </div>
	 *   <!-- Any number of additional items -->
	 * </div>
	 * <script>
	 *  jQuery(function($){
	 * 		$("#gallery-1").foogallery();
	 * 	});
	 * </script>
	 * @example {@caption Options can be supplied directly to the `.foogallery()` method or by supplying them using the `data-foogallery` attribute. If supplied using the attribute the value must follow [valid JSON syntax](http://en.wikipedia.org/wiki/JSON#Data_types.2C_syntax_and_example) including quoted property names. If the same option is supplied in both locations as it is below, the value from the attribute overrides the value supplied to the method, in this case `lazy` would be `true`.}{@lang html}
	 * <!-- Supplying the options using the attribute -->
	 * <div id="gallery-1" class="foogallery fg-responsive" data-foogallery='{"lazy": true}'>
	 *  <!-- Items -->
	 * </div>
	 * <script>
	 *  jQuery(function($){
	 * 		// Supply the options directly to the method
	 * 		$("#gallery-1").foogallery({
	 * 			lazy: false
	 * 		});
	 * 	});
	 * </script>
	 */
	$.fn.foogallery = function (options, ready) {
		return this.each(function (i, element) {
			var template = $.data(element, _.dataTemplate);
			if (_is.string(options)) {
				if (template instanceof _.Template) {
					switch (options) {
						case "layout":
							template.layout();
							return;
						case "destroy":
							template.destroy();
							return;
					}
				}
			} else {
				if (template instanceof _.Template) {
					template.destroy().then(function(){
						_.template.make(options, element).initialize().then(function (template) {
							if (_is.fn(ready)) {
								ready(template);
							}
						});
					});
				} else {
					_.template.make(options, element).initialize().then(function (template) {
						if (_is.fn(ready)) {
							ready(template);
						}
					});
				}
			}
		});
	};

	/**
	 * @summary If supplied this method is executed after each template is initialized.
	 * @callback external:"jQuery.fn"~readyCallback
	 * @param {FooGallery.Template} template - The template that was initialized.
	 * @example {@caption The below shows an example of supplying this callback to the `.foogallery()` method.}
	 * jQuery(".foogallery").foogallery({
	 * 	// Options here
	 * }, function(template){
	 * 	// Called after each template is initialized on the matched elements
	 * });
	 */

	/**
	 * @summary Checks if the supplied image src is cached by the browser.
	 * @param {string} src - The image src to check.
	 * @returns {boolean}
	 */
	_.isCached = function(src){
		var img = new Image();
		img.src = src;
		var complete = img.complete;
		img.src = "";
		img = null;
		return complete;
	};

})(
		FooGallery.$,
		FooGallery,
		FooGallery.utils,
		FooGallery.utils.is,
		FooGallery.utils.fn
);