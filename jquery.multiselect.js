(function($) {

	var options = {};
	
	$.fn.gs_multiselect = function(params) {
		options = $.extend({}, $.fn.gs_multiselect.defaults, params);

		return this.each(function() {
			var list_options = {};
			var list_names = {};
			var idx = {};
			var rw = Math.min(400,this.offsetWidth);
			var rh = this.offsetHeight;
			var t = document.createElement('table');
			
			var to_sel_old = this.parentNode.replaceChild(t,this);
			var sel_class = to_sel_old.className;
			t.className = 'vpa-multiselect ' + sel_class;
			var to_sel = $('<ul direction = "to" class="list-group border-1 ' + sel_class + '"></ul>').get(0);
			to_sel.innerHTML = to_sel_old.innerHTML.replace(/<option/ig,'<li').replace(/<\/option>/ig,'</li>').replace(/selected=""/ig,'data-selected="1"');
			$('li',to_sel).each (function(){
				this.className = 'list-group-item list-group-item-action ripple';
			});
			
			var from_sel = $('<ul direction = "from" class="list-group border-1 '+ sel_class +'"></ul>').get(0);
			var r=t.insertRow(0);
			if (options.buttons) {
				var c1 = r.insertCell(0);
				var c2 = r.insertCell(1);
				var c3 = r.insertCell(2);
				var btl_all = $('<input type="button" value="+">').get(0);
				var tl_filter = $('<input type="text">').get(0);
				var btr_all=btl_all.cloneNode(true);
				c3.appendChild(btr_all);
				btl_all.onclick = function () {
					$('li',from_sel).each(function() {this.selected =! this.selected;});
					$('li',to_sel).attr('selected',false);
				}
				btr_all.onclick = function () {
					$('li',from_sel).attr('selected',false);
					$('li',to_sel).each(function() {this.selected =! this.selected;});
				}
				r = t.insertRow(1);
			}
			var fc = r.insertCell(0);
			var mc = r.insertCell(1);
			var lc = r.insertCell(2);
			mc.className='vpa-multiselect vpa-multiselect-middle-cell';
			var o_lc = lc;
			
			lc.appendChild(to_sel);
			$(fc).append($(from_sel));
			var sel_name=to_sel_old.getAttribute('name');
			to_sel.setAttribute('name','');
			from_sel.innerHTML=to_sel.innerHTML;
			$(this).html('');
			from_sel.style.height=to_sel.style.height=rh+'px';
			from_sel.style.width=to_sel.style.width=rw+'px';
			var fb = $('<button type="button" class="btn btn-primary bmd-btn-fab mx-1 vpa-multiselect-button-right"><i class="fa fa-angle-double-right" aria-hidden="true"></i></button>');
			var bb = $('<button type="button" class="btn btn-primary bmd-btn-fab mx-1 vpa-multiselect-button-left"><i class="fa fa-angle-double-left" aria-hidden="true"></i></button>');
			mc.appendChild(fb.get(0));
			mc.appendChild(document.createElement('br'));
			mc.appendChild(bb.get(0));
			var list = from_sel.cloneNode(true);
			if (list.innerHTML != '') {
				$('li',list).each(function (i) {
					list_options[this.getAttribute('value')] = i;
					list_names[i] = this.innerHTML;
				})
			}

			to_sel.innerHTML = '';

			// start of functions
			li_select = function () {
				if (typeof this.selected == 'undefined') {
					this.selected = true; 
				} else {
					this.selected = !this.selected;
				}
				$(this).toggleClass('active');
			}

			li_events = function () {
				$('li',to_sel).click (li_select);
				$('li',from_sel).click (li_select);
			}

			fbutton = function () {
				var ol = [];
				var os = from_sel.getElementsByTagName('li');
				for (var key = os.length - 1; key >= 0 ;key --) {
					if (os[key].getAttribute('data-selected') == 1 || os[key].selected ) {
						var val = os[key].getAttribute('value');
						var obj = os[key];
						ol.push(obj);
						idx[val] = list_options[val];
						
						to_sel.appendChild(obj);
						obj.selected = false;
						$(obj).removeClass('active');
						obj.setAttribute('data-selected',1);
					}
				}

				$('input',o_lc).remove();
				var os = to_sel.getElementsByTagName('li');
				for (var key = os.length - 1; key >= 0 ;key --) {
					var val = os[key].getAttribute('value');
					o_lc.appendChild($('<input type="hidden" name="' + sel_name + '" value="' + val + '">').get(0));
				}
			}
		
	
			bbutton = function (){
				var ol = [];
				var os = to_sel.getElementsByTagName('li');
				for (var key = os.length - 1; key >= 0; key --) {
					var obj = os[key];
					console.log(obj.selected);
					if ( obj.selected ) {
						ol.push(obj);
						from_sel.appendChild(obj);
						obj.removeAttribute('data-selected');
						obj.selected = false;
						$(obj).removeClass('active');
					}
				}

				$('input',o_lc).remove();
				var os = to_sel.getElementsByTagName('li');
				for (var key = os.length - 1; key >= 0 ;key --) {
					var val = os[key].getAttribute('value');
					o_lc.appendChild($('<input type="hidden" name="'+sel_name+'" value="'+val+'">').get(0));
				}
			}

			// end of functions
			fb.click(fbutton);
			bb.click(bbutton);
			$(from_sel).dblclick(fbutton);
			$(to_sel).dblclick(bbutton);
			fbutton();
			li_events();
		});
	};
	
	
	
	$.fn.gs_multiselect.defaults = {
		
	};
	
})(jQuery);

