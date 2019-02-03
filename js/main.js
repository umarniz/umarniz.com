/*
  JS for umarniz.com
*/

var jquery_backstretch = require('../plugins/jquery.backstretch.min')
var jquery_appear = require('../plugins/jquery.appear')

// var $loading = $('.spinner').hide();
 /*
 $(document)
 .ajaxStart(function () {
   $loading.show();
 })
 .ajaxStop(function () {
   $loading.hide();
 });
*/

var Categories = {
    MobileApp:   {id: "mobile-apps",   name:"Mobile Apps"},
    MobileGame:  {id: "mobile-games",  name:"Mobile Games"},
    Unity:        {id: "unity",         name:"Unity 3D"},
    VR:           {id: "vr",            name:"VR"},
    Product:      {id: "product",       name:"Products"},
    Misc:         {id: "misc",          name:"Misc"}
};

var Projects = [
  { title:"Ome",                            id:"ome", categories: [Categories.MobileApp] },
  { title:"Samsung - Art of Feeling",       id:"samsung_aof", categories: [Categories.MobileApp] },
  { title:"ABC - Future of VR",             id:"abc_vr_demo", categories: [Categories.VR] },
  { title:"Accenture Grabber",              id:"accenture_grabber", categories: [Categories.MobileApp] },
  { title:"Smart Guide",                    id:"smart_guide", categories: [Categories.MobileApp] },
  { title:"Heineken - Spinoff",             id:"heineken_spinoff", categories: [Categories.MobileApp] },
  { title:"Unilever - Interactive Table",   id:"interactive_table", categories: [Categories.Unity] },
  { title:"Unilever - Street Window",       id:"street_window", categories: [Categories.Unity] },
  { title:"Unilever - Aisle Leader",        id:"aisle_leader", categories: [Categories.Unity] },
  { title:"Unilever - Transparent Fridge",  id:"transparent_fridge", categories: [Categories.Unity] },
  { title:"Unilever - Deep Freezer",        id:"freezer", categories: [Categories.Unity] },
  { title:"Dove - Hero Bar",                id:"dove_hero_bar", categories: [Categories.Misc] },
  { title:"Interactive Music",              id:"interactive_music", categories: [Categories.Misc] },
  { title:"Circuit Valencia",               id:"circuit_valencia", categories: [Categories.VR, Categories.Unity] },
  { title:"Death Mile",                     id:"death_mile", categories: [Categories.MobileGame, Categories.Unity] },
  { title:"BLAZ3D",                         id:"blaz3d", categories: [Categories.MobileGame] },
  { title:"Slash UX",                       id:"slashux", categories: [Categories.Product] }
];

// Fill category nodes
var catContainer = document.getElementById("category_container");
for (var cat in Categories) {
  var node = document.createElement('li');
  node.innerHTML = "<a data-filter=\"." + Categories[cat].id + "\">" + Categories[cat].name + "</a>";
  catContainer.appendChild(node);
  // console.log(node);
}

// Fill portfolio objects
var container = document.getElementById("portfolio_container");

for (var i=0;i<Projects.length;i++) {
  var cProj = Projects[i];

  var div = document.createElement('div');

  var className = "isotope-item";
  for (var cat in cProj.categories) {
    className += " " + cProj.categories[cat].id;
  }

  div.setAttribute("class", className);

  div.innerHTML = "<div class=\"image-box\"><div class=\"overlay-container\"><img src=\"images/" + cProj.id + ".jpg" + "\" alt=\"\"><a class=\"overlay\" data-toggle=\"modal\" data-target=\"#" + cProj.id + "\"><div class=\"bottom-text\"><span>" + cProj.title + "</span></div></a></div></div>"

  var modalContent = $('#' + cProj.id)
  if  (modalContent != null) {
    var title = modalContent.find('.modal-title');
    if (title) {
      title.text(cProj.title);
    }
  }

  container.appendChild(div);
}

$('body').on("show.bs.modal", function(e) {

      var link = $(e.relatedTarget);
      var modalLink = null;

      var trackingName = null;

      if (link.length == 0) {
        trackingName = location.hash;
        modalLink = $(location.hash);
      } else {
        modalLink = $(this).find(link.attr('data-target'));
        trackingName = link.attr('data-target')
      }

      // ga('send', 'pageview', {
      //  'page': trackingName
      // });

      var body = modalLink.find(".modal-body");

      if (body.find('video')[0] != null) {
        body.find('video')[0].play();
      }

      // Asynchrous load images in carousel
      var carousel = body.find('.carousel-inner');
      if (carousel) {
        carousel.find(".item").find("img").each(function(numb,val) {
            $(this).attr('src', $(this).attr('data-img-src'));
        });
      }
      
      // Asynchrously load iframes
      var iframes = $('iframe');
      iframes.attr('src', function() {
          return $(this).data('src');
      });
  });

$('body').on('hidden.bs.modal', '.modal', function () {
  // Pause HTML5 Videos
  $(this).find('video').each(function(num,val){
      this.pause();
      this.currentTime = 0;
  });

  // Pause Vimeo videos
  $(this).find('.vimeo').each(function(num,val) {
    var contentWindow = $(this)[0].contentWindow;
    var targetOriginUrl = $(this).attr('src').split('?')[0];
    contentWindow.postMessage({ 'method': 'pause' }, targetOriginUrl);
  });

  // Pause Youtube videos
  $(this).find('.youtube').each(function(num,val) {
    var contentWindow = $(this)[0].contentWindow;
    var targetOriginUrl = $(this).attr('src').split('?')[0];
    contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  });

});

// Setup carousels
$('.carousel').each(function() {
  var carouselID = $(this).attr('id');

  var ratio = '56.25%';

  if (carouselID == 'freezer_carousel') {
    ratio = '56.25%';
  } else if (carouselID == 'deathmile_carousel') {
    ratio = '56.34%';
  } else if (carouselID == 'smartguide_carousel') {
    ratio = '56.91%';
  } else if (carouselID == 'heineken_carousel') {
    ratio = '57.2%'
  }

/*  $(this).find('.carousel .item').each(function() {
    console.log("Setting Carousel");
    $(this).width('300px');
   $(this).height(0);
   $(this).css('padding-top', ratio);
   $(this).addClass('full-screen');
 });*/

 var $item = $(this).find('.item');
 var $numberofSlides = $(this).find('.item').length;
 var $currentSlide = 0;

 $(this).find('.carousel-indicators li').each(function(){
   var $slideValue = $(this).attr('data-slide-to');
   if($currentSlide == $slideValue) {
     $(this).addClass('active');
     $item.eq($slideValue).addClass('active');
   } else {
     $(this).removeClass('active');
     $item.eq($slideValue).removeClass('active');
   }
 });

 $(this).find('.carousel img').each(function() {
   var $src = $(this).attr('src');
   var $color = $(this).attr('data-color');
   $(this).parent().css({
     'background-image' : 'url(' + $src + ')',
     'background-color' : $color
   });
   $(this).remove();
 });

  // Initialize all caoursels
  $(this).carousel({
    interval: 0,
    pause: "true"
  });
});

$(document).ready(function() {
    var hash = location.hash;

    if (hash) {
        var hashID = hash.substr(1);
        $('#' + hashID).modal('show');
    }
});

// Fix for masonry
$('.isotope-container').masonry({ isFitWidth: true });