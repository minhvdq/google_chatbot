const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const socket = io()
const mainDoc = document.getElementById('main-conversation')

const recognition = new SpeechRecognition()
const mainBtn = document.getElementById('main-button')

recognition.lang = 'en-US'
recognition.interimResults = false

mainBtn.addEventListener('click', () => {
    recognition.start()
    console.log('recognition started')
})

recognition.addEventListener('result', (e) => {
    const msg = event.results[0][0].transcript
    console.log(msg)
    socket.emit('chat-message', msg)
    var newProp = document.createElement('p')
    var newText = document.createTextNode(`User: ${msg}`)

    newProp.appendChild(newText)
    mainDoc.appendChild(newProp)
    console.log('socket emitted')
})

socket.on('bot-reply', (botRep) => {
    console.log(botRep)
    var newProp = document.createElement('p')
    var newText = document.createTextNode(`Bot: ${botRep}`)

    newProp.appendChild(newText)
    mainDoc.appendChild(newProp)
    speakText(botRep)
})

const speakText = (text) => {
    const synth = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance(text)
    synth.speak(utterance)
}