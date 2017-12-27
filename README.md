# Scroll-Selector
### 描述

* 曾经我们的设计建议我在手机上使用这种方式选择单选值以及联动值
* 我以麻烦为理由拒绝
* 当我们最终拿到客户外包给设计公司的设计稿时
* 我哭了
* 
* 躲得过初一躲不过十五

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
                // move-value : "追加的任何值",
            } ],
        }
    } ] }, function( value ) {
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

![Colors](https://github.com/kbdsbx/scroll-selector/raw/master/2017-12-27_151447.png)


### 更多

注入还在开发
级联还在开发，先让我上传备份顺带装个逼

### 版权声明
GNU v3
