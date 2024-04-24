//SCROLLSPY
//SCROLLSPY
var lastId,
    topMenu = $("#topNav"),
    topMenuHeight = topMenu.outerHeight(),
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

menuItems.click(function(e){
  var href = $(this).attr("href"),
      o = href === "#" ? 0 : $(href).offset().top-topMenuHeight+15;
  $('html, body').stop().animate({ 
      scrollTop: o
  }, 300);
  e.preventDefault();
});

$(window).scroll(function(){
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }                   
});
//FIN SCROLLSPY

//SLIDER
jQuery(document).ready(function(){
   jQuery('#leslid').skdslider({delay:5000, animationSpeed: 2000,showNextPrev:true,showPlayButton:false,autoSlide:true,animationType:'fading'});
   jQuery('#responsive').change(function(){
     $('#responsive_wrapper').width(jQuery(this).val());
   });

 });
// INICIO MAPS
jQuery(document).ready(function($) {
  var latitude = -25.2903563,
      longitude = -57.6433999,
      segunda_latitud = -25.3563608,
      segunda_longitud = -57.6161544,
      map_zoom = 11;

  var is_internetExplorer11 = navigator.userAgent.toLowerCase().indexOf('trident') > -1;
  var marker_url = (is_internetExplorer11) ? 'img/marker.png' : 'img/marker.svg';

  var main_color = '#2d313f',
      saturation_value = -20,
      brightness_value = 5;

  var style = [{
          elementType: "labels",
          stylers: [{
              saturation: saturation_value
          }]
      },
      {
          featureType: "poi",
          elementType: "labels",
          stylers: [{
              visibility: "off"
          }]
      },
      {
          featureType: 'road.highway',
          elementType: 'labels',
          stylers: [{
              visibility: "off"
          }]
      }
  ];

  var map_options = {
      center: new google.maps.LatLng(latitude, longitude),
      zoom: map_zoom,
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      styles: style,
  }
  // Inicializa el mapa
  var map = new google.maps.Map(document.getElementById('google-container'), map_options);
  // Agrega el primer marcador
  var marker1 = new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      map: map,
      visible: true,
      icon: marker_url,
  });

  // Agrega el segundo marcador
  var marker2 = new google.maps.Marker({
      position: new google.maps.LatLng(segunda_latitud, segunda_longitud),
      map: map,
      visible: true,
      icon: marker_url, // Puedes definir un segundo icono si es necesario
  });

  // Agrega botones personalizados para hacer zoom dentro/fuera del mapa
  function CustomZoomControl(controlDiv, map) {
      var controlUIzoomIn = document.getElementById('cd-zoom-in');
      var controlUIzoomOut = document.getElementById('cd-zoom-out');
      controlDiv.appendChild(controlUIzoomIn);
      controlDiv.appendChild(controlUIzoomOut);

      google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
          map.setZoom(map.getZoom() + 1);
      });

      google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
          map.setZoom(map.getZoom() - 1);
      });
  }

  var zoomControlDiv = document.createElement('div');
  var zoomControl = new CustomZoomControl(zoomControlDiv, map);

  // Inserta el div de zoom en la parte superior izquierda del mapa
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
});
// FIN LO DEL MAPS

