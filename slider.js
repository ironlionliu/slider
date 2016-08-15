(function(win,doc,$){
	win.CustomSlider = CustomSlider;
	function CustomSlider(opt){
		this._init(opt);
		}
	$.extend(CustomSlider.prototype,{
		_init: function(opt){
			var self = this;
			self.opt = {
				scrollDir : "y",
				contentSelector : "",
				barSelector : "",
				sliderSelector : "",
				};
			$.extend(true, self.opt, opt||{});
			self._initDom();
			return self;
			},
		_initDom: function(){
			var self = this;
			var opt = self.opt;
			self.content = $(opt.contentSelector);
			self.bar = $(opt.barSelector);
			self.slider = $(opt.sliderSelector);
			self.doc = $(doc);
			self._initDragEvent();
			},
		_scrollto : function(Y){
			var self = this;
			var slider = self.slider;
			var content = self.content;
			var bar = self.bar;
			var sliderHeight = slider.height();
			var barTop = bar[0].getBoundingClientRect().top;
			var barBottom = bar[0].getBoundingClientRect().bottom;
			if((Y - barTop) < sliderHeight*0.5){
				slider[0].style.top = 0 + "px";
				content.scrollTop(0);
			}else if((Y - barTop) > (barBottom - sliderHeight)){
				slider[0].style.top = (barBottom - barTop - sliderHeight) + "px";
				content.scrollTop(content[0].scrollHeight-content.height());
			}else{
				slider[0].style.top = Y - barTop - 0.5*slider.height() + "px";
				
				var distance = (Y - barTop - 0.5*sliderHeight)*(content[0].scrollHeight-content.height())/(barBottom-barTop - sliderHeight);
				content.scrollTop(distance);
				
				
			}
			
			},
		_initDragEvent: function(){
			var self = this;
			var slider = self.slider;
			var content = self.content;
			var bar = self.bar;
			var sliderHeight = slider.height();
			var barTop = bar[0].getBoundingClientRect().top;
			var barBottom = bar[0].getBoundingClientRect().bottom;
			
			if(slider[0]){
				var doc = self.doc;
				
				
				function scrollto111(Y){
					if((Y - barTop) < sliderHeight*0.5){
						slider[0].style.top = 0 + "px";
					}else if((Y - barTop) > (barBottom - sliderHeight)){
						slider[0].style.top = (barBottom - barTop - sliderHeight) + "px";
					}else{
						slider[0].style.top = Y - barTop - 0.5*slider.height() + "px";
					}
					var distance = (Y - barTop - sliderHeight*0.5)*(content[0].scrollHeight-content.height())/(barBottom-barTop);
					content.scrollTop(distance);
				}
					
				content.on("mousewheel DOMMouseScroll",function(e){
					var scale = bar.height()*0.1;
					e.preventDefault();
					var oEv = e.originalEvent;
					var	wheelRange = oEv.wheelDelta ? -oEv.wheelDelta/120 : (oEv.detail||0)/3;
					wheelRange = wheelRange * scale;
					if(!slider[0].style.top){
						slider[0].style.top = "0px";
						}
					self._scrollto((parseFloat(slider[0].style.top)) + barTop + 0.5*slider.height() +wheelRange);
					});
				function clickBar(e){
					/*
					var scale = bar.height()*0.1;
					if(!slider[0].style.top){
						slider[0].style.top = "0px";
						}
					if(e.pageY > (parseFloat(slider[0].style.top)) + barTop + 0.5*slider.height()){
						self._scrollto((parseFloat(slider[0].style.top)) + barTop + 0.5*slider.height()  + scale);
						
					}else if(e.pageY < (parseFloat(slider[0].style.top)) + barTop + 0.5*slider.height()){
						self._scrollto((parseFloat(slider[0].style.top)) + barTop + 0.5*slider.height()  - scale);
					}/**/
				}
				bar.on("click.clickroll",function(e){clickBar(e)});
				slider.on("mousedown.scroll",function(e){
					/*绑定滑块事件*/
					e.preventDefault();
					bar.off(".clickroll");
					doc.on("mousemove.scroll",function(e){
						//sliderDom.style.top = e.pageY - barY - 0.5*slider.height() + "px";
						self._scrollto(e.pageY);
						/*移动滑块，doc绑定*/
						
						//console.log(doc.scrollTop());
					}).on("mouseup.scroll",function(e){
						/*松开滑块，doc解除绑定*/
						bar.on("click.clickroll",function(e){clickBar(e)});
						doc.off(".scroll");
					});
				});
			}
			},
		gotoAnchor : function(scrollAnchor){
			var self = this;
			var slider = self.slider;
			var content = self.content;
			var bar = self.bar;
			var sliderHeight = slider.height();
			var barTop = bar[0].getBoundingClientRect().top;
			var barBottom = bar[0].getBoundingClientRect().bottom;
			//var distance = $(scrollAnchor).position().top + content.scrollTop();
			var distance = (barBottom - barTop - sliderHeight)*($(scrollAnchor).position().top + content.scrollTop())/(content[0].scrollHeight-content.height()) + barTop + 0.5*sliderHeight;
			
			self._scrollto(distance);
		}
		
		
		});
	
})(window,document,jQuery);