google.load("feeds", "1");
function initialize() {

  //フィードURL
  var my_urls = new Array();
  my_urls.push('http://kancolle.doorblog.jp/index.rdf');
  my_urls.push('https://www.jpcert.or.jp/rss/jpcert.rdf');
  my_urls.push('http://blog.security.biglobe.ne.jp/rss/index.rdf');
  //my_urls.push();

  var num = 15; //フィードを読み込む数
  var content = document.getElementById('feed');//フィード表示場所のID名
  var all_feeds = 0;
 //ここからソートのプログラム
 //var my_object = new Array();
 var my_object = new Array();
 var my_title_object = new Array();
 var my_day = new Array();

    for (var feed_num = 0; feed_num < my_urls.length; feed_num++) {
        var url = my_urls[feed_num];

          //キャッシュ対策
          var d = new Date();
          var q = d.getMonth()+""+d.getDate()+""+d.getHours();
          var path = new Array(url + "?" + q); //フィードURL+キャッシュ対策

          //var html =""; //表示用HTMLの準備

          var feed = new google.feeds.Feed(path);
          feed.setNumEntries(num);
          feed.load(function　(result) {
            if (!result.error) {

              for (var i = 0; i < result.feed.entries.length; i++) {
                var entry = result.feed.entries[i];
                var title = entry.title; //タイトル取得
                var link = entry.link; //URL取得
                var day = new Date(entry.publishedDate); //日付取得
                //日付の整理
                var y = day.getYear();
                  if (y < 2000) y += 1900;
                var m = day.getMonth() + 1;
                  if (m < 10) {m = "0" + m;}
                var d = day.getDate();
                  if (d < 10) {d = "0" + d;}
                var date = y + "."+ m +"."+ d;

                //ソートする要素を格納
                all_feeds += 1;

                //my_object[i] = date + '<p><a href="' + link + '">' + title + '</a></p>';
                my_object[date + " " + title] = '<p><a href="' + link + '">' + title + '</a></p>';
                my_day[date + " " + title] = date;
                my_title_object.push(date + " " + title);

                //html += '<p><a href="' + link + '">' + date + title + '</a></p>';
                //html += my_object[i];
                }
              //content.innerHTML = html;　//指定したID内に出力
            }else{
              alert(result.error.code + ":" + result.error.message);
            }

            my_title_object = my_title_object.sort();
            var day_display = 0;
            var html =""; //表示用HTMLの準備

            for(var i = 0; i < my_title_object.length; i++) {
                if(day_display != my_day[my_title_object[i]]){
                    day_display = my_day[my_title_object[i]];
                    html += day_display;
                }

                console.log(my_title_object[i]);
                html += my_object[my_title_object[i]];
            }
            console.log("all " ,all_feeds);
            content.innerHTML = html;　//指定したID内に出力
          });
     }
}
google.setOnLoadCallback(initialize);