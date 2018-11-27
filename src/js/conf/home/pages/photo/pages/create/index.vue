<template>
  <div class="photo-create-index">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">后台首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'photo-list' }">照片列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加照片</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="conditions">

    </div>
    <div class="form-content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.photosTitle"></el-input>
        </el-form-item>
        <el-form-item label="置顶">
          <el-radio-group v-model="form.photosHot">
            <el-radio :label="true">置顶</el-radio>
            <el-radio :label="false">不置顶</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传分类">
          <el-select v-model="form.photosClassifys" placeholder="请选择">
            <el-option
                    v-for="item in classifysList"
                    :key="item.classifys_id"
                    :label="item.classifys_cn_name"
                    :value="item.classifys_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传图片">
          <div>
            <!--:http-request="uploadFile"-->
            <el-upload
                    class="upload-demo"
                    :http-request="uploadFile"
                    :on-remove="handleRemove"
                    :before-upload="handleBeforeUpload"
                    :file-list="fileList"
                    multiple="true"
                    list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.photosDesc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">{{$route.params.id ? '更新照片' :'创建照片'}}</el-button>
          <router-link :to="{ name: `classify-list`}">
            <el-button >取消</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import _ from 'lodash'
  import io from '@/module/io'
  export default {
    name: 'photo-create-index',
    data () {
      return {
        fileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ],
        form: {
          photosTitle: '',
          photosHot: false,
          photosDesc: '',
          photosClassifys: ''
        },
        classifysList: [],
        filePaths: []
      }
    },
    props: {},
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      uploadFile ({ file }) {
        this.handleFilePaths(file.name)
      },
      handleFilePaths (imgPath) {
        let i = _.findIndex(this.filePaths, v => v === imgPath)
        if (i === -1) {
          this.filePaths.push(imgPath)
        }
      },
      handleBeforeUpload ({ name }) {
        let i = _.findIndex(this.filePaths, v => v === name)
        if (i !== -1) {
          return false
        }
      },
      onSubmit () {
        io.post('photos/create', Object.assign(this.form, {}, {
          filePaths: this.filePaths
        }), res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
        }, null, {
          emulateJSON: false
        }).catch(e => {
          this.$message.error(e.msg)
        })
      }
    },
    watch: {
    },
    beforeCreate () {
    },
    created () {
      io.get('classifys/list').then(res => {
        this.classifysList = res.data
        this.form.photosClassifys = this.classifysList[0].classifys_id
      })
    },
    beforeMount () {
    },
    mounted () {
    },
    beforeUpdate () {
    },
    updated () {
    },
    beforeDestroy () {
    },
    destroyed () {
    },
    computed: {},
    components: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .photo-create-index {

  }
</style>
