<template>
    <div class="container py-5 px-4">
        <div class="row rounded-lg overflow-hidden">
            <!-- Chat Box-->
            <div class="col-12 px-0">
                <div class="px-4 py-5 chat-box bg-white">
                
                <div v-for="c, i of conversation" v-bind:key="i">
                    <!-- Reciever Message-->
                    <div class="media w-50 ml-auto mb-3">
                        <div class="media-body">
                            <div class="bg-dark rounded py-2 px-3 mb-2">
                            <p class="text-small mb-0 text-white">{{ c.message.message }}</p>
                            </div>
                            <p class="small text-muted"><i :class="statusIconMap[c.message.status]"></i> {{ c.message.status }}</p>
                        </div>
                    </div>

                    <!-- Sender Message-->
                    <div v-if="c.reply" class="media w-50 mb-3">
                        <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" class="rounded-circle">
                        <div class="media-body ml-3">
                            <div class="bg-light rounded py-2 px-3 mb-2">
                            <p v-if="c.reply.typing" class="text-small mb-0 text-muted">Typing...</p>
                            <p v-else style="white-space: pre-line;" class="text-small mb-0 text-muted">{{ c.reply.choices[0].message.content }}</p>
                            </div>
                            <!-- <p class="small text-muted">12:00 PM | Aug 13</p> -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- Typing area -->
            <form @submit.prevent="sendMessage" class="bg-light" :model="model">
                <div class="input-group">
                <input autocomplete="off" v-model="model.message" name="message" type="text" placeholder="Type a message" aria-describedby="button-addon2" class="form-control rounded-0 border-0 py-4 bg-light">
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
import { apiAdapter } from '@/api/adapter';
import { ConversationInput, Message, Reply } from '@/types';
import Vue from 'vue'

export default Vue.extend({
    data() {
        return {
            senderMessages: [] as Message[],
            replies: [] as Reply[],

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
            const message: Message = {
                menuId: this.menuId,
                userId: this.userId,
                message: this.model.message,
                status: "Sending"
            }
            try {
                let input: ConversationInput = {
                    message,
                }
                this.conversation.push(input)
                const thisMessage = this.conversation.find(v => v.message.message === message.message)

                // fake sent message
                setTimeout(() => {
                    message.status = "Sent"
                    if (thisMessage) {
                        thisMessage.reply = {
                            typing: true
                        } as any
                    }
                }, 1000)

                this.isSending = true

                const response = await apiAdapter.putOrPost<Omit<Message, "status">, Reply>('/gpt/enquire', 'POST', {
                    menuId: message.menuId,
                    userId: message.userId,
                    message: message.message
                })
                message.status = "Sent"
                this.isSending = false

                if (response.status === 200) {
                    if (thisMessage) {
                        thisMessage.reply = response.data
                    }
                } else {
                    message.status = "Failed, try again"
                }
                this.model.message = ""

                this.$forceUpdate()
            } catch (err) {
                message.status = "Failed, try again"
                this.isSending = false
                console.log(err)
            }
        }
    }

})

</script>