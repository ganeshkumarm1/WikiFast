var firstTime = true;

$("#search-box input").on('keyup', function(e){
    if(event.which == 13 && $(this).val() != "")
    {
        search($(this).val());
    }
});

function renderResult(result)
{
  var resultHTML = "";
  for(var key in result)
  {
    if(result.hasOwnProperty(key))
    {
      var template = `<a class="wiki-url" target="_blank" href="http://en.wikipedia.org/?curid=${result[key].pageid}">
                      <div class="row each-result">
                      <div>
                        <h3 class="title">${result[key].title}</h3>
                        <p class="content">${result[key].extract}</p>
                      </div>
                    
                  </div></a>`;  
      resultHTML += template;
    }
  }
  $('#result div').empty();
  
  if(firstTime)
  {
    $('#main').css('position', 'static').hide().show('slow');
    firstTime = false;
  }

  $('#result div').append(resultHTML).hide().fadeIn(1000);
  console.log(resultHTML);
}

function search(query)
{
    var queryURL = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageinfo|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+ query +'&callback=?';
    $.getJSON(queryURL ,function(data) {
      if(data.query == undefined)
      {
        $('#result div').empty();
        $('#error').fadeIn(1000);
      }
      else
      {
        $('#error').fadeOut(1000);
        renderResult(data.query.pages);
      }
    });
}


$(document).ready(function() {
    $("input").focus();
});

