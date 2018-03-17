$(document).ready(function() {
  $('[data-newsletter-form]').each(function(index, form){
    $form = $(form);
    $form.on('submit', function(e){
      e.preventDefault();
      $email = $form.find("[name=email]").val();
      $thank_you = $form.find("[data-form-success]")
      $content = $form.find("[data-form-content]")
      
      $thank_you.removeClass("hidden");
      $content.addClass("hidden");
    })
  })
});