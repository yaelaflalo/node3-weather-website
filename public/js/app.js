
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() //תופס את האיוונט גם לאחר שהעמוד נטען (כמו בפורם ששולח ישר את הקובץ ומרפרש את העמוד)כלומר,עושה שזה לא ירפרש את העמוד

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    //מבייא דאטא של JSON מURL
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forcast
                }
            }
        })
    })

    console.log(location)
})