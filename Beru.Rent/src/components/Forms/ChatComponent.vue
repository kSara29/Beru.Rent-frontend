<script setup>
</script>
<template>
  <section>
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-md-10 col-lg-8 col-xl-6">
          <div class="card-2" id="chat2">
            <div class="card-body">
              <div v-for="message in messages">
                <div v-if="message.userName === 'admin'" class="other-person d-flex flex-row justify-content-start">
                  <img src="https://steamuserimages-a.akamaihd.net/ugc/2204010566893210113/95766DCED724BC539C879F63C41837C04809CE7C/?imw=512&amp;&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=false"
                       alt="avatar 1" style="width: 45px; height: 100%; margin-top: 2%;">
                  <div>
                    <router-link class="that-person-name" to="/profile">
                      {{message.userName}}
                    </router-link>
                    <p v-if="message.message.length > 45" class="chat-massage small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">
                      {{ message.message }}
                    </p>
                    <p v-if="message.message.length < 45" class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">
                      {{message.message}}
                    </p>
                    <p class="small ms-3 mb-3 rounded-3 text-muted">{{ timeSince(message.date)}}</p>
                  </div>
                </div>

                <div v-if="message.userName === 'Abdimansur'" class="this-person d-flex flex-row justify-content-end mb-4 pt-1">
                  <div>
                    <router-link to="/profile">{{ message.userName }}</router-link>
                    <p v-if="message.message.length > 48" class="chat-massage small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      {{message.message}}
                    </p>
                    <p v-if="message.message.length < 48" class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      {{ message.message }}
                    </p>
                    <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                      {{ timeSince(message.date)}}
                    </p>
                  </div>
                  <img src="https://elle.com.kz/wp-content/uploads/2022/06/c4867f3d-cb7b-4b46-a66d-190ea74b04a1.jpeg"
                       alt="avatar 1" style="width: 45px; height: 100%;">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>
<script>
export default {
  data: () => ({
    messages: [
      {userName: 'Abdimansur', message: 'привет!', date: new Date('Thu Feb 08 2024 19:50:13 GMT+0600')},
      {userName: 'admin', message: 'добрый день!', date: new Date('Thu Feb 08 2024 19:50:43 GMT+0600')},
      {userName: 'admin', message: 'что вам нужно?!', date: new Date('Thu Feb 08 2024 19:50:53 GMT+0600')},
      {userName: 'Abdimansur', message: 'хочу купить губка боба', date: new Date('Thu Feb 08 2024 19:51:12 GMT+0600')},
      {userName: 'admin', message: 'вы прочитали условия?', date: new Date('Thu Feb 08 2024 19:51:34 GMT+0600')},
      {userName: 'Abdimansur', message: 'да, конечно.', date: new Date('Thu Feb 08 2024 19:51:41 GMT+0600')},
      {userName: 'admin', message: 'хорошо, тогда прикрепите свой документ', date: new Date('Thu Feb 08 2024 19:52:08 GMT+0600')},
      {userName: 'admin', message: 'потом отпишитесь когда отправите', date: new Date('Thu Feb 08 2024 19:52:19 GMT+0600')},
      {userName: 'admin', message: 'Вы тут?', date: new Date('Thu Feb 08 2024 19:52:33 GMT+0600')},
      {
        userName: 'admin',
        message: 'Если что я не буду ждать пока вы прикрепите документ, так что потом просто сами прикрепите и напишите мне, вечером когда буду дома, тогда и проверю.',
        date: new Date('Thu Feb 08 2024 19:53:00 GMT+0600')
      },
    ],
    currentUser: {userId: 'c698dfc2-61a9-46eb-bf7f-0ffb2067b9bd', userName: 'Abdimansur'}
  }),
  methods: {
    timeSince(date) {

      let seconds = Math.floor((new Date() - date) / 1000);

      let interval = seconds / 31536000;

      if (interval > 1) {
        return Math.floor(interval) + " years";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    }
  }
}
</script>
<style scoped>
html {
  font-size: 14px;
}

@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
}

html {
  position: relative;
  min-height: 100%;
}

body {
  margin-bottom: 60px;
}

.other-person {
  width: 100%;
  max-width: 100%;
  margin-left: -38%;
}

.this-person {
  width: 100%;
}
.this-person > img {
  margin-top: 2.8%;
}

.chat-massage{
  width: 380px;
}

.card-2 {
  width: 700px;
  height: 400px;
}

.card-body {
  width: 100%;
  border: none;
}
.that-person-name {
  margin-left: 4%;
  text-decoration: none;
  color: inherit;
}
</style>
