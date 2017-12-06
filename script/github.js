const User = "Dans24";
const defaultImg = "img/GitHub_Logo.png"

// Add repositories to the .projects
$(function(){
	$.get(`https://api.github.com/users/${User}/repos`, function(data, status){
		if(status=='success'){
			for (i in data) {
				var html = createGitProject(data[i]);
				$('.projects').append(html);
			}
		}
	});
});

// Create a project
function createGitProject(object){
	if(!object.description){
		object.description = 'No description.';
	} else {
		object.description = linkify(object.description);
	}

	var html = ``;
	html += `<div class="c m6 l4 mb-2">`;
    html += `<div class="card img-thumbnail">`;
    html += `<img src="${defaultImg}" alt="${object.name}" class="img-fluid">`;
    html += `<div class="container p-1 center">`;
    html += `<a href="${object.html_url}" target="_black" class="hover-text-green">`;
    html += `<h4>${object.name}</h4></a>`;
    html += `<p>${object.description}</p>`;
   	html += `</div></div></div>`;
	return html;
}

// Make text with links
function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}
