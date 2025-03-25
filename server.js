const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// **Убедитесь, что 'dist' соответствует вашей папке сборки!**
app.use(express.static(path.join(__dirname, 'dist'))); // или 'build'

app.get('*', (req, res) => {
  // **Убедитесь, что 'dist' соответствует вашей папке сборки!**
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); // или 'build'
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});