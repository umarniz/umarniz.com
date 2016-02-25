/* Theme Name: Worthy - Free Powerful Theme by HtmlCoder
 * Author:HtmlCoder
 * Author URI:http://www.htmlcoder.me
 * Version:1.0.0
 * Created:November 2014
 * License: Creative Commons Attribution 3.0 License (https://creativecommons.org/licenses/by/3.0/)
 * File Description: Place here your custom scripts
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
  { title:"Ome - Android",                  image:"portfolio-1.jpg", categories: [Categories.MobileApp] },
  { title:"Ome - iOS",                      image:"portfolio-1.jpg", categories: [Categories.MobileApp] },
  { title:"Samsung - Art of Feeling",       image:"samsung_aof.jpg", categories: [Categories.MobileApp] },
  { title:"ABC - Future of VR",             image:"abc_vr_demo.jpg", categories: [Categories.VR] },
  { title:"Unilever - Interactive Table",   image:"interactive_table.jpg", categories: [Categories.Unity] },
  { title:"Unilever - Street Window",       image:"street_window.jpg", categories: [Categories.Unity] },
  { title:"Unilever - Aisle Leader",        image:"aisle_leader.jpg", categories: [Categories.Unity] },
  { title:"Unilever - Transparent Fridge",  image:"transparent_fridge.jpg", categories: [Categories.Unity] },
  { title:"Unilever - Deep Freezer",        image:"freezer.jpg", categories: [Categories.Unity] },
  { title:"Death Mile",                     image:"death_mile.jpg", categories: [Categories.MobileGame, Categories.Unity] },
  { title:"BLAZ3D",                         image:"portfolio-1.jpg", categories: [Categories.MobileGame] },
  { title:"Slash UX",                       image:"portfolio-1.jpg", categories: [Categories.Product] }
];

// Fill category nodes
var catContainer = document.getElementById("category_container");
for (var cat in Categories) {
  var node = document.createElement('li');
  node.innerHTML = "<a href=\"content.html\" data-filter=\"." + Categories[cat].id + "\">" + Categories[cat].name + "</a>";
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

  div.innerHTML = "<div class=\"image-box\"><div class=\"overlay-container\"><img src=\"images/" + cProj.image + "\" alt=\"\"><a href=\"content.html\" class=\"overlay\" data-toggle=\"modal\" data-target=\"#project-" + i +"\"><div class=\"bottom-text\"><span>" + cProj.title + "</span></div></a></div></div>"
  container.appendChild(div);
  console.log(className);
}

$('body').on("show.bs.modal", function(e) {
      //var link = $(e.relatedTarget);
      var body = $(this).find(link.attr('data-target')).find(".modal-body");

      if (body.children().length == 0 ) {
        body.load(link.attr("href"));
      } else {
        body.find('video')[0].play();
      }
  });

$('body').on('hidden.bs.modal', '.modal', function () {
  console.log("Hiding modal");
  $(this).find('video').each(function(num,val){
      this.pause();
      this.currentTime = 0;
  });
});
