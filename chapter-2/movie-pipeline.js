/*
MongoDB has another movie night scheduled. This time, 
we polled employees for their favorite actress or actor, 
and got these results

favorites = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney"]


For movies released in the USA with a tomatoes.viewer.rating greater than or equal to 3,
calculate a new field called num_favs that represets how many favorites appear in the cast field of the movie.
Sort your results by num_favs, tomatoes.viewer.rating, and title, all in descending order.

What is the title of the 25th film in the aggregation result?
*/

var favorites = [
	"Sandra Bullock",
	"Tom Hanks",
	"Julia Roberts",
	"Kevin Spacey",
	"George Clooney",
];

db.movies.aggregate([
	{
		$match: {
			"tomatoes.viewer.rating": { $gte: 3 },
			countries: "USA",
			cast: {
				// $in is including
				$in: favorites,
			},
		},
	},
	{
		$project: {
			_id: 0,
			title: 1,
			"tomatoes.viewer.rating": 1,
			num_favs: {
				$size: {
					// $setIntersection select only intersection
					$setIntersection: ["$cast", favorites],
				},
			},
		},
	},
	{
		$sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 },
	},
	{
		$skip: 24,
	},
	{
		$limit: 1,
	},
]);
