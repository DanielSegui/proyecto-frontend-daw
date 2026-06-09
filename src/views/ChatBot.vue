<template>
    <div class="chatbot-wrapper">
        <button @click="isOpen = !isOpen" class="chat-btn">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
        </button>

        <div v-if="isOpen" class="chat-window">
            <div class="messages">
                <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.role]">
                    {{ msg.text }}
                </div>
            </div>

            <div class="input-area">
                <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Escriu..." />
                <button @click="sendMessage" class="send-btn">
                    ➤ <!-- O pots usar una icona tipus FontAwesome si en tens -->
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const isOpen = ref(false);
const userInput = ref('');
const messages = ref([{ role: 'bot', text: 'Hola! Com puc ajudar-te?' }]);

const sendMessage = async () => {
    if (!userInput.value.trim()) return;
    const text = userInput.value;
    messages.value.push({ role: 'user', text });
    userInput.value = '';

    try {
        const response = await axios.post(import.meta.env.VITE_N8N_CHAT_URL, { message: text });
        
        // Mirem què arriba realment
        console.log("Dades rebudes del n8n:", response.data);

        // Provem d'agafar el camp output, si no, intentem agafar el text directament
        const botText = response.data.output || response.data.text || JSON.stringify(response.data);
        
        messages.value.push({ role: 'bot', text: botText });
    } catch (error) {
        console.error("Error:", error);
        messages.value.push({ role: 'bot', text: 'Error de connexió.' });
    }
};
</script>

<style scoped>
.chatbot-wrapper {
    position: fixed;
    bottom: 25px;
    right: 25px;
    z-index: 999999;
}

.chat-btn {
    background: #d4af37;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.chat-window {
    position: absolute;
    bottom: 65px;
    right: 0;
    width: 300px;
    height: 400px;
    background: #1a1a1a;
    border: 1px solid #d4af37;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
}

.messages {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

/* Disseny dels bocadillos */
.message {
    padding: 10px 14px;
    border-radius: 18px;
    font-size: 0.9rem;
    line-height: 1.4;
    max-width: 80%;
    word-wrap: break-word;
}

/* El teu missatge (Dreta) */
.user {
    background: #d4af37;
    color: #000;
    align-self: flex-end;
    /* Aquesta és la clau de la posició */
    border-bottom-right-radius: 2px;
}

/* Missatge del bot (Esquerra) */
.bot {
    background: #333;
    color: #fff;
    align-self: flex-start;
    /* Aquesta és la clau de la posició */
    border-bottom-left-radius: 2px;
}

.input-area {
    padding: 12px;
    background: #000;
    display: flex;
    gap: 8px;
    border-top: 1px solid #333;
    /* Línia molt fina per separar */
}

input {
    flex: 1;
    background: #222;
    border: none;
    color: white;
    padding: 8px 12px;
    border-radius: 20px;
    outline: none;
}

.send-btn {
    background: #d4af37;
    color: #000;
    border: none;
    width: 35px;
    /* Botó quadrat o rodó petit */
    height: 35px;
    border-radius: 50%;
    /* Rodó */
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    transition: background 0.3s;
}

.send-btn:hover {
    background: #b8962f;
    /* Un to daurat una mica més fosc en passar el ratolí */
}
</style>