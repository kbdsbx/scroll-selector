"use strict"

class ScrollSelector {
    constructor(data, cb) {
        $('<div id="scroll-selector-el"><div class="inner"></div><span class="scroll-selector-selected-top-hr"></span><span class="scroll-selector-selected-bottom-hr"></span><div class="scroll-selector-operator"><a class="scroll-selector-operator-cancel">取消</a><a class="scroll-selector-operator-submit">确定</a></div></div>')
            .appendTo('body');

        this.top_base = 90.0;
        this.data = data;
        this.append_options(this.data);
        this.cb = cb;

        var _this = this;

        $('.scroll-selector-operator-cancel').on('click', function () {
            _this.close();
        });
        $('.scroll-selector-operator-submit').on('click', function () {
            _this.cb.call(_this, _this.make_values(_this.data));
            _this.close();
        });
    }

    _normal_distribution(x) {
        // σ ^ 2 == .7
        return 1 / Math.sqrt(2 * Math.PI * .7) * Math.pow(Math.E, -1 * x * x * .5 / .7);
    }

    update_options(group, level) {
        for (let i in group.options) {
            var opt = group.options[i];
            var delta = i - group.selected;

            level = level || 0;
            var li = $(`.scroll-selector-options-level-${level} li:eq(${i})`);
            li.css('transform', `translate(0, ${this.top_base + delta * 20 * 1.8 - Math.max( -200, Math.min(200, ((delta > 0 ? 1 : -1) * delta * delta * 3)))}px ) scale( ${1 - Math.abs(delta) * .03}, ${1 - Math.abs(delta) * .1} )`);
            li.css('opacity', 0.3 + this._normal_distribution(delta * 3.2));

            if (i == group.selected && opt.sub) {
                var t = level + 1;
                
                while( $( '.scroll-selector-options-level-' + t ).length > 0 ) {
                    $( '.scroll-selector-options-level-' + t ).remove();
                    t++;
                }

                this.append_options( opt.sub, level + 1 );
            }
        }
    }

    append_options(group, level) {
        var top_base = 90.0;
        var _this = this;

        level = level || 0;
        $(`<ul class="scroll-selector-options-level-${level}"></ul>`).appendTo($('#scroll-selector-el .inner'));
        var ul = $( `.scroll-selector-options-level-${level}` );
        for (let i in group.options) {
            var opt = group.options[i];
            var delta = i - group.selected;

            var li = $('<li></li>');
            li.css('transform', `translate(0, ${this.top_base + delta * 20 * 1.8 - Math.max( -200, Math.min(200, ((delta > 0 ? 1 : -1) * delta * delta * 3)))}px ) scale( ${1 - Math.abs(delta) * .03}, ${1 - Math.abs(delta) * .1} )`);
            li.css('opacity', 0.3 + this._normal_distribution(delta * 3.2));
            li.html(opt.name);
            li.appendTo(ul);

            if (i == group.selected && opt.sub) {
                this.append_options( opt.sub, level + 1);
            }
        }
        ul
            .on('touchstart', function (e) {
                e.preventDefault();
                e.stopPropagation();
                _this.touch_start.call(_this, e, group, level);
            })
            .on('touchmove', function (e) {
                e.preventDefault();
                e.stopPropagation();
                _this.touch_move.call(_this, e, group, level);
            })
            .on('touchend', function (e) {
                e.preventDefault();
                e.stopPropagation();
                _this.touch_end.call(_this, e, group, level);
            })
            .on('wheel', function (e) {
                e.preventDefault();
                e.stopPropagation();
                _this.wheel.call(_this, e, group, level);
            });
    }

    touch_start(event, group, level) {
        group.move_start = event.touches[0].clientY;
        group.move_prev = event.touches[0].clientY;
    }

    touch_move(event, group, level) {
        var curr = event.touches[0].clientY;
        var delta = curr - group.move_prev;

        group.selected -= delta / 40.0;
        group.selected = Math.max(0, Math.min(group.options.length - 1, group.selected));
        this.update_options(group, level);

        group.move_prev = curr;
    }

    touch_end(event, group, level) {
        var dec = group.selected - parseInt(group.selected);
        var target = parseInt(group.selected) + (dec > .5 ? 1 : 0);
        var li = $(`.scroll-selector-options-level-${level} li`);
        li.addClass('transition');
        group.selected = target;
        this.update_options(group, level);
        setTimeout(function () {
            li.removeClass('transition');
        }, 200);
    }

    wheel(event, group, level) {
        var li = $(`.scroll-selector-options-level-${level} li`);
        li.addClass('transition');
        group.selected = Math.max(0, Math.min(group.options.length - 1, group.selected + (event.originalEvent.deltaY > 0 ? 1 : -1)));
        this.update_options(group, level);
        setTimeout(function () {
            li.removeClass('transition');
        }, 200);
    }

    close() {
        $('#scroll-selector-el').remove();
    }

    make_values(group, values) {
        values = values || [];

        values.push(group.options[parseInt(group.selected)]);

        // 如果有级联
        if (group.options[parseInt(group.selected)].sub) {
            this.make_values(group.options[parseInt(group.selected)].sub, values);
        }

        return values;
    }
}
