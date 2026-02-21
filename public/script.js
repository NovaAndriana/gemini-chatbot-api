const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';

  // Tampilkan loading sementara
  const loadingEl = appendMessage('bot', 'Gemini is thinking...');

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        conversation: [
          { role: 'user', text: userMessage }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      loadingEl.textContent = data.error || 'Terjadi kesalahan.';
      return;
    }

    // Ganti loading dengan jawaban asli dari backend
    loadingEl.textContent = data.result || 'Tidak ada respons dari AI.';

  } catch (error) {
    console.error(error);
    loadingEl.textContent = 'Gagal terhubung ke server.';
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;

  return msg; // penting supaya bisa update loading message
}