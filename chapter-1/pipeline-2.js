var pipeline = [
	{
		$project: {
			_id: 0,
			title: 1,
			"word-count": {
				$size: {
					$split: ["$title", " "],
				},
			},
		},
	},
	{
		$match: {
			"word-count": { $eq: 1 },
		},
	},
];
