/* Theme Name: Worthy - Free Powerful Theme by HtmlCoder
 * Author:HtmlCoder
 * Author URI:http://www.htmlcoder.me
 * Version:1.0.0
 * Created:November 2014
 * License: Creative Commons Attribution 3.0 License (https://creativecommons.org/licenses/by/3.0/)
 * File Description: Place here your custom scripts
 */

 var $loading = $('.spinner').hide();
 console.log("Hiding " + $loading);
 $(document)
 .ajaxStart(function () {
   console.log("Spinner!");
   $loading.show();
 })
 .ajaxStop(function () {
   $loading.hide();
 });

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
  { title:"Unilever - Interactive Table",   id:"interactive_table", categories: [Categories.Unity] },
  { title:"Unilever - Street Window",       id:"street_window", categories: [Categories.Unity] },
  { title:"Unilever - Aisle Leader",        id:"aisle_leader", categories: [Categories.Unity] },
  { title:"Unilever - Transparent Fridge",  id:"transparent_fridge", categories: [Categories.Unity] },
  { title:"Unilever - Deep Freezer",        id:"freezer", categories: [Categories.Unity] },
  { title:"Interactive Music",              id:"interactive_music", categories: [Categories.Misc] },
  { title:"Circuit Valencia",               id:"circuit_valencia", categories: [Categories.VR] },
  { title:"Death Mile",                     id:"death_mile", categories: [Categories.MobileGame, Categories.Unity] },
  { title:"BLAZ3D",                         id:"blaz3d", categories: [Categories.MobileGame] },
  { title:"Slash UX",                       id:"portfolio-1", categories: [Categories.Product] }
];

// Fill category nodes
var catContainer = document.getElementById("category_container");
for (var cat in Categories) {
  var node = document.createElement('li');
  node.innerHTML = "<a data-filter=\"." + Categories[cat].id + "\">" + Categories[cat].name + "</a>";
  catContainer.appendChild(node);
  console.log(node);
}

/*
var categoryNode = $('#all_filters');
var clone = element.clone();

var hrefNode = clone.children('a');
hrefNode.attr("data-filter", ".mobile-apps");
hrefNode.text("Mobile Apps");
element.parent().append(clone);
*/

var container = document.getElementById("portfolio_container");

//for (var i=Projects.length-1;i>=0;i--) {
for (var i=0;i<Projects.length;i++) {
  var cProj = Projects[i];

  var div = document.createElement('div');

  div.setAttribute('id', 'test');

  var className = "isotope-item";
  for (var cat in cProj.categories) {
    className += " " + cProj.categories[cat].id;
  }

  div.setAttribute("class", className);

  div.innerHTML = "<div class=\"image-box\"><div class=\"overlay-container\"><img src=\"images/" + cProj.id + ".jpg" + "\" alt=\"\"><a class=\"overlay\" data-toggle=\"modal\" data-target=\"#" + cProj.id + "\"><div class=\"bottom-text\"><span>" + cProj.title + "</span></div></a></div></div>"
  container.appendChild(div);
  console.log(className);
}

$('body').on("show.bs.modal", function(e) {
      var link = $(e.relatedTarget);
      var body = $(this).find(link.attr('data-target')).find(".modal-body");

      /*if (body.children().length == 0 ) {
        body.load(link.attr("href"));
      } else {*/
      if (body.find('video')[0] != null)
        body.find('video')[0].play();
      //}

  });

$('body').on('hidden.bs.modal', '.modal', function () {
  console.log("Hiding modal");
  $(this).find('video').each(function(num,val){
      this.pause();
      this.currentTime = 0;
  });
});

jQuery(document).ready(function ($) {
    var jssor_1_SlideshowTransitions = [
      {$Duration:1200,$Opacity:2}
    ];

    var jssor_1_options = {
      $AutoPlay: true,
      $SlideshowOptions: {
        $Class: $JssorSlideshowRunner$,
        $Transitions: jssor_1_SlideshowTransitions,
        $TransitionsOrder: 1
      },
      $ArrowNavigatorOptions: {
        $Class: $JssorArrowNavigator$
      },
      $BulletNavigatorOptions: {
        $Class: $JssorBulletNavigator$
      }
    };

    var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

    //responsive code begin
    //you can remove responsive code if you don't want the slider scales while window resizing
    function ScaleSlider() {
        var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
        if (refSize) {
            refSize = Math.min(refSize, 600);
            jssor_1_slider.$ScaleWidth(refSize);
        }
        else {
            window.setTimeout(ScaleSlider, 30);
        }
    }
    ScaleSlider();
    $(window).bind("load", ScaleSlider);
    $(window).bind("resize", ScaleSlider);
    $(window).bind("orientationchange", ScaleSlider);
    //responsive code end
});
