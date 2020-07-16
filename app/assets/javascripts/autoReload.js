$(function(){

  function buildHTML(message){
    if(message.image){
      let html = `<div class="Main_chat__message-list__list-box" data-message-id=${message.id}>
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
      let html = `<div class="Main_chat__message-list__list-box" data-message-id=${message.id}>
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
  
  let reloadMessages = function() {
    let last_message_id = $(".Main_chat__message-list__list-box:last").data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $(".Main_chat__message-list").append(insertHTML);
        $(".Main_chat__message-list").animate({ scrollTop: $(".Main_chat__message-list")[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});