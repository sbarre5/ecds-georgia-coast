// TOGGLE ICON IN YELLOW COLLAPSE MAP BUTTON

$(document).ready(function() {
  var mapWidth = ($(window).width()) - ($("#cont").width()) - 75
  console.log(mapWidth)
  $(".map").css("width", mapWidth)
  $('[id*="_island"]').hover(function(e) {
    console.log($(this).attr('data-toggle'))
  });

});

function alignRelatedBoxes() {
  var maxHeight = 0;
  var offset = 50;
  $(".related").each(function(index, related) {
    if (maxHeight < $(related).height()){
      maxHeight = $(related).height();
    };
  });

  $("#elements .item").each(function(index, item) {
    $(item).height(maxHeight + offset);
  });
}

function showThisIsland(layerID) {
  console.log("show")
}

$('#hideMap').click(function() {
  $('#cont').toggle();
  $(this).toggleClass("fa-caret-right collapse");
  $(".map").toggleClass("full-width");
  setTimeout(function(){ mapbox.invalidateSize()}, 1);
  // older code
  // map.remove()
  // $("#map_canvas").append("<div id='map'></div>");
  // getLeaflet(31.630837, -81.152171,13)
});

function formatIsotope() {
  var allTags = ""
  var allTagsArray = []
  $("#elements > .element").each(function() {
    var theseContentTags = ""
    allTags = ""
    theseTags = ""
    var thisElement = $(this)
    var thisContentType = $(this).attr("data-content-type")
    if (thisContentType == 'photos') {
      $(this).find("i").addClass('fa fa-camera red')
    } else if (thisContentType == 'video') {
      $(this).find("i").addClass('fa fa-video-camera green')
    } else if (thisContentType == 'gallery') {
      $(this).find("i").addClass('fa fa-video-camera blue')
    } else if (thisContentType == 'article') {
      $(this).find("i").addClass('fa fa-file-text-o orange')
    } else if (thisContentType == 'panorama') {
      $(this).find("i").addClass('fa fa-circle-o-notch purple')
    } else {
      $(this).find("i").css("display", "none")
    }
    $(this).addClass(thisContentType)
    var theseContentTags = $(this).attr("data-tags")
    theseContentTags = theseContentTags.toString()

    $(this).addClass(theseContentTags)
    allTags = allTags + theseContentTags.split(" ")
    theseTags = allTags.split(",")
    console.log(theseTags)
    $.each(theseTags, function(index, value) {
      $(thisElement).find("#tags").append("<a class='tag'>" + value + "</a>")
    });
    allTagsArray.push(allTags.split(","))
  });

  var processedTags = []

  $.each(allTagsArray, function(key1, value1) {
    $.each(value1, function(key1, value1) {
      if ($.inArray(value1, processedTags) == -1) {
        $("#isotope-tags").append("<button class='tag' data-filter='" + value1 + "'>" + value1 + "</button>")
        processedTags.push(value1)
      }
    });
  });

  var $boxs = $("#elements > .element");
  var $btns = $(".filter .tag").on("click", function() {
    var active =
      $btns.removeClass("active")
      .filter(this)
      .addClass("active")
      .data("filter");
    $boxs
      .hide()
      .filter("." + active)
      .fadeIn(100);
  });
}
