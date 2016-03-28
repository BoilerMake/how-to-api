/**
 * This is the data which gets added to our database
 * when we run 'node seeder.js'. You can change it 
 * to include your own favorite shows! 
 */
module.exports = [
	{
		title: "Breaking Bad",
		description: "Dying man builds drug empire and kills a lot of people",
		reviews: [ 
			{
			score: 10,
			body: "Super awesome. There were lots of drugs!"
			}, 
			{
			score: 7,
			body: "Pretty cool. I want to be like Walter White when I grow up!"
			},
			{
			score: 9,
			body: "Jesse is the coolest character!"
			}
		]
	},
	{
		title: "The Martian",
		description: "What happens when NASA accidentally leaves somebody on Mars.",
		reviews: [ 
			{
			score: 10,
			body: "Mark Watney is super cool! I hope he survives!"
			}, 
			{
			score: 9,
			body: "I want to visit Mars and see where this was filmed!"
			},
			{
			score: 3,
			body: "Not enough aliens."
			}
		]
	},
	{
		title: "Rick and Morty",
		description: "Honestly its hard to describe but it's pretty cool",
		reviews: [ 
			{
			score: 9,
			body: "I don't know whats happening but I love it."
			}, 
			{
			score: 10,
			body: "Wubba lubba dub dub!"
			},
			{
			score: 9,
			body: "Bird Person is my favorite character. I can't wait to see how it ends..."
			}
		]
	},
	{
		title: "House of Cards",
		description: "A show about politicians and some serious schemes",
		reviews: [ 
			{
			score: 10,
			body: "Amazing. Frank is really cool!"
			}, 
			{
			score: 9,
			body: "Freddy is my favorite character!"
			},
			{
			score: 8,
			body: "Frank and Claire are the best couple ever!"
			}
		]
	},
	{
		title: "Star Trek",
		description: "It has spaceships and aliens and lazers. What more could you ask for?",
		reviews: [ 
			{
			score: 10,
			body: "Its pretty great! My favorite episode was the one with the spaceship!"
			}, 
			{
			score: 7,
			body: "I liked the aliens."
			},
			{
			score: 5,
			body: "Too much space for my liking."
			}
		]
	},
]