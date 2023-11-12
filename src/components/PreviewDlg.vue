<template>
  <el-dialog
    title="预约信息"
    :visible="visible"
    width="580px"
    top="5vh"
    destroy-on-close
    append-to-body
    :close-on-click-modal="false"
    @opened="initCanvas"
    @close="$emit('change', false)"
  >
    <div class="canvas-container">
      <canvas
        ref="canvas"
        id="canvas"
        width="540"
        height="550"
        style="width: 540px; height: 550px"
      ></canvas>
    </div>
    <!-- <div style="dirction: ltr">
      <div class="normal-font" style="text-align: center; width: 100%">
        Talon #S4HXBRFJF7X
      </div>
      <div style="color: #e54d42; margin-top: 10px">
        来领事馆时，请您带上有预约号的票据的复印件
      </div>
      <div style="margin-top: 10px">
        <el-avatar
          shape="square"
          :size="100"
          fit="contain"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
      </div>
      <el-descriptions :column="1" border style="margin-top: 10px">
        <el-descriptions-item>
          <template slot="label"> 姓、名、⽗称 </template>
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 身份证明(护照)⽂件号码 </template>
          18100000000
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 电⼦邮件 </template>
          苏州市
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 外国使团 </template>
          <el-tag size="small">学校</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 驻外使团地址 </template>
          江苏省苏州市吴中区吴中大道 1188 号
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 预约⽇期 </template>
          江苏省苏州市吴中区吴中大道 1188 号
        </el-descriptions-item>
      </el-descriptions>
      <div style="margin-top: 20px">
        <div>请随身携带所选服务的⽂件清单中提供的全套⽂件。</div>
        <div>请注意，如果您没有全套⽂件，您将⽆法收到您的申请。</div>
        <div>您可以在⽹站的"领事事务"部分查看所需⽂件清单。</div>
      </div>
    </div> -->
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="$emit('change', false)">
        关 闭
      </el-button>
      <el-button @click="saveImage"> 保 存 </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs'
import { save } from '@tauri-apps/api/dialog'
import { downloadDir } from '@tauri-apps/api/path'

export default {
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      context: {},
      canvas: {}
    }
  },

  methods: {
    initCanvas () {
      const canvas = this.$refs.canvas
      if (!canvas) {
        return false
      }
      const context = canvas.getContext('2d')

      this.context = context
      this.canvas = canvas

      const dpr = window.devicePixelRatio

      const { width, height } = canvas
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      // 直接用 scale 放大整个坐标系，相对来说就是放大了每个绘制操作
      context.scale(dpr, dpr)

      // 添加纯色背景
      context.fillStyle = '#fff'
      context.fillRect(0, 0, width, height)

      // 写文本
      const talon = 'Talon # S4HXBRFJF7X'
      context.font = '20px Arial'
      // 获取文本宽度
      const textWidth = context.measureText(talon).width
      context.fillStyle = '#000'
      // 居中
      context.fillText(talon, canvas.width / dpr / 2 - textWidth / 2, 30)
      context.font = '16px Arial'
      context.fillStyle = '#d4453d'
      context.fillText('来领事馆时，请您带上有预约号的票据的复印件', 10, 60)

      // 绘画图片
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.src =
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      //  加载图片
      img.onload = function () {
        if (img.complete) {
          //  绘制图片
          const proportion = img.width / img.height
          const width = 115 * proportion
          console.log(width)
          context.drawImage(img, 0, 80, width, 115)
        }
      }

      // 画表格
      context.strokeStyle = '#000'
      context.lineWidth = 1
      context.beginPath()
      context.moveTo(10, 250)
      context.lineTo(10, 220)
      context.lineTo(520, 220)
      context.lineTo(520, 250)
      context.lineTo(10, 250)
      context.stroke()
      context.closePath()
      // 下一行
      context.beginPath()
      context.moveTo(10, 250)
      context.lineTo(10, 280)
      context.lineTo(520, 280)
      context.lineTo(520, 250)
      context.stroke()
      // 下一行
      context.beginPath()
      context.moveTo(10, 280)
      context.lineTo(10, 310)
      context.lineTo(520, 310)
      context.lineTo(520, 280)
      context.stroke()
      // 下一行
      context.beginPath()
      context.moveTo(10, 310)
      context.lineTo(10, 380)
      context.lineTo(520, 380)
      context.lineTo(520, 310)
      context.stroke()
      // 下一行
      context.beginPath()
      context.moveTo(10, 380)
      context.lineTo(10, 410)
      context.lineTo(520, 410)
      context.lineTo(520, 380)
      context.stroke()
      // 下一行
      context.beginPath()
      context.moveTo(10, 410)
      context.lineTo(10, 440)
      context.lineTo(520, 440)
      context.lineTo(520, 410)
      context.stroke()
      // 中间画一条竖线
      context.beginPath()
      context.moveTo(260, 220)
      context.lineTo(260, 440)
      context.stroke()

      // 姓、名、⽗称
      context.font = '16px Arial'
      context.fillStyle = '#000'
      context.fillText('姓、名、⽗称', 20, 240)
      // 这⾥写全名
      context.fillText('这⾥写全名', 270, 240)
      // 身份证明(护照)⽂件号码
      context.fillText('身份证明(护照)⽂件号码', 20, 270)
      // EH767766
      context.fillText('EH767766', 270, 270)
      // 电⼦邮件
      context.fillText('电⼦邮件', 20, 300)
      // ksks@gmail.com
      context.fillText('ksks@gmail.com', 270, 300)
      // 外国使团
      context.fillText('外国使团', 20, 350)
      // 哈萨克斯坦共和国外交部在中国乌鲁⽊⻬的护照和签证服务
      context.fillText('哈萨克斯坦共和国外交部在中国乌', 270, 335)
      context.fillText('鲁木齐的护照和签证服务', 270, 365)
      // 驻外使团地址
      context.fillText('驻外使团地址', 20, 400)
      // 乌鲁⽊⻬，新市区，昆明路216号
      context.fillText('乌鲁木齐，新市区，昆明路216号', 270, 400)
      // 预约⽇期
      context.fillText('预约⽇期', 20, 430)
      // 07.11.2023
      context.fillText('07.11.2023', 270, 430)
      // 斜体
      context.font = 'italic 12px Arial'
      context.fillText(
        '请随身携带所选服务的⽂件清单中提供的全套⽂件。',
        10,
        480
      )
      context.fillText(
        '请注意，如果您没有全套⽂件，您将⽆法收到您的申请。',
        10,
        500
      )
      context.fillText(
        '您可以在⽹站的"领事事务"部分查看所需⽂件清单。',
        10,
        520
      )
    },
    dataURLtoBlob (dataurl) {
      const arr = dataurl.split(',')
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return u8arr
    },
    async saveImage () {
      try {
        const imgData = this.canvas.toDataURL({ format: 'jpg', quality: 1 })
        const blob = this.dataURLtoBlob(imgData)
        console.log(blob)
        const basePath = (await downloadDir()) + '/talon.jpg'
        const filePath = await save({
          title: '保存文件: talon.jpg',
          defaultPath: basePath,
          filters: [
            {
              name: 'Image',
              extensions: ['jpg']
            }
          ]
        })
        console.log(filePath)
        await writeBinaryFile(filePath, blob, {
          dir: BaseDirectory.AppData
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
}
</style>
