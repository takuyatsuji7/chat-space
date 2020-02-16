$(function(){

  function buildHTML(user){
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    return html;
  }

  $("#user-search-field").on("keyup", function(){
    let input = $("#user-search-field").val();
    $.ajax({
      url: "/users",
      type: "GET",
      data: {keyword: input},
      dataType: "json"
    })
    .done(function(users){
      $("#user-search-result").empty()
      if (users.length !== 0){
        users.forEach(function(user){
          let html = buildHTML(user)
          $("#user-search-result").append(html);
        })
      }else if(input.length == 0){
        return false
      }
      else{
        $("#user-search-result").append('')
      }

    })
    .fail(function(){
      alert('エラーが出ました')
    })
    
  })
})