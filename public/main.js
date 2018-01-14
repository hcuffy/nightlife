$(document).ready(function() {

  $('.going_btn').click(function updateGoing() {
    let id = this.id;
    $.ajax({
      url: '/search/going/' + id,
      type: 'POST',
      success: function(result) {
        console.log(id);
      },
      error: function() {
        alert('Cannot add entry.');
      }
    });
  })

})
