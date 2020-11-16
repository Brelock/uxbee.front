let status = "JS - OK!";

let site = null;
// =================
autosize(document.getElementById("textarea"));
// @@include('frames/globalFunctions.js')
// ===============
document.addEventListener("DOMContentLoaded", function (event) {
  if (!document.getElementsByTagName("body")) {
    console.log("js error");
  }

  // =================Include Modules==============================
  @@include("frames/modal.js");

  site = (function () {
    const win = window,
      dom = document,
      body = document.body,
      app = {},
      $expertiseContantItem = $(".expertise-contant__item-prod"),
      $expertiseTextItems = $(".expertise-contant__drop-text"),
      $findInput = $(".client-content__forms-wrap .input"),
      $error = $(".error"),
      $m = $(".email-valid"),
      $submitBtn = $(".input-submit-client-form"),
      $form = $(".form-contact");

    const fn = {
      handlerShowTextInExpertise() {
        $expertiseContantItem.on("click", function () {
          $expertiseContantItem.removeClass("active-text");
          $(this).addClass("active-text");

          $(this).find(".expertise-contant__drop-text").slideToggle(200);

          $(this).on("click", function () {
            $(this).toggleClass("active-text");
          });
        });
      },

      validInput() {
        let $flag = true;
        const $formContact = $(".form-contact");

        const $inputs = $formContact.find(".input").each(function () {
          if ($(this).val() == 0 || $(this).val() == "") {
            $flag = false;
          }
        });

        return $flag;
      },

      handlerDisabledBtn() {
        if (fn.validInput() && fn.validateMail()) {
          $submitBtn.addClass("active");
          $submitBtn.removeAttr("disabled");
          $submitBtn.removeClass("disabled_js");
        } else {
          $submitBtn.removeClass("active");
        }
      },

      validateEmail(email) {
        if (email !== "") {
          var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
          return re.test(String(email).toLowerCase());
        } else {
          return true;
        }
      },

      sendForm() {
        $(".error").text("Form sending").fadeIn();
      },

      handleValidateEmailField() {
        $("#email").on("blur", fn.validateMail);

        $(".input-submit-client-form").on("click", fn.validateMail);
      },

      validateMail() {
        var email = $("#email").val();

        $error.text("");

        if (fn.validateEmail(email)) {
          $error.fadeOut();
          fn.sendForm();
          $m.removeClass("er");
          return true;
        } else {
          $m.addClass("er");
          $error.fadeIn();
          $error.addClass();
          return false;
        }
      },

      // handlerFocusInput(){
      // 	if (fn.validateMail()) {
      // 		const $inputForm = $(".input")
      // 		$inputForm.on("focus", function () {
      // 			$(this).css({"border-color": "#fff", "color": "#fff"})
      // 		})
      // 		$inputForm.on("blur", function () {
      // 			 $(this).css({"border-color": "#666", "color": "#666"})
      // 		})
      // 	}

      // },

      domReady() {
        if ($expertiseContantItem.length) {
          fn.handlerShowTextInExpertise();
        }

        if ($findInput.length) {
          $findInput.on("input", fn.handlerDisabledBtn);
        }

        // if($form.length){
        // 	fn.handlerFocusInput();
        // }

        fn.handleValidateEmailField();
      },
    };

    dom.addEventListener("DOMContentLoaded", fn.domReady());

    return fn;
  })();

  (function () {
    const $formContact = $(".form-contact");
    // const $submitForm = $(".input-submit-client-form .active");
    const $successMessege = $(".success-message");
    const $errorMessege = $(".error-message");
    function prepareFormData(form) {
      let inputs = form.querySelectorAll("input");
      let selects = form.querySelectorAll("select");
      let textareas = form.querySelectorAll("textarea");
      let data = {};

      if (inputs.length) {
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].value ? (data[inputs[i].name] = inputs[i].value) : null;
        }
      }

      if (selects.length) {
        for (let i = 0; i < selects.length; i++) {
          selects[i].value && selects[i].value != "placeholder"
            ? (data[selects[i].name] = selects[i].value)
            : null;
        }
      }

      if (textareas.length) {
        for (let i = 0; i < textareas.length; i++) {
          textareas[i].value
            ? (data[textareas[i].name] = textareas[i].value)
            : null;
        }
      }

      return data;
    }

    // console.log('$formContact', $formContact);

    $formContact.on("submit", function (e) {
      const $submitForm = $(".input-submit-client-form.active");
      e.preventDefault();
      $submitForm.text("Please wait...");
      let data = prepareFormData(this);

      $.ajax({
        type: "POST",
        url: window.location.origin + `/send-mail`,
        data: data,
      })
        .done(function (response) {
          $formContact.hide();
          $successMessege.show();
          console.log("res", response);
        })
        .fail(function (error) {
          $errorMessege.show();
          console.log(error);
        });

      // console.log(111);

      // console.log(e);
    });
  })();

  (function () {
    if (document.documentElement.clientWidth > 1367) {
      $(".visible-viewportchecker").addClass("hidden").viewportChecker({
        classToAdd: "visible animated bounceInLeft",
        offset: 150,
      });
    }
    if (document.documentElement.clientWidth < 1367) {
      $(".visible-viewportchecker").addClass("hidden").viewportChecker({
        classToAdd: "visible animated bounceInLeft",
        offset: 50,
      });
    }
  })();

  $("#inputPhone").mask("#00000000000");
  $("#inputPhone").val(380);

  var supportsES6 = (function () {
    try {
      new Function("(a = 0) => a");
      return true;
    } catch (err) {
      return false;
    }
  })();

  var StickyHeader = (function (window, document) {
    // version 3.2 - MJF @ websemantics.uk 2019

    "use strict";
    if (!supportsES6) return false;

    const config = {
      stickyID: "sticky_header",
      hiddenClass: "sticky_header-hidden",
      downTolerance: 8, // Amount of downward movement before header is hidden
    };

    const header = document.getElementById(config.stickyID);
    if (!header) return false;

    let hasScrolled = false;
    let lastScrollTop = 0;

    // Adds, or removes, the hiddenClass dependent on scroll direction
    const _redraw = (_) => {
      // This is costly to performance but unavoidable
      const pageY = window.scrollY;

      // Put it away
      if (pageY > lastScrollTop + config.downTolerance) {
        header.classList.add(config.hiddenClass);
      }

      // Pull em down
      if (pageY < lastScrollTop || pageY <= 0) {
        header.classList.remove(config.hiddenClass);
      }

      lastScrollTop = pageY;
      hasScrolled = false;
    };

    // It's important to keep this function as performant as possible!
    const _onScroll = (_) => {
      if (!hasScrolled) {
        window.requestAnimationFrame(_redraw);
      }
      hasScrolled = true;
      window.requestAnimationFrame(_onScroll);
    };

    _onScroll();
  })(window, document);

  // (function () {
  // 	// Load the IFrame Player API code asynchronously.
  // 	var tag = document.createElement('script');
  // 	tag.src = "https://www.youtube.com/embed/7oEDgtjBiw8?autoplay=1";
  // 	var firstScriptTag = document.getElementsByTagName('script')[0];
  // 	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 	// Replace the 'ytplayer' element with an <iframe> and
  // 	// YouTube player after the API code downloads.
  // 	var player;
  // 	function onYouTubePlayerAPIReady() {
  // 	  player = new YT.Player('ytplayer', {
  // 		height: '360',
  // 		width: '640',
  // 		videoId: 'M7lc1UVf-VE'
  // 	  });
  // 	}
  // 	onYouTubePlayerAPIReady()
  // })();
});

window.onload = function () {
  // console.log('Hi man! this window load')
};
