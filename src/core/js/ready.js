(function ($, _, _utils, _obj) {

	_.triggerPostLoad = function (e, tmpl, current, prev, isFilter) {
		if (e.type === "first-load" || (tmpl.initialized && ((e.type === "after-page-change" && !isFilter) || e.type === "after-filter-change"))) {
			try {
				$("body").trigger("post-load");
			} catch(err) {
				console.error(err);
			}
		}
	};

	_.autoDefaults = {
		on: {
			"first-load.foogallery after-page-change.foogallery after-filter-change.foogallery": _.triggerPostLoad
		}
	};

	_.auto = function (options) {
		_.autoDefaults = _obj.merge(_.autoDefaults, options);
	};

	// this automatically initializes all templates on page load
	$(function () {
		$('[id^="foogallery-gallery-"]:not(.fg-ready)').foogallery(_.autoDefaults);
	});

	_utils.ready(function () {
		$('[id^="foogallery-gallery-"].fg-ready').foogallery(_.autoDefaults);
	});

})(
		FooGallery.$,
		FooGallery,
		FooGallery.utils,
		FooGallery.utils.obj
);