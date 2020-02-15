$(function(){

  function buildHTML(message){
    if(message.image){
      let html = `<div class="main-chat__content--each">
                    <div class="posted-head">
                      <div class="posted-head__user-name">
                        ${message.name}
                      </div>
                      <div class="posted-heas__post-date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="posted-message">
                      <p class="posted-message__body">
                        ${message.body}
                      </p>
                    </div>
                    <img src=${message.image}>
                  </div>`
      return html;
    }else{
      let html = `<div class="main-chat__content--each">
                    <div class="posted-head">
                      <div class="posted-head__user-name">
                        ${message.name}
                      </div>
                      <div class="posted-heas__post-date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="posted-message">
                      <p class="posted-message__body">
                        ${message.body}
                      </p>
                    </div>
                  </div>`
      return html;
    }
  }

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
      console.log(message);
      let html = buildHTML(message)
      $(".main-chat__content").append(html);
      $(".main-chat__content").animate({ scrollTop: $(".main-chat__content")[0].scrollHeight})
      $('form')[0].reset()
      // $("#message_body").val('');
      $(".center-bar__submit").prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました')
    })
  })
})