//in api
import { base } from '../../lib/init-airtable';

export default function handler(req, res) {
	const data = req.body;

	base('Events').update(
		{
			id: req.body.id,
			fields: {
				Status: 'Confirmed',
				'Suggested Dates': '',
				'Confirmed Date': req.body['Confirmed Date'],
				Notes: req.body.notes,
			},
		},
		function (err, records) {
			if (err) {
				console.error(err);
			}
			res.status(200);
		}
	);

	const updateRecord = async (id, fields) => {
		const updateRecord = await tableSchedule.update(id, fields);
		// console.log(updateRecord);
	};

	updateRecord([{ id: 'recKzjKbr8d6EBz7w', fields: { Location: 'Zoom' } }]);
}
