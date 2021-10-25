import dogs from './dogs.js';
import createEl from './create-element.js';

// Step 4 + 5
// const dogTemplate = document.querySelector('#dogTemplate');
const dogTemplate = document.createElement('template');
dogTemplate.innerHTML = `
  <li class="card">
  <h2></h2>
  <img src="" alt="" />
  </li>
`;

const dogElements = dogs.map((dog) => {
	const clone = dogTemplate.content.cloneNode(true);
	clone.querySelector('h2').append(dog.name);
	clone.querySelector('img').src = dog.image;
	return clone;
});

// const homeTemplate = document.querySelector('#homeTemplate');
const homeTemplate = document.createElement('template');
homeTemplate.innerHTML = `
  <h1 class="title"></h1>
  <ul></ul>
`;

const clone = homeTemplate.content.cloneNode(true);
clone.querySelector('ul').append(...dogElements);

document.querySelector('#app').append(clone);

// Step 3

// import dogs from "./dogs.js";

// const dogElements = dogs.map((dog) => {
//   return `
//     <li class="card">
//       <h2>${dog.name}</h2>
//       <img src="${dog.image}" alt="" />
//     </li>
//   `;
// });

// document.querySelector("#app").innerHTML = `
//   <h1>All the dogs</h1>
//   <ul>
//     ${dogElements.join("\n")}
//   </ul>
// `;

// Step 2
// const p = createEl('p', { id: 'test' }, 'Some text content');

// const elements = dogs.map((dog) => {
// 	const h2Dog = createEl('h2', {}, `${dog.name}`);
// 	const imgDog = createEl('img', {
// 		src: `${dog.image}`,
// 		alt: `dog image`,
// 	});
// 	return createEl('li', { className: 'card' }, h2Dog, imgDog);
// });

// const pageTitle = createEl('h1', {}, 'All the dogs');

// const list = createEl('ul', {}, ...elements);

// document.querySelector('#app').append(pageTitle, list);

// Step 1
// const elements = dogs.map((dog) => {
// 	const h2Dog = document.createElement('h2');
// 	h2Dog.textContent = dog.name;

// 	const imgDog = document.createElement('img');
// 	imgDog.src = dog.image;
// 	imgDog.alt = 'dog';

// 	const item = document.createElement('li');
// 	item.append(h2Dog, imgDog);
// 	return item;
// });

// const pageTitle = document.createElement('h1');
// pageTitle.textContent = 'All the dogs';

// const list = document.createElement('ul');
// list.append(...elements);

// document.querySelector('#app').append(pageTitle, list);
