// Import database connection
const db = require('../database/connection.js');

function get(request, response) {
	const access_posts = `
    SELECT blog_posts.text_content, users.username 
    FROM blog_posts
    INNER JOIN users
    ON blog_posts.user_id = users.id
    ORDER BY users.username ASC
  `;
	db.query(access_posts).then(result => {
		const posts = result.rows;
		const postItems = posts.map(post => {
			return `
        <li>
          <p>${post.text_content}</p>
          <p>${post.username}</p>
        </li>
      `;
		});
		response.send(`<ul>${postItems.join('')}</ul>`);
	});
}

module.exports = { get };
