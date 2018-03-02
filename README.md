# Scroll-Selector
### 背景

* 曾经我们的设计建议我在手机上使用这种方式选择单选值以及联动值
* 我以麻烦为理由拒绝
* 当我们最终拿到客户外包给设计公司的设计稿时
* 我哭了
* 
* （躲得过初一躲不过十五 :<

### 注意

* 别忘了引入样式文件
* 别忘了引入jQuery
* 编译成ES5请使用额外插件
* 太多联动会导致窗口拥挤，暂不支持选择器换行
* 动态备选项生成器``option_maker``会覆盖传入的``options``值，两者存在一个即可

### 功能

* 固定备选列表的单项选择
* 固定备选列表的联动选择，联动级别不限
* 有限动态备选列表的单项选择
* 有限动态备选列表的联动选择，联动级别不限
* 暂不支持无限动态备选列表（例如无限翻页的日期选择器）

### 接口

```javascript
/**
 * @param selected 默认选项索引
 * @param options 备选值
 * @param options[0].sub 次级联动备选值
 **/
new ScrollSelector( {
    selected : 0,
    options : [ {
        name : "展示项",
        // value : "任何值",
        // more-value : "追加的任何值",
        sub : {
            selected : 0,
            options : [ {
                name : "联动展示项",
                value : "联动值",
                // value : "任何值",
                // more-value : "追加的任何值",
            } ],
        }
    } ],
    /**
     * @param values 所有上级的值
     * @param level 当前选择器的级别
     * @return { selected: 0, options : [ { ... } ] } 返回生成的默认值与备选值列表
     **/
    option_maker : function( values, level ) {
    } }, function( value ) {
    /**
     * value : [ {
     *      name : "选择的一级展示项",
     *      value : "任何值",
     *      more-value: "追加任何值",
     * }, {
     *      name : "选择的二级展示项",
     *      value : "任何值",
     *      more-value: "追加任何值",
     * }, {
     *      name : "选择的三级展示项",
     *      value : "任何值",
     *      more-value: "追加任何值",
     * }, ...更多联动值（如果有） ];
     **/
} );
```

例如:
```javascript
var select_profession_option = {
    selected: 3,
    options: [{
        name: "行政总厨/后厨主管/厨师长",
        value: 0,
        callapse: "#panel-A,#panel-D,#panel-F,#office-A",
    }, {
        name: "普通厨师",
        value: 1,
        callapse: "#panel-A,#panel-D,#panel-F,#office-B",
    }, {
        name: "餐厅老板",
        value: 2,
        callapse: "#panel-A,#panel-E,#panel-F",
    }, {
        name: "餐厅采购",
        value: 3,
        callapse: "#panel-A,#panel-E,#panel-F",
    }, {
        name: "其他餐饮从业者",
        value: 4,
        callapse: "#panel-A,#panel-E,#panel-F",
    }, {
        name: "调味品经销商/批发商",
        value: 5,
        callapse: "#panel-B",
    }, {
        name: "美食爱好者",
        value: 6,
        callapse: "#panel-C",
    }]
};
new ScrollSelector(select_profession_option, function (value) {
    /**
     * value : [{
     *     name: "餐厅采购",
     *     value: 3,
     *     callapse: "#panel-A,#panel-E,#panel-F",
     * }]
     **/
});
```
![JobSelector](https://github.com/kbdsbx/scroll-selector/raw/master/2017-12-27_151447.png)

例如：
```javascript

var select_area_option = {
    selected : 1,
    options: [{
        name : "上海市",
        value : "shs",
        sub : {
            selected : 0,
            options : [{
                name : "市辖区",
                value : "sxq",
                sub : {
                    selected : 0,
                    options : [{
                        name : "杨浦区",
                        value : "ypq",
                    }]
                }
            }]
        }
    }, {
        name : "北京市",
        value : "bjs",
        sub : {
            selected : 1,
            options : [{
                name : "市辖区",
                value : "sxq",
                sub : {
                    selected : 0,
                    options : [{
                        name : "东城区",
                        value : "dcq",
                    }, {
                        name : "西城区",
                        value : "xcq",
                    }]
                }
            }, {
                name : "市郊区",
                value : "sjq",
                sub : {
                    selected : 1,
                    options : [{
                        name : "东郊区",
                        value : "djq",
                    }, {
                        name : "西郊区",
                        value : "xjq",
                    }]
                }
            }]
        }
    }]
}
new ScrollSelector(select_area_option, function(value) {
/**
 * value : [{
 *     name: "北京市",
 *     value: "bjs",
 * }, {
 *     name: "市辖区",
 *     value: "sxq",
 * }, {
 *     name: "西城区",
 *     value: "xcq",
 * }]
 **/
})
```
![CitySelector](https://github.com/kbdsbx/scroll-selector/raw/master/2017-12-27_163021.png)

例如：
```javascript
new ScrollSelector( { option_maker : function( values, level ) {
    if ( level == 0 ) {
        var t = { selected : 0, options: [] };
        for ( var i = (new Date()).getFullYear(); i >= (new Date()).getFullYear() - 99; i-- ) {
            t.options.push( { name : i + "年", value : i } );
        }
        return t;
    }

    if ( level == 1 ) {
        var t = { selected : 0, options : [] };
        for ( var i = 1; i <= 12 ; i++ ) {
            t.options.push( { name : i + "月", value : i } );
        }
        return t;
    }

    if ( level == 2 ) {
        var year = values[0].value;
        var month = values[1].value;
        var day = 30;
        if ( [1, 2, 5, 7, 8, 10, 12].indexOf( month ) != -1 ) {
            day = 31;
        }
        if ( 2 == month ) {
            day = ( !( year % 100) && ! (year % 400) || (year % 100) && !(year % 4 ) ) ? 29 || 28;
        }

        var t = { selected : 0, options : [] };
        for ( var i = 1; i <= day; i++ ) {
            t.options.push( { name : i + "日", value : i } );
        }
        return t;
    }
} }, function(value) {
/**
 * value : [{
 *     name: "2017年",
 *     value: 2017,
 * }, {
 *     name: "12月",
 *     value: 12,
 * }, {
 *     name: "28日",
 *     value: 28,
 * }]
 **/
} )
```
![DateSelector](https://github.com/kbdsbx/scroll-selector/raw/master/2017-12-28_154742.png)

### 更多

无限动态备选项设置要考虑一下到底如何去做，如果有需要的话，没需要就改改Bug，不再更新了

### 版权声明
[GPL v3](https://github.com/kbdsbx/scroll-selector/blob/master/LICENSE)
