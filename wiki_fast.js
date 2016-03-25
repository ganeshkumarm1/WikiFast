$("#search_box").keyup(function(event){
    if(event.keyCode == 13){
        $("#search_button").click();
    }
});

var x = 1;
function search()
{
var search_word = document.getElementById("search_box").value;
  var playListURL = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageinfo|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+search_word+'&callback=?';
var title = "";
var content = "";

  if(x > 1)
       {
         $('#result').empty();
       }
  $.getJSON(playListURL ,function(data) {
    $.each(data.query.pages, function(i, item) { 
      title = JSON.stringify((data.query.pages)[i].title)
      content = JSON.stringify((data.query.pages)[i].extract)
    //  document.write(title+content);
     
      
      var p_title = document.createElement("p");
      p_title.setAttribute("id","p_title");
     var title_node = document.createTextNode(title); 
     p_title.appendChild(title_node); 
      
      var p_content = document.createElement("p");
      p_content.setAttribute("id","p_content");
     var content_node = document.createTextNode(content); 
     p_content.appendChild(content_node); 
      
      var division = document.createElement("div");
      division.setAttribute("id","each_result");
      
      var link = document.createElement("a");
      link.setAttribute("href","http://en.wikipedia.org/?curid="+JSON.stringify((data.query.pages)[i].pageid));
      link.setAttribute("target","_blank");
      link.setAttribute("id","link");
      $("#result").append(link);
      
      $("#result").children("#link").last().append(division);
      
      $("#result").children("#link").last().children("#each_result").last().append(p_title);
      $("#result").children("#link").last().children("#each_result").last().append(p_content);
      
     });
x++;
});

}




