const rl = require('readline')
const fs = require('fs')

const readline = rl.createInterface({
	input: process.stdin,
	output: process.stdout
})

fs.readFile('./database/question.json', 'UTF-8', (error, value) => {
	if(error) console.log(error)
	else {
		let data = value ? JSON.parse(value) : []
		let userName;

		let trueCaunt = 0
		let falseCaunt = 0
		let check = true

		let generate = questionRender(randomArray(data))

		let question;

		readline.setPrompt("Ismingizni kiriting: ")
		readline.prompt()

		readline.on('line', (data) => {
			if (!question) {
				userName = data
				console.log('Salom ' + data + ", o'yin boshlandi!")
			}
			else if(!("ABCD").includes(data)) {
				console.log("\nSiz noto'g'ri qiymat kiritdingiz!")
				console.log("Iltimos, 'A','B','C','D' lardan birini tanlang!\n")
				check = false
			}
			else {
				check = true
				console.log("Javobingiz: " + data)
				data === question.answer ? trueCaunt++ : falseCaunt++
			}

			question = check ? generate.next().value : question

			if(!question) {
				fs.readFile('./database/users.json', 'UTF-8', (error, data) => {
					if(error) console.log(error)
					else {
						let userData = JSON.parse(data) || []
						userData.push({
							userName,
							trueCaunt,
							falseCaunt
						})
						console.log("\n" + userName + ": sizning natijangiz!")
						console.table([{"Ishtirokchi": userName, "To'g'ri": trueCaunt, "Noto'g'ri": falseCaunt}])
						fs.writeFile('./database/users.json', JSON.stringify(userData, null, 4), () => null)

					}
				})
				return readline.close()
			}
			check ? console.log(`
Savol: ${question.question}

A: ${question.A}
B: ${question.B}
C: ${question.C}
D: ${question.D}
`) : null
			readline.setPrompt("Javobni kiriting: ")
			readline.prompt()
			})
	}
})

function *questionRender (data) {
	for(let i of data) {
		yield i
	}
}

function randomArray(array) {
	newArray = []
	while (array.length) {
		let index = Math.floor(Math.random() * array.length)
		newArray.push(array.splice(index, 1)[0])
	}
	return newArray
}









