<template>
    <div class="container py-5">
        <div class="row rounded-lg overflow-hidden">
            <!-- Chat Box-->
            <div class="col-12 px-0">
                <div class="py-5 chat-box bg-white">
                <div v-for="c, i of conversation" v-bind:key="i">
                    <!-- Reciever Message-->
                    <div class="media w-80 ml-5 mb-3">
                        <div class="media-body">
                            <div class="bg-dark rounded py-2 px-3 mb-2">
                            <p class="text-small mb-0 text-white">{{ c.prompt.message }}</p>
                            </div>
                            <p class="small text-muted"><i :class="statusIconMap[c.prompt.status]"></i> {{ c.prompt.status }}</p>
                        </div>
                    </div>

                    <!-- Sender Message-->
                    <div v-if="c.reply" class="media w-80 mb-3">
                        <div class="media-body mr-5">
                            <div class="bg-light rounded py-2 px-3 mb-2">
                            <p v-if="c.reply.typing" class="text-small mb-0 text-muted">Thinking...</p>
                            <p v-else style="white-space: pre-line;" class="text-small mb-0 text-muted">{{ c.reply.text }}</p>
                            </div>
                            <!-- <p class="small text-muted">12:00 PM | Aug 13</p> -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- Typing area -->
            <form @submit.prevent="sendMessage" class="bg-light" :model="model">
                <div class="input-group">
                <textarea v-model="model.message" name="message" type="text" placeholder="Type a message" aria-describedby="button-addon2" class="form-control rounded-0 border-0 py-4 bg-light"></textarea>
                <div class="input-group-append">
                    <button :disabled="isSending" id="button-addon2" type="submit" class="btn btn-link"> <i class="bi bi-send-fill"></i></button>
                </div>
                </div>
            </form>

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { MENU_API_V1 } from '@/api/common';
import { ConversationInput, GPTDataChunk, Prompt } from '@/types';
import Vue from 'vue'

export default Vue.extend({
    data() {
        return {
            senderMessages: [] as Prompt[],

            conversation: [] as ConversationInput[],
            model: {
                message: ""
            },

            userId: "",

            statusIconMap: {
                "Sending": "bi bi-check",
                "Sent": "bi bi-check-all",
                "Failed, try again": "bi bi-x-circle"
            },
            typing: false,
            isSending: false,
            eventSource: null as EventSource | null
        }
    },
    props: {
        menuId: {
            type: String,
            required: true
        }
    },
    mounted() {
        this.userId = "solomzi"
    },

    methods: {
        async sendMessage() {
            const prompt: Prompt = {
                menuId: this.menuId,
                userId: this.userId,
                message: this.model.message,
                status: "Sending"
            }
            try {
                let input: ConversationInput = {
                    prompt,
                }
                this.conversation.push(input)
                const thisMessage = this.conversation.find(v => v.prompt.message === prompt.message)!

                // fake sent message
                setTimeout(() => {
                    prompt.status = "Sent"
                    if (thisMessage) {
                        thisMessage.reply = {
                            typing: true
                        } as any
                    }
                }, 1000)

                this.isSending = true

                const url = `${MENU_API_V1}/gpt/enquire?prompt=${encodeURIComponent(prompt.message)}&menuId=${prompt.menuId}&userId=${encodeURIComponent(prompt.userId)}`

                this.eventSource = new EventSource(url)

                setTimeout(() => {
                    if (thisMessage.reply) {
                        thisMessage.reply.typing = false
                    }
                    this.isSending = false
                }, 5000)

                this.eventSource.onmessage = (event) => {

                    let eventData = event.data.trim().split("\n")

                    for (let line of eventData) {
                        if (line.startsWith("data: ")) {
                            line = line.substring(6).trim()
                        }

                        if (line === '[DONE]') {
                            this.eventSource?.close()
                            return
                        }
                        if (line) {
                            try {
                                const response = JSON.parse(line) as GPTDataChunk
                                const [{ delta }] = response.choices
                                if (delta.content && thisMessage.reply) {
                                    thisMessage.reply.text = (thisMessage.reply.text ?? '') + delta.content
                                }
                                this.$forceUpdate()
                            } catch (err) {
                                console.log("cannot parse ", line)
                            }
                        }
                    }

                    
                };

                this.eventSource.onerror = (error) => {
                    console.error("EventSource error:", error);
                    this.eventSource?.close()
                };
                this.model.message = ""
                this.$forceUpdate()
            } catch (err) {
                prompt.status = "Failed, try again"
                this.isSending = false
                console.log(err)
            }
        }
    }

})

</script>