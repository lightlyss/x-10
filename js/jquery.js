
(function($){
	$.fn.extend({
		
		mangaviewer:function(options){
			
			var o =this;
			o.options =options;
			
			// ページャーの生成元要素
			$(o).append('<div class="sheet"></div><div id="page-link" class="btn-toolbar"><div class="btn-group"></div><div id="page-list"></div></div>');
			
			//-------------------------------------
			// 初期化処理
			o.init_set =function(o){
				
				o.view_create(o);
				o.pager_create(o);
				
			}
			
			//-------------------------------------
			// ページ表示処理
			o.view_create =function(o){
				
				// ページ送り番号の取得
				var ejections =o.get_ejection_num();
				
				// 表示要素の生成
				if (o.options.page_ejection == "left") {
					o.view_obj_create_left(o, ejections);
				} else {
					o.view_obj_create_right(o, ejections);
				}

			}
			
			//-------------------------------------
			// ページ送り番号取得
			o.get_ejection_num =function(){
				
				var ejections =new Array();
				
				// シートから現在ページを取得
				ejections["sheet_num"] =parseInt($('div.sheet').attr('id'));
				
				// シートが無い場合初期値を設定
				if (!ejections["sheet_num"]) {
					ejections["sheet_num"] =1;
				}
				// 実ページ数を取得
				var current_num =ejections["sheet_num"];　//*2削除

				
				// 現在ページから表示するページを判定
				ejections["above_num"] =current_num;
				ejections["below_num"] =current_num - 1;
				
				// 最大ページ数を設定
				var max_view =Math.ceil(o.options.page);
				
				// 次のページと前のページを取得
				ejections["next_page"] =ejections["sheet_num"] + 1;
				ejections["prev_page"] =ejections["sheet_num"] - 1;
				// 存在しないページが設定されている場合は空に
				if (max_view < ejections["next_page"]) {
					ejections["next_page"] ="";
				}
				if (1  > ejections["prev_page"]) {
					ejections["prev_page"] ="";
				}
				
				return ejections;
			}

			// 表示要素生成(右送り)
			o.view_obj_create_right =function(o, ejections){
			
				// 画像表示
				$('div.sheet').attr("id", ejections["sheet_num"]).children().remove();
				
				if (o.options.page >= ejections["above_num"]) {
					$('#'+ejections["sheet_num"]).prepend('<img id="page'+ ejections["above_num"] +'" class="right_page" rel="' + ejections["next_page"] +'" src="' + o.options.path + '/' + ejections["above_num"] + '.' + o.options.ext + '">');
					// $('#'+ejections["sheet_num"]).prepend('<img id="page'+ ejections["below_num"] +'" class="left_page" rel="' + ejections["next_page"] +'" src="' + o.options.path + '/' + ejections["below_num"] + '.' + o.options.ext + '">');
				}
					// $('#'+ejections["sheet_num"]).prepend('<img id="page'+ ejections["above_num"] +'" class="right_page" rel="' + ejections["prev_page"] +'" src="' + o.options.path + '/' + ejections["above_num"] + '.' + o.options.ext + '">');
				
				// 次へと前へのページ設定
				if ($('div.btn-group').children().size()){
					$("button#btn-next").attr("rel", ejections["next_page"]);
					$("button#btn-prev").attr("rel", ejections["prev_page"]);
				} else {
					$('div.btn-group').prepend('<button id="btn-next" rel="' + ejections["next_page"] + '" class="btn">next</button>');
					$('div.btn-group').prepend('<button id="btn-prev" rel="' + ejections["prev_page"] + '" class="btn">prev</button>');
				}
			}
			
			//-------------------------------------
			// ページャー生成処理
			o.pager_create =function(o){
				
				// シートから現在ページを取得
				var sheet_num =$('div.sheet').attr('id');
				
				// ページャーが生成。既に生成済みの場合アクティブボタンを変更
				if ($('#page-list').children().size()) {
					
					$('button.active').removeClass("active");
					$('button.' + sheet_num).addClass('active');
					
				} else {
				
					// 最大ページ数を設定
					var max_view =Math.ceil(o.options.page);　　// 割る２削除
			
					// ページャーを生成。現在ページはアクティブに
					for(i=1;i<=max_view;i++){
						if (o.options.page_ejection == "left") {
							$('#page-list').prepend('<button class="btn ' + i +'" rel="' + i +'">'+ i +'</button>');
						}else{
							$('#page-list').append('<button class="btn ' + i +'" rel="' + i +'">'+ i +'</button>');
						}
						if (sheet_num == i) {
							$('button.' + i).addClass('active');
						}
					}
				}
			}
			
			//-------------------------------------
			// ページ更新処理
			o.paging =function(i){
				if (i) {
					$('div.sheet').attr('id', i);
					o.view_create(o);
					o.pager_create(o);
				}
			}
			
			// 初期化処理
			o.init_set(o);
			
			//-------------------------------------
			// ページ更新処理
			$("button.btn").on("click",function(){
				o.paging($(this).attr('rel'));
			});	
			$(".sheet").on("click","img",function(){
				o.paging($(this).attr('rel'));
			});
		}
	});
	
})(jQuery);

