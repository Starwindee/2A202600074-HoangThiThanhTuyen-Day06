// Mock Data 
const MOCK_PATIENTS = {
    "P001": { name: "Nguyễn Thị A", age: 45, sex: "Nữ", conditions: ["Đái tháo đường type 2"] },
    "P002": { name: "Trần Văn B", age: 62, sex: "Nam", conditions: ["Tăng huyết áp"] },
    "P003": { name: "Lê Thị C", age: 38, sex: "Nữ", conditions: ["Đang mang thai tuần 28"] },
};

let currentPatientId = null; // No default selection until clicked

function initApp() {
    renderSidebar();
}

function renderSidebar() {
    const listEl = document.getElementById("patientList");
    listEl.innerHTML = "";
    Object.keys(MOCK_PATIENTS).forEach(key => {
        let p = MOCK_PATIENTS[key];
        let li = document.createElement("li");
        li.className = `patient-item ${key === currentPatientId ? 'active' : ''}`;
        li.textContent = p.name;
        li.onclick = () => {
            currentPatientId = key;
            renderSidebar();
            // Optional: You can auto-generate a bot prompt when patient is clicked
            appendMessage("bot", `Bạn vừa chọn bệnh án của bệnh nhân <b>${p.name}</b> (${p.age} tuổi, ${p.sex}). Hệ thống ghi nhận tiền sử: ${p.conditions.join(', ')}. Bạn cần tôi giải thích kết quả xét nghiệm nào?`);
        };
        listEl.appendChild(li);
    });
}

function handleEnter(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

function sendMessage() {
    const inputEl = document.getElementById("userInput");
    const userText = inputEl.value.trim();
    if (!userText) return;

    // Append User Message
    appendMessage("user", userText);
    inputEl.value = "";
    inputEl.style.height = "auto";

    // Show Typing Indicator
    const typingId = appendTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator(typingId);
        // Requirement: "kết quả khi chat sẽ luôn mặc định là hardcode: tôi là vinmeclumina"
        appendMessage("bot", "tôi là vinmeclumina");
    }, 1000);
}

function appendMessage(sender, text) {
    const historyEl = document.getElementById("chatHistory");
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${sender}-message`;
    
    const avatar = sender === "bot" ? "L" : "👤";
    const avatarClass = sender === "bot" ? "bot-avatar" : "user-avatar";

    msgDiv.innerHTML = `
        <div class="message-avatar ${avatarClass}">${avatar}</div>
        <div class="message-content">
            ${text.replace(/\n/g, '<br>')}
        </div>
    `;

    historyEl.appendChild(msgDiv);
    historyEl.scrollTop = historyEl.scrollHeight;
}

function appendTypingIndicator() {
    const historyEl = document.getElementById("chatHistory");
    const id = "typing-" + Date.now();

    const msgDiv = document.createElement("div");
    msgDiv.className = `message bot-message`;
    msgDiv.id = id;
    
    msgDiv.innerHTML = `
        <div class="message-avatar bot-avatar">L</div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;

    historyEl.appendChild(msgDiv);
    historyEl.scrollTop = historyEl.scrollHeight;
    return id;
}

function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

// Auto-resize textarea
document.getElementById("userInput").addEventListener('input', function() {
    this.style.height = 'auto';
    let newHeight = this.scrollHeight;
    if (newHeight > 150) newHeight = 150; 
    this.style.height = newHeight + 'px';
});

document.addEventListener("DOMContentLoaded", initApp);
