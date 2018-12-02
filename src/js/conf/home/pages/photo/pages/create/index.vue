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
          <el-radio-group v-model="form.photosRecommended">
            <el-radio :label="true">置顶</el-radio>
            <el-radio :label="false">不置顶</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传分类">
          <el-select v-model="form.classifysId" placeholder="请选择">
            <el-option
                    v-for="item in classifysList"
                    :key="item.classifys_id"
                    :label="item.classifys_cn_name + '-' +item.classifys_en_name"
                    :value="item.classifys_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传图片">
          <div>
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
  import Vue from 'vue'
  import _ from 'lodash'
  import io from '@/module/io'
  import { Input, Radio } from 'element-ui'


  export default {
    name: 'photo-create-index',
    data () {
      return {
        fileList: [],
        form: {
          photosTitle: '',
          photosRecommended: false,
          photosDesc: '',
          photosCover: 0,
          classifysId: ''
        },
        classifysList: [],
        filePaths: []
      }
    },
    props: {},
    methods: {
      handleRemove (file, fileList) {
        let isF = _.findIndex(this.fileList, v => v.name === file.name) !== -1
        if (isF) {
          this.deleteOnePhoto(file.name)
        } else {
          this.filePaths = _.filter(this.filePaths, v => v.name !== file.name)
        }
      },
      uploadFile ({ file }) {
        let i = _.findIndex(this.filePaths, v => v.pathName === file.name)
        if (i === -1) {
          this.filePaths.push({
            pathName: file.name,
            sort: 99
          })
        }
      },
      handleBeforeUpload ({ name }) {
        let i = _.findIndex(this.filePaths, v => v.pathName === name)
        if (i !== -1) {
          return false
        }
      },
      onSubmit () {
        let id = this.$route.params.id || null
        let result = this.fileList.concat(this.filePaths)

        if (id) {
          this.form.photosId = id
        }

        console.log(Object.assign(this.form, {}, {
          filePaths: result
        }))

        io.post(`photos/${this.$route.params.id ? 'update' : 'create'}`, Object.assign(this.form, {}, {
          filePaths: result
        }), res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.$router.push({ name: 'photo-list' })
        }, null, {
          emulateJSON: false
        }).catch(e => {
          this.$message.error(e.msg)
        })
      },
      getDetails () {
        return new Promise((resolve, reject) => {
          io.post('photos/findById', { photosId: this.$route.params.id }).then(res => {
            let data = res.data[0]
            this.form.photosTitle = data.photos_title
            this.form.photosRecommended = data.photos_recommended
            this.form.photosDesc = data.photos_desc
            this.form.photosCover = data.photos_cover
            this.form.classifysId = data.classifys_id

            this.fileList = _.map(data.photos_path_name, (v, i) => {
              return Object.assign(v, {}, {
                name: v['key'],
                url: v['url']
              })
              /* return {
                name: v['key'],
                url: v['url'],
                pathName:v['x:filename'],
                sort:v['sort']
              } */
            })
            resolve()
          }).catch(e => {
            reject(e)
          })
        })
      },
      getClassifysList () {
        return new Promise((resolve, reject) => {
          io.get('classifys/list').then(res => {
            this.classifysList = res.data
            resolve()
          }).catch(e => {
            reject(e)
          })
        })
      },

      /**
       * 删除一张照片
       */
      deleteOnePhoto (fileName) {
        io.post('photos/deleteOnePhoto', {
          fileName: fileName,
          photosId: this.$route.params.id
        }).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
        }).catch(e => {
          this.$message.error(e.msg)
        })
      },

      /**
       * 处理回显
       */
      handleBack (index) {
        $('.el-upload-list__item').eq(index).append(`<div class="el-upload-fromx"><div class="up-radio up-radio-${index}"></div><div class="up-input up-input-${index}"></div></div>`)
        let self = this
        new Vue({
          render: h => h(Radio, {
            scopedSlots: {
              default: () => {
                return '封面-'
              }
            },
            on: {
              input (event) {
                self.form.photosCover = event
              }
            },
            props: {
              label: index,
              value: self.form.photosCover
            }
          })
        }).$mount(`.up-radio-${index}`)
        new Vue({
          render: h => h(Input, {
            on: {
              input (val) {
                self.fileList[index].sort = parseInt(val)
              }
            },
            props: {
              value: self.fileList[index].sort
            }
          })
        }).$mount(`.up-input-${index}`)
      },
      /**
       * 处理增加一条数据
       */
      handleAddRecords (index) {
        let eqIndex = parseInt(index + this.fileList.length)

        $('.el-upload-list__item').eq(eqIndex).append(`<div class="el-upload-fromx"><div class="up-radio up-radio-${eqIndex}"></div><div class="up-input up-input-${eqIndex}"></div></div>`)
        let self = this
        new Vue({
          render: h => h(Radio, {
            scopedSlots: {
              default: () => {
                return '封面-'
              }
            },
            on: {
              input (event) {
                self.form.photosCover = event
              }
            },
            props: {
              label: eqIndex,
              value: self.form.photosCover
            }
          })
        }).$mount(`.up-radio-${eqIndex}`)
        new Vue({
          render: h => h(Input, {
            on: {
              input (val) {
                self.filePaths[index].sort = parseInt(val)
              }
            },
            props: {
              value: self.filePaths[index].sort
            }
          })
        }).$mount(`.up-input-${eqIndex}`)
      }
    },
    watch: {
      // 增加一条
      filePaths (arr) {
        _.map(arr, (v, i) => {
          setTimeout(() => {
            this.handleAddRecords(i)
          }, 200)
        })
      },
      // 回显
      fileList (arr) {
        _.map(arr, (v, i) => {
          setTimeout(() => {
            this.handleBack(i)
          }, 100)
        })
      }
    },
    beforeCreate () {
    },
    created () {
      if (this.$route.params.id) {
        this.getDetails()
          .then(res => {
            return this.getClassifysList()
          })
          .then(res => {

          })
      } else {
        this.getClassifysList().then(res => {
          this.form.classifysId = this.classifysList[0].classifys_id
        })
      }
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
    .el-upload-list__item {
      position: relative;
      .el-upload-fromx {
        position: absolute;
        right: 50px;
        top: 25px;
        .el-input {
          width: 60px;
          margin-left: 10px;
          input {
            text-align: center;
          }
        }

      }
    }
  }
</style>
