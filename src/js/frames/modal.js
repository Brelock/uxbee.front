(function () {  
    if ( ! $('.modal-custom').length) return;
    
 const $modalBlock = $('.modal-custom')
 const $btnOverlay =  $modalBlock.find('.modal-custom__overlay');
 const $btnBasketClose = $modalBlock.find('.modal-btn-closses');
 const $iframe = $("iframe")
 let $iframeSrc = $iframe.attr("src", "https://www.youtube.com/embed/7oEDgtjBiw8?autoplay=1")

    if (document.documentElement.clientWidth > 768) {
        const $bt = $('.modal-custom-open-btn');
         $bt.click(function () {  
             $modalBlock.show()
             $iframeSrc = $iframe.attr("src", "https://www.youtube.com/embed/7oEDgtjBiw8?autoplay=1")

             $('.mainWrapper').css({"overflow": "hidden", "height": "100vh"});
         })
   
        $btnBasketClose.click(function () {  
            $modalBlock.hide()
            $('.mainWrapper').css({"min-height": "100vh", "height": "auto" });
            $iframeSrc = $iframe.attr("src", "https://www.youtube.com/embed/7oEDgtjBiw8?autoplay=1")
        })

        $btnOverlay.click(function () {  
           $modalBlock.hide()
           $('.mainWrapper').css({"min-height": "100vh", "height": "auto"});
           $iframeSrc = $iframe.attr("src", "https://www.youtube.com/embed/7oEDgtjBiw8?autoplay=1")
        })
    }

    if (document.documentElement.clientWidth < 767) {
        const $bt = $('.modal-custom-open-btn');
        let $videoWrap = $(".video-container-wrap");
        const $mobilePlayer = $(".mobile-player")
        const $btnVideo = $(".page-container__banner-top-video-btn")
        const $videoSection = $(".video-section")
        let $mobileIframe = $(".mobile-iframe")
        const $iframeContainer = $(".iframe-container")
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
         
        $bt.click(function () {  
            
            var player;
            (function onYouTubeIframeAPIReady() {
              
              player = new YT.Player('player', {
                width: '100%',
                videoId: '7oEDgtjBiw8',

                events: {
                  'onReady': onPlayerReady,       
                    
                  'onStateChange': function(event) {
                    if (event.data == YT.PlayerState.PLAYING) {
                      fullscrineVideo();
                    }
                    if (event.data == YT.PlayerState.PAUSED) {
                      pauseVideo();
                    }

                  }
               }
              });
            })();


            function onPlayerReady(event) {
              
              // console.log("fullscrine-rrr", event);
            }

            function fullscrineVideo() {                
              var iframe = document.querySelector('#player');
    
              var requestFullScreen = iframe.requestFullScreen || 
                  iframe.mozRequestFullScreen || 
                  iframe.webkitRequestFullScreen;
    
              if (requestFullScreen) {
                  requestFullScreen.bind(iframe)();
              }

            }

            function pauseVideo() { 
                $bt.css("position", "relative")
                $videoWrap.removeClass("video-banner__hiden")
                $mobilePlayer.removeClass("active-mobile-player")
                $videoSection.css("height", "auto")
                $iframeContainer.html('<div id="player"></div>')
                $btnVideo.toggleClass("hiden-btn")
            }
          
         

         
            $(this).css("position", "absolute")
            $btnVideo.toggleClass("hiden-btn")
            const $videoBanner = $(".video-banner")
            $videoWrap.addClass("video-banner__hiden")
            $mobilePlayer.addClass("active-mobile-player")
            $videoSection.css("height", "211px")
            
        })
    }



    // if (document.documentElement.clientWidth < 767) {
    //     const $bt = $('.modal-custom-open-btn');
    //     let $videoWrap = $(".video-container-wrap");
    //     const $mobilePlayer = $(".mobile-player")
    //     const $btnVideo = $(".page-container__banner-top-video-btn")
    //     const $videoSection = $(".video-section")
    //     let $mobileIframe = $(".mobile-iframe")
    //     const $iframeContainer = $(".iframe-container")
    //     var tag = document.createElement('script');

    //     tag.src = "https://www.youtube.com/iframe_api";
    //     var firstScriptTag = document.getElementsByTagName('script')[0];
    //     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    //     function onPlayerReady(event) { 
    //         var player = event.target;
    //         var iframe = document.querySelector('#player');

    //         player.playVideo();

    //         var requestFullScreen = iframe.requestFullScreen || 
    //             iframe.mozRequestFullScreen || 
    //             iframe.webkitRequestFullScreen;

    //         if (requestFullScreen) {
    //             requestFullScreen.bind(iframe)();
    //         }

    //      }
    //     $bt.click(function () {  
            
    //         var player;
    //         (function onYouTubeIframeAPIReady() {
              
    //           player = new YT.Player('player', {
    //             width: '100%',
    //             videoId: '7oEDgtjBiw8',
    //             playerVars: { 'autoplay': 1, 'playsinline': 1 },
    //             events: {
    //               'onReady': onPlayerReady,                 
    //               'onStateChange': function(event) {
    //                 if (event.data == YT.PlayerState.PAUSED) {
    //                   pauseVideo();
    //                 }
    //               }
    //             }
    //           });
    //         })();
    //         function pauseVideo() { 
    //             $bt.css("position", "relative")
    //             $videoWrap.removeClass("video-banner__hiden")
    //             $mobilePlayer.removeClass("active-mobile-player")
    //             $videoSection.css("height", "auto")
    //             $iframeContainer.html('<div id="player"></div>')
    //             $btnVideo.toggleClass("hiden-btn")
    //         }

         

         
    //         $(this).css("position", "absolute")
    //         $btnVideo.toggleClass("hiden-btn")
    //         const $videoBanner = $(".video-banner")
    //         $videoWrap.addClass("video-banner__hiden")
    //         $mobilePlayer.addClass("active-mobile-player")
    //         $videoSection.css("height", "211px")
            
    //     })
    // }


})();
