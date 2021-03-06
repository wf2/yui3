YUI.add('column-legend-styles-tests', function(Y) {
    var suite = new Y.Test.Suite("Charts: ColumnLegendStyles"),
        testBed = Y.Node.create('<div style="position:absolute;top:0px;left:0px;width:800px;height:600px" id="mychart"></div>'),
        columnStylesTest,
        columnGlobalStylesTest,
        dataProvider = [
            {category:"5/1/2010", miscellaneous:2000, expenses:3700, revenue:2200}, 
            {category:"5/2/2010", miscellaneous:50, expenses:9100, revenue:100}, 
            {category:"5/3/2010", miscellaneous:400, expenses:1100, revenue:1500}, 
            {category:"5/4/2010", miscellaneous:200, expenses:1900, revenue:2800}, 
            {category:"5/5/2010", miscellaneous:5000, expenses:5000, revenue:2650}
        ],
        seriesStyles = {
            miscellaneous: {
                marker: {
                    fill: {
                        color: "#f00"
                    }
                }
            },
            expenses: {
                marker: {
                    fill: {
                        color: "#00f"
                    }
                }
            },
            revenue: {
                marker: {
                    fill: {
                        color: "#eee"
                    }
                }
            }
        };
    Y.one('body').append(testBed);
    function ChartsLegendStylesTest(cfg)
    {
        ChartsLegendStylesTest.superclass.constructor.apply(this);
        this.attrCfg = cfg;
    }

    Y.extend(ChartsLegendStylesTest, Y.Test.Case, {
        setUp: function() {
            this.chart = new Y.Chart(this.attrCfg);
        },
        
        tearDown: function() {
            this.chart.destroy(true);
        },

        testStyles: function() {
            var chart = this.chart,
                legend = chart.get("legend"),
                items = legend.get("items"),
                item,
                marker,
                color,
                i,
                shape,
                styles
                len = items.length;
            for(i = 0; i < len; i = i + 1) {
                item = items[i];
                marker = item.shape,
                styles = seriesStyles[item.text];
                color = styles.marker.fill.color;
                shape = styles.marker.shape || "circle";
                Y.Assert.areEqual(shape, marker.name, "The marker should be a " + shape + ".");
                Y.Assert.areEqual(color, marker.get("fill").color, "The marker color should be " + color + ".");
            }
        }
    });

    columnStylesTest = new ChartsLegendStylesTest({
        dataProvider: dataProvider,
        seriesCollection: [{
                xKey: "category",
                yKey: "miscellaneous",
                styles: seriesStyles.miscellaneous
            }, {
                xKey: "category",
                yKey: "expenses",
                styles: seriesStyles.expenses
            }, {
                xKey: "category",
                yKey: "revenue",
                styles: seriesStyles.revenue
        }],
        legend: {
            position: "right"
        },
        type: "column",
        render: "#mychart"
    });
    
    columnGlobalStylesTest = new ChartsLegendStylesTest({
        dataProvider: dataProvider,
        styles: {
            series: seriesStyles
        },
        legend: {
            position: "right"
        },
        type: "column",
        render: "#mychart"
    });
    
    suite.add(columnStylesTest);
    suite.add(columnGlobalStylesTest);
    Y.Test.Runner.add(suite);
    testBed.destroy(true);
}, '@VERSION@' ,{requires:['charts-legend', 'test']});
