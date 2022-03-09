let pipeline = [
	{
		$match: {
			"imdb.rating": { $gte: 7 },
			$nor: [{ genres: "Crime" }, { genres: "Horror" }],
			$or: [{ rated: "G" }, { rated: "PG" }],
			languages: { $all: ["English", "Japanese"] },
		},
	},
	{ $project: { _id: 0, title: 1, rated: 1 } },
];
