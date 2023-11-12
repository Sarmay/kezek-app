<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form class="row" @submit.prevent="greet">
      <input
        id="greet-input"
        v-model="interName"
        placeholder="Enter a name..."
      />
      <button type="submit">Greet</button>
    </form>
    <p>{{ greetMsg }}</p>
  </div>
</template>

<script>
import { Body } from '@tauri-apps/api/http'
import http from '@/utils/http'
import { invoke } from '@tauri-apps/api/tauri'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      interName: '',
      greetMsg: ''
    }
  },
  mounted () {
    this.testHttp()
  },
  methods: {
    async greet () {
      this.greetMsg = await invoke('greet', { name: this.interName })
    },
    async testHttp () {
      const body = Body.json({
        operationName: 'OnlineBookingQueueConsulate',
        variables: {
          slug: 'eq:mfa-urumqi'
        },
        query: 'query OnlineBookingQueueConsulate($slug: String!) {\n  foreign_institution(projects: $slug, _size: 100000) {\n    id\n    title\n    address\n    block_on_sent\n    non_reception_days(_size: 100000) {\n      date\n      is_block_all_day\n      non_receiving_timestamps(_size: 100000) {\n        id\n        timestamp\n        __typename\n      }\n      __typename\n    }\n    auto_confirmation\n    full_day\n    category_question(_size: 100000) {\n      id\n      title\n      __typename\n    }\n    weekends\n    number_of_bookings_per_day\n    booking_time_period\n    user_photo\n    captcha_settings\n    is_send_without_time\n    upload_info\n    __typename\n  }\n  category: category_question_appeal(projects: "eq:epirgo", _size: 100000) {\n    id\n    title\n    __typename\n  }\n  embassy_work_calendar {\n    celebrations(_size: 100000) {\n      title\n      date\n      __typename\n    }\n    work_days(_size: 100000) {\n      title\n      date\n      __typename\n    }\n    __typename\n  }\n}\n'
      })
      const res = await http('https://www.gov.kz/graphql', {
        method: 'post',
        body
      }).catch(err => {
        console.log(err)
      })
      const item = res.data.foreign_institution[0]
      console.log(item)
      // number_of_bookings_per_day 一天多少天
      // weekends 休息日
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
