const fs = require('fs')
const rl = require('readline')

fs.readFile('./database/question.json', 'UTF-8', (error, value) => {
	if(error) console.log(error)
	else {
		let data = value ? JSON.parse(value) : []
		let obj = {}
		let variant = ['question','A', "B", "C", "D", 'answer']
		let k = 0
		let check = true

		const readline = rl.createInterface({
			input: process.stdin,
			output: process.stdout
		})

		readline.setPrompt("Savolingizni kiriting: ")
		readline.prompt()

		readline.on('line', (value) => {
			if(value) {
				obj[variant[k]] = value
				check = true
			}
			else if(variant[k] === 'question') {
				console.log('\nSavolni kiritmadingiz!\n')
				readline.setPrompt('Savolni qaytadan kiriting: ')
				readline.prompt()
				check = false
			}
			else {
				console.log('\nVariant uchun qiymat bermadingiz!\n')
				readline.setPrompt((variant[k] === 'answer' ? "To'g'ri" : variant[k]) + " variantni kiriting: ")
				readline.prompt()
				check = false
			}
			if(variant[k] === 'answer' && !("ABCD").includes(value)) {
				console.log("\nNoto'g'ri qiymat kiritdingiz!")
				console.log("To'g'ri javob uchun faqat A,B,C va D lardan birini kiritishingiz kerak!\n")
				k--
			}
			if((variant.length - 1) === k && value) {
				data.push(obj)
				fs.writeFile('./database/question.json', JSON.stringify(data, null, 4), (error) => {
					if(error) console.log(error)
				})
				console.log("Savol qo'shildi!")
				return readline.close()
			}
			if(check) {
				readline.setPrompt((variant[++k] === 'answer' ? "To'g'ri" : variant[k]) + " variantni kiriting: ")
				readline.prompt()
			}
		})
	}
})
