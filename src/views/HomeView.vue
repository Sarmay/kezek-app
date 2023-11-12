<template>
  <div class="home" :style="`direction: ${$t('direction')}`">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="card-header">
            <span>{{ $t("workInfoTitle") }}</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              icon="el-icon-refresh"
              :loading="refreshLoading"
              @click="refreshHandel"
              >{{ $t("refresh") }}</el-button
            >
          </div>
          <el-descriptions :column="2">
            <el-descriptions-item :label="$t('currentDate')">
              {{ nowTime }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('currentOpeningDate')">
              {{ lastDay }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('restDay')">
              {{ weekends || "--" }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('dailyBookingQuantity')">
              <el-tag size="small">
                {{ foreignInstitution.number_of_bookings_per_day || 0 }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item :span="2" :label="$t('financeRate')">
              <div>
                {{ financeRate.cny2kzt }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item :span="2" :label="$t('financeRate2')">
              <div>
                {{ financeRate.kzt2cny }}
              </div>
            </el-descriptions-item>
          </el-descriptions>
          <div style="margin-bottom: 10px; direction: ltr">
            <new-input
              v-model="money"
              :placeholder="
                selectFinanceRate === 'cny2kzt'
                  ? $t('moneyPlc')
                  : $t('moneyPlc2')
              "
              :formatter="
                selectFinanceRate === 'cny2kzt'
                  ? formatterAmount
                  : formatterNumber
              "
              class="input-with-select"
            >
              <el-select
                v-model="selectFinanceRate"
                slot="prepend"
                @change="money = ''"
              >
                <el-option
                  v-for="(item, index) in $t('tranOptions')"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </new-input>
          </div>
          <el-descriptions :column="1">
            <el-descriptions-item :label="$t('capitalAmount')">
              {{ currencyText }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('afterTran')">
              {{ afterTranMoney }}
            </el-descriptions-item>
          </el-descriptions>
          <div class="date-box">
            <div class="db-header">{{ $t("futureInformation") }}</div>
            <el-table
              :data="futureDate"
              :empty-text="$t('emptyText')"
              border
              stripe
              style="width: 100%"
            >
              <el-table-column
                align="center"
                prop="date"
                :label="$t('tableDate')"
                min-width="100"
              >
              </el-table-column>
              <el-table-column
                align="right"
                prop="count"
                :label="$t('tableRemainingQuantity')"
              ></el-table-column>
              <el-table-column
                align="right"
                prop="booked"
                :label="$t('reservedQuantity')"
              >
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header">
            <span>{{ $t("userInfo") }}</span>
          </div>
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            :label-width="$t('labelWidth')"
          >
            <el-form-item
              :label="$t('categoryQuestion')"
              prop="category_question"
            >
              <el-select
                v-model="form.category_question"
                style="width: 100%"
                :placeholder="$t('categoryQuestionPlc')"
                :popper-class="$t('direction')"
              >
                <el-option
                  v-for="(item, index) in $t('category')"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-row>
              <el-col :span="15">
                <el-form-item :label="$t('fio')" prop="fio">
                  <el-input v-model="form.fio" :placeholder="$t('fioPlc')">
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('dateBirth')" prop="date_birth">
                  <el-date-picker
                    type="date"
                    :placeholder="$t('dateBirthPlc')"
                    v-model="form.date_birth"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label-width="140px" prop="user_photo">
                  <div slot="label" class="user-photo-label">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="$t('userPhotoPlc')"
                      placement="top"
                      :popper-class="$t('direction')"
                    >
                      <div>
                        <i class="el-icon-warning-outline"></i
                        >{{ $t("userPhoto") }}
                      </div>
                    </el-tooltip>
                  </div>
                  <el-upload
                    ref="upload"
                    class="avatar-uploader"
                    :multiple="false"
                    :limit="1"
                    action="#"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="fileChange"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item :label="$t('citizenship')" prop="citizenship">
              <el-input
                v-model="form.citizenship"
                :placeholder="$t('citizenshipPlc')"
              >
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('docType')" prop="doc_type">
              <el-input v-model="form.doc_type" :placeholder="$t('docTypePlc')">
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('docNumber')" prop="doc_number">
              <el-input
                v-model="form.doc_number"
                :placeholder="$t('docNumberPlc')"
              >
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('docDate')" prop="doc_date">
              <el-date-picker
                type="date"
                :placeholder="$t('docDatePlc')"
                v-model="form.doc_date"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>

            <el-form-item :label="$t('address')" prop="address">
              <el-input v-model="form.address" :placeholder="$t('addressPlc')">
              </el-input>
            </el-form-item>

            <el-row v-if="$t('isRtl') == '0'" :gutter="20">
              <el-col :span="12">
                <el-form-item :label="$t('eMail')" prop="e_mail">
                  <el-input v-model="form.e_mail" :placeholder="$t('eMailPlc')">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('phoneNumber')" prop="phone_number">
                  <el-input
                    v-model="form.phone_number"
                    :placeholder="$t('phoneNumberPlc')"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <template v-else>
              <el-form-item :label="$t('eMail')" prop="e_mail">
                <el-input v-model="form.e_mail" :placeholder="$t('eMailPlc')">
                </el-input>
              </el-form-item>
              <el-form-item :label="$t('phoneNumber')" prop="phone_number">
                <el-input
                  v-model="form.phone_number"
                  :placeholder="$t('phoneNumberPlc')"
                >
                </el-input>
              </el-form-item>
            </template>

            <el-form-item>
              <el-button type="primary" @click="submitForm">{{
                $t("grabTheNumber")
              }}</el-button>
              <el-button
                style="margin-right: 20px"
                @click="showDlg = !showDlg"
                >{{ $t("queryInformation") }}</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <preview-dlg v-model="showDlg" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import {
  currency,
  formatterNumber,
  formatterAmount,
  formaterPrice
} from '@/utils/utils'

export default {
  name: 'HomeView',
  components: {
    NewInput: () => import('@/components/NewInput.vue'),
    PreviewDlg: () => import('@/components/PreviewDlg.vue')
  },
  data () {
    return {
      refreshLoading: false,
      showDlg: false,
      money: '',
      selectFinanceRate: 'cny2kzt',
      financeRate: {
        cny2kzt: '64.1002059',
        kzt2cny: '0.01560057'
      },
      timestrap: Date.now(),
      nowTime: dayjs().format('YYYY-MM-DD'),
      category: [],
      celebrations: [],
      workDays: [],
      foreignInstitution: {
        number_of_bookings_per_day: 150,
        weekends: '360',
        booking_time_period: 1
      },
      futureDate: [],
      imageUrl: null,
      form: {
        category_question: '',
        user_photo: '',
        fio: '',
        date_birth: '',
        citizenship: '',
        doc_type: '',
        doc_number: '',
        doc_date: '',
        address: '',
        e_mail: '',
        phone_number: ''
      },
      rules: {
        category_question: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error(this.$t('categoryQuestionPlc')))
              } else {
                return callback()
              }
            },
            trigger: 'chnage'
          }
        ],
        user_photo: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error(this.$t('userPhotoPlcZ')))
              } else {
                return callback()
              }
            },
            trigger: 'chnage'
          }
        ],
        fio: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error(this.$t('fioPlc')))
              } else {
                return callback()
              }
            },
            trigger: 'chnage'
          }
        ],
        date_birth: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error(this.$t('dateBirthPlc')))
              } else {
                return callback()
              }
            },
            trigger: 'chnage'
          }
        ],
        citizenship: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error(this.$t('citizenshipPlc')))
              } else {
                return callback()
              }
            },
            trigger: 'chnage'
          }
        ],
        doc_type: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error(this.$t('docTypePlc')))
              } else {
                return callback()
              }
            },
            trigger: 'chnage'
          }
        ],
        doc_number: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error(this.$t('docNumberPlc')))
              } else {
                return callback()
              }
            },
            trigger: 'chnage'
          }
        ],
        doc_date: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error(this.$t('docDatePlc')))
              } else {
                return callback()
              }
            },
            trigger: 'chnage'
          }
        ],
        address: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error(this.$t('addressPlc')))
              } else {
                return callback()
              }
            },
            trigger: 'chnage'
          }
        ],
        e_mail: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error(this.$t('eMailPlc')))
              } else {
                return callback()
              }
            },
            trigger: 'chnage'
          }
        ],
        phone_number: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error(this.$t('phoneNumberPlc')))
              } else {
                return callback()
              }
            },
            trigger: 'chnage'
          }
        ]
      }
    }
  },
  computed: {
    weekends () {
      const { weekends = '360' } = this.foreignInstitution
      const wj = this.$t('weekends')
      return weekends
        .split('')
        .map((z) => wj[z])
        .join(',')
    },
    lastDay () {
      const c = this.foreignInstitution.booking_time_period || 8
      const t = 7 * c
      return dayjs(this.timestrap).add(t, 'day').format('YYYY-MM-DD')
    },
    currencyText () {
      const money = this.money.replaceAll(',', '')
      return currency(money)
    },
    afterTranMoney () {
      const sfr = this.selectFinanceRate
      const rate = this.financeRate[sfr]
      const money = this.money.replaceAll(',', '')
      const amount =
        sfr === 'cny2kzt'
          ? Math.round(money * rate)
          : (money * rate).toFixed(2)
      return `${formaterPrice(amount)} ${
        sfr === 'cny2kzt' ? this.$t('cny2kzt') : this.$t('kzt2cny')
      }`
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.$refs.form.fields.forEach((item) => {
        if (item.validateState === 'error') {
          this.$refs.form.validateField(item.labelFor)
        }
      })
    }
  },
  async mounted () {
    this.getFinanceRate()
    this.getNowTime()
    this.getSysData()
  },
  methods: {
    formatterNumber,
    formatterAmount,
    // 上传图片
    async fileChange (file) {
      this.$refs.upload.clearFiles()
      const typeList = ['image/jpeg', 'image/png']
      const isLt2M = file.raw.size / 1024 / 1024 <= 0.5
      if (!typeList.includes(file.raw.type) || !isLt2M) {
        this.$message({
          customClass: this.$t('direction'),
          message: this.$t('userPhotoPlc'),
          type: 'error'
        })
        return false
      }
      const loading = this.$loading({
        lock: true,
        customClass: this.$t('direction'),
        text: this.$t('imgUploadText'),
        spinner: 'el-icon-loading'
      })
      this.imageUrl = URL.createObjectURL(file.raw)
      const res = await this.$apis.uploadAvatar(file.raw)
      this.form.user_photo = `https://www.gov.kz/api/v2/files/${
        res.file || 'FvAzLDzEghsZlOx_16300.jpg'
      }`
      loading.close()
    },
    // 获取汇率
    async getFinanceRate () {
      const financeRateArray = []
      const financeRate1 = this.$apis.getFinanceRate({
        scur: 'CNY',
        tcur: 'KZT'
      })
      const financeRate2 = this.$apis.getFinanceRate({
        scur: 'KZT',
        tcur: 'CNY'
      })
      financeRateArray.push(financeRate1, financeRate2)
      const res = await Promise.all(financeRateArray)
      console.log('getFinanceRate', res)
      if (res && res.length === 2 && res[0].result && res[1].result) {
        const cny2kzt = res[0].result.rate
        const kzt2cny = res[1].result.rate
        this.financeRate = {
          cny2kzt,
          kzt2cny
        }
        await this.$localStore.setStore('financeRate', this.financeRate)
      } else {
        const financeRate = await this.$localStore.getStore('financeRate')
        this.financeRate = financeRate || {
          cny2kzt: '64.1002059',
          kzt2cny: '0.01560057'
        }
      }
    },
    // 获取当前时间
    async getNowTime () {
      const res = await this.$apis.getNowTime()
      const taobao =
        res && res.data && res.data.t ? res.data.t * 1 : Date.now()
      this.timestrap = taobao
      const now = dayjs(taobao)
      const nowTime = now.format('YYYY-MM-DD')
      this.nowTime = nowTime
    },
    // 获取系统时间
    async getSysData () {
      const loading = this.$loading({
        lock: true,
        customClass: this.$t('direction'),
        text: this.$t('loadingText'),
        spinner: 'el-icon-loading'
      })
      const res = await this.$apis.sendPostRequest({
        operationName: 'OnlineBookingQueueConsulate',
        variables: {
          slug: 'eq:mfa-urumqi'
        },
        query:
          'query OnlineBookingQueueConsulate($slug: String!) {\n  foreign_institution(projects: $slug, _size: 100000) {\n    id\n    title\n    address\n    block_on_sent\n    non_reception_days(_size: 100000) {\n      date\n      is_block_all_day\n      non_receiving_timestamps(_size: 100000) {\n        id\n        timestamp\n        __typename\n      }\n      __typename\n    }\n    auto_confirmation\n    full_day\n    category_question(_size: 100000) {\n      id\n      title\n      __typename\n    }\n    weekends\n    number_of_bookings_per_day\n    booking_time_period\n    user_photo\n    captcha_settings\n    is_send_without_time\n    upload_info\n    __typename\n  }\n  category: category_question_appeal(projects: "eq:epirgo", _size: 100000) {\n    id\n    title\n    __typename\n  }\n  embassy_work_calendar {\n    celebrations(_size: 100000) {\n      title\n      date\n      __typename\n    }\n    work_days(_size: 100000) {\n      title\n      date\n      __typename\n    }\n    __typename\n  }\n}\n'
      })
      console.log(res)
      if (res && res.data) {
        this.category = res.data.category
        this.foreignInstitution = res.data.foreign_institution[0]
        this.celebrations = res.data.embassy_work_calendar[0].celebrations
        this.workDays = res.data.embassy_work_calendar[0].work_days
        await this.$localStore.setStore('category', this.category)
        await this.$localStore.setStore(
          'foreignInstitution',
          this.foreignInstitution
        )
        await this.$localStore.setStore('celebrations', this.celebrations)
        await this.$localStore.setStore('workDays', this.workDays)
      } else {
        this.category = (await this.$localStore.getStore('category')) || []
        this.foreignInstitution = (await this.$localStore.getStore(
          'foreignInstitution'
        )) || {
          number_of_bookings_per_day: 150,
          weekends: '360',
          booking_time_period: 1
        }
        this.celebrations =
          (await this.$localStore.getStore('celebrations')) || []
        this.workDays = (await this.$localStore.getStore('workDays')) || []
      }
      await this.getBookingNumber()
      loading.close()
    },
    // 获取已预约数量
    async getBookingNumber () {
      const date = dayjs(this.timestrap).add(6, 'day').format('YYYY-MM-DD')
      const res = await this.$apis.sendPostRequest({
        operationName: 'CheckBookingQueueByDate',
        variables: {
          slug: 'eq:mfa-urumqi',
          id: 'eq:289',
          date: `gte:${date}`
        },
        query:
          'query CheckBookingQueueByDate($slug: String!, $id: String!, $date: String!) {\n  booking_consulate_queue(projects: $slug, foreign_institution: {id: $id}, date: $date, status: {id: "neq:2"}, _sort: "date", _size: 1000) {\n    id\n    date\n    time\n    __typename\n  }\n}\n'
      })

      let bkArr = []
      if (res && res.data) {
        bkArr = res.data.booking_consulate_queue
        await this.$localStore.setStore('bookingConsulate', bkArr)
      } else {
        bkArr = (await this.$localStore.getStore('bookingConsulate')) || []
      }
      this.futureBookingDate(bkArr)
    },
    // 优化数据
    reduceData (arr = []) {
      const newData = arr.reduce((pre, acc) => {
        if (pre[acc.date]) {
          pre[acc.date].count += 1
          pre[acc.date].list.push(acc)
        } else {
          pre[acc.date] = {
            count: 1,
            list: [acc]
          }
        }
        return pre
      }, {})
      return newData
    },
    // 计算未来可预约日期
    futureBookingDate (bookingConsulate) {
      const selectData = this.reduceData(bookingConsulate)
      console.log('getBookingNumber:', selectData)
      // 输出未来30天日期
      const allNum = this.foreignInstitution.number_of_bookings_per_day
      const date = dayjs(this.timestrap).add(6, 'day')
      const futureDate = []

      for (let i = 0; i < 30; i++) {
        const today = date.add(i, 'day')
        const week = today.day()
        if (![3, 6, 0].includes(week)) {
          if (futureDate.length < 7) {
            const d = today.format('YYYY-MM-DD')
            const booked = selectData[d] ? selectData[d].count : 0
            futureDate.push({
              date: d,
              // 已预约
              booked,
              // 可预约
              count: allNum - booked >= 0 ? allNum - booked : 0
            })
          }
        }
      }
      console.log('futureDate:', futureDate)
      this.futureDate = futureDate
    },
    // 整点抢号
    submitForm (search) {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.$localStore.setStore('formData', this.form)
          console.log(valid)
        } else {
          this.$message({
            customClass: this.$t('direction'),
            message: this.$t('validText'),
            type: 'error'
          })
          return false
        }
      })
    },
    async refreshHandel () {
      this.refreshLoading = true
      try {
        await this.getFinanceRate()
        await this.getNowTime()
        await this.getSysData()
        this.refreshLoading = false
      } catch (err) {
        console.log(err)
        this.refreshLoading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  .date-box {
    margin-top: 20px;
    .db-header {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }

  ::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

  .user-photo-label {
    text-align: right;
    margin-top: -40px;
    margin-right: 20px;
    cursor: pointer;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
