const express = require('express');
const app = express();
const PORT = 9876

const Mytoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxMTM5ODkxLCJpYXQiOjE3MjExMzk1OTEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjYwOTViNGMwLWI1YzMtNGZkZS04MTIxLTA5M2MxNmRhZWU2NSIsInN1YiI6IjEyNTE1NzAyM0BzYXN0cmEuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJIYXJpdGhTYXN0cmEiLCJjbGllbnRJRCI6IjYwOTViNGMwLWI1YzMtNGZkZS04MTIxLTA5M2MxNmRhZWU2NSIsImNsaWVudFNlY3JldCI6InR6R0RhY1J3RUN6ZEZXaEsiLCJvd25lck5hbWUiOiJIYXJpdGgiLCJvd25lckVtYWlsIjoiMTI1MTU3MDIzQHNhc3RyYS5hYy5pbiIsInJvbGxObyI6IjEyNTE1NzAyMyJ9.b_1K1tPRa9e1y-HyZAR3eKhLb2w0Oy6FzEV-DS2OR9U';

let prevState = []
let currState = []
let currStateWithWindowSize = [];

function calculateAverage(arr) {
    let temp = 0
    arr.map((a)=>temp+=a)
    let sum = temp
    return sum / arr.length
}

function updateStates(newData) {
    prevState = [...currState]
    if(newData)
    currState = [...newData]
    currStateWithWindowSize = [...currStateWithWindowSize, ...newData].slice(-20) //I was combining both arrays and taking the last 20 from it
    const average = calculateAverage(currStateWithWindowSize);
    return average
}

async function fetchData(path) {
        const response = await fetch(`http://20.244.56.144/test/${path}`, {
            method: 'GET',
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Mytoken}`
        }
        });
        const data = await response.json()
        return data
}

app.use(express.json())

app.get('/test/e', async (req, res) => {
    const newData = await fetchData('even')
    const average = updateStates(newData.numbers)
    res.json({ "windowPrevState":prevState,
        "windowCurrState":currState,
        "numbers":currStateWithWindowSize,
        "avg":average
     });
});

app.get('/test/p', async (req, res) => {
    const newData = await fetchData('primes')
    const average = updateStates(newData.numbers)
    res.json({ "windowPrevState":prevState,
        "windowCurrState":currState,
        "numbers":currStateWithWindowSize,
        "avg":average
     });
});

app.get('/test/f', async (req, res) => {
    const newData = await fetchData('fibo')
    const average = updateStates(newData.numbers)
    res.json({ "windowPrevState":prevState,
        "windowCurrState":currState,
        "numbers":currStateWithWindowSize,
        "avg":average
     });
});

app.get('/test/r', async (req, res) => {
    const newData = await fetchData('rand');
    const average = updateStates(newData.numbers)
    res.json({ "windowPrevState":prevState,
        "windowCurrState":currState,
        "numbers":currStateWithWindowSize,
        "avg":average
     });
});

app.listen(PORT, () => {
    console.log(`running at ${PORT}`)
});
