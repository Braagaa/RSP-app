document.addEventListener('DOMContentLoaded', () => {  //this eventhandler makes sure js is loaded after the html content is done loading. NOTE this is triggered when the HTML is loaded only! CSS and, images, and subframes have not loaded yet. The load eventhandler is triggered after everything is loaded
	const form = document.getElementById('registrar');
	const input = form.querySelector('input');
	const mainDiv = document.querySelector('.main');
	const ul = document.getElementById('invitedList');

	const div = document.createElement('div');
	const filterLabel = document.createElement('label');
	const filterCheckBox = document.createElement('input');

	filterLabel.textContent = "Hide those who haven't responded";
	filterCheckBox.type = 'checkbox';

	div.appendChild(filterLabel);
	div.appendChild(filterCheckBox);
	mainDiv.insertBefore(div, ul);

	filterCheckBox.addEventListener('change', (e) => {
		const isChecked = e.target.checked;
		const lis = ul.children;
		
		if (isChecked) {
			for (let i = 0; i < lis.length; i++) {
				let li = lis[i];
				
				if (li.className === 'responded') {
					li.style.display = '';  //this will allow the element to show again
				} else {
					li.style.display = 'none';
				}
			}
		} else {
			for (let i = 0; i < lis.length; i++) {
				let li = lis[i];
				
				li.style.display = '';
			}
		}
	});

	function createLi(text) {
		function createElement(elementName, property, value) {
			const element = document.createElement(elementName);
			element[property] = value;
			return element;
		}
		
		function appendToLi(elementName, property, value) {
			const element = createElement(elementName, property, value);
			li.appendChild(element);
			return element;
		}
		
		const li = document.createElement('li');
		
		appendToLi('span', 'textContent', text);
		appendToLi('label', 'textContent', 'Confirmed')
			.appendChild(createElement('input', 'type', 'checkbox'))
		appendToLi('button', 'textContent', 'Edit');
		appendToLi('button', 'textContent', 'Remove');
		
		return li;
	}

	form.addEventListener('submit', (e) => {  //make sure to always submit from the form and not from the button
		e.preventDefault();
		
		const text = input.value;
		const li = createLi(text);
		
		input.value = '';
		
		ul.appendChild(li);
	});

	ul.addEventListener('change', (e)=> {
		const checkbox = e.target;
		const checked = checkbox.checked;
		const listItem = checkbox.parentNode.parentNode;
		
		if (checked) {
			listItem.className = 'responded';
		} else {
			listItem.className = '';
		}
	});

	ul.addEventListener('click', (e) => {
		if (e.target.tagName === 'BUTTON') { //We are using these if statements cause the less event handlers the better (bubbleing)
			const button = e.target;
			const li = button.parentNode;
			const ul = li.parentNode;
			const action = button.textContent.toLowerCase();
			
			const nameActions = {
				remove: () => {
					ul.removeChild(li);
				},
				edit: () => {
					const span = li.firstElementChild; //To simplify the way you manipulate a text element, you can turn it into an HTML element.
					const input = document.createElement('input');
					input.type = 'text';   //Type is important remember this property
					input.value = span.textContent;
					
					li.insertBefore(input, span);
					li.removeChild(span);
					
					button.textContent = 'Save';
				},
				save: () => {
					const input = li.firstElementChild;
					const span = document.createElement('span');
					span.textContent = input.value;
					
					li.insertBefore(span, input);
					li.removeChild(input);
					
					button.textContent = 'Edit';
				}
			};
			// select and run action in button's name
			nameActions[action]();
		}
	});
});

/*
	empty names
	duplicate names
	change confimered
	additional notes
	add a thrd option "not coming" <select>
	redundanted confirmed -> hide it when we want to see the ones who responded
	local storage
	How To Make a Website
	Responsive Images
	CSS Layout Basics
	CSS Flexbox Layout
*/