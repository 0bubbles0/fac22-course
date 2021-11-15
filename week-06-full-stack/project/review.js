//No reload
import { useRouter } from 'next/router';
useRouter.push('/basket');

// [id].js

// product.js
const id = 1;
export default function handler(req, res) {
	return (
		<>
			<h2>Bananas</h2>
			{/* Make this a Form component: */}
			<form
				action={`/basket/${id}`}
				method="POST"
				onSubmit={(event) => {
					event.preventDefault();
					fetch(`/basket/${id}`, {
						headers: {
							'content-type': 'x-www-urlencoded',
						},
						method: 'POST',
						body: `id=${id}`,
					}).then((res) => {
						if (res.ok) {
							router.push('/basket');
						}
					});
				}}
			>
				<button name="id" value={id}>
					Add to basket
				</button>
			</form>
		</>
	);
}
