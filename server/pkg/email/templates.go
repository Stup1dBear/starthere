package email

import "fmt"

// VerificationEmailTemplate generates the verification email HTML
func VerificationEmailTemplate(verifyURL string) string {
	return fmt.Sprintf(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>🌟 StartHere 邮箱验证</title>
  <style>
    body {
      font-family: 'Courier New', monospace;
      background: #0B0D17;
      color: #ffffff;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      border: 4px solid #90caf9;
      padding: 30px;
      background: #0f1221;
      box-shadow: 8px 8px 0 #1a3a5c;
    }
    h1 {
      color: #FFD700;
      text-align: center;
      font-size: 28px;
      margin-bottom: 20px;
    }
    .rocket {
      text-align: center;
      font-size: 48px;
      margin: 20px 0;
    }
    .btn {
      display: block;
      width: 220px;
      margin: 30px auto;
      padding: 15px;
      background: #90caf9;
      color: #0B0D17;
      text-align: center;
      text-decoration: none;
      font-weight: bold;
      font-size: 16px;
      box-shadow: 4px 4px 0 #4a9eff;
    }
    .btn:hover {
      background: #b8dcff;
    }
    .footer {
      font-size: 12px;
      color: #888;
      margin-top: 30px;
      text-align: center;
      border-top: 1px solid #333;
      padding-top: 20px;
    }
    .stars {
      letter-spacing: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <p class="stars">✦ ✧ ✦ ✧ ✦</p>
    <h1>🚀 准备起航！</h1>
    <div class="rocket">🛸</div>
    <p style="text-align: center; font-size: 16px;">
      欢迎来到星辰目标管理！<br>
      点击下方按钮验证你的邮箱，开启宇宙探索之旅：
    </p>
    <a href="%s" class="btn">✅ 验证邮箱</a>
    <div class="footer">
      <p>如果按钮无法点击，请复制链接到浏览器：</p>
      <p style="word-break: break-all; color: #90caf9;">%s</p>
      <p style="margin-top: 20px;">此链接将在 24 小时后失效</p>
      <p class="stars">✧ ✦ ✧ ✦ ✧</p>
    </div>
  </div>
</body>
</html>
`, verifyURL, verifyURL)
}
