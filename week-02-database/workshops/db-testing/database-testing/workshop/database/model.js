const db = require('./connection.js');

function getUsers() {
	return db.query('SELECT * FROM users').then(result => result.rows);
}

function createUser(placeholder) {
	const insert_user = /*sql*/ `
  INSERT INTO users(username, age, location) VALUES($1, $2, $3)
  `;
	const { username, age, location } = placeholder;
	return db.query(insert_user, [username, age, location]);
}

function deleteUser(placeholder) {
	const deleteMessage = /*sql*/ `DELETE FROM users WHERE id = $1`;
	return db.query(deleteMessage, [placeholder]);
}

function getPosts() {
	const selectMessage = /*sql*/ `
    SELECT blog_posts.text_content, users.username
    FROM blog_posts INNER JOIN users
    ON blog_posts.user_id = users.id
    ORDER BY blog_posts.id DESC
  `;
	return db.query(selectMessage).then(result => result.rows);
}

module.exports = { getUsers, createUser, deleteUser, getPosts };
