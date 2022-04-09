<template>
  <div>
    <v-card flat outlined class="ma-5 pa-5">
      <v-card-title class="font-weight-bold text-h5">
        Form機能を実装しよう！
      </v-card-title>
      <v-card-title>
        お名前
        <v-text-field
          v-model.trim.lazy="name"
          dense
          :rules="[required, max30]"
          class="px-5"
        ></v-text-field>
      </v-card-title>
      <v-card-title>
        要件
        <v-text-field
          v-model.trim.lazy="subject"
          dense
          :rules="[required, max30]"
          class="px-5"
        ></v-text-field>
      </v-card-title>
    </v-card>
    <v-card flat outlined class="ma-5 pa-5">
      <v-card-title class="font-weight-bold text-h5">
        １：Microcmsに送信しよう！
      </v-card-title>
      <v-btn
        color="primary"
        width="-webkit-fill-available"
        class="mx-5"
        @click="microCMSSubmit()"
      >
        <v-icon>mdi-email-fast-outline</v-icon>送信
      </v-btn>
    </v-card>
    <v-card flat outlined class="ma-5 pa-5">
      <v-card-title class="font-weight-bold text-h5">
        ２：メールアドレスに送信しよう！
      </v-card-title>
      <v-btn
        color="primary"
        width="-webkit-fill-available"
        class="mx-5"
        @click="mailSubmit()"
      >
        <v-icon>mdi-email-fast-outline</v-icon>送信
      </v-btn>
    </v-card>
    <v-card flat outlined class="ma-5 pa-5">
      <v-card-title class="font-weight-bold text-h5">
        ３：Google Formに送信しよう！
      </v-card-title>
      <v-btn
        color="primary"
        width="-webkit-fill-available"
        class="mx-5"
        @click="googleFormSubmit()"
      >
        <v-icon>mdi-email-fast-outline</v-icon>送信
      </v-btn>
    </v-card>
  </div>
</template>
<script>
// import { createTransport } from 'nodemailer'

export default {
  data: () => ({
    name: '',
    subject: '',
    required: (v) => !!v || '必須項目です',
    max30: (v) => (!v ? true : (v && v.length <= 30) || '30文字までです')
  }),
  methods: {
    header() {
      return {
        headers: { 'X-MICROCMS-API-KEY': this.$config.MICROCMS_API_KEY }
      }
    },
    microCMSSubmit() {
      this.$axios
        .post(
          this.$config.MICROCMS_API_URL + '/form',
          { name: this.name, subject: this.subject },
          this.header()
        )
        .then(() => {
          alert('送信できました')
        })
        .catch((e) => {
          console.log('microCMSSubmit/Error', e)
        })
    },
    async mailSubmit() {
      // const transporter = createTransport({
      //   host: 'mail.example.com', // ホスト名
      //   port: 465,
      //   secure: true,
      //   auth: {
      //     user: 'mail@example.com', // メールアドレス
      //     pass: '********' // パスワード
      //   }
      // })
      // await transporter
      //   .sendMail({
      //     from: `"Shinobi Works" <no-reply@example.com>`,
      //     to: `administer@example.com`,
      //     subject: '問い合わせがありました',
      //     text: `サイトにお問い合わせがありました...（略）`
      //   })
      //   .then(() => {
      //     alert('送信できました')
      //   })
      //   .catch((error) => {
      //     console.log(`メールを送信できませんでした`)
      //     throw error
      //   })
    },
    googleFormSubmit() {
      this.$axios
        .post(this.$config.MICROCMS_API_URL + '/form', this.header())
        .then(() => {
          alert('送信できました')
        })
        .catch((e) => {
          console.log('googleFormSubmit/Error', e)
        })
    }
  }
}
</script>
