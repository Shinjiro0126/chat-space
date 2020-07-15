$(function(){

  function buildHTML(message){
    if(message.image){
      let html = `<div class="Main_chat__message-list__list-box">
                    <div class="Main_chat__message-list__list-box__name-box">
                      <div class="Main_chat__message-list__list-box__name-box--name">
                        ${message.user_name}
                      </div>
                      <div class="Main_chat__message-list__list-box__name-box--date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="Main_chat__message-list__list-box__message-box">
                      <p class="Main_chat__message-list__list-box__message-box--content">
                        ${message.content}
                      </p>
                      <img class="Main_chat__message-list__list-box__message-box--content" src="${message.image}">
                    </div>
                  </div>`
      return html;
    } else{
      let html = `<div class="Main_chat__message-list__list-box">
                    <div class="Main_chat__message-list__list-box__name-box">
                      <div class="Main_chat__message-list__list-box__name-box--name">
                        ${message.user_name}
                      </div>
                      <div class="Main_chat__message-list__list-box__name-box--date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="Main_chat__message-list__list-box__message-box">
                      <p class="Main_chat__message-list__list-box__message-box--content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
       return html;
    }; 
  }

  $(".Main_chat__message-form__form-box").on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    
    .done(function(data){
      let html = buildHTML(data);
      $(".Main_chat__message-list").append(html);
      $(".Main_chat__message-list").animate({ scrollTop: $(".Main_chat__message-list")[0].scrollHeight});
      $("form")[0].reset();
      $(".Main_chat__message-form__form-box__send-box").attr("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});