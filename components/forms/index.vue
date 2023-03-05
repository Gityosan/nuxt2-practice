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
        メールアドレス
        <v-text-field
          v-model.trim.lazy="mailaddress"
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
        :disabled="true"
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
        @click.prevent="googleFormSubmit()"
      >
        <v-icon>mdi-email-fast-outline</v-icon>送信
      </v-btn>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    name: '',
    mailaddress: '',
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
        .then((res) => {
          if (res.status === 201) {
            alert('送信できました')
          }
        })
        .catch((e) => {
          console.log('microCMSSubmit/Error', e)
        })
    },
    async mailSubmit() {
      await this.$axios
        .post(
          '/api/mailer?name=' +
            this.name +
            '&subject=' +
            this.subject +
            '&mailaddress=' +
            this.mailaddress
        )
        .then((res) => {
          if (res.status === 200) {
            alert('送信できました')
          }
        })
        .catch((e) => {
          console.log('mailSubmit/Error', e)
        })
    },
    async googleFormSubmit() {
      const params = new FormData()
      params.append('entry.1715882031', this.name)
      params.append('entry.433075776', this.subject)
      await this.$axios
        .post('/googleform', params)
        .then((res) => {
          if (res.status === 200) {
            alert('送信できました')
          }
        })
        .catch((e) => {
          console.log('googleFormSubmit/Error', e)
        })
    }
  }
}
</script>
