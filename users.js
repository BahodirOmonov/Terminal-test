const fs = require('fs')

fs.readFile('./database/users.json', 'UTF-8', (error, value) => {
	if(error) console.log(error)
	else {
		let data = JSON.parse(value)
		data = typeof data ? data.map((el) => {
			return {'Ishtirokchi': el.userName, "To'g'ri": el.trueCaunt, "Noto'g'ri": el.falseCaunt}
		}) : "Hali o'yinda hech kim ishtirok etmagan!"
		console.table(data)
	}
})