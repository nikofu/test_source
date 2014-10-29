/**
 * Created by otani on 2014/10/24.
 */
google.load("feeds", "1");
function initialize() {
    var my_urls = new Array();
    my_urls = ['http://api.plaza.rakuten.ne.jp/ipablog/rss/',
               'http://www.ipa.go.jp/security/rss/alert.rdf',
                'http://www.kaspersky.co.jp/rss/news'];

    var object1 = {};


    for (var num_urls = 0; num_urls < my_urls.length; ++num_urls) {
        /*var url = "http://www.tam-tam.co.jp/tipsnote/feed/"; //フィードURL*/
        /* var url = "http://page2rss.com/rss/83bba87990bfcd328585bd9ea59d08db/"; //OK */
        /* var url = "http://api.plaza.rakuten.ne.jp/ipablog/rss/"; //OK */
        /*var url = "http://www.ipa.go.jp/security/rss/alert.rdf"; //OK IPA緊急 */
        /* var url = "http://www.kaspersky.co.jp/rss/news"; //OK */
        var url = my_urls[num_urls];
        var num = 5; //フィードを読み込む数
        var content = document.getElementById('feed');//フィード表示場所のID名

        //キャッシュ対策
        var d = new Date();
        var q = d.getMonth() + "" + d.getDate() + "" + d.getHours();
        var path = new Array(url + "?" + q); //フィードURL+キャッシュ対策

        var html = ""; //表示用HTMLの準備

        var feed = new google.feeds.Feed(path);
        feed.setNumEntries(num);
        feed.load(function (result) {
            if (!result.error) {

                for (var i = 0; i < result.feed.entries.length; i++) {
                    var entry = result.feed.entries[i];
                    var title = entry.title; //タイトル取得
                    var link = entry.link; //URL取得
                    var day = new Date(entry.publishedDate);//日付取得
                    var author = result.feed.author[i];
                    var contentSnippet = entry.content;
                    ;

                    //日付の整理
                    var y = day.getYear();
                    if (y < 2000) y += 1900;
                    var m = day.getMonth() + 1;
                    if (m < 10) {
                        m = "0" + m;
                    }
                    var d = day.getDate();
                    if (d < 10) {
                        d = "0" + d;
                    }
                    var date = y + "." + m + "." + d;

                    //記事表示用HTMLを格納
                    //html += '<p><a href="' + link + '">' + date + title + contentSnippet + '</a></p>';
                    html += '<p>' + date + '</p>';
                    html += '<p><a href="' + link + '">' + title + '</a></p>';
                    
                    object1['<p>' + date + '</p>'] = '<p><a href="' + link + '">' + title + '</a></p>';
                }
                html += '<br><br>';
                content.innerHTML = html; //指定したID内に出力
                //console.log(object1);
            } else {
                alert(result.error.code + ":" + result.error.message);
            }
            object1 = objectSort(object1);
            console.log(object1);
            content.innerHTML = object1; //指定したID内に出力
        });

    }
}


function objectSort(object) {
    var sorted = {};
    var array = [];
    for (key in object) {
        if (object.hasOwnProperty(key)) {
            array.push(key);
        }
    }

    array.sort();
    for (var i = 0; i < array.length; i++) {
        sorted[array[i]] = object[array[i]];
    }
    //戻り値にソート済みのオブジェクトを指定
    return sorted;
}

google.setOnLoadCallback(initialize);