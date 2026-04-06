export default async function handler(req, res) {
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{
    width:1200px;height:630px;overflow:hidden;
    background:#000000;
    display:flex;flex-direction:column;
    align-items:center;justify-content:center;
    font-family:'Courier New',Courier,monospace;
  }
  .logo{width:160px;height:160px;object-fit:contain;filter:invert(1);margin-bottom:32px;}
  .title{font-size:22px;color:#ffffff;letter-spacing:0.5em;text-transform:uppercase;margin-bottom:12px;}
  .sub{font-size:11px;color:#555555;letter-spacing:0.4em;text-transform:uppercase;margin-bottom:40px;}
  .divider{width:1px;height:40px;background:rgba(255,255,255,0.15);margin-bottom:40px;}
  .drop{font-size:11px;color:#333333;letter-spacing:0.35em;text-transform:uppercase;}
  .border-top{position:absolute;top:0;left:0;right:0;height:1px;background:rgba(255,255,255,0.06);}
  .border-bottom{position:absolute;bottom:0;left:0;right:0;height:1px;background:rgba(255,255,255,0.06);}
  .border-left{position:absolute;top:0;bottom:0;left:0;width:1px;background:rgba(255,255,255,0.06);}
  .border-right{position:absolute;top:0;bottom:0;right:0;width:1px;background:rgba(255,255,255,0.06);}
</style>
</head>
<body>
  <div class="border-top"></div>
  <div class="border-bottom"></div>
  <div class="border-left"></div>
  <div class="border-right"></div>
  <img class="logo" src="https://www.truevisionproject.com/og-logo.png" alt="TVP"/>
  <p class="title">True Vision Project</p>
  <p class="sub">Built from nothing</p>
  <div class="divider"></div>
  <p class="drop">Drop 001 — Archive Access Open</p>
</body>
</html>`

  res.setHeader('Content-Type', 'text/html')
  res.status(200).send(html)
}
