$(document).ready(function() {
	$('.going_btn').click(function updateGoing() {
		let id = this.id;
		let num = parseInt(
			$(this)
				.children()
				.text()
		);
		$.ajax({
			url: '/search/going/' + id,
			type: 'POST',
			success: function(result) {
				$('#' + id)
					.children()
					.text(num + 1);
			},
			error: function() {
				alert('Cannot add entry.');
			}
		});
	});

	$('.notGoing_btn').click(function decreaseGoing() {
		let id = $(this)
			.prev()
			.attr('id');
		let num = parseInt(
			$(this)
				.prev()
				.children()
				.text()
		);
		$.ajax({
			url: '/search/notGoing/' + id,
			type: 'POST',
			success: function(result) {
				$('#' + id)
					.children()
					.text(num - 1);
			},
			error: function() {
				alert('Cannot add entry.');
			}
		});
	});
});
