import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
const port = 3000

app.use(cookieParser())

app.get('/api/a', (req, res) => {
  const cookies = req.cookies
  console.log('== [API] cookies ==', cookies)
  res.json({ cookies })
})

app.post('/api/b', (req, res) => {
  res.cookie('testCookie', 'HelloWorld', { maxAge: 900000, expires: new Date(Date.now() + 300000), httpOnly: true, path: '/api' })
  res.json({ message: 'Cookie has been set!' })
})

app.get('/', async (req, res) => {
  const reqCookies = req.cookies
  const cookieStr = Object.entries(reqCookies)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ')
  console.log('== [Server] cookieStr ==', cookieStr)
  const cookies = await fetch('http://localhost:3000/api/a', { headers: { Cookie: cookieStr } }).then((resp) => resp.json())
  const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cookie Example</title>
        </head>
        <body>
            <h1>Cookies from Server Side</h1>
            <pre>${JSON.stringify(cookies, null, 2)}</pre>
            <button onclick="callApiA()">Call A API</button>
            <button onclick="callApiB()">Call B API</button>
            <div id="response"></div>
            <script>
                function callApiA() {
                    fetch('/api/a')
                        .then(response => response.json())
                        .then(data => {
                            document.getElementById('response').textContent = 'A API Response: ' + JSON.stringify(data);
                        });
                }

                function callApiB() {
                    fetch('/api/b', {method: 'POST'})
                        .then(response => response.json())
                        .then(data => {
                            document.getElementById('response').textContent = 'B API Response: ' + JSON.stringify(data);
                        });
                }
            </script>
        </body>
        </html>
    `
  res.send(htmlContent)
})

app.get('/api', async (req, res) => {
  const reqCookies = req.cookies
  const cookieStr = Object.entries(reqCookies)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ')
  console.log('== [Server] cookieStr ==', cookieStr)
  const cookies = await fetch('http://localhost:3000/api/a', { headers: { Cookie: cookieStr } }).then((resp) => resp.json())
  const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cookie Example</title>
        </head>
        <body>
            <h1>Cookies from Server Side</h1>
            <pre>${JSON.stringify(cookies, null, 2)}</pre>
        </body>
        </html>
    `
  res.send(htmlContent)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
