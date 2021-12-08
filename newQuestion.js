const fs = require('fs')
const rl = require('readline')

fs.readFile('./database/question.json', 'UTF-8', (error, value) => {
	if(error) console.log(error)
	else {
		let data = value ? JSON.parse(value) : []
		let obj = {}
		let variant = ['question','A', "B", "C", "D", 'answer']
		let k = 0
		const readline = rl.createInterface({
			input: process.stdin,
			output: process.stdout
		})

		readline.setPrompt("Savolingizni kiriting: ")
		readline.prompt()

		readline.on('line', (value) => {
			obj[variant[k]] = value
			if(variant[k] === 'answer' && !("ABCD").includes(value)) {
				console.log("\nNoto'g'ri qiymat kiritdingiz!")
				console.log("To'g'ri javob uchun faqat A,B,C va D lardan birini kiritishingiz kerak!\n")
				k--
			}
			if((variant.length - 1) === k) {
				data.push(obj)
				fs.writeFile('./database/question.json', JSON.stringify(data, null, 4), (error) => {
					if(error) console.log(error)
				})
				console.log("Savol qo'shildi!")
				return readline.close()
			}
			readline.setPrompt((variant[++k] === 'answer' ? "To'g'ri" : variant[k]) + " variantni kiriting: ")
			readline.prompt()
		})
	}
})