async function checkList() {
    const name = document.getElementById('nameInput').value;
    const response = await fetch('/gift', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ person: name }),
    });
  
    const result = await response.text();
    document.getElementById('result').textContent = result;
  }
  