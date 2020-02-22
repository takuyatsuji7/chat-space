$(function(){
  function buildHTML(message){
    if(message.body && message.image){
      var html = `<div class="main-chat__content--each" data-message-id=` + message.id + `>` +
                    `<div class="posted-head">` +
                      `<div class="posted-head__user-name">` +
                        message.name +
                      `</div>` +
                      `<div class="posted-head__post-date">` +
                        message.date +
                      `</div>` +
                    `</div>` +
                    `<div class="posted-message">` +
                      `<p class="posted-message__body">` +
                        message.body +
                      `</p>` +
                      `<img src="` + message.image + `" class="posted-message__image" >` +
                    `</div>` +
                  `</div>`
    }else if(message.body){
      var html = `<div class="main-chat__content--each" data-message-id=` + message.id + `>` +
                   `<div class="posted-head">` +
                     `<div class="posted-head__user-name">` +
                       message.name +
                     `</div>` +
                     `<div class="posted-head__post-date">` +
                       message.date +
                     `</div>` +
                   `</div>` +
                   `<div class="posted-message">` +
                     `<p class="posted-message__body">` +
                       message.body +
                     `</p>` +
                   `</div>` +
                 `</div>`
    }else if(message.image){
      var html = `<div class="main-chat__content--each" data-message-id=` + message.id + `>` +
                   `<div class="posted-head">` +
                     `<div class="posted-head__user-name">` +
                       message.name +
                     `</div>` +
                     `<div class="posted-head__post-date">` +
                       message.date +
                     `</div>` +
                   `</div>` +
                   `<div class="posted-message">` +
                     `<img src="` + message.image + `" class="posted-message__image" >` +
                   `</div>` +
                 `</div>`
    };
    return html;
  };
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      let html = buildHTML(message)
      console.log(html)
      $(".main-chat__content").append(html);
      $(".main-chat__content").animate({ scrollTop: $(".main-chat__content")[0].scrollHeight})
      $('form')[0].reset()
      $(".center-bar__submit").prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました')
    })
  })

  var reloadMessages = function(){
    var last_message_id = $('.main-chat__content--each:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__content').append(insertHTML);
        $('.main-chat__content').animate({ scrollTop: $('.main-chat__content')[0].scrollHeight})
      }
    })
    .fail(function(){
      console.log('error');
    })
  }
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 4000);
  }
});