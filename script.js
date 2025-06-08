const chatBox = document.getElementById("chat-box");

const API_KEY = "AIzaSyDw_9HDUDe2yV2QHH90CW8Go7HgVYPNk-w";

async function sendMessage() {
  const input = document.getElementById("user-input");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage("🧑‍💻 Kamu", userMessage);
  input.value = "";

  appendMessage("🤖 Gemini", "Sedang mengetik...");

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }],
        }),
      }
    );

    const data = await response.json();
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Gagal menjawab.";

    // Hapus "Sedang mengetik..." dan tampilkan jawaban
    chatBox.lastChild.remove();
    appendMessage("🤖 Gemini", botReply);
  } catch (error) {
    console.error(error);
    chatBox.lastChild.remove();
    appendMessage("🤖 Gemini", "Terjadi kesalahan.");
  }
}

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
