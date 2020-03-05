(function($, _, _icons, _utils, _is, _fn, _obj){

    _.Panel.SideArea = _.Panel.Area.extend({
        construct: function(panel, name, options, classes){
            var self = this, cls = panel.cls.sideArea;
            self._super(panel, name, _obj.extend({
                icon: null,
                label: null,
                position: null,
                visible: true,
                toggle: !!panel.opt.buttons[name]
            }, options), _obj.extend({
                toggle: this.__cls(cls.toggle, name, true),
                visible: this.__cls(cls.visible, name),
                position: {
                    top: this.__cls(cls.position.top, name),
                    right: this.__cls(cls.position.right, name),
                    bottom: this.__cls(cls.position.bottom, name),
                    left: this.__cls(cls.position.left, name),
                }
            }, classes));
            self.isVisible = self.opt.visible;
            self.allPositionClasses = Object.keys(self.cls.position).map(function (key) {
                return self.cls.position[key];
            }).join(" ");
            self.registerButton();
        },
        registerButton: function(){
            this.panel.buttons.register(new _.Panel.SideAreaButton(this));
        },
        doCreate: function(){
            if (this._super()){
                if (this.opt.toggle){
                    $('<button/>', {type: 'button'}).addClass(this.cls.toggle)
                        .append(_icons.get("circle-close", this.panel.opt.icons))
                        .on("click.foogallery", {self: this}, this.onToggleClick)
                        .appendTo(this.$inner);
                }
                if (this.isEnabled()){
                    this.panel.$el.toggleClass(this.cls.visible, this.isVisible);
                    this.setPosition( this.opt.position );
                }
                return true;
            }
            return false;
        },
        isEnabled: function(){
            return this.cls.position.hasOwnProperty(this.opt.position);
        },
        canLoad: function(media){
            return media instanceof _.Panel.Media;
        },
        getPosition: function(){
            if (this.isEnabled()){
                return this.cls.position[this.opt.position];
            }
            return null;
        },
        setPosition: function( position ){
            this.opt.position = this.cls.position.hasOwnProperty(position) ? position : null;
            if (_is.jq(this.panel.$el)){
                this.panel.$el.removeClass(this.allPositionClasses).addClass(this.getPosition());
            }
        },
        toggle: function( visible ){
            this.isVisible = _is.boolean(visible) ? visible : !this.isVisible;
            if (_is.jq(this.panel.$el)) {
                this.panel.$el.toggleClass(this.cls.visible, this.isVisible);
            }
        },
        onToggleClick: function(e){
            e.preventDefault();
            e.data.self.toggle();
        }
    });

})(
    FooGallery.$,
    FooGallery,
    FooGallery.icons,
    FooGallery.utils,
    FooGallery.utils.is,
    FooGallery.utils.fn,
    FooGallery.utils.obj
);