<template>
	<div class="container">
		<!-- Left side: PDF Preview -->
		<div class="preview-section">
			<!-- Show upload UI when no PDF is loaded -->
			<div v-if="!pdfUrl" class="upload-container">
				<label for="pdf-upload" class="upload-label">
					<span class="upload-content">
						<UploadCloudIcon class="upload-icon" />
						<span class="upload-text">
							Drop your PDF here or click to browse
						</span>
					</span>
					<input
						id="pdf-upload"
						type="file"
						class="hidden-input"
						accept="application/pdf"
						@change="handleFileUpload"
					/>
				</label>
			</div>

			<!-- Show PDF and controls when PDF is loaded -->
			<template v-else>
				<div class="pdf-container">
					<div class="scale-controls">
						<button @click="decreaseScale">−</button>
						<input
							type="text"
							class="scale-input"
							v-model="scale"
							@input="handleScaleInput"
						/>
						<span>%</span>
						<button @click="increaseScale">+</button>
					</div>
					<div
						class="pdf-wrapper"
						:style="{
							transform: `scale(${scale / 100})`,
							transformOrigin: 'top left'
						}"
					>
						<vue-pdf-embed :source="pdfUrl" class="pdf-viewer" />
					</div>
				</div>
			</template>
		</div>

		<!-- Right side: Chat section -->
		<div class="chat-section">
			<div v-if="pdfUrl" class="chat-container">
				<div class="chat-messages" ref="chatMessages">
					<div
						v-for="(message, index) in messages"
						:key="index"
						:class="['message', message.type]"
					>
						{{ message.text }}
					</div>
				</div>

				<div class="chat-input-container">
					<input
						v-model="newMessage"
						@keyup.enter="sendMessage"
						type="text"
						placeholder="Type your message..."
						class="chat-input"
					/>
					<button @click="sendMessage" class="send-button">
						<SendIcon class="send-icon" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	height: 100vh;
	width: 100%;
}

.preview-section {
	width: 50%;
	height: 100vh;
	position: relative;
	overflow: auto;
}

.upload-container {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem;
}

.upload-label {
	width: 100%;
	max-width: 400px;
	height: 200px;
	border: 2px dashed #ccc;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: border-color 0.3s;
}

.upload-label:hover {
	border-color: #2196f3;
}

.upload-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
}

.upload-icon {
	width: 2rem;
	height: 2rem;
	color: #666;
}

.hidden-input {
	display: none;
}

.scale-controls-wrapper {
	position: fixed;
	top: 1rem;
	width: 50%;
	display: flex;
	justify-content: center;
	z-index: 1000;
}

.scale-controls {
	position: fixed;
	top: 20px;
	left: 20%;
	transform: translateX(-50%);
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5rem;
	background-color: white;
	border-radius: 0.5rem;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	z-index: 9999;
}

.scale-controls:hover {
	box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.scale-input {
	width: 45px;
	text-align: center;
	border: none;
	font-size: 14px;
	font-weight: 500;
	color: #333;
}

.scale-controls button {
	padding: 4px 8px;
	border: 1px solid #e0e0e0;
	background-color: white;
	cursor: pointer;
}

.scale-controls button:hover {
	background-color: #e8e8e8;
	color: #333;
}

.pdf-container {
	background-color: #f5f7fa;
	min-height: 100vh;
	padding: 2rem;
}

.pdf-wrapper {
	transition: transform 0.2s ease;
}

.pdf-viewer {
	width: 100%;
	display: inline-block;
}

/* Chat section styles */
.chat-section {
	width: 50%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	border-left: 1px solid #eee;
}

.chat-container {
	flex: 1;
	display: flex;
	flex-direction: column;
	height: 100%;
}

.chat-messages {
	flex: 1;
	overflow-y: auto;
	padding: 1rem;
}

.chat-input-container {
	padding: 1rem;
	border-top: 1px solid #eee;
	background: white;
	display: flex;
	gap: 0.5rem;
}

.chat-input {
	flex: 1;
	padding: 0.75rem;
	border: 1px solid #ddd;
	border-radius: 0.5rem;
	outline: none;
}

.message {
	margin-bottom: 0.5rem;
	padding: 0.75rem;
	border-radius: 0.5rem;
	max-width: 80%;
}

.message.system {
	background-color: #fff3e0;
	margin: 1rem auto;
	text-align: center;
}

.message.user {
	background-color: #e3f2fd;
	margin-left: auto;
}

.message.assistant {
	background-color: #f5f5f5;
	margin-right: auto;
}

/* PDF page styling */
.pdf-page {
	margin: 1rem auto;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	background-color: white;
}

/* Add a modern scrollbar */
::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}

::-webkit-scrollbar-track {
	background: #f1f1f1;
	border-radius: 4px;
}

::-webkit-scrollbar-thumb {
	background: #ccc;
	border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
	background: #999;
}

.upload-btn {
	padding: 8px 16px;
	background-color: #fff;
	border: 1px solid #e0e0e0;
	border-radius: 6px;
	cursor: pointer;
	font-size: 14px;
	color: #333;
}

.upload-btn:hover {
	background-color: #f8f8f8;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

/* Optional: Add an icon if you're using one */
.upload-icon {
	width: 16px;
	height: 16px;
}
</style>

<script setup>
import { ref } from "vue"
import { UploadCloudIcon, SendIcon, MinusIcon, PlusIcon } from "lucide-vue-next"
import VuePdfEmbed from "vue-pdf-embed"
import OpenAI from "openai"

const pdfUrl = ref(null)
const error = ref(null)
const newMessage = ref("")
const messages = ref([])
const scale = ref(100)

const handleFileUpload = (event) => {
	const file = event.target.files[0]
	if (file && file.type === "application/pdf") {
		const reader = new FileReader()
		reader.onload = (e) => {
			pdfUrl.value = e.target.result
			error.value = null
			// Add welcome message
			messages.value.push({
				type: "system",
				text: "PDF loaded successfully! How can I help you with this document?"
			})
		}
		reader.readAsDataURL(file)
	} else {
		error.value = "Please upload a valid PDF file."
		pdfUrl.value = null
	}
}

const openai = new OpenAI({
	baseURL: "https://openrouter.ai/api/v1",
	apiKey: "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",
	dangerouslyAllowBrowser: true,
	defaultHeaders: {}
})

const sendMessage = async () => {
	if (!newMessage.value.trim()) {
		console.error("Message is empty. Cannot send.")
		return // Prevent sending empty messages
	}

	// Push the user's message to the messages array
	messages.value.push({ type: "user", text: newMessage.value })

	// Call OpenAI API or any other logic here
	try {
		const data = await openai.chat.completions.create({
			model: "openai/gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: newMessage.value
				}
			]
		})

		// Check if the response contains choices
		if (data.choices && data.choices.length > 0) {
			messages.value.push({
				type: "ai",
				text: data.choices[0].message.content
			})
		} else {
			console.error("No choices returned from API:", data)
		}

		newMessage.value = "" // Clear the input after sending
	} catch (error) {
		console.error("Error sending message:", error)
	}
}

const increaseScale = () => {
	if (scale.value < 200) {
		scale.value += 10
	}
}

const decreaseScale = () => {
	if (scale.value > 50) {
		scale.value -= 10
	}
}

const handleScaleInput = () => {
	if (scale.value < 50) scale.value = 50
	if (scale.value > 200) scale.value = 200
	scale.value = Math.round(scale.value / 10) * 10
}
</script>
