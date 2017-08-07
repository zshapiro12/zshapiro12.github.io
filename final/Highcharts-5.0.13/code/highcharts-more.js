/*
 Highcharts JS v5.0.13 (2017-07-27)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(x){"object"===typeof module&&module.exports?module.exports=x:x(Highcharts)})(function(x){(function(b){function r(b,a){this.init(b,a)}var v=b.CenteredSeriesMixin,w=b.each,n=b.extend,h=b.merge,g=b.splat;n(r.prototype,{coll:"pane",init:function(b,a){this.chart=a;this.background=[];a.pane.push(this);this.setOptions(b)},setOptions:function(b){this.options=h(this.defaultOptions,this.chart.angular?{background:{}}:void 0,b)},render:function(){var b=this.options,a=this.options.background,c=this.chart.renderer;
this.group||(this.group=c.g("pane-group").attr({zIndex:b.zIndex||0}).add());this.updateCenter();if(a)for(a=g(a),b=Math.max(a.length,this.background.length||0),c=0;c<b;c++)a[c]&&this.axis?this.renderBackground(h(this.defaultBackgroundOptions,a[c]),c):this.background[c]&&(this.background[c]=this.background[c].destroy(),this.background.splice(c,1))},renderBackground:function(b,a){var c="animate";this.background[a]||(this.background[a]=this.chart.renderer.path().add(this.group),c="attr");this.background[a][c]({d:this.axis.getPlotBandPath(b.from,
b.to,b)}).attr({fill:b.backgroundColor,stroke:b.borderColor,"stroke-width":b.borderWidth,"class":"highcharts-pane "+(b.className||"")})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",borderWidth:1,borderColor:"#cccccc",backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#ffffff"],[1,"#e6e6e6"]]},from:-Number.MAX_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"},updateCenter:function(b){this.center=(b||this.axis||{}).center=
v.getCenter.call(this)},update:function(b,a){h(!0,this.options,b);this.setOptions(this.options);this.render();w(this.chart.axes,function(c){c.pane===this&&(c.pane=null,c.update({},a))},this)}});b.Pane=r})(x);(function(b){var r=b.each,v=b.extend,w=b.map,n=b.merge,h=b.noop,g=b.pick,m=b.pInt,a=b.wrap,c,k,f=b.Axis.prototype;b=b.Tick.prototype;c={getOffset:h,redraw:function(){this.isDirty=!1},render:function(){this.isDirty=!1},setScale:h,setCategories:h,setTitle:h};k={defaultRadialGaugeOptions:{labels:{align:"center",
x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null},maxPadding:0,minPadding:0,showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(a){a=
this.options=n(this.defaultOptions,this.defaultRadialOptions,a);a.plotBands||(a.plotBands=[])},getOffset:function(){f.getOffset.call(this);this.chart.axisOffset[this.side]=0},getLinePath:function(a,c){a=this.center;var e=this.chart,d=g(c,a[2]/2-this.offset);this.isCircular||void 0!==c?c=this.chart.renderer.symbols.arc(this.left+a[0],this.top+a[1],d,d,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0}):(c=this.postTranslate(this.angleRad,d),c=["M",a[0]+e.plotLeft,a[1]+e.plotTop,"L",c.x,
c.y]);return c},setAxisTranslation:function(){f.setAxisTranslation.call(this);this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),this.minPixelPadding=this.isXAxis?this.transA*this.minPointOffset:0)},beforeSetTickPositions:function(){if(this.autoConnect=this.isCircular&&void 0===g(this.userMax,this.options.max)&&this.endAngleRad-this.startAngleRad===2*Math.PI)this.max+=this.categories&&1||this.pointRange||this.closestPointRange||
0},setAxisSize:function(){f.setAxisSize.call(this);this.isRadial&&(this.pane.updateCenter(this),this.isCircular&&(this.sector=this.endAngleRad-this.startAngleRad),this.len=this.width=this.height=this.center[2]*g(this.sector,1)/2)},getPosition:function(a,c){return this.postTranslate(this.isCircular?this.translate(a):this.angleRad,g(this.isCircular?c:this.translate(a),this.center[2]/2)-this.offset)},postTranslate:function(a,c){var e=this.chart,d=this.center;a=this.startAngleRad+a;return{x:e.plotLeft+
d[0]+Math.cos(a)*c,y:e.plotTop+d[1]+Math.sin(a)*c}},getPlotBandPath:function(a,c,p){var e=this.center,d=this.startAngleRad,k=e[2]/2,b=[g(p.outerRadius,"100%"),p.innerRadius,g(p.thickness,10)],f=Math.min(this.offset,0),t=/%$/,h,n=this.isCircular;"polygon"===this.options.gridLineInterpolation?e=this.getPlotLinePath(a).concat(this.getPlotLinePath(c,!0)):(a=Math.max(a,this.min),c=Math.min(c,this.max),n||(b[0]=this.translate(a),b[1]=this.translate(c)),b=w(b,function(a){t.test(a)&&(a=m(a,10)*k/100);return a}),
"circle"!==p.shape&&n?(a=d+this.translate(a),c=d+this.translate(c)):(a=-Math.PI/2,c=1.5*Math.PI,h=!0),b[0]-=f,b[2]-=f,e=this.chart.renderer.symbols.arc(this.left+e[0],this.top+e[1],b[0],b[0],{start:Math.min(a,c),end:Math.max(a,c),innerR:g(b[1],b[0]-b[2]),open:h}));return e},getPlotLinePath:function(a,c){var e=this,d=e.center,b=e.chart,k=e.getPosition(a),f,g,t;e.isCircular?t=["M",d[0]+b.plotLeft,d[1]+b.plotTop,"L",k.x,k.y]:"circle"===e.options.gridLineInterpolation?(a=e.translate(a))&&(t=e.getLinePath(0,
a)):(r(b.xAxis,function(a){a.pane===e.pane&&(f=a)}),t=[],a=e.translate(a),d=f.tickPositions,f.autoConnect&&(d=d.concat([d[0]])),c&&(d=[].concat(d).reverse()),r(d,function(c,e){g=f.getPosition(c,a);t.push(e?"L":"M",g.x,g.y)}));return t},getTitlePosition:function(){var a=this.center,c=this.chart,b=this.options.title;return{x:c.plotLeft+a[0]+(b.x||0),y:c.plotTop+a[1]-{high:.5,middle:.25,low:0}[b.align]*a[2]+(b.y||0)}}};a(f,"init",function(a,d,b){var e=d.angular,p=d.polar,f=b.isX,y=e&&f,h,t=d.options,
m=this.pane=d.pane[b.pane||0],r=m.options;if(e){if(v(this,y?c:k),h=!f)this.defaultRadialOptions=this.defaultRadialGaugeOptions}else p&&(v(this,k),this.defaultRadialOptions=(h=f)?this.defaultRadialXOptions:n(this.defaultYAxisOptions,this.defaultRadialYOptions));e||p?(this.isRadial=!0,d.inverted=!1,t.chart.zoomType=null):this.isRadial=!1;h&&(m.axis=this);a.call(this,d,b);y||!e&&!p||(a=this.options,this.angleRad=(a.angle||0)*Math.PI/180,this.startAngleRad=(r.startAngle-90)*Math.PI/180,this.endAngleRad=
(g(r.endAngle,r.startAngle+360)-90)*Math.PI/180,this.offset=a.offset||0,this.isCircular=h)});a(f,"autoLabelAlign",function(a){if(!this.isRadial)return a.apply(this,[].slice.call(arguments,1))});a(b,"getPosition",function(a,c,b,k,f){var e=this.axis;return e.getPosition?e.getPosition(b):a.call(this,c,b,k,f)});a(b,"getLabelPosition",function(a,c,b,k,f,q,y,h,t){var d=this.axis,e=q.y,p=20,l=q.align,u=(d.translate(this.pos)+d.startAngleRad+Math.PI/2)/Math.PI*180%360;d.isRadial?(a=d.getPosition(this.pos,
d.center[2]/2+g(q.distance,-25)),"auto"===q.rotation?k.attr({rotation:u}):null===e&&(e=d.chart.renderer.fontMetrics(k.styles.fontSize).b-k.getBBox().height/2),null===l&&(d.isCircular?(this.label.getBBox().width>d.len*d.tickInterval/(d.max-d.min)&&(p=0),l=u>p&&u<180-p?"left":u>180+p&&u<360-p?"right":"center"):l="center",k.attr({align:l})),a.x+=q.x,a.y+=e):a=a.call(this,c,b,k,f,q,y,h,t);return a});a(b,"getMarkPath",function(a,c,b,k,f,q,y){var d=this.axis;d.isRadial?(a=d.getPosition(this.pos,d.center[2]/
2+k),c=["M",c,b,"L",a.x,a.y]):c=a.call(this,c,b,k,f,q,y);return c})})(x);(function(b){var r=b.each,v=b.pick,w=b.defined,n=b.seriesType,h=b.seriesTypes,g=b.Series.prototype,m=b.Point.prototype;n("arearange","area",{lineWidth:1,threshold:null,tooltip:{pointFormat:'\x3cspan style\x3d"color:{series.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},trackByArea:!0,dataLabels:{align:null,verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0}},
{pointArrayMap:["low","high"],dataLabelCollections:["dataLabel","dataLabelUpper"],toYData:function(a){return[a.low,a.high]},pointValKey:"low",deferTranslatePolar:!0,highToXY:function(a){var c=this.chart,b=this.xAxis.postTranslate(a.rectPlotX,this.yAxis.len-a.plotHigh);a.plotHighX=b.x-c.plotLeft;a.plotHigh=b.y-c.plotTop;a.plotLowX=a.plotX},translate:function(){var a=this,c=a.yAxis,b=!!a.modifyValue;h.area.prototype.translate.apply(a);r(a.points,function(k){var e=k.low,d=k.high,p=k.plotY;null===d||
null===e?(k.isNull=!0,k.plotY=null):(k.plotLow=p,k.plotHigh=c.translate(b?a.modifyValue(d,k):d,0,1,0,1),b&&(k.yBottom=k.plotHigh))});this.chart.polar&&r(this.points,function(c){a.highToXY(c);c.tooltipPos=[(c.plotHighX+c.plotLowX)/2,(c.plotHigh+c.plotLow)/2]})},getGraphPath:function(a){var c=[],b=[],f,e=h.area.prototype.getGraphPath,d,p,u;u=this.options;var l=this.chart.polar&&!1!==u.connectEnds,q=u.connectNulls,y=u.step;a=a||this.points;for(f=a.length;f--;)d=a[f],d.isNull||l||q||a[f+1]&&!a[f+1].isNull||
b.push({plotX:d.plotX,plotY:d.plotY,doCurve:!1}),p={polarPlotY:d.polarPlotY,rectPlotX:d.rectPlotX,yBottom:d.yBottom,plotX:v(d.plotHighX,d.plotX),plotY:d.plotHigh,isNull:d.isNull},b.push(p),c.push(p),d.isNull||l||q||a[f-1]&&!a[f-1].isNull||b.push({plotX:d.plotX,plotY:d.plotY,doCurve:!1});a=e.call(this,a);y&&(!0===y&&(y="left"),u.step={left:"right",center:"center",right:"left"}[y]);c=e.call(this,c);b=e.call(this,b);u.step=y;u=[].concat(a,c);this.chart.polar||"M"!==b[0]||(b[0]="L");this.graphPath=u;
this.areaPath=this.areaPath.concat(a,b);u.isArea=!0;u.xMap=a.xMap;this.areaPath.xMap=a.xMap;return u},drawDataLabels:function(){var a=this.data,c=a.length,b,f=[],e=this.options.dataLabels,d=e.align,p=e.verticalAlign,u=e.inside,l,q,y=this.chart.inverted;if(e.enabled||this._hasPointLabels){for(b=c;b--;)if(l=a[b])q=u?l.plotHigh<l.plotLow:l.plotHigh>l.plotLow,l.y=l.high,l._plotY=l.plotY,l.plotY=l.plotHigh,f[b]=l.dataLabel,l.dataLabel=l.dataLabelUpper,l.below=q,y?d||(e.align=q?"right":"left"):p||(e.verticalAlign=
q?"top":"bottom"),e.x=e.xHigh,e.y=e.yHigh;g.drawDataLabels&&g.drawDataLabels.apply(this,arguments);for(b=c;b--;)if(l=a[b])q=u?l.plotHigh<l.plotLow:l.plotHigh>l.plotLow,l.dataLabelUpper=l.dataLabel,l.dataLabel=f[b],l.y=l.low,l.plotY=l._plotY,l.below=!q,y?d||(e.align=q?"left":"right"):p||(e.verticalAlign=q?"bottom":"top"),e.x=e.xLow,e.y=e.yLow;g.drawDataLabels&&g.drawDataLabels.apply(this,arguments)}e.align=d;e.verticalAlign=p},alignDataLabel:function(){h.column.prototype.alignDataLabel.apply(this,
arguments)},drawPoints:function(){var a=this.points.length,c,b;g.drawPoints.apply(this,arguments);for(b=0;b<a;)c=this.points[b],c.lowerGraphic=c.graphic,c.graphic=c.upperGraphic,c._plotY=c.plotY,c._plotX=c.plotX,c.plotY=c.plotHigh,w(c.plotHighX)&&(c.plotX=c.plotHighX),b++;g.drawPoints.apply(this,arguments);for(b=0;b<a;)c=this.points[b],c.upperGraphic=c.graphic,c.graphic=c.lowerGraphic,c.plotY=c._plotY,c.plotX=c._plotX,b++},setStackedPoints:b.noop},{setState:function(){var a=this.state,c=this.series,
b=c.chart.polar;w(this.plotHigh)||(this.plotHigh=c.yAxis.toPixels(this.high,!0));w(this.plotLow)||(this.plotLow=this.plotY=c.yAxis.toPixels(this.low,!0));m.setState.apply(this,arguments);this.graphic=this.upperGraphic;this.plotY=this.plotHigh;b&&(this.plotX=this.plotHighX);this.state=a;c.stateMarkerGraphic&&(c.lowerStateMarkerGraphic=c.stateMarkerGraphic,c.stateMarkerGraphic=c.upperStateMarkerGraphic);m.setState.apply(this,arguments);this.plotY=this.plotLow;this.graphic=this.lowerGraphic;b&&(this.plotX=
this.plotLowX);c.stateMarkerGraphic&&(c.upperStateMarkerGraphic=c.stateMarkerGraphic,c.stateMarkerGraphic=c.lowerStateMarkerGraphic)},haloPath:function(){var a=this.series.chart.polar,c;this.plotY=this.plotLow;a&&(this.plotX=this.plotLowX);c=m.haloPath.apply(this,arguments);this.plotY=this.plotHigh;a&&(this.plotX=this.plotHighX);return c=c.concat(m.haloPath.apply(this,arguments))},destroy:function(){this.upperGraphic&&(this.upperGraphic=this.upperGraphic.destroy());return m.destroy.apply(this,arguments)}})})(x);
(function(b){var r=b.seriesType;r("areasplinerange","arearange",null,{getPointSpline:b.seriesTypes.spline.prototype.getPointSpline})})(x);(function(b){var r=b.defaultPlotOptions,v=b.each,w=b.merge,n=b.noop,h=b.pick,g=b.seriesType,m=b.seriesTypes.column.prototype;g("columnrange","arearange",w(r.column,r.arearange,{lineWidth:1,pointRange:null,marker:null,states:{hover:{halo:!1}}}),{translate:function(){var a=this,c=a.yAxis,b=a.xAxis,f=b.startAngleRad,e,d=a.chart,p=a.xAxis.isRadial,u=Math.max(d.chartWidth,
d.chartHeight)+999,l;m.translate.apply(a);v(a.points,function(k){var q=k.shapeArgs,g=a.options.minPointLength,t,m;k.plotHigh=l=Math.min(Math.max(-u,c.translate(k.high,0,1,0,1)),u);k.plotLow=Math.min(Math.max(-u,k.plotY),u);m=l;t=h(k.rectPlotY,k.plotY)-l;Math.abs(t)<g?(g-=t,t+=g,m-=g/2):0>t&&(t*=-1,m-=t);p?(e=k.barX+f,k.shapeType="path",k.shapeArgs={d:a.polarArc(m+t,m,e,e+k.pointWidth)}):(q.height=t,q.y=m,k.tooltipPos=d.inverted?[c.len+c.pos-d.plotLeft-m-t/2,b.len+b.pos-d.plotTop-q.x-q.width/2,t]:
[b.left-d.plotLeft+q.x+q.width/2,c.pos-d.plotTop+m+t/2,t])})},directTouch:!0,trackerGroups:["group","dataLabelsGroup"],drawGraph:n,getSymbol:n,crispCol:m.crispCol,drawPoints:m.drawPoints,drawTracker:m.drawTracker,getColumnMetrics:m.getColumnMetrics,animate:function(){return m.animate.apply(this,arguments)},polarArc:function(){return m.polarArc.apply(this,arguments)},pointAttribs:m.pointAttribs},{setState:m.pointClass.prototype.setState})})(x);(function(b){var r=b.each,v=b.isNumber,w=b.merge,n=b.pick,
h=b.pInt,g=b.Series,m=b.seriesType,a=b.TrackerMixin;m("gauge","line",{dataLabels:{enabled:!0,defer:!1,y:15,borderRadius:3,crop:!1,verticalAlign:"top",zIndex:2,borderWidth:1,borderColor:"#cccccc"},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1},{angular:!0,directTouch:!0,drawGraph:b.noop,fixedBox:!0,forceDL:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],translate:function(){var a=this.yAxis,b=this.options,f=a.center;this.generatePoints();r(this.points,function(c){var d=
w(b.dial,c.dial),e=h(n(d.radius,80))*f[2]/200,k=h(n(d.baseLength,70))*e/100,l=h(n(d.rearLength,10))*e/100,q=d.baseWidth||3,g=d.topWidth||1,m=b.overshoot,t=a.startAngleRad+a.translate(c.y,null,null,null,!0);v(m)?(m=m/180*Math.PI,t=Math.max(a.startAngleRad-m,Math.min(a.endAngleRad+m,t))):!1===b.wrap&&(t=Math.max(a.startAngleRad,Math.min(a.endAngleRad,t)));t=180*t/Math.PI;c.shapeType="path";c.shapeArgs={d:d.path||["M",-l,-q/2,"L",k,-q/2,e,-g/2,e,g/2,k,q/2,-l,q/2,"z"],translateX:f[0],translateY:f[1],
rotation:t};c.plotX=f[0];c.plotY=f[1]})},drawPoints:function(){var a=this,b=a.yAxis.center,f=a.pivot,e=a.options,d=e.pivot,p=a.chart.renderer;r(a.points,function(c){var b=c.graphic,d=c.shapeArgs,k=d.d,f=w(e.dial,c.dial);b?(b.animate(d),d.d=k):(c.graphic=p[c.shapeType](d).attr({rotation:d.rotation,zIndex:1}).addClass("highcharts-dial").add(a.group),c.graphic.attr({stroke:f.borderColor||"none","stroke-width":f.borderWidth||0,fill:f.backgroundColor||"#000000"}))});f?f.animate({translateX:b[0],translateY:b[1]}):
(a.pivot=p.circle(0,0,n(d.radius,5)).attr({zIndex:2}).addClass("highcharts-pivot").translate(b[0],b[1]).add(a.group),a.pivot.attr({"stroke-width":d.borderWidth||0,stroke:d.borderColor||"#cccccc",fill:d.backgroundColor||"#000000"}))},animate:function(a){var c=this;a||(r(c.points,function(a){var b=a.graphic;b&&(b.attr({rotation:180*c.yAxis.startAngleRad/Math.PI}),b.animate({rotation:a.shapeArgs.rotation},c.options.animation))}),c.animate=null)},render:function(){this.group=this.plotGroup("group","series",
this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);g.prototype.render.call(this);this.group.clip(this.chart.clipRect)},setData:function(a,b){g.prototype.setData.call(this,a,!1);this.processData();this.generatePoints();n(b,!0)&&this.chart.redraw()},drawTracker:a&&a.drawTrackerPoint},{setState:function(a){this.state=a}})})(x);(function(b){var r=b.each,v=b.noop,w=b.pick,n=b.seriesType,h=b.seriesTypes;n("boxplot","column",{threshold:null,tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eMaximum: {point.high}\x3cbr/\x3eUpper quartile: {point.q3}\x3cbr/\x3eMedian: {point.median}\x3cbr/\x3eLower quartile: {point.q1}\x3cbr/\x3eMinimum: {point.low}\x3cbr/\x3e'},
whiskerLength:"50%",fillColor:"#ffffff",lineWidth:1,medianWidth:2,states:{hover:{brightness:-.3}},whiskerWidth:2},{pointArrayMap:["low","q1","median","q3","high"],toYData:function(b){return[b.low,b.q1,b.median,b.q3,b.high]},pointValKey:"high",pointAttribs:function(b){var h=this.options,a=b&&b.color||this.color;return{fill:b.fillColor||h.fillColor||a,stroke:h.lineColor||a,"stroke-width":h.lineWidth||0}},drawDataLabels:v,translate:function(){var b=this.yAxis,m=this.pointArrayMap;h.column.prototype.translate.apply(this);
r(this.points,function(a){r(m,function(c){null!==a[c]&&(a[c+"Plot"]=b.translate(a[c],0,1,0,1))})})},drawPoints:function(){var b=this,h=b.options,a=b.chart.renderer,c,k,f,e,d,p,u=0,l,q,y,n,t=!1!==b.doQuartiles,v,A=b.options.whiskerLength;r(b.points,function(g){var m=g.graphic,r=m?"animate":"attr",J=g.shapeArgs,x={},C={},H={},I=g.color||b.color;void 0!==g.plotY&&(l=J.width,q=Math.floor(J.x),y=q+l,n=Math.round(l/2),c=Math.floor(t?g.q1Plot:g.lowPlot),k=Math.floor(t?g.q3Plot:g.lowPlot),f=Math.floor(g.highPlot),
e=Math.floor(g.lowPlot),m||(g.graphic=m=a.g("point").add(b.group),g.stem=a.path().addClass("highcharts-boxplot-stem").add(m),A&&(g.whiskers=a.path().addClass("highcharts-boxplot-whisker").add(m)),t&&(g.box=a.path(void 0).addClass("highcharts-boxplot-box").add(m)),g.medianShape=a.path(void 0).addClass("highcharts-boxplot-median").add(m)),x.stroke=g.stemColor||h.stemColor||I,x["stroke-width"]=w(g.stemWidth,h.stemWidth,h.lineWidth),x.dashstyle=g.stemDashStyle||h.stemDashStyle,g.stem.attr(x),A&&(C.stroke=
g.whiskerColor||h.whiskerColor||I,C["stroke-width"]=w(g.whiskerWidth,h.whiskerWidth,h.lineWidth),g.whiskers.attr(C)),t&&(m=b.pointAttribs(g),g.box.attr(m)),H.stroke=g.medianColor||h.medianColor||I,H["stroke-width"]=w(g.medianWidth,h.medianWidth,h.lineWidth),g.medianShape.attr(H),p=g.stem.strokeWidth()%2/2,u=q+n+p,g.stem[r]({d:["M",u,k,"L",u,f,"M",u,c,"L",u,e]}),t&&(p=g.box.strokeWidth()%2/2,c=Math.floor(c)+p,k=Math.floor(k)+p,q+=p,y+=p,g.box[r]({d:["M",q,k,"L",q,c,"L",y,c,"L",y,k,"L",q,k,"z"]})),
A&&(p=g.whiskers.strokeWidth()%2/2,f+=p,e+=p,v=/%$/.test(A)?n*parseFloat(A)/100:A/2,g.whiskers[r]({d:["M",u-v,f,"L",u+v,f,"M",u-v,e,"L",u+v,e]})),d=Math.round(g.medianPlot),p=g.medianShape.strokeWidth()%2/2,d+=p,g.medianShape[r]({d:["M",q,d,"L",y,d]}))})},setStackedPoints:v})})(x);(function(b){var r=b.each,v=b.noop,w=b.seriesType,n=b.seriesTypes;w("errorbar","boxplot",{color:"#000000",grouping:!1,linkedTo:":previous",tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},
whiskerWidth:null},{type:"errorbar",pointArrayMap:["low","high"],toYData:function(b){return[b.low,b.high]},pointValKey:"high",doQuartiles:!1,drawDataLabels:n.arearange?function(){var b=this.pointValKey;n.arearange.prototype.drawDataLabels.call(this);r(this.data,function(g){g.y=g[b]})}:v,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||n.column.prototype.getColumnMetrics.call(this)}})})(x);(function(b){var r=b.correctFloat,v=b.isNumber,w=b.pick,n=b.Point,h=b.Series,
g=b.seriesType,m=b.seriesTypes;g("waterfall","column",{dataLabels:{inside:!0},lineWidth:1,lineColor:"#333333",dashStyle:"dot",borderColor:"#333333",states:{hover:{lineWidthPlus:0}}},{pointValKey:"y",translate:function(){var a=this.options,c=this.yAxis,b,f,e,d,p,g,l,q,h,n,t=w(a.minPointLength,5),v=t/2,x=a.threshold,D=a.stacking,z;m.column.prototype.translate.apply(this);q=h=x;f=this.points;b=0;for(a=f.length;b<a;b++)e=f[b],l=this.processedYData[b],d=e.shapeArgs,p=D&&c.stacks[(this.negStacks&&l<x?"-":
"")+this.stackKey],z=this.getStackIndicator(z,e.x,this.index),n=p?p[e.x].points[z.key]:[0,l],e.isSum?e.y=r(l):e.isIntermediateSum&&(e.y=r(l-h)),g=Math.max(q,q+e.y)+n[0],d.y=c.translate(g,0,1,0,1),e.isSum?(d.y=c.translate(n[1],0,1,0,1),d.height=Math.min(c.translate(n[0],0,1,0,1),c.len)-d.y):e.isIntermediateSum?(d.y=c.translate(n[1],0,1,0,1),d.height=Math.min(c.translate(h,0,1,0,1),c.len)-d.y,h=n[1]):(d.height=0<l?c.translate(q,0,1,0,1)-d.y:c.translate(q,0,1,0,1)-c.translate(q-l,0,1,0,1),q+=p&&p[e.x]?
p[e.x].total:l),0>d.height&&(d.y+=d.height,d.height*=-1),e.plotY=d.y=Math.round(d.y)-this.borderWidth%2/2,d.height=Math.max(Math.round(d.height),.001),e.yBottom=d.y+d.height,d.height<=t&&!e.isNull?(d.height=t,d.y-=v,e.plotY=d.y,e.minPointLengthOffset=0>e.y?-v:v):e.minPointLengthOffset=0,d=e.plotY+(e.negative?d.height:0),this.chart.inverted?e.tooltipPos[0]=c.len-d:e.tooltipPos[1]=d},processData:function(a){var b=this.yData,k=this.options.data,f,e=b.length,d,p,g,l,q,n;p=d=g=l=this.options.threshold||
0;for(n=0;n<e;n++)q=b[n],f=k&&k[n]?k[n]:{},"sum"===q||f.isSum?b[n]=r(p):"intermediateSum"===q||f.isIntermediateSum?b[n]=r(d):(p+=q,d+=q),g=Math.min(p,g),l=Math.max(p,l);h.prototype.processData.call(this,a);this.options.stacking||(this.dataMin=g,this.dataMax=l)},toYData:function(a){return a.isSum?0===a.x?null:"sum":a.isIntermediateSum?0===a.x?null:"intermediateSum":a.y},pointAttribs:function(a,b){var c=this.options.upColor;c&&!a.options.color&&(a.color=0<a.y?c:null);a=m.column.prototype.pointAttribs.call(this,
a,b);delete a.dashstyle;return a},getGraphPath:function(){return["M",0,0]},getCrispPath:function(){var a=this.data,b=a.length,k=this.graph.strokeWidth()+this.borderWidth,k=Math.round(k)%2/2,f=this.yAxis.reversed,e=[],d,p,g;for(g=1;g<b;g++){p=a[g].shapeArgs;d=a[g-1].shapeArgs;p=["M",d.x+d.width,d.y+a[g-1].minPointLengthOffset+k,"L",p.x,d.y+a[g-1].minPointLengthOffset+k];if(0>a[g-1].y&&!f||0<a[g-1].y&&f)p[2]+=d.height,p[5]+=d.height;e=e.concat(p)}return e},drawGraph:function(){h.prototype.drawGraph.call(this);
this.graph.attr({d:this.getCrispPath()})},setStackedPoints:function(){var a=this.options,b,k;h.prototype.setStackedPoints.apply(this,arguments);b=this.stackedYData?this.stackedYData.length:0;for(k=1;k<b;k++)a.data[k].isSum||a.data[k].isIntermediateSum||(this.stackedYData[k]+=this.stackedYData[k-1])},getExtremes:function(){if(this.options.stacking)return h.prototype.getExtremes.apply(this,arguments)}},{getClassName:function(){var a=n.prototype.getClassName.call(this);this.isSum?a+=" highcharts-sum":
this.isIntermediateSum&&(a+=" highcharts-intermediate-sum");return a},isValid:function(){return v(this.y,!0)||this.isSum||this.isIntermediateSum}})})(x);(function(b){var r=b.Series,v=b.seriesType,w=b.seriesTypes;v("polygon","scatter",{marker:{enabled:!1,states:{hover:{enabled:!1}}},stickyTracking:!1,tooltip:{followPointer:!0,pointFormat:""},trackByArea:!0},{type:"polygon",getGraphPath:function(){for(var b=r.prototype.getGraphPath.call(this),h=b.length+1;h--;)(h===b.length||"M"===b[h])&&0<h&&b.splice(h,
0,"z");return this.areaPath=b},drawGraph:function(){this.options.fillColor=this.color;w.area.prototype.drawGraph.call(this)},drawLegendSymbol:b.LegendSymbolMixin.drawRectangle,drawTracker:r.prototype.drawTracker,setStackedPoints:b.noop})})(x);(function(b){var r=b.arrayMax,v=b.arrayMin,w=b.Axis,n=b.color,h=b.each,g=b.isNumber,m=b.noop,a=b.pick,c=b.pInt,k=b.Point,f=b.Series,e=b.seriesType,d=b.seriesTypes;e("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},
marker:{lineColor:null,lineWidth:1,radius:null,states:{hover:{radiusPlus:0}},symbol:"circle"},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],specialGroup:"group",bubblePadding:!0,zoneAxis:"z",directTouch:!0,pointAttribs:function(b,c){var d=a(this.options.marker.fillOpacity,
.5);b=f.prototype.pointAttribs.call(this,b,c);1!==d&&(b.fill=n(b.fill).setOpacity(d).get("rgba"));return b},getRadii:function(a,b,c,d){var e,k,f,g=this.zData,p=[],l=this.options,q="width"!==l.sizeBy,h=l.zThreshold,u=b-a;k=0;for(e=g.length;k<e;k++)f=g[k],l.sizeByAbsoluteValue&&null!==f&&(f=Math.abs(f-h),b=Math.max(b-h,Math.abs(a-h)),a=0),null===f?f=null:f<a?f=c/2-1:(f=0<u?(f-a)/u:.5,q&&0<=f&&(f=Math.sqrt(f)),f=Math.ceil(c+f*(d-c))/2),p.push(f);this.radii=p},animate:function(a){var b=this.options.animation;
a||(h(this.points,function(a){var c=a.graphic,d;c&&c.width&&(d={x:c.x,y:c.y,width:c.width,height:c.height},c.attr({x:a.plotX,y:a.plotY,width:1,height:1}),c.animate(d,b))}),this.animate=null)},translate:function(){var a,c=this.data,e,f,k=this.radii;d.scatter.prototype.translate.call(this);for(a=c.length;a--;)e=c[a],f=k?k[a]:0,g(f)&&f>=this.minPxSize/2?(e.marker=b.extend(e.marker,{radius:f,width:2*f,height:2*f}),e.dlBox={x:e.plotX-f,y:e.plotY-f,width:2*f,height:2*f}):e.shapeArgs=e.plotY=e.dlBox=void 0},
alignDataLabel:d.column.prototype.alignDataLabel,buildKDTree:m,applyZones:m},{haloPath:function(a){return k.prototype.haloPath.call(this,0===a?0:(this.marker?this.marker.radius||0:0)+a)},ttBelow:!1});w.prototype.beforePadding=function(){var b=this,d=this.len,e=this.chart,f=0,k=d,n=this.isXAxis,m=n?"xData":"yData",w=this.min,x={},D=Math.min(e.plotWidth,e.plotHeight),z=Number.MAX_VALUE,E=-Number.MAX_VALUE,F=this.max-w,B=d/F,G=[];h(this.series,function(d){var f=d.options;!d.bubblePadding||!d.visible&&
e.options.chart.ignoreHiddenSeries||(b.allowZoomOutside=!0,G.push(d),n&&(h(["minSize","maxSize"],function(a){var b=f[a],d=/%$/.test(b),b=c(b);x[a]=d?D*b/100:b}),d.minPxSize=x.minSize,d.maxPxSize=Math.max(x.maxSize,x.minSize),d=d.zData,d.length&&(z=a(f.zMin,Math.min(z,Math.max(v(d),!1===f.displayNegative?f.zThreshold:-Number.MAX_VALUE))),E=a(f.zMax,Math.max(E,r(d))))))});h(G,function(a){var c=a[m],d=c.length,e;n&&a.getRadii(z,E,a.minPxSize,a.maxPxSize);if(0<F)for(;d--;)g(c[d])&&b.dataMin<=c[d]&&c[d]<=
b.dataMax&&(e=a.radii[d],f=Math.min((c[d]-w)*B-e,f),k=Math.max((c[d]-w)*B+e,k))});G.length&&0<F&&!this.isLog&&(k-=d,B*=(d+f-k)/d,h([["min","userMin",f],["max","userMax",k]],function(c){void 0===a(b.options[c[0]],b[c[1]])&&(b[c[0]]+=c[2]/B)}))}})(x);(function(b){function r(a,b){var c=this.chart,f=this.options.animation,e=this.group,d=this.markerGroup,g=this.xAxis.center,h=c.plotLeft,l=c.plotTop;c.polar?c.renderer.isSVG&&(!0===f&&(f={}),b?(a={translateX:g[0]+h,translateY:g[1]+l,scaleX:.001,scaleY:.001},
e.attr(a),d&&d.attr(a)):(a={translateX:h,translateY:l,scaleX:1,scaleY:1},e.animate(a,f),d&&d.animate(a,f),this.animate=null)):a.call(this,b)}var v=b.each,w=b.pick,n=b.seriesTypes,h=b.wrap,g=b.Series.prototype,m=b.Pointer.prototype;g.searchPointByAngle=function(a){var b=this.chart,k=this.xAxis.pane.center;return this.searchKDTree({clientX:180+-180/Math.PI*Math.atan2(a.chartX-k[0]-b.plotLeft,a.chartY-k[1]-b.plotTop)})};g.getConnectors=function(a,b,k,f){var c,d,g,h,l,n,m,r;d=f?1:0;c=0<=b&&b<=a.length-
1?b:0>b?a.length-1+b:0;b=0>c-1?a.length-(1+d):c-1;d=c+1>a.length-1?d:c+1;g=a[b];d=a[d];h=g.plotX;g=g.plotY;l=d.plotX;n=d.plotY;d=a[c].plotX;c=a[c].plotY;h=(1.5*d+h)/2.5;g=(1.5*c+g)/2.5;l=(1.5*d+l)/2.5;m=(1.5*c+n)/2.5;n=Math.sqrt(Math.pow(h-d,2)+Math.pow(g-c,2));r=Math.sqrt(Math.pow(l-d,2)+Math.pow(m-c,2));h=Math.atan2(g-c,h-d);m=Math.PI/2+(h+Math.atan2(m-c,l-d))/2;Math.abs(h-m)>Math.PI/2&&(m-=Math.PI);h=d+Math.cos(m)*n;g=c+Math.sin(m)*n;l=d+Math.cos(Math.PI+m)*r;m=c+Math.sin(Math.PI+m)*r;d={rightContX:l,
rightContY:m,leftContX:h,leftContY:g,plotX:d,plotY:c};k&&(d.prevPointCont=this.getConnectors(a,b,!1,f));return d};h(g,"buildKDTree",function(a){this.chart.polar&&(this.kdByAngle?this.searchPoint=this.searchPointByAngle:this.options.findNearestPointBy="xy");a.apply(this)});g.toXY=function(a){var b,g=this.chart,f=a.plotX;b=a.plotY;a.rectPlotX=f;a.rectPlotY=b;b=this.xAxis.postTranslate(a.plotX,this.yAxis.len-b);a.plotX=a.polarPlotX=b.x-g.plotLeft;a.plotY=a.polarPlotY=b.y-g.plotTop;this.kdByAngle?(g=
(f/Math.PI*180+this.xAxis.pane.options.startAngle)%360,0>g&&(g+=360),a.clientX=g):a.clientX=a.plotX};n.spline&&(h(n.spline.prototype,"getPointSpline",function(a,b,g,f){this.chart.polar?f?(a=this.getConnectors(b,f,!0,this.connectEnds),a=["C",a.prevPointCont.rightContX,a.prevPointCont.rightContY,a.leftContX,a.leftContY,a.plotX,a.plotY]):a=["M",g.plotX,g.plotY]:a=a.call(this,b,g,f);return a}),n.areasplinerange&&(n.areasplinerange.prototype.getPointSpline=n.spline.prototype.getPointSpline));h(g,"translate",
function(a){var b=this.chart;a.call(this);if(b.polar&&(this.kdByAngle=b.tooltip&&b.tooltip.shared,!this.preventPostTranslate))for(a=this.points,b=a.length;b--;)this.toXY(a[b])});h(g,"getGraphPath",function(a,b){var c=this,f,e,d;if(this.chart.polar){b=b||this.points;for(f=0;f<b.length;f++)if(!b[f].isNull){e=f;break}!1!==this.options.connectEnds&&void 0!==e&&(this.connectEnds=!0,b.splice(b.length,0,b[e]),d=!0);v(b,function(a){void 0===a.polarPlotY&&c.toXY(a)})}f=a.apply(this,[].slice.call(arguments,
1));d&&b.pop();return f});h(g,"animate",r);n.column&&(n=n.column.prototype,n.polarArc=function(a,b,g,f){var c=this.xAxis.center,d=this.yAxis.len;return this.chart.renderer.symbols.arc(c[0],c[1],d-b,null,{start:g,end:f,innerR:d-w(a,d)})},h(n,"animate",r),h(n,"translate",function(a){var b=this.xAxis,g=b.startAngleRad,f,e,d;this.preventPostTranslate=!0;a.call(this);if(b.isRadial)for(f=this.points,d=f.length;d--;)e=f[d],a=e.barX+g,e.shapeType="path",e.shapeArgs={d:this.polarArc(e.yBottom,e.plotY,a,a+
e.pointWidth)},this.toXY(e),e.tooltipPos=[e.plotX,e.plotY],e.ttBelow=e.plotY>b.center[1]}),h(n,"alignDataLabel",function(a,b,k,f,e,d){this.chart.polar?(a=b.rectPlotX/Math.PI*180,null===f.align&&(f.align=20<a&&160>a?"left":200<a&&340>a?"right":"center"),null===f.verticalAlign&&(f.verticalAlign=45>a||315<a?"bottom":135<a&&225>a?"top":"middle"),g.alignDataLabel.call(this,b,k,f,e,d)):a.call(this,b,k,f,e,d)}));h(m,"getCoordinates",function(a,b){var c=this.chart,f={xAxis:[],yAxis:[]};c.polar?v(c.axes,function(a){var d=
a.isXAxis,e=a.center,g=b.chartX-e[0]-c.plotLeft,e=b.chartY-e[1]-c.plotTop;f[d?"xAxis":"yAxis"].push({axis:a,value:a.translate(d?Math.PI-Math.atan2(g,e):Math.sqrt(Math.pow(g,2)+Math.pow(e,2)),!0)})}):f=a.call(this,b);return f});h(b.Chart.prototype,"getAxes",function(a){this.pane||(this.pane=[]);v(b.splat(this.options.pane),function(a){new b.Pane(a,this)},this);a.call(this)});h(b.Chart.prototype,"drawChartBox",function(a){a.call(this);v(this.pane,function(a){a.render()})});h(b.Chart.prototype,"get",
function(a,c){return b.find(this.pane,function(a){return a.options.id===c})||a.call(this,c)})})(x)});
